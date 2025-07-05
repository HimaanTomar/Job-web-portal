# Job-web-portal


A simple job portal web application where users can register as **Job Seekers**, **Employers**, or **Admins**.

## 🔧 Features

- 🔐 User registration & login (3 roles: Job Seeker, Employer, Admin)
- 📄 Job posting with **title**, **description**, **salary**, and **location**
- 🔎 Job search with filters (location, category, company)
- 🧾 Job application system for seekers
- 📊 Dashboard views for each role
- 💾 SQLite database to store users, jobs, and applications

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap (in your case, React/TypeScript)
- **Backend**: Python (Flask)
- **Database**: SQLite
- **API Integration**: Optional - Fetch jobs from an external API

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js (for frontend)
- SQLite (default)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate    # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py               # Run the Flask server
