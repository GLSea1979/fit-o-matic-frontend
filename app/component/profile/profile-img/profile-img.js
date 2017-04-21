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


  this.uploadImg = function(){
    imgService.uploadImg(this.profile, this.img);
  };
}

