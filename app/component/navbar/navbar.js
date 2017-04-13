'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', 'routeService', NavbarController],
  controllerAs: 'navbarCtrl',
};


function NavbarController($log, routeService) {
  $log.debug('navbarController');

  this.routes = routeService.routes;
}