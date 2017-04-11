'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', LandingController];

function LandingController($log, $location, authService) {
  $log.debug('LandingController');

  let url = $location.url();
  $log.debug('/join#signup:');

  //this.showSignup = url === '/join#signup' || url === '/join';
}