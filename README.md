# CARS - a web app where you can sell your car
- Backend built with Python/Flask
- Frontend built with AngularJS 1.8

## Usage
### Backend
Make sure you uncomment these lines on first use to create the database or drop it and recreate it. You can also make a default admin, feel free to change the values to whatever you like.
```
@app.before_first_request
def create_tables():
    # db.drop_all()
    db.create_all()
    # UserModel.create_admin('Matic', 'Bozic', 'admin', 'matic@matic.com', 'admin')
```
After that you may run the app.
```
export FLASK_APP=run.py
flask run
```

### Frontend
```
npm install
gulp
```

You might also have to set api in AppConstants to wherever you are running the backend.
Usually the default is http://127.0.0.1:5000, otherwise replace it.

