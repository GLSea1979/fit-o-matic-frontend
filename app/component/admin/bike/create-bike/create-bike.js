'use strict';

require('./_create-bike.scss');

module.exports = {
  template: require('./create-bike.html'),
  controller: ['$log', 'bikeService', CreateBikeController],
  controllerAs: 'createBikeCtrl',
  bindings: {
    brand: '<',
    showForm: '='
  }
};

function CreateBikeController($log, bikeService) {
  $log.debug('CreateBikeController');

  this.bike = {};

  this.uploadImg = function(){
    $log.debug('createBikeCtrl.uploadImg');

    bikeService.uploadImg(this.bike, this.img)
    .then( res => {
      $log.debug('----->', res);
      this.bike.photoURI = res.data.imageURI;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    })

  }

  this.createBike = function() {
    $log.debug('createBikeCtrl.createBike');
    this.showForm = !this.showForm;
    bikeService.createBike(this.brand._id, this.bike)
    .then( () => {
      this.bike.name = null;
      this.bike.category = null;
      this.bike.price = null;
      this.bike.modelYear = null;
    });
  }

}
