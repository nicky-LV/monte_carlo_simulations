import redis
import pytest

@pytest.fixture
def r():
    return redis.Redis(host='redis', port=6379, db=0)

def test_redis_connection(r):
    # Ping the server. If no connection is made, an exception is raised.
    r.ping()

def test_persistence():
    r