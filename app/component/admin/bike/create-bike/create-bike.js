'use strict';

require('./_create-bike.scss');

module.exports = {
  template: require('./create-bike.html'),
  controller: ['$log', 'bikeService', CreateBikeController],
  controllerAs: 'createBikeCtrl',
  bindings: {
    bike: '<'
  }
};

function CreateBikeController($log, bikeService) {
  $log.debug('CreateBikeController');

  this.bike = {};

  this.createBike = function() {
    $log.debug('createBikeCtrl.createBike');
    bikeService.createBike(this.bike)
    .then( () => {
      this.bike.name = null;
      this.bike.category = null;
      this.bike.price = null;
      this.bike.modelYear = null;
    });
  }

}
