define(function(require) {
  'use strict';

  var PlayerState = require('common/enum/playerState');
  var YouTubePlayerState = require('common/enum/youTubePlayerState');

  var Player = Backbone.Model.extend({
    defaults: function() {
      return {
        //  Returns the elapsed time of the currently loaded song. Returns 0 if no song is playing
        currentTime: 0,
        //  API will fire a 'ready' event after initialization which indicates the player can now respond accept commands
        ready: false,
        state: PlayerState.Unstarted,
        //  This will be set after the player is ready and can communicate its true value.
        //  Default to 50 because having the music on and audible, but not blasting, seems like the best default if we fail for some reason.
        volume: 50,
        loadedSong: null,
        iframePort: null,
        buffers: [],
        bufferType: '',
        songToActivate: null,
        youTubePlayer: null
      };
    },

    //  Initialize the player by creating a YouTube Player IFrame hosting an HTML5 player
    initialize: function() {
      this.on('change:ready', this._onChangeReady);

      this.listenTo(this.get('youTubePlayer'), 'change:ready', this._onYouTubePlayerChangeReady);
      this.listenTo(this.get('youTubePlayer'), 'change:state', this._onYouTubePlayerChangeState);

      window.addEventListener('message', this._onWindowMessage.bind(this));
      chrome.runtime.onConnect.addListener(this._onChromeRuntimeConnect.bind(this));

      this._ensureInitialState();
    },

    activateSong: function(song, timeInSeconds) {
      if (this.get('ready')) {
        var playerState = this.get('state');
        var playOnActivate = this.get('playOnActivate');

        var videoOptions = {
          videoId: song.get('id'),
          startSeconds: timeInSeconds || 0
        };

        this._resetMetaData();

        if (playOnActivate || playerState === PlayerState.Playing || playerState === PlayerState.Buffering) {
          this.get('youTubePlayer').loadVideoById(videoOptions);
        } else {
          this.get('youTubePlayer').cueVideoById(videoOptions);
        }

        this.set({
          loadedSong: song,
          //  It's helpful to keep currentTime set here because the progress bar in foreground might be visually set,
          //  but until the song actually loads -- current time isn't set.
          currentTime: timeInSeconds || 0,
          playOnActivate: false,
          songToActivate: null
        });
      } else {
        this.set('songToActivate', song);
      }
    },

    pause: function() {
      if (this.get('youTubePlayer').get('ready')) {
        this.get('youTubePlayer').pause();
      }
    },

    play: function() {
      if (this.get('youTubePlayer').get('ready')) {
        this.get('youTubePlayer').play();
      } else {
        this.set('playOnActivate', true);
        this.get('youTubePlayer').preload();
      }
    },

    //  Ensure that the initial state of the player properly reflects the state of its APIs
    _ensureInitialState: function() {
      this.set('ready', this.get('youTubePlayer').get('ready'));
    },

    _onChangeReady: function(model, ready) {
      if (ready) {
        this.get('youTubePlayer').setVolume(this.get('volume'));
      }
    },

    _onChromeRuntimeConnect: function(port) {
      if (port.name === 'youTubeIFrameConnectRequest') {
        this.set('iframePort', port);
        port.onMessage.addListener(this._onYouTubeIFrameMessage.bind(this));
      }
    },

    _onYouTubeIFrameMessage: function(message) {
      if (!_.isUndefined(message.currentTimeHighPrecision)) {
        this.trigger('receive:currentTimeHighPrecision', this, message);
      }
    },

    _onYouTubePlayerChangeReady: function(model, ready) {
      this.set('ready', ready);
    },

    _onYouTubePlayerChangeState: function(model, youTubePlayerState) {
      var playerState = this._getPlayerState(youTubePlayerState);
      this.set('state', playerState);
    },

    _onWindowMessage: function(message) {
      //  When receiving a message of buffer data from YouTube's API, store it.
      if (message.data && message.data.buffer) {
        this.get('buffers').push(message.data.buffer);
        this.set('bufferType', message.data.bufferType);
      }
    },

    //  Maps a YouTubePlayerState enumeration value to the corresponding PlayerState enumeration value.
    _getPlayerState: function(youTubePlayerState) {
      var playerState;

      switch (youTubePlayerState) {
        case YouTubePlayerState.Unstarted:
          playerState = PlayerState.Unstarted;
          break;
        case YouTubePlayerState.Ended:
          playerState = PlayerState.Ended;
          break;
        case YouTubePlayerState.Playing:
          playerState = PlayerState.Playing;
          break;
        case YouTubePlayerState.Paused:
          playerState = PlayerState.Paused;
          break;
        case YouTubePlayerState.Buffering:
          playerState = PlayerState.Buffering;
          break;
        case YouTubePlayerState.SongCued:
          playerState = PlayerState.SongCued;
          break;
        default:
          throw new Error('Unmapped YouTubePlayerState:' + youTubePlayerState);
      }

      return playerState;
    },

    //  Some video information is stored on YouTubePlayer for a per-video basis
    //  This information should be discarded whenever the video changes.
    _resetMetaData: function() {
      this.get('buffers').length = 0;
      //  NOTE: It's technically possible to squeeze a bit of extra performance out of MediaSource by not clearing bufferType here.
      //  Instead, one could keep track of the 'lastKnownBufferType' and only call addSourceBuffer when the bufferType changes.
      //  HOWEVER, knowledge of a video's bufferType arrives after the 'loadedVideoId' event fires. This leads to complications where a 
      //  MediaSource attempts to use one bufferType for a video only to find out that the bufferType is incorrect a moment later.
      //  So, I'm clearing the bufferType every time the video changes to prevent this confusion, but at the cost of a small perf. hit.
      this.set('bufferType', '');
    },

    //  Send a message to YouTube's iframe to figure out what the current time is of the video element inside of the iframe.
    requestCurrentTimeHighPrecision: function() {
      var iframePort = this.get('iframePort');
      iframePort.postMessage('getCurrentTimeHighPrecision');
    }
  });

  return Player;
});