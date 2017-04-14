'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'routeService', NavbarController],
  controllerAs: 'navbarCtrl',
};


function NavbarController($log, $location, $rootScope, authService, routeService) {
  $log.debug('navbarController');
  this.isNavCollapsed = true;
  this.routes = routeService.routes;

  this.checkPath = function() {
    let path = ($location.path() === '/signup');
    // $log.debug($location.path());

    if(path) this.hideButtons = true;

    if (!path) {
      this.hideButtons = false;
    //   authService.getToken()
    //   .catch( () => {
    //     $location.url('/signup#signin');
    //   });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('authService.logout');

    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
