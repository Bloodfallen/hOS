// our main code

var request = require('request');
var fs = require('fs');

var downlodFile = (file_url, targetPath) => {
    var recieved_bytes = 0;
    var total_bytes = 0;

    var req = request({
        method: 'GET',
        uri: file_url
    });
    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', (data) => {
        total_bytes = parseInt(data.headers['content-length']);
    });
    req.on('data', (chunk) => {
        recieved_bytes += chunk.length;

        showProgress(recieved_bytes, total_bytes);
    });
    req.on('end', () => {
        // on complete dl
    });
}

var showProgress = (recieved, total) => {
    // do more then this later
    var percentage = (recieved * 100) / total;
    console.log('recieved ' + percentage + "% | " + recieved + " bytes out of " + total + " bytes");
}