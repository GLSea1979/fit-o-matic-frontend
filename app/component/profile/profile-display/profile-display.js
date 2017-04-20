'use strict';

require('./_profile-display.scss');

module.exports = {
  template: require('./profile-display.html'),
  controller: ['$log', '$window', 'profileService', 'geoService', ProfileDisplayController],
  controllerAs: 'profileDisplayCtrl'
};

function ProfileDisplayController($log, $window, profileService, geoService){
  $log.debug('ProfileDisplayController');

  this.showEdit = false;

  geoService.metric ? this.units='centimeters' : this.units = 'inches';

  this.switchUnits = function() {
    geoService.metric = !geoService.metric;
    geoService.metric ? this.units='centimeters' : this.units = 'inches';
  };

  this.fetchProfile = function(){
    profileService.fetchProfile()
    .then( res => {
      this.profile = res.data;
      this.profile.email = $window.localStorage.getItem('email');
      if (this.profile.height && this.profile.inseam) this.fetchResults();
      if (!this.profile.photoURI) this.profile.photoURI = __defaultUserPhoto__;
    });
  };
  this.updateProfile = function(){
    profileService.updateProfile(this.profile._id, this.profile)
    .then( res => {
      this.profile = res.data;
      this.showEdit = false;
    })
    .catch( err => {
      $log.error(err);
      this.showEdit = false;
    });
  };

  this.fetchResults = function(){
    geoService.fetchGeo(this.profile.height, this.profile.inseam)
    .then( res => {
      $log.debug('retrieveResults');

      res.geo.forEach( geo => {
        this.profile.geoID.forEach( favoriteId => {
          if (geo._id === favoriteId) geo.isFavorite=true;
        });

      });
      this.results = res.geo;
    });
  };


  this.removeFavorite = function(geo){
    $log.debug('profileDisplayCtrl.removeFavorite', 'geo:',geo, 'profile.geoID:',this.profile.geoID);
    this.profile.geoID.forEach( (favorite, index) => {
      if (favorite === geo._id)  {
        this.profile.geoID.splice(index, 1);
        this.results.forEach( result => {
          if (geo._id === result._id) result.isFavorite=false;
        });
      }
    });

    profileService.updateProfile(this.profile._id, this.profile)
    .then( res => {
      this.profile = res.data;
      this.profile.email = $window.localStorage.getItem('email');
    })
    .catch( err => {
      $log.error(err);
    });

  };
  this.addToFavorites = function(geo){
    $log.debug('profileDisplayCtrl.addToFavorites', 'geo:',geo, 'profile.geoID:',this.profile.geoID);
    this.profile.geoID.push(geo);
    geo.isFavorite =true;
    console.log(']]]]]]]]]]',geo, this.results);
    profileService.updateProfile(this.profile._id, this.profile)
    .then( res => {
      this.profile = res.data;
      this.profile.email = $window.localStorage.getItem('email');
    })
    .catch((err) => $log.error(err));
  };
  this.fetchProfile();
}
