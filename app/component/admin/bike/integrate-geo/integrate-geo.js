'use strict';

require('./_integrate-geo.scss');

module.exports = {
  template: require('./integrate-geo.html'),
  controller: ['$log', 'geoService', 'bikeService', IntegrateGeoController],
  controllerAs: 'integrateGeoCtrl',
  bindings: {
    currentBike: '<'
  }
};

function IntegrateGeoController($log, geoService, bikeService){
  $log.debug('IntegrateGeoController');
  this.geos = [];


  this.updateBikeGeo = function(geo){
    $log.debug('integrateGeoCtrl.updateBikeGeo()');

    geoService.addBikeId(this.currentBike._id, geo)
    .then(newGeo => {
      $log.debug(newGeo);
      this.geos.forEach( geo => {
        if (geo._id === newGeo._id) geo.updated = true;
      });

    });
  };

  this.removeBikeGeo = function(geo){
    geoService.removeBikeId(this.currentBike._id, geo)
    .then( newGeo => {
      this.geos.forEach( geo => {
        if (geo._id === newGeo._id) geo.updated = false;
      });
    });
  };

  this.getAllGeos = function(){
    $log.debug('integrateGeoCtrl.getAllGeos()');

    geoService.fetchAllGeos()
    .then( geos => {
      $log.debug('here are your geos, sir', geos );
      geos.forEach( geo  => {
        geo.bikeID.forEach(bike => {
          if (bike === this.currentBike._id) geo.updated = true;
        });
      });
      this.geos = geos;

    });
  };

  this.getAllGeos();
}
