'use strict';

require('./_display-all-grid.scss');

module.exports = {
  template: require('./display-all-grid.html'),
  controller: ['$log', 'profileService', 'geoService', 'bikeService', DisplayAllGridController],
  controllerAs: 'displayAllGridCtrl'
}

// todo hook up detail button

function DisplayAllGridController($log, profileService, geoService, bikeService) {
  $log.debug('DisplayAllGridController');

  this.fetchAllBikes = function() {
    $log.debug('retrieveAllBikes');

    bikeService.fetchAllBikes()
    .then( res => {
      $log.debug('  --->>>>  ', res);
      this.bikes = res;
    })
  }
  this.fetchAllBikes();
}
