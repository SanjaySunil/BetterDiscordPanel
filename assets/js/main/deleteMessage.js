/**
 * @file deleteMessage.js
 * @author Sanjay Sunil 
 * @license GPL-3.0
 */

function delMsg(id) {
	let guilds = $(".guilds");
	let channels = $(".channels");
	let channel;

	if (guilds.val() === "DM") {
		channel = client.channels.cache.find(
			(channel) =>
				channel.type === "dm" && channel.recipient.id === channels.val()
		);
	} else {
		let guild = client.guilds.cache.find((g) => g.id === guilds.val());
		channel = guild.channels.cache.find((c) => c.id === channels.val());
	}
	let message = channel.messages.cache.find((m) => m.id === id);

	if (!message.deletable) {
		return;
	}

	message.delete().catch((e) => {
		console.log(e);
	});
}
