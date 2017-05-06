/*global __API_URL__ */

'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', bikeService];

function bikeService($log, $q, $http, Upload, authService) {
  $log.debug('bikeService');

  let service = {};
  service.bike = [];
  service.currentBike = null;

  service.fetchAllBikes = function() {
    $log.debug('bikeService.fetchAllBikes');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/all/bikes`;
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
  };

  service.fetchMfrBikes = function(mfrID){
    $log.debug('bikeService.fetchMfrBikes');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/bikes/${mfrID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.debug('Bikes are here', res.data);
      service.bikes = res.data;
      return service.bikes;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchBike = function(bikeID) {
    $log.debug('bikeService.fetchBike');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr/${mfrID}/bike`;
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
    });
  };

  service.uploadImg = function(bike, imgData){
    $log.debug('bikeService.uploadImg');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/photo/bike/${bike._id}`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      Upload.upload({
        url,
        headers,
        method: 'PUT',
        data: {
          image: imgData.file
        }
      })
      .then( res => {
        bike.photoURI = res.data.photoURI;
      })
      .catch( err => {
        $log.error(err);
        return $q.reject(err);
      });
    });
  };
  service.deleteBike = function(bikeID) {
    $log.debug('bikeService.deleteBike');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr/${mfrID}/bike`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
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

  service.createBike = function(mfrID, bikeData){
    $log.debug('bikeService.createBike', mfrID, bikeData);

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr/${mfrID}/bike`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          image: bikeData.file,
          bikeName: bikeData.bikeName,
          category: bikeData.category,
          url: bikeData.url,
          price: bikeData.price,
          modelYear: bikeData.modelYear
        }
      })
      .then( res => {
        $log.debug('SO FAR SO GOOD', res.data);
        return $q.resolve(res.data);
      });

    })
    .catch( err => {
      $log.error(err);
    });
  };





  return service;
}
