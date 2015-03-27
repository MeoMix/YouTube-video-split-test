define(function() {
    'use strict';
    
    var youTubePlayer = chrome.extension.getBackgroundPage().player.get('youTubePlayer');

    var StreamusSourceBuffer = Backbone.Model.extend({
        defaults: {
            buffer: null,
            appendedBufferCount: 0,
            //  SourceBuffer can only be appended when its parent's MediaSource allows it.
            attached: false
        },
        
        initialize: function() {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._observeHandler = this._observeHandler.bind(this);
            this._onUpdate = this._onUpdate.bind(this);
        },
        
        attach: function(sourceBuffer) {
            if (!this.get('attached')) {
                this.set('buffer', sourceBuffer);
                this.get('buffer').addEventListener('update', this._onUpdate);
                this.set('attached', true);

                this._tryAppendBuffer();
            }
        },

        detach: function() {
            if (this.get('attached')) {
                //  TODO: Probably want to clean up observeHandler, too.
                this.get('buffer').removeEventListener('update', this._onUpdate);
                this.set('buffer', null);
                this.set('attached', false);
            }
        },

        _onUpdate: function() {
            this._tryAppendBuffer();
        },

        _tryAppendBuffer: function() {
            var youTubePlayerBuffers = youTubePlayer.get('buffers');
            
            if (youTubePlayerBuffers.length > this.get('appendedBufferCount')) {
                this._appendBuffer();
            } else {
                Array.observe(youTubePlayerBuffers, this._observeHandler);
            }
        },

        _appendBuffer: function() {
            if (this._canAppendBuffer()) {
                var appendedBufferCount = this.get('appendedBufferCount');
                var youTubePlayerBuffers = youTubePlayer.get('buffers');
                this.get('buffer').appendBuffer(youTubePlayerBuffers[appendedBufferCount]);
                this.set('appendedBufferCount', appendedBufferCount + 1);
            }
        },

        _canAppendBuffer: function() {
            return this.get('attached') && !this.get('buffer').updating;
        },

        _observeHandler: function() {
            //  Monitor backgroundBuffers for added buffers so that the foreground can begin playback.
            var youTubePlayerBuffers = youTubePlayer.get('buffers');
            if (youTubePlayerBuffers.length > 0) {
                Array.unobserve(youTubePlayerBuffers, this._observeHandler);
                this._appendBuffer();
            }
        }
    });

    return StreamusSourceBuffer;
});