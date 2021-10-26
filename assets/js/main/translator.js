/**
 * @file translator.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

let locale;
if (!Object.keys(locales).includes(localStorage.getItem('locale'))) {
  localStorage.setItem('locale', 'en');
}
locale = localStorage.getItem('locale');
const translation = locales[locale];

Object.keys(locales['en']).forEach((key) => {
  if (typeof locales['en'][key] === 'string') {
    if (translation[key] === ('' || undefined)) {
      translation[key] = locales['en'][key];
    }
  } else if (typeof locales['en'][key] === 'object') {
    if (!translation[key]) {
      translation[key] = locales['en'][key];
    }
  } else {
    Object.keys(locales['en'][key]).forEach((subKey) => {
      if (translation[key][subKey] === ('' || undefined)) {
        translation[key][subKey] = locales['en'][key][subKey];
      }
    });
  }
});
