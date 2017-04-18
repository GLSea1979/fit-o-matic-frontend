'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', AdminController];

function AdminController($log, $rootScope, $location, mfrService) {
  $log.debug('AdminController');

  this.mfrs = [];
  this.setCurrentMfr = function(mfr){
    $log.debug('this is the index', this.mfrs[0]);
    this.currentMfr = mfr;
    $log.debug(this.currentMfr);
  };

  this.showDisplayBike = false;

  this.fetchAllMfrs = function() {
    mfrService.fetchAllMfrs()
    .then( mfrs => {
      this.mfrs = mfrs;
      this.currentMfr = this.mfrs[0];
      console.log(this.mfrs[0],'<--------------------');
    });
  };

  // TODO: either delete this or make it make sense
  // this.mfrDelete = function(mfr) {
  //   if(this.currentMfr._id === mfr._id) {
  //     this.currentMfr = null;
  //   }
  // };

  this.fetchAllMfrs();

  $rootScope.$on('locactionChangeSuccess()', () => {
    this.fetchAllMfrs();
  });
}
