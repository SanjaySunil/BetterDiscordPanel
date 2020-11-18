/**
 * @file format.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

function format(command, value) {
    document.execCommand(command, false, value);
}