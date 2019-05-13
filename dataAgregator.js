#!/usr/bin/env node
var fs  = require('fs');
var os = require("os");
var moment = require('moment');

var agregateCount = process.argv[2] ? process.argv[2] : 5;
var inputFile = process.argv[3] ? process.argv[3] : 'speeds.csv';
var outputFile = process.argv[4] ? process.argv[4] : 'output-agregated-speeds.csv';

try {
    fs.unlinkSync(outputFile);
} catch(e) {}

let data = [];

let file = fs.readFileSync(inputFile).toString();
data = file.split(os.EOL);

let resultData = [];

let i = 0;
let agregateRows = [];
data.forEach((line) => {
    if (i++ % agregateCount === 0) {
        let agregateData = calculateAgregation(agregateRows);
        fs.appendFileSync(outputFile, agregateData);
        agregateRows = [];
    } else {
        agregateRows.push(line);
    }
});


function calculateAgregation(agregateRows) {
    let agrDownload = 0;
    let agrUpload = 0;
    let date = 'none';

    let i = 0;
    agregateRows.forEach((line) => {
        let values = line.split(';');
        if (i === Math.floor(agregateRows.length / 2)) {
            date = values[0];
        }
        i++;

        agrDownload += parseFloat(values[1]);
        agrUpload += parseFloat(values[2]);
    });

    let download = agrDownload / agregateCount;
    let upload = agrUpload / agregateCount;
    return date + ';' + download.toFixed(2) + ';' + upload.toFixed(2) + ';' + os.EOL;
}
