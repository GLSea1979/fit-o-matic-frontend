'use strict';

module.exports = ['$log', '$q', '$http', 'authService', bikeService];

function bikeService($log, $q, $http, authService){
	$log.debug('bikeService');

	let service = {};
	service.bikes = [];

	service.createBike = function(mfrID, bikeData){
		$log.debug('bikeService.createBike');

		return authService.getToken()
		.then( token => {
			let url = `${__API_URL__}/api/mfr/${mfrID}/bike`;
			let config = {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			};
			return $http.post(url, config);
		})
	}

};
