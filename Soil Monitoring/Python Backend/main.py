from fastapi import FastAPI, Request, HTTPException, Depends, Query
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from datetime import datetime
from typing import List, Optional
from sklearn.preprocessing import MinMaxScaler
import logging
import pandas as pd

app = FastAPI(title="Soil Health Monitoring API")

DATABASE_URL = "sqlite:///./soil_data.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Sensor(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String, unique=True, index=True)
    location = Column(String)
    secret_key = Column(String)
    data = relationship("SoilEntry", back_populates="sensor")

class SoilEntry(Base):
    __tablename__ = "soil_data"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    temperature = Column(Float)
    moisture = Column(Float)
    N = Column(Float)
    P = Column(Float)
    K = Column(Float)
    pressure = Column(Float)
    sensor_id = Column(Integer, ForeignKey("sensors.id"))
    sensor = relationship("Sensor", back_populates="data")

Base.metadata.create_all(bind=engine)

class SensorRegister(BaseModel):
    sensor_id: str
    location: str
    secret_key: str

class SoilDataIn(BaseModel):
    sensor_id: str
    secret_key: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    temperature: float
    moisture: float
    N: float
    P: float
    K: float
    pressure: float

class SoilDataOut(BaseModel):
    timestamp: datetime
    temperature: float
    moisture: float
    N: float
    P: float
    K: float
    pressure: float

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def authenticate_sensor(db: Session, sensor_id: str, secret_key: str):
    sensor = db.query(Sensor).filter_by(sensor_id=sensor_id, secret_key=secret_key).first()
    if not sensor:
        raise HTTPException(status_code=401, detail="Invalid sensor credentials")
    return sensor

def detect_anomalies(data: SoilDataIn) -> List[str]:
    issues = []
    if not (0 <= data.moisture <= 100): issues.append("Moisture out of range")
    if not (0 <= data.temperature <= 60): issues.append("Temperature abnormal")
    if data.N > 500 or data.P > 300 or data.K > 400: issues.append("Excessive nutrient level")
    return issues

@app.post("/register-sensor")
def register_sensor(sensor: SensorRegister, db: Session = Depends(get_db)):
    if db.query(Sensor).filter_by(sensor_id=sensor.sensor_id).first():
        raise HTTPException(status_code=400, detail="Sensor ID already registered")
    new_sensor = Sensor(**sensor.dict())
    db.add(new_sensor)
    db.commit()
    return {"message": "Sensor registered successfully"}

@app.post("/submit-soil-data")
def submit_data(data: SoilDataIn, db: Session = Depends(get_db)):
    sensor = authenticate_sensor(db, data.sensor_id, data.secret_key)
    anomalies = detect_anomalies(data)

    entry = SoilEntry(
        timestamp=data.timestamp,
        temperature=data.temperature,
        moisture=data.moisture,
        N=data.N,
        P=data.P,
        K=data.K,
        pressure=data.pressure,
        sensor=sensor
    )
    db.add(entry)
    db.commit()
    logger.info(f"Data received from {sensor.sensor_id}")
    return {
        "message": "Data submitted successfully",
        "anomalies": anomalies or "None"
    }

@app.get("/sensor-data", response_model=List[SoilDataOut])
def get_sensor_data(
    sensor_id: str,
    secret_key: str,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    sensor = authenticate_sensor(db, sensor_id, secret_key)
    entries = db.query(SoilEntry).filter_by(sensor=sensor).order_by(SoilEntry.timestamp.desc()).offset(skip).limit(limit).all()
    return entries

@app.get("/sensor-analytics")
def sensor_stats(sensor_id: str, secret_key: str, db: Session = Depends(get_db)):
    sensor = authenticate_sensor(db, sensor_id, secret_key)
    entries = db.query(SoilEntry).filter_by(sensor=sensor).all()
    if not entries:
        raise HTTPException(status_code=404, detail="No data found for sensor")
    
    df = pd.DataFrame([{
        "temperature": e.temperature,
        "moisture": e.moisture,
        "N": e.N,
        "P": e.P,
        "K": e.K,
        "pressure": e.pressure,
    } for e in entries])

    scaler = MinMaxScaler()
    df_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)

    return {
        "mean": df_scaled.mean().to_dict(),
        "max": df_scaled.max().to_dict(),
        "min": df_scaled.min().to_dict(),
        "count": len(df)
    }

@app.get("/")
def root():
    return {"message": "Welcome to the Soil Health Monitoring API"}


    