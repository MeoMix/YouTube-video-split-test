define(function(require) {
    'use strict';

    var StreamusSourceBuffer = require('foreground/model/streamusSourceBuffer');

    var StreamusMediaSource = Backbone.Model.extend({
        defaults: function() {
            return {
                source: new window.MediaSource(),
                sourceBuffer: null,
                objectURL: null     
            };
        },
        
        initialize: function() {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._onSourceOpen = this._onSourceOpen.bind(this);
            this._onSourceClose = this._onSourceClose.bind(this);
            this._onSourceEnded = this._onSourceEnded.bind(this);

            var source = this.get('source');
            source.addEventListener('sourceopen', this._onSourceOpen);
            source.addEventListener('sourceclose', this._onSourceClose);
            source.addEventListener('sourceended', this._onSourceEnded);

            //  TODO: very bad.
            this.listenTo(chrome.extension.getBackgroundPage().player.get('youTubePlayer'), 'change:type', this._onYouTubePlayerChangeType);
        },
        
        attachBuffer: function() {
            if (this.get('sourceBuffer') === null) {
                this.set('sourceBuffer', new StreamusSourceBuffer());
                //  It's important to regenerate the objectURL every time sourceBuffer is modified otherwise the video won't start properly.
                this.set('objectURL', window.URL.createObjectURL(this.get('source')));
            } else {
                console.error('sourceBuffer is already attached');
            }
        },

        detachBuffer: function () {
            var sourceBuffer = this.get('sourceBuffer');

            if (sourceBuffer !== null) {
                //  removeSourceBuffer needs to be called before detach because detach sets sourceBuffer to null.
                var buffer = sourceBuffer.get('buffer');
                this.get('source').removeSourceBuffer(buffer);
                sourceBuffer.detach();
                this.set('sourceBuffer', null);
                this.set('objectURL', null);
            }
        },

        _onYouTubePlayerChangeType: function (model, type) {
            //  TODO: need to ensure source is open.
            if (type !== '') {
                console.log('pow pow pow', type);
                var sourceBuffer = this.get('source').addSourceBuffer(type);
                this.get('sourceBuffer').attach(sourceBuffer);
                this.set('attached', true);
            } else {
                this.detachBuffer();
                this.set('attached', false);
            }
        },

        //  _source.readyState has transitioned from 'closed' to 'open' or from 'ended' to 'open'
        _onSourceOpen: function () {
            //var sourceBuffer = this.get('source').addSourceBuffer('video/webm; codecs="vp9"');
            //this.get('sourceBuffer').attach(sourceBuffer);
        },

        //  _source.readyState has transitioned from 'open' to 'closed' or from 'ended' to 'closed'
        _onSourceClose: function() {
            this.get('sourceBuffer').detach();
        },

        //  _source.readyState has transitioned from 'open' to 'ended'
        _onSourceEnded: function() {
            this.get('sourceBuffer').detach();
        }
    });

    return StreamusMediaSource;
});