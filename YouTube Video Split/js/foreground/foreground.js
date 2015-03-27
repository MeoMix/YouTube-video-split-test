define(function(require) {
    'use strict';
    
    var player = chrome.extension.getBackgroundPage().player;
    
    var StreamusVideo = require('foreground/model/streamusVideo');
    var streamusVideo = new StreamusVideo({
        player: player
    });

    $('#playButton').click(function() {
        player.play();
    });

    $('#pauseButton').click(function() {
        player.pause();
    });

    $('#loadFirstVideo').click(function() {
        player.set('playOnActivate', true);
        player.activateSong(new Backbone.Model({
            id: 'yEitrZU-nCw'
        }));
    });

    $('#loadSecondVideo').click(function() {
        player.set('playOnActivate', true);
        player.activateSong(new Backbone.Model({
            id: '6od4WeaWDcs'
        }));
    });
});