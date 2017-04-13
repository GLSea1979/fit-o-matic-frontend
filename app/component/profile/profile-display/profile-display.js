'use strict';

module.exports = {
	template: require('./profile-display.html'),
	controller: ['$log', 'profileService', ProfileDisplayController],
	controllerAs: 'profileDisplayCtrl'
};

function ProfileDisplayController($log, profileService){
	$log.debug('ProfileDisplayController');

	this.fetchProfile = function(){
		profileService.fetchProfile()
		.then( res => {
			this.user = res;
			console.log(res, '<------ magic');
		})
	};

	this.fetchProfile();
};
