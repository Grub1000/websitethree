import time

from django.conf import settings
import redis.asyncio as redis



PRESENCE_TIMEOUT = 60

redis_host, redis_port = (
    settings.CHANNEL_LAYERS["default"]["CONFIG"]["hosts"][0]
)

redis_client = redis.Redis(
    host=redis_host,
    port=redis_port,
    decode_responses=True,
)


def presence_key(user_id):
    return f"chat:presence:user:{user_id}"



async def cleanup_stale_connections(user_id):
    key = presence_key(user_id)                 # Custom presence_key made from user_id function parameter
    now = time.time()

    count_before = await redis_client.zcard(key)    # Gets an integer value of the total number of connected channels under the custom key in Redis. Could be zero if no presence_key is present for that user_id (This means No devices or tabs are currently connected through websocket to the backend for that user.).

    await redis_client.zremrangebyscore( # Remove every connection whose expiration time is less than or equal to right now. (No heartbeat sent in 60 seconds will)
        key,                             # key is the presence_key of the user_id. We are measuring the score here of that presence key, where the score is a timestamp.
        "-inf",
        now,
    )

    count_after = await redis_client.zcard(key)    # Updated count after zremrangebyscore removal of inactive channels.

    if count_after == 0:
        await redis_client.delete(key)             # If the total channels is zero, delete the presence_key. Basically, if no channels for that user are connected, go ahead and delete the presence_key on the Redis server for that user. 

    return count_before, count_after               # Return the count before removal of stale connections and the count after removal / no-removal.



async def add_presence_connection(user_id, channel_name):
    key = presence_key(user_id)

    # Remove old/stale sockets first.
    await cleanup_stale_connections(user_id)

    expiration = time.time() + PRESENCE_TIMEOUT

    await redis_client.zadd(
        key,
        {
            channel_name: expiration # Storing a channel_name as the member and using an expiration timestamp as the score. This is a highly efficient, classic pattern in Redis used to build a delayed queue, a priority queue, or to track channel TTLs / active subscriptions so you can clean them up after they expire.
        },                           # Works as a custome key, value pair where the key is the unique channel name and the value (score in redis terms) is a time integer representing time.time() + PRESENCE_TIMEOUT.
    )                                # Example: {specific.d98a72b6cb8e49b897db6746ef32a4e9!6a4f20cd5db046039535eb04b6b66e34 : 1789531236.808703}

    return await redis_client.zcard(key)


async def refresh_presence_connection(user_id, channel_name):
    key = presence_key(user_id)

    await cleanup_stale_connections(user_id)

    expiration = time.time() + PRESENCE_TIMEOUT

    exists = await redis_client.zscore(
        key,
        channel_name,
    )

    if exists is None:
        return False

    await redis_client.zadd(
        key,
        {
            channel_name: expiration   # Store an updated timestamp as the score.
        },
    )

    return True


async def remove_presence_connection(user_id, channel_name):
    key = presence_key(user_id)

    await redis_client.zrem(
        key,
        channel_name,
    )

    await cleanup_stale_connections(user_id)

    count = await redis_client.zcard(key)

    if count == 0:
        await redis_client.delete(key)

    return count


async def is_user_online(user_id):
    await cleanup_stale_connections(user_id) # Cleans up stale channels for that user_id. Also will delete the presence_key for that user if there are 0 channels left for that user. Does return the old count of user channels before cleanup and the new user channels count after cleanup.

    return (
        await redis_client.zcard( # Return the number of elements in the sorted set. Basically, return the number of channels in the presence_key. Could be zero if no match is found.
            presence_key(user_id) # Send the custom presence_key formatted user_id as the argument.
        )
    ) > 0   # Returns True or False if the total number of active non-stale channels is greater than zero.