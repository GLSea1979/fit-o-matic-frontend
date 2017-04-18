'use strict';

require('./_display-mfr.scss');

module.exports = {
  template: require('./display-mfr.html'),
  controller: ['$log', 'mfrService', DisplayMfrController],
  controllerAs: 'displayMfrCtrl',
  bindings: {
    brand: '<',
    currentMfr: '<',
    showDisplayBike: '=',
    setCurrentMfr: '&'
  }
};

function DisplayMfrController($log, mfrService){
  $log.debug('DisplayMfrController =========', this.currentMfr);


  this.showMfrBikes = function() {
    // this.currentMfr = this.brand;
    this.setCurrentMfr(this.brand);
    this.showDisplayBike = true;
    $log.debug(this.currentMfr);
  };

  this.showAddBike = false;

}
