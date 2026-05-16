from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import ConfigDict

from typing import List



class EmployeeBase(BaseModel):

    full_name: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="Employee full name"
    )

    email: EmailStr = Field(
        ...,
        description="Employee email address"
    )

    phone: Optional[str] = Field(
        default=None,
        min_length=10,
        max_length=15,
        description="Employee phone number"
    )

    department: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Employee department"
    )

    designation: Optional[str] = Field(
        default=None,
        max_length=100,
        description="Employee designation"
    )


class EmployeeCreate(EmployeeBase):

    password: str = Field(
        ...,
        min_length=6,
        max_length=100,
        description="Employee account password"
    )


class EmployeeUpdate(BaseModel):

    full_name: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=100
    )

    phone: Optional[str] = Field(
        default=None,
        min_length=10,
        max_length=15
    )

    department: Optional[str] = Field(
        default=None,
        max_length=100
    )

    designation: Optional[str] = Field(
        default=None,
        max_length=100
    )


class EmployeeResponse(EmployeeBase):

    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

# Login Schema
class EmployeeLogin(BaseModel):
    email: EmailStr
    password: str


# Token Response Schema
class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class EmployeeListResponse(BaseModel):

    total: int
    page: int
    limit: int

    data: List[EmployeeResponse]