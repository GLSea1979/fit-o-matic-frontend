'use strict';

module.exports = ['$log', '$q', '$http', '$window', 'authService', profileService];

function profileService($log, $q, $http, $window, authService){
	$log.debug('profileService');
	let service = {};
	let url = `${__API_URL__}`;

	service.fetchProfile = function(){
		$log.debug('profileService.fetchProfile');
		return authService.getToken()
		.then( token => {
			let config = {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
			let userId = $window.localStorage.userID;
			return $http.get(`${url}/api/profile/${userId}`, config)
			.then( res => {
				return res;
			})
			.catch( err => {
				$log.error(err.message);
				return $q.reject(err);
			});
		});
	};
	return service;
};
