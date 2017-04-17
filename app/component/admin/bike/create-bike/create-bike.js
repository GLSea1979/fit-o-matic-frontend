'use strict';

require('./_create-bike.scss');

module.exports = {
<<<<<<< HEAD
  template: require('./create-bike.html'),
  controller: ['$log', 'bikeService', CreateBikeController],
  controllerAs: 'createBikeCtrl',
  bindings: {
    bike: '<'
  }
};

function CreateBikeController($log, bikeService) {
  $log.debug('CreateBikeController');

  this.bike = {};

  this.createBike = function() {
    $log.debug('createBikeCtrl.createBike');
    bikeService.createBike(this.bike)
    .then( () => {
      this.bike.name = null;
      this.bike.category = null;
      this.bike.price = null;
      this.bike.modelYear = null;
    });
  }
=======
	template: require('./create-bike.html'),
	controller: ['$log', 'bikeService', CreateBikeController],
	controllerAs: 'createBikeCtrl',
	bindings: {
    brand: '<'
	}
};
function CreateBikeController($log, bikeService){
	$log.debug('CreateBikeController');

	this.bike = {};

	this.createBike = function(){
		$log.debug('createBikeCtrl.createBike()');

		// bikeService.createBike(this.bike)
		// .then( bike => {
		// 	//todo: finish this
		// })

	};

>>>>>>> ab5c76fe8e6de20a1dcf5f01cb8e9eb8d439224b
}
