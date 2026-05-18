# Employee Management System

A Full Stack Employee Management System developed using **FastAPI**, **React.js**, and **MySQL** with secure JWT authentication, employee CRUD operations, search & filtering, pagination, and soft delete functionality.

---

# Project Overview

This project is designed to manage employee records with secure authentication and scalable backend architecture.

The application provides:

- Employee Registration
- JWT Login Authentication
- Employee CRUD Operations
- Search & Filtering
- Pagination
- Soft Delete Functionality
- Swagger API Documentation
- Environment-based Configuration

The backend is developed using FastAPI with SQLAlchemy ORM, while the frontend is developed using React.js and Tailwind CSS.

---

# Features

## Authentication Features

- Employee Registration
- Employee Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

---

## Employee Management Features

- Add Employee
- View Employee List
- Update Employee Details
- Soft Delete Employee

---

## Additional Features

- Search Employees
- Department Filtering
- Pagination
- Exception Handling
- Validation Handling
- Swagger Documentation
- Environment Variable Configuration

---

# Technology Stack

## Backend Technologies

| Technology | Purpose |
|---|---|
| FastAPI | Backend Framework |
| SQLAlchemy | ORM |
| MySQL | Database |
| PyMySQL | MySQL Driver |
| JWT | Authentication |
| Pydantic | Validation |
| Uvicorn | ASGI Server |
| Passlib | Password Hashing |
| bcrypt | Secure Hashing |

---

## Frontend Technologies

| Technology | Purpose |
|---|---|
| React.js | Frontend Framework |
| Axios | API Communication |
| Tailwind CSS | UI Styling |
| Vite | Frontend Build Tool |

---

# Project Structure

```txt
employee-management-system/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│
├── DB_FILE/
│   └── employee_management_db.sql
│
├── README.md
│
└── .gitignore
```

---

# Backend Architecture

The backend follows a modular and scalable architecture.

```txt
backend/
│
├── app/
│   ├── routers/
│   ├── services/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   ├── core/
│   └── utils/
│
├── requirements.txt
└── .env
```

---

# Architecture Benefits

- Clean Code Structure
- Reusable Business Logic
- Scalable Development
- Easier Maintenance
- Production-Level API Design

---

# Database Setup

## Database Used

- MySQL
- Laragon Local Server

---

# Step 1 - Start Laragon

Start:
- Apache
- MySQL

from Laragon dashboard.

---

# Step 2 - Open phpMyAdmin

Open:

```txt
http://localhost/phpmyadmin
```

---

# Step 3 - Create Database

Create database manually:

```sql
CREATE DATABASE employee_management_db;
```

---

# Step 4 - Import SQL File

Inside phpMyAdmin:

1. Open `employee_management_db`
2. Click `Import`
3. Select file:

```txt
DB_FILE/employee_management_db.sql
```

4. Click `Go`

This will automatically create required tables and sample data.

---

# Environment Variables

Create `.env` file inside backend folder.

```env
# Environment Variables

Create `.env` file inside backend folder.

```env
DATABASE_URL=mysql+pymysql://root:@127.0.0.1/employee_management_db

SECRET_KEY=your_secret_key_here

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# Backend Setup Instructions

## Step 1 - Navigate To Backend Folder

```bash
cd backend
```

---

## Step 2 - Create Virtual Environment

```bash
python -m venv venv
```

---

## Step 3 - Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

---

## Step 4 - Install Required Packages

```bash
pip install -r requirements.txt
```

---

## Step 5 - Run FastAPI Server

```bash
uvicorn app.main:app --reload
```

---

# Backend Running URL

```txt
http://127.0.0.1:8000
```

---

# Swagger Documentation URL

```txt
http://127.0.0.1:8000/docs
```

Swagger provides:
- API testing
- Request validation
- Response preview
- Authentication testing

---

# Frontend Setup Instructions

## Step 1 - Navigate To Frontend Folder

```bash
cd frontend
```

---

## Step 2 - Install Node Modules

```bash
npm install
```

---

## Step 3 - Run Frontend Application

```bash
npm run dev
```

---

# Frontend Running URL

```txt
http://localhost:5173
```

---

# Validation & Security

Implemented:

- Pydantic Validation
- Email Validation
- Password Validation
- Password Hashing
- JWT Authentication
- Protected APIs
- Token Expiration
- Exception Handling

---

# Soft Delete Strategy

Instead of permanently deleting employee records:

```python
is_deleted = True
```

is used.

---

# Benefits Of Soft Delete

- Recover Deleted Data
- Maintain Audit History
- Prevent Accidental Data Loss
- Production-Level Safe Deletion

---

# Production-Level Features Implemented

- Modular Architecture
- Service Layer Pattern
- Reusable Query Logic
- JWT Authentication
- Secure Password Hashing
- Protected APIs
- Search & Filtering
- Pagination
- Soft Delete Strategy
- Environment-based Configuration
- Structured API Responses
- Exception Handling
- Scalable Backend Design

---

# Challenges Faced

## bcrypt Compatibility Issue

### Problem

bcrypt latest version caused compatibility issue with passlib on Windows.

---

### Solution

```bash
pip uninstall bcrypt

pip install bcrypt==4.0.1
```

---

# Key Learnings

This project helped me understand:

- FastAPI Architecture
- REST API Development
- JWT Authentication Workflow
- Secure Login Systems
- SQLAlchemy ORM
- Service Layer Architecture
- Pagination & Filtering
- Protected Route Implementation
- Production-Level Backend Development
- Scalable Project Structure

---

# Future Improvements

- Role-Based Authentication
- Docker Deployment
- Unit Testing
- CI/CD Pipeline
- Email Verification
- Dashboard Analytics

---

# Author

## Dilip Waghmare

Full Stack Developer

### Technologies

- Python
- FastAPI
- Django
- React.js
- Laravel
- MySQL
- JavaScript

---

# License

This project is developed for technical assessment and learning purposes.