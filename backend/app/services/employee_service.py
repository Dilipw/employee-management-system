from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate
from app.utils.security import (
    hash_password,
    verify_password
)
from app.auth.jwt_handler import create_access_token


def register_employee_service(
    employee: EmployeeCreate,
    db: Session
):

    existing_employee = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()

    if existing_employee:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

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


def login_employee_service(
    email: str,
    password: str,
    db: Session
):

    existing_employee = db.query(Employee).filter(
        Employee.email == email,
        Employee.is_deleted == False
    ).first()

    if not existing_employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if not verify_password(
        password,
        existing_employee.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={
            "sub": existing_employee.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }