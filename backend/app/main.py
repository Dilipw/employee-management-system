from fastapi import FastAPI

from app.database import Base, engine
from app.models.employee import Employee

app = FastAPI(
    title="Employee Management API",
    description="FastAPI based Employee Management System",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Employee Management API is running successfully"
    }