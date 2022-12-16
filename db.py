import redis
import json
import pandas as pd
from utils import *


def persist_historical_data(key: str, data: pd.DataFrame):
    r = redis.Redis(host='redis', port=6379, db=0)

    # Ping server to check connection
    r.ping()

    r.set(key, data.to_json())


def retrieve_historical_data(key):
    r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)

    # Ping server to check connection
    r.ping()

    return pd.read_json(r.get(key))
