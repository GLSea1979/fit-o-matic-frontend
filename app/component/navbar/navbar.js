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

  this.checkTokenStatus = function(){
    if(localStorage.token) {
      this.localToken = true;
    }
    else{
      this.localToken = false;
     }
}

  this.checkPath = function() {
    let path = ($location.path() === '/join');
    //$log.debug($location.path());
    this.checkTokenStatus();

    if(path) this.hideButtons = true;

    if (!path) {
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/#!/signin');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('authService.logout');

    this.hideButtons = true;
    this.isNavCollapsed = true;
    authService.logout()
    .then( () => {
      $location.url('/#!/join#signin');
    });
  };
}
