'use strict';

require('./_display-geo.scss');

module.exports = {
  template: require('./display-geo.html'),
  controller: ['$log','$uibModal', 'geoService',  DisplayGeoController],
  controllerAs: 'displayGeoCtrl',
  bindings: {
    fetchAllGeos: '&',
    geos: '<'
  }
};

function DisplayGeoController($log, $uibModal, geoService){
  $log.debug('DisplayGeoController');

  // this.displayGeos = function(){
  //  $log.debug(this);
  //  this.fetchAllGeos();
  // }
  this.editGeo = function(geo){
    $log.debug('displayGeoCtrl.editGeo()');
    this.open = () => {
      $uibModal.open({
        animation: this.animationsEnabled,
        component: 'editGeo',
        size: 'lg',
        resolve: {
          modalData: geo
        }
      }).result.then(()=>{}).catch( () => $log.log('closed'));
    };
    this.open();
  };
}
