/**
 * @file app.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

! function (a) {
    "use strict";
    a(".dropdown-menu a.dropdown-toggle").on("click", function (t) {
            return a(this).next().hasClass("show") || a(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), a(this).next(".dropdown-menu").toggleClass("show"), !1
        }), a(function () {
            a('[data-toggle="tooltip"]').tooltip()
        }), a(function () {
            a('[data-toggle="popover"]').popover()
        }),

        a("#light-dark").on("click", function (t) {
            if (localStorage.getItem("theme") == "dark") {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
            location.reload();
        }), Waves.init()
    $("[contenteditable]").focusout(function () {
        var element = $(this);
        if (!element.text().trim().length) {
            element.empty();
        }
    });
    if (localStorage.getItem("theme") == "light") {
        a("#bootstrap-style").attr("disabled", !1),
            a("#app-dark-style").attr("disabled", !0),
            a("#app-style").attr("disabled", !1)
        a("#bootstrap-dark-style").attr("disabled", !0)
    } else {
        localStorage.setItem("theme", "dark");
        a("#bootstrap-style").attr("disabled", !0),
            a("#app-dark-style").attr("disabled", !1),
            a("#app-style").attr("disabled", !0)
        a("#bootstrap-dark-style").attr("disabled", !1)
    }
}(jQuery);

const status = $("#status");

$(document).ready(function () {
    setTimeout(function () {
        $('.preloader').fadeOut(300, function () {});
    }, 2000);
    setTimeout(function () {
        status.html("Ready!");
    }, 500);


    new Noty({
        type: 'info',
        theme: "nest",
        closeWith: ['button'],
        text: '<a href="https://github.com/D3VSJ/BetterDiscordPanel">Welcome to BetterDiscordPanel!<iframe src="https://ghbtns.com/github-btn.html?user=D3VSJ&repo=BetterDiscordPanel&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe></a>',
        dismissQueue: true,
    }).show()
});

$('.000').replaceWith('Copyright © 2020');
$('.001').replaceWith('Sanjay Sunil');
$('.002').replaceWith('All rights reserved.');

const hostname = location.hostname;
const pathname = window.location.pathname;

console.log(hostname)
console.log(pathname)

//if (hostname != "")
//    console.log("WARNING: YOU ARE NOT ALLOWED TO DISTRIBUTE BETTERDISCORDPANEL ONTO A DOMAIN!")

var authorizedpath = pathname.startsWith("/");

if (authorizedpath = false) {
    console.log("RESTRICTED");
    $("#app").style.display("none");

} else if (hostname != "") {
    console.log("RESTRICTED");
    $("#app").style.display("none");

} else {
    console.log("BetterDiscordPanel is now Authorized.");
}

//const verification_result = result.startsWith("file:///");
//console.log(verification_result);