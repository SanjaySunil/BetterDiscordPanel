/**
 * @file formatTimestamp.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

function formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    return `${date.toLocaleDateString(
      localeFile.cCode
    )} ${date.toLocaleTimeString(localeFile.cCode)}`;
  }