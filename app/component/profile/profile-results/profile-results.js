'use strict';

require('./_profile-results.scss');

module.exports = {
  template: require('./profile-results.html'),
  controller: ['$log', '$uibModal', ProfileResultsController],
  controllerAs: 'profileResultsCtrl',
  bindings: {
    profile: '<',
    results: '<',
    addToFavorites: '&',
    fetchProfile: '&'
  }
};

function ProfileResultsController($log, $uibModal){
  $log.debug('ProfileResultsController');

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
