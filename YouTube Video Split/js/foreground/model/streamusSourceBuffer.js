define(function() {
    'use strict';

    var StreamusSourceBuffer = Backbone.Model.extend({
        defaults: function() {
            return {
                buffer: null,
                appendedBufferCount: 0,
                //  Buffered data which has already been leveraged by YouTube is cached on the background page and re-used as needed.
                playerBuffers: chrome.extension.getBackgroundPage().player.get('buffers')
            };
        },

        initialize: function() {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._onObservePlayerBuffersChange = this._onObservePlayerBuffersChange.bind(this);
            this._onUpdate = this._onUpdate.bind(this);
            this._onWindowUnload = this._onWindowUnload.bind(this);
            window.addEventListener('unload', this._onWindowUnload);

            this.on('change:buffer', this._onChangeBuffer);
        },

        _onChangeBuffer: function(model, buffer) {
            if (buffer === null) {
                var previousBuffer = this.previous('buffer');

                if (previousBuffer !== null) {
                    this._stopMonitoringBuffer(previousBuffer);
                }
            } else {
                this._startMonitoringBuffer(buffer);
            }
        },

        //  _onUpdate will run whenever the sourceBuffer has successfully updated itself and is ready for more data if available.
        _onUpdate: function() {
            this._loadNextBuffer();
        },

        _onWindowUnload: function() {
            //  It's important to call unobserve on playerBuffers because playerBuffers originates from the background page.
            //  Without this, a memory leak is formed and _onObservePlayerBuffersChange can fire without an existing foreground page.
            Array.unobserve(this.get('playerBuffers'), this._onObservePlayerBuffersChange);
        },

        //  This callback will run whenever the playerBuffers Array announces that changes have been made to it.
        //  The only announcement expected is for elements to be added or removed from it. When buffers are added they can be utilized.
        _onObservePlayerBuffersChange: function() {
            Array.unobserve(this.get('playerBuffers'), this._onObservePlayerBuffersChange);
            this._loadNextBuffer();
        },

        //  Listen for a given buffer's update events and attempt to populate the buffer with data if available.
        _startMonitoringBuffer: function(buffer) {
            buffer.addEventListener('update', this._onUpdate);
            this._loadNextBuffer();
        },

        //  Stop listening for a given buffer's update events and also cancel any async requests for data which may be in progress.
        _stopMonitoringBuffer: function(buffer) {
            buffer.removeEventListener('update', this._onUpdate);
            Array.unobserve(this.get('playerBuffers'), this._onObservePlayerBuffersChange);
        },

        //  Attempt to retrieve the next buffer of data which should be rendered. If no additional data exists, or hasn't been received,
        //  return nothing.
        _getNextBuffer: function() {
            var nextBuffer = null;
            var playerBuffers = this.get('playerBuffers');
            var appendedBufferCount = this.get('appendedBufferCount');

            if (playerBuffers.length > appendedBufferCount) {
                nextBuffer = playerBuffers[appendedBufferCount];
            }

            return nextBuffer;
        },

        //  Make an attempt at appending buffer data, or, if no data is ready, setup an intent to append buffer data in the future.
        _loadNextBuffer: function() {
            var nextBuffer = this._getNextBuffer();

            //  If more data has been loaded then go ahead and append it. Otherwise, wait for the data to come in.
            if (nextBuffer === null) {
                Array.observe(this.get('playerBuffers'), this._onObservePlayerBuffersChange);
            } else {
                this._appendBuffer(nextBuffer);
            }
        },

        //  Append data to the buffer and keep track of how many buffers have been loaded so that
        //  the buffer chunks are loaded in the correct order.
        _appendBuffer: function(buffer) {
            if (this._canAppendBuffer()) {
                this.get('buffer').appendBuffer(buffer);
                this.set('appendedBufferCount', this.get('appendedBufferCount') + 1);
            }
        },

        //  Sometimes the buffer is busy appending data and will throw an error if given more data
        _canAppendBuffer: function() {
            return !this.get('buffer').updating;
        }
    });

    return StreamusSourceBuffer;
});