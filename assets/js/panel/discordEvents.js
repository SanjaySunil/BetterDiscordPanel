/**
 * @file discordEvents.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

client.on('message', (message) => {
  if (Number(message.channel.id) === Number(channels.val())) {
    chat.html(chat.html() + createMessage(message));
  }

  if (
    (Number(message.author.id) === Number(channels.val()) ||
      message.author.id === client.user.id) &&
    message.channel.type === 'dm'
  ) {
    updateChannel();
  }

  if (
    message.channel.type !== 'dm' &&
    (Number(message.author.id) === Number(client.user.id) ||
      !message.author.bot)
  ) {
    lastMessages.html(
        lastMessages.html() +
        `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(
            message.guild.name,
        )} | ${message.guild.id} | ${escapeHtml(message.author.tag)} | ${
          message.author.id
        }] </b> \n${contentReplacement(message.content)}`,
    );
  } else if (message.channel.type === 'dm' && !message.author.bot) {
    lastMessages.html(
        lastMessages.html() +
        `<br><b>[${translation.text.privateMessages}] ${escapeHtml(
            message.author.tag,
        )} | ${message.author.id} </b> \n${contentReplacement(message.content)}`,
    );
  }

  localStorage.setItem('lastMessages', $('#lastMessages').html());
});

client.on('ready', () => {
  const storageBotStatus = localStorage.getItem('bot-status');
  let botstatus;

  lastMessages.html(localStorage.getItem('lastMessages') || '');
  $('.bot-name').html(client.user.username);
  $('.bot-discriminator').html('#' + client.user.discriminator);
  $('.bot-id').html(client.user.id);
  $('.bot-createdAt').html(client.user.createdAt);
  $('.bot-avatar').attr(
      'src',
      client.user.avatarURL({format: 'png', dynamic: true, size: 1024}) || "assets/images/discord_defaults_avatars/0.png",
  );
  $('.bot-guilds').html(client.guilds.cache.size);

  if (
    storageBotStatus === 'online' ||
    storageBotStatus === 'idle' ||
    storageBotStatus === 'dnd' ||
    storageBotStatus === 'invisible'
  ) {
    setStatus(storageBotStatus);
  } else {
    setStatus('online');
  }

  setTimeout(function() {
    botstatus = JSON.stringify(client.user.presence.status);
    $('#changeUsername').attr('placeholder', client.user.username);

    if (botstatus == '"online"') {
      $('.bot-status').html('Online');
    } else if (botstatus == '"idle"') {
      $('.bot-status').html('Idle');
    } else if (botstatus == '"invisible"') {
      $('.bot-status').html('Invisible');
    } else if (botstatus == '"dnd"') {
      $('.bot-status').html('Do Not Disturb');
    } else {
      $('.bot-status').html();
    }
  }, 3000);

  fetchGuilds();
});

client.on('messageDelete', (message) => {
  if (Number(message.channel.id) === Number(channels.val())) {
    $(`#${message.id}`).remove();
  }

  if (
    (Number(message.author.id) === Number(channels.val()) ||
      message.author.id === client.user.id) &&
    message.channel.type === 'dm'
  ) {
    updateChannel();
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (Number(oldMessage.channel.id) === Number(channels.val())) {
    $(`#${oldMessage.id}`).replaceWith(createMessage(newMessage));
    $(`#${oldMessage.id} > span.font-size-mini`).html(
        `Edited at : ${formatTimestamp(newMessage.editedAt)}`,
    );
  }

  if (
    (Number(oldMessage.author.id) === Number(channels.val()) ||
      oldMessage.author.id === client.user.id) &&
    oldMessage.channel.type === 'dm'
  ) {
    updateChannel();
  }
});

client.on('guildCreate', () => {
  fetchGuilds();
});

client.on('guildDelete', () => {
  fetchGuilds();
});

client.on('guildUpdate', (oldGuild) => {
  if (oldGuild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('guildMemberAdd', (member) => {
  if (member.guild.id === guilds.val()) {
    updateGuild();
    selectChannelOnReload();
  }
});

client.on('guildMemberRemove', (member) => {
  if (member.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('channelCreate', (channel) => {
  if (guilds.val() === '[DM]' || channel.type === 'dm') {
    return;
  }

  if (channel.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('channelDelete', (channel) => {
  if (channel.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('channelUpdate', (oldChannel) => {
  if (oldChannel.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('emojiCreate', (emoji) => {
  if (emoji.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('emojiDelete', (emoji) => {
  if (emoji.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

client.on('emojiUpdate', (oldEmoji) => {
  if (oldEmoji.guild.id === guilds.val()) {
    const channel = channels.val();
    updateGuild();
    selectChannelOnReload(channel);
  }
});

/* AutoScroll Tests - Ignore
let scrollState = true;

var chatElement = new SimpleBar(document.getElementById('scrollBarChat'));

function scrollAnim(time) {
  if (scrollState == true) {
    $(chatElement).animate({
      scrollTop: $(chatElement)[0].scrollHeight - $(chatElement).height()
    }, time);
    console.log("Scrolling!")
  }
}

$("#chat").bind("wheel", (event) => {
  if (event.originalEvent.deltaY < 0) {
    console.log("False")
    scrollState = false;
  } else if (event.originalEvent.deltaY > 0 && $("#chat").scrollTop() + $("#chat").innerHeight() >= $("#chat")[0].scrollHeight - 100) {
    console.log("True")
    scrollState = true;
  }
});

setInterval(() => {
  scrollAnim(100);
  console.log("Checking.")
}, 1000);
*/
