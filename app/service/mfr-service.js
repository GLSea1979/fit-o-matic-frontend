'use strict';

module.exports = ['$log', '$q', '$http', 'authService', adminService];

function adminService($log, $q, $http, authService) {
  $log.debug('adminService');

  let service = {};
  let service.mfrs = [];

  service.fetchAllMfrs = function() {
    $log.debug('adminService.fetchMfrs');

    // TODO: add fetch all route...
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.debug('MFRs are retrieved!!!');
      //todo check that this works
      if(res.status === 204){
          $log.debug(res.status, ' ---> no mfrs returned');
      }
      service.mfrs = res.data;
      return service.mfrs;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchMfr = function(mfrID) {
    $log.debug('adminService.fetchMfr');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr/${mfrID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.debug('MFR is here!!!');

      service.mfr = res.data;
      return service.mfr;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateMfr = function(mfrID, mfrData){
      $log.debug('adminService.updateMfr');

      return authService.getToken()
      .then( token => {
          let url = `${__API_URL__}/api/mfr/${mfrID}`;
          let config = {
              header: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          };
          return $http.put(url, mfrData,config);
      })
      .then( res => {
          $log.debug('mfr has been updated with:', res);

          return service.mrf = res.data;
      })
      .catch( err => {
          $log.error(err.message);
          return $q.reject(err);
      })
  };

  service.createMfr = function(mfrData){
      $log.debug('adminService.createMfr');

      return authService.getToken()
      .then( token => {
          let url = `${__API_URL__}/api/mfr`;
          let config = {
              headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          };
          return $http.post(url, mfrData, config);
      })
      .then( res => {
          $log.debug('mfr created mrfkr');

          service.mfrs.unshift(res.data);
      })
      .catch( err => {
          $log.error(err.message);

          return $q.reject(err);
      })
  };

  service.deleteMfr = function(mfrID){
      $log.debug('adminService.deleteMfr');

      return service.getToken()
      .then( token => {
          let url = `${__API_URL__}/api/mfr/${mfrID}`;
          let config = {
              headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
              }
          }
          return $http.delete(url, config);
      })
      .then( res => {
          $log.debug('yoyoyo we got a res here--->', res.status);

          service.mfrs.forEach( (item, idx) => {
              if(item._id === mfrID){
                  service.mfrs.splice(idx, 1);
              }
          });
        return res.data;
    })
    .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
    });
};

  return service;
}
