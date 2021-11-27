/**
 * @file update.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function versionCompare(current, latest, options) {
  const lexicographical = options && options.lexicographical;
  const zeroExtend = options && options.zeroExtend;
  let currentparts = current.split('.');
  let latestparts = latest.split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!currentparts.every(isValidPart) || !latestparts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (currentparts.length < latestparts.length) currentparts.push('0');
    while (latestparts.length < currentparts.length) latestparts.push('0');
  }

  if (!lexicographical) {
    currentparts = currentparts.map(Number);
    latestparts = latestparts.map(Number);
  }

  for (let i = 0; i < currentparts.length; ++i) {
    if (latestparts.length == i) {
      errorNotification('You have a version that does not exist on GitHub!');
      return 'You have a version that does not exist on GitHub!';
    }

    if (currentparts[i] == latestparts[i]) {
      continue;
    } else if (currentparts[i] > latestparts[i]) {
      errorNotification('You have a version that does not exist on GitHub!');
      return 'You have a version that does not exist on GitHub!';
    } else {
      successNotification('<a href=\'https://github.com/SanjaySunil/BetterDiscordPanel/releases/tag/2.6.2\' target=\'_blank\'>New update available!</a>');
      return 'New update available!';
    }
  }

  if (currentparts.length != latestparts.length) {
    successNotification('<a href=\'https://github.com/SanjaySunil/BetterDiscordPanel/releases/tag/2.6.2\' target=\'_blank\'>New update available!</a>');
    return 'New update available!';
  }

  successNotification('No update available.');
  return 'No update available.';
}

$(document).ready(function() {
  const HttpClient = function() {
    this.get = function(aUrl, aCallback) {
      const request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          aCallback(request.responseText);
        }
      };

      request.open('GET', aUrl, true);
      request.send(null);
    };
  };

  const client = new HttpClient();
  client.get('https://api.github.com/repos/SanjaySunil/BetterDiscordPanel/releases/latest',
      function(response) {
        const data = JSON.parse(response);
        const latestVersion = data.tag_name;
        infoNotification('<a href="https://github.com/SanjaySunil/BetterDiscordPanel" target="blank" class="welcome-tag">Welcome to BetterDiscordPanel v' + version + '! <iframe src="https://ghbtns.com/github-btn.html?user=SanjaySunil&repo=BetterDiscordPanel&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe></a>');
        betterDiscordConsole(`BetterDiscordPanel v${version}`, 'lightblue');
        betterDiscordConsole(`Latest Version: v${latestVersion}`, 'lightblue');
        console.log(versionCompare(version, latestVersion));
      },
  );
});
