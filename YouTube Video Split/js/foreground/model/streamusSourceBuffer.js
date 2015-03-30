define(function() {
    'use strict';
    
    var StreamusSourceBuffer = Backbone.Model.extend({
        defaults: function () {
            return {
                buffer: null,
                appendedBufferCount: 0,
                //  SourceBuffer can only be appended when its parent's MediaSource allows it.
                attached: false,
                youTubePlayerBuffers: chrome.extension.getBackgroundPage().player.get('youTubePlayer').get('buffers')
            };
        },
        
        initialize: function() {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._observeHandler = this._observeHandler.bind(this);
            this._onUpdate = this._onUpdate.bind(this);
        },
        
        attach: function(sourceBuffer) {
            if (!this.get('attached')) {
                this.set({
                    buffer: sourceBuffer,
                    attached: true
                });
                
                sourceBuffer.addEventListener('update', this._onUpdate);
                this._tryAppendBuffer();
            }
        },

        detach: function() {
            if (this.get('attached')) {
                this.get('buffer').removeEventListener('update', this._onUpdate);
                Array.unobserve(this.get('youTubePlayerBuffers'), this._observeHandler);
                
                this.set({
                    buffer: null,
                    attached: false
                });
            }
        },

        _onUpdate: function() {
            this._tryAppendBuffer();
        },

        _tryAppendBuffer: function() {
            var youTubePlayerBuffers = this.get('youTubePlayerBuffers');
            
            //  If more data has been loaded then go ahead and append it. Otherwise, wait for the data to come in.
            if (youTubePlayerBuffers.length > this.get('appendedBufferCount')) {
                this._appendBuffer();
            } else {
                Array.observe(youTubePlayerBuffers, this._observeHandler);
            }
        },

        _appendBuffer: function() {
            if (this._canAppendBuffer()) {
                var appendedBufferCount = this.get('appendedBufferCount');
                var youTubePlayerBuffers = this.get('youTubePlayerBuffers');

                this.get('buffer').appendBuffer(youTubePlayerBuffers[appendedBufferCount]);
                this.set('appendedBufferCount', appendedBufferCount + 1);
            }
        },

        _canAppendBuffer: function() {
            var canAppendBuffer = this.get('attached') && !this.get('buffer').updating;
            return canAppendBuffer;
        },

        _observeHandler: function() {
            //  When youTubePlayerBuffers announces that it has more data loaded - use it.
            var youTubePlayerBuffers = this.get('youTubePlayerBuffers');
            if (youTubePlayerBuffers.length > 0) {
                Array.unobserve(youTubePlayerBuffers, this._observeHandler);
                this._appendBuffer();
            }
        }
    });

    return StreamusSourceBuffer;
});