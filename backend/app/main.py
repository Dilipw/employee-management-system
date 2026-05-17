from fastapi import FastAPI

from app.database import engine, Base

from app.models.employee import Employee

from app.routers.employee import router as employee_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Employee Management API",
    description="FastAPI based Employee Management System",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
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