var speedTest = require('speedtest-net');
var fs  = require('fs');

var outputFile = process.argv[2] ? process.argv[2] : 'speeds.csv';
var testInterval = process.argv[3] ? process.argv[3] : 30;

console.info('Starting monitoring internet speed');

testSpeed();
setInterval(function() {
   testSpeed();
}, testInterval * 1000);

function testSpeed () {
    var test = speedTest({maxTime: 5000});

    test.on('data', data => {
        var line = Math.round((Date.now() / 1000)) + ';';
        console.log('-----');
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
        line += '\r\n';
        fs.appendFile(outputFile, line, 'utf8', (err) => {if(err) console.error(err)});
    });

    test.on('error', err => {
        console.error(err);
    });
}
