define(function(require) {
  'use strict';

  var YouTubePlayerAPI = require('background/model/youTubePlayerAPI');

  //  This is the actual YouTube Player API widget housed within the iframe.
  var youTubePlayerWidget = null;

  var YouTubePlayer = Backbone.Model.extend({
    defaults: function() {
      return {
        ready: false,
        loading: false,
        api: new YouTubePlayerAPI(),
        iframeId: '',
        loadAttemptInterval: null
      };
    },

    initialize: function() {
      this.listenTo(this.get('api'), 'change:ready', this._onApiChangeReady);
    },

    //  Preload is used to indicate that an attempt to load YouTube's API is hopefully going to come soon. However, if the iframe
    //  holding YouTube's API fails to load then load will not be called. If the iframe does load successfully then load will be called.
    preload: function() {
      if (!this.get('loading')) {
        //  Ensure the widget is null for debugging purposes. 
        //  Being able to tell the difference between a widget API method failing and the widget itself not being ready is important.
        youTubePlayerWidget = null;
        //  It is important to set loading after ready because having the player be both 'loading' and 'ready' does not make sense.
        this.set('ready', false);
        this.set('loading', true);
      }
    },

    //  Loading a widget requires the widget's API be ready first. Ensure that the API is loaded
    //  otherwise defer loading a widget until the API is ready.
    load: function() {
      var api = this.get('api');

      if (api.get('ready')) {
        this._loadWidget();
      } else {
        api.load();
      }
    },

    pause: function() {
      youTubePlayerWidget.pauseVideo();
    },

    play: function() {
      youTubePlayerWidget.playVideo();
    },

    setVolume: function(volume) {
      youTubePlayerWidget.setVolume(volume);
    },

    loadVideoById: function(videoOptions) {
      youTubePlayerWidget.loadVideoById(videoOptions);
    },

    cueVideoById: function(videoOptions) {
      youTubePlayerWidget.cueVideoById(videoOptions);
    },

    _loadWidget: function() {
      var iframeId = this.get('iframeId');
      //  YouTube's API creates the window.YT object with which widgets can be created.
      //  https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
      youTubePlayerWidget = new window.YT.Player(iframeId, {
        events: {
          onReady: this._onYouTubePlayerReady.bind(this),
          onStateChange: this._onYouTubePlayerStateChange.bind(this),
          onError: this._onYouTubePlayerError.bind(this)
        }
      });
    },

    _onYouTubePlayerReady: function() {
      //  It's important to set ready to true before loading to false otherwise it looks like YouTubePlayer failed to load properly.
      this.set('ready', true);
      this.set('loading', false);
    },

    _onYouTubePlayerStateChange: function(state) {
      //  Pass 'this' as the first parameter to match the event signature of a Backbone.Model change event.
      this.trigger('change:state', this, state.data);
    },

    _onYouTubePlayerError: function(error) {
      console.error('Error:', error);
    },

    _onApiChangeReady: function(model, ready) {
      if (ready) {
        this._loadWidget();
      }
    }
  });

  return YouTubePlayer;
});