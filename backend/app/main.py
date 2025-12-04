from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth,drivers,cabs,rides,payments
from app.database import engine, Base
from app.models import user, ride, driver, cab, payment

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cab Booking API")

# -------------------------------
# CORS (Frontend Access Allowed)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL later
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
