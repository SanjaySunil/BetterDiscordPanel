/**
 * @file translator.js
 * @author Sanjay Sunil 
 * @license GPL-3.0
 */

let locale;
if (!Object.keys(locales).includes(localStorage.getItem("locale"))) {
	localStorage.setItem("locale", "en");
}
locale = localStorage.getItem("locale");
let localeFile = locales[locale];

Object.keys(locales["en"]).forEach((key) => {
	if (typeof locales["en"][key] === "string") {
		if (localeFile[key] === ("" || undefined)) {
			localeFile[key] = locales["en"][key];
		}
	} else if (typeof locales["en"][key] === "object") {
		if (!localeFile[key]) {
			localeFile[key] = locales["en"][key];
		}
	} else {
		Object.keys(locales["en"][key]).forEach((subKey) => {
			if (localeFile[key][subKey] === ("" || undefined)) {
				localeFile[key][subKey] = locales["en"][key][subKey];
			}
		});
	}
});
