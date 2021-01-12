function versionCompare(current, latest, options) {
	var lexicographical = options && options.lexicographical,
		zeroExtend = options && options.zeroExtend,
		currentparts = current.split("."),
		latestparts = latest.split(".");

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	}

	if (!currentparts.every(isValidPart) || !latestparts.every(isValidPart)) {
		return NaN;
	}

	if (zeroExtend) {
		while (currentparts.length < latestparts.length) currentparts.push("0");
		while (latestparts.length < currentparts.length) latestparts.push("0");
	}

	if (!lexicographical) {
		currentparts = currentparts.map(Number);
		latestparts = latestparts.map(Number);
	}

	for (var i = 0; i < currentparts.length; ++i) {
		if (latestparts.length == i) {
			new Noty({
				type: "error",
				theme: "nest",
				closeWith: ["button"],
				text: "You have a version that does not exist on GitHub!",
				timeout: 5000,
				progressBar: true,
				dismissQueue: true,
				force: false,
				maxVisible: 5,
			}).show();
			return "You have a version that does not exist on GitHub!";
		}

		if (currentparts[i] == latestparts[i]) {
			continue;
		} else if (currentparts[i] > latestparts[i]) {
			new Noty({
				type: "error",
				theme: "nest",
				closeWith: ["button"],
				text: "You have a version that does not exist on GitHub!",
				timeout: 5000,
				progressBar: true,
				dismissQueue: true,
				force: false,
				maxVisible: 5,
			}).show();
			return "You have a version that does not exist on GitHub!";
		} else {
			new Noty({
				type: "info",
				theme: "nest",
				closeWith: ["button"],
				text: "New update available!",
				timeout: 5000,
				progressBar: true,
				dismissQueue: true,
				force: false,
				maxVisible: 5,
			}).show();
			return "New update available!";
		}
	}

	if (currentparts.length != latestparts.length) {
		new Noty({
			type: "info",
			theme: "nest",
			closeWith: ["button"],
			text: "New update available!",
			timeout: 5000,
			progressBar: true,
			dismissQueue: true,
			force: false,
			maxVisible: 5,
		}).show();
		return "New update available!";
	}

	return "No update available.";
}

$(document).ready(function () {
	var HttpClient = function () {
		this.get = function (aUrl, aCallback) {
			var anHttpRequest = new XMLHttpRequest();
			anHttpRequest.onreadystatechange = function () {
				if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
					aCallback(anHttpRequest.responseText);
			};

			anHttpRequest.open("GET", aUrl, true);
			anHttpRequest.send(null);
		};
	};

	var client = new HttpClient();
	client.get(
		"https://api.github.com/repos/SanjaySunil/BetterDiscordPanel/releases/latest",
		function (response) {
			var data = JSON.parse(response);
			var latestVersion = data.tag_name;
			new Noty({
				type: "info",
				theme: "nest",
				closeWith: ["button"],
				text:
					'<a href="https://github.com/SanjaySunil/BetterDiscordPanel" target="blank" class="welcome-tag">Welcome to BetterDiscordPanel v' +
					version +
					'! <iframe src="https://ghbtns.com/github-btn.html?user=SanjaySunil&repo=BetterDiscordPanel&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe></a>',
				dismissQueue: true,
			}).show();
			console.log("Current Version: " + version);
			console.log("Latest Version: " + latestVersion);
			console.log(versionCompare(version, latestVersion));
		}
	);
});
