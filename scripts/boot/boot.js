/**
 * @file boot.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

const {exec} = require('child_process');

exec('cd ../../ && npm start', (error, stdout, stderr) => {
  if (error) {
    console.log(`[ERROR]: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`[STDERR]: ${stderr}`);
    return;
  }
  console.log(`${stdout}`);
});
