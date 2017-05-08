/* global __API_URL__ */

'use strict';

module.exports = ['$log', '$q', '$http', '$window', 'authService', geoService];

function geoService($log, $q, $http, $window, authService){
  $log.debug('geoService');

  let service = {};
  //JSON.parse($window.localStorage.metric) ? service.metric = true : service.metric = false;
  service.metric = false;
  service.addBikeId = function(bikeId, geoData){
    $log.debug('geoService.addBikeId');

    geoData.bikeID.push(bikeId);
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/geo/${geoData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.put(url, geoData, config);
    })
    .then( res => {
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.removeBikeId = function(bikeId, geoData){
    $log.debug('geoService.removeBikeId');

    $log.debug(geoData);
    geoData.bikeID.forEach( (bike, index) => {
      //debugger;
      if (bike === bikeId) geoData.bikeID.splice(index, 1);
    });
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/geo/${geoData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.put(url, geoData, config);
    })
    .then( res => {
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };




  service.createGeo = function(geoSpecs){
    $log.debug('geoService.createGeo()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/geo`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.post(url, geoSpecs, config);
    })
    .then( res => {
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };//end createGeo()

  service.fetchGeo = function(height, inseam, metric){
    $log.debug('geoService.fetchGeo()', service.metric);

    if(!metric){
      height *= 2.54;
      inseam *= 2.54;
    }

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/geo/?height=${height}&inseam=${inseam}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
    .then( res => {
      service.geo = res.data;
      return service.geo;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

    service.fetchAllGeos = function(){
      $log.debug('geoService.fetchAllGeo()');

      return authService.getToken()
  		.then( token => {
    		let url = `${__API_URL__}/api/geos`;
    		let config = {
      	headers: {
        	Accept: 'application/json',
        	Authorization: `Bearer ${token}`
      	}
     		};
    return $http.get(url, config);
  })
  		.then( res => {
  			$log.debug('we have all teh geos! ---> ', res.data);
  		  service.allGeos = res.data;
  			return service.allGeos;
  		})
  		.catch( err => {
  			$log.error(err.message);

  			return $q.reject(err);
  		});
  		};





    service.updateGeo = function(geoID, geoData){
      $log.debug('geoService.updateGeo');

      return authService.getToken()
      .then( token => {
        let url = `${__API_URL__}/api/geo/${geoID}`;
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        return $http.put(url, geoData,config);
      })
      .then( res => {
        $log.debug('we have updated the geo');

      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

		return service;
};
