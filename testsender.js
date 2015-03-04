function Uint8ToString(u8a) {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
}

setTimeout(function () {
    var testsenderPort = chrome.runtime.connect({
        name: 'testsender'
    });

    var FILE = chrome.runtime.getURL('test.webm');
    var NUM_CHUNKS = 5;

    GET(FILE, function(uInt8Array) {
        var file = new Blob([uInt8Array], { type: 'video/webm' });
        var chunkSize = Math.ceil(file.size / NUM_CHUNKS);
        var i = 0;

        (function readChunk_(i) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var transportDataList = [];
                var transportData = btoa(Uint8ToString(new Uint8Array(e.target.result)));
                transportDataList.push(transportData);

                testsenderPort.postMessage({
                    data: transportDataList
                });

                if (i < NUM_CHUNKS - 1) {
                    readChunk_(++i);
                }
            };

            var startByte = chunkSize * i;
            var chunk = file.slice(startByte, startByte + chunkSize);
            reader.readAsArrayBuffer(chunk);
        })(i);
    });

    function GET(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();

        xhr.onload = function() {
            if (xhr.status != 200) {
                console.error("Unexpected status code " + xhr.status + " for " + url);
                return false;
            }
            callback(new Uint8Array(xhr.response));
        };
    }
}, 1000);