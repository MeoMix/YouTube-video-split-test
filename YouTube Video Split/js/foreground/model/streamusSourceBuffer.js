define(function() {
    'use strict';

    var StreamusSourceBuffer = Backbone.Model.extend({
        defaults: function () {
            return {
                buffer: null,
                appendedBufferCount: 0,
                //  Buffered data which has already been leveraged by YouTube is cached on the background page and re-used as needed.
                playerBuffers: chrome.extension.getBackgroundPage().player.get('buffers')
            };
        },
        
        initialize: function () {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._observeHandler = this._observeHandler.bind(this);
            this._onUpdate = this._onUpdate.bind(this);
            this._onWindowUnload = this._onWindowUnload.bind(this);
            window.addEventListener('unload', this._onWindowUnload);
        },
        
        attach: function (sourceBuffer) {
            this.set('buffer', sourceBuffer);
            sourceBuffer.addEventListener('update', this._onUpdate);
            this._tryAppendBuffer();
        },

        detach: function() {
            this.get('buffer').removeEventListener('update', this._onUpdate);
            Array.unobserve(this.get('playerBuffers'), this._observeHandler);
            this.set('buffer', null);
        },

        _onUpdate: function () {
            this._tryAppendBuffer();
        },

        _onWindowUnload: function () {
            //  It's important to call unobserve on playerBuffers because playerBuffers originates from the background page.
            //  Without this, a memory leak is formed and _observeHandler can fire without an existing foreground page.
            Array.unobserve(this.get('playerBuffers'), this._observeHandler);
        },

        //  TODO: It feels weird that this is called tryAppendBuffer when appendBuffer might fail, too.
        //  Make an attempt at appending buffer data, or, if no data is ready, setup an intent to append buffer data in the future.
        _tryAppendBuffer: function() {
            var playerBuffers = this.get('playerBuffers');
            
            //  If more data has been loaded then go ahead and append it. Otherwise, wait for the data to come in.
            if (playerBuffers.length > this.get('appendedBufferCount')) {
                this._appendBuffer();
            } else {
                Array.observe(playerBuffers, this._observeHandler);
            }
        },

        //  Append data to the buffer and keep track of how many buffers have been loaded so that
        //  the buffer chunks are loaded in the correct order.
        _appendBuffer: function() {
            if (this._canAppendBuffer()) {
                var appendedBufferCount = this.get('appendedBufferCount');
                var playerBuffers = this.get('playerBuffers');

                this.get('buffer').appendBuffer(playerBuffers[appendedBufferCount]);
                this.set('appendedBufferCount', appendedBufferCount + 1);
            }
        },

        //  Sometimes the buffer is busy appending data and will throw an error if given more data
        _canAppendBuffer: function () {
            return !this.get('buffer').updating;
        },

        //  TODO: I don't like the name of this function.
        //  This callback will run whenever the playerBuffers Array announces that changes have been made to it.
        //  The only announcement expected is for elements to be added or removed from it. When buffers are added they can be utilized.
        _observeHandler: function() {
            //  When playerBuffers announces that it has more data loaded - use it.
            var playerBuffers = this.get('playerBuffers');
            //  TODO: I don't think that this is quite right. It technically works, but playerBuffers length is always >0, but might not be >= appendedBufferCount which is what is needed.
            if (playerBuffers.length > 0) {
                Array.unobserve(playerBuffers, this._observeHandler);
                this._appendBuffer();
            }
        }
    });

    return StreamusSourceBuffer;
});