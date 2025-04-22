from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import uvicorn

app = FastAPI()

data_store = []

class SoilData(BaseModel):
    sensor_id: str
    timestamp: str
    temperature: float
    moisture: float
    N: float
    P: float
    K: float
    pressure: float

@app.post("/soil-data")
async def receive_data(data: SoilData):
    data_dict = data.dict()
    data_store.append(data_dict)
    
    df = pd.DataFrame(data_store)
    
    df.fillna(method='ffill', inplace=True)
    numeric_cols = ['temperature', 'moisture', 'N', 'P', 'K', 'pressure']
    scaler = MinMaxScaler()
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

    return {"status": "Data received and processed", "processed_data": df.tail(5).to_dict(orient="records")}

if __name__ == "__main__":
    uvicorn.run("soil_server:app", host="0.0.0.0", port=8000, reload=True)
