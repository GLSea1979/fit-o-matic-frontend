'use strict';

require('./_detail-modal.scss');

module.exports = {
  template: require('./detail-modal.html'),
  controller: ['$log',   DetailModalController],
  controllerAs: 'detailModalCtrl',
  bindings: {
    resolve: '<',
  }
};

function DetailModalController($log){
  $log.debug('DetailModalController');
}
