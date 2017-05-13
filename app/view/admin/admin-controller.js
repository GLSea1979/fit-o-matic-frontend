'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', 'bikeService', 'geoService', 'profileService', AdminController];

function AdminController($log, $rootScope, $location, mfrService, bikeService, geoService, profileService) {
  $log.debug('AdminController');

  //this.isAdmin = false;
  this.bikes = [];
  this.mfrs = [];

  profileService.fetchProfile()
    .then( res => {
      $log.debug(res, '<-----check admin status, adminCtrl');
      if( res.data.admin ){
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.adminMessage = 'Unauthorized';
      }
    }).catch(err => {
      $log.error(err.message);
    });

  this.setCurrentMfr = function(mfr){
    $log.debug('AdminController.setCurrentMfr');
    this.currentMfr = mfr;
  };

  this.currentBike = bikeService.currentBike;

  this.setCurrentBike = function(bike){

    this.currentBike = bike;
  };

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

  this.geos = [];

  this.fetchAllGeos = function(){
    $log.debug('adminCtrl.fetchAllGeos');
    geoService.fetchAllGeos()
    .then( geos => {
      this.geos = geos;
    });
  };

  $rootScope.$on('locationChangeSuccess()', () => {
    this.fetchAllMfrs();
  });
}
