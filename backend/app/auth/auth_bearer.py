from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt

from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import get_db
from app.models.employee import Employee


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/employees/login"
)


def get_current_employee(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token"
    )

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        email: str = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    employee = db.query(Employee).filter(
        Employee.email == email,
        Employee.is_deleted == False
    ).first()

    if employee is None:
        raise credentials_exception

    return employee