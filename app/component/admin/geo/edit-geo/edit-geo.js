'use strict';

require('./_edit-geo.scss');

module.exports = {
  template: require('./edit-geo.html'),
  controller: ['$log', '$q', 'geoService',  EditGeoController],
  controllerAs: 'editGeoCtrl',
  // TODO create this binding with bike/mfr
  bindings: {
    bike: '<',
    resolve: '<',
    dismiss: '&'
  }
};

function EditGeoController($log,$q, geoService){
  $log.debug('EditGeoController');

  this.showEdit = false;

  this.$onInit = function(){
    this.geo  = this.resolve.modalData;
  };

  this.closeModal = function(){
    $log.debug('EditGeoController.closeModal');
    this.dismiss();
  };

  this.updateGeo = function(){
    geoService.updateGeo(this.geo._id, this.geo)
    .then( res => {
      //this.geo = res.data;
      this.dismiss();
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
}
