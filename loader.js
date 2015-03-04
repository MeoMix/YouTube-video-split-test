document.write('<!DOCTYPE html>'+
'<html lang="en" dir="ltr" data-cast-api-enabled="true">'+

'<head>'+
    '<title>Disclosure - You &amp; Me (Flume Remix) - YouTube</title>'+
    '<link rel="canonical" href="http://www.youtube.com/watch?v=OUkkaqSNduU">'+
    '<link rel="stylesheet" href="https://s.ytimg.com/yts/cssbin/www-embed-player-webp-vfl5oEKQT.css" name="www-embed-player">'+
    '<script src="' + chrome.runtime.getURL('inline.js') +'"></script>'+
'</head>'+


'<body id="" class="date-20150226 en_US ltr  exp-a exp-c exp-h exp-k exp-s exp-t exp-w exp-y  site-center-aligned site-as-giant-card webkit webkit-537" dir="ltr">'+
    '<div id="player" class="full-frame"></div>'+
    '<div id="player-unavailable" class="ytp-error hid">'+
        '<div id="unavailable-submessage" class="ytp-error-content"></div>'+
    '</div>'+
    '<script src="' + chrome.runtime.getURL('embedplayer.js') + '" type="text/javascript" name="www-embed-player/www-embed-player"></script>'+
	'<script src="' + chrome.runtime.getURL('html5player.js') + '" type="text/javascript" name="www-embed-player/www-embed-player"></script>'+
    '<script src="' + chrome.runtime.getURL('inline2.js') +'"></script>'+
    '<script src="' + chrome.runtime.getURL('inline3.js') +'"></script>'+
'</body>'+

'</html>');

var loaderPort = chrome.runtime.connect({
    name: 'loader'
});

window.addEventListener('message', function(request){
	loaderPort.postMessage(request.data);
});
