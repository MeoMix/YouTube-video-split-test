var ms = new MediaSource();
var sourceBuffer;
var queue = [];

window.mediaSource = ms;

var objectURL = window.URL.createObjectURL(ms);
var video = document.getElementById('streamusVideo');
video.src = objectURL;

ms.addEventListener('sourceopen', function () {
    console.log('source is open');
    
    sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp9"');
    sourceBuffer.addEventListener('update', function () {
        if (queue.length > 0 && !sourceBuffer.updating) {
            console.log('updating');
            sourceBuffer.appendBuffer(queue.shift());
        } else if (queue.length === 0) {
            console.log('skipping update - queue empty');
        } else {
            console.log('skipping update - sourceBuffer is updating');
        }
    });

    sourceBuffer.addEventListener('updatestart', function (e) {
        console.log('updatestart: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
    });
    sourceBuffer.addEventListener('update', function (e) {
        console.log('update: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
    });
    sourceBuffer.addEventListener('updateend', function (e) {
        console.log('updateend: ' + ms.readyState + 'buffered length: ' + e.currentTarget.buffered.length, e);
    });
    sourceBuffer.addEventListener('error', function (e) {
        console.error('error: ' + ms.readyState, e);
    });
    sourceBuffer.addEventListener('abort', function (e) {
        console.error('abort: ' + ms.readyState, e);
    });
}, false);


ms.addEventListener('sourceopen', function (e) {
    console.log('sourceopen: ' + ms.readyState, e);
});
ms.addEventListener('sourceended', function (e) {
    console.log('sourceended: ' + ms.readyState, e);
});
ms.addEventListener('sourceclose', function (e) {
    console.warn('sourceclose: ' + ms.readyState, e);
});
ms.addEventListener('error', function (e) {
    console.error('error: ' + ms.readyState, e);
});

var contentWindow = document.getElementById('playground').contentWindow;

window.addEventListener('message', function (transportData) {
	if (!transportData.data)
		return;

	if (sourceBuffer.updating || queue.length > 0) {
		queue.push(transportData.data);
	} else {
		sourceBuffer.appendBuffer(transportData.data);
	}
});

window.play = function () {
    contentWindow.postMessage('playVideo', '*');
    video.play();
};

window.pause = function() {
    contentWindow.postMessage('pauseVideo', '*');
    video.pause();
};