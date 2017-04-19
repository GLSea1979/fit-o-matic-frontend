'use strict';

require('./_delete-mfr.scss');

module.exports = {
  template: require('./delete-mfr.html'),
  controller: ['$log', 'mfrService', DeleteMfrController],
  controllerAs: 'deleteMfrCtrl',
  bindings: {
    deleteCurrentMfr: '&',
    mfr: '<'
  }
};

function DeleteMfrController($log, mfrService) {
  $log.debug('DeleteMfrController');

  this.deleteMfr = function() {
    $log.debug(this.currentMfr);

    mfrService.deleteMfr(this.mfr)
    .then( () => {
      this.mfr.name = null;
      this.mfr.website = null;
    });
  };
};
