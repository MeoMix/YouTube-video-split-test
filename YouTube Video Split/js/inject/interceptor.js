(function(open) {
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            var isVideo = this.responseURL.indexOf('webm') !== -1;
            
            if (isVideo) {
                console.log('sending some data');
                var message = {
                    buffer: this.response.slice(0)
                };

                window.top.postMessage(message, '*', [message.buffer]);
            }
        });

        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);