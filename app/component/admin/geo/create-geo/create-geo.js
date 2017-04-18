'use strict';

module.exports = {
  template: require('./create-geo.html'),
  controller: ['$log', 'geoService', CreateGeoController],
  controllerAs: 'createGeoCtrl',
  bindings: {
    bike: '<'
  }
};

function CreateGeoController($log, geoService){
  $log.debug('CreateGeoController');

  //todo: make post request to post a new geo

	this.geo = {};

	this.createGeo = function(){
		$log.debug('createGeoCtrl.createGeo()');
    $log.debug('geo here------>', this.geo);
		geoService.createGeo(this.geo)
		.then( geo => {
			this.geo.bikeSizeName = null;
			this.geo.wheelSize = null;
			this.geo.bbDrop = null;
			this.geo.forkLength = null;
			this.geo.topTubeLength = null;
			this.geo.headTubeLength = null;
			this.geo.headTubeAngle = null;
			this.geo.seatTubeAngle = null;
			this.geo.stack = null;
			this.geo.reach = null;
		})
	};
};
