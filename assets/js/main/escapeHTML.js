/**
 * @file escapeHTML.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function escapeHtml(text) {
  return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}
