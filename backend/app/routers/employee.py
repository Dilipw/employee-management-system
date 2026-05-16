from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.employee import Employee
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse
)
from app.utils.security import hash_password

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

    # Check existing email
    existing_employee = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()

    if existing_employee:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create employee
    new_employee = Employee(
        full_name=employee.full_name,
        email=employee.email,
        phone=employee.phone,
        department=employee.department,
        designation=employee.designation,
        password=hash_password(employee.password)
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee