ResuScan

ResuScan is a full-stack resume analysis and job application tracking
platform built with React, TypeScript, Django REST Framework, MySQL,
AWS, and external AI services.

The project began as a resume analyzer and evolved into a broader
job-search dashboard. Version 1 allows authenticated users to upload and
manage resumes, extract and analyze resume content, review persistent
analysis history, generate resume thumbnails, and manage job
applications through a full CRUD workflow and Kanban board.

Current V1 scope: Resume analysis is supported during the resume
processing workflow, but V1 does not yet provide a user-facing action
to create a new/repeated analysis for an already uploaded resume.

Table of Contents

Core Features

Technology Stack

System Architecture

Frontend Architecture

Backend Architecture

Database Design

Custom User Model

Authentication and Authorization

Resume Processing Pipeline

Amazon S3 Storage

Resume Analysis

Resume Thumbnails

Job Application Tracker

API Design

Routing

Production Infrastructure

Apache Configuration

CI/CD

Local Development

Configuration and Environment Variables

Security Decisions

Important Design Decisions

Known V1 Limitations

Future Architecture and Planned Features

Core Features

Resume Management

Authenticated resume uploads

Private resume storage using Amazon S3

Presigned upload workflow

Persistent resume metadata in MySQL

PDF and DOCX text extraction

Resume text normalization

Resume thumbnail generation

Resume history and deletion

Persistent resume analysis history

User ownership checks on protected resources

UUID-based public resource identifiers

Resume Analysis

Resume text sent through an external language-model API

Structured analysis output

Overall, ATS, keyword, experience, and skills scores

Strengths and weaknesses

Missing keywords and recommendations

Persistent analysis records

Analysis status tracking

Model/prompt metadata and failure-state handling

Job Application Tracker

Create, retrieve, list, update, and delete job applications

Track application status

Associate applications with resumes and resume analyses

Responsive Kanban-style application workflow

Current statuses:

Saved
Applied
Interview
Offer
Rejected
Withdrawn

The primary Kanban workflow is:

Saved -> Applied -> Interview -> Offer

Technology Stack

Frontend

React

TypeScript

Vite

React Router

React Context API

CSS

Fetch API

JWT-based client authentication

Backend

Python

Django

Django REST Framework

Simple JWT

MySQL

mysqlclient

PDF/DOCX extraction utilities

Pillow

External LLM API integration

Infrastructure

AWS EC2

Ubuntu

Apache2

Amazon S3

Presigned S3 uploads

GitHub Actions

SSH-based automated deployment

System Architecture

                              USER
                                |
                                v
                       jorgeramirez.net
                                |
                                v
                        Apache2 on AWS EC2
                                |
                 +--------------+--------------+
                 |                             |
                 v                             v
        React + TypeScript              Django + DRF
            Vite SPA                      REST API
                 |                             |
                 |                 +-----------+-----------+
                 |                 |                       |
                 |                 v                       v
                 |               MySQL                 Amazon S3
                 |                 |                       |
                 |          Users / metadata          Resume files
                 |          Resume records            Thumbnails
                 |          Analyses
                 |          Job applications
                 |
                 +---------- REST API --------------------+
                                               |
                                               v
                                      External AI Service
                                      Resume Analysis

The EC2 instance acts as the primary application server. Apache serves
the production site, Django handles API requests and server-side
application logic, MySQL stores relational data, and S3 stores uploaded
resume objects and generated media.

Frontend Architecture

The frontend is a React + TypeScript single-page application built with
Vite.

The Vite project uses:

base: /static

The production SPA is mounted beneath:

/resuscan/

React Router handles client-side navigation.

Frontend Service Layer

API requests are separated from presentation components:

api/
|-- api_service.tsx
|-- auth_service.tsx
|-- resume_service.tsx
`-- job_application_service.ts

api_service.tsx is the shared authenticated request layer. It adds the
bearer access token, detects 401 Unauthorized, attempts a token
refresh, and retries the original request after a successful refresh.

auth_service.tsx handles login, token persistence, refresh-token
rotation, logout, and token cleanup.

resume_service.tsx contains resume-related API operations including
upload, extraction, analysis, history, thumbnails, and deletion.

job_application_service.ts contains the tracker CRUD functions:

getJobApplications()
getJobApplication(applicationId)
createJobApplication(data)
updateJobApplication(applicationId, updates)
deleteJobApplication(applicationId)

Dashboard Architecture

ResumeAnalyzerDashboardPage.tsx acts as the persistent shell for the
authenticated ResuScan workspace.

It contains shared navigation, profile controls, responsive burger
navigation, analysis popup state, shared dashboard state, and a React
Router child outlet.

ResumeAnalyzerDashboardPage
|
|-- Header
|   |-- Dashboard
|   |-- Documents
|   |-- Find Jobs
|   `-- My Saved Jobs
|
|-- Shared Dashboard State
|
|-- <Outlet />
|   |-- Dashboard/Home
|   |-- Documents
|   |-- Find Jobs
|   `-- Saved Jobs
|
`-- Footer

Nested routing keeps the dashboard shell mounted while child pages
change, preserving parent-level React state during normal tab
navigation. A full browser refresh still recreates the React
application, so persistent application data lives on the backend.

Backend Architecture

The backend uses Django and Django REST Framework.

Primary Django project:

websitethree

Primary ResuScan API application:

resume_analyzer_app_api

Production API namespace:

/resume-analyzer-app-api/

Backend responsibilities include authentication, authorization, resume
metadata, S3 upload coordination, upload verification, text extraction,
thumbnail generation, resume analysis, analysis persistence, job
application CRUD, ownership enforcement, and database access.

As the project grew, feature-specific views began being separated:

views/
|-- views.py
`-- job_application_views.py

The job tracker uses a dedicated DRF ModelViewSet.

Database Design

MySQL is the relational database. Uploaded resume files are not stored
as database BLOBs.

Major entities include:

User
 |
 +---- Resume
 |       |
 |       +---- ResumeAnalysis
 |       |
 |       `---- JobApplication
 |
 `---- JobApplication

Ownership ultimately traces back to the authenticated user.

Public resources use UUID identifiers instead of exposing sequential
primary keys. MySQL may display a UUID without hyphens while Django's
UUIDField presents the same value in standard hyphenated form.

Custom User Model

ResuScan uses a custom Django user model based on AbstractUser.

An early implementation attempted to remove the standard username
field. This caused compatibility issues with Django admin, including
admin.E033.

The final design retained username while requiring a unique email:

class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

The API user serializer exposes fields including:

id
username
email
first_name
last_name

This kept compatibility with Django's authentication/admin ecosystem
while enforcing unique email addresses.

Authentication and Authorization

Authentication uses Django REST Framework with Simple JWT.

The client maintains an access token and refresh token in browser
localStorage.

Authenticated requests include:

Authorization: Bearer <access-token>

The shared apiFetch() layer handles automatic refresh and retry after
a 401.

Refresh-token rotation is enabled. When a replacement refresh token is
returned, the frontend stores it.

Session Validation

Initial authentication state checks whether an access token exists. The
app then validates the current session through:

GET /resume-analyzer-app-api/user/me/

Protected Routes

Authenticated React pages use ProtectedRoute. Nested dashboard routes
inherit the parent route's protection.

Backend Ownership

Protected resources are scoped to the current user, for example:

JobApplication.objects.filter(owner=self.request.user)

Resume and analysis relationships are also ownership-checked before
association. Knowing another resource's UUID is therefore not sufficient
to access or modify it.

Resume Processing Pipeline

1. User selects resume
        |
        v
2. React requests an upload
        |
        v
3. Django generates S3 upload information
        |
        v
4. Browser uploads directly to S3
        |
        v
5. React tells Django upload completed
        |
        v
6. Backend verifies S3 object
        |
        v
7. Resume record is finalized
        |
        v
8. Text extraction begins
        |
        v
9. Text is normalized and stored
        |
        v
10. Thumbnail is generated
        |
        v
11. Resume analysis runs
        |
        v
12. Structured analysis is stored
        |
        v
13. React displays resume/history/results

Upload, extraction, thumbnail generation, and analysis are separate
stages so they can be tested and fail independently.

Amazon S3 Storage

Resume files are stored in a private Amazon S3 bucket rather than MySQL.

The backend generates temporary presigned upload information so the
browser can upload directly:

React
  |
  | Request upload
  v
Django
  |
  | Generate presigned upload
  v
React
  |
  | Direct upload
  v
Amazon S3

This reduces EC2 bandwidth and Django memory usage while keeping the
bucket private.

After upload, Django verifies the S3 object before treating the upload
as complete. S3 object information is associated with the corresponding
MySQL Resume record.

Text Extraction

Resume text is extracted server-side after a successful upload. PDF and
DOCX content are supported.

Utilities created for this workflow include modules such as:

text_extraction.py
utils/s3_helpers.py
utils/text_utils.py

The pipeline reads the S3 object, extracts document text, normalizes it,
and persists the extracted content/status.

Resume Analysis

After extraction, resume text can be sent through the analysis pipeline.

The application uses an external language-model API rather than hosting
a large model directly on EC2. This was intentional because the EC2
server is shared with other projects and has limited storage/compute.

Analysis output is structured rather than arbitrary prose. A frontend
representation includes:

type ResumeAnalysisResponse = {
    analysis_id: string;
    resume_id: string;
    status: string;

    scores: {
        overall: number;
        ats: number;
        keywords: number;
        experience: number;
        skills: number;
    };

    strengths: string[];
    weaknesses: string[];
    missing_keywords: string[];
    recommendations: string[];
};

The backend also tracks analysis status, model information, prompt
version, raw result, timestamps, and failure state. Structured output /
JSON-schema validation keeps model responses compatible with the
expected application schema.

A resume can have persistent analysis records and the frontend can
retrieve its analysis history.

V1 does not yet expose a user-facing action to re-run a new analysis on
an already processed resume.

Resume Thumbnails

ResuScan generates small resume previews so users can visually identify
uploaded documents.

The thumbnail is deliberately smaller than a full-resolution document
render for faster loading. Pillow is an explicit backend dependency and
should be present in requirements.txt.

Conceptually:

Resume
   |
   v
Render first-page preview
   |
   v
Resize for thumbnail use
   |
   v
Store thumbnail
   |
   v
Return thumbnail URL

Job Application Tracker

The tracker uses a JobApplication model with fields including:

public_id
owner
company_name
job_title
status
job_url
location
salary_min
salary_max
date_applied
notes
resume
resume_analysis
created_at
updated_at

company_name and job_title are required. Other fields can be filled
later.

Status choices:

saved
applied
interview
offer
rejected
withdrawn

New applications default to saved.

A job application can optionally reference the resume used and a resume
analysis. Nullable relationships use SET_NULL so deleting a
resume/analysis does not automatically erase job-application history.

DRF ModelViewSet

The tracker uses:

viewsets.ModelViewSet

which provides:

POST    create
GET     list
GET     retrieve
PUT     update
PATCH   partial_update
DELETE  destroy

Individual records are looked up using:

lookup_field = "public_id"

and may use:

lookup_url_kwarg = "application_id"

for API readability.

The queryset is scoped to the authenticated user, and referenced
resumes/analyses are separately ownership-validated.

Kanban Board

The tracker includes a responsive Kanban interface.

Primary workflow:

+---------+---------+-----------+-------+
| Saved   | Applied | Interview | Offer |
+---------+---------+-----------+-------+
| Job A   | Job C   | Job E     | Job F |
| Job B   | Job D   |           |       |
+---------+---------+-----------+-------+

Cards can display job title, company, location, salary, application
date, and status.

Status changes use the existing PATCH endpoint instead of a separate
status endpoint.

API Design

The API lives beneath:

/resume-analyzer-app-api/

Important V1 endpoints include:

Authentication
--------------
/auth/login/
/auth/refresh/
/auth/logout/
/auth/register/

Current User
------------
GET /user/me/

Resume Upload
-------------
POST /resumes/upload-request/
POST /resumes/upload-complete/

Resume Processing
-----------------
POST /resumes/<resume_id>/extract/
POST /resumes/<resume_id>/analyze/

Resume Thumbnails
-----------------
/resumes/<resume_id>/thumbnail/
/resumes/<resume_id>/thumbnail-url/

Resume Management
-----------------
GET    /resumes/
DELETE /resumes/<resume_id>/

Analysis History
----------------
GET /resumes/<resume_id>/analyses/

Job Applications
----------------
GET    /job-applications/
POST   /job-applications/
GET    /job-applications/<application_id>/
PUT    /job-applications/<application_id>/
PATCH  /job-applications/<application_id>/
DELETE /job-applications/<application_id>/

The job tracker uses DRF DefaultRouter:

router = DefaultRouter()

router.register(
    r"job-applications",
    JobApplicationViewSet,
    basename="job-application",
)

urlpatterns += router.urls

Registering the ViewSet alone is not sufficient; the router URLs must
also be added to Django's URL patterns.

Routing

The production SPA is served beneath:

/resuscan/

The React application uses a basename of:

/resuscan

Main React routes include:

/
/login
/register
/forgot-password
/reset-password
/profile
/resume-analyzer

Authenticated dashboard routes include:

/resume-analyzer
/resume-analyzer/documents
/resume-analyzer/find-jobs
/resume-analyzer/saved-jobs

In production these resolve beneath /resuscan.

ResumeAnalyzerDashboardPage is the protected parent route and child
content is rendered through <Outlet />.

Django SPA Catch-All

Direct browser requests and refreshes reach the server before React
Router. Django therefore serves the Vite index.html for ResuScan
routes, including nested paths.

The production configuration includes the equivalent of:

path(
    "resuscan/<path:path>",
    TemplateView.as_view(
        template_name="resume-analyzer-app/dist/index.html"
    )
)

React Router then decides which child component to render.

Production Infrastructure

ResuScan is deployed on an Ubuntu AWS EC2 instance.

The host runs:

Ubuntu
Apache2
Django
Python environment
MySQL
Built React/Vite applications
Deployment scripts

The same server hosts multiple projects/frontends, historically
including:

homepage-frontend/build
homepage-react-frontend-parallax-semantic/build
resume-analyzer-app/dist

This shared-hosting constraint influenced the decision not to host large
AI models directly on the instance.

Apache Configuration

Apache2 is the production web server.

Its responsibilities include serving the domain/static assets, routing
requests to Django, supporting deployed React applications, and
maintaining the separation between:

/resuscan/...                    -> React SPA
/resume-analyzer-app-api/...    -> Django REST API

Django template/static configuration was updated to make the Vite
build's resume-analyzer-app/dist/index.html available. Explicitly
serving that SPA entry point resolved an earlier production 404.

MySQL Setup

MySQL is installed on the EC2 host and used by Django.

During setup, Django encountered:

ModuleNotFoundError: No module named 'MySQLdb'

The environment required MySQL development dependencies and the Python
mysqlclient package. Setup included packages such as:

default-libmysqlclient-dev
libmysqlclient-dev
libssl-dev
build-essential
pkg-config

followed by:

pip install mysqlclient

Afterward, migrations ran successfully.

CORS

Local Vite development has used:

http://localhost:5173

Django CORS configuration was updated so the local frontend could
communicate with the API. Production uses the hosted domain.

CI/CD

Git and GitHub are used for source control. GitHub Actions automates
deployment to EC2.

Repository secrets include values in the form of:

EC2_HOST
EC2_USERNAME
EC2_SSH_KEY

Each is stored as a separate GitHub Actions secret.

Deployment flow:

Local development
      |
      v
git commit
      |
      v
git push
      |
      v
GitHub Actions
      |
      v
SSH into EC2
      |
      v
Run deployment script
      |
      v
Pull/build/update application
      |
      v
Production

A deploy.sh script is part of the deployment workflow. Django
deployment includes migration handling and frontend deployment rebuilds
the Vite application when required.

Local Development

Frontend

npm install
npm run dev

Because Vite uses the configured base, local development may be accessed
beneath:

http://localhost:5173/static/

Backend

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

Local API base:

http://127.0.0.1:8000/resume-analyzer-app-api/

Configuration and Environment Variables

Secrets must not be committed to Git.

ResuScan requires configuration in categories including:

Django
------
SECRET_KEY
DEBUG
ALLOWED_HOSTS

Database
--------
MySQL database name
MySQL username
MySQL password
MySQL host
MySQL port

AWS
---
AWS credentials / IAM configuration
S3 bucket
AWS region

AI Service
----------
API key
Model configuration

Frontend / Deployment
---------------------
Production API base URL
Allowed frontend origins
EC2 deployment credentials stored as GitHub Secrets

Use the exact variable names defined by the deployed project when
configuring an environment.

Security Decisions

Resume files are kept in private S3 storage.

User-owned querysets are scoped to the authenticated user.

Public API resources use UUIDs rather than sequential IDs.

UUIDs are not treated as authorization; ownership checks are still
mandatory.

Protected endpoints require JWT bearer authentication.

Referenced resume/analysis IDs are server-side ownership-validated.

Registration uses Django's password hashing/user creation
mechanisms.

Database credentials, AWS credentials, Django secrets, AI API keys,
and SSH keys remain outside source control.

Important Design Decisions

MySQL for Relational Data

Users, resumes, analyses, and job applications are strongly relational,
so MySQL remains the application database.

S3 for Files

Uploaded documents and generated media belong in object storage rather
than database BLOBs.

Direct Browser-to-S3 Uploads

Presigned uploads reduce load on the shared EC2 instance.

Hosted AI APIs

Large AI models are not hosted on the production EC2 instance, reducing
disk, RAM, compute, and deployment requirements.

Separate Frontend Service Layer

Components call dedicated service functions rather than duplicating
API/authentication logic.

Nested React Router Layout

The dashboard remains mounted while child pages change, preserving
temporary dashboard state during tab navigation.

DRF ModelViewSet for Job Applications

The tracker maps naturally to REST CRUD, so ModelViewSet avoids
duplicating standard CRUD implementations.

PATCH for Status Changes

Moving an application from Applied to Interview is simply:

{
    "status": "interview"
}

through the normal partial-update endpoint.

SET_NULL for Tracker Relationships

Deleting a resume should not erase the historical fact that a job
application existed, so optional resume/analysis tracker relationships
are nullable rather than cascading tracker deletion.

Testing Approach

Postman was used extensively to validate backend behavior before
frontend integration.

Tested workflows include authentication, JWT headers, current-user
retrieval, resume upload, upload completion, text extraction, analysis,
thumbnails, resume listing/deletion, analysis history, and full job
application CRUD.

A recurring workflow was:

Build backend endpoint
      |
      v
Test with Postman
      |
      v
Build TypeScript service
      |
      v
Test locally in React
      |
      v
Push through CI/CD
      |
      v
Verify production

Known V1 Limitations

No user-facing action to run a new analysis on an already uploaded
resume

No job-description-specific resume analysis workflow yet

Find Jobs is not yet a complete job-discovery system

Resume analysis and job tracking are not yet combined into one
job-specific optimization workflow

React in-memory state does not survive a full browser refresh unless
reconstructed from persistent data

Long-running processing could be moved to a stronger background-job
architecture

Future Architecture and Planned Features

The items in this section are planned/considered architecture, not V1
functionality.

Job-Specific Resume Analysis

Find Job
   |
   v
Save Job
   |
   v
Choose Resume
   |
   v
Analyze Resume Against Job Description
   |
   v
ATS / Keyword / Experience Gap Analysis
   |
   v
Improve Resume
   |
   v
Apply
   |
   v
Track in Kanban

New / Repeated Analysis

Users could create multiple analyses for the same resume and compare
changes over time.

Find Jobs

The existing nested find-jobs route provides a natural location for
future job discovery functionality.

Retrieval-Augmented Generation (RAG)

A future RAG design separates relational and vector workloads:

MySQL
  |
  +-- Users
  +-- Resume metadata
  +-- Analyses
  +-- Job applications
  `-- Application relationships

Qdrant
  |
  +-- Embedding vectors
  +-- Chunk IDs
  +-- Document references
  `-- Retrieval metadata

Proposed flow:

Document text
    |
    v
Chunking + overlap
    |
    v
Hosted embedding API
    |
    v
Qdrant
    |
    v
Similarity search
    |
    v
Relevant chunks
    |
    v
LLM context
    |
    v
Grounded response

Chunk metadata can preserve document ID, page number, chunk ID, and
source information. Overlap helps prevent useful context from being lost
when a semantic section crosses chunk boundaries.

Hosted embedding APIs are preferred over installing a large embedding
model on the shared EC2 instance.

Background Processing

Long-running operations such as extraction, thumbnail generation, LLM
analysis, and embedding generation are candidates for future background
processing so server-side workflows can continue independently of
browser refreshes.

Project Philosophy

ResuScan is designed as more than a single AI demo.

Presentation
     |
     v
React / TypeScript

API / Business Logic
     |
     v
Django REST Framework

Relational State
     |
     v
MySQL

Object Storage
     |
     v
Amazon S3

Intelligent Processing
     |
     v
External AI Services

Deployment
     |
     v
AWS EC2 + Apache2 + GitHub Actions

Each layer has a distinct responsibility so the application can continue
growing without putting every concern into a single service or
component.

V1 Summary

ResuScan V1 demonstrates:

Full-stack React/TypeScript + Django development

REST API design

Custom Django authentication

JWT access/refresh flows

Protected routes

User-level authorization

MySQL relational modeling

UUID resource identifiers

Private S3 object storage

Presigned uploads

Document text extraction

Resume thumbnail generation

Structured LLM integration

Persistent AI analysis results

Job application CRUD

Kanban workflow management

Responsive UI design

Apache production hosting

AWS EC2 deployment

GitHub Actions CI/CD

Local/production environment separation

The first version establishes the infrastructure needed to evolve
ResuScan from a resume analyzer into a complete job-search workflow
platform.