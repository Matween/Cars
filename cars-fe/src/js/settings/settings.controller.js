class SettingsController {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.formData = {
      email: User.current.email,
      first_name: User.current.first_name,
      last_name: User.current.last_name,
      profile_picture: User.current.profile_picture,
      username: User.current.username,
    }    

    this.logout = User.logout.bind(User);

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.update(this.formData).then(
      (user) => {
        this._$state.go('app.profile', {username: user.username})
      },
    )
  }

}

export default SettingsController;
