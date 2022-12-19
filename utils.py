import requests
import pandas as pd
import numpy as np
import secrets


def historical_data(symbol: str, timescale='1y') -> pd.DataFrame:
    url = f"https://cloud.iexapis.com/stable/stock/{symbol}/chart/{timescale}?token={secrets.iex_public_key}"
    data = [[i['date'], i['open'], i['high'], i['low'], i['close'], i['volume']] for i in requests.get(url).json()]
    df = pd.DataFrame(data, columns=['date', 'open', 'high', 'low', 'close', 'volume'])
    df.set_index('date', inplace=True)
    return df


def gbm(s: float, delta: float, mu: float, dt: float = 1):
    """
    Geometric brownian motion model
    :param s: float - Price
    :param delta: float - Historical (or implied) volatility
    :param mu: float - Historical rate of return
    :param dt: float - Time step
    :return: float - Simulated change in price
    """

    return dt * ((mu * s) + (delta * s * np.random.normal(0, np.sqrt(dt))))


def historical_volatility(pricedata: pd.Series, window: int = 20) -> float:
    """
    Calculate the historical volatility of a stock
    :param pricedata: pd.DataFrame - Historical price data
    :param window: int - lookback window
    :return: float - Historical volatility
    """
    return np.log(pricedata / pricedata.shift(1)).rolling(window).std().iloc[-1]