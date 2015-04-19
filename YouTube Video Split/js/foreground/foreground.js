define(function(require) {
    'use strict';

    var player = chrome.extension.getBackgroundPage().player;

    var VideoView = require('foreground/view/videoView');
    var videoView = new VideoView();

    $('#playButton').click(function() {
        player.play();
    });

    $('#pauseButton').click(function() {
        player.pause();
    });

    $('#loadFirstVideo').click(function() {
        player.set('playOnActivate', true);
        player.activateSong(new Backbone.Model({
            //  This is an mp4 video with avc1 codec
            id: '6teOmBuMxw4'
            //id: 'iaDFo7hbCKs'
        }));
    });

    $('#loadSecondVideo').click(function() {
        player.set('playOnActivate', true);
        player.activateSong(new Backbone.Model({
            id: '6od4WeaWDcs'
        }));
    });
});