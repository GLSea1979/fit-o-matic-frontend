'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', 'bikeService', 'geoService', 'profileService', AdminController];

function AdminController($log, $rootScope, $location, mfrService, bikeService, geoService, profileService) {
  $log.debug('AdminController');

  this.isAdmin = false;

  profileService.fetchProfile()
    .then( res => {
      $log.debug(res, '<-----check admin status, adminCtrl');
      if( res.data.admin ){
        this.isAdmin = true;
      }
    }).catch(err => {
      $log.error(err.message);
    });
  //just added this.bikes = [] ...not sure if it's necessary atp
  this.bikes = [];

  this.mfrs = [];

  this.setCurrentMfr = function(mfr){
    $log.debug('AdminController.setCurrentMfr');
    this.currentMfr = mfr;
  };

  this.currentBike = bikeService.currentBike;

  this.setCurrentBike = function(bike){
    $log.debug('AdminController.setCurrentBikeeee', bike);

    this.currentBike = bike;
    console.log('--------------------this is happening', this.currentBike);
  };

  // this.showDisplayBike = false;

  this.fetchAllMfrs = function() {
    mfrService.fetchAllMfrs()
    .then( mfrs => {
      this.mfrs = mfrs;
      this.currentMfr = this.mfrs[0];
    });
  };
  this.fetchMfrBikes = function(){
    //this is doing its job
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
