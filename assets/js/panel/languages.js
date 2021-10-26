/**
 * @file languages.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

Object.values(locales).forEach((locale) => {
  switchLang.html(
      switchLang.html() +
    `
      <div class="py-3">
      <h5 class="font-size-13 mb-0"><a href="" onclick="localStorage.setItem('locale', '${locale.langCode}'); location.reload()">${locale.language}</a>
      </h5>
      </div>
      `,
  );
});
