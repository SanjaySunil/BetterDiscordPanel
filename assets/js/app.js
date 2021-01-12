/**
 * @file app.js
 * @author Sanjay Sunil 
 * @license GPL-3.0
 */

!(function (a) {
	"use strict";
	a(".dropdown-menu a.dropdown-toggle").on("click", function (t) {
		return (
			a(this).next().hasClass("show") ||
				a(this)
					.parents(".dropdown-menu")
					.first()
					.find(".show")
					.removeClass("show"),
			a(this).next(".dropdown-menu").toggleClass("show"),
			!1
		);
	}),
		a(function () {
			a('[data-toggle="tooltip"]').tooltip();
		}),
		a(function () {
			a('[data-toggle="popover"]').popover();
		}),
		a("#light-dark").on("click", function (t) {
			if (localStorage.getItem("theme") == "dark") {
				localStorage.setItem("theme", "light");
			} else {
				localStorage.setItem("theme", "dark");
			}
			location.reload();
		}),
		Waves.init();
	$("[contenteditable]").focusout(function () {
		var element = $(this);
		if (!element.text().trim().length) {
			element.empty();
		}
	});
	if (localStorage.getItem("theme") == "light") {
		a("#bootstrap-style").attr("disabled", !1),
			a("#app-dark-style").attr("disabled", !0),
			a("#app-style").attr("disabled", !1);
		a("#bootstrap-dark-style").attr("disabled", !0);
	} else {
		localStorage.setItem("theme", "dark");
		a("#bootstrap-style").attr("disabled", !0),
			a("#app-dark-style").attr("disabled", !1),
			a("#app-style").attr("disabled", !0);
		a("#bootstrap-dark-style").attr("disabled", !1);
	}
})(jQuery);

const hostname = location.hostname;
const pathname = window.location.pathname;

console.log("Host: ", hostname);
console.log("File path: ", pathname);
