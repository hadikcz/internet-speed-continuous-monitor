#!/usr/bin/env node
var fs  = require('fs');
var os = require("os");
var moment = require('moment');

var inputFile = process.argv[2] ? process.argv[2] : 'speeds.csv';
var outputFile = process.argv[3] ? process.argv[3] : 'output-speeds.csv';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(inputFile)
});

try {
    fs.unlinkSync(outputFile);
} catch(e) {}

lineReader.on('line', function (line) {
    let csv = line.split(';');
    csv[0] = '"' + convertDate(csv[0]) + '"';
    csv[1] = '"' + convertFloatDelimitr(csv[1]) + '"';
    csv[2] = '"' + convertFloatDelimitr(csv[2]) + '"';
    csv[3] = os.EOL;
    console.log(csv[0]);

    fs.appendFileSync(outputFile, csv.join(','));
});


function convertDate(timestamp) {
    return moment.unix(timestamp).format("DD-MM-YYYY HH:mm:ss");
}

/**
 * @param {string} stringNumber
 * @return {*}
 */
function convertFloatDelimitr (stringNumber) {
    return stringNumber.replace('.', ',');
}
