from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from app.auth.auth_bearer import get_current_employee
from app.models.employee import Employee

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeLogin,
    TokenResponse
)

from app.services.employee_service import (
    register_employee_service,
    login_employee_service
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


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


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK
)
def login_employee(
    employee: EmployeeLogin,
    db: Session = Depends(get_db)
):

    return login_employee_service(
        employee.email,
        employee.password,
        db
    )

@router.get(
    "/me",
    response_model=EmployeeResponse
)
def get_logged_in_employee(
    current_employee: Employee = Depends(
        get_current_employee
    )
):

    return current_employee