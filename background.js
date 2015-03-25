var ms = new MediaSource();
var sourceBuffer;
var queue = [];

window.mediaSource = ms;

var video = document.getElementById('streamusVideo');
var objectURL = window.URL.createObjectURL(ms);
video.src = objectURL;
window.backgroundVideo = video;

//  I might be able to keep a queue of all the appended buffers so when I want to spawn a new video element I can quickly re-append and catch up?
var buffers = [];
window.buffers = buffers;

ms.addEventListener('sourceopen', function () {
    console.log('source is open');
    
    sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp9"');
    sourceBuffer.addEventListener('update', function () {
        if (queue.length > 0 && !sourceBuffer.updating) {
            console.log('updating');
            var buffer = queue.shift();
            sourceBuffer.appendBuffer(buffer);
        } else if (queue.length === 0) {
            console.log('skipping update - queue empty');
        } else {
            console.log('skipping update - sourceBuffer is updating');
        }
    });
}, false);

var contentWindow = document.getElementById('playground').contentWindow;

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

window.play = function () {
    contentWindow.postMessage('playVideo', '*');
    video.play();
};

window.pause = function() {
    contentWindow.postMessage('pauseVideo', '*');
    video.pause();
};