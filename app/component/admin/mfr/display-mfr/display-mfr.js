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
  // this.showMfrBikes = function() {
  //   $log.debug('HERE IS THE SHOWMFRBIKES FUNCTION CALL. HERE IS THE BRAND WHICH IS BEING PASSED INTO THE setCurrentMfr(--) function:', this.brand);
  //   this.setCurrentMfr(this.brand);
  //   this.fetchMfrBikes();
  //   // this.showDisplayBike = !this.showDisplayBike;
  // };

  this.showAddBike = false;
  this.showDisplayBike = false;

}
