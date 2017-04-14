'use strict';

require('./_admin.scss');

module.exports = ['$log', '$rootScope', '$location', 'mfrService', AdminController];

function AdminController($log, $rootScope, $location, mfrService) {
  $log.debug('AdminController');

  this.mfrs = [];

  this.fetchAllMfrs = function() {
    mfrService.fetchAllMfrs()
    .then( mfrs => {
      this.mfrs = mfrs;
      this.currentMfr = mfrs[0];
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
