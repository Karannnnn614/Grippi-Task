from fastapi import FastAPI, HTTPException, Depends
from typing import List

app = FastAPI(
    title="Grippi Campaign Management API",
    description="",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Campaign API is running!", "status": "healthy"}

