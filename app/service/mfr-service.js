'use strict';

module.exports = ['$log', '$q', '$http', 'authService', mfrService];

function mfrService($log, $q, $http, authService) {
  $log.debug('mfrService');

  let service = {};
  service.mfrs = [];

  service.fetchAllMfrs = function() {
    $log.debug('mfrService.fetchMfrs');

    // TODO: add fetch all route...
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfrs`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      if(res.status === 204){
        $log.debug(res.status);
      }
      if(res.data) service.mfrs = res.data;
      return service.mfrs;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchMfr = function(mfrID) {
    $log.debug('mfrService.fetchMfr');
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
    $log.debug('mfrService.updateMfr');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/mfr/${mfrID}`;
      let config = {
        headers: {
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
    });
  };

  service.createMfr = function(mfrData){
      $log.debug('mfrService.createMfr');

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
          $log.debug(res.data, '<--- just the data');
          $log.debug(service.mfrs, '<-- array of mfrs');
          return service.mfrs.unshift(res.data);
      })
      .catch( err => {
          $log.error(err.message);

          return $q.reject(err);
      })
  };

  service.deleteMfr = function(mfrID){
      $log.debug('mfrService.deleteMfr');

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
