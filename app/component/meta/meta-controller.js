'use strict';

module.exports = {
  template: require('./meta.html'),
  controller: ['$log', MetaController],
  controllerAs: 'metaCtrl'
};

function MetaController($log) {
  $log.debug('MetaController');

  this.tags = [
    {
      rel: 'apple-touch-icon',
      sizes:'57x57'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'60x60'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'72x72'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'76x76'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'114x114'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'120x120'
    },    {
      rel: 'apple-touch-icon',
      sizes:'144x144'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'152x152'
    },
    {
      rel: 'apple-touch-icon',
      sizes:'180x180'
    },



  ];
}



