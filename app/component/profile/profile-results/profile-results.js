'use strict';

require('./_profile-results.scss');

module.exports = {
  template: require('./profile-results.html'),
  controller: ['$log', '$uibModal', 'profileService', 'geoService', ProfileResultsController],
  controllerAs: 'profileResultsCtrl',
  bindings: {
    profile: '<',
    results: '<',
    addToFavorites: '&',
    fetchProfile: '&'
  }
};

function ProfileResultsController($log, $uibModal, profileService, geoService){
  $log.debug('ProfileResultsController');


  // this.retrieveResults = function() {
  //   $log.debug('profileResultsCtrl.retrieveResults');

  //   geoService.fetchGeo(this.profile.height, this.profile.inseam)
  //   .then( res => {
  //     $log.debug('retrieveResults', res);
  //     this.results = res.geo;
  //   });
  // };

  this.add = function(geo){
    console.log(this);
    this.addToFavorites({toAdd: geo});
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
      }).result.then(()=>{}).catch( () => this.fetchProfile());
    };
    this.open();
  };


}
