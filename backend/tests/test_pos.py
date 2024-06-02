import pytest
from controller.user_auth import generate_token
import datetime

@pytest.mark.parametrize(
    "clerk_id, user_type, expected", 
    [
        (
            100001, 'restaurant_1', {
                "num_of_meals": 4,
                "testcase": [1, 0, 0, 1],
                "meals":[
                    { # common
                        "dish_id": 1,
                        "name": "Fried Chicken",
                        "description": "Delicious",
                        "combo": False,
                        "price": 200,
                        "rating": 0,
                        "order_times": 1,
                        "picture": "/static/dish/chicken.jpg",
                        "available": True
                    }, {}, {}, { # combo
                        "dish_id": 4,
                        "name": "Six Nuggets with Coke",
                        "description": "Delicious",
                        "combo": True,
                        "price": 150,
                        "rating": 0,
                        "order_times": 0,
                        "picture": "/static/dish/chicken.jpg",
                        "available": True
                    }
                ]
            }
        ), (
            100003, 'restaurant_2', {
                "number_of_meals": 3,
                "testcase": [0, 1, 0],
                "meals":[
                    {}, { # unavailable
                        "dish_id": 6,
                        "name": "Veggie",
                        "description": "Delicious",
                        "combo": False,
                        "price": 150,
                        "rating": 0,
                        "order_times": 0,
                        "picture": "/static/dish/chicken.jpg",
                        "available": False
                    }, {}
                ]
            }
        )
    ]
)
def test_POS_get_menu_success(client, clerk_id, user_type, expected):
    restaurant_token = generate_token(clerk_id, user_type)
    response = client.get('/pos/menu', headers={'Authorization': f'Bearer {restaurant_token}'})
    assert response.status_code == 200
    assert len(response.json['meals']) == expected['num_of_meals']
    for i in range(expected['num_of_meals']):
        meal = response.json['meals'][i]
        if not expected['testcase']:
            continue
        assert meal == expected['meals'][i]

@pytest.mark.parametrize("endpoint, method", \
    [('/pos/menu', 'get'),('/pos/get_order', 'get'), ('/pos/add_order', 'post'), ('/pos/worker_info/100006', 'get')])
def test_POS_with_invalid_token(client, endpoint, method):
    worker_token = generate_token(100005, 'worker')
    if method == 'get':
        response = client.get(endpoint, headers={'Authorization': f'Bearer {worker_token}'})
    else:
        response = client.post(endpoint, headers={'Authorization': f'Bearer {worker_token}'})
    assert response.status_code == 403
    assert response.json['message'] == 'Permission denied'

@pytest.mark.parametrize(
    "clerk_id, user_type, expected",
    [
        (
            100001, 'restaurant_1', {
                "order_id": 1,
                "customer_id": 100003,
                "custumer_name": 'whoami',
                "order_time": "",
                "finish": False,
                "order_dish":
                [
                    {
                        "dish_id": 1,
                        "number": 1,
                        "dish_name": "Fried Chicken",
                        "price": 200
                    }, {
                        "dish_id": 2,
                        "number": 2,
                        "dish_name": "Hamburger",
                        "price": 150,
                    }
                ]
            }
        )
    ]
)
def test_POS_get_order_format(client, clerk_id, user_type, expected):
    restaurant_token = generate_token(clerk_id, user_type)
    response = client.get('/pos/get_order', headers={'Authorization': f'Bearer {restaurant_token}'})
    assert response.status_code == 200
    assert "order" in response.json
    orders = response.json['order']
    for order in orders:
        assert order['order_id'] == expected['order_id']
        assert order['customer_id'] == expected['customer_id']
        assert order['customer_name'] == expected['customer_name']
        assert "order_time" in order
        assert order['finish'] == expected['finish']
        assert order["order_dish"] == expected["order_dish"]

@pytest.mark.parametrize('restaurant_id', [(1), (2), (3)])
def test_POS_get_only_todays_order(client, restaurant_id):
    restaurant_token = generate_token(100003, f'restaurant_{restaurant_id}')
    response = client.get('/pos/get_order', headers={'Authorization': f'Bearer {restaurant_token}'})
    assert response.status_code == 200
    assert "order" in response.json
    today = datetime.today()
    start = datetime(today.year, today.month, today.day, 0, 0, 0)
    end = datetime(today.year, today.month, today.day, 23, 59, 59)
    for order in response.json['order']:
        order_time = datetime.strptime(order['order_time'], "%Y-%m-%d %H:%M:%S")
        assert start <= order_time
        assert order_time <= end
    