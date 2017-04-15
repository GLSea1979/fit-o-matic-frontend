'use strict';

require('./_create-mfr.scss');

module.exports = {

  template: require('./create-mfr.html'),
  controller: ['$log', 'mfrService', CreateMfrController],
  controllerAs: 'createMfrCtrl',
  bindings: {
    mfr: '<'
  }
};

function CreateMfrController($log, mfrService){
  $log.debug('createMfrController');

  this.mfr = {};

	this.createMfr = function(){
  	$log.debug('createMfrCtrl.createMfr');
  	mfrService.createMfr(this.mfr)
		.then( () => {
    	this.mfr.name = null;
			this.mfr.website = null;
  	});
	}
}
