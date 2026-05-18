# Employee Management System

A Full Stack Employee Management System developed using **FastAPI**, **React.js**, and **MySQL** with secure JWT authentication, employee CRUD operations, search & filtering, pagination, and soft delete functionality.

---

# Project Overview

This project is designed to manage employee records with secure authentication and scalable backend architecture.

The application provides:

- Employee Registration
- JWT Login Authentication
- Protected APIs
- Employee CRUD Operations
- Search & Filtering
- Pagination
- Soft Delete Functionality
- Swagger API Documentation
- Environment-based Configuration

The backend is developed using FastAPI with SQLAlchemy ORM, while the frontend is developed using React.js.

---

# Project Features

## Authentication Features

- Employee Registration
- Employee Login
- JWT Token Generation
- Protected Routes
- Token Expiration Handling
- Password Hashing using bcrypt

---

## Employee Management Features

- Create Employee
- Get Employee Details
- Update Employee
- Soft Delete Employee

---

## Advanced Features

- Employee Search
- Department Filtering
- Pagination
- Exception Handling
- Validation Handling
- Environment Variable Configuration
- Swagger API Documentation

---

# Technology Stack

# Backend Technologies

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

# Frontend Technologies

| Technology | Purpose |
|---|---|
| React.js | Frontend Framework |
| Axios | API Communication |
| Tailwind | UI Styling |

---

# Backend Architecture

The backend follows a modular and scalable architecture.

```txt
backend/
│
├── app/
│   ├── main.py
│   │
│   ├── routers/
│   │   └── employee.py
│   │
│   ├── services/
│   │   └── employee_service.py
│   │
│   ├── models/
│   │   └── employee.py
│   │
│   ├── schemas/
│   │   └── employee.py
│   │
│   ├── database/
│   │   └── database.py
│   │
│   ├── core/
│   │   └── security.py
│   │
│   └── utils/
│
├── requirements.txt
├── .env
└── venv/