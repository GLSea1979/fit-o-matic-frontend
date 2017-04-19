'use strict';

require('./_favorites-display.scss');

module.exports= {
  template: require('./favorites-display.html'),
  controller: ['$log', 'profileService', FavoritesDisplayController],
  controllerAs: 'favoritesDisplayCtrl',
  bindings: {
    profile: '<'
  }
};

function FavoritesDisplayController($log, profileService){
  $log.debug('FavoritesDisplayController');

  this.fetchFavorites = function(){
    profileService.fetchProfile(this.profile._id)
    .then( res => {
      $log.debug('favoritesDisplayCtrl.fetchFavorites', res);

      //TODO parse out and return geoID array
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

  this.deleteFavorites = function(){
    this.profile.geoID = [];
    profileService.updateFavorites(this.profile)
    .then( res => {
      $log.debug('udate',res);
    });
  };

}