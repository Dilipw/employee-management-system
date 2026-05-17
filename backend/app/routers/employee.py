from typing import Optional

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordRequestForm

from app.database import get_db

from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    TokenResponse,
    EmployeeUpdate,
    EmployeeListResponse,
    ChangePasswordSchema
)

from app.services.employee_service import (
    register_employee_service,
    login_employee_service,
    get_employees_service,
    update_employee_service,
    delete_employee_service,
    change_password_service
)

from app.auth.auth_bearer import (
    get_current_employee
)


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# ======================================================
# Register Employee
# ======================================================
@router.post(
    "/register",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def register_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):

    return register_employee_service(
        employee,
        db
    )


# ======================================================
# Login Employee
# ======================================================
@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK
)
def login_employee(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    return login_employee_service(
        form_data.username,
        form_data.password,
        db
    )


# ======================================================
# Get Logged-in Employee
# ======================================================
@router.get(
    "/me",
    response_model=EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def get_logged_in_employee(
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return current_employee


# ======================================================
# Update Logged-in Employee Profile
# IMPORTANT:
# Static route must come before /{employee_id}
# ======================================================
@router.put(
    "/me",
    response_model=EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def update_my_profile(
    employee: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return update_employee_service(
        current_employee.id,
        employee,
        db
    )


# ======================================================
# Change Password
# ======================================================
@router.put(
    "/change-password",
    status_code=status.HTTP_200_OK
)
def change_password(
    password_data: ChangePasswordSchema,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return change_password_service(
        current_employee,
        password_data,
        db
    )


# ======================================================
# Get All Employees
# ======================================================
@router.get(
    "",
    response_model=EmployeeListResponse,
    status_code=status.HTTP_200_OK
)
def get_employees(
    page: int = 1,
    limit: int = 5,
    search: Optional[str] = None,
    department: Optional[str] = None,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return get_employees_service(
        db=db,
        page=page,
        limit=limit,
        search=search,
        department=department
    )


# ======================================================
# Update Employee By ID
# ======================================================
@router.put(
    "/{employee_id}",
    response_model=EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def update_employee(
    employee_id: int,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return update_employee_service(
        employee_id,
        employee,
        db
    )


# ======================================================
# Soft Delete Employee
# ======================================================
@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_200_OK
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return delete_employee_service(
        employee_id,
        db
    )