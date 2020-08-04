from flask_restful import Resource, reqparse
from app.models.carmodel import CarModel
from flask_jwt_extended import jwt_required
from app.models.usermodel import UserModel


class Car(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('model', type=str, required=True, location='json')
    parser.add_argument('brand', type=str, required=True, location='json')
    parser.add_argument('chassis', type=str, required=True, location='json')
    parser.add_argument('year', type=int, required=True, location='json')
    parser.add_argument('driven_km', type=int, required=True, location='json')
    parser.add_argument('crashed', type=bool, required=True, location='json')
    parser.add_argument('description', type=str, required=True, location='json')
    parser.add_argument('color', type=str, required=True, location='json')
    parser.add_argument('price', type=float, required=True, location='json')
    parser.add_argument('user_id', type=int, required=True, location='json')
    parser.add_argument('car_picture', type=str, required=False, location='json')

    def get(self, car_id):
        car = CarModel.find_by_id(car_id)
        if car:
            user = UserModel.find_by_id(car.user_id)
            return {'car': car.json(), 'owner': user.json()}
        return {'message': 'Car not found'}, 404

    @jwt_required
    def delete(self, car_id):
        car = CarModel.find_by_id(car_id)
        if car:
            car.delete()
            return {'message': 'Car has been deleted.'}

    @jwt_required
    def put(self, car_id):
        data = Car.parser.parse_args()
        car = CarModel.find_by_id(car_id)

        if car is None:
            car = CarModel(
                data['brand'], data['model'],
                data['year'], data['driven_km'],
                data['price'], data['color'], data['description'],
                data['user_id'], data['chassis'],
                data['car_picture'], data['crashed'])
        else:
            car.brand = data['brand']
            car.model = data['model']
            car.year = data['year']
            car.driven_km = data['driven_km']
            car.price = data['price']
            car.color = data['color']
            car.crashed = data['crashed']
            car.description = data['description']
            car.chassis_id = data['chassis_id']
            car.user_id = data['user_id']
            car.car_picture = data['car_picture']

        car.save()


class CarList(Resource):
    def get(self):
        return {'cars': [car.json() for car in CarModel.query.all()]}

    @jwt_required
    def post(self):
        data = Car.parser.parse_args()
        car = CarModel(
            data['brand'], data['model'],
            data['year'], data['driven_km'],
            data['price'], data['color'], data['description'],
            data['user_id'], data['chassis'],
            data['car_picture'], data['crashed'])

        try:
            car.save()
        except():
            return {'message': 'An error occurred while saving the car.'}, 500
        return car.json()