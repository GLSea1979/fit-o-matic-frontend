'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', LandingController];

function LandingController($log, $location) {
  $log.debug('LandingController');

  this.signInFirst = true;

  // this.showSignup = url === '/join#signup' || url === '/join';
  if(this.signInFirst == false){
    $location.url('/join#signin');
  }
}
