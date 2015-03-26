//  Keep a queue of all the buffers which have been used so that the foreground can utilizes these whenever it opens.
var buffers = window.buffers = [];
var video = window.video = document.getElementById('streamusVideo');

var sourceBuffer;
var queue = [];

var mediaSource = new MediaSource();
video.src = window.URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', function() {
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
    sourceBuffer.addEventListener('update', function () {
        if (queue.length > 0 && !sourceBuffer.updating) {
            var buffer = queue.shift();
            sourceBuffer.appendBuffer(buffer);
        }
    });
});

window.addEventListener('message', function (transportData) {
	if (!transportData.data)
		return;

	buffers.push(transportData.data);

	if (sourceBuffer.updating || queue.length > 0) {
	    queue.push(transportData.data);
	} else {
	    sourceBuffer.appendBuffer(transportData.data);
	}
});

var contentWindow = document.getElementById('playground').contentWindow;
window.play = function () {
    contentWindow.postMessage('playVideo', '*');
    video.play();
};

window.pause = function() {
    contentWindow.postMessage('pauseVideo', '*');
    video.pause();
};