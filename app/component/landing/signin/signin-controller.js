'use strict';

require('./_signin.scss');

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', signinController],
  contrllerAs: 'signinCtrl'
}

function signinController($log){

};