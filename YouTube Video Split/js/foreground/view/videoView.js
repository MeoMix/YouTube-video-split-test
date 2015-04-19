define(function(require) {
    'use strict';

    var StreamusMediaSource = require('foreground/model/streamusMediaSource');
    var PlayerState = require('common/enum/playerState');

    var VideoView = Marionette.ItemView.extend({
        el: '#streamusVideo',

        mediaSource: null,
        mediaSourceEvents: {
            'change:objectURL': '_onMediaSourceChangeObjectURL'
        },

        player: null,
        playerEvents: {
            'change:state': '_onPlayerChangeState',
            'receive:currentTimeHighPrecision': '_onPlayerReceiveCurrentTimeHighPrecision',
            'change:bufferType': '_onPlayerChangeBufferType'
        },

        initialize: function () {
            this.mediaSource = new StreamusMediaSource();
            this.player = chrome.extension.getBackgroundPage().player;

            this.bindEntityEvents(this.player, this.playerEvents);
            this.bindEntityEvents(this.mediaSource, this.mediaSourceEvents);

            //  Bind pre-emptively to preserve the function reference. Allows for calling removeEventListener if needed.
            this._onWindowUnload = this._onWindowUnload.bind(this);
            window.addEventListener('unload', this._onWindowUnload);

            this._ensureInitialState(this.player.get('state'), this.player.get('bufferType'));
        },

        _onPlayerChangeState: function (player, state) {
            this._syncState(state);
        },

        _onPlayerReceiveCurrentTimeHighPrecision: function (player, message) {
            var currentTimeHighPrecision = message.currentTimeHighPrecision;

            //  If the player is playing then currentTimeHighPrecision will be slightly out-of-sync due to the time it takes to request
            //  the information. So, subtract an offset of the time it took to receive the message.
            if (player.get('state') === PlayerState.Playing) {
                var offset = Date.now() - message.timestamp;
                currentTimeHighPrecision -= offset * .001;
            }

            this.el.currentTime = currentTimeHighPrecision;
        },

        _onMediaSourceChangeObjectURL: function(mediaSource, objectURL) {
            this._setVideoSrc(objectURL);
        },

        _onPlayerChangeBufferType: function (player, bufferType) {
            this.mediaSource.set('bufferType', bufferType);
        },

        _onWindowUnload: function() {
            this.stopListening();
        },

        //  Whenever a video is created its time/state might not be synced with an existing video.
        _ensureInitialState: function (playerState, playerBufferType) {
            //  TODO: It's worth considering having mediaSource set this value itself rather than videoView, but then it would couple mediaSource and player together..
            this.mediaSource.set('bufferType', playerBufferType);
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