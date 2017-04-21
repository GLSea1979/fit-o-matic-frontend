'use strict';

require('./_integrate-geo.scss');

module.exports = {
	template: require('./integrate-geo.html'),
	controller: ['$log', 'geoService', 'bikeService', IntegrateGeoController],
	controllerAs: 'integrateGeoCtrl',
	bindings: {
		currentBike: '<'
	}
}

function IntegrateGeoController($log, geoService, bikeService){
	$log.debug('IntegrateGeoController');
	this.geos = [];


	this.updateBikeGeo = function(geo){
		$log.debug('integrateGeoCtrl.updateBikeGeo()');

		geoService.addBikeId(this.currentBike._id, geo)
		.then(newGeo => {
			$log.debug(newGeo);
		});

	};

	this.getAllGeos = function(){
		$log.debug('integrateGeoCtrl.getAllGeos()');

		geoService.fetchAllGeos()
		.then( geos => {
			$log.debug('here are your geos, sir', geos );

			this.geos = geos;

		});
	};

	this.getAllGeos();
};
