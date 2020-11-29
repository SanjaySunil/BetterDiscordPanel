/**
 * @file isLoggedIn.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

let token;

if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "" ||
    localStorage.getItem("token") === null
) {
    localStorage.setItem("isLoggedIn", "0");
    window.location.replace('login.html')
}

status.html("Connecting to Bot Token ...")

token = localStorage.getItem("token")

const client = new Discord.Client({
    messageCacheMaxSize: 5,
    fetchAllMembers: false
});


client.login(token)
    .then(() => {
        status.html("Ready!");
        setTimeout(function () {
            $('.preloader').fadeOut(300, function () {});
        }, 1500);
        localStorage.setItem("isLoggedIn", "1");
    })
    .catch(() => {
        status.html("ERROR! Invalid Token!");
        location.replace('login.html')
    });

