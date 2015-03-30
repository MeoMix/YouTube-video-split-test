define(function(require) {
    'use strict';
    
    var StreamusMediaSource = require('foreground/model/streamusMediaSource');
    var PlayerState = require('common/enum/playerState');
    
    var VideoView = Marionette.ItemView.extend({
        el: '#streamusVideo',
        
        mediaSource: null,
        player: null,
        
        playerEvents: {
            'change:state': '_onPlayerChangeState',
            'change:loadedSong': '_onPlayerChangeLoadedSong',
            'receive:currentTimeHighPrecision': '_onPlayerReceiveCurrentTimeHighPrecision'
        },
        
        mediaSourceEvents: {
            'change:objectURL': '_onMediaSourceChangeObjectURL'
        },
        
        initialize: function() {
            this.mediaSource = new StreamusMediaSource();
            this.player = chrome.extension.getBackgroundPage().player;

            this.bindEntityEvents(this.player, this.playerEvents);
            this.bindEntityEvents(this.mediaSource, this.mediaSourceEvents);

            //  Bind pre-emptively to preserve the function reference. Allows for calling removeEventListener if needed.
            this._onWindowUnload = this._onWindowUnload.bind(this);
            window.addEventListener('unload', this._onWindowUnload);

            this.mediaSource.attachBuffer();
            this._ensureInitialState(this.player.get('state'));
        },
        
        _onPlayerChangeState: function(model, state) {
            this._syncState(state);
        },

        _onPlayerChangeLoadedSong: function() {
            this._reset();
        },
        
        _onPlayerReceiveCurrentTimeHighPrecision: function(model, message) {
            var currentTimeHighPrecision = message.currentTimeHighPrecision;
            
            //  If the player is playing then currentTimeHighPrecision will be slightly out-of-sync due to the time it takes to request
            //  the information. So, subtract an offset of the time it took to receive the message.
            if (model.get('state') === PlayerState.Playing) {
                var offset = Date.now() - message.timestamp;
                currentTimeHighPrecision -= offset * .001;
            }
            
            this.el.currentTime = currentTimeHighPrecision;
        },

        _onMediaSourceChangeObjectURL: function(model, objectURL) {
            this._setVideoSrc(objectURL);
        },

        _onWindowUnload: function() {
            //  TODO: I feel like I shouldn't have to call this because if the foreground is destroyed then everything should be cleaned up.
            //  However, due to a memory leak in Chrome, https://code.google.com/p/chromium/issues/detail?id=441500, this is needed. Review once Chrome 42 is standard.
            this.mediaSource.detachBuffer();
            this.stopListening();
        },

        //  Whenever a video is created its time/state might not be synced with an existing video.
        _ensureInitialState: function(playerState) {
            this._syncCurrentTime();
            this._syncState(playerState);
        },

        _setVideoSrc: function(objectURL) {
            var videoSrc = objectURL === null ? '' : objectURL;
            this.el.src = videoSrc;
        },

        _play: function() {
            //  It's important to call syncCurrentTime when beginning playback because there's a slight delay between
            //  when the video in the background begins playback and the foreground video.
            this._syncCurrentTime();
            
            this.el.play();
        },

        _pause: function() {
            this.el.pause();
        },

        _reset: function() {
            this.mediaSource.detachBuffer();
            this.mediaSource.attachBuffer();
        },

        _syncCurrentTime: function() {
            //  It's important to specifically ask the player for the currentTime because this will give 100% accurate result.
            //  Otherwise, can only get within ~200ms by responding to the 'timeupdate' event of the other video. 
            this.player.updateCurrentTimeHighPrecision();
        },

        _syncState: function(playerState) {
            if (playerState === PlayerState.Playing) {
                this._play();
            } else {
                this._pause();
            }
        }
    });

    return VideoView;
});