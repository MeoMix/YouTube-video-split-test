var backgroundPage = chrome.extension.getBackgroundPage();
var objectURL = window.URL.createObjectURL(backgroundPage.mediaSource);
var video = document.getElementById('streamusVideo');
video.src = objectURL;

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function () {
    //video.play();
    backgroundPage.play();
});

var pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', function () {
    //video.pause();
    backgroundPage.pause();
});

var canvas = document.getElementById('streamusCanvas');
var backgroundVideo = backgroundPage.document.getElementById('streamusVideo');
var context = canvas.getContext('2d');
context.drawImage(backgroundVideo, 0, 0, 300, 115);
function sync() {
    context.drawImage(backgroundVideo, 0, 0, 300, 115);

    //video.currentTime(backgroundVideo.currentTime());

    window.requestAnimationFrame(sync);
}

sync();