from fastapi import FastAPI

from app.database import engine, Base

from app.models.employee import Employee

from app.routers.employee import router as employee_router


app = FastAPI(
    title="Employee Management API",
    description="FastAPI based Employee Management System",
    version="1.0.0"
)


# Create Database Tables
Base.metadata.create_all(bind=engine)


# Register Routers
app.include_router(employee_router)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "Employee Management API is running successfully"
    }