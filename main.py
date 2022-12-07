from fastapi import FastAPI
from utils import *

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{ticker}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
