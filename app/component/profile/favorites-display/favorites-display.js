'use strict';

require('./_favorites-display.scss');

module.exports= {
  template: require('./favorites-display.html'),
  controller: ['$log','$uibModal', 'profileService', FavoritesDisplayController],
  controllerAs: 'favoritesDisplayCtrl',
  bindings: {
    profile: '<',
    removeFavorite: '&',
    fetchProfile: '&'
  }
};

function FavoritesDisplayController($log, $uibModal, profileService){
  $log.debug('FavoritesDisplayController');

  this.fetchFavorites = function(){
    profileService.fetchFavorites(this.profile._id)
    .then( res => {
      $log.debug('favoritesDisplayCtrl.fetchFavorites', res);
      this.favorites = res.data;
    });
  };

  this.updateFavorites = function(geoID){
    $log.debug('FavoritesDisplayController.updateFavorites');
    this.profile.geoID.push(geoID);
    profileService.updateFavorites(this.profile)
    .then( res => {
      $log.debug('updated',res);
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
      }).result.then(()=>{}).catch( () => {
        this.fetchProfile();
      });
    };
    this.open();
  };

  this.deleteFavorites = function(geo){
    // this.profile.geoID = [];
    // profileService.updateFavorites(this.profile)
    // .then( res => {
    //   $log.debug('udate',res);
    // });

    this.removeFavorite({toRemove:geo});

  };


  this.$onChanges = function() {
    if(this.profile) this.fetchFavorites();
  };
}