'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
  $urlRouterProvider.when('/signup', '/join#signup');
  $urlRouterProvider.when('/signin', '/join#signin');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    },
    {
      name: 'admin',
      url: '/admin',
      template: require('../view/admin/admin.html'),
      controller: 'AdminController',
      controllerAs: 'adminCtrl'
    },
    {
      name: 'bikes',
      url: '/bikes',
      template: require('../view/bikes/bikes.html'),
      controller: 'BikesController',
      controllerAs: 'bikesCtrl'
    },
    {
      name: 'about',
      url: '/about',
      template: require('../view/about/about.html'),
      controller: 'AboutController',
      controllerAs: 'aboutCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
};
