var backgroundPage = chrome.extension.getBackgroundPage();
var objectURL = window.URL.createObjectURL(backgroundPage.mediaSource);
var video = document.getElementById('streamusVideo');

var attach1Button = document.getElementById('attach1Button');
attach1Button.addEventListener('click', function() {
    video.src = objectURL;
});

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function () {
    backgroundPage.play();
    video.play();
});

var pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', function () {
    backgroundPage.pause();
    video.pause();
});