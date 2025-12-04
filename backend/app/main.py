from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes import auth,drivers,cabs,rides,payments
from app.database import engine, Base
from app.models import user, ride, driver, cab, payment

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cab Booking API")

# -------------------------------
# CORS (Frontend Access Allowed)
# -------------------------------
# Allow all origins for development, or specify your Vercel URL
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://*.vercel.app",
    "*"  # Remove this in production and add your specific Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# ROUTERS
# -------------------------------
app.include_router(auth.router)
app.include_router(rides.router)
app.include_router(drivers.router)
app.include_router(cabs.router)
app.include_router(payments.router)


# -------------------------------
# HEALTH CHECK
# -------------------------------
@app.get("/")
def home():
    return {"message": "Cab Booking API is running 🚀"}
