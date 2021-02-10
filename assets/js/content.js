/**
 * @file content.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

channelName.html(`${localeFile.text.channelNameLabel}`);

guildName.html(
	`<img class="avatarIMG" src="" alt=""> ${localeFile.headings.guildName}`
);
guildNameNoPic.html(`${localeFile.headings.guildName}`);
$("#last").html(localeFile.headings.lastMessages);

refreshToken.html(
	`${localeFile.buttons.editToken}<i class="ri-logout-circle-r-line float-right text-muted"></i>`
);
refreshChat.html(`${localeFile.buttons.refreshChat}`);
$("#language").html(`${localeFile.buttons.changeLanguage}`);
leaveGuild.html(`${localeFile.buttons.leave}`);
inviteBtn.html(`${localeFile.buttons.invite}`);
send.html(`${localeFile.buttons.send}`);

