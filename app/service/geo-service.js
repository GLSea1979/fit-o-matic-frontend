'use strict';

module.exports = ['$log', '$q', '$http', 'authService', geoService];

function geoService($log, $q, $http, authService){
  $log.debug('geoService');

  let service = {};

	service.createGeo = function(bikeID, geoSpecs){
		$log.debug('geoService.createGeo()');
		//todo: be sure to pass in a bikeID from controller

		return authService.getToken()
		.then( token => {
			let url = `${__API_URL__}/api/bike/${bikeID}/geometry`;
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
			$log.debug(res.body, '<----HERE IS WHAT CAME BACK');

		})
		.catch( err => {
			$log.error(err.message);
			return $q.reject(err);
		});
	};//end createGeo()

  service.fetchGeo = function(height, inseam){
    $log.debug('geoService.fetchGeo()');

    return authService.getToken()
		.then( token => {
  		let url = `${__API_URL__}/api/geo/?height=${height}&inseam=${inseam}`;
  		let config = {
    	header: {
      	Accept: 'application/json',
      	Authorization: `Bearer ${token}`
    	}
   		};
  return $http.get(url, config);
})
		.then( res => {
			$log.debug('we have a fitting!');
		  service.geo = res.data;
			return service.geo;
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
