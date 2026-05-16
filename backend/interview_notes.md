# Employee Management System - Development Notes

# Step 1 - Project Initialization

## Objective

Initialize the project with a clean, scalable, and production-ready architecture for backend and frontend development.

---

## What I Implemented

- Created separate backend and frontend project structure
- Configured Python virtual environment (`venv`)
- Initialized Git repository for version control
- Added `.gitignore` for unnecessary and sensitive files
- Created initial project documentation files:
  - `README.md`
  - `interview_notes.md`

---

## Project Structure

```txt
employee-management-system/
│
├── app/
│   ├── core/
│   │   └── config.py
│   │
│   ├── __init__.py
│   ├── database.py
│   └── main.py
│
├── frontend/
├── venv/
├── requirements.txt
├── README.md
├── interview_notes.md
└── .gitignore
```

---

## Why This Architecture

### Modular Structure
The project follows a modular architecture to improve:
- Scalability
- Maintainability
- Code organization
- Reusability

### Backend & Frontend Separation
Keeping backend and frontend isolated provides:
- Better project management
- Easier deployment
- Independent scalability
- Cleaner development workflow

### Virtual Environment
Used Python virtual environment to:
- Isolate dependencies
- Avoid global package conflicts
- Maintain project-specific packages

### Git Version Control
Git is used for:
- Code versioning
- Tracking changes
- Rollback support
- Team collaboration
- Clean deployment workflow

---

## Commands Used

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

### Initialize Git Repository

```bash
git init
```

---

## Best Practices Followed

- Modular project structure
- Environment isolation
- Git-based development workflow
- Sensitive file protection using `.gitignore`
- Clean documentation process

---

# Step 2 - FastAPI Application Setup

## Objective

Setup FastAPI application and verify API server initialization.

---

## What I Implemented

- Installed FastAPI and required backend dependencies
- Configured FastAPI application instance
- Created initial API route
- Verified successful API response
- Started development server using Uvicorn
- Added Python package initialization support

---

## Dependencies Installed

```bash
pip install fastapi uvicorn sqlalchemy pymysql python-jose passlib bcrypt python-multipart python-dotenv
```

---

## Export Requirements

```bash
pip freeze > requirements.txt
```

---

## FastAPI Entry Point

### File

```txt
app/main.py
```

### Code

```python
from fastapi import FastAPI

app = FastAPI(
    title="Employee Management API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Employee Management API is running successfully"
    }
```

---

## Running the Server

```bash
uvicorn app.main:app --reload
```

---

## Swagger API Documentation

FastAPI automatically generates interactive Swagger/OpenAPI documentation.

### Swagger URL

```txt
http://127.0.0.1:8000/docs
```

---

## API Response Structure

Implemented standard JSON response structure:

```json
{
  "success": true,
  "message": "Response message"
}
```

---

## Why Standardized API Responses

- Consistent frontend integration
- Cleaner API contracts
- Better exception handling
- Easier debugging
- Improved maintainability

---

## Why `__init__.py` Was Added

The `__init__.py` file helps Python recognize directories as packages and supports proper module imports in scalable applications.

---

## Learning Outcome

- Understood FastAPI application initialization
- Configured Uvicorn development server
- Learned FastAPI routing basics
- Verified API response testing
- Explored automatic Swagger documentation

---

# Step 3 - Database Configuration & SQLAlchemy Setup

## Objective

Configure MySQL database connectivity and setup production-ready SQLAlchemy ORM architecture.

---

## What I Implemented

- Created MySQL database using Laragon
- Configured environment variables using `.env`
- Setup SQLAlchemy engine
- Configured reusable database session management
- Created centralized configuration module
- Implemented database dependency injection
- Added production-level database connection handling

---

## Database Used

- MySQL (Laragon)
- SQLAlchemy ORM
- PyMySQL Driver

---

## Environment Configuration

### File

```txt
.env
```

### Configuration

```env
DATABASE_URL=mysql+pymysql://root:@127.0.0.1:3306/employee_management_db

SECRET_KEY=employee_management_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Why Environment Variables

Environment variables help:
- Secure sensitive credentials
- Avoid hardcoded secrets
- Improve deployment flexibility
- Support multiple environments
- Follow production-level practices

---

## Centralized Configuration

### File

```txt
app/core/config.py
```

### Code

```python
from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
    )

settings = Settings()
```

---

## Database Configuration

### File

```txt
app/database.py
```

### Code

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## Why `127.0.0.1` Instead of `localhost`

Using `127.0.0.1` provides:
- Better TCP-based connectivity
- More stable production behavior
- Avoids socket resolution issues

---

## Why `pool_pre_ping=True`

Used for production-level database stability.

Benefits:
- Detects stale DB connections
- Automatically validates connections
- Prevents MySQL timeout issues
- Improves reliability

---

## Why SQLAlchemy ORM

SQLAlchemy provides:
- Object-oriented database operations
- Better maintainability
- Cleaner query handling
- Reduced raw SQL dependency
- Easier scalability

---

## Learning Outcome

- Learned SQLAlchemy ORM setup
- Configured reusable DB session management
- Implemented centralized environment configuration
- Understood dependency injection architecture
- Explored production-level database handling

---

## Git Commit Commands

### Initial Setup Commit

```bash
git add .
git commit -m "Initial project setup with virtual environment and folder structure"
```

### FastAPI Setup Commit

```bash
git add .
git commit -m "Setup FastAPI application and verified API server"
```

### Database Configuration Commit

```bash
git add .
git commit -m "Implemented production-ready MySQL and SQLAlchemy configuration"
```
# Step 4 - Employee ORM Model Creation

## Objective

Create Employee database model using SQLAlchemy ORM with production-level structure and soft delete support.

---

## What I Implemented

- Created Employee ORM model
- Configured employees table
- Added primary key and unique constraints
- Implemented soft delete support
- Added automatic timestamp handling
- Enabled ORM-based table creation

---

## File Structure

```txt
app/
│
├── models/
│   ├── __init__.py
│   └── employee.py
```

---

## ORM Features Implemented

### Primary Key
Used auto-increment integer primary key for employee identification.

### Unique Email Constraint
Configured unique email validation at database level to prevent duplicate accounts.

### Soft Delete Support
Implemented:

```python
is_deleted = Column(Boolean, default=False)
```

Instead of permanently deleting records, the system marks records as deleted.

### Timestamp Management

Implemented:
- `created_at`
- `updated_at`

using:

```python
func.now()
```

for automatic timestamp handling.

---

## Why Soft Delete

Soft delete provides:
- Better data recovery
- Safer deletion operations
- Historical record maintenance
- Audit support

---

## Why SQLAlchemy ORM

SQLAlchemy ORM helps:
- Reduce raw SQL usage
- Improve maintainability
- Provide object-oriented DB interaction
- Improve scalability

---

## Learning Outcome

- Learned ORM model creation
- Understood DB constraints
- Implemented soft delete architecture
- Configured automatic timestamps
- Built production-ready table structure

---

## Git Commit Command

```bash
git add .
git commit -m "Created Employee ORM model with soft delete support"
```

# Step 5 - Pydantic Schemas & Request Validation

## Objective

Implement secure and structured request validation using Pydantic schemas for employee-related API operations.

---

## What I Implemented

- Created reusable Pydantic schemas
- Added request validation rules
- Configured secure response serialization
- Implemented email validation
- Added password validation constraints
- Prevented sensitive data exposure in API responses

---

## File Structure

```txt
app/
│
├── schemas/
│   ├── __init__.py
│   └── employee.py
```

---

## Schema Architecture

### EmployeeBase
Contains reusable common employee fields.

### EmployeeCreate
Used during employee registration.

### EmployeeUpdate
Handles employee update requests with optional fields.

### EmployeeResponse
Used for API responses while excluding sensitive information like passwords.

---

## Validation Rules Implemented

| Field | Validation |
|---|---|
| full_name | Minimum 3 characters |
| email | Valid email format |
| phone | Minimum 10 and maximum 15 characters |
| password | Minimum 6 characters |

---

## Validation Approach

Used Pydantic `Field()` validations for:
- input sanitization
- required field validation
- minimum and maximum length checks
- API documentation descriptions

Example:

```python
password: str = Field(
    ...,
    min_length=6,
    max_length=100
)
```

---

## Email Validation

Implemented:

```python
EmailStr
```

This automatically validates:
- valid email format
- malformed email inputs

---

## Response Security

Password field was intentionally excluded from the response schema.

### Reason
- Prevent sensitive data exposure
- Improve API security
- Follow production-level security standards

---

## Why Separate Schemas Were Used

Separate schemas improve:
- code maintainability
- API consistency
- request validation clarity
- response security
- scalability

---

## ORM Compatibility

Configured:

```python
model_config = ConfigDict(
    from_attributes=True
)
```

This enables automatic conversion from SQLAlchemy ORM objects to Pydantic response models.

---

## Why This Approach Is Production-Friendly

- Centralized validation logic
- Cleaner API contracts
- Reduced manual validation code
- Better frontend integration
- Improved API reliability
- Secure response handling

---

## Learning Outcome

- Learned Pydantic schema architecture
- Implemented request validation
- Applied secure response serialization
- Improved API input validation
- Structured reusable validation logic

---

## Git Commit Command

```bash
git add .
git commit -m "Implemented secure Pydantic schemas and request validation"
```