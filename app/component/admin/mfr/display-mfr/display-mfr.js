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
    setCurrentMfr: '&',
    fetchMfrBikes: '&'
  }
};

function DisplayMfrController($log, mfrService){
  $log.debug('DisplayMfrController');


  this.showMfrBikes = function() {
    this.setCurrentMfr(this.brand);
    this.fetchMfrBikes();
    this.showDisplayBike = true;
  };

  this.showAddBike = false;

}
