'use strict';

module.exports = {
	template: require('./edit-geo.html'),
	controller: ['$log', 'geoService', EditGeoController],
	controllerAs: 'editGeoCtrl',
	// TODO create this binding with bike/mfr
	bindings: {
		bike: '<'
	}
};

function EditGeoController($log, geoService){
	$log.debug('EditGeoController');

	this.showEdit = false;

	this.updateGeo = function(){
		geoService.updateGeo(this.geo._id, this.geo)
		.then( res => {
			this.geo = res.data;
			this.showEdit = false;
		})
		.catch( err => {
			$log.error(err.message);
			return $q.reject(err);
		});
	}
};
