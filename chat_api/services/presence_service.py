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
    key = presence_key(user_id)
    now = time.time()

    count_before = await redis_client.zcard(key)

    await redis_client.zremrangebyscore( # Remove every connection whose expiration time is less than or equal to right now.
        key,
        "-inf",
        now,
    )

    count_after = await redis_client.zcard(key)

    if count_after == 0:
        await redis_client.delete(key)

    return count_before, count_after



async def add_presence_connection(user_id, channel_name):
    key = presence_key(user_id)

    # Remove old/stale sockets first.
    await cleanup_stale_connections(user_id)

    expiration = time.time() + PRESENCE_TIMEOUT

    await redis_client.zadd(
        key,
        {
            channel_name: expiration
        },
    )

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
            channel_name: expiration
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
    await cleanup_stale_connections(user_id)

    return (
        await redis_client.zcard(
            presence_key(user_id)
        )
    ) > 0