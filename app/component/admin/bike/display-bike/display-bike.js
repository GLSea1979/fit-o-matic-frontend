'use strict';

require('./_display-bike.scss');
module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log','$timeout','bikeService', DisplayBikeController],
  controllerAs: 'displayBikeCtrl',
  bindings: {
    brand: '<',
    currentBike: '<',
    passCurrentBike: '&'
  }
};

function DisplayBikeController($log, $timeout, bikeService){
  $log.debug('DisplayBikeController', this.bikes);

  this.showEditBike = false;
  this.bikes = [];


  this.displayBikes = function() {
    $log.debug('DisplayBikeController.displayBikes()');
    bikeService.fetchMfrBikes(this.brand._id)
    .then( data => {
      this.bikes = data;
    });
  };

  this.changeBike = function(bike){
    $log.debug('displayBikeCtrl.changeBike --> this', this);
    this.showEditBike = !this.showEditBike;
    this.passCurrentBike({newBike:bike});
  };

  this.$onInit = function() {
    this.displayBikes();

  };

}
