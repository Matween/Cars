from db import db
from datetime import datetime


class CarModel(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    driven_km = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    color = db.Column(db.String(30), nullable=False)
    crashed = db.Column(db.Boolean, nullable=True)
    description = db.Column(db.Text, nullable=False)
    car_picture = db.Column(db.Text, nullable=True)
    chassis = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def save(self):
        if self.id is None:
            db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __init__(self, brand, model, year, driven_km, price,
                 color , description, user_id, chassis,
                 car_picture=None, crashed=False):
        self.brand = brand
        self.model = model
        self.year = year
        self.driven_km = driven_km
        self.price = price
        self.color = color
        self.description = description
        self.car_picture = car_picture
        self.user_id = user_id
        self.crashed = crashed
        self.chassis = chassis

    def json(self):
        return {
            'car_id': self.id,
            'brand': self.brand,
            'model': self.model,
            'year': self.year,
            'driven_km': self.driven_km,
            'price': self.price,
            'color': self.color,
            'description': self.description,
            'car_picture': self.car_picture,
            'user_id': self.user_id,
            'chassis': self.chassis,
            'crashed': self.crashed
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()