'use strict';

require('./_edit-bike.scss');

module.exports = {
  template: require('./edit-bike.html'),
  controller: ['$log', 'bikeService', EditBikeController],
  controllerAs: 'editBikeCtrl',
  bindings: {
    currentBike: '<'
  }
};

function EditBikeController($log, bikeService) {
  $log.debug('EditBikeController');

  this.showEdit = false;
  this.showIntegrateGeo = false;

  this.updateBike = function(){
    $log.debug('editBikeCtrl.updateBike');

    bikeService.updateBike(this.currentBike._id, this.currentBike)
    .then( bike => {
      $log.debug('here is the bike:', bike);
      this.showEdit = !this.showEdit;
    });
  };
}
