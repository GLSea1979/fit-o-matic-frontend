'use strict';

require('./_display-mfr.scss');

module.exports = {
  template: require('./display-mfr.html'),
  controller: ['$log', 'mfrService', DisplayMfrController],
  controllerAs: 'displayMfrCtrl',
  bindings: {
    brand: '<',
    currentMfr: '='
  }
};

function DisplayMfrController($log, mfrService){
  $log.debug('DisplayMfrController');


  this.setCurrentMfr = function() {
    this.currentMfr = this.brand;
    $log.debug(this.currentMfr);
  };

  this.test = 'test'
  this.showAddBike = false;

}
