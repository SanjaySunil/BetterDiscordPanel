/**
 * @file deleteMessage.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function delMsg(id) {
  const guilds = $('.guilds');
  const channels = $('.channels');
  let channel;

  if (guilds.val() === 'DM') {
    channel = client.channels.cache.find(
        (channel) =>
          channel.type === 'dm' && channel.recipient.id === channels.val(),
    );
  } else {
    const guild = client.guilds.cache.find((g) => g.id === guilds.val());
    channel = guild.channels.cache.find((c) => c.id === channels.val());
  }
  const message = channel.messages.cache.find((m) => m.id === id);

  if (!message.deletable) {
    return;
  }

  message.delete().catch((e) => {
    console.log(e);
  });
}
