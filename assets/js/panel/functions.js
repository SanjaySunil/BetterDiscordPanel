/**
 * @file functions.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

function createMessage(message) {
  const userTag = escapeHtml(message.author.tag);
  const userId = message.author.id;
  const avatarUrl =
    message.author.avatarURL() ||
    `./assets/images/discord_defaults_avatars/${message.author.discriminator % 5
    }.png`; // Get the user's avatar, if not, find the color of his default avatar
  const userAvatar = `<a href="${avatarUrl}" target="_blank"><img alt="" src="${avatarUrl}" class="avatarIMG"></a>`;
  const timestamp = formatTimestamp(message.createdAt);
  let html;
  const attachments = [];
  const embeds = [];
  const links = [];

  Array.from(message.attachments).forEach((attachment) => {
    const attachmentUrl = attachment[1].url;
    let attachmentTxt = `<a href="${escapeHtml(
        attachmentUrl,
    )}" target="_blank">`;
    if (
      attachmentUrl.endsWith('.jpg') ||
      attachmentUrl.endsWith('.jpeg') ||
      attachmentUrl.endsWith('.png')
    ) {
      return embeds.push(
          `<div><a href="${attachmentUrl}" target="_blank"><img style="max-width: 100%;max-height: 300px;object-fit: scale-down;margin: 5px 0 0 0" src="${attachmentUrl}" alt=""></a></div>`,
      );
    } else if (attachmentUrl.endsWith('.mp4')) {
      return embeds.push(
          `<div><figure><figcaption>${attachment[1].name}</figcaption><video controls src="${attachmentUrl}"></video></figure></div>`,
      );
    } else if (attachmentUrl.endsWith('.mp3')) {
      return embeds.push(
          `<div><figure><figcaption>${attachment[1].name}</figcaption><audio controls src="${attachmentUrl}"></audio></figure></div>`,
      );
    } else if (
      attachmentUrl.endsWith('.docx') ||
      attachmentUrl.endsWith('.odt')
    ) {
      attachmentTxt += translation.fileType.doc;
    } else if (attachmentUrl.endsWith('.pdf')) {
      attachmentTxt += translation.fileType.pdf;
    } else {
      attachmentTxt += translation.fileType.unknown;
    }
    attachmentTxt += '</a>';
    attachments.push(attachmentTxt);
  });

  if (message.embeds.length) {
    const embed = message.embeds[0];
    const images = [];
    const fields = [];
    let html = `<div class="embed" ${embed.hexColor ? `style="border-left: 5px solid ${embed.hexColor}"` : ''
    }>`;
    if (embed.url) {
      links.push(embed.url);
    }

    if (embed.image) {
      const length = message.embeds.length;
      for (let i = 0; i < message.embeds.length; i++) {
        let style = 'padding: 2px;';
        const image = message.embeds[i].image;
        if (length === 1) {
          style +=
            'border-radius: 8px;width: 100%;height:300px;object-fit: scale-down;';
        } else if (length === 2) {
          if (i === 0) {
            style +=
              'border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;';
          } else {
            style +=
              'border-radius: 0 8px 8px 0;width: 50%;height:300px;object-fit: cover;';
          }
        } else if (length === 3) {
          if (i === 0) {
            style +=
              'border-radius: 8px 0 0 8px;width: 50%;height:300px;object-fit: cover;float: left;';
          } else if (i === 1) {
            style +=
              'border-radius: 0 8px 0 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;';
          } else {
            style +=
              'border-radius: 0 0 8px 0;width: 50%;height:150px;object-fit: cover;vertical-align: top;float: right;';
          }
        } else {
          if (i === 0) {
            style +=
              'border-radius: 8px 0 0 0;width: 50%;height:150px;object-fit: cover;';
          }
          if (i === 1) {
            style +=
              'border-radius:  0 8px 0 0;width: 50%;height:150px;object-fit: cover;';
          }
          if (i === 2) {
            style +=
              'border-radius:  0 0 0 8px;width: 50%;height:150px;object-fit: cover;';
          }
          if (i === 3) {
            style +=
              'border-radius:  0 0 8px 0;width: 50%;height:150px;object-fit: cover;';
          }
        }

        images.push(
            `<a href="${image.url}" target="_blank"><img style="${style}" src="${image.url}" alt=""></a>`,
        );
      }
    }

    if (embed.author) {
      html += embedLinks(embed.author);
    }

    if (embed.title) {
      html += `<div><b>${embed.title}</b></div>`;
    }

    if (embed.description) {
      html += `<div style="word-break: break-word;">${contentReplacement(
          embed.description,
      )}</div>`;
    }

    if (embed.fields.length > 0) {
      html += '<div>';
      embed.fields.forEach((field) => {
        if (field.inline) {
          fields.push(
              `<span style="display: inline-block;min-width: 50%;word-break: break-word;"><b>${field.name
              }</b><br>${contentReplacement(field.value)}</span>`,
          );
        } else {
          fields.push(
              `<div><b>${field.name}</b><br>${contentReplacement(
                  field.value,
              )}</div>`,
          );
        }
      });
      html += `${fields.join('')}</div>`;
    }

    if (embed.video !== null) {
      html += `<div><video controls src="${embed.video.url}"></video></div>`;
    } else if (images.length) {
      html += `<div>${images.join('')}</div>`;
    } else if (embed.thumbnail !== null) {
      html += `<div><a href="${embed.thumbnail.url}" target="_blank"><img style="border-radius: 8px;width: 100%;height:300px;object-fit: cover;" src="${embed.thumbnail.url}" alt=""></a></div>`;
    }

    if (embed.footer) {
      html += embedLinks(embed.footer);
    }
    html += '</div>';
    embeds.push(html);
  }

  html = `<div class="chatMsg" id="${message.id
  }"><div>${userAvatar} ${escapeHtml(userTag)} `;

  // Different types of messages
  if (message.type === 'GUILD_MEMBER_JOIN') {
    html += `${translation.messageType.serverJoin} `;
  } else if (message.type === 'PINS_ADD') {
    html += `${translation.messageType.pin} `;
  } else if (message.type === 'CHANNEL_FOLLOW_ADD') {
    html += `${translation.messageType.channelNews} `;
  } else if (message.type.includes('USER_PREMIUM_GUILD_SUBSCRIPTION')) {
    html += `${translation.messageType.boost} `; // Covers all levels of boosting
  } else if (message.content === '' && attachments.length > 0) {
    html += `${translation.text.fileSent} `;
  }

  // Timestamp & mention button
  html += `<span class="font-size-mini">${timestamp}</span> <button class="mini chat-action" data-value="<@!${userId}>" onclick="addText(this.dataset.value)"><i class="mdi mdi-at"></i></button>`;

  // Delete button
  if (
    (guilds.val() === 'DM' && message.author.id === client.user.id) ||
    message.guild.me.hasPermission('MANAGE_MESSAGES')
  ) {
    html += `<button class="mini chat-action" data-value="${message.id}" onclick="delMsg(this.dataset.value)"><i class="mdi mdi-trash-can"></i></button>`;
  }
  html += '</div>';

  html += `<div class="messageContent">${message.content ? contentReplacement(message.content, links) : ''
  }</div>`;

  if (embeds.length) {
    html += `${embeds.join('')}`;
  }

  if (attachments.length) {
    html += `<div>${translation.text.attachmentTxt} : ${attachments.join(
        ', ',
    )}</div>`;
  }

  return `${html}</div>`;
}

function updateChannel() {
  let channel;
  let user;

  chat.empty();
  if (guilds.val() === 'DM') {
    user = client.users.cache.find((user) => user.id === channels.val());

    channel = user.dmChannel;
    const avatarUrl =
      user.avatarURL() ||
      `./assets/images/discord_defaults_avatars/${user.discriminator % 5}.png`;
    guildName.html(
        `<a href="${avatarUrl}" target="_blank"><img alt="" src="${avatarUrl}" class="avatarIMG"/></a> ${escapeHtml(
            user.username,
        )}`,
    );
    guildPic.html(
        `<a href="${avatarUrl}" target="_blank"><img alt="" src="${avatarUrl}" class="rounded-circle avatar-lg img-thumbnail"/></a>`,
    );
    guildNameNoPic.html(`${escapeHtml(user.username)}`);
    $('.guildInfo').html(
        `${translation.text.userId} : (${user.id}) <button class="mini" data-value="<@!${user.id}>" onclick="addText(this.dataset.value)">@</button>`,
    );

    channelName.html(`#${escapeHtml(user.username)}`);
    document.title = `#${escapeHtml(user.username)} - BetterDiscordPanel`;

    if (channel !== null) {
      channel.messages.fetch().then((messages) => {
        Array.from(messages)
            .reverse()
            .forEach((msg) => {
              chat.html(chat.html() + createMessage(msg[1]));
            });
      });
    }
  } else {
    channel = client.channels.cache.find((c) => c.id === channels.val());

    if (channel === null) {
      return;
    }

    channelName.html(`#${escapeHtml(channel.name)}`);
    document.title = `#${escapeHtml(channel.name)} - BetterDiscordPanel`;

    channel.messages.fetch().then((messages) => {
      Array.from(messages)
          .reverse()
          .forEach((msg) => {
            chat.html(chat.html() + createMessage(msg[1]));
          });
    });

    $('.user-chat').removeClass('user-chat-show');
    $('#chat').fadeIn();
    $('#createPermissionsInvite').fadeOut();
    $('#lastMessages').fadeOut();

    // $("#chk2")[0].checked = true;
  }
}

function updateGuild() {
  const usersArray = [];
  const guildEmojis = [];
  const guildMembers = [];
  let guild;
  let html = '';

  channels.children('option').remove();
  if (guilds.val() === 'DM') {
    // includes client self user and clyde
    if (client.users.cache.size <= 2) {
      return;
    }

    client.users.cache.forEach((user) => {
      if (!user.bot) {
        usersArray.push([
          escapeHtml(user.username.toLowerCase()),
          user.id,
          escapeHtml(user.tag),
        ]);
      }
    });

    usersArray.sort();

    for (let i = 0; i < usersArray.length; i++) {
      channels.append(
          `<option value="${usersArray[i][1]}">${escapeHtml(
              usersArray[i][2],
          )}</option>`,
      );
    }
  } else {
    guild = client.guilds.cache.find((g) => g.id === guilds.val());

    if (guild.channels.cache.filter((c) => c.type === 'text').size > 0) {
      guild.channels.cache
          .filter((c) => c.type === 'text')
          .forEach((channel) => {
            if (channel.permissionsFor(guild.me).has('VIEW_CHANNEL')) {
              channels.append(
                  `<option value="${channel.id}">#${escapeHtml(
                      channel.name,
                  )}</option>`,
              );
            }
          });
    }

    guildName.html(
        `<a href="${guild.iconURL() || './img/icon/info.png'
        }" target="_blank"><img alt="" src="${guild.iconURL() || 'assets/images/discord_defaults_avatars/0.png'
        }" class="avatarIMG"/></a> ${escapeHtml(guild.name)}`,
    );
    guildPic.html(
        `<a href="${guild.iconURL() || './img/icon/info.png'
        }" target="_blank"><img alt="" src="${guild.iconURL() || 'assets/images/discord_defaults_avatars/0.png'
        }" class="rounded-circle avatar-lg img-thumbnail"/></a>`,
    );
    guildNameNoPic.html(`${escapeHtml(guild.name)}`);

    // General information

    html += `<div>${translation.infos.owner}: ${guild.owner.user.tag
    } <button data-value="<@!${guild.owner.user.id
    }>" class="mini" onclick="addText(this.dataset.value)"><i class="mdi mdi-at"></i></button></div><div>${translation.infos.members
    }: ${guild.members.cache.filter((member) => !member.user.bot).size
    }</div><div>${translation.infos.vChannels}: ${guild.channels.cache.filter((c) => c.type === 'voice').size
    }</div><div>${translation.infos.tChannels}: ${guild.channels.cache.filter((c) => c.type === 'text').size
    }</div><br>`;

    // Members button

    guild.members.cache
        .filter((member) => !member.user.bot)
        .forEach((member) => {
          const avatarUrl =
          member.user.avatarURL() ||
          `./assets/images//discord_defaults_avatars/${member.user.discriminator % 5
          }.png`;
          guildMembers.push(
              `<div style="margin: 4px 0 4px 0"><a href="${avatarUrl}" target="_blank"><img alt="" style="display: inline;" class="avatarIMG" src="${avatarUrl}"/></a> ${member.nickname ? member.nickname : member.user.tag} <button data-value="<@!${member.user.id}>" onclick="addText(this.dataset.value)" class="mini"><i class="mdi mdi-at"></i></button></div>`,
          );
        });
    html += `<button onclick='$("#guildMembers").toggle("fast")' class="action">${translation.infos.members
    }</button><div id="guildMembers" style="display:none;">${guildMembers.join(
        '',
    )}</div>`;

    // Roles button

    html += `<button onclick='$("#guildRoles").toggle("fast")' class="action">${translation.infos.roles
    }</button><div id="guildRoles" style="display:none;">${guild.roles.cache
        .map((role) => `${escapeHtml(role.name)} (${role.id})`)
        .join('<div style=\'margin: 8px 0 8px 0\'></div>')}</div>`;

    // Channels button

    if (guild.channels.cache.size > 0) {
      html += `<button onclick='$("#guildChannels").toggle("fast")' class="action">${translation.infos.channels
      }</button><div id="guildChannels" style="display:none;">${guild.channels.cache
          .map((channels) => `${escapeHtml(channels.name)} (${channels.id})`)
          .join('<div style=\'margin: 8px 0 8px 0\'></div>')}</div>`;
    }

    // Emoji button

    if (guild.emojis.cache.size > 0) {
      guild.emojis.cache.forEach((emoji) => {
        if (emoji.animated) {
          guildEmojis.push(
              `<img alt="" class="emojiImg" src="${emoji.url}" onclick="addText('<${emoji.identifier}>')"/>`,
          );
        } else {
          guildEmojis.push(
              `<img alt="" class="emojiImg" src="${emoji.url}" onclick="addText('<:${emoji.identifier}>')"/>`,
          );
        }
      });
      html += `<button onclick='$("#guildEmojis").toggle("fast")' class="action">${translation.infos.emojis
      }</button><div id="guildEmojis" style="display:none;">${guildEmojis.join(
          ' ',
      )}</div>`;
    }

    $('.guildInfo').html(html);
  }

  updateChannel();
}

function fetchGuilds() {
  channels.children('option').remove();
  guilds.children('option').remove();

  if (client.guilds.cache.size === 0) {
    return;
  }

  client.guilds.cache.forEach((guild) => {
    guilds.append(
        `<option value="${guild.id}">${escapeHtml(guild.name)}</option>`,
    );
  });
  /**
  guilds.append(
  `<option value="DM">[${translation.text.privateMessages}]</option>`
  );
  */

  updateGuild();
}

function sendMessage() {
  let user;

  if (toSend.html() === '') {
    tempChange('#send', `[${translation.errors.emptyMsg}]`, 1000);
  } else {
    const formatted = toSend
        .html()
        .replace(/<b>/g, '**')
        .replace(/<\/b>/g, '**')
        .replace(/<em>/g, '*')
        .replace(/<\/em>/g, '*')
        .replace(/<i>/g, '*')
        .replace(/<\/i>/g, '*')
        .replace(/<u>/g, '__')
        .replace(/<\/u>/g, '__')
        .replace(/<strike>/g, '~~')
        .replace(/<\/strike>/g, '~~')
        .replace(/<s>/g, '~~')
        .replace(/<\/s>/g, '~~')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/<br>/g, '\n');

    if (guilds.val() === 'DM') {
      user = client.users.cache.find((user) => user.id === channels.val());
      user.send(formatted);
    } else {
      client.channels.cache
          .find((channel) => channel.id === channels.val())
          .send(formatted)
          .catch(() => {
            tempChange(
                '#send',
                `[${translation.errors.missingPermissions}]`,
                1000,
            );
          });
    }
    toSend.html('');
  }
}

document.getElementById('toSend').placeholder = 'Type a message.';

function selectChannelOnReload(channel) {
  $(`.channels option[value="${channel}"]`).prop('selected', true);
  setTimeout(() => {
    refreshChat.click();
  }, 1000);
}

function generateInvite() {
  if (guilds.val() === 'DM') {
    tempChange('#inviteBtn', `[${translation.errors.dm}]`, 1000);
  } else {
    client.channels.cache
        .find((channel) => channel.id === channels.val())
        .createInvite()
        .then((invite) => {
          alert(`discord.gg/${invite.code}`);
        })
        .catch(() => {
          tempChange(
              '#inviteBtn',
              `[${translation.errors.missingPermissions}]`,
              1000,
          );
        });
  }
}

function OpenlastMessages() {
  $('.channelName').html('Last Messages');
  $('.user-chat').addClass('user-chat-show');
  $('#chat').fadeOut();
  $('#createPermissionsInvite').fadeOut();
  $('#lastMessages').fadeIn();
}

function OpenChat() {
  $('.channelName').html('Chat');
  $('.user-chat').removeClass('user-chat-show');
  $('#chat').fadeIn();
  $('#createPermissionsInvite').fadeOut();
  $('#lastMessages').fadeOut();
}

function OpenPermissionsInviteSettings() {
  $('.channelName').html('Create Bot Invite');
  $('#chat').fadeOut();
  $('#createPermissionsInvite').fadeIn();
  $('#lastMessages').fadeOut();
}

function changeBotUsername() {
  const usernameInput = document.getElementById('changeUsername').value;

  client.user.setUsername(usernameInput).catch((err) => {
    console.log(err);
  });
}

function setStatus(status) {
  try {
    client.user.setPresence({
      status: status,
    });
    localStorage.setItem('bot-status', status);
    if (status !== 'dnd') {
      $('.bot-status').html(status[0].toUpperCase() + status.substring(1));
    } else {
      $('.bot-status').html('Do Not Disturb');
    }

    console.log(`Successfully updated status to ${status}.`);
  } catch (err) {
    console.log(err);
  }
}

function evalCommand() {
  const code = document.getElementById('eval').value;
  try {
    const executeEval = eval(code);

    if (executeEval == undefined) {
      errorNotification(`ERROR: undefined`);
    } else {
      successNotification(executeEval);
      console.log(JSON.stringify(executeEval, null, 2));
    }
  } catch (err) {
    errorNotification(`ERROR: ${err}`);
  }
}
