define(function(require) {
    'use strict';

    var YouTubePlayer = require('background/model/youTubePlayer');
    var Player = require('background/model/player');

    var youTubePlayer = new YouTubePlayer();
    window.player = new Player({
        youTubePlayer: youTubePlayer
    });

    var YouTubePlayerView = require('background/view/youTubePlayerView');
    var youTubePlayerView = new YouTubePlayerView({
        model: youTubePlayer
    });

    $('body').append(youTubePlayerView.render().el);
});