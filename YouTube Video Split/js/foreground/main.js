require.config({
  baseUrl: 'js/',
  enforceDefine: true,

  paths: {
    'backbone': 'lib/backbone',
    'backbone.marionette': 'lib/backbone.marionette',
    'jquery': 'lib/jquery',
    'lodash': 'lib/lodash'
  },

  map: {
    '*': {
      'underscore': 'lodash'
    }
  }
});

define(function(require) {
  'use strict';

  require('backbone.marionette');

  require(['foreground/foreground']);
});