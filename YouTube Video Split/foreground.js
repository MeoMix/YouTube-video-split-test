var backgroundPage = chrome.extension.getBackgroundPage();
var backgroundVideo = backgroundPage.video;

var streamusVideo = new StreamusVideo();
streamusVideo.initialize();

if (backgroundVideo.paused) {
    streamusVideo.setCurrentTime(backgroundVideo.currentTime);
} else {
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

document.getElementById('loadFirstVideo').addEventListener('click', function() {
    streamusVideo.reset();
    backgroundPage.loadVideoById('yEitrZU-nCw');
    streamusVideo.play(0);
});

document.getElementById('loadSecondVideo').addEventListener('click', function() {
    streamusVideo.reset();
    backgroundPage.loadVideoById('jjx2oc2NRzA');
    streamusVideo.play(0);
});

function StreamusVideo() {
    return {
        _video: null,
        _mediaSource: null,

        initialize: function() {
            this._video = document.getElementById('streamusVideo');
            this._mediaSource = new StreamusMediaSource();
            this._mediaSource.initialize();
            
            //  TODO: Unbind this when removing a Video.
            //  TODO: Does the fact that I need to call this mean I have a memory leak?
            window.onunload = this._onWindowUnload.bind(this);
            //  TODO: This is a slow, blocking operation. setTimeout to allow the page to open smoothly.
            setTimeout(this._setSrc.bind(this));
        },
        
        play: function(currentTime) {
            this.setCurrentTime(currentTime);
            this._video.play();
        },
        
        setCurrentTime: function(currentTime) {
            this._video.currentTime = currentTime;
        },
        
        pause: function() {
            this._video.pause();
        },
        
        reset: function() {
            this.pause();
            this._mediaSource.detachBuffer();
            this._mediaSource.attachBuffer();

            this._setSrc();
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

            this.attachBuffer();
        },
        
        attachBuffer: function() {
            if (this._sourceBuffer === null) {
                this._sourceBuffer = new StreamusSourceBuffer();
            } else {
                console.error('sourceBuffer is already attached');
            }
        },
        
        detachBuffer: function() {
            //  This needs to be called before detach because detach sets sourceBuffer to null.
            this._source.removeSourceBuffer(this._sourceBuffer._buffer);
            this._sourceBuffer.detach();
            this._sourceBuffer = null;
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
                //  TODO: Probably want to clean up observeHandler, too.
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