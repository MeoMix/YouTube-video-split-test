var backgroundPage = chrome.extension.getBackgroundPage();
var backgroundVideo = backgroundPage.video;

var streamusVideo = new StreamusVideo();
streamusVideo.initialize();

if (!backgroundVideo.paused) {
    streamusVideo.play(backgroundVideo.currentTime);
}

document.getElementById('playButton').addEventListener('click', function() {
    backgroundPage.play();
    streamusVideo.play(backgroundVideo.currentTime);
});

document.getElementById('pauseButton').addEventListener('click', function () {
    backgroundPage.pause();
    streamusVideo.pause();
});

function StreamusVideo() {
    return {
        _video: null,
        _mediaSource: null,

        initialize: function() {
            this._video = document.getElementById('streamusVideo');
            this._mediaSource = new StreamusMediaSource();
            this._mediaSource.initialize();
            
            //  TODO: Does the fact that I need to call this mean I have a memory leak?
            window.onunload = this._onWindowUnload.bind(this);
            //  TODO: This is a slow, blocking operation. setTimeout to allow the page to open smoothly.
            setTimeout(this._setSrc.bind(this));
        },
        
        play: function(currentTime) {
            this._video.currentTime = currentTime;
            this._video.play();
        },
        
        pause: function() {
            this._video.pause();
        },
        
        _onWindowUnload: function() {
            this._mediaSource.detachBuffer();
        },
        
        _setSrc: function() {
            this._video.src = this._mediaSource.getObjectURL();
        }
    };
}

function StreamusMediaSource() {
    return {
        _source: null,
        _sourceBuffer: null,
        _sourceObjectURL: null,

        initialize: function() {
            this._source = new window.MediaSource();
            this._sourceBuffer = new StreamusSourceBuffer();
            
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._onSourceOpen = this._onSourceOpen.bind(this);
            this._onSourceClose = this._onSourceClose.bind(this);
            this._onSourceEnded = this._onSourceEnded.bind(this);
            this._onSourceError = this._onSourceError.bind(this);

            this._source.addEventListener('sourceopen', this._onSourceOpen);
            this._source.addEventListener('sourceclose', this._onSourceClose);
            this._source.addEventListener('sourceended', this._onSourceEnded);
            this._source.addEventListener('error', this._onSourceError);
        },
        
        detachBuffer: function() {
            this._sourceBuffer.detach();
        },
        
        getObjectURL: function() {
            if (this._sourceObjectURL === null) {
                this._sourceObjectURL = window.URL.createObjectURL(this._source);
            }

            return this._sourceObjectURL;
        },
        
        //  _source.readyState has transitioned from 'closed' to 'open' or from 'ended' to 'open'
        _onSourceOpen: function() {
            this._sourceBuffer.initialize();
            
            var sourceBuffer = this._source.addSourceBuffer('video/webm; codecs="vp9"');
            this._sourceBuffer.attach(sourceBuffer);
        },
        
        //  _source.readyState has transitioned from 'open' to 'closed' or from 'ended' to 'closed'
        _onSourceClose: function() {
            this._sourceBuffer.detach();
        },
        
        //  _source.readyState has transitioned from 'open' to 'ended'
        _onSourceEnded: function() {
            this._sourceBuffer.detach();
        },
        
        _onSourceError: function() {
            console.error('error');
        }
    };
}

function StreamusSourceBuffer() {
    return {
        _buffer: null,
        _backgroundBuffers: backgroundPage.buffers,
        _appendedBufferCount: 0,
        //  SourceBuffer can only be appended when its parent's MediaSource allows it.
        _attached: false,

        initialize: function() {
            //  IMPORTANT: Prefer binding like this rather than using .bind(this) inline because bind will return a new function.
            //  This will break unobserve because it expects to be given a reference to the original function.
            this._observeHandler = this._observeHandler.bind(this);
            this._onUpdate = this._onUpdate.bind(this);
        },
        
        attach: function(sourceBuffer) {
            if (!this._attached) {
                this._buffer = sourceBuffer;
                this._buffer.addEventListener('update', this._onUpdate);
                this._attached = true;
                
                this._tryAppendBuffer();
            }
        },
        
        detach: function() {
            if (this._attached) {
                this._buffer.removeEventListener('update', this._onUpdate);
                this._buffer = null;
                this._attached = false;
            }
        },
        
        _onUpdate: function() {
            this._tryAppendBuffer();
        },

        _tryAppendBuffer: function() {
            if (this._backgroundBuffers.length > this._appendedBufferCount) {
                this._appendBuffer();
            } else {
                Array.observe(this._backgroundBuffers, this._observeHandler);
            }
        },

        _appendBuffer: function() {
            if (this._canAppendBuffer()) {
                this._buffer.appendBuffer(this._backgroundBuffers[this._appendedBufferCount]);
                this._appendedBufferCount++;
            }
        },
        
        _canAppendBuffer: function() {
            return this._attached && !this._buffer.updating;
        },

        _observeHandler: function() {
            //  Monitor backgroundBuffers for added buffers so that the foreground can begin playback.
            if (this._backgroundBuffers.length > 0) {
                Array.unobserve(this._backgroundBuffers, this._observeHandler);
                this._appendBuffer();
            }
        }
    };
}