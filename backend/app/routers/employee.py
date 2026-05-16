from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

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