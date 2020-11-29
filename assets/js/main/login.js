/**
 * @file login.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

$(document).ready(function () {
  new Noty({
      type: 'info',
      theme: "nest",
      closeWith: ['button'],
      text: '<a href="https://github.com/D3VSJ/BetterDiscordPanel">Welcome to BetterDiscordPanel!<iframe src="https://ghbtns.com/github-btn.html?user=D3VSJ&repo=BetterDiscordPanel&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe></a>',
      dismissQueue: true,
  }).show()
});

if (localStorage.getItem("isLoggedIn") == "1") {
  window.location.replace('index.html')
}
else {
}

function login() {
  let token;
  token = document.getElementById("token").value;
  localStorage.setItem("token", token);
  
  token = localStorage.getItem("token");
  
  const client = new Discord.Client({
    messageCacheMaxSize: 5,
    fetchAllMembers: false
  });
  
  client.login(token).then()
    .then(() => {
      console.log("Success!")
      localStorage.setItem("isLoggedIn", "1");
      window.location.replace('index.html')
    })
    .catch(() => {
      new Noty({
        type: 'error',
        theme: "nest",
        closeWith: ['button'],
        text: localeFile.token.invalid,
        timeout: 5000,
        progressBar: true,
        dismissQueue: true, 
        force: false, 
        maxVisible: 5, 
      }).show()
      localStorage.setItem("token", null);
    });
}