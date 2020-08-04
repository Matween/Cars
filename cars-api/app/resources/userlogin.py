from flask_restful import Resource, reqparse
from security import authenticate
from flask_jwt_extended import create_access_token


class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',  type=str, required=True, location='json')
    parser.add_argument('password',  type=str, required=True, location='json')

    def post(self):
        data = UserLogin.parser.parse_args()

        if not data['username']:
            return {'message': 'Missing username'}
        if not data['password']:
            return {'message': 'Missing password'}

        user = authenticate(data['username'], data['password'])
        if user is None:
            return {'message': 'Invalid credentials'}

        access_token = create_access_token(identity=user.username)
        return {'access_token': access_token, "user": user.json()}

