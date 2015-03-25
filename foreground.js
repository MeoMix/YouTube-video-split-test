var backgroundPage = chrome.extension.getBackgroundPage();
var objectURL = window.URL.createObjectURL(backgroundPage.mediaSource);
var video = document.getElementById('streamusVideo');
var backgroundVideo = backgroundPage.backgroundVideo;
var appendedBufferCount = 0;

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function () {
    backgroundVideo.play();
    video.play();
    video.currentTime = backgroundVideo.currentTime;
    backgroundPage.play();
});

var pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', function () {
    backgroundVideo.pause();
    backgroundPage.pause();
    video.pause();
});

var attachButton = document.getElementById('attachButton');
attachButton.addEventListener('click', function () {
    sourceBuffer.appendBuffer(backgroundPage.buffers[appendedBufferCount]);
    appendedBufferCount++;
    video.currentTime = backgroundVideo.currentTime;
    
    if (!backgroundVideo.paused) {
        video.play();
    }
});

var ms = new MediaSource();
var sourceBuffer;

ms.addEventListener('sourceopen', function () {
    console.log('source is open');

    sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp9"');
    sourceBuffer.addEventListener('update', function () {
        if (backgroundPage.buffers.length > 0 && !sourceBuffer.updating) {
            console.log('updating');
            var buffer = backgroundPage.buffers[appendedBufferCount];
            appendedBufferCount++;
            sourceBuffer.appendBuffer(buffer);
        } else if (backgroundPage.buffers.length === 0) {
            console.log('skipping update - backgroundPage.buffers empty');
        } else {
            console.log('skipping update - sourceBuffer is updating');
        }
    });

}, false);

setTimeout(function() {
    var objectURL = window.URL.createObjectURL(ms);
    video.src = objectURL;
});

