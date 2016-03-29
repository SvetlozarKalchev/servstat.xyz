#! /usr/bin/env node
'use strict';

/*
  servstat start/stop/ping [options]
  - options[0] must be the command

  - options[1] must be the polling interval

  - options[2] must be a string, specifying which modules
  to activate
*/
const cliArguments = process.argv.slice(2),
  command = cliArguments[0],
  server = cliArguments[1],
  pollingInterval = cliArguments[2],
  invalidArgsError = new Error('Invalid arguments given!');

console.log(cliArguments);

const isCommandValid = command === 'start'
                    || command === 'stop'
                    || command === 'ping';


const areArgsValid = isCommandValid;

if (areArgsValid) {
  switch (command.toLowerCase()) {
    case 'start': {
      console.log('Starting...');
      break;
      }
    case 'ping': {
      console.log('Pinging server...');
      break;
      }
    case 'stop': {
      console.log('Stopping...');
      break;
      }
    default: console.log('Need help?');
  }

} else {
  throw invalidArgsError;
}
