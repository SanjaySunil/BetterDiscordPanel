/**
 * @file login.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function login() {
  let token;
  token = document.getElementById('token').value;
  /**
   * Set token into localStorage.
   */
  localStorage.setItem('token', token);
  token = localStorage.getItem('token');

  const client = new Discord.Client({
    messageCacheMaxSize: 5,
    fetchAllMembers: false,
  });

  client.login(token).then()
      .then(() => {
        console.log('Success!');
        window.location.replace('index.html');
      })
      .catch((err) => {
        errorNotification(translation.token.invalid);
        console.log(err);
        localStorage.setItem('token', null);
      });
}

function testLogin() {
  /**
   * This function will check if the user has already logged into their account.
   * A redirection will be made back to the panel if they have already logged in.
   */
  token = localStorage.getItem('token');

  const client = new Discord.Client({
    messageCacheMaxSize: 5,
    fetchAllMembers: false,
  });
  client.login(token).then()
      .then(() => {
      /**
       * User is already logged in.
       */
        console.log('You are already logged into an account.');
        // localStorage.setItem("isLoggedIn", "1");
        window.location.replace('index.html');
      })
      .catch(() => {
      /**
       * User has not logged into a bot.
       */
        console.log('Currently not logged into a bot.');
        localStorage.setItem('token', null);
      });
}

/**
 * Check localstorage and run test when necessary.
 */
$(document).ready(function() {
  testLogin();
});

