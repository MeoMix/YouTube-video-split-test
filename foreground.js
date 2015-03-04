var ms = new MediaSource();
var video = document.getElementById('streamusVideo');
var sourceBuffer;
var queue = [];

setTimeout(function() {
    video.src = window.URL.createObjectURL(ms);

    ms.addEventListener('sourceopen', function() {
        sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp9"');
        //sourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.42001E, mp4a.40.2"');

        sourceBuffer.addEventListener('update', function() {
            if (queue.length > 0 && !sourceBuffer.updating) {
                console.log('updating');
                sourceBuffer.appendBuffer(queue.shift());
            } else if (queue.length === 0) {
                console.log('skipping update - queue empty');
            } else {
                console.log('skipping update - sourceBuffer is updating');
            }
        });

        sourceBuffer.addEventListener('updatestart', function(e) {
            console.log('updatestart: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
        });
        sourceBuffer.addEventListener('update', function(e) {
            console.log('update: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
            //debugger;
        });
        sourceBuffer.addEventListener('updateend', function(e) {
            console.log('updateend: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
            //debugger;
        });
        sourceBuffer.addEventListener('error', function(e) {
            console.error('error: ' + ms.readyState, e);
        });
        sourceBuffer.addEventListener('abort', function(e) {
            console.error('abort: ' + ms.readyState, e);
        });
    }, false);

    ms.addEventListener('sourceopen', function(e) {
        console.log('sourceopen: ' + ms.readyState, e);
    });
    ms.addEventListener('sourceended', function(e) {
        console.log('sourceended: ' + ms.readyState, e);
    });
    ms.addEventListener('sourceclose', function(e) {
        console.warn('sourceclose: ' + ms.readyState, e);
    });
    ms.addEventListener('error', function(e) {
        console.error('error: ' + ms.readyState, e);
    });
});

var count = 0;
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === 'loader') {
        port.onMessage.addListener(function(transportData) {
            for (var index = 0; index < transportData.data.length; index++) {
                var data = new Uint8Array(atob(transportData.data[index]).split("").map(function(c) {
                    return c.charCodeAt(0);
                }));
                
                console.log('RECEIVED:', data.buffer.byteLength);
                
                if (sourceBuffer.updating || queue.length > 0) {
                    console.log('queueing data');
                    queue.push(data);
                } else {
                    console.log('appending data to buffer');
                    sourceBuffer.appendBuffer(data);
                }
            }
        });
    }
});