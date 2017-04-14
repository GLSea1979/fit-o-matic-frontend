'use strict';

module.exports = ['$log', '$q', '$http', 'authService', adminService];

function adminService($log, $q, $http, authService) {
  $log.debug('adminService');

  let service = {};

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
      // TODO: add a res.status message if no mfrs are returned
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
}
