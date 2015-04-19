define(function() {
    'use strict';

    var StreamusSourceBuffer = Backbone.Model.extend({
        defaults: function () {
            chrome.extension.getBackgroundPage().console.log('extra');
            return {
                buffer: null,
                appendedBufferCount: 0,
                //  SourceBuffer can only be appended when its parent's MediaSource allows it.
                attached: false,
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
            if (!this.get('attached')) {
                this.set({
                    buffer: sourceBuffer,
                    attached: true
                });

                sourceBuffer.addEventListener('update', this._onUpdate);
                this._tryAppendBuffer();
            } else {
                console.error('Already attached');
            }
        },

        detach: function() {
            if (this.get('attached')) {
                this.get('buffer').removeEventListener('update', this._onUpdate);
                Array.unobserve(this.get('playerBuffers'), this._observeHandler);

                this.set({
                    buffer: null,
                    attached: false
                });
            } else {
                chrome.extension.getBackgroundPage().console.error('Already unatacched');
            }
        },

        _onUpdate: function () {
            chrome.extension.getBackgroundPage().console.log('onUpdate is firing');
            this._tryAppendBuffer();
        },

        _onWindowUnload: function () {
            //  It's important to call unobserve on playerBuffers because playerBuffers originates from the background page.
            //  Without this, a memory leak is formed and _observeHandler can fire without an existing foreground page.
            Array.unobserve(this.get('playerBuffers'), this._observeHandler);
            chrome.extension.getBackgroundPage().console.log('unobserved my array buffers');
        },

        _tryAppendBuffer: function() {
            var playerBuffers = this.get('playerBuffers');
            
            //  If more data has been loaded then go ahead and append it. Otherwise, wait for the data to come in.
            if (playerBuffers.length > this.get('appendedBufferCount')) {
                this._appendBuffer();
            } else {
                Array.observe(playerBuffers, this._observeHandler);
            }
        },

        _appendBuffer: function() {
            if (this._canAppendBuffer()) {
                var appendedBufferCount = this.get('appendedBufferCount');
                var playerBuffers = this.get('playerBuffers');

                this.get('buffer').appendBuffer(playerBuffers[appendedBufferCount]);
                this.set('appendedBufferCount', appendedBufferCount + 1);
            }
        },

        _canAppendBuffer: function () {
            chrome.extension.getBackgroundPage().console.log('canAppendBuffer?', this.get('attached'));
            var canAppendBuffer = this.get('attached') && !this.get('buffer').updating;
            return canAppendBuffer;
        },

        _observeHandler: function() {
            //  When playerBuffers announces that it has more data loaded - use it.
            var playerBuffers = this.get('playerBuffers');
            if (playerBuffers.length > 0) {
                Array.unobserve(playerBuffers, this._observeHandler);
                this._appendBuffer();
            }
        }
    });

    return StreamusSourceBuffer;
});