from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# Base Schema
class EmployeeBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None


# Create Employee Schema
class EmployeeCreate(EmployeeBase):
    password: str


# Update Employee Schema
class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None


# Response Schema
class EmployeeResponse(EmployeeBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True