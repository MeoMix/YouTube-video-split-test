define(function(require) {
    'use strict';

    var StreamusSourceBuffer = require('model/streamusSourceBuffer');

    var StreamusMediaSource = Backbone.Model.extend({
        defaults: {
            source: null,
            sourceBuffer: null,
            sourceObjectURL: null
        },
        
        initialize: function() {
            var source = new window.MediaSource();
            this.set('source', source);

            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._onSourceOpen = this._onSourceOpen.bind(this);
            this._onSourceClose = this._onSourceClose.bind(this);
            this._onSourceEnded = this._onSourceEnded.bind(this);
            this._onSourceError = this._onSourceError.bind(this);

            source.addEventListener('sourceopen', this._onSourceOpen);
            source.addEventListener('sourceclose', this._onSourceClose);
            source.addEventListener('sourceended', this._onSourceEnded);
            source.addEventListener('error', this._onSourceError);

            this.attachBuffer();
        },
        
        attachBuffer: function() {
            if (this.get('sourceBuffer') === null) {
                this.set('sourceBuffer', new StreamusSourceBuffer());
            } else {
                console.error('sourceBuffer is already attached');
            }
        },

        detachBuffer: function() {
            //  removeSourceBuffer needs to be called before detach because detach sets sourceBuffer to null.
            this.get('source').removeSourceBuffer(this.get('sourceBuffer').get('buffer'));
            this.get('sourceBuffer').detach();
            this.set('sourceBuffer', null);
        },

        getObjectURL: function() {
            //  Cache the URL
            if (this.get('sourceObjectURL') === null) {
                this.set('sourceObjectURL', window.URL.createObjectURL(this.get('source')));
            }

            return this.get('sourceObjectURL');
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
        },

        _onSourceError: function() {
            console.error('error');
        }
    });

    return StreamusMediaSource;
});