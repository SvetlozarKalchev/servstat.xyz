'use strict';
const fs = require('fs');

class CpuReporter {
  // Read CPU frequency data from /proc/cpuinfo
  readFrequency() {
    return new Promise(function(resolve, reject) {

      fs.readFile('/proc/cpuinfo', 'utf-8', (err, data) => {
        if(err) {
          reject(err);

        } else {
            let frequencies = new Array(),
            // Put each line from the cpuinfo file in the array
                lines = data.split('\n');

            // Find each line, containing a frequency, and extract
            // the number.
            for (let line of lines) {

              if(line.includes('cpu MHz')) {
                frequencies.push(line.split(':')[1].trim())
              }

            }
            resolve(frequencies);
          }

      });

    });
  }
}

module.exports = new CpuReporter();
