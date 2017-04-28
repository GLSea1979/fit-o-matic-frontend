'use strict';

require('./_display-all-grid.scss');

module.exports = {
  template: require('./display-all-grid.html'),
  controller: ['$log', 'profileService', 'geoService', 'bikeService', '$uibModal', DisplayAllGridController],
  controllerAs: 'displayAllGridCtrl'
};


function DisplayAllGridController($log, profileService, geoService, bikeService, $uibModal) {
  $log.debug('DisplayAllGridController');

  this.fetchAllBikes = function() {
    $log.debug('retrieveAllBikes');

    bikeService.fetchAllBikes()
    .then( res => {
      $log.debug('  --->>>>  ', res);
      this.bikes = res;
    });
  };

  this.getDetail = function(obj){
    $log.debug('displayAllGridCtrl.getDetail()');
    obj.bike = true;
    this.open = () => {
      $uibModal.open({
        animation: this.animationsEnabled,
        component: 'detailModal',
        size: 'lg',
        resolve: {
          modalData: obj
        }
      }).result.then(()=>{}).catch( () => $log.log('closed'));
    };
    this.open();
  };
  this.fetchAllBikes();
}
