'use strict';

require('./_profile-results.scss');

module.exports = {
  template: require('./profile-results.html'),
  controller: ['$log', 'profileService', 'geoService', ProfileResultsController],
  controllerAs: 'profileResultsCtrl',
  bindings: {
    profile: '=',
    units: '<'
  }
};

function ProfileResultsController($log, profileService, geoService){
  $log.debug('ProfileResultsController');

  this.retrieveResults = function() {
    $log.debug('profileResultsCtrl.retrieveResults');
    //TODO add unit conversion

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
}