# 💬 Relay Frontend

Real-Time Messaging UI Built with React, TypeScript, Vite, REST, and WebSockets.

This repository contains the React frontend for **Relay**, a full-stack real-time messaging platform built to demonstrate production-style chat architecture, persistent WebSocket communication, real-time state synchronization, responsive UI design, authentication, message delivery/read state, and integration with a Django + Django Channels backend.

The frontend directory is named:

```text
chat-frontend
```

The public-facing application name is:

```text
Relay
```

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Django](https://img.shields.io/badge/Django_Backend-092E20?style=for-the-badge&logo=django&logoColor=white)
![Redis](https://img.shields.io/badge/Redis_Realtime-DC382D?style=for-the-badge&logo=redis&logoColor=white)

---

# 📖 Overview

Relay's frontend is responsible for the browser-side experience of the chat system.

It combines:

- **React** for UI composition
- **TypeScript** for type safety
- **Vite** for development/build tooling
- **REST APIs** for durable/recoverable application state
- **WebSockets** for live real-time events
- **JWT authentication** for protected API/WebSocket access
- **Responsive CSS** for desktop and mobile layouts

The application is intentionally not built as a REST-only chat interface.

REST is used where request/response behavior makes sense:

```text
Load conversations
Load message history
Search users
Create direct conversations
Delete conversations
Recover durable state
```

WebSockets are used where events must arrive immediately:

```text
New messages
Typing indicators
Presence updates
Delivery receipts
Read receipts
Sidebar conversation updates
Conversation deletion events
```

The result is a frontend that can load reliable state from the backend while also remaining synchronized in real time.

---

# ✅ Relay V1 Frontend Status

Relay V1 is complete.

Implemented frontend functionality includes:

- [x] Login
- [x] Registration
- [x] Google OAuth integration
- [x] JWT access/refresh token authentication
- [x] Protected routes
- [x] Current-user state
- [x] Logout
- [x] Conversation sidebar
- [x] Direct-message user search
- [x] Create or reopen direct conversations
- [x] Active conversation selection
- [x] Persistent message history
- [x] Cursor-based pagination
- [x] Infinite loading of older messages
- [x] Scroll-position preservation
- [x] Initial scroll to newest messages
- [x] Smart bottom-scroll behavior
- [x] Real-time message sending
- [x] Real-time message receiving
- [x] Typing indicators
- [x] Online/offline presence
- [x] Delivery receipts
- [x] Read receipts
- [x] Unread counts
- [x] Live conversation reordering
- [x] Live last-message previews
- [x] Global sidebar updates
- [x] Real-time conversation deletion
- [x] Responsive desktop/mobile layout
- [x] Mobile conversation navigation
- [x] Enter-to-send
- [x] Shift+Enter newline behavior
- [x] Auto-expanding message composer
- [x] Mobile-accessible conversation delete controls
- [x] WebSocket connection status UI
- [x] Reconnection handling for the active conversation socket

---

# 🧰 Frontend Technology Stack

## Core

```text
React
TypeScript
Vite
HTML5
CSS3
```

## Browser APIs

```text
fetch()
WebSocket
localStorage
crypto.randomUUID()
requestAnimationFrame()
setTimeout()
```

## Authentication

```text
SimpleJWT-compatible access token
SimpleJWT-compatible refresh token
Google OAuth
Protected routes
Current-user API validation
```

## Communication

```text
REST
WebSockets
JSON event protocol
```

---

# 🏗️ Frontend Architecture

At a high level:

```text
                         Relay React App
                               │
             ┌─────────────────┴─────────────────┐
             │                                   │
             ▼                                   ▼
          REST API                           WebSockets
             │                                   │
             ▼                                   ▼
     Django REST Framework                 Django Channels
             │                                   │
             ▼                                   ▼
           MySQL                          Redis Channel Layer
```

The browser is therefore connected to the backend through two different communication styles.

---

# 🌐 REST vs WebSocket Responsibilities

A major design decision in Relay is keeping durable state retrieval separate from real-time event delivery.

## REST

REST handles state that can be requested again later.

Examples:

```text
GET conversation list
GET message history
GET user search results
POST direct conversation
DELETE conversation
GET current user
POST login/register/refresh
```

REST is the recovery path.

If the user refreshes the page, the browser can reconstruct the current application state from the database-backed API.

---

## WebSockets

WebSockets handle transient, immediate events.

Examples:

```text
message.send
message.new

typing.start
typing.stop
typing.update

message.delivered

message.read

presence.update

conversation.updated
conversation.deleted
```

These events are useful because the browser does not need to repeatedly poll the backend.

---

# 🔌 Intentional Two-WebSocket Design

Relay intentionally opens **two different WebSocket connections** while a conversation is active.

```text
Relay Browser Tab
│
├── User-level socket
│   /ws/chat/
│
└── Active conversation socket
    /ws/chat/<conversation_id>/
```

This separation keeps global application state independent from the currently selected conversation.

---

## 1. User-Level Socket

Endpoint:

```text
/ws/chat/
```

Purpose:

```text
Relay-wide conversation/sidebar updates
```

It handles events such as:

```text
conversation.updated
conversation.deleted
```

This socket remains useful even if the user is not currently looking at the conversation that changed.

For example:

```text
User A is viewing conversation X

User B sends User A a message in conversation Y

Global user socket receives:
conversation.updated

Relay updates:
- conversation Y last-message preview
- unread count
- sidebar ordering
```

The user does not have to open conversation Y first.

---

## 2. Active Conversation Socket

Endpoint:

```text
/ws/chat/<conversation_id>/
```

Purpose:

```text
Events for the selected conversation
```

It handles:

```text
message.new
message.delivered
message.read
typing.update
presence.update
heartbeat/presence behavior
```

This socket only exists for the currently active chat.

---

# 🧠 Why Two Sockets?

Relay could theoretically multiplex every event through one giant WebSocket.

Instead, the application keeps responsibilities separate.

```text
User Socket
= global notification/conversation state

Conversation Socket
= active conversation interaction
```

Benefits:

- Easier mental model
- Cleaner state ownership
- Active conversation can change without replacing global updates
- Sidebar events continue regardless of selected conversation
- Conversation-specific typing/presence logic stays local
- Avoids routing every event manually through one giant socket handler

A typical active tab therefore has:

```text
1 global socket
+
1 active conversation socket
=
2 WebSocket connections
```

If no conversation is selected:

```text
1 global socket
```

Multiple browser tabs naturally create multiple socket connections.

Relay's presence system is designed with that in mind.

---

# 🔐 Authentication

Relay uses JWT authentication.

Tokens are stored in:

```text
localStorage
```

Keys:

```text
access
refresh
```

The REST client attaches the access token to protected requests.

Conceptually:

```text
React
  │
  ▼
localStorage access token
  │
  ▼
Authorization: Bearer <token>
  │
  ▼
Django REST Framework
```

---

# 🔄 Access Token Refresh

The shared API client handles protected REST requests.

Conceptual flow:

```text
Send API request
      │
      ▼
Response 401?
      │
   ┌──┴──┐
   │     │
  no    yes
   │     │
return   ▼
      refresh token
          │
          ▼
      receive new access token
          │
          ▼
      retry original request
```

This keeps token refresh logic out of individual React components.

---

# 🔌 WebSocket JWT Authentication

The browser WebSocket API does not allow the frontend to attach a custom `Authorization` header in the same way `fetch()` does.

Relay therefore authenticates WebSocket handshakes using the access token in the connection URL.

Example:

```text
ws://127.0.0.1:8000/ws/chat/<conversation_id>/?token=<ACCESS_TOKEN>
```

Production:

```text
wss://jorgeramirez.net/ws/chat/<conversation_id>/?token=<ACCESS_TOKEN>
```

The backend's custom WebSocket JWT middleware validates the token and populates:

```python
scope["user"]
```

The Consumer then verifies that the authenticated user is authorized to access the requested conversation.

---

# 🔑 Auth State

The frontend `AuthContext` manages authentication state.

Responsibilities include:

```text
isAuthenticated
currentUser
login state
logout
initial user validation
```

Authentication initialization uses the stored access token as an initial signal, then validates the session against the backend's current-user endpoint.

This prevents the frontend from blindly assuming that a token existing in local storage means the session is valid.

---

# 🧭 Routing

Relay uses protected routing.

Core application routes include authentication pages and the protected Relay interface.

Conceptually:

```text
Router
│
├── Login
├── Register
│
└── ProtectedRoute
    │
    └── Relay
```

Unauthenticated users are redirected away from protected chat routes.

---

# 📁 Frontend Structure

The frontend is organized around API services, socket services, hooks, components, pages, context, routes, and shared types.

```text
src/
│
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
├── components/
│   ├── layout/
│   │   ├── RelayLayout.tsx
│   │   └── RelaySidebar.tsx
│   │
│   ├── conversations/
│   │   ├── ConversationList.tsx
│   │   └── ConversationCard.tsx
│   │
│   └── chat/
│       ├── ChatHeader.tsx
│       ├── MessageList.tsx
│       ├── Message.tsx
│       ├── MessageComposer.tsx
│       └── TypingIndicator.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── ChatPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
│
└── types/
    ├── chat.ts
    └── auth.ts
```

---

# 🧱 Component Responsibilities

## RelayLayout

`RelayLayout` owns top-level Relay conversation state.

Responsibilities:

```text
Load conversations
Store conversations
Track selected conversation
Handle global user-socket events
Update sidebar state
Handle mobile sidebar/chat navigation
```

This is important because conversation state needs to be shared by both:

```text
RelaySidebar
ChatPage
```

Keeping it at the layout level prevents duplicated or stale copies of sidebar state.

---

## RelaySidebar

The sidebar is responsible for:

```text
Displaying current user
Displaying conversation list
Opening user search
Starting a direct conversation
Selecting a conversation
```

The sidebar does not own the canonical conversation array.

That state lives in `RelayLayout`.

This makes the conversation list easier to keep synchronized with WebSocket updates.

---

## ConversationList

`ConversationList` is intentionally presentation-focused.

It receives:

```text
conversations
selectedConversation
onSelectConversation
isLoading
error
```

and renders `ConversationCard` components.

It does not maintain its own duplicate conversation state.

---

## ConversationCard

Each card derives display information directly from its `conversation` prop.

Displayed state can include:

```text
Other user's name
Avatar initial
Last message
Unread count
Selected state
Delete control
```

The delete control is hidden until hover/focus on desktop but permanently accessible on mobile.

---

## ChatPage

`ChatPage` coordinates the active conversation experience.

Responsibilities include:

```text
Load message history
Track current messages
Connect the conversation WebSocket
Handle incoming events
Track typing users
Track online users
Track read/delivery state
Pass connection status to ChatHeader
Coordinate MessageList and MessageComposer
```

---

## ChatHeader

The header displays:

```text
Back button on mobile
Conversation user
Avatar
Online/offline state
WebSocket connection state
```

Connection state can be:

```text
connecting
connected
reconnecting
disconnected
```

The header's user information comes from:

```text
conversation.other_user
```

---

# 🧩 Direct Conversation Creation

The frontend can create or recover an existing one-to-one conversation.

Request:

```text
POST /conversations/direct/
```

Payload:

```json
{
  "user_id": 42
}
```

The backend uses a deterministic direct-message key.

Conceptually:

```text
User 7 + User 42
      │
      ▼
sort IDs
      │
      ▼
"7:42"
```

That allows the same pair of users to reuse the same direct conversation instead of creating duplicates.

After the response is received, the frontend:

```text
checks whether conversation already exists locally
        │
        ├── yes → keep existing sidebar entry
        │
        └── no  → insert new conversation
                     │
                     ▼
              select conversation
```

---

# 🐛 Important Serializer Context Fix

A major frontend-visible issue occurred when a direct conversation was created.

The conversation existed correctly in the database, but the response did not contain a valid:

```text
other_user
```

This caused:

```text
ChatHeader
```

to disappear because the component intentionally returns nothing when `other_user` is absent.

The root cause was backend serializer context.

The fixed backend response uses:

```python
ConversationSerializer(
    conversation,
    context={"request": request},
)
```

and prefetches:

```python
members__user
```

This also fixed the previously stale sender-side sidebar behavior for newly created conversations.

The important lesson is that the React state logic was not the problem.

The frontend had been receiving an incomplete serialized object.

---

# 💬 Message History

Relay loads durable message history through REST.

Conceptually:

```text
ChatPage opens
    │
    ▼
GET /conversations/<id>/messages/
    │
    ▼
Backend returns newest-first results
    │
    ▼
React stores results
    │
    ▼
MessageList renders chronologically
```

---

# 📜 Cursor Pagination

Older messages are loaded using a message ID cursor.

Example:

```text
GET /conversations/<conversation_id>/messages/?before=<message_id>
```

Conceptual backend query:

```text
message.id < cursor
ORDER BY id DESC
LIMIT N
```

The API response contains:

```text
results
next_cursor
has_more
```

---

# 🧠 Message Ordering

The backend returns historical records newest-first because that is efficient for pagination.

The UI presents them oldest-to-newest.

Conceptually:

```text
API:

105
104
103
102

UI:

102
103
104
105
```

The render transformation does not mutate the original message array.

---

# 📏 Scroll Preservation

When the user scrolls to the top and older messages are loaded, Relay preserves the visible location.

Without this logic:

```text
User reaches top
    │
    ▼
Older messages inserted
    │
    ▼
Viewport jumps
```

Relay instead records the previous scroll height.

Conceptually:

```text
oldScrollHeight = element.scrollHeight

load older messages

newScrollHeight = element.scrollHeight

scrollTop += newScrollHeight - oldScrollHeight
```

This keeps the same messages visually anchored while history is inserted above them.

---

# ⬇️ Smart Bottom Scrolling

The chat initially scrolls to the newest messages.

Afterward, the app only auto-scrolls when appropriate.

Conceptually:

```text
User near bottom
      │
      └── new message → stay at bottom

User reading old messages
      │
      └── new message → do not yank viewport downward
```

This is critical to making message history usable.

---

# 📤 Sending Messages

`MessageComposer` sends messages through the active conversation WebSocket.

Outgoing event:

```json
{
  "type": "message.send",
  "client_message_id": "generated-uuid",
  "content": "Hello"
}
```

The client-generated ID is produced with:

```typescript
crypto.randomUUID()
```

The frontend does **not** insert an optimistic fake database message.

Instead:

```text
Composer sends event
      │
      ▼
Backend validates
      │
      ▼
Backend persists message
      │
      ▼
Backend broadcasts message.new
      │
      ▼
Frontend receives canonical saved message
      │
      ▼
Render
```

This keeps the rendered message aligned with backend-generated durable state.

---

# 🆔 Client Message IDs

Each outgoing message contains:

```text
client_message_id
```

This allows the backend to enforce idempotency.

If a message send is retried with the same client UUID, the database uniqueness rule prevents a duplicate message from being created.

The frontend also performs ID-based deduplication on incoming message events.

---

# 📨 Message Receive Flow

Real-time flow:

```text
User A types message
      │
      ▼
MessageComposer
      │
      ▼
sendEvent(message.send)
      │
      ▼
Conversation WebSocket
      │
      ▼
Django Channels Consumer
      │
      ▼
MySQL persistence
      │
      ▼
Redis Channel Layer
      │
      ▼
message.new
      │
      ▼
User B WebSocket
      │
      ▼
useChatSocket
      │
      ▼
ChatPage state
      │
      ▼
MessageList
```

---

# ⌨️ Message Composer

The V1 composer supports:

```text
Enter
→ send message

Shift + Enter
→ insert newline
```

The key handler submits the existing HTML form rather than duplicating send logic.

Conceptually:

```typescript
if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
}
```

This means all sending still passes through the same `handleSubmit()` function.

---

# 📐 Auto-Expanding Textarea

The composer textarea expands as content grows.

Behavior:

```text
1 line
↓
2 lines
↓
3 lines
↓
...
maximum height
↓
internal scroll
```

The implementation measures:

```text
textarea.scrollHeight
```

and caps the result at approximately:

```text
140px
```

After a message successfully sends, the textarea height is reset.

This gives Relay the expected behavior of modern messaging applications without requiring a textarea package.

---

# ⌨️ Typing Indicators

Typing events are sent through the active conversation socket.

When input becomes non-empty:

```text
typing.start
```

is sent once.

A timeout is then restarted whenever the user continues typing.

If no further typing occurs for approximately:

```text
1500ms
```

Relay sends:

```text
typing.stop
```

If the user clears the input or sends the message, typing state is also stopped.

This avoids sending a typing event for every keystroke.

---

# 🟢 Presence

The active conversation receives:

```text
presence.update
```

events.

The frontend tracks currently online user IDs in:

```text
Set<number>
```

Conceptually:

```text
presence.update
{
    user_id: 42,
    is_online: true
}
```

updates:

```text
onlineUserIds
```

The header then checks:

```text
onlineUserIds.has(conversation.other_user.id)
```

to display:

```text
Online
```

or:

```text
Offline
```

---

# 💓 Presence Heartbeat

Presence cannot rely only on a clean WebSocket disconnect.

Browsers may:

```text
sleep
lose network
crash
switch networks
close unexpectedly
```

Relay therefore sends periodic heartbeat activity through the active socket.

The backend uses temporary Redis state with expiration behavior.

The frontend's heartbeat interval works with the backend's presence timeout so a stale connection eventually expires even if no clean disconnect event occurs.

---

# 📬 Delivery Receipts

When a recipient receives a message, Relay can acknowledge delivery.

Conceptually:

```text
message.new
     │
     ▼
recipient browser receives message
     │
     ▼
message.delivered
     │
     ▼
backend updates delivery state
     │
     ▼
sender receives delivery update
```

Relay uses cumulative delivery semantics.

If a user acknowledges delivery through message `#105`, earlier applicable messages are also considered delivered.

This avoids requiring one network acknowledgement for every historical message.

---

# 👁️ Read Receipts

Read state is also cumulative.

A conversation membership stores the latest message the user has read.

Example:

```text
last_read_message = 105
```

means:

```text
100 read
101 read
102 read
103 read
104 read
105 read
```

Relay receives live read events and updates the UI accordingly.

---

# 🔔 Unread Counts

Unread counts are returned with conversation data.

The global socket updates sidebar state when messages arrive in conversations other than the one currently selected.

Conceptually:

```text
conversation.updated
        │
        ▼
RelayLayout
        │
        ▼
find matching conversation
        │
        ▼
update:
- last_message
- unread_count
        │
        ▼
move conversation to top
```

This makes the sidebar behave like a modern chat application.

---

# 🔄 Live Conversation Reordering

When a conversation receives a new message, that conversation moves to the top of the sidebar.

Conceptually:

```typescript
return [
    updatedConversation,
    ...current.filter(
        item => item.id !== updatedConversation.id
    ),
];
```

This is driven by the global user WebSocket, not by polling.

---

# 🆕 Incoming New Conversations

An important V1 behavior is that an empty direct conversation does not immediately appear in the recipient's sidebar.

Instead:

```text
User A opens DM with User B
        │
        ▼
Conversation exists
        │
        ▼
User A sends first message
        │
        ▼
backend emits conversation.updated
        │
        ▼
User B receives full serialized conversation
        │
        ▼
sidebar inserts conversation
```

This intentionally avoids cluttering a user's sidebar with empty conversations.

---

# 🗑️ Conversation Deletion

Relay supports deleting a conversation through the REST API.

Frontend helper:

```text
DELETE /conversations/<conversation_id>/
```

After the backend deletes the conversation, it publishes:

```text
conversation.deleted
```

to the affected users' global socket groups.

The frontend then removes the conversation locally.

Conceptually:

```text
conversation.deleted
        │
        ▼
RelayLayout
        │
        ├── remove sidebar item
        │
        └── if selected:
               selectedConversation = null
```

---

# 📱 Mobile Delete Behavior

On desktop, the delete button appears on hover/focus.

On mobile, hover is not dependable.

Relay therefore makes the delete button permanently visible below the mobile breakpoint.

```css
@media (max-width: 768px) {
    .ConversationDeleteButton {
        opacity: 1;
        pointer-events: auto;
    }
}
```

This preserves the cleaner desktop UI without making deletion inaccessible on touch devices.

---

# 📱 Responsive Design

Relay uses a two-column desktop layout and a single-pane mobile layout.

Desktop:

```text
┌────────────────────┬──────────────────────────┐
│ Conversation List  │ Active Conversation      │
│                    │                          │
│                    │                          │
└────────────────────┴──────────────────────────┘
```

Mobile, no conversation selected:

```text
┌──────────────────────────────┐
│ Conversation List            │
│                              │
│                              │
└──────────────────────────────┘
```

Mobile, conversation selected:

```text
┌──────────────────────────────┐
│ ← Chat Header                │
│                              │
│ Messages                     │
│                              │
│ Composer                     │
└──────────────────────────────┘
```

---

# 🔙 Mobile Navigation

`RelayLayout` tracks whether a conversation is selected.

Example layout classes:

```text
RelayLayout--sidebar-open
RelayLayout--conversation-open
```

On mobile:

```text
Sidebar open
→ hide main chat

Conversation open
→ hide sidebar
```

The mobile ChatHeader back button clears the selected conversation:

```typescript
setSelectedConversation(null)
```

This returns the user to the conversation list.

---

# 📏 Mobile Viewport Height

Mobile uses:

```css
height: 100dvh;
```

instead of relying only on legacy `100vh`.

`dvh` better reflects changing browser chrome on modern mobile browsers.

---

# 📱 Mobile Input Sizing

The message input uses a minimum `16px` font size on mobile.

This prevents browsers such as mobile Safari from automatically zooming the page when the textarea receives focus.

---

# 🔄 Active WebSocket Lifecycle

The active conversation hook manages the socket lifecycle.

Conceptually:

```text
Conversation selected
      │
      ▼
create WebSocket
      │
      ▼
register handlers
      │
      ├── onopen
      ├── onmessage
      ├── onerror
      └── onclose
      │
      ▼
conversation changes/unmount
      │
      ▼
close old socket
```

The hook exposes:

```text
sendEvent
connectionStatus
```

to the component layer.

---

# 🔁 Reconnection

The active conversation socket includes reconnection behavior.

Connection status is exposed to the UI.

Possible states:

```text
connecting
connected
reconnecting
disconnected
```

The UI can therefore communicate connection health instead of silently failing.

A reconnect does not replace the role of REST.

Durable state can always be reloaded from the backend when necessary.

---

# 🧠 WebSocket Event Handling

A WebSocket event should never directly manipulate DOM content.

Relay uses React state.

```text
WebSocket frame
      │
      ▼
JSON.parse()
      │
      ▼
event dispatcher
      │
      ▼
setState()
      │
      ▼
React render
```

This keeps UI state predictable and consistent with React's rendering model.

---

# 🧾 TypeScript Chat Models

Core frontend types include:

```typescript
ChatUser
ConversationMember
Message
ReadReceipt
Conversation
ConversationMessageResponse
```

WebSocket event models include:

```typescript
MessageNewEvent
MessageDeliveredEvent
MessageReadEvent
TypingUpdateEvent
PresenceUpdateEvent
```

and are grouped under a shared event union.

---

# 🧑 ChatUser

Conceptually:

```typescript
type ChatUser = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
};
```

---

# 👥 ConversationMember

Conceptually:

```typescript
type ConversationMember = {
    user_id: number;
    user: ChatUser;
    joined_at: string;
    last_read_message: number | null;
    last_read_at: string | null;
};
```

---

# 💬 Message

Conceptually:

```typescript
type Message = {
    id: number;
    conversation: string;
    sender_id: number;
    client_message_id: string;
    content: string;
    created_at: string;
    edited_at: string | null;
    deleted_at: string | null;
    delivered_to?: number[];
};
```

---

# 🗨️ Conversation

Conceptually:

```typescript
type Conversation = {
    id: string;
    direct_key: string | null;
    created_at: string;
    updated_at: string;

    members: ConversationMember[];
    other_user: ChatUser | null;

    last_message: Message | null;
    unread_count: number;

    read_receipts: ReadReceipt[];
};
```

---

# ⚠️ API Shape Boundaries

REST serializers and raw WebSocket payloads do not always have to use identical field names internally.

For that reason, event parsing should be treated as a boundary.

A good architectural rule is:

```text
Backend event payload
        │
        ▼
normalize/parse
        │
        ▼
frontend application type
```

Shared application types should not be changed casually merely to match one temporary event shape.

---

# 🔎 User Search

Relay V1 supports searching users while starting a new direct message.

The search UI:

```text
accepts search input
      │
      ▼
queries backend
      │
      ▼
shows user results
      │
      ▼
select user
      │
      ▼
create/find direct conversation
```

This is user discovery for starting direct messages.

Full conversation/message search is deferred to V2.

---

# 🧪 Local Development

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Typical local frontend:

```text
http://localhost:5173
```

The Django backend is typically available at:

```text
http://127.0.0.1:8000
```

---

# 🔐 Environment Variables

Relay uses Vite environment variables.

Example development configuration:

```env
VITE_AUTH_API_URL=http://127.0.0.1:8000/resume-analyzer-app-api
VITE_RELAY_API_URL=http://127.0.0.1:8000/chat-api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_WS_BASE_URL=ws://127.0.0.1:8000
```

Production uses the deployed domain and secure WebSockets.

Conceptually:

```env
VITE_WS_BASE_URL=wss://jorgeramirez.net
```

The application intentionally keeps API path prefixes inside the corresponding base URLs.

This allows service functions to use concise relative routes.

Example:

```typescript
apiFetch("/conversations/")
```

rather than rebuilding the complete backend path in each function.

---

# ⚠️ Vite Environment Variable Rule

Only variables prefixed with:

```text
VITE_
```

are exposed to client-side Vite code.

Never place backend secrets in Vite environment files.

Anything bundled into frontend code should be assumed visible to the browser.

Good frontend values:

```text
API base URL
WebSocket base URL
Google public client ID
```

Bad frontend values:

```text
Django SECRET_KEY
database password
AWS secret key
private API secret
```

---

# 🔨 Production Build

Create the frontend production build with:

```bash
npm run build
```

Vite writes the compiled frontend to:

```text
dist/
```

The Django deployment serves Relay through the `/relay/` application route.

Production routes include:

```python
path(
    "relay/",
    TemplateView.as_view(
        template_name="chat-frontend/dist/index.html"
    ),
)

path(
    "relay/<path:path>",
    TemplateView.as_view(
        template_name="chat-frontend/dist/index.html"
    ),
)
```

The catch-all route allows client-side React routes to continue resolving through the SPA entry point.

---

# ⚠️ `dist/` Production Lesson

A production deployment previously failed because:

```text
chat-frontend/dist/
```

was not present on the server.

The frontend `.gitignore` ignored the generated build directory.

Django attempted to serve:

```text
chat-frontend/dist/index.html
```

but the file did not exist in production.

The fix was to ensure the deployment process actually produces or deploys the Vite build.

The architectural lesson:

```text
source code deployment
≠
frontend production build
```

A frontend deployment must include:

```text
npm install
npm run build
```

or otherwise provide the built `dist/` output.

---

# 🚀 Recommended Frontend Deployment Sequence

A typical frontend deployment looks like:

```text
git pull
   ↓
install/update dependencies
   ↓
build Vite frontend
   ↓
verify dist/index.html
   ↓
deploy/reload backend services as needed
```

Commands:

```bash
npm install
npm run build
```

Verify:

```bash
ls -la dist
```

or from the project root:

```bash
ls -la chat-frontend/dist
```

---

# 🧪 TypeScript / Build Verification

Before deployment:

```bash
npm run build
```

This is useful because Vite/TypeScript production builds catch issues that may not be obvious during casual browser testing.

Common examples:

```text
missing required props
incorrect union types
invalid imports
wrong file casing
unused/incorrect variables depending on config
```

---

# 🔌 WebSocket Production Path

From the frontend's perspective:

```text
React
   │
   │ wss://jorgeramirez.net/ws/chat/...
   ▼
Apache :443
   │
   ▼
WebSocket reverse proxy
   │
   ▼
Daphne :8001
   │
   ▼
Django ASGI
   │
   ▼
Channels Consumer
```

The frontend never connects directly to:

```text
127.0.0.1:8001
```

That port is internal to the production server.

---

# 🌐 Frontend + Backend Request Paths

## REST

```text
React
  │
  │ HTTPS
  ▼
Apache
  │
  ▼
Django / DRF
  │
  ▼
MySQL
```

## WebSocket

```text
React
  │
  │ WSS
  ▼
Apache
  │
  ▼
Daphne
  │
  ▼
ASGI
  │
  ▼
Channels
  │
  ▼
Redis / Consumers
```

The browser does not need to know the internal server topology.

It only needs:

```text
REST base URL
WebSocket base URL
```

---

# 🔴 How Redis Relates to the Frontend

The React application never talks directly to Redis.

This is important.

Incorrect mental model:

```text
React → Redis
```

Actual architecture:

```text
React
  │
  ▼
WebSocket
  │
  ▼
Django Channels Consumer
  │
  ▼
Channel Layer
  │
  ▼
Redis
```

Redis is backend infrastructure.

The frontend only sends and receives WebSocket frames.

---

# 🗄️ How MySQL Relates to the Frontend

The browser also never directly connects to MySQL.

Instead:

```text
React
  │
  ├── REST
  │     ↓
  │   Django ORM
  │     ↓
  │   MySQL
  │
  └── WebSocket
        ↓
      Consumer
        ↓
      Django ORM
        ↓
      MySQL
```

This preserves backend authorization and business logic.

---

# 🧠 State Ownership

A useful Relay frontend mental model:

```text
AuthContext
= authentication / current user

RelayLayout
= conversations / selected conversation

ChatPage
= active conversation state

MessageList
= message presentation / scroll behavior

MessageComposer
= draft input / typing / send

WebSocket hooks
= connection lifecycle / event transport

API services
= REST transport
```

Keeping these boundaries clear reduces accidental duplicated state.

---

# 🔁 Data Flow Example — New Message

```text
MessageComposer
      │
      ▼
sendEvent()
      │
      ▼
useChatSocket
      │
      ▼
WebSocket
      │
      ▼
Backend
      │
      ▼
message.new
      │
      ▼
useChatSocket onMessage
      │
      ▼
ChatPage setMessages()
      │
      ▼
MessageList
```

At the same time:

```text
Backend
   │
   ▼
conversation.updated
   │
   ▼
global user socket
   │
   ▼
RelayLayout
   │
   ▼
sidebar preview/unread/order
```

This demonstrates why the two-socket architecture is useful.

---

# 🔁 Data Flow Example — Conversation Deletion

```text
ConversationCard
      │
      ▼
deleteConversation()
      │
      ▼
REST DELETE
      │
      ▼
Django deletes conversation
      │
      ▼
backend emits conversation.deleted
      │
      ▼
global user sockets
      │
      ▼
RelayLayout
      │
      ▼
remove conversation
```

Both participants can therefore have the deleted conversation disappear live.

---

# 🐞 React StrictMode Note

During development, React StrictMode may make lifecycle behavior appear duplicated.

This can cause temporary logs such as:

```text
WebSocket opened
WebSocket closed
WebSocket opened
```

during development.

This does not necessarily mean the production app creates unintended duplicate connections.

Always distinguish:

```text
StrictMode development lifecycle
```

from:

```text
actual socket leak
```

before redesigning connection logic.

---

# 🧰 Useful Frontend Commands

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Check installed packages:

```bash
npm list
```

Check a specific package:

```bash
npm list react
npm list vite
```

Update dependency metadata:

```bash
npm outdated
```

---

# 🧰 Useful Backend Commands During Frontend Development

Relay frontend work often requires the backend and Redis to be running.

Django:

```bash
python manage.py runserver
```

Redis:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

On Linux/production:

```bash
sudo systemctl status redis-server
```

Daphne production status:

```bash
sudo systemctl status daphne-websitethree
```

Daphne logs:

```bash
sudo journalctl -u daphne-websitethree -f
```

Apache status:

```bash
sudo systemctl status apache2
```

These are backend operations, but they are useful when diagnosing what appears to be a frontend WebSocket problem.

---

# 🐛 Frontend Troubleshooting

## Messages load but live updates do not work

Check:

```text
REST works?
WebSocket connected?
Correct VITE_WS_BASE_URL?
Access token exists?
Daphne running?
Apache /ws/ proxy working?
Redis running?
```

Browser DevTools → Network → WS should show a WebSocket connection.

---

## WebSocket immediately closes

Possible causes:

```text
missing/expired JWT
invalid conversation ID
user is not a member
Daphne not running
Apache proxy issue
backend Consumer exception
```

Check production logs:

```bash
sudo journalctl -u daphne-websitethree -f
```

---

## REST works but WebSocket gets 503

Likely server path:

```text
Apache
   │
   ▼
Daphne unavailable
```

Check:

```bash
sudo systemctl status daphne-websitethree
```

and:

```bash
sudo journalctl -u daphne-websitethree -n 100
```

---

## Frontend loads blank / Django returns template error

Verify the Vite build exists:

```bash
ls -la chat-frontend/dist
```

You should see:

```text
index.html
assets/
```

If missing:

```bash
cd chat-frontend
npm install
npm run build
```

---

## Newly created conversation has no header

Inspect the direct-conversation response.

It must include:

```text
other_user
```

If `other_user` is null unexpectedly, verify the backend serializer receives:

```python
context={"request": request}
```

---

## Sidebar does not update for incoming message

Check whether the global socket receives:

```text
conversation.updated
```

Then confirm `RelayLayout` updates the matching conversation and moves it to the top.

---

## Message appears twice

Check:

```text
client_message_id
frontend ID deduplication
StrictMode logs vs actual rendered duplicates
```

Do not automatically assume two socket connections are incorrect.

---

## Typing indicator never stops

Check the composer timeout and confirm:

```text
typing.stop
```

is sent:

```text
after inactivity
when input is cleared
when message is successfully sent
```

---

## Presence remains online too long

Remember that presence is intentionally TTL/heartbeat based.

A sudden browser/network failure may not create an immediate clean disconnect.

The backend expires stale presence after the configured timeout.

---

# 🧪 Recommended V1 Test Checklist

## Authentication

```text
[ ] Login works
[ ] Registration works
[ ] Google OAuth works
[ ] Protected route rejects logged-out user
[ ] Refresh keeps authenticated session when valid
[ ] Logout clears session
```

## Conversations

```text
[ ] Conversation list loads
[ ] Direct user search works
[ ] New DM opens
[ ] Existing DM reopens instead of duplicating
[ ] other_user is present immediately
[ ] Conversation deletes
[ ] Other participant receives live delete event
```

## Messaging

```text
[ ] Message sends
[ ] Recipient receives live message
[ ] Sender receives canonical persisted message
[ ] Refresh preserves messages
[ ] Enter sends
[ ] Shift+Enter creates newline
[ ] Empty message cannot send
[ ] Composer resets after send
[ ] Composer expands with multiline input
```

## History

```text
[ ] Latest messages load
[ ] Initial view scrolls to bottom
[ ] Scrolling to top loads older messages
[ ] Scroll position is preserved
[ ] New message does not yank user from old history
```

## Real-Time State

```text
[ ] Typing starts
[ ] Typing stops
[ ] Presence updates
[ ] Delivery receipt updates
[ ] Read receipt updates
[ ] Unread count updates
[ ] Conversation moves to top
[ ] Last-message preview updates
```

## Responsive

```text
[ ] Desktop sidebar + chat layout
[ ] Mobile sidebar-only state
[ ] Mobile chat-only state
[ ] Mobile back button
[ ] Composer usable with mobile keyboard
[ ] Delete control accessible without hover
```

## Production

```text
[ ] HTTPS REST works
[ ] WSS connection works
[ ] Page refresh on /relay/ works
[ ] dist build exists
[ ] Daphne survives SSH logout
[ ] Redis survives reboot
[ ] Apache proxy routes /ws/
```

---

# 🧠 Frontend Architecture Rules to Remember

### 1. REST is the durable-state path.

```text
React → REST → Django → MySQL
```

---

### 2. WebSockets are the live-event path.

```text
React ⇄ Consumer
```

---

### 3. React does not communicate directly with Redis.

```text
React → WebSocket → Channels → Redis
```

---

### 4. React does not communicate directly with MySQL.

```text
React → Django → ORM → MySQL
```

---

### 5. The global user socket owns Relay-wide live conversation updates.

```text
/ws/chat/
```

---

### 6. The active conversation socket owns live chat events.

```text
/ws/chat/<conversation_id>/
```

---

### 7. Conversation state belongs high enough to update both sidebar and chat.

```text
RelayLayout
```

---

### 8. Message history remains recoverable through REST.

A WebSocket disconnect should not destroy durable state.

---

### 9. WebSocket events should update React state, not manually edit the DOM.

```text
event → setState → render
```

---

### 10. Production WebSockets use WSS through Apache.

```text
React
  ↓
Apache
  ↓
Daphne
  ↓
ASGI
```

---

# 🧠 Relay Frontend in One Diagram

```text
┌──────────────────────────────────────────────────────────────┐
│                     React + TypeScript                       │
│                                                              │
│  AuthContext                                                 │
│      │                                                       │
│      ▼                                                       │
│  RelayLayout                                                 │
│      │                                                       │
│      ├─────────────── RelaySidebar                           │
│      │                     │                                 │
│      │                     ├── ConversationList              │
│      │                     └── ConversationCard              │
│      │                                                       │
│      └─────────────── ChatPage                               │
│                            │                                 │
│                            ├── ChatHeader                    │
│                            ├── MessageList                   │
│                            ├── Message                       │
│                            ├── TypingIndicator               │
│                            └── MessageComposer               │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│ REST                         │ WebSocket                     │
│                              │                               │
│ apiClient                    │ useUserChatSocket             │
│ chat_service                 │ useChatSocket                 │
│ auth_service                 │ chat_socket                   │
│ user_service                 │                               │
└──────────────┬───────────────┴───────────────┬───────────────┘
               │                               │
               ▼                               ▼
       Django REST Framework             Django Channels
               │                               │
               ▼                               ▼
             MySQL                           Redis
```

---

# 🚀 Current Production Architecture

```text
Browser
│
├── HTTPS REST
│     │
│     ▼
│   Apache
│     │
│     ▼
│   mod_wsgi
│     │
│     ▼
│   Django REST Framework
│     │
│     ▼
│   MySQL
│
└── WSS
      │
      ▼
    Apache
      │
      ▼
    /ws/ reverse proxy
      │
      ▼
    Daphne :8001
      │
      ▼
    websitethree.asgi
      │
      ▼
    Django Channels
      │
      ▼
    Redis Channel Layer
```

---

# 🔮 Possible Relay V2 Frontend Features

The V1 architecture intentionally leaves room for future features.

Potential V2 work includes:

- Full conversation search
- Message search
- Group conversations
- Group conversation UI
- Conversation names
- Group member management
- Attachments
- Image messages
- Reactions
- Reply-to-message
- Message editing
- Message deletion
- Push notifications
- Better cross-tab read synchronization
- More advanced global-socket reconnection
- Offline queue behavior
- Richer message status UI
- Accessibility audit
- Responsive edge-case QA
- Virtualized very-large message lists

---

# 📌 Project Summary

Relay's frontend is more than a chat UI.

It is a browser client for a distributed real-time system.

The application combines:

```text
React
+
TypeScript
+
REST
+
WebSockets
+
JWT
+
Responsive UI
```

with a backend architecture built from:

```text
Django REST Framework
+
Django Channels
+
ASGI / Daphne
+
Redis
+
MySQL
```

The key frontend architectural idea is simple:

```text
REST
= load and recover durable state

WebSockets
= receive and send live state changes
```

Relay then separates its WebSocket responsibilities further:

```text
Global user socket
= sidebar/application updates

Active conversation socket
= live conversation interaction
```

That separation keeps the frontend understandable while still supporting real-time messages, unread counts, presence, typing indicators, delivery receipts, read receipts, conversation updates, deletion events, responsive navigation, and recoverable persistent history.

Relay V1 demonstrates a complete end-to-end real-time chat frontend integrated with a production Django + Channels backend.





<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories. -->
