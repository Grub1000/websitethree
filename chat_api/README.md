# 💬 Relay

**Real-Time Messaging, Built to Scale.**

Relay is a completed full-stack real-time direct messaging platform built with **React, TypeScript, Django REST Framework, Django Channels, Redis, MySQL, WebSockets, Apache, Daphne, and AWS EC2**.

The project was built to demonstrate more than a basic chat UI. Relay explores how durable application state, persistent WebSocket connections, Redis-backed channel communication, authenticated Django Consumers, client-side state synchronization, presence, delivery/read receipts, and production ASGI deployment fit together in a real system.

The public-facing application is called **Relay**. Internally, the Django backend lives in `chat_api`, while the React + TypeScript frontend lives in `chat-frontend`.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-A30000?style=for-the-badge&logo=django&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![Apache](https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white)

---

# ✅ Project Status

**Relay V1 is complete.**

The current version supports authenticated one-to-one messaging with persistent message history and real-time synchronization.

Completed functionality includes:

- ✅ JWT-based authentication
- ✅ Email/password registration and login
- ✅ Google OAuth integration
- ✅ Protected React routes
- ✅ Direct conversation creation
- ✅ User search for starting new conversations
- ✅ Real-time messages
- ✅ Persistent MySQL message storage
- ✅ Cursor-based message history
- ✅ Infinite loading of older messages
- ✅ Client-generated message UUIDs
- ✅ Database-backed message idempotency
- ✅ Typing indicators
- ✅ Online/offline presence
- ✅ Redis heartbeat-based presence tracking
- ✅ Multi-tab presence support
- ✅ Message delivery receipts
- ✅ Message read receipts
- ✅ Unread conversation counts
- ✅ Live conversation sidebar updates
- ✅ Global user-level WebSocket updates
- ✅ Conversation-specific WebSocket connections
- ✅ Conversation deletion
- ✅ Real-time conversation removal across connected clients
- ✅ Automatic WebSocket reconnection
- ✅ Responsive desktop/mobile layout
- ✅ Mobile single-pane conversation navigation
- ✅ Enter-to-send / Shift+Enter newline behavior
- ✅ Auto-expanding message composer
- ✅ Production WSS deployment through Apache + Daphne
- ✅ Redis-backed Django Channels production setup
- ✅ systemd-managed Daphne service

Planned features such as conversation search, group conversations, attachments, reactions, and message editing are intentionally reserved for a future V2.

---

# 📖 Overview

Relay uses **two communication paths**:

1. **REST** for durable state that can be loaded or recovered.
2. **WebSockets** for live events that should appear immediately.

```text
React + TypeScript
        │
        ├──────── REST ────────► Django REST Framework ─────► MySQL
        │
        └───── WebSocket ──────► Django Channels
                                      │
                                      ▼
                                 Redis Channel Layer
                                      │
                                      ▼
                                 Other Consumers
                                      │
                                      ▼
                                     MySQL
```

This separation is important.

**MySQL is the durable source of truth.** Messages, conversations, memberships, delivery state, and read state survive process restarts and connection failures.

**Redis is transient coordination infrastructure.** It allows Django Channels Consumers running in different Python processes to exchange live events without sharing Python memory.

A useful mental model is:

```text
MySQL = durable memory
Redis = real-time nervous system
WebSocket = live client/server connection
```

---

# 🧰 Technology Stack

## Frontend

- **React**
- **TypeScript**
- **Vite**
- React Router
- Browser WebSocket API
- Fetch API
- JWT access/refresh tokens
- Google OAuth
- Responsive CSS

## Backend

- **Python**
- **Django**
- **Django REST Framework**
- **Django Channels**
- **ASGI**
- **Daphne**
- **SimpleJWT**
- **channels-redis**

## Data & Infrastructure

- **MySQL** — durable application data
- **Redis** — Channels communication and transient presence state
- **Apache2** — HTTPS/WSS public entry point and reverse proxy
- **Daphne** — ASGI protocol server for WebSockets
- **AWS EC2** — production application server
- **systemd** — persistent Daphne and Redis services

---

# 🏗️ Current Production Architecture

Relay currently runs alongside other Django applications on the same EC2 server.

The existing website already used Apache + mod_wsgi for normal HTTP traffic, so Relay was added without replacing that working architecture.

```text
                              INTERNET
                                  │
                                  ▼
                           Apache2 :443
                          HTTPS + WSS
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 │ Normal HTTP                     │ /ws/*
                 ▼                                 ▼
             mod_wsgi                       Reverse Proxy
                 │                                 │
                 ▼                                 ▼
              wsgi.py                       Daphne :8001
                 │                                 │
                 ▼                                 ▼
              Django                            asgi.py
                                                   │
                                                   ▼
                                            Django Channels
                                                   │
                                                   ▼
                                               Consumers
                                                   │
                                                   ▼
                                                 Redis
                                                   │
                                                   ▼
                                                 MySQL
```

Normal Django HTTP traffic continues through WSGI.

Relay WebSocket traffic uses:

```text
Browser
   │
   │ wss://jorgeramirez.net/ws/...
   ▼
Apache :443
   │
   │ Proxy /ws/
   ▼
Daphne :8001
   │
   ▼
Django ASGI
   │
   ▼
Channels Consumer
   │
   ▼
Redis Channel Layer
```

This keeps the existing production site stable while giving Relay the ASGI path required for persistent WebSockets.

---

# 🌐 REST vs WebSocket Responsibilities

## REST API

REST handles state that should be recoverable at any time.

Current endpoints include the equivalent of:

```text
GET    /chat-api/conversations/
GET    /chat-api/conversations/<conversation_id>/messages/?before=<message_id>
POST   /chat-api/conversations/direct/
GET    /chat-api/users/?search=<query>
DELETE /chat-api/conversations/<conversation_id>/
```

REST is responsible for:

- Loading the conversation list
- Loading message history
- Cursor pagination
- Searching users
- Creating/finding direct conversations
- Deleting conversations
- Initial application state
- Recovery after reload/reconnect

## WebSockets

WebSockets handle events that should happen immediately.

Current event types include:

```text
message.send
message.new
message.delivered
message.read
typing.start
typing.stop
typing.update
presence.update
conversation.updated
conversation.deleted
heartbeat
```

WebSockets are responsible for:

- Live message delivery
- Typing indicators
- Presence
- Delivery receipts
- Read receipts
- Unread-count updates
- Conversation sidebar synchronization
- Real-time deletion updates
- Multi-tab/device synchronization

---

# 🔌 Intentional Two-WebSocket Frontend Architecture

Relay intentionally uses **two WebSocket connections per active chat tab**.

## 1. User-Level Socket

```text
/ws/chat/
```

This socket represents Relay-wide state for the authenticated user.

It receives events such as:

```text
conversation.updated
conversation.deleted
```

This lets the sidebar update even when the affected conversation is not currently open.

Examples:

- A new incoming direct message appears in the sidebar.
- A conversation moves to the top after receiving a message.
- An unread count changes.
- A deleted conversation disappears immediately.

## 2. Conversation-Level Socket

```text
/ws/chat/<conversation_id>/
```

This socket handles events for the currently selected conversation.

Examples:

```text
message.new
message.delivered
message.read
typing.update
presence.update
```

## Why Two Sockets?

The separation keeps:

```text
GLOBAL RELAY STATE
conversation list / unread counts / conversation lifecycle

separate from

ACTIVE CONVERSATION STATE
messages / typing / presence / delivery / reads
```

This is easier to reason about than placing every event for the entire application on one multiplexed socket.

When no conversation is selected, only the user-level socket is needed.

When a conversation is open, the tab normally has:

```text
1 user-level socket
+
1 active-conversation socket
```

Multiple browser tabs create separate socket connections, which is why presence tracking is designed around **connections**, not simply users.

---

# 🔐 WebSocket Authentication

Normal REST requests can send JWT access tokens in the `Authorization` header.

The browser WebSocket API does not expose arbitrary request headers in the same way as `fetch()`, so Relay authenticates the socket during the WebSocket handshake using the access token in the query string.

Frontend concept:

```typescript
new WebSocket(
    `${WS_BASE_URL}/ws/chat/${conversationId}/?token=${accessToken}`
)
```

The Django ASGI middleware:

1. Reads the token.
2. Validates the JWT.
3. Resolves the authenticated user.
4. Places the user into `scope["user"]`.
5. Lets the Consumer authorize access to the requested conversation.

```text
WebSocket handshake
        │
        ▼
JWT middleware
        │
        ▼
scope["user"]
        │
        ▼
Conversation membership check
        │
        ├── authorized → accept()
        │
        └── unauthorized → close()
```

---

# 💬 Persistent Message Lifecycle

A message is not simply broadcast to other browsers.

Relay uses the safer ordering:

```text
Validate
   ↓
Authorize
   ↓
Persist in MySQL
   ↓
Commit
   ↓
Broadcast through Redis
```

Full flow:

```text
React sender
    │
    │ message.send
    ▼
WebSocket
    │
    ▼
ChatConsumer
    │
    ├── authenticate user
    ├── authorize membership
    ├── validate content
    └── validate client_message_id
    │
    ▼
MySQL transaction
    │
    ├── Message
    └── MessageDelivery rows
    │
    ▼
COMMIT
    │
    ▼
channel_layer.group_send()
    │
    ▼
channels-redis
    │
    ▼
Redis
    │
    ├───────────────┐
    ▼               ▼
Consumer A      Consumer B
    │               │
    ▼               ▼
WebSocket       WebSocket
    │               │
    ▼               ▼
React A         React B
```

Persisting before broadcasting means a client never receives a successful live message that does not yet exist in the durable database.

---

# 🆔 Message Idempotency

The frontend creates a UUID before sending a message:

```json
{
    "type": "message.send",
    "client_message_id": "550e8400-e29b-41d4-a716-446655440000",
    "content": "Hello"
}
```

The database enforces uniqueness on:

```text
(sender, client_message_id)
```

This allows retry-safe message handling.

If the same send is received more than once because of a retry or reconnect, the backend can recognize the already-created message instead of creating a duplicate.

---

# 🗄️ Database Design

## Conversation

```text
Conversation
├── id : UUID
├── direct_key : unique / nullable
├── created_at
└── updated_at
```

For direct messages, `direct_key` is generated by sorting the two user IDs.

Example:

```text
User 4 + User 5
      ↓
sort IDs
      ↓
"4:5"
```

The unique key prevents duplicate one-to-one conversations.

## ConversationMember

```text
ConversationMember
├── conversation
├── user
├── joined_at
├── last_read_message
└── last_read_at
```

This model stores per-user conversation state and keeps the schema compatible with future group conversations.

## Message

```text
Message
├── id : BigAutoField
├── conversation
├── sender
├── client_message_id : UUID
├── content
├── created_at
├── edited_at
└── deleted_at
```

Messages are permanently stored in MySQL.

## MessageDelivery

```text
MessageDelivery
├── message
├── user
└── delivered_at
```

Unique constraint:

```text
(message, user)
```

---

# 📬 Delivery Receipts

Delivery state is cumulative.

When a recipient receives messages through the WebSocket, the client sends a delivery acknowledgement.

Conceptually:

```text
message.delivered
message_id = 120
```

means messages up to the acknowledged position can be marked delivered for that recipient.

This avoids sending one database update for every message when several messages arrive together.

---

# 👁️ Read Receipts

Read state is also cumulative.

Instead of creating a separate read row for every message, `ConversationMember` stores the latest read message.

```text
Messages:
100
101
102
103
104

last_read_message = 102
```

Therefore:

```text
100 → read
101 → read
102 → read
103 → unread
104 → unread
```

This keeps read tracking efficient and makes unread counts straightforward to calculate.

---

# 🟢 Presence Architecture

Presence is transient state, so it belongs in Redis rather than MySQL.

One user can have several active connections:

```text
User
│
├── Chrome tab
├── Firefox tab
└── Phone
```

Therefore:

```text
one WebSocket disconnect ≠ user offline
```

Relay tracks active socket connections with a Redis-backed TTL/heartbeat strategy.

Current behavior:

- The frontend sends a heartbeat roughly every 20 seconds.
- Presence entries expire after approximately 60 seconds if a connection stops responding.
- A watchdog cleans up stale connections.
- The user is considered online while at least one active connection remains.

Presence events are broadcast to relevant conversations so participants see live online/offline status.

---

# ⌨️ Typing Indicators

Typing is intentionally transient and is not stored in MySQL.

Frontend flow:

```text
User starts typing
      ↓
typing.start
      ↓
Consumer
      ↓
Redis group event
      ↓
Other participant
      ↓
typing.update
```

The frontend automatically sends `typing.stop` when:

- The message is sent
- The input becomes empty
- The typing timeout expires

---

# 📜 Message History and Pagination

Relay uses cursor-style history loading rather than requesting an entire conversation at once.

Example:

```text
GET /chat-api/conversations/<uuid>/messages/?before=837
```

Conceptually:

```sql
WHERE conversation_id = <conversation>
AND id < 837
ORDER BY id DESC
LIMIT <page_size>
```

The frontend:

1. Loads the newest messages first.
2. Displays them chronologically.
3. Detects when the user scrolls near the top.
4. Requests older messages.
5. Prepends them while preserving the user's scroll position.

This keeps large histories efficient.

---

# 🔄 Reconnection and Recovery

WebSocket connections are expected to fail occasionally.

Common causes include:

- Wi-Fi changes
- Mobile network changes
- Browser sleep
- Deployment
- Server restart
- Temporary Redis interruption

The active chat socket includes reconnect behavior so the frontend can recover without requiring a full browser refresh.

Conceptually:

```text
Connection lost
      ↓
Reconnect delay
      ↓
New WebSocket attempt
      ↓
Connection restored
      ↓
Continue real-time updates
```

Durable state remains recoverable through REST because messages and conversation state are stored in MySQL rather than only in WebSocket memory.

---

# 🗑️ Conversation Deletion

Relay supports deleting a direct conversation.

REST handles the durable delete:

```text
DELETE /chat-api/conversations/<conversation_id>/
```

The backend verifies that the authenticated user belongs to the conversation before deletion.

Django cascade relationships remove related:

```text
Conversation
   ↓
ConversationMember
   ↓
Message
   ↓
MessageDelivery
```

After the database delete, the backend broadcasts:

```text
conversation.deleted
```

to the personal user groups of the affected members.

Connected clients then remove the deleted conversation from the sidebar immediately.

---

# ⚛️ React Frontend Architecture

The frontend is organized around services, hooks, reusable UI components, shared types, and application context.

```text
src/
├── api/
│   ├── apiClient.ts
│   ├── auth_service.ts
│   ├── user_service.ts
│   └── chat_service.ts
│
├── websocket/
│   └── chat_socket.ts
│
├── hooks/
│   ├── useChatSocket.ts
│   └── useUserChatSockets.ts
│
├── context/
│   └── AuthContext.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── components/
│   ├── layout/
│   ├── conversations/
│   └── chat/
│
├── pages/
│   ├── ChatPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
│
└── types/
    ├── auth.ts
    └── chat.ts
```

Important responsibilities:

- `AuthContext` owns authentication state.
- `apiClient.ts` handles REST requests and JWT refresh behavior.
- `chat_service.ts` contains Relay REST endpoints.
- `chat_socket.ts` builds authenticated WebSocket URLs.
- `useChatSocket` manages the active conversation socket.
- `useUserChatSockets` manages user-level sidebar events.
- `RelayLayout` owns selected conversation and conversation list state.
- `ChatPage` owns active message state.

---

# 📱 Responsive Design

Relay V1 includes responsive behavior for desktop and mobile.

Desktop:

```text
┌──────────────┬──────────────────────────────┐
│ Sidebar      │ Active Chat                  │
│              │                              │
│ Conversations│ Messages                     │
│              │                              │
└──────────────┴──────────────────────────────┘
```

Mobile without a selected conversation:

```text
┌──────────────────────────┐
│ Sidebar                  │
│ Conversation List        │
│                          │
└──────────────────────────┘
```

Mobile with an active conversation:

```text
┌──────────────────────────┐
│ ← User Header            │
│                          │
│ Messages                 │
│                          │
│ Composer                 │
└──────────────────────────┘
```

The mobile chat header provides a back button that returns to the conversation list.

The composer also supports:

```text
Enter         → send message
Shift + Enter → insert newline
```

The textarea automatically expands until a maximum height is reached, after which it scrolls internally.

---

# 🔴 Redis

Redis is the shared communication layer used by Django Channels.

```text
Consumer A
    │
    ▼
Channel Layer
    │
    ▼
channels-redis
    │
    ▼
Redis
    │
    ▼
Consumer B
```

Redis is used for:

- Channels group messaging
- Cross-process real-time events
- Presence connection state
- Heartbeats / TTL state

Redis is **not** the permanent message database.

If Redis goes down temporarily:

```text
Users / Conversations / Messages / Read state → remain in MySQL
Live messages / typing / presence / receipts    → temporarily disrupted
```

---

# 👷 Consumer, Worker, Channel, and Group

## Consumer

A Consumer is a Python object responsible for one WebSocket connection.

```text
Browser Tab
    ↓
WebSocket
    ↓
Consumer
```

## Channel

Each Consumer receives a unique internal channel name.

```python
self.channel_name
```

Think of it as the Consumer's internal inbox/address.

## Group

A group is a logical collection of Consumer channels.

Conversation example:

```text
chat_<conversation_uuid>
├── User A browser channel
├── User A phone channel
└── User B browser channel
```

User-level group example:

```text
chat_user_42
├── Chrome
├── Firefox
└── Phone
```

## Worker / Process

Separate ASGI processes do not share normal Python memory.

```text
Process A memory ≠ Process B memory
```

Redis allows Channels events to cross that boundary.

```text
Consumer A
   ↓
Redis
   ↓
Consumer B
```

---

# ⚠️ `group_send()` vs `self.send()`

These operations solve different problems.

## `group_send()`

```python
await self.channel_layer.group_send(...)
```

Sends an **internal Channels event** through the channel layer.

```text
Consumer
   ↓
Channels
   ↓
Redis
   ↓
Consumer(s)
```

It does not directly send bytes to the browser.

## `self.send()`

```python
await self.send(...)
```

Sends a WebSocket frame through the current Consumer's client connection.

```text
Consumer
   ↓
ASGI
   ↓
WebSocket
   ↓
Browser
```

A Channels event such as:

```python
{
    "type": "chat.message",
    "message": message,
}
```

maps to a Consumer method named:

```python
async def chat_message(self, event):
    ...
```

Channels converts the `.` in the event type to `_` when dispatching to the handler.

---

# ⚡ ASGI

ASGI stands for **Asynchronous Server Gateway Interface**.

Django's traditional WSGI path works well for request/response HTTP traffic, but WebSockets remain open for long periods and need an asynchronous protocol interface.

```text
Browser WebSocket
      ↓
Daphne
      ↓
ASGI
      ↓
Django Channels
      ↓
Consumer
```

The Django project therefore contains both:

```text
websitethree/
├── wsgi.py
└── asgi.py
```

WSGI continues to serve existing HTTP traffic while ASGI serves Relay's WebSocket traffic.

---

# ⚡ Daphne

Daphne is Relay's production ASGI protocol server.

It loads:

```text
websitethree.asgi:application
```

and listens locally on:

```text
127.0.0.1:8001
```

The port is intentionally bound to the loopback interface rather than `0.0.0.0` because clients should communicate with Apache, not directly with Daphne.

```text
Internet
   ↓
Apache :443
   ↓
ws://127.0.0.1:8001
   ↓
Daphne
```

---

# 🌐 Apache2 Production Routing

Apache remains the public entry point for the server.

Normal traffic:

```text
HTTPS
  ↓
Apache
  ↓
mod_wsgi
  ↓
wsgi.py
  ↓
Django
```

Relay WebSocket traffic:

```text
WSS
 ↓
Apache
 ↓
Proxy /ws/
 ↓
Daphne :8001
 ↓
asgi.py
 ↓
Channels
```

The SSL VirtualHost contains the WebSocket proxy:

```apache
ProxyPass "/ws/" "ws://127.0.0.1:8001/ws/"
ProxyPassReverse "/ws/" "ws://127.0.0.1:8001/ws/"
```

Common required Apache proxy modules:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
```

After editing the Apache VirtualHost:

```bash
sudo apache2ctl configtest
```

Expected:

```text
Syntax OK
```

Then reload or restart Apache:

```bash
sudo systemctl reload apache2
```

or:

```bash
sudo systemctl restart apache2
```

---

# 🚀 Production Setup Commands

The following commands are useful when provisioning, deploying, debugging, or verifying Relay in production.

## Redis

Install:

```bash
sudo apt update
sudo apt install redis-server
```

If package dependencies are broken:

```bash
sudo apt --fix-broken install
```

Enable Redis at boot:

```bash
sudo systemctl enable redis-server
```

Start Redis:

```bash
sudo systemctl start redis-server
```

Restart Redis:

```bash
sudo systemctl restart redis-server
```

Check Redis service status:

```bash
sudo systemctl status redis-server
```

Verify connectivity:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

Stop Redis when intentionally testing failures:

```bash
sudo systemctl stop redis-server
```

---

## Daphne — Manual Smoke Test

Activate the project's virtual environment first, then run:

```bash
daphne -b 127.0.0.1 -p 8001 websitethree.asgi:application
```

This is useful for testing, but production should use systemd rather than leaving Daphne attached to an SSH session.

Check if anything is listening on port 8001:

```bash
sudo ss -ltnp | grep 8001
```

---

## Daphne systemd Service

Relay uses a persistent service named:

```text
daphne-websitethree.service
```

Common commands:

```bash
sudo systemctl start daphne-websitethree
sudo systemctl stop daphne-websitethree
sudo systemctl restart daphne-websitethree
sudo systemctl status daphne-websitethree
sudo systemctl enable daphne-websitethree
```

After changing a systemd unit file:

```bash
sudo systemctl daemon-reload
sudo systemctl restart daphne-websitethree
```

Follow live Daphne logs:

```bash
sudo journalctl -u daphne-websitethree -f
```

Show recent Daphne logs:

```bash
sudo journalctl -u daphne-websitethree -n 100 --no-pager
```

Show logs from the current boot:

```bash
sudo journalctl -u daphne-websitethree -b
```

Example service shape:

```ini
[Unit]
Description=Daphne ASGI Server for websitethree
After=network.target redis-server.service

[Service]
User=<server-user>
Group=<server-group>
WorkingDirectory=/path/to/websitethree
ExecStart=/path/to/venv/bin/daphne -b 127.0.0.1 -p 8001 websitethree.asgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Use the actual deployment user, group, working directory, and virtual-environment path for the server.

---

## Apache2

Check status:

```bash
sudo systemctl status apache2
```

Validate configuration:

```bash
sudo apache2ctl configtest
```

Reload after a safe configuration change:

```bash
sudo systemctl reload apache2
```

Restart:

```bash
sudo systemctl restart apache2
```

Enable at boot:

```bash
sudo systemctl enable apache2
```

Tail Apache error logs:

```bash
sudo tail -f /var/log/apache2/error.log
```

Tail Apache access logs:

```bash
sudo tail -f /var/log/apache2/access.log
```

List enabled proxy modules:

```bash
apache2ctl -M | grep proxy
```

---

## Django / ASGI Verification

Verify Django configuration:

```bash
python manage.py check
```

Run migrations:

```bash
python manage.py migrate
```

Create new migrations when models change:

```bash
python manage.py makemigrations
```

Collect static files when needed:

```bash
python manage.py collectstatic --noinput
```

Local development server:

```bash
python manage.py runserver
```

In local development, Django Channels/Daphne integration handles the ASGI development path, so a second manually launched Daphne process is normally unnecessary.

---

# ⚙️ Example Django Channels Configuration

```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}
```

The current single-EC2 setup can use `127.0.0.1:6379` because Redis is running on the same server.

Redis should not be publicly exposed in this deployment.

---

# 🧭 ASGI Application Structure

A simplified ASGI configuration looks like:

```python
import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "websitethree.settings",
)

django_asgi_app = get_asgi_application()

from chat_api.middleware import JwtAuthMiddleware
from chat_api.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JwtAuthMiddleware(
        URLRouter(websocket_urlpatterns)
    ),
})
```

One important implementation detail is that Django should be initialized through `get_asgi_application()` before importing application modules that may touch Django models or settings.

---

# 🔀 WebSocket Routing

Relay currently exposes:

```python
path(
    "ws/chat/",
    ChatUserConsumer.as_asgi(),
),

path(
    "ws/chat/<uuid:conversation_id>/",
    ChatConsumer.as_asgi(),
),
```

These correspond to:

```text
/ws/chat/
→ user-level global Relay events

/ws/chat/<conversation_id>/
→ selected conversation events
```

---

# 🔧 Environment Configuration

Example frontend development environment:

```env
VITE_AUTH_API_URL=http://127.0.0.1:8000/resume-analyzer-app-api
VITE_RELAY_API_URL=http://127.0.0.1:8000/chat-api
VITE_WS_BASE_URL=ws://127.0.0.1:8000
VITE_GOOGLE_CLIENT_ID=...
```

Production WebSockets use:

```env
VITE_WS_BASE_URL=wss://jorgeramirez.net
```

The frontend then appends the Relay WebSocket path.

---

# 🔄 Normal Production Deployment Lifecycle

Redis, Apache proxy configuration, and the systemd unit are **server provisioning**. They are not recreated on every deployment.

A normal application deployment generally looks like:

```text
git pull
   ↓
update Python dependencies if required
   ↓
run migrations
   ↓
build frontend / collect static files
   ↓
restart Daphne
   ↓
reload/restart normal HTTP application services if needed
```

Typical commands:

```bash
git pull
```

```bash
source venv/bin/activate
pip install -r requirements.txt
```

```bash
python manage.py migrate
```

```bash
python manage.py collectstatic --noinput
```

```bash
sudo systemctl restart daphne-websitethree
```

```bash
sudo apache2ctl configtest
sudo systemctl reload apache2
```

Daphne must be restarted after relevant backend changes because it is a persistent Python process and may still have older imported modules in memory.

---

# 🧪 Production Troubleshooting Checklist

When WebSockets stop connecting, check the system from the inside out.

## 1. Is Redis alive?

```bash
redis-cli ping
```

Expected:

```text
PONG
```

## 2. Is Daphne running?

```bash
sudo systemctl status daphne-websitethree
```

## 3. Is Daphne listening on port 8001?

```bash
sudo ss -ltnp | grep 8001
```

## 4. Are Daphne logs showing an exception?

```bash
sudo journalctl -u daphne-websitethree -n 100 --no-pager
```

or live:

```bash
sudo journalctl -u daphne-websitethree -f
```

## 5. Is Apache configuration valid?

```bash
sudo apache2ctl configtest
```

## 6. Are the proxy modules loaded?

```bash
apache2ctl -M | grep proxy
```

## 7. Is Apache healthy?

```bash
sudo systemctl status apache2
```

## 8. Check Apache logs

```bash
sudo tail -f /var/log/apache2/error.log
```

## 9. Verify Django itself

```bash
python manage.py check
```

## 10. Verify the frontend is using WSS in production

```text
wss://jorgeramirez.net
```

not:

```text
ws://127.0.0.1:8000
```

---

# 💥 Failure Behavior

## Redis Failure

Durable data remains safe in MySQL:

```text
Users           ✅
Conversations   ✅
Messages        ✅
Read state      ✅
Delivery rows   ✅
```

Real-time coordination may temporarily fail:

```text
Live delivery   ❌
Typing          ❌
Presence        ❌
Live receipts   ❌
```

## Daphne Failure

Normal HTTP traffic can continue through Apache + WSGI, but Relay WebSockets fail until the Daphne service is restored.

## Apache Failure

Both the normal website and Relay's public WSS entry point become unavailable.

## Client Connection Failure

The socket reconnects and durable state can be recovered through REST.

## Recipient Offline

Messages remain stored in MySQL and are loaded when the recipient returns.

---

# ☁️ Scaling Beyond the Current EC2 Deployment

The current V1 production architecture runs the core services on a single EC2 machine, which is appropriate for the current workload and portfolio deployment.

The application design can later move toward:

```text
                        Application Load Balancer
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
              EC2 App 1       EC2 App 2       EC2 App 3
                  │               │               │
              ASGI Workers     ASGI Workers     ASGI Workers
                  │               │               │
                  └───────────────┼───────────────┘
                                  │
                     ┌────────────┴────────────┐
                     ▼                         ▼
                ElastiCache                  RDS
                  Redis                      MySQL
```

The important point is that the application does not depend on local Python process memory for shared real-time state.

Redis and MySQL provide shared infrastructure, so additional application processes or instances can be introduced later.

---

# 🔮 V2 Ideas

Potential future additions:

- Conversation search
- Group conversations
- Attachments
- Images
- Reactions
- Message editing
- Message deletion
- Reply-to-message
- Conversation names
- Group administrators
- Push notifications
- Redis-backed rate limiting
- Auto Scaling Groups
- Managed ElastiCache
- Managed RDS
- Multi-AZ infrastructure

These are intentionally outside the Relay V1 scope.

---

# 🧠 Simplified Terms to Lock In

## WebSocket

```text
Persistent bidirectional connection
between React and a Django Consumer.
```

## ASGI

```text
Asynchronous server interface that allows
Django to handle WebSockets and other
long-lived protocols.
```

## Daphne

```text
Production ASGI protocol server.
Runs websitethree.asgi:application.
```

## Consumer

```text
Python object responsible for one
WebSocket connection.
```

## Channel

```text
Unique internal address/inbox
for a Consumer.
```

## Group

```text
Logical collection of Consumer channels.
```

## Redis

```text
Shared, fast, transient communication layer
used by Django Channels and presence tracking.
```

## MySQL

```text
Durable source of truth for application data.
```

## Apache

```text
Public HTTPS/WSS entry point.
Routes normal HTTP to WSGI and /ws/ to Daphne.
```

## WSGI

```text
Traditional Django request/response interface
used by the existing HTTP application.
```

## Worker / Process

```text
Independent running Python process.
Processes do not share normal Python memory.
```

## `channels-redis`

```text
Redis-backed implementation of the
Django Channels channel layer.
```

---

# 🔑 Architecture Rules to Remember

1. **MySQL is the durable source of truth.**
2. **Redis is for transient real-time coordination.**
3. **A WebSocket connects a browser to a Consumer.**
4. **One browser tab can create multiple Consumers because Relay intentionally uses a user socket and an active-conversation socket.**
5. **`group_send()` sends an internal Channels event; `self.send()` sends a WebSocket frame to the browser.**
6. **Consumers in different Python processes communicate through Redis rather than shared Python memory.**
7. **Apache remains the public entry point in production.**
8. **Normal HTTP stays on Apache + mod_wsgi + WSGI.**
9. **Only `/ws/` traffic is proxied to Daphne.**
10. **Daphne executes the ASGI application.**
11. **Redis and Daphne run as persistent services.**
12. **Ports `6379` and `8001` do not need to be publicly exposed in the current architecture.**
13. **Persistent data is written before live events are broadcast.**
14. **Client-generated message IDs protect against duplicate sends.**
15. **REST recovers state; WebSockets keep state live.**

---

# 🏁 Final V1 Architecture Summary

Relay's completed V1 can be summarized as:

```text
                         USER A
                           │
                           ▼
                    React + TypeScript
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
           REST                       WebSocket
             │                           │
             ▼                           ▼
            DRF                     Apache :443
             │                           │
             ▼                           ▼
           MySQL                    Proxy /ws/
                                         │
                                         ▼
                                   Daphne :8001
                                         │
                                         ▼
                                      ASGI
                                         │
                                         ▼
                                Django Channels
                                         │
                                         ▼
                                      Consumer
                                         │
                                         ▼
                                 Redis Channel Layer
                                         │
                           ┌─────────────┴─────────────┐
                           ▼                           ▼
                     Consumer A                  Consumer B
                           │                           │
                           ▼                           ▼
                       WebSocket                   WebSocket
                                                       │
                                                       ▼
                                                 React USER B

                             MySQL
                               │
                               └── permanent conversations,
                                   messages, reads, deliveries
```

Relay demonstrates how a modern React frontend can combine traditional REST APIs with persistent WebSocket connections while Django, Channels, Redis, MySQL, Apache, Daphne, and AWS infrastructure work together behind the scenes.

**V1 is complete.**