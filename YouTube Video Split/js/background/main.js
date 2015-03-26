require.config({
    baseUrl: 'js/',
    enforceDefine: true,

    paths: {
        'backbone': 'thirdParty/backbone',
        'backbone.marionette': 'thirdParty/backbone.marionette',
        'jquery': 'thirdParty/jquery',
        'lodash': 'thirdParty/lodash'
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

    require(['background/background']);
});