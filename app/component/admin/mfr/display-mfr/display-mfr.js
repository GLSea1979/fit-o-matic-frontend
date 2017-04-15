'use strict';

require('./_display-mfr.scss');

module.exports = {
  template: require('./display-mfr.html'),
  controller: ['$log', 'mfrService', DisplayMfrController],
  controllerAs: 'displayMfrCtrl',
  bindings: {
    mfrs: '<'
  }
};

function DisplayMfrController($log, mfrService){
  $log.debug('DisplayMfrController');

  this.test = 'test'

}