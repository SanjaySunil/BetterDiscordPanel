/**
 * @file addText.js
 * @author Sanjay Sunil 
 * @license GPL-3.0
 */

function addText(value) {
	let toSend = $("#toSend");
	toSend.html(`${toSend.html() + escapeHtml(value)} `);
}
