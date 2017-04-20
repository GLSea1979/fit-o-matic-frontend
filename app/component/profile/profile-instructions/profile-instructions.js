'use strict';

require('./_profile-instructions.scss');

module.exports = {
  template: require('./profile-instructions.html'),
  controller: ['$log', 'profileService', ProfileInstructionsController],
  controllerAs: 'profileInstructionsCtrl',
  bindings: {
    profile: '='
  }
};

function ProfileInstructionsController($log, profileService){
  $log.debug('ProfileInstructionsController');


}
