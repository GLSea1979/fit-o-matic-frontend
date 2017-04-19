'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', 'bikeService', 'geoService', AdminController];

function AdminController($log, $rootScope, $location, mfrService, bikeService, geoService) {
  $log.debug('AdminController');

  this.mfrs = [];
  this.setCurrentMfr = function(mfr){
    $log.debug('AdminController.setCurrentMfr');
    this.currentMfr = mfr;
  };

  this.currentBike = bikeService.currentBike;

  this.setCurrentBike = function(bike){
    $log.debug('AdminController.setCurrentBike', bike);

    this.currentBike = bike;
    console.log('--------------------',this.currentBike);
  };

  this.showDisplayBike = false;

  this.fetchAllMfrs = function() {
    mfrService.fetchAllMfrs()
    .then( mfrs => {
      this.mfrs = mfrs;
      this.currentMfr = this.mfrs[0];
    });
  };
  this.fetchMfrBikes = function(){
    bikeService.fetchMfrBikes(this.currentMfr._id)
    .then( bikes => {
      this.bikes = bikes;
    });
    console.log('AdminController.setCurrentMfr', this.bikes, this.currentMfr, '---------!!!!----------');
  };

  this.fetchAllMfrs();


//geo stuff
this.geos = [];

this.fetchAllGeos = function(){
  $log.debug('adminCtrl.fetchAllGeos');
  geoService.fetchAllGeos()
  .then( geos => {
    $log.debug('geos attained!', geos)
    this.geos = geos;
  });
};
// this.fetchAllGeos();
//geo stuff



  $rootScope.$on('locationChangeSuccess()', () => {
    this.fetchAllMfrs();
  });
}
