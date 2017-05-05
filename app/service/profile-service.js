/* global __API_URL__ */
'use strict';

module.exports = ['$log', '$q', '$http', '$window', 'authService', profileService];

function profileService($log, $q, $http, $window, authService){
  $log.debug('profileService');
  let service = {};
  let url = `${__API_URL__}`;


  service.fetchProfile = function(){
    $log.debug('profileService.fetchProfile');
    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      let userID = $window.localStorage.userID;
      return $http.get(`${url}/api/profile/${userID}`, config)
      .then( res => {
        $log.debug(res, 'examine props on this');
        return res;
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  service.fetchAllProfiles = function(){
    $log.debug('profileService.fetchAllProfiles');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      return $http.get(`${url}/api/all/profile`, config)
      .then( profiles => {
        $log.debug(profiles, '<-- profiles');
        return profiles;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    });
  };

  service.updateProfile = function(profileID, profileData){
    $log.debug('profileService.updateProfile');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      return $http.put(`${url}/api/profile/${profileID}`, profileData, config)
      .then ( res => {
        return res;
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    });
  };
  service.fetchFavorites = function(){
    $log.debug('profileService.fetchFavorites');
    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      let userID = $window.localStorage.userID;
      return $http.get(`${url}/api/favorites/profile/${userID}`, config)
      .then( res => {
        return res;
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    });
  };
  service.updateFavorites = function(profile){
    $log.debug('profileService.updateFavorite');

    return authService.getToken()
    .then( token => {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      return $http.put(`${url}/api/favorites/profile/${profile._id}`, profile, config)
      .then ( res => {
        service.favorites=res;
        return res;
      })
      .catch( err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    });
  };
  return service;
}
