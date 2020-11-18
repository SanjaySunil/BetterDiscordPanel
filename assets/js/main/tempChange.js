/**
 * @file tempChange.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

function tempChange(DOM, text, time) {
    let newText = `${$(DOM).text().replace(text, "")} ${text}`;
  
    $(DOM).html(newText);
  
    setTimeout(() => {
      $(DOM).html(newText.replace(text, ""));
    }, time);
}