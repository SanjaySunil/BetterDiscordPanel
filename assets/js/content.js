/**
 * @file content.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

// -------------------------------------  NavBar ------------------------------------

$('#profile-nav-text').attr('title', translation.navbar.profileNav);
$('#chat-nav-text').attr('title', translation.navbar.chatNav);
$('#lastMessages-nav-text').attr('title', translation.navbar.lastMessagesNav);
$('#chatServerInfo-nav-text').attr('title', translation.navbar.infoNav);
$('#settings-nav-text').attr('title', translation.navbar.settingsNav);

$('#light-dark').attr('title', translation.navbar.lightDark);
$('#login-logout').attr('title', translation.navbar.logoutTitle);
// -------------------------------------  NavBar --------------------------------------

// -------------------------------------  Headings ------------------------------------
$('#my-profile-text').html(translation.headings.profile);
$('#chats-text').html(translation.headings.guildName);
$('#settings-text').html(translation.headings.settings);
// -------------------------------------  Headings ------------------------------------

// ------------------------------------- Sub-headings ---------------------------------
$('.about-text').html(translation['sub-headings'].about);
$('#tools-text').html(`${translation['sub-headings'].tools} <i class="mdi mdi-chevron-up float-right accor-plus-icon"></i>`);
$('#tools-text-noicon').html(translation['sub-headings'].tools);
$('#info-text').html(translation['sub-headings'].info);
// ------------------------------------- Sub-headings --------------------------------

// -------------------------------------  Profile ------------------------------------
$('#name-text').html(translation.text.profileSection.name);
$('#discrim-text').html(translation.text.profileSection.discrim);
$('#id-text').html(translation.text.profileSection.id);
$('#guilds-text').html(translation.text.profileSection.guilds);
$('#created-at-text').html(translation.text.profileSection.createdAt);
// -------------------------------------  Profile ------------------------------------

// ------------------------------------- Settings ------------------------------------
$('#createbotinvite-text').html(translation.text.settingsSection.createBotInvite);
$('#eval-text').html(translation.text.settingsSection.eval);
$('#languages-text').html(`${translation.text.settingsSection.languages} <i class="mdi mdi-chevron-up float-right accor-plus-icon"></i>
`);
// ------------------------------------- Settings ------------------------------------

// ------------------------------------- Buttons -------------------------------------
channelName.html(`${translation.text.channelNameLabel}`);

guildName.html(
    `<img class="avatarIMG" src="" alt=""> ${translation.headings.guildName}`,
);
guildNameNoPic.html(`${translation.headings.guildName}`);
$('#last').html(translation.headings.lastMessages);

refreshToken.html(
    `${translation.buttons.editToken}<i class="ri-logout-circle-r-line float-right text-muted"></i>`,
);
refreshChat.html(`${translation.buttons.refreshChat}`);
leaveGuild.html(`${translation.buttons.leave}`);
inviteBtn.html(`${translation.buttons.invite}`);
send.html(`${translation.buttons.send}`);
// ------------------------------------- Buttons ------------------------------------
