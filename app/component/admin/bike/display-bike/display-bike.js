'use strict';

module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log', 'bikeService', DisplayBikeController],
  controllerAs: 'displayBikeCtrl',
  bindings: {
    currentMfr: '<'
  }
};

function DisplayBikeController($log, bikeService){
  $log.debug('DisplayBikeController', this.currentMfr);
  // this.bikes = [];


  this.displayBikes = function() {
    $log.debug('DisplayBikeController.displayBikes', this.currentMfr);

    bikeService.fetchMfrBikes(this.currentMfr._id)
    .then( bikes => {
      this.bikes = bikes;
    });
  };

  this.$onInit = function() {
    this.displayBikes();
  };
}
