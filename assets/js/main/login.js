/**
 * @file login.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

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