markdown
# 🚀 Personal Portfolio Website

This project is officially **public**! 🌍 

Previously maintained as a private repository during development, this codebase is now open-source. This repository hosts my personal portfolio website, showcasing my full-stack projects, skills, and technical background.

---

## 🛠️ Tech Stack

### Frontend
* **UI Framework:** React
* **Languages:** TypeScript (TS), JavaScript (JS)
* **Styling:** HTML5, CSS3

### Backend & Authentication
* **Framework:** Django (Python)
* **Authentication:** Django JWT (JSON Web Tokens)

### Database & Cloud Infrastructure
* **Database:** MySQL
* **Hosting/Cloud:** AWS EC2 Instances 
* **CI/CD:** GitHub Actions

---

## 🚀 Architectural Overview

* **Decoupled Architecture:** React manages a responsive frontend experience, while Django serves as a robust REST API backend.
* **Secure Auth:** Secure user login and protected API endpoints are handled via JWT authentication.
* **Web Server Layer:** Apache2 serves as the production web server, managing reverse proxying, static file hosting, and routing traffic to the Django application via WSGI/mod_wsgi.
* **Cloud Deployment:** Scaled and hosted live using AWS EC2 infrastructure with a MySQL database layer.


---

## 🔄 CI/CD Pipeline & Automated Deployment

This repository utilizes **GitHub Actions** to achieve seamless Continuous Integration and Continuous Deployment (CI/CD). 

### How It Works:
1. **Trigger:** A developer pushes code changes directly to the `main` branch.
2. **Authentication:** The runner safely authenticates with the cloud server using encrypted SSH keys stored securely in **GitHub Actions Secrets**.
3. **Execution:** GitHub Actions connects to the live **AWS EC2 instance** and triggers a specialized deployment script (`deploy.sh`).
4. **Live Update:** The deployment script pulls the latest code changes, reinstalls any updated dependencies, handles backend migrations, and restarts the web services with zero user downtime.

---

## 💻 Getting Started

Follow these steps to run the portfolio locally.

### Prerequisites
* Python 3.10+
* Node.js v18+
* MySQL Server active

### 1. Clone the Repository
```bash
git clone https://github.com
cd your-portfolio-repo
```

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.txt migrate
python manage.py runserver
```

### 3. Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start
```

---

---

## ⚠️ Security & Git History Notice

> [!IMPORTANT]
> **Django Secret Key Revocation:** During the initial development phase of this private repository, the Django `SECRET_KEY` was accidentally committed to the Git history. 
> 
> Upon making this repository public, **the old compromised key was completely revoked and recreated**. The active application now safely pulls a brand-new production key from a secure `.env` file, which is kept strictly out of version control via `.gitignore`. 

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to copy, study, or adapt the individual code implementations for your own work, provided the original copyright remains attributed.