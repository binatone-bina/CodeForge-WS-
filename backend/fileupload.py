import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import MongoClient
from datetime import datetime as time
import base64
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from model_test import check

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

uri = os.getenv("NIK_MOPNGO_URI")

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Error connecting to MongoDB:")
    print(e)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    db = client["deepfakedetection"]
    image_collection = db["userphotos"]
    contents = await file.read()
    encoded_string = base64.b64encode(contents).decode('utf-8')
    document = {"image_name": file.filename, "image_data": encoded_string,"time" : time.now()}
    image_collection.insert_one(document)
    return JSONResponse(content={"message": "File uploaded successfully."})

@app.get("/retrieve/{image_name}")
async def retrieve_file(image_name: str):
    db = client["deepfakedetection"]
    image_collection = db["userphotos"]
    document = image_collection.find_one({"image_name": image_name})
    if document:
        decoded_image = base64.b64decode(document["image_data"])
        with open("test.jpg", "wb") as output_file:
            output_file.write(decoded_image)
        
        prediction = check("test.jpg")
        return JSONResponse(content={"image_data": prediction}, status_code=200)
    else:
        return JSONResponse(content={"message": "Image not found."}, status_code=404)
