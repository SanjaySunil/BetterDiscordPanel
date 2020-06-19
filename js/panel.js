$(document).ready(() => {

    /*///////////////////////////////////////////
                    FUNCTIONS
    //////////////////////////////////////////*/

    function createMessage(message) {
        let userTag = escapeHtml(message[1].author.tag);
        let userId = message[1].author.id;
        let userAvatar = `<img src="${message[1].author.avatarURL || "./img/discord_defaults_avatars/5.png"}" class="avatarIMG" style="display:inline"/>`;
        let creationDate = new Date(message[1].createdAt);
        let timestamp = `${leadingZero(creationDate.getDate())}/${leadingZero(creationDate.getMonth() + 1)}/${creationDate.getFullYear()} ${leadingZero(creationDate.getHours() + 1)}:${leadingZero(creationDate.getMinutes())}`;
        let html;



        if (message[1].content === "") {
            html = "";
        } else {
            html = `${userAvatar} <table style="display: inline;"><tr style="display:inline-block;"><td>${userTag}</td></tr><tr style="display: inline;"><td style="font-size: 9.5px;">${timestamp}</td></tr><button class="mini" value="<@!${userId}>" onclick="addText(this.value)">@</button></table><br>${escapeHtml(message[1].content)}<br>`;
        }

        return html;
    }

    function fetchGuilds() {
        $("#channels").children("option").remove();
        $("#guilds").children("option").remove();

        if (client.guilds.size === 0) {
            return;
        }

        client.guilds.forEach((guild) => {
            $("#guilds").append(`<option value="${guild.id}">${escapeHtml(guild.name)}</option>`);
        });
        $("#guilds").append("<option value='DM'>[DM]</option>");

        updtateGuild();
    }

    function updtateGuild() {
        let usersArray = [];
        let guildEmojis = [];
        let guildMembers = [];
        let guild;
        let html = "";

        $("#channels").children("option").remove();

        switch ($("#guilds").val()) {
            case "DM":

                // includes client self user and clyde
                if (client.users.size <= 2) {
                    return;
                }

                client.users.forEach((user) => {
                    if (!user.bot) {
                        usersArray.push(`${escapeHtml(user.username.toLowerCase())}    ||abcdefghijklmopqrstuvwxzSorting||    ${user.id}    ||abcdefghijklmopqrstuvwxzSorting||    ${escapeHtml(user.tag)}`);
                    }
                });

                usersArray.sort();

                for (let i = 0; i < usersArray.length; i++) {
                    usersArray[i] = usersArray[i].split("    ||abcdefghijklmopqrstuvwxzSorting||    ");
                    $("#channels").append(`<option value="${usersArray[i][1]}">${escapeHtml(usersArray[i][2])}</option>`);
                }
                break;

            default:
                guild = client.guilds.find((g) => g.id === $("#guilds").val());

                if (guild.channels.filter((chan) => chan.type === "text").size > 0) {
                    guild.channels.filter((chan) => chan.type === "text").forEach((channel) => {
                        if (channel.permissionsFor(guild.me).has("VIEW_CHANNEL")) {
                            $("#channels").append(`<option value="${channel.id}">${escapeHtml(channel.name)}</option>`);
                        }
                    });
                }

                $("#guildName").html(`<img src="${guild.iconURL || "./img/discord_defaults_avatars/5.png"}" class="avatarIMG"/> ${escapeHtml(guild.name)}`);

                // General informations
                html += `Owner: ${guild.owner.user.tag} <button value="<@!${guild.owner.user.id}>" class="mini" onclick="addText(this.value)">@</button><br>`;
                html += `Members : ${guild.members.size}<br>`;
                html += `Channels (voice) : ${guild.channels.filter((chan) => chan.type === "voice").size}<br>`;
                html += `Channels (text) : ${guild.channels.filter((chan) => chan.type === "text").size}<br><br>`;

                // Members button
                guild.members.forEach((member) => {
                    guildMembers.push(`<img style="display: inline;" class="avatarIMG" src="${member.user.avatarURL || "./img/discord_defaults_avatars/5.png"}"/> ${member.user.tag} <button value="<@!${member.user.id}>" onclick="addText(this.value)" class="mini">@</button>`);
                });
                html += "<button onclick='toggleVisibilityHeight(`#guildMembers`)'>Members</button>";
                html += `<div id="guildMembers" style="display:none; opacity: 0;">${guildMembers.join("<br>")}</div>`;

                // Roles button
                html += "<button onclick='toggleVisibilityHeight(`#guildRoles`)'>Roles</button>";
                html += `<div id="guildRoles" style="display:none; opacity: 0;">${guild.roles.map((role) => `${escapeHtml(role.name)} (${role.id})`).join("<br>")}</div>`

                // Channels button
                if (guild.channels.size > 0) {
                    html += "<button onclick='toggleVisibilityHeight(`#guildChannels`)'>Channels</button>";
                    html += `<div id="guildChannels" style="display:none; opacity: 0;">${guild.channels.map((channels) => `${escapeHtml(channels.name)} (${channels.id})`).join("<br>")}</div>`
                }

                // Emojis button
                if (guild.emojis.size > 0) {
                    guild.emojis.forEach((emoji) => {
                        if (emoji.animated) {
                            guildEmojis.push(`<img class="emojiImg" src="${emoji.url}" onclick="addText('<a:${emoji.identifier}>')"/>`);
                        } else {
                            guildEmojis.push(`<img class="emojiImg" src="${emoji.url}" onclick="addText('<:${emoji.identifier}>')"/>`);
                        }
                    });
                    html += "<button onclick='toggleVisibilityHeight(`#guildEmojis`)'>Emojis</button>";
                    html += `<div id="guildEmojis" style="display:none; opacity: 0;">${guildEmojis.join(" ")}</div>`
                }

                $("#guildInfo").html(html);
                break;
        }

        updateChannel();
    }

    function updateChannel() {
        let channel;
        let user;
        let msgArray = [];
        let html;
        let date;
        let timestamp;

        $("#chat").empty();

        switch ($("#guilds").val()) {
            case "DM":
                user = client.users.find((user) => user.id === $("#channels").val());

                channel = client.channels.find((channel) => channel.type === "dm" && channel.recipient.id === user.id);

                $("#guildName").html(`<img src="${user.avatarURL || "./img/discord_defaults_avatars/5.png"}" class="avatarIMG"/> ${escapeHtml(user.username)}`);
                $("#guildInfo").html(`User ID : (${user.id}) <button class="mini" value="<@!${user.id}>" onclick="addText(this.value)">@</button>`);

                $("#channelNameLabel").text(`Chat [${user.username}]`);
                $("#channelName").html(`<img src="https://static.thenounproject.com/png/332789-200.png" class="fasIMG invert"/> #${escapeHtml(user.username)}`);

                if (channel !== null) {
                    channel.fetchMessages().then((messages) => {
                        msgArray = Array.from(messages).reverse();
                        msgArray.forEach((msg) => {
                            $("#chat").html($("#chat").html() + createMessage(msg));
                        });
                    }).catch((err) => {
                        return;
                    });
                }
                break;

            default:
                channel = client.channels.find((c) => c.id === $("#channels").val());

                if (channel === null) {
                    return;
                }

                $("#channelNameLabel").text(`Chat [${channel.name}]`);
                $("#channelName").html(`<img src="https://static.thenounproject.com/png/332789-200.png" class="fasIMG invert"/> #${escapeHtml(channel.name)}`);

                channel.fetchMessages().then((messages) => {
                    msgArray = Array.from(messages).reverse();
                    msgArray.forEach((msg) => {
                        $("#chat").html($("#chat").html() + createMessage(msg));
                    });
                }).catch((err) => {
                    return;
                });
                break;
        }
    }

    function sendMessage() {
        let user;

        if ($("#toSend").val() === "") {
            tempChange("#send", "[ERROR : EMPTY MESSAGE]", 2000);
        } else {
            if ($("#guilds").val() === "DM") {
                user = client.users.find((user) => user.id === $("#channels").val());
                user.send($("#toSend").val());
            } else {
                client.channels.find((channel) => channel.id === $("#channels").val()).send($("#toSend").val()).catch((err) => {
                    tempChange("#send", "[ERROR : MISSING PERMISSIONS]", 2000);
                });
            }
            $("#toSend").val("");
        }
    }

    function scrollAnim(DOM1, DOM2, time) {
        if (document.querySelector(DOM1).checked) {
            if (document.querySelector("#chk3").checked) {
                $(DOM2).animate({
                    scrollTop: $(DOM2)[0].scrollHeight - $(DOM2).height()
                }, time);
            } else {
                $(DOM2).scrollTop($(DOM2)[0].scrollHeight - $(DOM2).height());
            }
        }
    }

    /*///////////////////////////////////////////
                    TOKEN
    //////////////////////////////////////////*/

    var token;
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "" || localStorage.getItem("token") === null) {
        token = prompt("Please enter your discord bot token", "");
        localStorage.setItem("token", token);
    }
    token = localStorage.getItem("token");

    const client = new Discord.Client();
    client.login(token).catch(() => {
        alert("No token provided or token is invalid");
    });

    /*///////////////////////////////////////////
                    DISCORD EVENTS
    //////////////////////////////////////////*/

    client.on("message", (message) => {
        if (message.channel.id === $("#channels").val() || message.author.id === $("#channels").val() || message.author.id === client.user.id) {
            updateChannel();
        }
        if (message.channel.type !== "dm" && (message.author.id === client.user.id || !message.author.bot)) {
            $("#lastMessages").html($("#lastMessages").html() + `<br>[<b>#${escapeHtml(message.channel.name)} | ${escapeHtml(message.author.tag)}]</b> ${escapeHtml(message.content)}`);
        }
        localStorage.setItem("lastMessages", $("#lastMessages").html());
    });

    client.on("ready", () => {
        $("#lastMessages").html(getSavedValue("lastMessages"));
        fetchGuilds();
    });

    client.on("messageDelete", (message) => {
        if (message.channel.id === $("#channels").val()) {
            updateChannel();
        } else if ($("#guilds").val() === "DM" && message.author.id === $("#channels").val()) {
            updateChannel();
        }
    });

    client.on("messageUpdate", (oldMessage, newMessage) => {
        if (oldMessage.channel.id === $("#channels").val()) {
            updateChannel();
        } else if ($("#guilds").val() === "DM" && oldMessage.author.id === $("#channels").val()) {
            updateChannel();
        }
    });

    client.on("guildCreate", (guild) => {
        fetchGuilds();
    });

    client.on("guildDelete", (guild) => {
        fetchGuilds();
    });

    client.on("guildUpdate", (oldGuild) => {
        if (guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("guildMemberAdd", (member) => {
        if (member.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("guildMemberRemove", (member) => {
        if (member.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("channelCreate", (channel) => {
        if (channel.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("channelDelete", (channel) => {
        if (channel.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("channelUpdate", (oldChannel) => {
        if (oldChannel.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("emojiCreate", (emoji) => {
        if (emoji.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("emojiDelete", (emoji) => {
        if (emoji.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    client.on("emojiUpdate", (oldEmoji) => {
        if (oldEmoji.guild.id === $('#guilds').val()) {
            updtateGuild();
        }
    });

    /*///////////////////////////////////////////
                    DOCUMENT EVENTS
    //////////////////////////////////////////*/

    $(document).on("change", "#guilds", () => {
        updtateGuild();
    });

    $(document).on("change", "#channels", () => {
        updateChannel();
    });

    /*///////////////////////////////////////////
                    BUTTONS EVENTS
    //////////////////////////////////////////*/

    $("#refreshToken").click(() => {
        if (window.confirm("Are you sure ?")) {
            localStorage.setItem("token", "");
            window.location.reload(true);
        } else {
            return;
        }
    });

    $("#send").click(() => {
        sendMessage();
    });

    $("#delLast").click(() => {
        if (client.user.lastMessage === null) {
            tempChange("#delLast", "[ERROR]", 2000);
            return;
        } else {
            try {
                client.user.lastMessage.delete();
                updateChannel();
            } catch (error) {
                return;
            }
        }
    });

    $("#clearChat").click(() => {
        localStorage.setItem("lastMessages", "");
        $("#lastMessages").empty();
    });

    $("#leaveGuild").click(() => {
        if ($("#guilds").val() !== "DM") {
            if (window.confirm("Leave this guild ?")) {
                client.guilds.find((guild) => guild.id === $("#guilds").val()).leave().catch((err) => {
                    tempChange("#leaveGuild", "[ERROR]", 2000);
                });
            }
        }
    });

    $("#invite").click(() => {
        if ($("#guilds").val() !== "DM") {
            client.channels.find((channel) => channel.id === $("#channels").val()).createInvite().then((invite) => {
                alert(`discord.gg/${invite.code}`);
            }).catch((err) => {
                tempChange("#invite", "[ERROR : MISSING PERMISSIONS]", 2000);
            });
        } else {
            tempChange("#invite", "[ERROR : DM]", 2000);
        }

    });

    /*///////////////////////////////////////////
                    KEYUP EVENTS
    //////////////////////////////////////////*/

    $("#toSend").keyup((event) => {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            event.preventDefault();
            $("#send").click();
        }
        event.stopPropagation();
    });

    /*///////////////////////////////////////////
                    AUTO-SCROLL
    //////////////////////////////////////////*/

    $("#lastMessages").bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk1")[0].checked = false;
        } else if ($("#lastMessages")[0].scrollHeight - 700 < $("#lastMessages").scrollTop()) {
            $("#chk1")[0].checked = true;
        }
    });

    $("#chat").bind("mousewheel", (event) => {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#chk2")[0].checked = false;
        } else if ($("#chat")[0].scrollHeight - 700 < $("#chat").scrollTop()) {
            $("#chk2")[0].checked = true;
        }
    });

    $("#btnrRefreshChat").click(() => {
        updateChannel();
    });

    setInterval(() => {
        scrollAnim("#chk1", "#lastMessages", 1000);
        scrollAnim("#chk2", "#chat", 250);
    }, 1000);
});