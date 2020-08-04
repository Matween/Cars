class CarFormController {
    constructor(Car, User, $state) {
        'ngInject';
        this._car = Car;
        this._user = User;
        this._$state = $state;
    }

    submitCarForm() {
        this.isSubmitting = true;
        this.carData.user_id = this._user.current.user_id;
        this.carData.crashed = this.carData.crashed == null ? 0 : 1;
        this._car.save(this.carData).then(
            (car) => {
                console.log(car);
                this._$state.go('app.profile', { username: this._user.current.username })
            },
            (err) => {
                console.log(err);
                this.isSubmitting = false;
                this.errors = err.data.message;
            }
        )
    }

}

export default CarFormController;