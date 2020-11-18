/**
 * @file addText.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

function addText(value) {
    let toSend = $("#toSend");
    toSend.html(`${toSend.html() + escapeHtml(value)} `);
}