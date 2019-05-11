var speedTest = require('speedtest-net');
var fs  = require('fs');



var test = speedTest({maxTime: 5000});


test.on('data', data => {
    console.dir(data);
    console.log(data.speeds.download);
    console.log(data.speeds.upload);
    console.log(data.server.ping);
});

test.on('error', err => {
    console.error(err);
});
