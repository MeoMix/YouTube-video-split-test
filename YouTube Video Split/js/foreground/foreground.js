define(function(require) {
  'use strict';

  var VideoView = require('foreground/view/videoView');
  var videoView = new VideoView();
  var player = chrome.extension.getBackgroundPage().player;

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
    }));
  });

  $('#loadSecondVideo').click(function() {
    player.set('playOnActivate', true);
    player.activateSong(new Backbone.Model({
      //  This is a webm video with vp9 codec
      id: '6od4WeaWDcs'
    }));
  });
});