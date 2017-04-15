'use strict';

module.exports = ['$log', '$q', '$http', 'authService', geoService];

function geoService($log $q, $http, authService){
	$log.debug('geoService');

	let service = {};

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

};
