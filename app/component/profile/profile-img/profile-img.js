'use strict';

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

//todo pull profile and image info into object to pass


  this.uploadImg = function(){
    imgService.uploadImg(this.profile, this.img)
  .then( res => {
        $log.debug('--------',res)
    this.profile.imageURI = res.data.imageURI;
  });
  };
}

