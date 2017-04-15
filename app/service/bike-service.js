'use strict';

module.exports = ['$log', '$q', '$http', 'authService', bikeService];$

function bikeService($log, $q, $http, authService) {
  $log.debug('bikeService');

  let service = {};
  service.bike = [];

  service.fetchAllBikes = function() {
    $log.debug('bikeService.fetchAllBikes');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bikes/all`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.debug('Bikes are retrieved!');
      if(res.status === 204) {
        $log.debug(res.status, ' --> no bikes returned');
      }
      service.bikes = res.data;
      return service.bikes;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  }

  service.fetchBike = function(bikeID) {
    $log.debug('bikeService.fetchBike');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bike/${bikeID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.debug('Bike is here!!');

      service.bike = res.data;
      return service.bike;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateBike = function(bikeID, bikeData) {
    $log.debug('bikeService.updateBike');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bike/${bikeID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.put(url, bikeData, config);
    })
    .then( res => {
      $log.debug('bike has been updated with', res);

      return service.bike = res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    })
  };

  service.createBike = function(bikeData) {
    $log.debug('bikeService.createBike');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bike`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.post(url, bikeData, config);
    })
    .then( res => {
      $log.debug('bike created!');

      return service.bikes.unshift(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    })
  };

  service.deleteBike = function(bikeID) {
    $log.debug('bikeService.deleteBike');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bike/${bikeID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      return $http.delete(url, config);
    })
    .then( res => {
      $log.debug('hi buddy, we got a response here');

      service.bikes.forEach( (item, idx) => {
        if(item._id === bikeID) {
          service.bikes.splice(idx, 1);
        }
      });
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
  return service;
}
