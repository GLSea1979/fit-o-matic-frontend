'use strict';

module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log', 'bikeService', DisplayBikeController],
  controllerAs: 'displayBikeCtrl',
  bindings: {
    brand: '<'
  }
};

function DisplayBikeController($log, bikeService){
  $log.debug('DisplayBikeController', this.bikes);

  this.showEditBike = false;
  this.bikes = [];

  this.displayBikes = function() {
    $log.debug('DisplayBikeController.displayBikes---------------> THE BRAND', this.brand);

    bikeService.fetchMfrBikes(this.brand._id)
    .then( mfrBikes => {
      this.bikes = mfrBikes;
    })
  };

  this.changeBike = function(bike){
    $log.debug('displayBikeCtrl.changeBike',bike);
    this.showEditBike = true;
    this.setCurrentBike({newBike:bike});
  };

  // this.displayBikes();
}
