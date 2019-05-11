var speedTest = require('speedtest-net');
var fs  = require('fs');

var testInterval = process.argv[2] ? process.argv[2] : 60;
var outputFile = process.argv[3] ? process.argv[3] : 'speeds.csv';

console.info('Starting monitoring internet speed');

testSpeed();
setInterval(function() {
   testSpeed();
}, testInterval * 1000);

function testSpeed () {
    console.info('Test in progress');
    var test = speedTest({maxTime: 5000});

    test.on('data', data => {
        var line = Math.round((Date.now() / 1000)) + ';';
        console.log('Test ended: ');
        if (data !== undefined && data.speeds !== undefined) {
            if(data.speeds.download !== undefined) {
                line += data.speeds.download + ';';
                console.log('Download: ' + data.speeds.download + 'Mbit/s');
            } else {
                line += 'n/a;';
                console.log('Download: n/a');
            }
            if(data.speeds.upload !== undefined) {
                line += data.speeds.upload + ';';
                console.log('upload: ' + data.speeds.upload + 'Mbit/s');
            } else {
                line += 'n/a;';
                console.log('Upload: n/a');
            }

            console.log('Success test');
        } else {
            console.log('Failed test');
            line += 'n/a;n/a;'
        }
        console.log('-----');
        line += '\r\n';
        fs.appendFile(outputFile, line, 'utf8', (err) => {if(err) console.error(err)});
    });

    test.on('error', err => {
        console.error(err);
    });
}
