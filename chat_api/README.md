# 💬 Relay

Real-Time Messaging, Built to Scale.

A full-stack real-time messaging platform built to explore WebSockets, asynchronous Django, Redis-backed communication, distributed systems, reliable message delivery, horizontal scaling, and real-time state synchronization.

Relay is the application's public-facing name, while the codebase uses descriptive application names such as chat_api for the Django backend and chat-frontend for the React frontend.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-A30000?style=for-the-badge\&logo=django\&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge\&logo=socketdotio\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge\&logo=amazonwebservices\&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge\&logo=amazonec2\&logoColor=white)
![Amazon RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge\&logo=amazonrds\&logoColor=white)
![Amazon ElastiCache](https://img.shields.io/badge/Amazon_ElastiCache-C925D1?style=for-the-badge\&logo=amazonwebservices\&logoColor=white)

---

# 📖 Overview

Relay is a full-stack real-time chat platform built with a React + TypeScript frontend and a Django backend.

Unlike a traditional REST-only application, Relay maintains persistent WebSocket connections between clients and the backend.

This enables events such as:

💬 Real-time messages
🟢 Online presence
⌨️ Typing indicators
📬 Delivery receipts
👁️ Read receipts
🔔 Unread message updates
📱 Multi-device synchronization
🔄 Reconnection and state recovery

Relay is also designed as a practical exploration of distributed systems and horizontally scalable application architecture.

Instead of assuming every connected user is handled by the same Python process or even the same EC2 instance, the architecture uses a Redis-backed Django Channels channel layer so Consumers running in separate worker processes and separate application servers can exchange real-time events.

---

# 🎯 Project Goals

The project is designed to demonstrate more than simply opening a WebSocket.

Core engineering goals include:

* Persistent bidirectional communication using WebSockets
* Asynchronous request/event handling with ASGI
* Django Channels Consumers
* Redis-backed cross-process communication
* Multiple ASGI worker processes
* Multiple application servers
* Load-balanced traffic
* Durable message persistence
* Client-generated message IDs and idempotency
* Message ordering
* Delivery/read state
* Multi-device connections
* Presence tracking
* Reconnection handling
* REST/WebSocket state synchronization
* Horizontal scalability
* Failure recovery
* Managed and self-hosted AWS infrastructure options

---

# 🧰 Technology Stack

## Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat-square\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square\&logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square\&logo=vite\&logoColor=white)

* **React**
* **TypeScript**
* **Vite**
* Browser WebSocket API
* React state management
* REST API communication
* JWT authentication

## Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat-square\&logo=django\&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/DRF-A30000?style=flat-square\&logo=django\&logoColor=white)

* **Python**
* **Django**
* **Django REST Framework**
* **Django Channels**
* **ASGI**
* **Daphne**
* **channels-redis**

## Data & Infrastructure

![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square\&logo=redis\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square\&logo=mysql\&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square\&logo=amazonwebservices\&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/EC2-FF9900?style=flat-square\&logo=amazonec2\&logoColor=white)

* **MySQL** — durable application state
* **Redis** — transient real-time communication and coordination
* **AWS EC2** — application workers and optional self-hosted infrastructure
* **Elastic Load Balancer** — traffic distribution across application instances
* **Amazon RDS** — optional managed MySQL
* **Amazon ElastiCache for Redis** — optional managed Redis
* **Apache2** — reverse proxy
* **HTTPS / WSS** — secure production HTTP and WebSocket traffic

---

# 🏗️ High-Level Architecture

```text
                        React + TypeScript
                              Client
                                │
                ┌───────────────┴───────────────┐
                │                               │
                │ HTTP / REST                   │ WebSocket
                ▼                               ▼
        Django REST Framework             Django Channels
                │                               │
                │                         ChatConsumer
                │                               │
                │                         Channel Layer
                │                               │
                │                               ▼
                │                             Redis
                │                               │
                │                         Other Consumers
                │                               │
                └───────────────┬───────────────┘
                                ▼
                              MySQL
```

The application intentionally separates three responsibilities:

```text
CLIENT ↔ SERVER
WebSockets
React ↔ Consumer

SERVER ↔ SERVER
Django Channels + Redis
Consumer ↔ Consumer
Worker ↔ Worker
EC2 Instance ↔ EC2 Instance

DURABLE STATE
Django ORM + MySQL
Messages / Conversations / Reads / Deliveries
```

---

# 🌐 REST vs WebSocket Responsibilities

REST and WebSockets serve different purposes.

## REST API

REST handles state that can be requested or recovered later.

Examples:

```text
GET /conversations/
GET /conversations/{id}/messages/
GET /users/search/
POST /conversations/
```

REST will be responsible for:

* Loading conversations
* Loading historical messages
* Searching users
* Creating conversations
* Pagination
* Initial application state
* Re-synchronization after reconnecting

## WebSockets

WebSockets handle events that should happen immediately.

Examples:

```text
message.send
message.new
typing.start
typing.stop
message.delivered
message.read
presence.update
```

WebSockets will be responsible for:

* New messages
* Typing indicators
* Presence updates
* Delivery acknowledgements
* Read acknowledgements
* Live unread-count updates
* Multi-device synchronization

---

# 🔌 WebSockets

Traditional HTTP follows a request/response model:

```text
Browser
   │
   │ Request
   ▼
Server
   │
   │ Response
   ▼
Browser

Connection finishes
```

Chat requires the server to communicate with a client without waiting for another HTTP request.

WebSockets establish a persistent bidirectional connection:

```text
Browser
   │
   │ HTTP Upgrade
   ▼
Server
   │
   ▼
Persistent WebSocket
   │
   ├──── Client → Server
   │
   └──── Server → Client
```

Development:

```text
ws://127.0.0.1:8000/ws/chat/
```

Production will use:

```text
wss://
```

for encrypted WebSocket communication.

---

# ⚡ ASGI

Django traditionally used WSGI for synchronous HTTP applications.

This application uses **ASGI — Asynchronous Server Gateway Interface**.

ASGI supports long-lived protocols such as WebSockets.

A WebSocket connection generates lifecycle events similar to:

```text
websocket.connect
websocket.receive
websocket.receive
websocket.receive
...
websocket.disconnect
```

ASGI sits between the protocol server and Django:

```text
Browser
   │
   │ WebSocket
   ▼
ASGI Server
   │
   │ ASGI Events
   ▼
Django Channels
   │
   ▼
Consumer
```

The project's ASGI application currently routes HTTP and WebSocket traffic separately:

```python
application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": URLRouter(
        chat_api.routing.websocket_urlpatterns
    ),
})
```

---

# 📡 Django Channels

Django Channels extends Django beyond traditional HTTP request/response handling.

Important Channels concepts used by this application include:

* Consumers
* Channels
* Groups
* Channel layers
* WebSocket routing
* Asynchronous event handlers

---

# 👤 Consumers

A **Consumer is a Python object that handles one WebSocket connection**.

For example:

```text
Jorge Chrome
     │
     ▼
WebSocket
     │
     ▼
ChatConsumer #1


Jorge Phone
     │
     ▼
WebSocket
     │
     ▼
ChatConsumer #2


Bob Chrome
     │
     ▼
WebSocket
     │
     ▼
ChatConsumer #3
```

One user can therefore have multiple Consumers.

A Consumer handles events such as:

```python
connect()
receive()
disconnect()
```

It can also handle custom internal Channels events:

```python
chat_message()
```

---

# 📬 Channels

Every Consumer receives a unique:

```python
self.channel_name
```

Conceptually:

```text
Consumer A
channel = specific.abcd123

Consumer B
channel = specific.xyz789
```

A channel can be thought of as an internal **address or inbox** for a particular Consumer.

This allows the Channels infrastructure to route events toward specific Consumer instances.

---

# 👥 Channel Groups

Channels can be organized into groups.

Our current development test uses:

```text
chat_test
```

Two browser tabs produce something conceptually similar to:

```text
chat_test
│
├── Consumer A channel
│
└── Consumer B channel
```

A Consumer joins using:

```python
await self.channel_layer.group_add(
    "chat_test",
    self.channel_name
)
```

An event can then be distributed using:

```python
await self.channel_layer.group_send(
    "chat_test",
    {
        "type": "chat.message",
        "message": text_data
    }
)
```

Every Consumer currently belonging to the group receives the event.

---

# 🔴 Redis

Redis is a separate server process used by the application for extremely fast transient communication and coordination.

During local development, Redis listens on:

```text
127.0.0.1:6379
```

The Django application communicates with Redis through:

```text
Django Channels
      │
      ▼
Channel Layer API
      │
      ▼
channels-redis
      │
      ▼
Redis Server
```

Application code therefore does not need to manually implement low-level Redis messaging.

Instead, it uses the Channels abstraction:

```python
self.channel_layer
```

---

# 🧠 What Redis Does in This Application

Redis is primarily our **real-time communication layer**.

It allows Consumers and worker processes to exchange transient events.

Examples include:

```text
New message
Typing started
Typing stopped
Presence changed
Message delivered
Message read
```

Redis is **not** intended to be the permanent message database.

The architecture follows:

```text
MySQL
│
└── Durable application state

Redis
│
└── Transient real-time coordination
```

A useful mental model for this project is:

```text
Redis = real-time nervous system

MySQL = durable memory
```

---

# 👷 What Is a Worker?

A worker is simply an **independent running Python process executing the Django ASGI application**.

It is not:

* A Consumer
* A Django model
* A Redis object
* A WebSocket

A production server may run several workers:

```text
EC2 Server
│
├── Worker Process 1
├── Worker Process 2
├── Worker Process 3
└── Worker Process 4
```

Each worker loads the Django application.

Conceptually:

```text
Worker 1
│
├── Django
├── Channels
├── chat_api
├── Consumer A
├── Consumer B
└── Consumer C


Worker 2
│
├── Django
├── Channels
├── chat_api
├── Consumer D
└── Consumer E
```

A worker can therefore handle **many Consumer instances**.

---

# 🧠 Worker Memory Isolation

Separate processes have separate memory.

For example:

```text
WORKER 1                       WORKER 2

Python Process                 Python Process

Consumer Jorge                Consumer Bob
      │                            │
      │                            │
      └──────────── X ─────────────┘

       No shared Python memory
```

Worker 1 cannot simply access a Python object living inside Worker 2.

This creates an important problem for real-time communication.

What if Jorge's WebSocket is handled by Worker 1 while Bob's WebSocket is handled by Worker 2?

That is one of the main reasons Redis exists in this architecture.

---

# 🔴 Redis Across Workers

Both worker processes can communicate with the same Redis server.

```text
Worker 1                           Worker 2
│                                  │
└── Jorge Consumer                 └── Bob Consumer
        │                                ▲
        │                                │
        ▼                                │
      Redis ─────────────────────────────┘
```

Worker 1 does not need direct access to Bob's Consumer.

Instead:

```text
Jorge
  │
  ▼
Consumer
  │
  ▼
Worker 1
  │
  ▼
Redis
  │
  ▼
Worker 2
  │
  ▼
Consumer
  │
  ▼
Bob
```

This enables communication even when users are handled by completely different Python processes.

---

# ⚖️ Load Balancer

Once the application runs across multiple EC2 instances, clients need a common entry point.

That is the job of the **load balancer**.

```text
                        Users
                          │
                          ▼
                Application Load Balancer
                    /        |        \
                   /         |         \
                  ▼          ▼          ▼
              EC2 App 1  EC2 App 2  EC2 App 3
```

The load balancer distributes incoming HTTP and WebSocket connections among healthy application instances.

Each application instance can itself run multiple workers.

```text
                    Load Balancer
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           EC2 #1     EC2 #2     EC2 #3
              │          │          │
         ┌────┴───┐ ┌────┴───┐ ┌────┴───┐
         ▼        ▼ ▼        ▼ ▼        ▼
      Worker   Worker     Worker     Worker
```

Once a WebSocket connection is established, that connection remains associated with the application instance handling it for the life of that socket.

Redis ensures that this does not matter for message routing.

A user connected to EC2 #1 can still send a message to a user connected to EC2 #3.

---

# ☁️ AWS Deployment Architecture Options

The application can be deployed using either a largely self-managed infrastructure model or a more managed AWS architecture.

Both use the same application design.

---

# 🖥️ Option A — Self-Managed AWS Infrastructure

This approach uses dedicated EC2 instances for the shared data services.

```text
                            Internet
                               │
                               ▼
                  Application Load Balancer
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
            EC2 App #1    EC2 App #2    EC2 App #3
                 │             │             │
          ASGI Workers   ASGI Workers   ASGI Workers
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
         EC2 Redis Server              EC2 MySQL Server
         Shared real-time              Shared durable
         communication                 application state
```

### Application EC2 Instances

Multiple EC2 instances run:

* Django
* Django REST Framework
* Django Channels
* ASGI server
* Application workers
* React static assets or reverse-proxied frontend

Example:

```text
EC2 App #1
├── Worker 1
├── Worker 2
└── Worker 3

EC2 App #2
├── Worker 4
├── Worker 5
└── Worker 6
```

### Dedicated Redis EC2

A separate EC2 instance can host Redis.

```text
EC2 Redis
│
└── Redis Server :6379
```

All application workers connect to the same Redis server.

```text
EC2 App #1 ─┐
EC2 App #2 ─┼──► Redis EC2
EC2 App #3 ─┘
```

### Dedicated MySQL EC2

Another EC2 instance can host the shared MySQL database.

```text
EC2 MySQL
│
└── MySQL Server :3306
```

All application instances use the same durable database.

```text
EC2 App #1 ─┐
EC2 App #2 ─┼──► MySQL EC2
EC2 App #3 ─┘
```

This approach provides significant control and can be cost-conscious, but requires the application owner to manage:

* Backups
* Database updates
* Redis updates
* Failover
* Monitoring
* Disk management
* Security hardening
* Recovery
* Replication if introduced later

---

# ☁️ Option B — Managed AWS Infrastructure

A more production-oriented architecture can replace self-managed Redis and MySQL servers with managed AWS services.

```text
                             Internet
                                │
                                ▼
                   Application Load Balancer
                                │
                 ┌──────────────┼──────────────┐
                 ▼              ▼              ▼
             EC2 App #1     EC2 App #2     EC2 App #3
                 │              │              │
             Workers        Workers        Workers
                 │              │              │
                 └──────────────┼──────────────┘
                                │
                  ┌─────────────┴─────────────┐
                  ▼                           ▼
           Amazon ElastiCache             Amazon RDS
               for Redis                  for MySQL
                  │                           │
          Real-time channel            Durable database
              layer state                   state
```

---

# 🔴 Amazon ElastiCache for Redis

Instead of manually maintaining Redis on EC2:

```text
EC2 Redis Server
```

the application can use:

```text
Amazon ElastiCache for Redis
```

Application workers still interact with it through `channels-redis`.

From the Django application's perspective:

```text
Consumer
   │
   ▼
Channel Layer
   │
   ▼
channels-redis
   │
   ▼
ElastiCache Redis
```

The application logic stays largely unchanged.

Benefits of a managed Redis service can include:

* AWS-managed infrastructure
* Monitoring integrations
* Easier replication options
* High-availability configurations
* Automated maintenance capabilities
* Reduced operating-system administration

---

# 🗄️ Amazon RDS for MySQL

Likewise, the permanent application database can move from:

```text
Self-hosted MySQL on EC2
```

to:

```text
Amazon RDS for MySQL
```

Django continues using the normal ORM:

```text
Django ORM
    │
    ▼
MySQL protocol
    │
    ▼
Amazon RDS
```

The application's models do not need to fundamentally change just because the underlying MySQL server is managed by RDS.

Potential benefits include:

* Automated backups
* Managed database maintenance
* Monitoring
* Easier recovery
* Multi-AZ options
* Storage scaling options
* Reduced database administration

---

# 🔄 Self-Managed vs Managed Architecture

```text
SELF-MANAGED                       MANAGED

EC2 Application Servers           EC2 Application Servers
        │                                  │
        ▼                                  ▼
EC2 Redis Server                  Amazon ElastiCache
        │                                  │
        ▼                                  ▼
EC2 MySQL Server                  Amazon RDS
```

The application layer remains conceptually identical:

```text
React
  ↓
Load Balancer
  ↓
EC2 Application Instances
  ↓
ASGI Workers
  ↓
Consumers
  ↓
Redis Channel Layer

        +

Django ORM
  ↓
MySQL
```

Only the infrastructure hosting Redis and MySQL changes.

---

# 📈 Horizontal Scaling

The application is intentionally designed to scale horizontally.

Vertical scaling means:

```text
One server
   │
   ▼
Give it more CPU/RAM
```

Horizontal scaling means:

```text
Add more application servers
```

Example:

```text
Before

Load Balancer
     │
     ▼
   EC2 #1


After

Load Balancer
   │   │   │
   ▼   ▼   ▼
EC2 #1 #2  #3
```

Because the application servers share:

```text
Redis
MySQL
```

they do not need to share local Python memory.

This makes individual application instances more replaceable and allows additional workers or servers to be introduced as traffic grows.

---

# 🌍 Fully Scaled Architecture

A future production deployment could look like:

```text
                              INTERNET
                                  │
                                  ▼
                     ┌─────────────────────┐
                     │ Application Load    │
                     │     Balancer        │
                     └──────────┬──────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
         ┌────────────┐   ┌────────────┐  ┌────────────┐
         │  EC2 App 1 │   │  EC2 App 2 │  │  EC2 App 3 │
         └──────┬─────┘   └──────┬─────┘  └──────┬─────┘
                │                │                │
          ┌─────┴─────┐    ┌─────┴─────┐    ┌─────┴─────┐
          │ Worker 1  │    │ Worker 3  │    │ Worker 5  │
          │ Worker 2  │    │ Worker 4  │    │ Worker 6  │
          └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
                │                │                │
                └────────────────┼────────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
         ┌──────────────────┐        ┌──────────────────┐
         │ Amazon           │        │ Amazon RDS       │
         │ ElastiCache      │        │ for MySQL        │
         │ for Redis        │        │                  │
         └──────────────────┘        └──────────────────┘
                   │                           │
                   │                           │
            Real-time events              Durable state
```

The self-managed equivalent would simply replace the two managed services with dedicated EC2 instances:

```text
ElastiCache → Redis EC2

RDS         → MySQL EC2
```

---

# 🔄 Current Message Flow

The Redis proof-of-concept currently works as follows:

```text
Browser A
    │
    │ socket.send()
    ▼
WebSocket
    │
    ▼
Consumer A
    │
    │ receive()
    ▼
channel_layer.group_send()
    │
    ▼
channels-redis
    │
    ▼
Redis
    │
    ├────────────────────┐
    ▼                    ▼
Consumer A          Consumer B
    │                    │
chat_message()      chat_message()
    │                    │
self.send()         self.send()
    │                    │
    ▼                    ▼
WebSocket           WebSocket
    │                    │
    ▼                    ▼
Browser A           Browser B
```

Both browser tabs successfully receive the message.

---

# ⚠️ `group_send()` vs `self.send()`

These two operations serve completely different purposes.

## `group_send()`

```python
await self.channel_layer.group_send(...)
```

means:

> Send an **internal Channels event** to Consumer channels belonging to a group.

Flow:

```text
Consumer
   │
   ▼
Channel Layer
   │
   ▼
Redis
   │
   ▼
Consumer(s)
```

It does **not** directly send a WebSocket frame.

## `self.send()`

```python
await self.send(...)
```

means:

> Send data through this Consumer's actual WebSocket connection.

Flow:

```text
Consumer
   │
   ▼
ASGI
   │
   ▼
WebSocket
   │
   ▼
Browser
```

---

# 📨 Channels Event Dispatching

A Channels event such as:

```python
{
    "type": "chat.message",
    "message": "Hello"
}
```

is mapped by Channels to:

```python
chat_message()
```

In other words:

```text
chat.message
     │
     ▼
chat_message()
```

The handler can then send the event to the connected browser:

```python
async def chat_message(self, event):
    await self.send(...)
```

---

# ⚛️ React Frontend Architecture

The React frontend will have two primary communication paths:

```text
React Application
│
├── REST API
│   ├── Conversation list
│   ├── Historical messages
│   ├── User search
│   └── Initial state
│
└── WebSocket
    ├── New messages
    ├── Typing events
    ├── Presence
    ├── Delivery events
    └── Read events
```

---

# 🔌 React WebSocket Lifecycle

The browser establishes the connection using:

```typescript
const socket = new WebSocket(
    "ws://127.0.0.1:8000/ws/chat/"
);
```

React will eventually manage the socket lifecycle with `useEffect`.

```text
Component mounts
      │
      ▼
Create WebSocket
      │
      ▼
Register event handlers
      │
      ├── onopen
      ├── onmessage
      ├── onerror
      └── onclose
      │
      ▼
Component active
      │
      ▼
Component unmounts
      │
      ▼
Close WebSocket
```

---

# 🧠 React State Management

Receiving a WebSocket event should update application state rather than directly manipulating the DOM.

```text
WebSocket event
      │
      ▼
socket.onmessage
      │
      ▼
Parse event
      │
      ▼
Update React state
      │
      ▼
React re-renders
      │
      ▼
New message appears
```

Possible state includes:

```typescript
messages
conversations
onlineUsers
typingUsers
unreadCounts
connectionStatus
```

---

# 🔄 Reconnection Strategy

WebSocket connections are not guaranteed to remain open forever.

Connections can disappear because of:

* Network changes
* Browser sleep
* Server restart
* Deployment
* Redis interruption
* Wi-Fi loss
* Mobile network changes

Planned strategy:

```text
Connection lost
      │
      ▼
Wait
      │
      ▼
Reconnect attempt
      │
      ├── failure → increase delay
      │
      └── success
              │
              ▼
         REST resync
              │
              ▼
       Restore live state
```

Potential exponential backoff:

```text
1 second
2 seconds
4 seconds
8 seconds
...
```

---

# 🗄️ Planned Database Architecture

## Conversation

```text
Conversation
├── id : UUID
├── direct_key
├── created_at
└── updated_at
```

`direct_key` prevents duplicate one-to-one conversations.

```text
User 42 + User 99
        │
        ▼
sorted IDs
        │
        ▼
"42:99"
```

---

# 👥 ConversationMember

```text
ConversationMember
├── conversation
├── user
├── joined_at
├── last_read_message
└── last_read_at
```

This stores user-specific conversation state and supports future group conversations.

---

# 💬 Message

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

---

# 🆔 Client Message IDs & Idempotency

WebSockets do not provide exactly-once delivery guarantees.

The frontend will therefore generate a UUID before sending a message.

```json
{
    "type": "message.send",
    "client_message_id": "550e8400-e29b-41d4-a716-446655440000",
    "content": "Hey Bob"
}
```

The database will enforce uniqueness similar to:

```text
(sender, client_message_id)
```

This prevents retries from producing duplicate messages.

---

# 📬 MessageDelivery

```text
MessageDelivery
├── message
├── user
└── delivered_at
```

Unique:

```text
(message, user)
```

---

# 👁️ Read State

Rather than creating one read row per message, each conversation membership tracks the latest read message.

```text
Messages

#100
#101
#102
#103
#104

Bob.last_read_message = #102
```

Therefore:

```text
#100 → read
#101 → read
#102 → read
#103 → unread
#104 → unread
```

---

# 📊 Message State

```text
PENDING
Client created message locally

SENT
Message exists in MySQL

DELIVERED
Recipient acknowledged receipt

READ
Recipient's read pointer reached/passed message
```

```text
Pending
   │
   ▼
Sent
   │
   ▼
Delivered
   │
   ▼
Read
```

---

# 🟢 Presence

A user may have multiple WebSocket connections:

```text
Jorge
│
├── Chrome
├── Firefox
└── Phone
```

Therefore:

```text
one disconnect ≠ user offline
```

Redis can maintain ephemeral connection state while MySQL stores durable information such as:

```text
last_seen_at
```

---

# 👥 Planned Conversation Groups

The temporary:

```text
chat_test
```

group will eventually become:

```text
conversation_<conversation_id>
```

Example:

```text
conversation_52
│
├── Jorge Chrome
├── Jorge Phone
└── Bob Chrome
```

---

# 👤 Planned User Groups

Each authenticated user may also have a personal Channels group:

```text
user_42
│
├── Chrome
├── Firefox
└── Phone
```

Useful for:

* Multi-device synchronization
* New-message notifications
* Unread-count updates
* Delivery updates
* Presence-related events

---

# 🔐 WebSocket Authentication

The application already uses JWT authentication for REST.

WebSockets require a separate authentication strategy because the standard browser WebSocket API does not support arbitrary `Authorization` headers in the same way as `fetch()`.

Planned flow:

```text
WebSocket connection
        │
        ▼
Authenticate user
        │
        ▼
self.scope["user"]
        │
        ▼
Authorize conversation membership
        │
        ▼
Accept privileged events
```

---

# 📨 Planned Production Message Lifecycle

```text
Jorge React
     │
     │ message.send
     ▼
WebSocket
     │
     ▼
Jorge Consumer
     │
     ├── Authenticate
     ├── Authorize
     ├── Validate
     └── Check client_message_id
             │
             ▼
           MySQL
             │
             │ INSERT Message #837
             ▼
           COMMIT
             │
             ▼
     channel_layer.group_send()
             │
             ▼
           Redis
             │
       ┌─────┴─────┐
       ▼           ▼
Worker A         Worker B
       │           │
       ▼           ▼
Jorge Consumer   Bob Consumer
       │           │
       ▼           ▼
WebSocket        WebSocket
       │           │
       ▼           ▼
React            React
```

Critical ordering:

```text
Validate
   ↓
Persist
   ↓
Commit
   ↓
Broadcast
```

---

# 💥 Failure Recovery

## Redis Failure

Durable data remains:

```text
Users           ✅
Conversations   ✅
Messages        ✅
Read state      ✅
```

Real-time functionality may temporarily fail:

```text
Live delivery   ❌
Typing          ❌
Presence        ❌
Live receipts   ❌
```

## WebSocket Failure

The client reconnects and reloads missed durable state through REST.

## Duplicate Send

`client_message_id` prevents duplicate database messages.

## Recipient Offline

The message remains in MySQL and is loaded later through the REST API.

---

# 📜 Message History & Pagination

Historical messages will use cursor-style pagination.

Example:

```text
GET /conversations/52/messages/?before=837
```

Conceptually:

```sql
WHERE conversation_id = 52
AND id < 837
ORDER BY id DESC
LIMIT 50
```

---

# 🧪 Current Development Status

## ✅ Completed

### Backend Infrastructure

* [x] Created `chat_api` Django application
* [x] Installed Django Channels
* [x] Configured ASGI
* [x] Added WebSocket URL routing
* [x] Created `AsyncWebsocketConsumer`
* [x] Established browser → Django WebSocket connection
* [x] Tested WebSocket echo communication
* [x] Installed Redis server through WSL
* [x] Verified Redis with `redis-cli ping`
* [x] Installed `channels-redis`
* [x] Configured Redis-backed channel layer
* [x] Verified Python → Redis connectivity
* [x] Verified direct Channel Layer send/receive
* [x] Verified `group_add()`
* [x] Verified `group_send()`
* [x] Verified two browser tabs receiving group broadcasts
* [x] Confirmed Consumer → Redis → Consumer communication

### Dependency Compatibility

Current dependency pin:

```text
redis==7.4.1
```

with:

```text
channels
channels-redis
```

to preserve the working Channels/Redis configuration.

---

# 🚧 Remaining V1 Work

## Database

* [ ] Create `Conversation`
* [ ] Create `ConversationMember`
* [ ] Create `Message`
* [ ] Create `MessageDelivery`
* [ ] Add database constraints
* [ ] Add indexes
* [ ] Add migrations

## REST API

* [ ] List conversations
* [ ] Create/find direct conversations
* [ ] Search users
* [ ] Load message history
* [ ] Cursor pagination
* [ ] Unread counts

## WebSocket Protocol

* [ ] `message.send`
* [ ] `message.new`
* [ ] `typing.start`
* [ ] `typing.stop`
* [ ] `message.delivered`
* [ ] `message.read`
* [ ] `presence.update`

## Authentication

* [ ] Authenticate WebSocket connections
* [ ] Integrate existing JWT system
* [ ] Populate authenticated user in Consumer scope
* [ ] Validate conversation membership
* [ ] Reject unauthorized connections/events

## Reliability

* [ ] Client-generated message UUIDs
* [ ] Database idempotency constraint
* [ ] Message ordering
* [ ] Reconnect handling
* [ ] Exponential backoff
* [ ] REST state resynchronization
* [ ] Duplicate-event handling

## Presence

* [ ] Track active connections
* [ ] Handle multiple tabs
* [ ] Handle multiple devices
* [ ] Last-seen state
* [ ] Redis presence state
* [ ] Heartbeat / TTL strategy

## React

* [ ] Build chat interface
* [ ] Conversation sidebar
* [ ] Message list
* [ ] Message composer
* [ ] WebSocket lifecycle hook/service
* [ ] Socket event dispatcher
* [ ] Connection state
* [ ] Optimistic messages
* [ ] Pending/sent/delivered/read UI
* [ ] Typing indicators
* [ ] Online indicators
* [ ] Unread badges
* [ ] Infinite/cursor history loading

## Deployment

* [ ] Configure production ASGI server
* [ ] Run multiple worker processes
* [ ] Configure Application Load Balancer
* [ ] Deploy multiple application EC2 instances
* [ ] Configure production Redis
* [ ] Evaluate Redis EC2 vs Amazon ElastiCache
* [ ] Evaluate MySQL EC2 vs Amazon RDS
* [ ] Configure Apache WebSocket reverse proxy if retained
* [ ] Configure HTTPS
* [ ] Configure WSS
* [ ] Configure environment variables
* [ ] Secure Redis/database networking
* [ ] Test load-balanced WebSocket connections

## Distributed-System Testing

* [ ] Run multiple ASGI workers
* [ ] Connect clients to different workers
* [ ] Run multiple EC2 application instances
* [ ] Verify Redis cross-worker delivery
* [ ] Verify Redis cross-instance delivery
* [ ] Verify load balancer WebSocket routing
* [ ] Restart worker during active connection
* [ ] Restart application instance
* [ ] Restart Redis
* [ ] Test duplicate message retry
* [ ] Test temporary network loss
* [ ] Test offline recipient
* [ ] Test multiple tabs/devices
* [ ] Verify state recovery

---

# 🔮 Possible V2 Features

* Group conversations
* Attachments
* Images
* Reactions
* Message editing
* Message deletion
* Reply-to-message
* Search
* Conversation names
* Group administrators
* Push notifications
* Redis-backed rate limiting
* Auto Scaling Groups
* Multi-AZ deployment
* Multiple Redis nodes
* Database replicas
* Horizontal scaling across multiple AWS regions

---

# 🧠 Simplified Terms to Lock In

Use this section as the fast architecture refresher.

## 🖥️ Server / EC2 Instance

```text
SERVER
= A machine running some part of the application.

In AWS:
EC2 instance = virtual server.
```

An EC2 instance might run:

```text
Application workers

OR

Redis

OR

MySQL
```

depending on the deployment design.

---

## 👷 Worker

```text
WORKER
= Independent Python process
  running the Django ASGI application.

One worker can handle many Consumers.

Workers do not share normal
Python memory.
```

```text
EC2 App Server
│
├── Worker 1
│   ├── Consumer A
│   └── Consumer B
│
└── Worker 2
    ├── Consumer C
    └── Consumer D
```

---

## 👤 Consumer

```text
CONSUMER
= Python object responsible for
  one WebSocket connection.
```

```text
Browser
   ↓
WebSocket
   ↓
Consumer
```

---

## 📬 Channel

```text
CHANNEL
= Unique internal address/inbox
  associated with a Consumer.
```

Available as:

```python
self.channel_name
```

---

## 👥 Group

```text
GROUP
= Logical collection of channels.
```

```text
conversation_52
├── Jorge channel
├── Jorge phone channel
└── Bob channel
```

---

## 🔴 Redis

```text
REDIS
= Shared fast communication system
  used by the Channels channel layer.

Lets workers and Consumers exchange
real-time events even when they are
in different processes or servers.
```

```text
Worker A
   ↓
Redis
   ↓
Worker B
```

Redis may run as:

```text
Dedicated EC2 Redis server
```

or:

```text
Amazon ElastiCache for Redis
```

---

## 🗄️ MySQL

```text
MYSQL
= Durable source of truth.
```

Stores:

```text
Users
Conversations
Messages
Membership
Read state
Delivery state
```

MySQL may run as:

```text
Dedicated EC2 MySQL server
```

or:

```text
Amazon RDS for MySQL
```

---

## ⚖️ Load Balancer

```text
LOAD BALANCER
= Common public entry point that
  distributes client connections
  across multiple application servers.
```

```text
Users
  ↓
Load Balancer
 /    |    \
↓     ↓     ↓
EC2  EC2   EC2
```

---

## 🌐 WebSocket

```text
WEBSOCKET
= Persistent bidirectional connection
  between browser and backend.
```

```text
React
  ⇅
Consumer
```

---

## ⚡ ASGI

```text
ASGI
= Interface enabling Django to handle
  asynchronous and long-lived protocols
  such as WebSockets.
```

---

## 📡 Django Channels

```text
DJANGO CHANNELS
= Django extension providing:

Consumers
WebSocket routing
Channel layers
Groups
Async event handling
```

---

## 🔌 channels-redis

```text
CHANNELS-REDIS
= Redis-backed implementation
  of the Django Channels channel layer.
```

```text
Consumer
   ↓
Channel Layer
   ↓
channels-redis
   ↓
Redis
```

---

## ⚛️ React

```text
REACT
= Client UI and client-side state.
```

React uses:

```text
REST
→ load/recover durable state

WebSocket
→ send/receive live events
```

---

## ☁️ RDS

```text
AMAZON RDS
= Managed relational database service.

For this project:
managed MySQL hosting.
```

---

## 🔴 ElastiCache

```text
AMAZON ELASTICACHE
= Managed in-memory data service.

For this project:
managed Redis infrastructure.
```

---

# 🧠 The Entire Architecture in One Diagram

```text
                               USERS
                                 │
                                 ▼
                       ┌─────────────────┐
                       │  Load Balancer  │
                       └────────┬────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
             EC2 #1          EC2 #2          EC2 #3
                │               │               │
             Workers         Workers         Workers
                │               │               │
             Consumers       Consumers       Consumers
                │               │               │
                └───────────────┼───────────────┘
                                │
                         Redis Channel Layer
                                │
                 EC2 Redis OR ElastiCache
                                │
                                │
                       Real-Time Communication


                      Durable Application State
                                │
                                ▼
                    EC2 MySQL OR Amazon RDS
```

And from one user to another:

```text
USER A
  ↓
React
  ↓
WebSocket
  ↓
Consumer
  ↓
Worker
  ↓
EC2 Application Instance
  ↓
Redis / ElastiCache
  ↓
Other EC2 Application Instance
  ↓
Other Worker
  ↓
Other Consumer
  ↓
WebSocket
  ↓
React
  ↓
USER B

            +

MySQL / RDS
= permanent application state
```

---

# 🔑 Seven Rules to Remember

### 1. WebSockets connect clients to Consumers.

```text
React ↔ Consumer
```

### 2. One WebSocket connection corresponds to one Consumer instance.

```text
Browser Tab → Consumer
```

### 3. Consumers live inside worker processes.

```text
Worker
├── Consumer
├── Consumer
└── Consumer
```

### 4. Workers do not share normal Python memory.

```text
Worker A memory ≠ Worker B memory
```

### 5. Redis lets Channels communicate across worker and server boundaries.

```text
Worker A → Redis → Worker B
```

### 6. The load balancer distributes clients across application servers.

```text
Clients
   ↓
Load Balancer
   ↓
Multiple EC2 instances
```

### 7. MySQL remains the durable source of truth.

```text
Redis / ElastiCache
= live communication

MySQL / RDS
= permanent state
```

---

# 🚀 Current Milestone

```text
WebSocket                       ✅
ASGI                            ✅
Django Channels                 ✅
AsyncWebsocketConsumer          ✅
Redis Server                    ✅
channels-redis                  ✅
Channel Layer                   ✅
Channels                        ✅
Groups                          ✅
group_add()                     ✅
group_send()                    ✅
Consumer → Redis → Consumer     ✅
Two-client real-time broadcast  ✅
```

Next architecture milestones:

```text
Infrastructure Proof
        ✅
        │
        ▼
Conversation Models
        │
        ▼
Conversation Groups
        │
        ▼
Persistent Messages
        │
        ▼
Authenticated Real-Time Chat
        │
        ▼
Presence / Typing / Receipts
        │
        ▼
Reconnect / Reliability
        │
        ▼
Multiple Workers
        │
        ▼
Multiple EC2 App Instances
        │
        ▼
Load Balancer
        │
        ▼
Shared Redis + MySQL
        │
        ▼
Optional migration to
ElastiCache + RDS
```

---

## 📌 Current Status

**Phase:** Real-Time Infrastructure Complete / Chat Domain Implementation Beginning

The foundational:

```text
WebSocket
   ↓
Consumer
   ↓
Channels
   ↓
Redis
   ↓
Other Consumer
```

communication path is operational.

The architecture is designed so the same application can eventually run as either:

```text
Load Balancer
     ↓
Multiple EC2 application servers
     ↓
EC2-hosted Redis + EC2-hosted MySQL
```

or:

```text
Load Balancer
     ↓
Multiple EC2 application servers
     ↓
Amazon ElastiCache + Amazon RDS
```

without fundamentally changing the chat application's domain logic.

Next:

> **Build the persistent conversation model and replace the temporary global `chat_test` Redis group with authenticated, conversation-specific WebSocket groups.**
