define(function(require) {
    'use strict';

    var YouTubePlayer = require('background/model/youTubePlayer');
    var Player = require('background/model/player');

    var youTubePlayer = new YouTubePlayer();
    var player = new Player({
        youTubePlayer: youTubePlayer
    });

    var YouTubePlayerView = require('background/view/youTubePlayerView');
    var youTubePlayerView = new YouTubePlayerView({
        model: youTubePlayer
    });

    $('body').append(youTubePlayerView.render().el);
    youTubePlayerView.triggerMethod('show');

    youTubePlayer.preload();
    
    //  Keep a queue of all the buffers which have been used so that the foreground can utilizes these whenever it opens.
    var buffers = window.buffers = [];
    var video = window.video = document.getElementById('streamusVideo');

    var sourceBuffer;
    var queue = [];

    var mediaSource = new window.MediaSource();
    video.src = window.URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', function() {
        sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
        sourceBuffer.addEventListener('update', function() {
            if (queue.length > 0 && !sourceBuffer.updating) {
                var buffer = queue.shift();
                sourceBuffer.appendBuffer(buffer);
            }
        });
    });

    window.addEventListener('message', function(transportData) {
        console.log('transportData:', transportData);

        if (!transportData.data)
            return;

        buffers.push(transportData.data);

        if (sourceBuffer.updating || queue.length > 0) {
            queue.push(transportData.data);
        } else {
            sourceBuffer.appendBuffer(transportData.data);
        }
    });

    var playground = document.getElementById('youtube-player');
    var contentWindow = playground.contentWindow;

    window.play = function() {
        contentWindow.postMessage({
            method: 'playVideo'
        }, '*');
        video.play();
    };

    window.pause = function() {
        contentWindow.postMessage({
            method: 'pauseVideo'
        }, '*');
        video.pause();
    };

    window.loadVideoById = function(videoId) {
        buffers.length = 0;

        contentWindow.postMessage({
            method: 'loadVideoById',
            videoId: videoId
        }, '*');
    };

    setTimeout(function() {
        player.activateSong('jjx2oc2NRzA');
    }, 4000);

});