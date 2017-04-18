'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', 'bikeService', AdminController];

function AdminController($log, $rootScope, $location, mfrService, bikeService) {
  $log.debug('AdminController');

  this.mfrs = [];
  this.setCurrentMfr = function(mfr){
    $log.debug('AdminController.setCurrentMfr');
    this.currentMfr = mfr;
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
  // TODO: either delete this or make it make sense
  // this.mfrDelete = function(mfr) {
  //   if(this.currentMfr._id === mfr._id) {
  //     this.currentMfr = null;
  //   }
  // };

  this.fetchAllMfrs();

  $rootScope.$on('locationChangeSuccess()', () => {
    this.fetchAllMfrs();
  });
}
