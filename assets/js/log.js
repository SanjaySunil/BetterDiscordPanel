/**
 * @file log.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function successNotification(message) {
  new Noty({
    type: 'success',
    theme: 'nest',
    closeWith: ['button'],
    text: message,
    timeout: 5000,
    progressBar: true,
    dismissQueue: true,
    force: false,
    maxVisible: 5,
  }).show();
}

function errorNotification(message) {
  new Noty({
    type: 'error',
    theme: 'nest',
    closeWith: ['button'],
    text: message,
    timeout: 5000,
    progressBar: true,
    dismissQueue: true,
    force: false,
    maxVisible: 5,
  }).show();
}

function infoNotification(message) {
  new Noty({
    type: 'info',
    theme: 'nest',
    closeWith: ['button'],
    text: message,
    timeout: 5000,
    progressBar: true,
    dismissQueue: true,
    force: false,
    maxVisible: 5,
  }).show();
}

function betterDiscordConsole(message, color) {
  color = color || 'black';
  switch (color) {
    case 'success':
      color = 'Green';
      break;
    case 'info':
      color = 'DodgerBlue';
      break;
    case 'error':
      color = 'Red';
      break;
    case 'warning':
      color = 'Orange';
      break;
    default:
      color = color;
  }
  console.log('%c' + message, 'color:' + color);
}
