'use strict';

module.exports = {
	template: require('./display-geo.html'),
	controller: ['$log', 'geoService', DisplayGeoController],
	controllerAs: 'displayGeoCtrl',
	bindings: {
		fetchAllGeos: '&',
		geos: '<'
	}
};

function DisplayGeoController($log, geoService){
	$log.debug('DisplayGeoController');

	// this.displayGeos = function(){
	// 	$log.debug(this);
	// 	this.fetchAllGeos();
	// }
};
