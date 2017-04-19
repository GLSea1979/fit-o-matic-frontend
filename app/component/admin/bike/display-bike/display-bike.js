'use strict';

module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log', 'bikeService', DisplayBikeController],
  controllerAs: 'displayBikeCtrl',
  bindings: {
    currentBike: '<',
    currentMfr: '<',
    bikes: '<',
    setCurrentBike: '&',
  }
};

function DisplayBikeController($log, bikeService){
  $log.debug('DisplayBikeController', this.bikes);

  this.showEditBike = false;

  this.displayBikes = function() {
    $log.debug('DisplayBikeController.displayBikes', this.currentMfr);

    bikeService.fetchMfrBikes(this.currentMfr._id)
    .then( bikes => {
      this.bikes = bikes;
    });
  };

  this.changeBike = function(bike){
    $log.debug('displayBikeCtrl.changeBike',bike);

    this.showEditBike = true;

    this.setCurrentBike({newBike:bike});
  };


}
