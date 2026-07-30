markdown
# 🚀 Personal Portfolio Website

This project is officially **public**! 🌍 

Previously maintained as a private repository during development, this codebase is now open-source. This repository hosts my personal portfolio website, showcasing my full-stack projects, skills, and technical background.

---

## 🛠️ Tech Stack

### Frontend
* **UI Framework:** React
* **Languages:** TypeScript (TS), JavaScript (JS)
* **Build Tool:** Vite
* **Styling:** HTML5, CSS3
* **API Communication:** Fetch API
* **Environment Configuration:** Vite environment variables (`.env`, `.env.production`)

### Backend & Authentication
* **Framework:** Django (Python)
* **API Framework:** Django REST Framework (DRF)
* **Authentication:** JWT Authentication using SimpleJWT
* **Authentication Features:**
  * Access and refresh token authentication
  * Protected API endpoints
  * Current user profile endpoint
  * Automatic access token refresh handling

### Password Recovery System
* **Reset Method:** UUID-based password reset tokens
* **Security Features:**
  * Time-limited reset tokens
  * Single-use password reset tokens
  * Secure password update workflow
* **Email Delivery:** Amazon Simple Email Service (SES)

### Database & Cloud Infrastructure
* **Database:** MySQL
* **Hosting/Cloud:** AWS EC2 Instances
* **Email Service:** Amazon Simple Email Service (SES)
* **DNS Management:** AWS Route 53
* **SSL Certificates:** Let's Encrypt
* **CI/CD:** GitHub Actions

### Production Server
* **Web Server:** Apache2
* **Application Server:** mod_wsgi
* **Backend Deployment:** Django WSGI application
* **Static File Hosting:** Apache-managed static assets

---

## 🚀 Architectural Overview

* **Decoupled Architecture:** React manages a responsive frontend experience, while Django provides a secure REST API backend.
* **REST API Backend:** Django REST Framework exposes structured endpoints for authentication, user management, and application features.
* **Secure Authentication:** JWT authentication protects API resources using short-lived access tokens and refresh tokens.
* **Password Recovery:** Users can securely reset forgotten passwords through email-delivered UUID reset links.
* **Email Infrastructure:** Amazon SES handles transactional email delivery for password recovery and future application notifications.
* **Environment-Based Configuration:** Sensitive values such as API URLs, database credentials, Django secrets, and SMTP credentials are managed through environment variables.
* **Web Server Layer:** Apache2 serves as the production web server, managing static files and routing requests to Django through WSGI/mod_wsgi.
* **Cloud Deployment:** Hosted on AWS EC2 with MySQL persistence, Route 53 DNS management, SSL encryption, and automated deployments.

---

## 🔐 Authentication Flow

The application uses JWT authentication through Django REST Framework and SimpleJWT.

### Login Flow

1. User submits login credentials through the React frontend.
2. Django validates the credentials.
3. Django generates:
   * Access token
   * Refresh token
4. React stores the tokens securely for authenticated requests.
5. When an access token expires, React automatically requests a new access token using the refresh token.

### Password Reset Flow

1. User submits their email address through the forgot password form.
2. Django verifies the account exists.
3. Django creates a secure UUID password reset token.
4. A reset link is generated and sent through Amazon SES.
5. User opens the reset page and enters a new password.
6. Django validates the token, updates the password, and invalidates the reset token.

---

## 📧 Email Infrastructure

Transactional emails are delivered using **Amazon Simple Email Service (SES)**.

Implemented features:

* Verified sending domain (`jorgeramirez.net`)
* SES SMTP authentication
* Domain identity verification
* DKIM authentication
* Password reset email delivery
* Environment-based SMTP configuration

---

## 🔄 CI/CD Pipeline & Automated Deployment

This repository utilizes **GitHub Actions** to achieve seamless Continuous Integration and Continuous Deployment (CI/CD). 

### How It Works:

1. **Trigger:** A developer pushes code changes directly to the `main` branch.
2. **Authentication:** The runner safely authenticates with the cloud server using encrypted SSH keys stored securely in **GitHub Actions Secrets**.
3. **Execution:** GitHub Actions connects to the live **AWS EC2 instance** and triggers a specialized deployment script (`deploy.sh`).
4. **Backend Update:** The deployment script pulls the latest code changes, installs updated dependencies, runs Django migrations, and updates the production environment.
5. **Service Restart:** Apache is restarted to apply backend changes.

---

## 💻 Getting Started

Follow these steps to run the portfolio locally.

### Prerequisites

* Python 3.12+
* Node.js v18+
* MySQL Server

---

### 1. Clone the Repository

```bash
git clone https://github.com
cd your-portfolio-repo
```

---

### 2. Backend Setup (Django)

```bash
cd backend

python -m venv venv

source venv/bin/activate  # On Windows use: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

### 3. Frontend Setup (React)

```bash
cd ../frontend

npm install

npm run dev
```

---

## ⚠️ Security & Git History Notice

> [!IMPORTANT]
> **Django Secret Key Revocation:** During the initial development phase of this private repository, the Django `SECRET_KEY` was accidentally committed to the Git history.
>
> Upon making this repository public, **the old compromised key was completely revoked and recreated**.
>
> The active application now safely pulls a brand-new production key from a secure `.env` file, which is kept strictly out of version control via `.gitignore`. 

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to copy, study, or adapt the individual code implementations for your own work, provided the original copyright remains attributed.