export default class Car {
  constructor(AppConstants, JWT, $http, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


  }

  query() {
    // Create the $http object for this request
    let request = {
      url: this._AppConstants.api + '/cars',
      method: 'GET',
    };
    return this._$http(request).then((res) => res.data);
  }

  get(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Car slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.api + '/car/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  destroy(slug) {
    return this._$http({
      url: this._AppConstants.api + '/car/' + slug,
      method: 'DELETE'
    })
  }

  save(car) {
    let request = {};

    if (car.slug) {
      request.url = `${this._AppConstants.api}/car/${car.slug}`;
      request.method = 'PUT';
      delete car.slug;

    } else {
      request.url = `${this._AppConstants.api}/cars`;
      request.method = 'POST';
      request.headers = {'Authorization': 'Bearer ' + this._JWT.get()};
    }

    request.data = car;

    return this._$http(request).then((res) => res.data.car);
  }
}
