'use strict';

require('./_profile-results.scss');

module.exports = {
  template: require('./profile-results.html'),
  controller: ['$log', '$uibModal', 'profileService', 'geoService', ProfileResultsController],
  controllerAs: 'profileResultsCtrl',
  bindings: {
    profile: '=',
    results: '<'
  }
};

function ProfileResultsController($log, $uibModal, profileService, geoService){
  $log.debug('ProfileResultsController');



  this.retrieveResults = function() {
    $log.debug('profileResultsCtrl.retrieveResults');

    geoService.fetchGeo(this.profile.height, this.profile.inseam)
    .then( res => {
      $log.debug('retrieveResults', res);
      this.results = res.geo;
    });
  };

  this.addFavorite = function(geo){
    $log.debug('profileResultsCtrl.addFavorite');
    this.profile.geoID.push(geo);

    profileService.updateFavorites(this.profile)
    .then( res => {
      this.profile = res.data;
    });

  };

  this.getDetail = function(obj){
    $log.debug('displayAllGridCtrl.getDetail()');
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


}
