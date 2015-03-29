define(function(require) {
    'use strict';
    
    var StreamusMediaSource = require('foreground/model/streamusMediaSource');
    var PlayerState = require('common/enum/playerState');

    var StreamusVideo = Backbone.Model.extend({
        defaults: {
            video: null,
            mediaSource: null,
            player: null
        },

        initialize: function() {
            //  TODO: Should this be a view or something?
            this.set('video', document.getElementById('streamusVideo'));
            this.set('mediaSource', new StreamusMediaSource());

            //  TODO: I feel like I shouldn't have to call this because if the foreground is destroyed then everything should be cleaned up.
            //  However, due to a memory leak in Chrome, https://code.google.com/p/chromium/issues/detail?id=441500, this is needed. Review once Chrome 42 is standard.
            this._onWindowUnload = this._onWindowUnload.bind(this);
            window.addEventListener('onunload', this._onWindowUnload);

            var player = this.get('player');
            this.listenTo(player, 'change:state', this._onPlayerChangeState);
            this.listenTo(player, 'change:loadedSong', this._onPlayerChangeLoadedSong);
            
            this._setSrc();
            this._ensureInitialState();
        },
        
        play: function() {
            //  It's important to call syncCurrentTime when beginning playback because there's a slight delay between
            //  when the video in the background begins playback and the foreground video.
            this._syncCurrentTime();
            this.get('video').play();
        },
        
        pause: function() {
            this.get('video').pause();
        },
        
        reset: function() {
            this.pause();
            this.get('mediaSource').detachBuffer();
            this.get('mediaSource').attachBuffer();

            this._setSrc();
        },
        
        _onWindowUnload: function() {
            this.get('mediaSource').detachBuffer();
        },
        
        //  Whenever a video is created its time/state might not be synced with an existing video.
        _ensureInitialState: function() {
            this._syncCurrentTime();
            
            var player = this.get('player');
            this._syncState(player.get('state'));
        },
        
        _setSrc: function() {
            this.get('video').src = this.get('mediaSource').getObjectURL();
        },
        
        _onPlayerChangeState: function(model, state) {
            this._syncState(state);
        },
        
        _onPlayerChangeLoadedSong: function() {
            this.reset();
        },
        
        _syncCurrentTime: function() {
            var player = this.get('player');
            //  It's important to specifically ask the player for the currentTime because this will give 100% accurate result.
            //  Otherwise, can only get within ~200ms by responding to the 'timeupdate' event of the other video. 
            this.listenToOnce(player, 'change:currentTimeHighPrecision', function(model, currentTimeHighPrecision) {
                this.get('video').currentTime = currentTimeHighPrecision;
            });
            player.getCurrentTimeHighPrecision();
        },
        
        _syncState: function(playerState) {
            if (playerState === PlayerState.Playing) {
                this.play();
            } else {
                this.pause();
            }
        }
    });

    return StreamusVideo;
});