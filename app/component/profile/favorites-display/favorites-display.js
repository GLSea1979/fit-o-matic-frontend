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

  this.addFavorites = function(geoID){

    this.profile.getID.push(geoID);
    profileService.updateProfile(this.profile._id, this.profile)
    .then( res => {
      $log.debug(res);
    });

  };

}