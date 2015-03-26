define(function(require) {
    'use strict';

    var StreamusVideo = require('foreground/model/streamusVideo');
    var streamusVideo = new StreamusVideo();
    
    var backgroundPage = chrome.extension.getBackgroundPage();
    var backgroundVideo = backgroundPage.video;

    if (backgroundVideo.paused) {
        streamusVideo.setCurrentTime(backgroundVideo.currentTime);
    } else {
        streamusVideo.play(backgroundVideo.currentTime);
    }

    $('#playButton').click(function() {
        backgroundPage.play();
        streamusVideo.play(backgroundVideo.currentTime);
    });

    $('#pauseButton').click(function() {
        backgroundPage.pause();
        streamusVideo.pause();
    });

    $('#loadFirstVideo').click(function() {
        streamusVideo.reset();
        backgroundPage.loadVideoById('yEitrZU-nCw');
        streamusVideo.play(0);
    });

    $('#loadSecondVideo').click(function() {
        streamusVideo.reset();
        backgroundPage.loadVideoById('jjx2oc2NRzA');
        streamusVideo.play(0);
    });
});