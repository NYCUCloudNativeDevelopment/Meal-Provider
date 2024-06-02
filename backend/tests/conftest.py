import pytest
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import create_app

@pytest.fixture()
def app():
    print('Creating app')
    app = create_app()
    app.testing = True
    with app.app_context():
        yield app


@pytest.fixture()
def client(app):
    return app.test_client()