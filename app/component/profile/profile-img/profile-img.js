'use strict';

require('./_profile-img.scss');

module.exports = {
  template: require('./profile-img.html'),
  controller: ['$log', 'imgService', ProfileImgController],
  controllerAs: 'profileImgCtrl',
  bindings: {
    profile: '='
  }
};

function ProfileImgController($log, imgService){
  $log.debug('ProfileImgController');

  this.showEditImgElements = false;

  this.editImage = function(){
    $log.debug('profileImgCtrl.editImage()');
    this.showEditImgElements = !this.showEditImgElements;
  };

  this.uploadImg = function(){
    imgService.uploadImg(this.profile, this.img)
    .then( () => this.editImage());
  };

};
