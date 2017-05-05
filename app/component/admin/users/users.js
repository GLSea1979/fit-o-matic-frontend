'use strict';

require('./_users.scss');

module.exports = {
  template: require('./users.html'),
  controller: ['$log', 'profileService', UsersController],
  controllerAs: 'usersCtrl'
};

function UsersController($log, profileService){
  $log.debug('UsersController');



  profileService.fetchAllProfiles()
  .then( profiles => {
    this.profiles = profiles.data;
  });


  this.updateAdmin = function(profile){
    $log.debug('usersCtrl.updateAdmin');
    let adminProfile ={
      _id: profile._id,
      admin: profile.admin
    };
    profileService.updateProfile(profile._id, adminProfile)
    .then( res => {
      this.profiles.forEach((profile) => {
        if(profile._id === res.data._id) profile.updated=true;
      });

    });
  };
}
