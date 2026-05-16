from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from sqlalchemy import or_

from app.models.employee import Employee

from app.utils.security import (
    hash_password,
    verify_password
)

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate
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

def get_employees_service(
    db: Session,
    page: int,
    limit: int,
    search: str = None,
    department: str = None
):

    query = db.query(Employee).filter(
        Employee.is_deleted == False
    )

    # Search
    if search:

        query = query.filter(
            or_(
                Employee.full_name.ilike(f"%{search}%"),
                Employee.email.ilike(f"%{search}%")
            )
        )

    # Department Filter
    if department:

        query = query.filter(
            Employee.department == department
        )

    # Total Count
    total = query.count()

    # Pagination
    offset = (page - 1) * limit

    employees = query.offset(offset).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": employees
    }

def update_employee_service(
    employee_id: int,
    employee_data: EmployeeUpdate,
    db: Session
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id,
        Employee.is_deleted == False
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    update_data = employee_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)

    return employee

def delete_employee_service(
    employee_id: int,
    db: Session
):

    employee = db.query(Employee).filter(
        Employee.id == employee_id,
        Employee.is_deleted == False
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.is_deleted = True

    db.commit()

    return {
        "message": "Employee deleted successfully"
    }