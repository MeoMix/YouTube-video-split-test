define(function(require) {
    'use strict';

    var StreamusMediaSource = require('model/streamusMediaSource');

    var StreamusVideo = Backbone.Model.extend({
        defaults: {
            video: null,
            mediaSource: null
        },

        initialize: function() {
            //  TODO: Should this be a view or something?
            this.set('video', document.getElementById('streamusVideo'));
            this.set('mediaSource', new StreamusMediaSource());

            //  TODO: Unbind this when removing a Video.
            //  TODO: Does the fact that I need to call this mean I have a memory leak?
            window.onunload = this._onWindowUnload.bind(this);
            //  TODO: This is a slow, blocking operation. setTimeout to allow the page to open smoothly.
            setTimeout(this._setSrc.bind(this));
        },
        
        play: function(currentTime) {
            this.setCurrentTime(currentTime);
            this.get('video').play();
        },
        
        setCurrentTime: function(currentTime) {
            this.get('video').currentTime = currentTime;
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
        }
    });

    return StreamusVideo;
});