'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', NavbarController],
  controllerAs: 'navbarCtrl',
}


function NavbarController($log) {
  $log.debug('navbarController');

  this.routes = [
    {
      name: 'home',
      url: '/home',
    },
    {
      name: 'bikes',
      url: '/bikes',
    },
    {
      name: 'profile',
      url: '/profile'
    },
    {
      name: 'admin',
      url: '/admin'
    }
  ]
}