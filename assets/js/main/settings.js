/**
 * @file settings.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

const authorizationUrl = 'https://discordapp.com/api/oauth2/authorize?client_id={clientId}&scope=bot&permissions={permissions}';
let permissionInteger = 0;


function displayResults() {
  const url = authorizationUrl
      .replace('{clientId}', encodeURIComponent(`${client.user.id}`))
      .replace('{permissions}', String(permissionInteger));
  document.getElementById('result').innerHTML = url;
  document.getElementById('result').href = url;
  document.getElementById('permissionsInteger').innerHTML = permissionInteger;
}

const update = function() {
  const permissionInputs = document.getElementsByClassName('permission');
  const adminBox = document.getElementById('administrator');

  if (adminBox.checked === true) {
    for (let i = 0; i < permissionInputs.length; i++) {
      permissionInputs[i].setAttribute('disabled', 'disabled');
    }

    permissionInteger = adminBox.value;
    displayResults();
  } else {
    for (let i = 0; i < permissionInputs.length; i++) {
      permissionInputs[i].removeAttribute('disabled');
    }

    const checkedInputs = [];
    for (let i = 0; i < permissionInputs.length; i++) {
      if (permissionInputs[i].checked === true) {
        checkedInputs.push(permissionInputs[i]);
      }
    }

    permissionInteger = 0;
    for (let i = 0; i < checkedInputs.length; i++) {
      permissionInteger = permissionInteger | checkedInputs[i].value;
    }
    displayResults();
  }
};

function load() {
  const inputs = document.getElementsByClassName('input');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', update, false);
  }

  displayResults();
}

document.addEventListener('DOMContentLoaded', load, false);
