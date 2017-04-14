'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', 'authService', 'routeService',NavbarController],
  controllerAs: 'navbarCtrl',
};


function NavbarController($log, $location, authService, routeService) {
  $log.debug('navbarController');
  this.isNavCollapsed = true;
  this.routes = routeService.routes;

  this.checkPath = function() {
    let path = ($location.path() === '/signup');

    $log.debug($location.path());

    if(path) this.hideButtons = true;

    if (!path) {
      this.hideButtons = false;
    //   authService.getToken()
    //   .catch( () => {
    //     $location.url('/signup#login');
    //   });
    }
  };

  this.checkPath();

  this.logout = function() {
    $log.log('authService.logout');

    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
