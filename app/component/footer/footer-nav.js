'use strict';

require('./_footer-nav.scss');

module.exports = {
  template: require('./footer-nav.html'),
  controller: ['$log', 'routeService', footerController],
  controllerAs: 'footerCtrl'
};

function footerController($log, routeService){
  $log.debug('footerController');

  this.icons = routeService.icons;
}
