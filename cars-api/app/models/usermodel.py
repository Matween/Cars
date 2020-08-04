from db import db
from app.helpers import encrypt


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    username = db.Column(db.String(90), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    profile_picture = db.Column(db.Text, nullable=True)

    def save(self):
        if self.id is None:
            db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __init__(self, first_name, last_name, username, email, password, profile_pciture, is_admin=False):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = encrypt(password)
        self.profile_picture = profile_pciture
        self.is_admin = is_admin

    def json(self):
        return {
            'user_id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'username': self.username,
            'profile_picture': self.profile_picture,
            'is_admin': self.is_admin
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def create_admin(cls, first_name, last_name, username, email, password):
        admin = UserModel(first_name, last_name, username, email, password, '', True)
        admin.save()
