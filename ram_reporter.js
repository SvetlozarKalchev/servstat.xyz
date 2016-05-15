'use strict';
const os = require('os');

/*
  This module is responsible for getting total system memory and
  calculating the free amount.
*/
class RamReporter {

  convertToGB(data) {
    return new Promise(function(resolve, reject) {

      if (data) {
        const formattedData = (data / Math.pow(10, 9)).toFixed(2);
        resolve(formattedData);

      } else {
        reject(new Error('No input parameter given!'));
      }

    });
  }

  getTotalRam() {
    const self = this;

    return new Promise(function(resolve, reject) {

      const totalMemory = os.totalmem();

      if (totalMemory) {
        self.convertToGB(totalMemory)
          .then(result => resolve(result))
          .catch(err => reject(err));

      } else {
        reject(new Error('No valid total RAM data found!'));
      }

    });
  }

  getFreeRam() {
    const self = this;

    return new Promise(function(resolve, reject) {

      const freeMemory = os.freemem();

      if (freeMemory) {
          self.convertToGB(freeMemory)
            .then(result => resolve(result))
            .catch(err => reject(err));
      } else {
        reject(new Error('No valid free RAM data found!'));
      }

    });
  }

  getUsedRam(callback) {
    const self = this;

    return new Promise(function(resolve, reject) {
      let totalRam, freeRam, usedRam;

      self.getTotalRam()
        .then(result => {
          totalRam = result;

          return self.getFreeRam();
        })
        .then(result => {
          freeRam = result;
          console.log(freeRam);
          usedRam = totalRam - freeRam;

          resolve(usedRam);
        })
        .catch(err => console.error(err))
    });
  }
}
