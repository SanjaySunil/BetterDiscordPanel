/**
 * @file embedLinks.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function embedLinks(element) {
  let html = '<div>';
  if (element.iconURL) {
    html += `<a href="${element.iconURL}" target="_blank"><img class="avatarIMG" src="${element.iconURL}" alt=""></a>`;
  }
  if (element.url) {
    html += `<a href="${element.url}">${element.name}</a>`;
  } else {
    html += element.name;
  }
  html += '</div>';
  return html;
}
