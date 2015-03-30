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

        detachBuffer: function() {
            //  removeSourceBuffer needs to be called before detach because detach sets sourceBuffer to null.
            var buffer = this.get('sourceBuffer').get('buffer');
            this.get('source').removeSourceBuffer(buffer);
            this.get('sourceBuffer').detach();
            this.set('sourceBuffer', null);
            this.set('objectURL', null);
        },

        //  _source.readyState has transitioned from 'closed' to 'open' or from 'ended' to 'open'
        _onSourceOpen: function() {
            //  TODO: Is it always vp9 codec?
            var sourceBuffer = this.get('source').addSourceBuffer('video/webm; codecs="vp9"');
            this.get('sourceBuffer').attach(sourceBuffer);
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