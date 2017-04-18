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
}
