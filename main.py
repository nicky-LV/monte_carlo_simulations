from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from utils import *
from db import *

app = FastAPI()
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/monte-carlo-data/{symbol}/{num_iterations}")
async def get_mc_data(symbol: str, num_iterations: int):
    try:
        close_series: pd.Series = retrieve_historical_data(symbol.upper()).close
        time_idx = close_series.index

        # historical volatility
        delta = historical_volatility(close_series)

        # todo: daily rate of return
        mu = 0.078 / 252

        mc_data = []
        for _ in range(num_iterations):
            simulated_prices = [close_series[0]]

            for i in range(0, close_series.shape[0] - 1):
                prev_price = simulated_prices[i]
                simulated_prices.append(round(prev_price + gbm(prev_price, delta, mu, 1), 2))

            mc_data.append({
                'name': f'{_ + 1}',
                'data': simulated_prices
            })

        return {
            'data': close_series,
            'simulations': mc_data
        }

    except ValueError:
        return Response(status_code=404, content="Invalid symbol.")
