'use strict';

require('./_edit-bike-modal.scss');

module.exports = {
  template: require('./edit-bike-modal.html'),
  controller: ['$log', 'bikeService', EditBikeModalController],
  controllerAs: 'editBikeModalCtrl',
  bindings: {
    resolve: '<',
    dismiss: '&'
  }
};

function EditBikeModalController($log, bikeService) {
  $log.debug('EditBikeModalController');

  this.$onInit = function() {
    this.currentBike = this.resolve.modalData;
  };
  this.closeModal = function(){
    this.dismiss();
  };
  this.showIntegrateGeo = false;

  this.uploadImg = function(){
    bikeService.uploadImg(this.currentBike, this.img)
    .then( ()  => {
      $log.debug('uploaded image');
      this.img.file = null;
      this.showImageUpload = false;
    });
  };

  this.updateBike = function(){
    $log.debug('editBikeCtrl.updateBike');

    bikeService.updateBike(this.currentBike._id, this.currentBike)
    .then( bike => {
      $log.debug('here is the bike:', bike);
      this.showEdit = !this.showEdit;
    });
  };
}
