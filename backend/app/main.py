from fastapi import FastAPI

app = FastAPI(
    title="Employee Management API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Employee Management API is running successfully"
    }