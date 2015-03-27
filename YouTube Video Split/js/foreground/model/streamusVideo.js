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

            //  TODO: Unbind this when removing a Video.
            //  TODO: Does the fact that I need to call this mean I have a memory leak?
            window.onunload = this._onWindowUnload.bind(this);

            var player = this.get('player');
            //  TODO: This is a slow, blocking operation. setTimeout to allow the page to open smoothly.
            setTimeout(function() {
                this._setSrc();
                this._syncState(player.get('state'), player.get('currentTimeHighPrecision'));
            }.bind(this));
            
            this.listenTo(player, 'change:state', this._onPlayerChangeState);
            this.listenTo(player, 'change:loadedSong', this._onPlayerChangeLoadedSong);
        },
        
        play: function(currentTimeHighPrecision) {
            this.setCurrentTime(currentTimeHighPrecision);
            this.get('video').play();
        },
        
        setCurrentTime: function(currentTimeHighPrecision) {
            this.get('video').currentTime = currentTimeHighPrecision;
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
        
        _setSrc: function() {
            this.get('video').src = this.get('mediaSource').getObjectURL();
        },
        
        _onPlayerChangeState: function(model, state) {
            this._syncState(state, model.get('currentTimeHighPrecision'));
        },
        
        _onPlayerChangeLoadedSong: function(model, loadedSong) {
            this.reset();
        },
        
        _syncState: function(playerState, playerCurrentTimeHighPrecision) {
            //  TODO: Should I be playing even if it's just buffering? Tricky.
            if (playerState === PlayerState.Playing || playerState === PlayerState.Buffering) {
                this.play(playerCurrentTimeHighPrecision);
            } else {
                console.log('pausing, playerCurrentTimeHighPrecision:', playerCurrentTimeHighPrecision);
                this.setCurrentTime(playerCurrentTimeHighPrecision);
                this.pause();
            }
        }
    });

    return StreamusVideo;
});