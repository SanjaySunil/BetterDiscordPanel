/**
 * @file deleteMessage.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

function delMsg(message) {
    if (!message.deletable()) {
      return;
    }
    let guilds = $("#guilds");
    let channels = $("#channels");
    if (guilds.val() === "DM") {
      let channel = client.channels.cache.find(
        (channel) =>
        channel.type === "dm" && channel.recipient.id === channels.val()
      );
      channel.messages.cache
        .find((m) => m.id === message)
        .delete()
        .catch();
    } else {
      let guild = client.guilds.cache.find((g) => g.id === guilds.val());
      let channel = guild.channels.cache.find((c) => c.id === channels.val());
      channel.messages.cache
        .find((m) => m.id === message)
        .delete()
        .catch();
    }
}