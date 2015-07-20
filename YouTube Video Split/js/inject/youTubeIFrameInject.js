//  This code is injected into YouTube's video iframe before any of their scripts have loaded.
//  It forces YouTube to use the HTML5 video player, hooks into requests sent from their server,
//  and attempts to listen for interesting events on the <video> itself. If the <video> element
//  is not found then it will poll for its existence for a few seconds before emitting an error.
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    //  The port used for external communication w/ the extension.
    this.port = null;
    //  The <video> hosting the active YouTube video
    this.videoStream = null;

    //  This is a heavy-handed approach for ensuring that an HTML5 player will always be provided by YouTube if at all possible.
    //  By overloading canPlayType and forcing it to return 'probably' - YouTube will always assume that the browser can handle HTML5 video.
    //  Since this code only runs in browsers which support HTML5 video - canPlayType technically should always return 'probably'.
    //  However, sometimes other extensions or custom browsers (i.e. Slimjet) mess with the canPlayType prototype and prevent YouTube from loading HTML5.
    //  If Flash loads then this example is doomed. So, it's OK to be heavy-handed and potentially break stuff because the options are either "make it work" or "already broken"
    this.patchVideoCanPlayType = function() {
        var script = document.createElement('script');
        script.innerHTML = 'HTMLMediaElement.prototype.canPlayType = function() { return "probably"; };';
        document.head.appendChild(script);
    }.bind(this);

    //  Append a script to the page which will intercept YouTube's server requests and post messages out of the iframe with details about those requests.
    //  Needs to be an injected script because content scripts are sandboxed in such a way that they do not share variables with appended scripts.
    this.injectInterceptorScript = function() {
        var interceptorScript = document.createElement('script');
        interceptorScript.src = chrome.runtime.getURL('js/inject/interceptor.js');
        document.head.appendChild(interceptorScript);
    }.bind(this);

    //  Create the port needed to communicate with the parent extension.
    this.initializePort = function() {
        this.port = chrome.runtime.connect({
            name: 'youTubeIFrameConnectRequest'
        });

        //  The extension can request the *exact* time of YouTube's video player.
        //  Respond with that value, but also include a timestamp to account for the time it takes to send the postMessage.
        this.port.onMessage.addListener(function(message) {
            if (message === 'getCurrentTimeHighPrecision') {
                var currentTime = this.videoStream === null ? 0 : this.videoStream.currentTime;

                this.port.postMessage({
                    timestamp: performance.now(),
                    currentTimeHighPrecision: currentTime
                });
            }
        }.bind(this));
    }.bind(this);

    //  Initialization code: 
    window.addEventListener('error', this.onWindowError);
    this.patchVideoCanPlayType();
    this.injectInterceptorScript();
    this.initializePort();
});