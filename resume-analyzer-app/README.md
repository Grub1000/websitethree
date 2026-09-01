<div align="center">

# 🧠 RAGspace

### Your knowledge. One intelligent space.

**A full-stack conversational Retrieval-Augmented Generation platform for transforming private document collections into intelligent, searchable knowledge spaces.**

<br />

![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react\&logoColor=white)
![Django](https://img.shields.io/badge/Django-REST_Framework-092E20?logo=django\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql\&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-EC2_%7C_S3-FF9900?logo=amazonwebservices\&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-Embeddings_%7C_GPT-412991?logo=openai\&logoColor=white)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-DC244C)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions\&logoColor=white)

<br />

**React • TypeScript • Django • DRF • MySQL • AWS • OpenAI • Qdrant • Voyage AI**

</div>

---

# 📖 Table of Contents

* [Overview](#-overview)
* [Core Features](#-core-features)
* [Technology Stack](#-technology-stack)
* [High-Level Architecture](#️-high-level-architecture)
* [Project Structure](#-project-structure)
* [Production URL Structure](#-production-url-structure)
* [Authentication](#-authentication)
* [Knowledge Spaces](#-knowledge-spaces)
* [Database Architecture](#️-database-architecture)
* [AWS S3 Document Storage](#️-aws-s3-document-storage)
* [Qdrant Vector Database](#-qdrant-vector-database)
* [Embeddings](#-embeddings)
* [Document Ingestion Pipeline](#-document-ingestion-pipeline)
* [Upload Restrictions](#-upload-restrictions)
* [Chunking Strategy](#️-chunking-strategy)
* [Retrieval Pipeline](#-retrieval-pipeline)
* [Conversational RAG](#-conversational-rag)
* [Conversation Memory](#-conversation-memory)
* [Similarity Search](#-similarity-search)
* [Relevance Threshold](#-relevance-threshold)
* [Reranking](#-reranking)
* [Generation](#-generation)
* [Source Attribution](#-source-attribution)
* [Document Deletion](#️-document-deletion)
* [RAG Service Architecture](#️-rag-service-architecture)
* [Configuration](#️-configuration)
* [Environment Variables](#-environment-variables)
* [Google OAuth](#-google-oauth)
* [AWS EC2 Architecture](#️-aws-ec2-architecture)
* [Apache & SPA Serving](#-apache--spa-serving)
* [Git & GitHub](#-git--github)
* [CI/CD](#-cicd)
* [Key API Workflows](#-key-api-workflows)
* [V1 Scope](#-v1-scope)
* [V2 Boundary](#-v2-boundary)
* [Future Scaling](#-future-scaling)
* [Design Philosophy](#-design-philosophy)
* [Development Status](#-development-status)

---

# ✨ Overview

**RAGspace** is a full-stack conversational Retrieval-Augmented Generation application that allows authenticated users to create isolated knowledge spaces, upload private documents, and have AI-powered conversations grounded directly in those documents.

Instead of relying primarily on an LLM's pretrained knowledge, RAGspace performs semantic retrieval against a user's uploaded information before generating an answer.

Relevant passages are retrieved from a vector database and supplied to the language model as contextual evidence.

```text
User Question
      ↓
Semantic Retrieval
      ↓
Relevant Document Chunks
      ↓
Large Language Model
      ↓
Grounded Answer + Sources
```

This architecture makes responses:

* More relevant to user-provided information
* More traceable
* Less dependent on unsupported model knowledge
* More efficient than sending entire documents to an LLM
* Scalable across multiple documents and knowledge collections

RAGspace is designed both as a practical AI application and as a demonstration of **production-oriented full-stack, cloud, retrieval, machine learning, and software architecture.**

---

# 🚀 Core Features

### 👤 Authentication

* [x] Standard user authentication
* [x] JWT access and refresh tokens
* [x] Google OAuth
* [x] Protected frontend routes
* [x] Protected Django REST endpoints
* [x] Per-user data isolation

### 📚 Knowledge Spaces

* [x] Create Spaces
* [x] Rename Spaces
* [x] Delete Spaces
* [x] Open individual Spaces
* [x] Associate documents with Spaces
* [x] Associate conversations with Spaces

### 📄 Document Management

* [x] Upload PDF documents
* [x] Validate file type and size
* [x] Store originals in AWS S3
* [x] Extract document text
* [x] Track processing status
* [x] Delete documents
* [x] Remove associated S3 objects
* [x] Remove associated vectors

### 🧠 RAG Pipeline

* [x] Token-aware document chunking
* [x] Chunk overlap
* [x] Batched embedding generation
* [x] Qdrant vector storage
* [x] Semantic similarity search
* [x] Metadata-filtered retrieval
* [x] Configurable relevance threshold
* [x] Optional second-stage reranking

### 💬 Conversational AI

* [x] Persistent conversations
* [x] Persistent messages
* [x] Recent conversation memory
* [x] Follow-up question contextualization
* [x] GPT-generated grounded answers
* [x] Source attribution
* [x] Page references
* [x] Insufficient-context detection

### 🖥️ Frontend Experience

* [x] Responsive dark SaaS interface
* [x] Desktop and mobile navigation
* [x] Space dashboard with CRUD workflows
* [x] Document upload and processing feedback
* [x] Conversation list and deletion
* [x] Persisted chat history
* [x] Enter-to-send and Shift+Enter multiline input
* [x] Auto-growing chat composer
* [x] Animated generation state
* [x] Page-level source cards
* [x] Clickable citations opening private PDFs through presigned S3 URLs

### ☁️ Infrastructure

* [x] Existing AWS EC2 production server
* [x] Apache2 web server
* [x] Existing MySQL infrastructure
* [x] GitHub Actions deployment pipeline
* [x] Existing Django project
* [x] React + TypeScript Vite project created
* [x] AWS S3 RAGspace integration
* [x] Qdrant Cloud integration
* [x] OpenAI integration
* [x] Voyage AI reranking integration

---

# 🛠 Technology Stack

## Frontend

| Technology            | Purpose                                    |
| --------------------- | ------------------------------------------ |
| **React**             | Component-based frontend UI                |
| **TypeScript**        | Static typing                              |
| **Vite**              | Frontend development and production builds |
| **React Compiler**    | React optimization                         |
| **React Router**      | Client-side SPA routing                    |
| **Fetch / REST APIs** | Django API communication                   |

The frontend exists as an independent Vite application inside the larger Django project.

```text
ragspace-frontend/
```

Production builds are served through the existing Django and Apache infrastructure.

---

## Backend

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| **Python**                | Primary backend language          |
| **Django**                | Web framework                     |
| **Django REST Framework** | REST API                          |
| **Simple JWT**            | Access and refresh authentication |
| **Google OAuth**          | Social authentication             |
| **MySQL**                 | Relational application data       |
| **AWS S3**                | Original PDF storage              |
| **Qdrant Cloud**          | Vector database                   |
| **OpenAI API**            | Embeddings and generation         |
| **Voyage AI**             | Optional reranking                |

The dedicated Django application is:

```text
ragspace_api
```

RAGspace shares the same parent Django project and infrastructure as other applications hosted on the server while maintaining its own:

* Models
* API routes
* Business logic
* RAG services
* Document pipeline
* Vector retrieval logic

---

# 🏗️ High-Level Architecture

```text
                              ┌───────────────────────────┐
                              │        RAGspace           │
                              │     React + TypeScript    │
                              └─────────────┬─────────────┘
                                            │
                                            │ HTTPS / REST
                                            ▼
                              ┌───────────────────────────┐
                              │      Django REST API      │
                              │       ragspace_api        │
                              └─────────────┬─────────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
          ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
          │      MySQL      │     │     AWS S3      │     │  Qdrant Cloud  │
          │                 │     │                 │     │                 │
          │ Users           │     │ Original PDFs   │     │ Embeddings      │
          │ Spaces          │     │                 │     │ Chunk Text      │
          │ Documents       │     │                 │     │ Metadata        │
          │ Conversations   │     │                 │     │ Vector Search   │
          │ Messages        │     │                 │     │                 │
          └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                                  │
                                                ┌─────────────────┼───────────────┐
                                                │                                 │
                                                ▼                                 ▼
                                      ┌──────────────────┐              ┌──────────────────┐
                                      │ OpenAI Embedding │              │    Voyage AI     │
                                      │      API         │              │     Reranker     │
                                      └──────────────────┘              └──────────────────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │   GPT-5 mini     │
                                      │ Answer Generation│
                                      └──────────────────┘
```

RAGspace intentionally separates:

> **Application Data → File Storage → Vector Storage → AI Inference**

Each technology has one primary responsibility rather than forcing a single service to solve every problem.

---

# 📁 Project Structure

RAGspace lives inside the existing Django project rather than requiring an entirely separate deployment.

```text
websitethree/
│
├── manage.py
│
├── websitethree/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── resume_analyzer_app_api/
│
├── ragspace_api/
│   │
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   │
│   └── services/
│       ├── document_service.py
│       ├── text_extraction.py
│       ├── chunking.py
│       ├── embeddings.py
│       ├── vector_store.py
│       ├── contextualizer.py
│       ├── retrieval.py
│       ├── reranker.py
│       └── generator.py
│
└── ragspace-frontend/
    │
    ├── public/
    ├── src/
    ├── package.json
    ├── vite.config.ts
    └── dist/
```

### Architectural Goal

Django views should remain relatively thin.

Instead of placing RAG processing directly inside `views.py`, specialized service modules will own individual responsibilities.

This makes the RAG system:

* Easier to understand
* Easier to test
* Easier to replace
* Easier to scale
* Less tightly coupled to Django request handling

---

# 🌐 Production URL Structure

RAGspace uses path-based routing on the existing production domain.

### React SPA

```text
/ragspace/
```

### Django REST API

```text
/ragspace-api/
```

Conceptually:

```text
jorgeramirez.net
│
├── /resuscan/
│
├── /ragspace/
│
└── /ragspace-api/
```

This allows multiple full-stack applications to share:

* One AWS EC2 instance
* One Apache web server
* One SSL configuration
* One Django project
* Shared authentication infrastructure
* One deployment pipeline

without requiring a separate server or subdomain for every application.

---

# 🔐 Authentication

RAGspace uses the authentication infrastructure of the existing Django project.

The authentication architecture includes:

* Custom Django User model
* Unique user accounts
* JWT access tokens
* JWT refresh tokens
* Refresh token rotation
* Protected REST API endpoints
* Protected React routes
* Google OAuth
* Authenticated resource ownership

Conceptually:

```text
User
 │
 ├── Space
 │    ├── Document
 │    └── Conversation
 │          └── Message
 │
 └── Space
      ├── Document
      └── Conversation
```

Every protected API operation must derive ownership from:

```python
request.user
```

rather than trusting a user ID supplied by the frontend.

This prevents users from requesting resources belonging to another account simply by manipulating API parameters.

---

# 📚 Knowledge Spaces

The backend uses the technical model name:

```text
KnowledgeBase
```

The frontend presents these resources using the simpler product terminology:

> **Spaces**

Example dashboard:

```text
┌──────────────────────────────────────────────────────────┐
│                       My Spaces                          │
│                                           + New Space    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Django Documentation                                   │
│  12 Documents • 3 Conversations                         │
│                                                          │
│  Machine Learning Research                              │
│  8 Documents • 7 Conversations                          │
│                                                          │
│  Project Documentation                                  │
│  5 Documents • 1 Conversation                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Each Space represents an isolated retrieval environment.

### V1 Design Decision

A conversation belongs to exactly **one Space**.

This prevents unrelated knowledge bases from contaminating retrieval results and keeps the initial architecture straightforward.

Multi-Space conversations are intentionally reserved for V2.

---

# 🗄️ Database Architecture

MySQL remains the source of truth for relational application data.

## User

Uses the existing shared custom Django User model.

---

## KnowledgeBase

Represents one user-created Space.

Implemented fields:

```text
id
user
name
created_at
updated_at
```

---

## Document

Represents an uploaded PDF and its processing state.

Implemented fields:

```text
id
user
knowledge_base
filename
s3_key
file_size
page_count
status
created_at
updated_at
```

Processing states:

```text
UPLOADING
     ↓
PROCESSING
     ↓
EMBEDDING
     ↓
READY
```

Failures transition to:

```text
FAILED
```

---

## Conversation

Represents a persistent chat session associated with a Space.

Implemented fields:

```text
id
user
knowledge_base
title
created_at
updated_at
```

---

## Message

Represents an individual message.

Implemented fields:

```text
id
conversation
role
content
sources
created_at
```

Primary roles:

```text
USER
ASSISTANT
```

---

# ☁️ AWS S3 Document Storage

AWS S3 stores the **original PDF files**.

PDF binaries are not stored directly inside MySQL or permanently on the EC2 filesystem.

Conceptual S3 organization:

```text
ragspace/
└── users/
    └── <user-id>/
        └── spaces/
            └── <space-id>/
                └── documents/
                    ├── <uuid>.pdf
                    ├── <uuid>.pdf
                    └── <uuid>.pdf
```

## Why Keep the Original PDF?

After vectors have been generated, the original PDF is technically no longer required for ordinary semantic retrieval.

RAGspace intentionally keeps it anyway.

This allows:

* ✅ Users to reopen original sources
* ✅ Download support
* ✅ Clickable citations
* ✅ Reprocessing documents
* ✅ Changing the chunking algorithm
* ✅ Re-embedding documents
* ✅ Migrating embedding models
* ✅ Future OCR processing
* ✅ Recovering from vector database loss

Chunks themselves are **not** stored in S3.

---

# 🔎 Qdrant Vector Database

RAGspace uses **Qdrant Cloud** as its dedicated vector database.

Collection:

```text
ragspace_chunks
```

Each Qdrant point represents one document chunk.

```text
Qdrant Point
│
├── Point ID
│
├── Embedding Vector
│
└── Payload
    ├── chunk_text
    ├── user_id
    ├── knowledge_base_id
    ├── document_id
    ├── filename
    ├── page
    ├── chunk_index
    └── token_count
```

## One Collection vs. Many Collections

RAGspace V1 uses **one shared collection** rather than creating a Qdrant collection for every user or every Space.

Isolation happens through metadata filtering.

Every retrieval query must filter by at least:

```text
user_id
knowledge_base_id
```

Document-level operations can additionally filter by:

```text
document_id
```

This architecture scales more cleanly than dynamically creating thousands of small collections.

---

# 🧠 Embeddings

RAGspace V1 uses:

```text
OpenAI text-embedding-3-small
```

Embeddings convert text into numerical vectors representing semantic information.

For example:

```text
"Django authentication uses middleware."
              ↓
        Embedding Model
              ↓
[0.018, -0.221, 0.047, ..., 0.192]
```

The vectors themselves are **not sent to the generation model**.

Their purpose is retrieval.

```text
Document Chunk
      ↓
Embedding
      ↓
Vector
      ↓
Stored in Qdrant
```

Later:

```text
User Question
      ↓
Embedding
      ↓
Query Vector
      ↓
Compared Against Stored Vectors
      ↓
Relevant Chunks Returned
```

The **actual retrieved text** is ultimately supplied to the language model.

---

## Embedding Model Consistency

The same embedding model must be used for:

* Document chunks
* User search queries

Changing the embedding model requires existing documents to be re-embedded because vector spaces produced by different models should not be assumed to be directly compatible.

---

## Batch Embeddings

Chunks are embedded in batches.

Instead of:

```text
Chunk 1 → API call
Chunk 2 → API call
Chunk 3 → API call
Chunk 4 → API call
```

RAGspace uses batched requests:

```text
Chunk 1 ┐
Chunk 2 │
Chunk 3 ├──> One Batch Request
Chunk 4 │
Chunk 5 ┘
```

This reduces:

* Network overhead
* API requests
* Processing time
* Ingestion complexity

---

# 📥 Document Ingestion Pipeline

The implemented ingestion workflow is:

```text
User Uploads PDF
       │
       ▼
Frontend Validation
       │
       ▼
Django Validation
       │
       ▼
Create MySQL Document Record
       │
       ▼
Upload Original PDF to S3
       │
       ▼
Extract Text
       │
       ▼
Separate Text by Page
       │
       ▼
Create Overlapping Chunks
       │
       ▼
Batch Chunks
       │
       ▼
OpenAI Embedding API
       │
       ▼
Embedding Vectors
       │
       ▼
Store Vectors + Payload in Qdrant
       │
       ▼
Document.status = READY
```

If any processing step fails:

```text
Document.status = FAILED
```

The frontend can then visibly display the document's state.

Example:

```text
django-auth.pdf          ✅ Ready

deployment-guide.pdf     ⏳ Processing

scan.pdf                 ❌ Failed
```

---

# 🚧 Upload Restrictions

RAGspace V1 intentionally includes resource limits.

| Restriction                |             Initial V1 Limit |
| -------------------------- | ---------------------------: |
| File type                  |                          PDF |
| Maximum file size          |                        10 MB |
| Maximum documents per user |                          ~20 |
| Maximum pages              |                         ~200 |
| OCR documents              |          Not supported in V1 |
| Password-protected PDFs    | Rejected if extraction fails |

An extracted-text or token limit should also be enforced.

A PDF's file size does not necessarily indicate its AI processing cost.

For example:

```text
10 MB Image-Heavy PDF
≈ Little extractable text

10 MB Text-Heavy PDF
≈ Potentially hundreds of thousands of tokens
```

Therefore the backend should validate both file characteristics and extracted content.

Frontend validation improves UX.

Backend validation remains authoritative because frontend validation can be bypassed.

---

# ✂️ Chunking Strategy

Documents cannot simply be embedded as one enormous block of text.

Instead, extracted text is divided into smaller semantic units called **chunks**.

Initial configuration:

```text
Chunk Size:       ~600 tokens
Chunk Overlap:    ~120 tokens
```

Exact values remain configurable.

---

## Why Use Overlap?

Imagine:

```text
Chunk 1:
Authentication middleware processes the incoming request and...

Chunk 2:
...associates an authenticated user with request.user.
```

Without overlap, the explanation could be split at an important conceptual boundary.

Overlap allows neighboring chunks to retain some shared context.

```text
Chunk 1
████████████████████

Chunk 2
              ████████████████████

Chunk 3
                            ████████████████████
```

Too much overlap is also undesirable because it:

* Duplicates information
* Increases embedding costs
* Increases vector storage
* Can cause repetitive search results

---

# 🔍 Retrieval Pipeline

The RAGspace retrieval process is intentionally more sophisticated than simply:

> Question → Vector Search → GPT

The implemented pipeline is:

```text
                     User Question
                           │
                           │
                 Recent Conversation
                           │
                           ▼
                Query Contextualization
                           │
                           ▼
                Standalone Search Query
                           │
                           ▼
                   OpenAI Embedding
                           │
                           ▼
                 Qdrant Similarity Search
                           │
                           ▼
                  Metadata Filtering
                           │
                           ▼
                  Candidate Chunks
                           │
                           ▼
                  Relevance Threshold
                           │
                           ▼
                  Optional Reranking
                           │
                           ▼
                    Best Context
                           │
                           ▼
                       GPT
                           │
                           ▼
                Grounded Answer + Sources
```

---

# 💬 Conversational RAG

A basic RAG system can struggle with follow-up questions.

Consider:

```text
User:
How does Django authentication middleware work?

Assistant:
...

User:
What happens if there isn't one?
```

Embedding only:

```text
"What happens if there isn't one?"
```

creates a weak retrieval query because the phrase contains very little context.

RAGspace solves this with **query contextualization**.

The system considers:

```text
Previous Conversation
        +
Current Question
        ↓
Contextualization Model
        ↓
Standalone Retrieval Query
```

Possible rewritten query:

```text
What happens when a Django application does not use
authentication middleware?
```

That rewritten query is then embedded and used for semantic search.

The user's original wording remains available for final answer generation.

---

# 🧾 Conversation Memory

Conversation history lives in:

```text
MySQL
```

not Qdrant.

### Responsibilities

**Qdrant**

```text
Document Knowledge
```

**MySQL**

```text
Conversation State
Application State
```

The entire conversation will not be sent to the model forever.

Instead, RAGspace initially uses approximately:

```text
8 Recent Messages
```

This value is configurable.

Why?

An unlimited history window would continuously increase:

* Prompt size
* Input tokens
* Cost
* Latency

Long-term conversation summarization is reserved for V2.

---

# 📐 Similarity Search

The contextualized query is embedded using the same embedding model used for document ingestion.

Qdrant performs nearest-neighbor vector search.

```text
                   Query Vector
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
          Chunk A    Chunk B    Chunk C
           0.91       0.85       0.72
```

Initial candidate count:

```text
~12 chunks
```

This value should remain configurable.

---

# 🎯 Relevance Threshold

A vector database can always return the **closest result**.

That does not mean the closest result is actually useful.

Example:

```text
Question:
"What is the company's maternity leave policy?"

Available Documents:
Django Documentation
Machine Learning Research
AWS Documentation
```

Qdrant can still mathematically return something.

RAGspace therefore applies a relevance threshold.

```text
Qdrant Results
      ↓
Minimum Relevance Threshold
      ↓
Relevant?
 ┌────┴────┐
Yes        No
 │          │
 ▼          ▼
Continue   Insufficient Context
```

If no chunks pass the threshold, RAGspace should avoid pretending it found an answer.

Instead, it should respond with something similar to:

> RAGspace could not find enough relevant information in this Space to answer that question.

The score threshold should be determined experimentally instead of blindly hard-coding a value such as `0.75`.

---

# 🏆 Reranking

RAGspace supports a second retrieval stage using:

```text
Voyage rerank-2.5-lite
```

Vector similarity provides the initial candidate set.

The reranker then performs a deeper relevance comparison between the query and each retrieved passage.

```text
Qdrant
   │
   ▼
Top ~12 Candidates
   │
   ▼
Similarity Threshold
   │
   ▼
Voyage Reranker
   │
   ▼
Best ~5 Chunks
   │
   ▼
GPT
```

---

## Graceful Degradation

Reranking is an enhancement.

It should **not** be required for RAGspace to work.

```text
Reranker Available

Qdrant
   ↓
Threshold
   ↓
Reranker
   ↓
GPT
```

If Voyage is unavailable:

```text
Reranker Unavailable

Qdrant
   ↓
Threshold
   ↓
GPT
```

Conceptually:

```python
if RERANKING_ENABLED and candidates:
    try:
        candidates = rerank(query, candidates)
    except Exception:
        logger.exception("Reranking failed. Falling back.")
```

This prevents an optional external service from becoming a single point of failure.

---

# 🤖 Generation

The initially selected answer-generation model is:

```text
GPT-5 mini
```

The specific model should remain environment/configuration-driven.

For example:

```text
RAG_GENERATION_MODEL
```

rather than hard-coding the model across multiple Python files.

The final generation request receives:

```text
System Instructions
        +
Recent Conversation
        +
Original User Question
        +
Retrieved Context
        +
Source Metadata
        ↓
GPT
        ↓
Grounded Answer
```

The generation prompt instructs the model to:

* Prioritize retrieved information
* Avoid inventing document content
* Distinguish knowledge from retrieved evidence
* Admit when the context is insufficient
* Use source metadata appropriately

---

# 🔗 Source Attribution

RAGspace makes retrieval visible to the user.

Example response UI:

```text
Django authentication middleware associates an authenticated
user with each incoming request and exposes that user through
request.user.

Sources
────────────────────────────────────────

📄 django-authentication.pdf
Page 14
Relevance: 91%

📄 django-security.pdf
Page 7
Relevance: 86%
```

Source metadata originates from the Qdrant payload associated with each chunk.

Source cards are clickable. The authenticated backend generates a short-lived presigned S3 GET URL and the browser opens the original PDF at the cited page.

This helps demonstrate that RAGspace is performing actual retrieval rather than simply behaving like a generic chatbot.

---

# 🗑️ Document Deletion

Deleting a document requires cleanup across **three storage layers**.

```text
                     Delete Document
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
        AWS S3          Qdrant           MySQL
           │               │               │
      Delete PDF      Delete Vectors    Delete Record
```

Implemented order:

```text
1. Delete Qdrant vectors
2. Delete S3 object
3. Delete MySQL record
```

External resources are cleaned up before the relational record is removed. If external cleanup fails, the MySQL record is preserved so the application retains the metadata needed to retry cleanup.

Qdrant points can be removed using payload metadata:

```text
user_id
knowledge_base_id
document_id
```

Deleting the MySQL record last helps retain the metadata required to identify external resources if cleanup fails.

## Space Deletion

Deleting a Space performs external cleanup before Django's relational cascade:

```text
Delete Space
    ↓
Load Space Documents
    ↓
Delete Qdrant Vectors
    ↓
Delete S3 PDFs
    ↓
MySQL Transaction
    ↓
Delete KnowledgeBase
    ↓
Django CASCADE
    ├── Documents
    ├── Conversations
    └── Messages
```

This prevents a deleted Space from leaving orphaned PDFs or vector points behind.


---

# ⚙️ RAG Service Architecture

RAG-specific logic will be separated into dedicated Python services.

```text
ragspace_api/
│
├── models.py
├── serializers.py
├── views.py
├── urls.py
│
└── services/
    │
    ├── document_service.py
    ├── text_extraction.py
    ├── chunking.py
    ├── embeddings.py
    ├── vector_store.py
    ├── contextualizer.py
    ├── retrieval.py
    ├── reranker.py
    └── generator.py
```

<details>

<summary><strong>📄 document_service.py</strong></summary>

Coordinates the document lifecycle.

Responsibilities may include:

* Document record creation
* S3 uploads
* Ingestion orchestration
* Status changes
* Document deletion
* External resource cleanup

</details>

<details>

<summary><strong>📖 text_extraction.py</strong></summary>

Responsible for:

* Opening supported PDFs
* Extracting text
* Preserving page information
* Detecting extraction failures

</details>

<details>

<summary><strong>✂️ chunking.py</strong></summary>

Responsible for:

* Token-aware splitting
* Chunk overlap
* Chunk indexing
* Page metadata preservation

</details>

<details>

<summary><strong>🧠 embeddings.py</strong></summary>

Responsible for:

* OpenAI embedding requests
* Batch embedding
* Embedding model configuration
* Embedding errors

</details>

<details>

<summary><strong>🔎 vector_store.py</strong></summary>

Owns Qdrant interactions including:

* Collection initialization
* Point insertion
* Payload indexes
* Vector search
* User/Space filters
* Document-vector deletion

</details>

<details>

<summary><strong>💬 contextualizer.py</strong></summary>

Converts follow-up questions into standalone retrieval queries using recent conversation context.

</details>

<details>

<summary><strong>🎯 retrieval.py</strong></summary>

Coordinates:

```text
Query
 ↓
Embedding
 ↓
Qdrant
 ↓
Threshold
 ↓
Reranker
 ↓
Final Context
```

</details>

<details>

<summary><strong>🏆 reranker.py</strong></summary>

Provides optional Voyage AI second-stage relevance ranking.

Failures fall back gracefully to the original vector ranking.

</details>

<details>

<summary><strong>🤖 generator.py</strong></summary>

Responsible for:

* Grounded prompt construction
* Source context formatting
* Conversation context
* GPT generation
* Model configuration

</details>

---

# 🎛️ Configuration

Important RAG behavior should be configurable.

Potential settings:

```python
RAG_CHUNK_SIZE = 600
RAG_CHUNK_OVERLAP = 120

RAG_CANDIDATE_K = 12
RAG_FINAL_K = 5
RAG_SCORE_THRESHOLD = 0.30

RAG_HISTORY_MESSAGE_LIMIT = 8

RAG_RERANKING_ENABLED = True
RAG_RERANK_MODEL = "rerank-2.5-lite"

RAG_EMBEDDING_MODEL = "text-embedding-3-small"
RAG_GENERATION_MODEL = "gpt-5-mini"
RAG_CONTEXTUALIZATION_MODEL = "gpt-5-mini"

RAG_MAX_FILE_SIZE = ...
RAG_MAX_DOCUMENTS_PER_USER = 20
```

Benefits include:

* Easier experimentation
* Easier model migration
* Retrieval tuning
* Cost optimization
* No duplicated magic numbers

---

# 🔑 Environment Variables

Secrets must **never** be committed to Git.

Expected environment configuration includes:

```env
DJANGO_SECRET_KEY=

DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=
AWS_REGION=

OPENAI_API_KEY=

QDRANT_URL=
QDRANT_API_KEY=

VOYAGE_API_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Environment files are excluded through `.gitignore`.

Examples:

```gitignore
.env
.env.*
node_modules/
```

Production secrets remain on the production environment and are never stored directly in source control.

---

# 🔵 Google OAuth

RAGspace supports Google OAuth alongside the existing JWT authentication architecture.

```text
User
 ↓
Continue with Google
 ↓
Google OAuth
 ↓
Django Authentication
 ↓
Application User
 ↓
JWT Session
 ↓
RAGspace
```

Django remains responsible for:

* User records
* Resource ownership
* Authorization
* Space ownership
* Document ownership
* Conversation ownership

OAuth credentials are stored through environment variables and never committed to the repository.

---

# 🖥️ AWS EC2 Architecture

RAGspace runs on the existing AWS EC2 environment.

The EC2 server is deliberately treated primarily as an:

> **Application and orchestration server**

rather than performing heavy AI inference locally.

```text
AWS EC2
│
├── Apache2
├── Django
├── Django REST Framework
├── MySQL Access
├── RAGspace API
├── Existing Applications
├── React Production Builds
│
├────────► AWS S3
│
├────────► Qdrant Cloud
│
├────────► OpenAI
│
└────────► Voyage AI
```

Heavy workloads are delegated to managed external services.

### Why?

The server has finite:

* CPU
* RAM
* Disk space

RAGspace is intended to coexist with multiple other applications on the same machine.

Therefore:

| Workload                    | Location     |
| --------------------------- | ------------ |
| Django application          | EC2          |
| Apache                      | EC2          |
| React build serving         | EC2          |
| Relational application data | MySQL        |
| Original documents          | AWS S3       |
| Vector storage/search       | Qdrant Cloud |
| Embeddings                  | OpenAI       |
| Generation                  | OpenAI       |
| Reranking                   | Voyage AI    |

---

# 🌍 Apache & SPA Serving

Vite generates the production frontend:

```text
ragspace-frontend/dist/
```

Django serves the SPA's:

```text
index.html
```

for the RAGspace route.

Conceptually:

```python
path(
    "ragspace/",
    TemplateView.as_view(
        template_name="index.html"
    )
)
```

React Router handles navigation after the SPA loads.

```text
Browser
   ↓
https://jorgeramirez.net/ragspace/
   ↓
Apache
   ↓
Django
   ↓
Vite dist/index.html
   ↓
React
   ↓
React Router
```

Static paths and Django template directories will be configured when production integration is completed.

---

# 🐙 Git & GitHub

RAGspace is version controlled using Git and GitHub.

The repository should never track:

```text
node_modules/
.env
.env.*
secret keys
API credentials
OAuth secrets
AWS credentials
generated local files
```

Before committing:

```bash
git status
```

should always be reviewed for unexpected files.

---

# 🔄 CI/CD

RAGspace reuses the existing automated GitHub Actions deployment architecture.

```text
Local Development
       │
       ▼
    git push
       │
       ▼
GitHub Repository
       │
       ▼
GitHub Actions
       │
       ▼
Secure EC2 Deployment
       │
       ▼
Pull Latest Changes
       │
       ├── Python Dependencies
       │
       ├── Django Migrations
       │
       ├── React Build(s)
       │
       ├── Static Assets
       │
       └── Service Reload
       │
       ▼
   Production
```

The existing deployment script builds and deploys RAGspace alongside the other applications in the Django project.

Potential addition:

```bash
cd ragspace-frontend
npm ci
npm run build
```

Production integration uses the existing EC2, Apache2, Django, and GitHub Actions deployment workflow.

---


# 🔌 Key API Workflows

RAGspace exposes authenticated REST endpoints beneath:

```text
/ragspace-api/
```

Major workflows include:

| Workflow | Endpoint Pattern |
| --- | --- |
| List/Create Spaces | `GET/POST /spaces/` |
| Space detail/update/delete | `GET/PATCH/DELETE /spaces/<id>/` |
| List documents | `GET /documents/` |
| Create presigned upload | `POST /documents/presign/` |
| Complete + process upload | `POST /documents/<id>/complete/` |
| Open private source PDF | `GET /documents/<id>/view/` |
| Delete document | `DELETE /documents/<id>/` |
| List/Create conversations | `GET/POST /conversations/` |
| Conversation messages | `GET /conversations/<id>/messages/` |
| Delete conversation | `DELETE /conversations/<id>/` |
| Ask a Space | `POST /ask/` |

The frontend API client attaches JWT credentials and handles token refresh for Django requests. Direct S3 uploads intentionally use the browser `fetch` API against the presigned S3 URL so application JWT headers are never sent to S3.

---

# ✅ V1 Scope

RAGspace V1 focuses on a polished core RAG experience while avoiding unnecessary infrastructure complexity.

### Authentication

* [x] Standard login
* [x] JWT authentication
* [x] Refresh token support
* [x] Google OAuth
* [x] Protected routes

### Spaces

* [x] Create Space
* [x] Rename Space
* [x] Open Space
* [x] Delete Space

### Documents

* [x] Upload PDFs
* [x] Validate PDFs
* [x] AWS S3 storage
* [x] PDF text extraction
* [x] Processing states
* [x] Document deletion

### Retrieval

* [x] Text chunking
* [x] Chunk overlap
* [x] Batched embeddings
* [x] Qdrant storage
* [x] Metadata filtering
* [x] Similarity search
* [x] Relevance threshold
* [x] Optional reranking

### Conversation

* [x] Create conversations
* [x] Save conversation history
* [x] Save messages
* [x] Query contextualization
* [x] Recent conversational memory
* [x] Grounded GPT answers
* [x] Source references
* [x] Page attribution

### Deployment

* [x] Existing EC2 server
* [x] Existing Django project
* [x] Existing MySQL infrastructure
* [x] Existing GitHub Actions pipeline
* [x] RAGspace Vite application initialized
* [x] Django API integration
* [x] Apache integration
* [x] Updated CI/CD
* [x] Production deployment

---

# 🔮 V2 Boundary

The following features are intentionally excluded from the initial one-day V1 build.

This is an architectural decision, not a limitation of the overall project vision.

---

## 👁️ OCR

V1 focuses on text-based PDFs.

Future support may include:

* Scanned documents
* Image-only PDFs
* OCR pipelines
* Document vision models

---

## 🌌 Multi-Space Conversations

V1:

```text
Conversation
      ↓
One Space
```

Potential V2:

```text
Conversation
      │
      ├── Space A
      ├── Space B
      └── Space C
```

The relational architecture can later evolve toward many-to-many Space relationships without requiring existing documents to be re-embedded.

---

## ⚙️ Background Processing

V1 prioritizes development speed and architectural clarity.

Future ingestion could use:

```text
Upload
  ↓
Django
  ↓
S3
  ↓
Job Queue
  ↓
Worker
  ↓
Extract
  ↓
Chunk
  ↓
Embed
  ↓
Qdrant
```

Potential technologies:

* Celery
* Redis
* Dedicated workers
* Job retries
* Dead-letter handling

---

## 🧠 Long-Term Conversation Memory

V1:

```text
Recent Message Window
```

V2 may add:

```text
Recent Messages
      +
Conversation Summary
      ↓
LLM
```

This allows long-running conversations without continually resending the full chat history.

---

## 🔍 Advanced Retrieval

Potential future enhancements:

* Hybrid keyword + semantic search
* Sparse embeddings
* Query expansion
* Dynamic Top-K
* Structure-aware chunking
* Retrieval evaluation datasets
* Automated RAG evaluation
* More advanced reranking
* Multiple embedding strategies

---

## 👥 Collaboration

Potential functionality:

* Shared Spaces
* Team Spaces
* Organizations
* Workspace members
* Role-based permissions
* Public/private Spaces

---

## 💳 SaaS Features

Possible commercial expansion:

* Subscription tiers
* Usage quotas
* Billing
* Organization accounts
* API access
* Administrative dashboard
* Usage analytics
* Per-user document limits
* Per-user token limits

---

# 📈 Future Scaling

RAGspace V1 deliberately avoids premature distributed-system complexity.

A larger production architecture could evolve into:

```text
                              Internet
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Load Balancer  │
                        └────────┬────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
          ┌─────────────────┐         ┌─────────────────┐
          │ Django Server 1 │         │ Django Server 2 │
          └────────┬────────┘         └────────┬────────┘
                   │                           │
                   └─────────────┬─────────────┘
                                 │
                  ┌──────────────┼───────────────┐
                  │              │               │
                  ▼              ▼               ▼
                RDS             S3          Qdrant Cloud
                  │                              │
                  │                        OpenAI / Voyage
                  │
                  ▼
             Redis / Queue
                  │
                  ▼
             Worker Fleet
```

Potential production infrastructure:

* AWS Application Load Balancer
* Auto Scaling
* Amazon RDS
* Redis
* Celery
* Dedicated ingestion workers
* CDN
* Centralized logging
* Monitoring
* Rate limiting
* Secrets management
* Automated backups

These systems should be introduced only when actual scale justifies them.

---

# 🧭 Design Philosophy

### 🧩 Separation of Concerns

Each service has a specific responsibility.

```text
MySQL     → Relational Data
S3        → Original Files
Qdrant    → Vector Retrieval
OpenAI    → Embeddings + Generation
Voyage    → Optional Reranking
Django    → Application Logic
React     → User Experience
```

---

### ☁️ Cloud-First AI Inference

Heavy AI workloads are delegated to managed APIs instead of consuming limited EC2 resources.

---

### 🔍 Retrieval Before Generation

The language model is not treated as the application's database.

Relevant information is retrieved first.

```text
Retrieve
   ↓
Ground
   ↓
Generate
```

---

### 🔗 Source Traceability

Answers should reveal the documents and pages that contributed to the generated response.

---

### 🛡️ Secure Multi-User Isolation

Every application and vector retrieval operation must respect authenticated ownership.

```text
request.user
      ↓
Knowledge Base
      ↓
Documents
      ↓
Vectors
```

---

### 🧯 Graceful Degradation

Optional improvements such as reranking must never unnecessarily disable the core RAG system.

---

### 🎛️ Configurable Retrieval

Important behavior should remain configurable:

* Chunk size
* Chunk overlap
* Candidate count
* Final context count
* Score threshold
* Conversation history
* Reranking
* Embedding model
* Generation model

---

### 🚀 Build for Today Without Blocking Tomorrow

V1 intentionally avoids premature complexity while maintaining clean migration paths toward:

* Background workers
* Horizontal scaling
* SaaS functionality
* Shared Spaces
* Advanced retrieval
* Multi-Space conversations

---

# 📸 Screenshots

> **RAGspace V1 is complete and production-ready.**

Recommended screenshots include:

* Dashboard
* My Spaces
* Space Detail
* Document Manager
* Document Processing
* RAG Conversation
* Source Attribution
* Conversation History

---

# ✅ Development Status

**RAGspace V1 is complete and ready for production deployment.**

### Backend

* [x] `ragspace_api` Django application
* [x] KnowledgeBase, Document, Conversation, and Message models
* [x] User-scoped serializers, views, permissions, and REST routes
* [x] Shared JWT authentication and Google OAuth
* [x] S3 presigned upload pipeline
* [x] PDF extraction with page preservation
* [x] Token-aware chunking with overlap
* [x] OpenAI batch embeddings
* [x] Qdrant Cloud vector storage and payload indexing
* [x] Similarity search and relevance threshold
* [x] Voyage AI reranking with graceful fallback
* [x] Conversation-aware query contextualization
* [x] Grounded GPT answer generation
* [x] Persistent conversations, messages, and source metadata
* [x] Document and Space cleanup across Qdrant, S3, and MySQL
* [x] Authenticated presigned source-document viewing

### Frontend

* [x] React + TypeScript + Vite application
* [x] Login, registration, JWT persistence, and Google OAuth
* [x] Protected routes
* [x] Responsive application shell and mobile navigation
* [x] Space CRUD dashboard
* [x] Document listing, upload, validation, processing feedback, and deletion
* [x] Conversation list, history, and deletion
* [x] New and continuing RAG conversations
* [x] Source cards with filename and page attribution
* [x] Click-to-open citations
* [x] Chat UX polish including Enter-to-send, multiline input, auto-grow, auto-scroll, and generation feedback

### Production

* [x] AWS EC2 hosting
* [x] Apache2 integration
* [x] MySQL persistence
* [x] Private AWS S3 storage
* [x] Qdrant Cloud
* [x] OpenAI integration
* [x] Voyage AI integration
* [x] GitHub Actions CI/CD
* [x] Production environment configuration
* [x] V1 deployment readiness


---

<div align="center">

# 🧠 RAGspace

### Your knowledge. One intelligent space.

**Private documents → Semantic retrieval → Grounded conversations**

Built with React, TypeScript, Django, AWS, Qdrant, OpenAI, and modern Retrieval-Augmented Generation architecture.

</div>















# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

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

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.





