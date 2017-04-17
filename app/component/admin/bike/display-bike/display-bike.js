'use strict';

module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log', 'bikeService', DisplayBikeController],
  controllerAs: 'diplayBikeCtrl',
  bindings: {
    currentMfr: '<'
  }
};

function DisplayBikeController($log, bikeService){
  $log.debug('DisplayBikeController');

}