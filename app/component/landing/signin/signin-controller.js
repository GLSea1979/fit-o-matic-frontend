'use strict';

require('./_signin.scss');

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$location','authService',  SigninController],
  controllerAs: 'signinCtrl'
};

function SigninController($log, $location, authService){
  $log.debug('SigninController');
  this.serverError=false;
  //TODO: create more meaningful server errors for better feedback here

  this.signin = function() {
    $log.debug('signinCtrl.signin');
    authService.signin(this.user)
  .then( () => {
    $location.url('/home');
  })
  .catch(err =>{
    $log.error('caught an error:', err);
    this.serverError=true;
  });
  };
}
