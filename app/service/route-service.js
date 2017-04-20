'use strict';

module.exports = ['$log', routeService];

function routeService($log){
  $log.debug('routeService');

  let service = {
    routes: [
      {
        name: 'profile',
        url: '/#!/home',
        admin: false
      },
      {
        name: 'bikes',
        url: '/#!/bikes',
        admin: false
      },
      {
        name: 'admin',
        url: '/#!/admin',
        admin: true
      },
      {
        name: 'about',
        url: '/#!/about',
        admin: false
      }
    ],
    icons: [
      {
        val:'github',
        url: 'https://github.com/GLSea1979/fit-o-matic-frontend',
        desc: 'check out the project on github'
      },
      {
        val:'about',
        url: '/#!/about',
        desc: 'about the team'
      }
    ]
  };
  return service;
}
