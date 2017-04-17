'use strict';

module.exports = {
	template: require('./display-geo.html'),
	controller: ['$log', 'geoService', DisplayGeoController],
	controllerAs: 'displayGeoCtrl',
	bindings: {
		brand: '<'
	}
};

function DisplayGeoController($log, geoService){
	$log.debug('DisplayGeoController');

};
