define(function(require) {
    'use strict';

    var StreamusSourceBuffer = require('foreground/model/streamusSourceBuffer');
    var MediaSourceReadyState = require('common/enum/mediaSourceReadyState');

    var StreamusMediaSource = Backbone.Model.extend({
        defaults: function() {
            return {
                source: new window.MediaSource(),
                readyState: MediaSourceReadyState.Closed,
                //  The video encoding format and codec used to render source; i.e. video/webm codecs="vp9"
                bufferType: '',
                sourceBuffer: null,
                objectURL: null     
            };
        },
        
        initialize: function () {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._onSourceOpen = this._onSourceOpen.bind(this);
            this._onSourceClose = this._onSourceClose.bind(this);
            this._onSourceEnded = this._onSourceEnded.bind(this);

            var source = this.get('source');
            source.addEventListener('sourceopen', this._onSourceOpen);
            source.addEventListener('sourceclose', this._onSourceClose);
            source.addEventListener('sourceended', this._onSourceEnded);

            this.on('change:bufferType', this._onChangeBufferType);
        },

        _onChangeBufferType: function (model, bufferType) {
            this._setBuffer(bufferType);
        },

        //  _source.readyState has transitioned from 'closed' to 'open' or from 'ended' to 'open'
        _onSourceOpen: function () {
            this.set('readyState', MediaSourceReadyState.Open);
            this._attachBuffer();
        },

        //  _source.readyState has transitioned from 'open' to 'closed' or from 'ended' to 'closed'
        _onSourceClose: function () {
            this.set('readyState', MediaSourceReadyState.Closed);
            this._detachBuffer();
        },

        //  _source.readyState has transitioned from 'open' to 'ended'
        _onSourceEnded: function () {
            this.set('readyState', MediaSourceReadyState.Ended);
            this._detachBuffer();
        },

        //  If a bufferType is known then create a sourceBuffer which will expect content encoded with that bufferType.
        //  Otherwise, clean-up any existing buffer since no content is expected.
        _setBuffer: function (bufferType) {
            if (bufferType === '') {
                this._destroyBuffer();
            } else {
                this._createBuffer();
            }
        },

        //  Creating a buffer mostly consists of setting the objectURL of the source.
        //  Once that is set, the source will transition to the 'open' state and the buffer will become usable.
        _createBuffer: function () {
            if (this.get('sourceBuffer') === null) {
                this.set({
                    sourceBuffer: new StreamusSourceBuffer(),
                    //  Recreate objectURL whenever sourceBuffer is modified or video won't start properly.
                    objectURL: window.URL.createObjectURL(this.get('source'))
                });
            } else {
                console.error('sourceBuffer already created');
            }
        },

        //  Destroying a buffer means cleaning up the existing buffer from the source and clearing the objectURL.
        //  When the objectURL is cleared the source will transition to the 'closed' state and become unusable.
        _destroyBuffer: function () {
            var sourceBuffer = this.get('sourceBuffer');

            if (sourceBuffer !== null) {
                this.get('source').removeSourceBuffer(sourceBuffer.get('buffer'));
                //  Setting objectURL to null will cause _onSourceClose to fire because the video element's src is cleared.
                this.set('objectURL', null);
            } else {
                console.error('sourceBuffer already destroyed');
            }
        },

        //  Only attach a buffer to a MediaSource which is 'open'
        _attachBuffer: function() {
            var buffer = this.get('source').addSourceBuffer(this.get('bufferType'));
            this.get('sourceBuffer').attach(buffer);
        },

        //  Only detach a buffer from a MediaSource which is 'closed' or 'ended'.
        _detachBuffer: function() {
            this.get('sourceBuffer').detach();
            this.set('sourceBuffer', null);
        }
    });

    return StreamusMediaSource;
});