'use strict';

require('./_profile-display.scss');

module.exports = {
  template: require('./profile-display.html'),
  controller: ['$log', '$window', 'profileService', ProfileDisplayController],
  controllerAs: 'profileDisplayCtrl'
};

function ProfileDisplayController($log, $window, profileService){
  $log.debug('ProfileDisplayController');

  this.showEdit = false;

  this.fetchProfile = function(){
    profileService.fetchProfile()
    .then( res => {
      this.profile = res.data;
      this.profile.email = $window.localStorage.getItem('email');
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

  this.fetchProfile();
}
