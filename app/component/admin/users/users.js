'use strict';

require('./_users.scss');

module.exports = {
	template: require('./users.html'),
	controller: ['$log', 'profileService', UsersController],
	controllerAs: 'usersCtrl'
}

function UsersController($log, profileService){
	$log.debug('UsersController');

	profileService.fetchAllProfiles()
	.then( profiles => {
		this.profiles = profiles.data;
	});
}
