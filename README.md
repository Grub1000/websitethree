<div align="center">

# 🚀 Jorge Ramirez — Portfolio & Application Platform

### Full-Stack Development • AI/ML • RAG • Cloud Infrastructure

A production full-stack ecosystem powering my personal portfolio and independently developed web applications.

**🌐 [jorgeramirez.net](https://jorgeramirez.net)**

<br>

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-REST_Framework-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-Cloud-232F3E?style=for-the-badge\&logo=amazonwebservices\&logoColor=white)

![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-DC244C?style=for-the-badge)
![Apache](https://img.shields.io/badge/Apache2-Web_Server-D22128?style=for-the-badge\&logo=apache\&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge\&logo=githubactions\&logoColor=white)

</div>

---

## 📖 About This Repository

This repository contains the backend and infrastructure behind **jorgeramirez.net**, my personal software engineering portfolio and production platform for hosting several full-stack applications.

What began as a traditional portfolio has evolved into a **multi-application environment** combining React frontends, Django REST APIs, relational and vector databases, cloud storage, AI services, authentication systems, and automated AWS deployments.

The platform gives me a production environment for building and deploying projects involving:

`Full-Stack Development` • `Artificial Intelligence` • `Machine Learning` • `RAG` • `Cloud Computing` • `DevOps` • `Distributed Systems`

---

# ✨ Featured Applications

## 🧠 RAGspace

> **A full-stack Retrieval-Augmented Generation platform for chatting with private document collections.**

RAGspace allows users to upload documents into private knowledge bases called **Spaces** and interact with those documents through AI-powered conversations.

Documents are processed, chunked, embedded, indexed in a vector database, and retrieved as context when users ask questions.

### ⭐ Key Features

* 📁 Private document uploads
* 🗂️ User-created knowledge bases called **Spaces**
* ☁️ Amazon S3 document storage
* ✂️ Document parsing and intelligent chunking
* 🧠 Vector embedding generation
* 🔎 Qdrant semantic vector search
* 🎯 Retrieval reranking
* 💬 AI-powered document conversations
* 🕘 Persistent conversations and chat history
* 📑 Page-level source citations
* 🔐 User-scoped document access
* 🗑️ Document, metadata, S3, and vector deletion workflows

### 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │  React + TypeScript │
                    │       Frontend      │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Django REST API   │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        ┌─────────┐       ┌─────────┐      ┌───────────┐
        │  MySQL  │       │ AWS S3  │      │ Embedding │
        │Metadata │       │   PDFs  │      │    API    │
        └─────────┘       └─────────┘      └─────┬─────┘
                                                 │
                                                 ▼
                                          ┌───────────┐
                                          │  Qdrant   │
                                          │  Vectors  │
                                          └───────────┘
```

### 🔄 RAG Pipeline

```text
PDF Upload
    │
    ▼
Amazon S3
    │
    ▼
Document Extraction
    │
    ▼
Text Chunking
    │
    ▼
Embedding Generation
    │
    ▼
Qdrant Vector Storage
    │
    ▼
Semantic Retrieval
    │
    ▼
Reranking
    │
    ▼
LLM Context
    │
    ▼
Generated Answer + Page Citations
```

RAGspace uses **presigned S3 URLs**, allowing the frontend to upload documents directly to Amazon S3 without routing the file itself through the Django application server.

---

## 📄 ResuScan

> **A full-stack resume analysis and job-tracking platform built with React, TypeScript, Django, MySQL, and AWS.**

ResuScan combines resume management and analysis with an integrated job application tracking system.

### ⭐ Key Features

* 📄 Resume uploads and management
* 🧠 Resume analysis workflows
* 🕘 Previous analysis history
* 🖼️ Resume document thumbnails
* ☁️ Amazon S3 file storage
* 🔐 User-specific document access
* 💼 Job application tracking
* 📊 Interactive Kanban board
* ✏️ Full CRUD support for job applications
* 🔑 JWT authentication
* 🛡️ Protected frontend routes
* 🔄 Automatic access-token refresh
* 🧭 React Router navigation
* 🌐 REST API communication

### 🏗️ Architecture

```text
              ┌─────────────────────┐
              │  React + TypeScript │
              │         SPA         │
              └──────────┬──────────┘
                         │
                         │ REST API
                         ▼
              ┌─────────────────────┐
              │ Django REST Framework│
              └──────────┬──────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
          ┌───────┐  ┌───────┐  ┌────────┐
          │ MySQL │  │AWS S3 │  │  JWT   │
          │ Data  │  │ Files │  │  Auth  │
          └───────┘  └───────┘  └────────┘
```

ResuScan follows a decoupled SPA architecture where React manages the interactive user experience while Django REST Framework provides authentication, persistence, document management, and application APIs.

---

# 🛠️ Technology Stack

## 🎨 Frontend

| Technology          | Usage                           |
| ------------------- | ------------------------------- |
| ⚛️ **React**        | Component-based user interfaces |
| 🔷 **TypeScript**   | Type-safe frontend development  |
| 🟨 **JavaScript**   | Client-side application logic   |
| ⚡ **Vite**          | Frontend build tooling          |
| 🧭 **React Router** | SPA routing                     |
| 🎨 **HTML5 / CSS3** | Structure and styling           |
| 🌐 **Fetch API**    | REST API communication          |

---

## ⚙️ Backend

| Technology                   | Usage                         |
| ---------------------------- | ----------------------------- |
| 🐍 **Python**                | Primary backend language      |
| 🎸 **Django**                | Backend application framework |
| 🔌 **Django REST Framework** | REST API development          |
| 🗃️ **Django ORM**           | Relational data access        |
| 🔑 **SimpleJWT**             | JWT authentication            |

---

## 🧠 AI, RAG & Search

| Technology               | Usage                                |
| ------------------------ | ------------------------------------ |
| 🤖 **LLM APIs**          | AI-generated responses               |
| 🧠 **Embeddings**        | Semantic text representations        |
| 🔎 **Qdrant**            | Vector database                      |
| 🎯 **Reranking**         | Improving retrieval relevance        |
| 📚 **RAG**               | Grounding LLM responses in documents |
| ✂️ **Document Chunking** | Preparing documents for retrieval    |

---

## ☁️ Cloud & Infrastructure

| Technology           | Usage                      |
| -------------------- | -------------------------- |
| ☁️ **AWS EC2**       | Production compute         |
| 🪣 **Amazon S3**     | Cloud document storage     |
| ✉️ **Amazon SES**    | Transactional email        |
| 🌐 **AWS Route 53**  | DNS management             |
| 🔐 **AWS IAM**       | Cloud access control       |
| 🪶 **Apache2**       | Production web server      |
| 🐍 **mod_wsgi**      | Django application serving |
| 🔒 **Let's Encrypt** | HTTPS certificates         |

---

## 🔧 DevOps & Development

| Technology            | Usage                       |
| --------------------- | --------------------------- |
| 🐙 **GitHub**         | Source control              |
| ⚙️ **GitHub Actions** | CI/CD                       |
| 🐧 **Ubuntu / Linux** | Production operating system |
| 📮 **Postman**        | API development and testing |
| 📜 **Bash**           | Deployment automation       |
| 🔀 **Git**            | Version control             |

---

# 🏗️ Platform Architecture

The platform supports multiple independently developed React applications backed by a shared Django production environment.

```text
                              Internet
                                 │
                                 ▼
                         ┌───────────────┐
                         │ AWS Route 53  │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │ jorgeramirez.net │
                       │ HTTPS / TLS      │
                       └─────────┬─────────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │   Apache2   │
                          │   AWS EC2   │
                          └──────┬──────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
             React Applications          mod_wsgi
                                              │
                                              ▼
                                           Django
                                              │
                       ┌──────────────────────┼──────────────────┐
                       │                      │                  │
                       ▼                      ▼                  ▼
                    MySQL                 Amazon S3           Qdrant
                       │                      │                  │
                       │                      │                  │
                       └──────────────────────┼──────────────────┘
                                              │
                                              ▼
                                       External AI APIs
```

This architecture allows each application to maintain its own frontend and API functionality while sharing production infrastructure where appropriate.

---

# 🔐 Authentication

Applications requiring user accounts use **Django REST Framework + SimpleJWT**.

### Authentication Flow

```text
Login
  │
  ▼
Django Authentication
  │
  ▼
┌───────────────────────┐
│ Access + Refresh JWTs │
└───────────┬───────────┘
            │
            ▼
      React Frontend
            │
            ▼
 Authorization: Bearer <access_token>
            │
            ▼
     Protected DRF API
```

### 🔄 Token Refresh

When an access token expires:

1. The protected request returns an authentication failure.
2. The frontend sends the refresh token to the refresh endpoint.
3. Django validates the refresh token.
4. A new access token is returned.
5. The frontend stores the replacement token.
6. The original API request is retried.

A current-user endpoint also allows applications to validate an existing authenticated session and retrieve the authenticated user's profile.

---

# 🔑 Password Recovery

The platform includes a custom UUID-based password recovery workflow.

```text
Forgot Password
      │
      ▼
  Email Address
      │
      ▼
Django Backend
      │
      ▼
Generate Secure UUID
      │
      ▼
Amazon SES
      │
      ▼
Password Reset Email
      │
      ▼
Reset Page
      │
      ▼
Validate Token
      │
      ▼
Update Password
      │
      ▼
Invalidate Token
```

### 🛡️ Security Features

* Time-limited reset tokens
* Single-use UUID tokens
* Secure password updates
* Environment-managed email credentials
* Server-side token validation

---

# 📧 Transactional Email

Transactional email is provided through **Amazon Simple Email Service (SES)**.

Current infrastructure includes:

* ✅ Verified `jorgeramirez.net` sending domain
* ✅ SES SMTP authentication
* ✅ Domain identity verification
* ✅ DKIM authentication
* ✅ Password recovery emails
* ✅ Environment-based SMTP credentials

The infrastructure can also support future application notifications and transactional messaging.

---

# ☁️ Amazon S3 Storage

Applications requiring persistent document storage use **Amazon S3** instead of relying on the EC2 filesystem.

RAGspace, for example, uses structured object keys:

```text
ragspace/
└── users/
    └── {user_id}/
        └── spaces/
            └── {space_id}/
                └── documents/
                    └── {document_uuid}.pdf
```

### 📤 Presigned Upload Flow

```text
React
  │
  │ Request Upload
  ▼
Django
  │
  │ Generate Presigned URL
  ▼
React
  │
  │ Direct PUT
  ▼
Amazon S3
  │
  │ Upload Complete
  ▼
Django Verification
```

This design:

* ☁️ Separates application compute from file storage
* 🚀 Avoids proxying large uploads through Django
* 📈 Supports scalable document storage
* 🔐 Prevents permanent AWS credentials from reaching the browser
* 👤 Provides structured user-specific object organization

Production access uses **EC2 IAM roles**, while local development can use separately scoped IAM credentials.

---

# 🔄 CI/CD & Automated Deployment

Production deployment is automated through **GitHub Actions**.

```text
git push
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ▼
SSH Authentication
    │
    ▼
AWS EC2
    │
    ▼
deploy.sh
    │
    ├── git pull
    ├── update dependencies
    ├── Django migrations
    ├── update application
    └── restart Apache
```

### 🚀 Deployment Process

1. Code is pushed to the `main` branch.
2. GitHub Actions starts the deployment workflow.
3. The runner authenticates with the production EC2 server using encrypted secrets.
4. An SSH connection is established.
5. `deploy.sh` retrieves the latest source code.
6. Dependencies are updated when necessary.
7. Django database migrations are executed.
8. Production application files are updated.
9. Apache is restarted.
10. The updated application becomes available in production.

---

# ⚙️ Environment Configuration

Sensitive credentials and environment-specific values are kept outside the source code.

Example:

```env
DJANGO_SECRET_KEY=

DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=

EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=

OPENAI_API_KEY=

QDRANT_URL=
QDRANT_API_KEY=
```

> [!CAUTION]
> Never commit production `.env` files, API keys, passwords, private keys, or cloud credentials to version control.

---

# 💻 Local Development

## Prerequisites

Make sure the following are installed:

* Python 3.12+
* Node.js 18+
* MySQL
* Git

Some applications additionally require access to:

* Amazon S3
* Qdrant
* AI/embedding APIs

---

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <repository>
```

---

## 2️⃣ Create a Python Environment

```bash
python -m venv venv
```

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 3️⃣ Configure Environment Variables

Create the required local `.env` configuration.

```env
DJANGO_SECRET_KEY=your-development-key
DATABASE_NAME=your-database
DATABASE_USER=your-user
DATABASE_PASSWORD=your-password
```

Add any additional AWS, Qdrant, or AI credentials required by the application you're developing.

---

## 4️⃣ Start Django

```bash
python manage.py migrate
python manage.py runserver
```

Django will normally be available at:

```text
http://127.0.0.1:8000
```

---

## 5️⃣ Start the React Application

Navigate to the appropriate frontend:

```bash
cd <frontend-directory>

npm install
npm run dev
```

Vite will start the frontend development server.

---

# 🧪 Development & API Testing

Backend endpoints are developed and tested independently using **Postman** before being integrated with their corresponding React interfaces.

Typical testing includes:

* Authentication requests
* JWT-protected endpoints
* CRUD operations
* File upload workflows
* S3 presigned URLs
* Current-user endpoints
* Document processing
* RAG retrieval
* Error handling

---

# 🔒 Security

Security is handled across the application, infrastructure, and deployment layers.

### Application

* 🔑 JWT authentication
* 🛡️ Protected REST endpoints
* 👤 User-scoped resources
* 🔄 Token expiration and refresh
* 🔐 Django password hashing
* ⏳ Expiring password-reset tokens

### Infrastructure

* 🔒 HTTPS encryption
* 🪪 IAM-based AWS permissions
* 🔑 EC2 IAM roles
* 🌐 Environment-managed credentials
* 🗄️ Private cloud storage
* 📧 Authenticated transactional email

### Deployment

* 🔐 GitHub Actions Secrets
* 🗝️ SSH authentication
* 🚫 `.env` exclusion through `.gitignore`
* 🔄 Automated production deployment

---

## ⚠️ Git History Notice

> [!IMPORTANT]
>
> ### Django Secret Key Revocation
>
> During the initial development phase, while this repository was private, an older Django `SECRET_KEY` was accidentally committed to Git history.
>
> Before the repository became public, the compromised key was **revoked and replaced**.
>
> The production application now obtains its active Django secret through environment-based configuration. Production `.env` files and credentials remain excluded from version control.
>
> Database passwords, AWS credentials, API keys, email credentials, and other production secrets are also maintained outside the repository.

---

# 🧭 Continued Development

This platform also serves as a production environment for experimenting with new software engineering concepts.

### 🔨 Currently Exploring

* 💬 Real-time applications
* 🔌 WebSockets
* 📡 Django Channels
* 🟢 Presence systems
* ⌨️ Typing indicators
* ✓✓ Read receipts
* 🌐 Distributed systems
* 🧠 Advanced RAG architectures
* 🤖 AI-powered applications
* ☁️ Scalable AWS infrastructure
* 🏗️ Full-stack system architecture

---

# 🎯 Project Philosophy

This repository is designed to demonstrate more than frontend interfaces.

Each project gives me an opportunity to work across the complete software lifecycle:

```text
            IDEA
              │
              ▼
           DESIGN
              │
              ▼
        DEVELOPMENT
              │
      ┌───────┴───────┐
      ▼               ▼
   FRONTEND         BACKEND
      │               │
      └───────┬───────┘
              ▼
           DATABASE
              │
              ▼
       CLOUD SERVICES
              │
              ▼
           TESTING
              │
              ▼
            CI/CD
              │
              ▼
         PRODUCTION
```

The goal is to demonstrate the engineering behind complete applications — including **frontend development, APIs, databases, authentication, AI integration, cloud infrastructure, security, testing, deployment, and production operations**.

---

# 📄 License

This project is licensed under the [MIT License](LICENSE).

You may study, modify, and adapt the code in accordance with the terms of the license.

---

<div align="center">

## 👨‍💻 Jorge Ramirez

**Full-Stack Software Developer & AWS Certified Machine Learning Engineer**

Building full-stack applications at the intersection of
**software engineering, artificial intelligence, and cloud computing.**

### 🌐 [jorgeramirez.net](https://jorgeramirez.net)

<br>

**React • TypeScript • Python • Django • AWS • MySQL • AI/ML • RAG**

</div>
