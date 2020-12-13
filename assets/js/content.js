/**
 * @file content.js
 * @author Sanjay Sunil (a.k.a D3VSJ)
 * @license GPL-3.0
 */

// Text
channelNameLabel.html(localeFile.text.channelNameLabel);
$("#animCheck").html(localeFile.text.scrollCheck);
channelName.html(`${localeFile.text.channelNameLabel}`);

// Headings
guildName.html(
  `<img class="avatarIMG" src="" alt=""> ${localeFile.headings.guildName}`
);
guildNameNoPic.html(`${localeFile.headings.guildName}`);
$("#autoScrollHead").html(localeFile.headings.autoScroll);
$("#lastMessagesHead").html(
  `<img class="avatarIMG" src='./img/icon/clock.png' alt="clock"> ${localeFile.headings.lastMessages}`
);
$("#last").html(localeFile.headings.lastMessages);

// Buttons
refreshToken.html(
  `${localeFile.buttons.editToken}<i class="ri-logout-circle-r-line float-right text-muted"></i>`
);
refreshChat.html(`${localeFile.buttons.refreshChat}`);
$("#language").html(`${localeFile.buttons.changeLanguage}`);
leaveGuild.html(`${localeFile.buttons.leave}`);
inviteBtn.html(`${localeFile.buttons.invite}`);
send.html(`${localeFile.buttons.send}`);
clearChat.html(`${localeFile.buttons.clearLastMessages}`);

// Formatting
$("#bold").attr("title", localeFile.formatting.bold);
$("#emphasis").attr("title", localeFile.formatting.emphasis);
$("#underline").attr("title", localeFile.formatting.underline);
$("#strike").attr("title", localeFile.formatting.strike);
$("#clear").attr("title", localeFile.formatting.clear);
