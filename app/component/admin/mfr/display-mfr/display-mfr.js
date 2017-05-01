'use strict';

require('./_display-mfr.scss');

module.exports = {
  template: require('./display-mfr.html'),
  controller: ['$log', 'mfrService', DisplayMfrController],
  controllerAs: 'displayMfrCtrl',
  bindings: {
    brand: '<',
    currentMfr: '<',
    showDisplayBike: '<',
    setCurrentMfr: '&',
    fetchMfrBikes: '&',
    bikes: '<',
    currentBike: '<',
    setCurrentBike: '&'
  }
};

function DisplayMfrController($log, mfrService){
  $log.debug('DisplayMfrController');

  this.passCurrentBike = function(bike){
    $log.debug('displayMfrCtrl.passCurrentBike');
    this.setCurrentBike({newBike:bike});
  };

  this.showAddBike = false;
  this.showDisplayBike = false;

}
