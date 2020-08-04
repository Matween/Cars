from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from app.models.usermodel import UserModel
from app.helpers import encrypt


class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', type=str, required=True, location='json')
    parser.add_argument('last_name', type=str, required=True, location='json')
    parser.add_argument('email', type=str, required=True, location='json')
    parser.add_argument('username', type=str, required=True, location='json')
    parser.add_argument('password', type=str, required=True, location='json')
    parser.add_argument('profile_picture', type=str, required=False, location='json')

    def get(self, username):
        user = UserModel.find_by_username(username)
        if user:
            return user.json()
        return {'message': 'User not found'}, 404

    @jwt_required
    def delete(self, username):
        user = UserModel.find_by_username(username)
        if user:
            user.delete()
            return {'message': 'User has been deleted.'}

    @jwt_required
    def put(self, username):
        data = User.parser.parse_args()
        user = UserModel.find_by_username(username)

        if user is None:
            user = UserModel(
                data['first_name'], data['last_name'], data['username'],
                data['email'], data['password'],
                data['profile_picture'])
        else:
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.email = data['email']
            user.username = data['username']
            user.password = encrypt(data['password'])
            user.profile_picture = data['profile_picture']

        user.save()
        return user.json()


class UserList(Resource):

    def get(self):
        return {'users': [user.json() for user in UserModel.query.all()]}

    def post(self):
        data = User.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {'message': 'User with this email already exists.'}, 400

        user = UserModel(
            data['first_name'], data['last_name'], data['username'],
            data['email'], data['password'],
            data['profile_picture'])

        try:
            user.save()
        except():
            return {'message': 'An error occurred while saving the user.'}, 500
        return user.json()
