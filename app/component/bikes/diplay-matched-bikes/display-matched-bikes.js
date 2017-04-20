'use strict';

require('./_display-matched-bikes.scss');

module.exports = {
  template: require('./display-matched-bikes.html'),
  controller: ['$log', '$uibModal', 'geoService', 'profileService', 'bikeService', DisplayMatchedBikesController],
  controllerAs: 'displayMatchedBikesCtrl'
};

function DisplayMatchedBikesController($log, $uibModal, geoService, profileService, bikeService) {
  $log.debug('DisplayMatchedBikesController');

  this.hasMeasure = false;

  this.fetchProfile = function(){
    profileService.fetchProfile()
    .then( res => {
      this.profile = res.data;
      if(this.profile.height && this.profile.inseam) {
        this.retrieveResults();
        this.hasMeasure = true;
      }
    });
  };

  this.retrieveResults = function() {
    $log.debug('retrieveResults');

    geoService.fetchGeo(this.profile.height, this.profile.inseam)
    .then( res => {
      this.geos = res.geo;
    });
  };

  this.getDetail = function(obj){
    $log.debug('displayAllGridCtrl.getDetail()');
    $log.debug(obj, '<-----de obj');
    obj.geo = true;
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

  this.fetchProfile();
}
