var errorsEncountered = '';
window.onerror = function(error) {
    errorsEncountered += error + ' ';
};

$('body').append('<script src="' + chrome.runtime.getURL('js/inject/interceptor.js') + '"></script>');

$(function() {
    //  Only run against our intended iFrame -- not embedded YouTube iframes on other pages.
    if (window.name === 'youtube-player') {
        var port = chrome.runtime.connect({
            name: 'youTubeIFrameConnectRequest'
        });
        
        port.onMessage.addListener(function(message) {
            if (message === 'getCurrentTimeHighPrecision') {
                port.postMessage({
                    timestamp: Date.now(),
                    currentTimeHighPrecision: videoStream[0].currentTime
                });
            }
        });

        var monitorVideoStream = function() {
            port.postMessage({
                flashLoaded: false
            });
            
            var lastPostedCurrentTime = null;

            videoStream.on('loadstart', function() {
                lastPostedCurrentTime = null;
            });

            //  TimeUpdate has awesome resolution, but we only display to the nearest second.
            //  So, round currentTime and only send a message when the rounded value has changed, not the actual value.
            videoStream.on('timeupdate', function() {
                var currentTime = Math.ceil(this.currentTime);

                if (currentTime !== lastPostedCurrentTime) {
                    port.postMessage({
                        currentTime: currentTime
                    });

                    lastPostedCurrentTime = currentTime;
                }
            });

            //  TODO: I forget why I need this.
            videoStream.on('seeking', function() {
                port.postMessage({
                    seeking: true
                });
            });

            videoStream.on('seeked', function() {
                port.postMessage({
                    seeking: false
                });
            });
        };

        var triesRemaining = 30;

        //  Monitor the video for change of src so that background can mimic player.
        var videoStream = $('.video-stream');
        var flashStream = $('embed[type="application/x-shockwave-flash"]');

        //  If failed to find the videoStream -- keep searching for a bit. Opera loads too early and I guess this might be possible in Chrome, too.
        if (videoStream.length === 0) {
            if (flashStream.length > 0) {
                port.postMessage({
                    flashLoaded: true
                });
            } else {
                var findVideoStreamInterval = setInterval(function() {
                    if (triesRemaining <= 0) {

                        clearInterval(findVideoStreamInterval);
                        port.postMessage({
                            error: 'video-stream not found, readystate:' + document.readyState + ' ' + errorsEncountered + ' flash: ' + flashStream.length
                        });
                    } else {
                        videoStream = $('.video-stream');
                        flashStream = $('embed[type="application/x-shockwave-flash"]');

                        if (videoStream.length > 0) {
                            clearInterval(findVideoStreamInterval);
                            monitorVideoStream();
                        } else if (flashStream.length > 0) {
                            port.postMessage({
                                flashLoaded: true
                            });
                            clearInterval(findVideoStreamInterval);
                        }
                    }

                    triesRemaining--;
                }, 200);
            }
        } else {
            monitorVideoStream();
        }
    }
});