from flask import Flask
from flask_restful import Api
from config import mysqlConfig
from app.resources.car import Car, CarList
from app.resources.user import User, UserList
from app.models.usermodel import UserModel
from db import db
from app.resources.userlogin import UserLogin
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = mysqlConfig
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'Desasde.Decexm,ps.09K975'
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api()
CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)

jwt = JWTManager(app)


@app.before_first_request
def create_tables():
    # db.drop_all()
    db.create_all()
    # UserModel.create_admin('Matic', 'Bozic', 'admin', 'matic@matic.com', 'admin')


api.add_resource(Car, '/car/<int:car_id>')
api.add_resource(CarList, '/cars')
api.add_resource(User, '/user/<string:username>')
api.add_resource(UserList, '/users')
api.add_resource(UserLogin, '/auth')
api.init_app(app)


if __name__ == '__main__':
    app.run(debug=True)
