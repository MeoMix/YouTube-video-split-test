//  Intercept XMLHttpRequest for YouTube's iframe and send a copy of video data outside the iframe.
//  This allows for the video to be re-rendered on another page as efficiently as possible. 
(function(open) {
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            //  The responseURL will contain 'webm' when video data is being sent. More types of video may need to be supported in the future.
            var isVideo = this.responseURL.indexOf('webm') !== -1;
            
            if (isVideo) {
                var message = {
                    buffer: this.response.slice(0)
                };

                //  Be sure to mark the buffer as transferable as it can be a large amount of data.
                window.top.postMessage(message, '*', [message.buffer]);
            }
        });

        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);