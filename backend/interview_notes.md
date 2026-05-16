# Employee Management System - Interview Notes

# Step 1 - Project Setup

## What I Did

- Created project folder structure
- Created backend and frontend folders
- Setup Python virtual environment
- Configured Git and .gitignore

---

## Commands Used

### Create Project Folder

```bash
mkdir employee-management-system
cd employee-management-system
```

### Create Backend Folder

```bash
mkdir backend
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

### Initialize Git

```bash
git init
```

---

## Why I Used Virtual Environment

Virtual environment helps:
- isolate dependencies
- avoid package conflicts
- maintain project-specific packages

---

## Important Learning

- scalable project structure
- environment management
- clean backend setup

---

# Step 2 - FastAPI Setup

## What I Did

- Installed FastAPI and backend dependencies
- Configured FastAPI app
- Started Uvicorn server
- Verified Swagger documentation

---

## Packages Installed

```bash
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install pymysql
pip install python-dotenv
pip install python-jose
pip install passlib
pip install bcrypt==4.0.1
pip install python-multipart
pip install email-validator
```

---

## Why These Packages

| Package | Purpose |
|---|---|
| fastapi | API framework |
| uvicorn | ASGI server |
| sqlalchemy | ORM |
| pymysql | MySQL connection |
| python-dotenv | Environment variables |
| python-jose | JWT authentication |
| passlib | Password hashing |
| bcrypt | Secure hashing algorithm |
| python-multipart | Form data handling |
| email-validator | Email validation |

---

## Export Requirements

```bash
pip freeze > requirements.txt
```

---

## Run Server

```bash
uvicorn app.main:app --reload
```

---

## Swagger URL

```txt
http://127.0.0.1:8000/docs
```

---

## Important Learning

- FastAPI setup
- Swagger testing
- API routing
- backend server execution

---

# Step 3 - Database Configuration

## What I Did

- Connected MySQL using Laragon
- Configured SQLAlchemy ORM
- Created reusable DB session
- Added environment variables

---

## Database Used

- MySQL (Laragon)
- SQLAlchemy ORM
- PyMySQL Driver

---

## Create Database

```sql
CREATE DATABASE employee_management_db;
```

---

## Environment Configuration

### .env

```env
DATABASE_URL=mysql+pymysql://root:@127.0.0.1:3306/employee_management_db

SECRET_KEY=employee_management_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Why I Used .env

Benefits:
- secure credentials
- no hardcoding
- production-friendly

---

## Important Learning

- DB connection setup
- ORM configuration
- environment management

---

# Step 4 - Employee ORM Model

## What I Did

Created Employee model with:
- id
- full_name
- email
- password
- timestamps
- soft delete support

---

## Why Soft Delete

Instead of deleting permanently:

```python
is_deleted = True
```

Benefits:
- recover deleted data
- audit/history support
- safer operations

---

## Important Learning

- ORM models
- DB constraints
- timestamps
- soft delete handling

---

# Step 5 - Pydantic Validation

## What I Did

- Created request schemas
- Created response schemas
- Added validation rules
- Secured API responses

---

## Validation Examples

```python
EmailStr
```

```python
Field(min_length=6)
```

---

## Validation Added

| Field | Validation |
|---|---|
| full_name | minimum 3 chars |
| email | valid email |
| password | minimum 6 chars |

---

## Why Separate Schemas

Schemas help:
- validate requests
- structure responses
- secure sensitive data

---

## Security Improvement

Password field excluded from response schema.

---

## Important Learning

- request validation
- response serialization
- schema architecture

---

# Step 6 - Employee Registration API

## What I Did

Implemented:
- employee registration API
- password hashing
- duplicate email checking
- exception handling
- service layer architecture

---

## API Endpoint

```http
POST /employees/register
```

---

## Password Security

Used:
- passlib
- bcrypt

Passwords stored in hashed format.

---

## Password Hashing Flow

```txt
Plain Password
    ↓
Hash Password
    ↓
Store Hashed Password
```

---

## Why Hash Password

Improves security by protecting user credentials.

---

## Validation Used

### Pydantic Validation
- email validation
- password validation
- required fields

### Business Validation
- duplicate email checking

---

## Architecture Used

| Layer | Responsibility |
|---|---|
| Router | API handling |
| Service | Business logic |
| Schema | Validation |
| Model | Database |
| Utils | Helper functions |

---

## Why Service Layer

Benefits:
- clean routes
- reusable logic
- easier maintenance
- scalable architecture

---

## Exception Handling

Used:

```python
HTTPException
```

---

## Error Faced

### bcrypt Compatibility Issue

Error occurred due to:
- bcrypt latest version
- passlib compatibility issue on Windows

---

## Solution

```bash
pip uninstall bcrypt
pip install bcrypt==4.0.1
```

---

## Important Learning

- API architecture
- password hashing
- service layer pattern
- validation handling
- exception handling
- ORM insertion flow

---

# Overall Learning

This project helped me understand:
- FastAPI backend architecture
- REST API development
- authentication flow
- ORM database interaction
- scalable backend structure
- production-level coding practices