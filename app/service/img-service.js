'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', imgService];

function imgService($log, $q, $http, Upload, authService){
  $log.debug('imgService');
  let service = {};

  service.uploadImg = function(profile, imgData){
    $log.debug('imgService.uploadImg', profile, imgData);

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/photo/${profile._id}`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
      Upload.upload({
        url,
        headers,
        method: 'PUT',
        data: {
          image: imgData.file
        }
      })
      .then( res => {
        profile.photoURI = res.data.photoURI;
      })
      .catch( err => {
        $log.error(err);
        return $q.reject(err);
      });
    });
  };
  return service;
}

