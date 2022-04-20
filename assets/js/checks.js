/**
 * @file checks.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

if (navigator.userAgent !== "BDP (http://example.com), v0.0.1") {
  warnNotification("Please set User Agent to 'BDP (http://example.com), v0.0.1'. Visit <a href='https://github.com/SanjaySunil/BetterDiscordPanel/blob/dev/docs/prerequisites/prerequisites.md'>here</a> for more information.")
} else {
  successNotification("All checks passed successfully.")
}

