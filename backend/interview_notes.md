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


# Step 7 - JWT Login Authentication

## What I Did

Implemented:
- employee login API
- password verification
- JWT token generation
- secure authentication flow
- token expiration handling

---

# API Endpoint

```http
POST /employees/login
```

---

# Packages Used

```bash
pip install python-jose
pip install passlib
pip install bcrypt==4.0.1
```

---

# Why These Packages

| Package | Purpose |
|---|---|
| python-jose | JWT token generation |
| passlib | password verification |
| bcrypt | secure password hashing |

---

# JWT Authentication Flow

```txt
User Login Request
        ↓
Verify Email
        ↓
Verify Password
        ↓
Generate JWT Token
        ↓
Return Access Token
```

---

# Login Request Example

```json
{
  "email": "dilip@example.com",
  "password": "password123"
}
```

---

# Success Response Example

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

---

# Why JWT Authentication Used

JWT helps:
- secure API access
- stateless authentication
- scalable authentication system
- frontend token-based authentication

---

# Password Verification

Used:
- passlib
- bcrypt

Passwords are verified against hashed passwords stored in database.

---

# JWT Token Generation

Used:

```python
jwt.encode()
```

Token contains:
- user identity
- expiration time
- signed payload

---

# Why `sub` Used In JWT

Used:

```python
"sub"
```

means:
```txt
subject
```

JWT standard field for storing authenticated user identity.

---

# Token Expiration

Configured using:

```env
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

This improves API security.

---

# Security Improvements

Implemented:
- password hashing
- JWT token authentication
- token expiration
- secure secret key usage
- invalid credential handling

---

# Exception Handling

| Status Code | Purpose |
|---|---|
| 401 | Invalid password |
| 404 | Employee not found |
| 200 | Successful login |

---

# Swagger Testing

## URL

```txt
http://127.0.0.1:8000/docs
```

---

# Login Testing Flow

## 1 Register Employee

```txt
POST /employees/register
```

---

## 2 Login Employee

```txt
POST /employees/login
```

---

## 3 Copy JWT Token

Used later for protected routes.

---

# Important Learning

This step helped me understand:
- JWT authentication workflow
- token generation
- secure login architecture
- password verification
- stateless authentication
- API security implementation

---

# Overall Learning From This Step

This step helped build a secure authentication system similar to real-world backend applications using JWT-based authorization.

# Step 8 - Get Employees API with Search, Filter & Pagination

## What I Did

Implemented a protected employee listing API with:
- pagination
- search functionality
- department filtering
- JWT authentication
- reusable service layer logic

---

# API Endpoint

```http
GET /employees
```

---

# Features Implemented

| Feature | Description |
|---|---|
| Pagination | Load employees page by page |
| Search | Search by employee name/email |
| Filter | Filter employees by department |
| Protected Route | Only authenticated users can access |
| Soft Delete Handling | Excludes deleted employees |

---

# Query Parameters Used

| Parameter | Purpose |
|---|---|
| page | Current page number |
| limit | Records per page |
| search | Search employee name/email |
| department | Filter by department |

---

# Example API Requests

## Pagination

```txt
GET /employees?page=1&limit=5
```

---

## Search Employees

```txt
GET /employees?search=dilip
```

---

## Department Filter

```txt
GET /employees?department=IT
```

---

## Combined Example

```txt
GET /employees?page=1&limit=5&search=dilip&department=IT
```

---

# Step 1 - Created List Response Schema

## File

```txt
app/schemas/employee.py
```

---

## Added Schema

```python
from typing import List

class EmployeeListResponse(BaseModel):

    total: int
    page: int
    limit: int

    data: List[EmployeeResponse]
```

---

# Why Separate List Response Schema

This helps frontend applications receive:
- total records
- pagination details
- employee data

in a clean structured format.

---

# Step 2 - Implemented Service Layer Logic

## File

```txt
app/services/employee_service.py
```

---

## Added Logic For

- search query handling
- filter handling
- pagination calculation
- reusable query building

---

# Search Logic

Used:

```python
ilike()
```

for case-insensitive search.

Example:
```txt
Dilip
dilip
DILIP
```

all work correctly.

---

# Why Query Builder Approach Used

Benefits:
- scalable filtering
- reusable logic
- cleaner code
- easier maintenance

---

# Pagination Logic

Used:

```python
offset = (page - 1) * limit
```

This helps fetch records page by page.

---

# Why Pagination Important

Pagination helps:
- improve performance
- reduce large response size
- improve frontend loading
- support scalable APIs

---

# Step 3 - Protected Route Implementation

Used:

```python
get_current_employee
```

to secure API access.

Only authenticated users can access employee listing.

---

# Authentication Flow

```txt
Login
   ↓
JWT Token Generated
   ↓
Bearer Token Sent
   ↓
Protected API Access
```

---

# Step 4 - Swagger Testing

## Swagger URL

```txt
http://127.0.0.1:8000/docs
```

---

# Testing Flow

## 1 Login

```txt
POST /employees/login
```

---

## 2 Copy JWT Token

---

## 3 Click Authorize

Swagger authorize button.

---

## 4 Add Token

```txt
Bearer YOUR_TOKEN
```

---

## 5 Test API

```txt
GET /employees
```

---

# Example Success Response

```json
{
  "total": 10,
  "page": 1,
  "limit": 5,
  "data": [
    {
      "id": 1,
      "full_name": "Dilip Waghmare",
      "email": "dilip@example.com",
      "department": "IT"
    }
  ]
}
```

---

# Production-Level Improvements Implemented

- service layer architecture
- reusable filtering logic
- protected APIs
- pagination support
- dynamic search
- structured API response
- soft delete filtering

---

# Soft Delete Handling

Excluded deleted employees using:

```python
Employee.is_deleted == False
```

This prevents soft deleted records from appearing in API results.

---

# Exception Handling

Used FastAPI built-in:
```python
HTTPException
```

for secure API handling.

---

# Important Learning

This step helped me understand:
- pagination logic
- dynamic query filtering
- protected API implementation
- scalable list APIs
- query optimization basics
- service layer architecture
- reusable backend design

---

# Overall Learning From This Step

This step helped build a production-level employee listing API similar to real-world enterprise backend systems with:
- authentication
- filtering
- search
- pagination
- scalable architecture

# Step 9 - Update Employee API

## What I Did

Implemented:
- employee update API
- partial update support
- protected route
- employee existence validation
- reusable update service

---

# API Endpoint

```http
PUT /employees/{employee_id}
```

---

# Why Update API Important

This completes:
```txt
CRUD -> UPDATE operation
```

---

# Features Implemented

| Feature | Description |
|---|---|
| Partial Update | Update only required fields |
| Protected Route | JWT authentication required |
| Validation | Request validation using Pydantic |
| Soft Delete Check | Deleted employees cannot be updated |

---

# Update Schema Used

## File

```txt
app/schemas/employee.py
```

---

## Why Optional Fields Used

Update APIs usually support:
- partial updates
- flexible field modification

Example:
only designation can be updated.

---

# Service Layer Logic

## File

```txt
app/services/employee_service.py
```

---

# Dynamic Update Logic

Used:

```python
setattr()
```

for dynamic field updates.

Benefits:
- cleaner code
- scalable update handling
- avoids repetitive assignments

---

# Why `exclude_unset=True` Used

Used:

```python
exclude_unset=True
```

to update only provided fields.

Without this:
missing fields may become NULL.

---

# Example Update Request

```json
{
  "designation": "Senior Software Developer",
  "department": "Engineering"
}
```

---

# Example Success Response

```json
{
  "id": 1,
  "full_name": "Dilip Waghmare",
  "department": "Engineering",
  "designation": "Senior Software Developer"
}
```

---

# Authentication Used

Protected using:
```python
get_current_employee
```

Only authenticated users can update employee records.

---

# Exception Handling

| Status Code | Purpose |
|---|---|
| 404 | Employee not found |
| 401 | Unauthorized |
| 200 | Update successful |

---

# Production-Level Improvements

- partial update support
- dynamic field handling
- reusable service layer
- protected API
- validation handling

---

# Important Learning

This step helped me understand:
- update API architecture
- partial update handling
- dynamic ORM updates
- scalable update patterns
- protected update APIs

---

# Overall Learning From This Step

This step helped implement a production-level employee update system with reusable and scalable backend architecture.

# Step 10 - Soft Delete Employee API

## What I Did

Implemented:
- employee delete API
- soft delete architecture
- protected delete route
- safe deletion handling

---

# API Endpoint

```http
DELETE /employees/{employee_id}
```

---

# Why Soft Delete Used

Instead of permanently deleting records:

```python
is_deleted = True
```

was used.

---

# Benefits Of Soft Delete

- recover deleted data
- maintain audit/history
- safer than hard delete
- prevents accidental data loss

---

# Service Layer Logic

## File

```txt
app/services/employee_service.py
```

---

# Soft Delete Flow

```txt
Delete Request
      ↓
Find Employee
      ↓
Set is_deleted = True
      ↓
Commit Changes
```

---

# Why Hard Delete Avoided

Hard delete permanently removes data from database.

Soft delete is safer and commonly used in production systems.

---

# Protected Route

Protected using:
```python
get_current_employee
```

Only authenticated users can delete employees.

---

# Example Success Response

```json
{
  "message": "Employee deleted successfully"
}
```

---

# Soft Delete Filtering

All employee listing APIs automatically exclude deleted employees using:

```python
Employee.is_deleted == False
```

---

# Exception Handling

| Status Code | Purpose |
|---|---|
| 404 | Employee not found |
| 401 | Unauthorized |
| 200 | Delete successful |

---

# Production-Level Improvements

- safe deletion strategy
- protected delete APIs
- reusable service layer
- soft delete filtering
- scalable delete architecture

---

# Important Learning

This step helped me understand:
- soft delete architecture
- safe deletion patterns
- scalable delete strategies
- protected delete APIs

---

# Overall Learning From This Step

This step helped implement a safe and production-level deletion strategy commonly used in enterprise backend systems.

# Final Project Features

## Backend Features Implemented

- Employee Registration
- JWT Login Authentication
- Protected Routes
- Get Logged-in Employee
- Employee Listing API
- Search & Filtering
- Pagination
- Update Employee
- Soft Delete Employee
- Swagger Documentation
- Environment Variables
- SQLAlchemy ORM
- Exception Handling
- Service Layer Architecture

---

# Technologies Used

| Technology | Purpose |
|---|---|
| FastAPI | Backend Framework |
| MySQL | Database |
| SQLAlchemy | ORM |
| JWT | Authentication |
| Pydantic | Validation |
| Swagger | API Testing |
| Uvicorn | ASGI Server |

---

# Overall Learning From Project

This project helped me understand:
- FastAPI architecture
- JWT authentication
- scalable backend structure
- ORM database interaction
- protected API development
- pagination & filtering
- service layer architecture
- production-level API development