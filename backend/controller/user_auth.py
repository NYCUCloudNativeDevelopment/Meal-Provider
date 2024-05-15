from flask_jwt_extended import get_jwt

def check_permission(target_permission):
    jwt = get_jwt()
    user_type = jwt['position']
    print(user_type)
    if user_type.find('restaurant') != -1:
        user_type = 'restaurant'
    if user_type == 'admin':
        return True
    if user_type == 'restaurant':
        if target_permission != 'admin':
            return True
        return False
    if user_type == 'worker':
        if target_permission == 'worker':
            return True
        return False

def get_restaurant_id():
    jwt = get_jwt()
    if jwt['position'].find('restaurant') == -1:
        return None
    return jwt['position'].split('_')[1]