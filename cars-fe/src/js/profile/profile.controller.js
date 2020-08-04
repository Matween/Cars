class ProfileController {
  constructor(Profile, User, Car, $scope) {
    'ngInject';

    this._Car = Car;
    this.setListTo(this.listConfig);
    this.profile = Profile;

    if (User.current) {
      console.log(this.profile)
      this.isUser = (User.current.username === this.profile.username);
    } else {
      this.isUser = false;
    }

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;
    
    // Run the query
    this._Car
      .query()
      .then(
        (res) => {
          this.loading = false;

          // Update list
          this.list = res.cars;

        }
      );
  }
}


export default ProfileController;