/**
 * @file discordEvents.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

client.on("message", (message) => {
  if (Number(message.channel.id) === Number(channels.val())) {
    chat.html(chat.html() + createMessage(message));
  }

  if (
    (Number(message.author.id) === Number(channels.val()) ||
      message.author.id === client.user.id) &&
    message.channel.type === "dm"
  ) {
    updateChannel();
  }

  if (
    message.channel.type !== "dm" &&
    (Number(message.author.id) === Number(client.user.id) ||
      !message.author.bot)
  ) {
    lastMessages.html(
      lastMessages.html() +
        `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(
          message.guild.name
        )} | ${message.guild.id} | ${escapeHtml(message.author.tag)} | ${
          message.author.id
        }] </b> \n${contentReplacement(message.content)}`
    );
  } else if (message.channel.type === "dm" && !message.author.bot) {
    lastMessages.html(
      lastMessages.html() +
        `<br><b>[${localeFile.text.privateMessages}] ${escapeHtml(
          message.author.tag
        )} | ${message.author.id} </b> \n${contentReplacement(message.content)}`
    );
  }

  localStorage.setItem("lastMessages", $("#lastMessages").html());
});

client.on("ready", () => {
  lastMessages.html(localStorage.getItem("lastMessages") || "");
  $(".bot-name").html(client.user.username);
  $(".bot-discriminator").html("#" + client.user.discriminator);
  $(".bot-userid").html(client.user.id);
  $(".bot-createdAt").html(client.user.createdAt);
  //  $('#bot-guilds').html(client.guilds.size);
  //  $('#bot-channels').html(client.channels.size);
  //  $('#bot-users').html(client.users.size);
  // $(".bot-presence").html(client.user.presence);
  // $('img.bot-avatar').attr('src', client.user.displayAvatarURL);
  // $('link.bot-avatar').attr('href', client.user.displayAvatarURL);
  fetchGuilds();
});

client.on("messageDelete", (message) => {
  if (Number(message.channel.id) === Number(channels.val())) {
    $(`#${message.id}`).remove();
  }

  if (
    (Number(message.author.id) === Number(channels.val()) ||
      message.author.id === client.user.id) &&
    message.channel.type === "dm"
  ) {
    updateChannel();
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (Number(oldMessage.channel.id) === Number(channels.val())) {
    $(`#${oldMessage.id}`).replaceWith(createMessage(newMessage));
    $(`#${oldMessage.id} > span.font-size-mini`).html(
      `Edited at : ${formatTimestamp(newMessage.editedAt)}`
    );
  }

  if (
    (Number(oldMessage.author.id) === Number(channels.val()) ||
      oldMessage.author.id === client.user.id) &&
    oldMessage.channel.type === "dm"
  ) {
    updateChannel();
  }
});

client.on("guildCreate", () => {
  fetchGuilds();
});

client.on("guildDelete", () => {
  fetchGuilds();
});

client.on("guildUpdate", (oldGuild) => {
  if (oldGuild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id === guilds.val()) {
    updateGuild();
    selectChannelOnReload();
  }
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("channelCreate", (channel) => {
  if (guilds.val() === "[DM]" || channel.type === "dm") {
    return;
  }

  if (channel.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("channelDelete", (channel) => {
  if (channel.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("channelUpdate", (oldChannel) => {
  if (oldChannel.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("emojiCreate", (emoji) => {
  if (emoji.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("emojiDelete", (emoji) => {
  if (emoji.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on("emojiUpdate", (oldEmoji) => {
  if (oldEmoji.guild.id === guilds.val()) {
    let channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});
