'use strict';

require('./_bikes.scss');

module.exports = ['$log', '$location', '$rootScope', '$stateParams', 'bikeService', 'geoService', 'profileService', BikesController];

function BikesController($log, $location, $rootScope, $stateParams, bikeService, geoService, profileService, BikesController) {
  $log.debug('BikesController');

  // todo stuff here please
};
