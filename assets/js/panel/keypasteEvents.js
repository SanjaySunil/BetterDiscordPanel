/**
 * @file keypasteEvents.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

toSend.keypress((event) => {
  if (!event.shiftKey && event.key === 'Enter') {
    event.preventDefault();
    send.click();
  }
  event.stopPropagation();
});

toSend.on('paste', (event) => {
  event.preventDefault();
  const text = (event.originalEvent || event).clipboardData.getData('text/plain');
  document.execCommand('insertHTML', false, text);
});
