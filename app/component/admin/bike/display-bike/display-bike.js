'use strict';

require('./_display-bike.scss');
module.exports = {
  template: require('./display-bike.html'),
  controller: ['$log','$timeout','$uibModal','bikeService', DisplayBikeController],
  controllerAs: 'displayBikeCtrl',
  bindings: {
    brand: '<',
    currentBike: '<',
    passCurrentBike: '&'
  }
};

function DisplayBikeController($log, $timeout, $uibModal, bikeService){
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

  this.changeBike = function(x){
    $log.debug('displayBikeCtrl.changeBike -------------------------> this', this);
    $log.debug('HERE IS THE ARGUMENT (BIKE):', x);
    this.showEditBike = !this.showEditBike;
    this.passCurrentBike({newBike:x});
  };
  this.editBikeModal = function(bike){
    $log.debug('displayBikeCtrl.editBikeModal()');
    this.open = () => {
      $uibModal.open({
        animation: this.animationsEnabled,
        component: 'editBikeModal',
        size: 'lg',
        resolve: {
          modalData: bike
        }
      }).result.then(()=>{}).catch( () => $log.log('closed'));
    };
    this.open();
  };
  this.$onInit = function() {
    this.displayBikes();

  };

}
