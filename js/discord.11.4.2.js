/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports.Package = __webpack_require__(37);

/**
 * Options for a client.
 * @typedef {Object} ClientOptions
 * @property {string} [apiRequestMethod='sequential'] One of `sequential` or `burst`. The sequential handler executes
 * all requests in the order they are triggered, whereas the burst handler runs multiple in parallel, and doesn't
 * provide the guarantee of any particular order. Burst mode is more likely to hit a 429 ratelimit error by its nature,
 * and is therefore slightly riskier to use.
 * @property {number} [shardId=0] ID of the shard to run
 * @property {number} [shardCount=0] Total number of shards
 * @property {number} [messageCacheMaxSize=200] Maximum number of messages to cache per channel
 * (-1 or Infinity for unlimited - don't do this without message sweeping, otherwise memory usage will climb
 * indefinitely)
 * @property {number} [messageCacheLifetime=0] How long a message should stay in the cache until it is considered
 * sweepable (in seconds, 0 for forever)
 * @property {number} [messageSweepInterval=0] How frequently to remove messages from the cache that are older than
 * the message cache lifetime (in seconds, 0 for never)
 * @property {boolean} [fetchAllMembers=false] Whether to cache all guild members and users upon startup, as well as
 * upon joining a guild (should be avoided whenever possible)
 * @property {boolean} [disableEveryone=false] Default value for {@link MessageOptions#disableEveryone}
 * @property {boolean} [sync=false] Whether to periodically sync guilds (for user accounts)
 * @property {number} [restWsBridgeTimeout=5000] Maximum time permitted between REST responses and their
 * corresponding websocket events
 * @property {number} [restTimeOffset=500] Extra time in millseconds to wait before continuing to make REST
 * requests (higher values will reduce rate-limiting errors on bad connections)
 * @property {WSEventType[]} [disabledEvents] An array of disabled websocket events. Events in this array will not be
 * processed, potentially resulting in performance improvements for larger bots. Only disable events you are
 * 100% certain you don't need, as many are important, but not obviously so. The safest one to disable with the
 * most impact is typically `TYPING_START`.
 * @property {WebsocketOptions} [ws] Options for the WebSocket
 * @property {HTTPOptions} [http] HTTP options
 */
exports.DefaultOptions = {
    apiRequestMethod: 'sequential',
    shardId: 0,
    shardCount: 0,
    messageCacheMaxSize: 200,
    messageCacheLifetime: 0,
    messageSweepInterval: 0,
    fetchAllMembers: false,
    disableEveryone: false,
    sync: false,
    restWsBridgeTimeout: 5000,
    disabledEvents: [],
    restTimeOffset: 500,
  
    /**
     * WebSocket options (these are left as snake_case to match the API)
     * @typedef {Object} WebsocketOptions
     * @property {number} [large_threshold=250] Number of members in a guild to be considered large
     * @property {boolean} [compress=true] Whether to compress data sent on the connection
     * (defaults to `false` for browsers)
     */
    ws: {
      large_threshold: 250,
      compress: __webpack_require__(69).platform() !== 'browser',
      properties: {
        $os: process ? process.platform : 'discord.js',
        $browser: 'discord.js',
        $device: 'discord.js',
        $referrer: '',
        $referring_domain: '',
      },
      version: 6,
    },
  
    /**
     * HTTP options
     * @typedef {Object} HTTPOptions
     * @property {number} [version=7] API version to use
     * @property {string} [api='https://discordapp.com/api'] Base url of the API
     * @property {string} [cdn='https://cdn.discordapp.com'] Base url of the CDN
     * @property {string} [invite='https://discord.gg'] Base url of invites
     */
    http: {
      version: 7,
      host: 'https://discordapp.com',
      cdn: 'https://cdn.discordapp.com',
    },
  };
  
  exports.WSCodes = {
    1000: 'Connection gracefully closed',
    4004: 'Tried to identify with an invalid token',
    4010: 'Sharding data provided was invalid',
    4011: 'Shard would be on too many guilds if connected',
  };
  
  exports.Errors = {
    NO_TOKEN: 'Request to use token, but token was unavailable to the client.',
    NO_BOT_ACCOUNT: 'Only bot accounts are able to make use of this feature.',
    NO_USER_ACCOUNT: 'Only user accounts are able to make use of this feature.',
    BAD_WS_MESSAGE: 'A bad message was received from the websocket; either bad compression, or not JSON.',
    TOOK_TOO_LONG: 'Something took too long to do.',
    NOT_A_PERMISSION: 'Invalid permission string or number.',
    INVALID_RATE_LIMIT_METHOD: 'Unknown rate limiting method.',
    BAD_LOGIN: 'Incorrect login details were provided.',
    INVALID_SHARD: 'Invalid shard settings were provided.',
    SHARDING_REQUIRED: 'This session would have handled too many guilds - Sharding is required.',
    INVALID_TOKEN: 'An invalid token was provided.',
  };
  
  const Endpoints = exports.Endpoints = {
    User: userID => {
      if (userID.id) userID = userID.id;
      const base = `/users/${userID}`;
      return {
        toString: () => base,
        channels: `${base}/channels`,
        profile: `${base}/profile`,
        relationships: `${base}/relationships`,
        settings: `${base}/settings`,
        Relationship: uID => `${base}/relationships/${uID}`,
        Guild: guildID => ({
          toString: () => `${base}/guilds/${guildID}`,
          settings: `${base}/guilds/${guildID}/settings`,
        }),
        Note: id => `${base}/notes/${id}`,
        Mentions: (limit, roles, everyone, guildID) =>
          `${base}/mentions?limit=${limit}&roles=${roles}&everyone=${everyone}${guildID ? `&guild_id=${guildID}` : ''}`,
        Avatar: (root, hash) => {
          if (userID === '1') return hash;
          return Endpoints.CDN(root).Avatar(userID, hash);
        },
      };
    },
    guilds: '/guilds',
    Guild: guildID => {
      if (guildID.id) guildID = guildID.id;
      const base = `/guilds/${guildID}`;
      return {
        toString: () => base,
        prune: `${base}/prune`,
        embed: `${base}/embed`,
        bans: `${base}/bans`,
        integrations: `${base}/integrations`,
        members: `${base}/members`,
        channels: `${base}/channels`,
        invites: `${base}/invites`,
        roles: `${base}/roles`,
        emojis: `${base}/emojis`,
        search: `${base}/messages/search`,
        voiceRegions: `${base}/regions`,
        webhooks: `${base}/webhooks`,
        ack: `${base}/ack`,
        settings: `${base}/settings`,
        auditLogs: `${base}/audit-logs`,
        Emoji: emojiID => `${base}/emojis/${emojiID}`,
        Icon: (root, hash) => Endpoints.CDN(root).Icon(guildID, hash),
        Splash: (root, hash) => Endpoints.CDN(root).Splash(guildID, hash),
        Role: roleID => `${base}/roles/${roleID}`,
        Member: memberID => {
          if (memberID.id) memberID = memberID.id;
          const mbase = `${base}/members/${memberID}`;
          return {
            toString: () => mbase,
            Role: roleID => `${mbase}/roles/${roleID}`,
            nickname: `${base}/members/@me/nick`,
          };
        },
      };
    },
    channels: '/channels',
    Channel: channelID => {
      if (channelID.id) channelID = channelID.id;
      const base = `/channels/${channelID}`;
      return {
        toString: () => base,
        messages: {
          toString: () => `${base}/messages`,
          bulkDelete: `${base}/messages/bulk-delete`,
        },
        invites: `${base}/invites`,
        typing: `${base}/typing`,
        permissions: `${base}/permissions`,
        webhooks: `${base}/webhooks`,
        search: `${base}/messages/search`,
        pins: `${base}/pins`,
        Icon: (root, hash) => Endpoints.CDN(root).GDMIcon(channelID, hash),
        Pin: messageID => `${base}/pins/${messageID}`,
        Recipient: recipientID => `${base}/recipients/${recipientID}`,
        Message: messageID => {
          if (messageID.id) messageID = messageID.id;
          const mbase = `${base}/messages/${messageID}`;
          return {
            toString: () => mbase,
            reactions: `${mbase}/reactions`,
            ack: `${mbase}/ack`,
            Reaction: emoji => {
              const rbase = `${mbase}/reactions/${emoji}`;
              return {
                toString: () => rbase,
                User: userID => `${rbase}/${userID}`,
              };
            },
          };
        },
      };
    },
    Message: m => exports.Endpoints.Channel(m.channel).Message(m),
    Member: m => exports.Endpoints.Guild(m.guild).Member(m),
    CDN(root) {
      return {
        Emoji: (emojiID, format = 'png') => `${root}/emojis/${emojiID}.${format}`,
        Asset: name => `${root}/assets/${name}`,
        Avatar: (userID, hash) => `${root}/avatars/${userID}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png?size=2048'}`,
        Icon: (guildID, hash) => `${root}/icons/${guildID}/${hash}.jpg`,
        AppIcon: (clientID, hash) => `${root}/app-icons/${clientID}/${hash}.png`,
        AppAsset: (clientID, hash) => `${root}/app-assets/${clientID}/${hash}.png`,
        GDMIcon: (channelID, hash) => `${root}/channel-icons/${channelID}/${hash}.jpg?size=2048`,
        Splash: (guildID, hash) => `${root}/splashes/${guildID}/${hash}.jpg`,
      };
    },
    OAUTH2: {
      Application: appID => {
        const base = `/oauth2/applications/${appID}`;
        return {
          toString: () => base,
          resetSecret: `${base}/reset`,
          resetToken: `${base}/bot/reset`,
        };
      },
      App: appID => `/oauth2/authorize?client_id=${appID}`,
    },
    login: '/auth/login',
    logout: '/auth/logout',
    voiceRegions: '/voice/regions',
    gateway: {
      toString: () => '/gateway',
      bot: '/gateway/bot',
    },
    Invite: inviteID => `/invite/${inviteID}?with_counts=true`,
    inviteLink: id => `https://discord.gg/${id}`,
    Webhook: (webhookID, token) => `/webhooks/${webhookID}${token ? `/${token}` : ''}`,
  };
  
  
  /**
   * The current status of the client. Here are the available statuses:
   * * READY
   * * CONNECTING
   * * RECONNECTING
   * * IDLE
   * * NEARLY
   * * DISCONNECTED
   * @typedef {number} Status
   */
  exports.Status = {
    READY: 0,
    CONNECTING: 1,
    RECONNECTING: 2,
    IDLE: 3,
    NEARLY: 4,
    DISCONNECTED: 5,
  };
  
  /**
   * The current status of a voice connection. Here are the available statuses:
   * * CONNECTED
   * * CONNECTING
   * * AUTHENTICATING
   * * RECONNECTING
   * * DISCONNECTED
   * @typedef {number} VoiceStatus
   */
  exports.VoiceStatus = {
    CONNECTED: 0,
    CONNECTING: 1,
    AUTHENTICATING: 2,
    RECONNECTING: 3,
    DISCONNECTED: 4,
  };
  
  exports.ChannelTypes = {
    TEXT: 0,
    DM: 1,
    VOICE: 2,
    GROUP_DM: 3,
    CATEGORY: 4,
  };
  
  exports.OPCodes = {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    STATUS_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    VOICE_GUILD_PING: 5,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11,
  };
  
  exports.VoiceOPCodes = {
    IDENTIFY: 0,
    SELECT_PROTOCOL: 1,
    READY: 2,
    HEARTBEAT: 3,
    SESSION_DESCRIPTION: 4,
    SPEAKING: 5,
  };
  
  exports.Events = {
    RATE_LIMIT: 'rateLimit',
    READY: 'ready',
    RESUME: 'resume',
    GUILD_CREATE: 'guildCreate',
    GUILD_DELETE: 'guildDelete',
    GUILD_UPDATE: 'guildUpdate',
    GUILD_UNAVAILABLE: 'guildUnavailable',
    GUILD_AVAILABLE: 'guildAvailable',
    GUILD_MEMBER_ADD: 'guildMemberAdd',
    GUILD_MEMBER_REMOVE: 'guildMemberRemove',
    GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
    GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable',
    GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking',
    GUILD_MEMBERS_CHUNK: 'guildMembersChunk',
    GUILD_ROLE_CREATE: 'roleCreate',
    GUILD_ROLE_DELETE: 'roleDelete',
    GUILD_ROLE_UPDATE: 'roleUpdate',
    GUILD_EMOJI_CREATE: 'emojiCreate',
    GUILD_EMOJI_DELETE: 'emojiDelete',
    GUILD_EMOJI_UPDATE: 'emojiUpdate',
    GUILD_BAN_ADD: 'guildBanAdd',
    GUILD_BAN_REMOVE: 'guildBanRemove',
    CHANNEL_CREATE: 'channelCreate',
    CHANNEL_DELETE: 'channelDelete',
    CHANNEL_UPDATE: 'channelUpdate',
    CHANNEL_PINS_UPDATE: 'channelPinsUpdate',
    MESSAGE_CREATE: 'message',
    MESSAGE_DELETE: 'messageDelete',
    MESSAGE_UPDATE: 'messageUpdate',
    MESSAGE_BULK_DELETE: 'messageDeleteBulk',
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll',
    USER_UPDATE: 'userUpdate',
    USER_NOTE_UPDATE: 'userNoteUpdate',
    USER_SETTINGS_UPDATE: 'clientUserSettingsUpdate',
    USER_GUILD_SETTINGS_UPDATE: 'clientUserGuildSettingsUpdate',
    PRESENCE_UPDATE: 'presenceUpdate',
    VOICE_STATE_UPDATE: 'voiceStateUpdate',
    TYPING_START: 'typingStart',
    TYPING_STOP: 'typingStop',
    DISCONNECT: 'disconnect',
    RECONNECTING: 'reconnecting',
    ERROR: 'error',
    WARN: 'warn',
    DEBUG: 'debug',
  };
  
  /**
   * The type of an activity of a users presence, e.g. `PLAYING`. Here are the available types:
   * * PLAYING
   * * STREAMING
   * * LISTENING
   * * WATCHING
   * @typedef {string} ActivityType
   */
  exports.ActivityTypes = [
    'PLAYING',
    'STREAMING',
    'LISTENING',
    'WATCHING',
  ];
  
  exports.ActivityFlags = {
    INSTANCE: 1 << 0,
    JOIN: 1 << 1,
    SPECTATE: 1 << 2,
    JOIN_REQUEST: 1 << 3,
    SYNC: 1 << 4,
    PLAY: 1 << 5,
  };
  
  /**
   * The type of a websocket message event, e.g. `MESSAGE_CREATE`. Here are the available events:
   * * READY
   * * RESUMED
   * * GUILD_SYNC
   * * GUILD_CREATE
   * * GUILD_DELETE
   * * GUILD_UPDATE
   * * GUILD_MEMBER_ADD
   * * GUILD_MEMBER_REMOVE
   * * GUILD_MEMBER_UPDATE
   * * GUILD_MEMBERS_CHUNK
   * * GUILD_ROLE_CREATE
   * * GUILD_ROLE_DELETE
   * * GUILD_ROLE_UPDATE
   * * GUILD_BAN_ADD
   * * GUILD_BAN_REMOVE
   * * CHANNEL_CREATE
   * * CHANNEL_DELETE
   * * CHANNEL_UPDATE
   * * CHANNEL_PINS_UPDATE
   * * MESSAGE_CREATE
   * * MESSAGE_DELETE
   * * MESSAGE_UPDATE
   * * MESSAGE_DELETE_BULK
   * * MESSAGE_REACTION_ADD
   * * MESSAGE_REACTION_REMOVE
   * * MESSAGE_REACTION_REMOVE_ALL
   * * USER_UPDATE
   * * USER_NOTE_UPDATE
   * * USER_SETTINGS_UPDATE
   * * PRESENCE_UPDATE
   * * VOICE_STATE_UPDATE
   * * TYPING_START
   * * VOICE_SERVER_UPDATE
   * * RELATIONSHIP_ADD
   * * RELATIONSHIP_REMOVE
   * @typedef {string} WSEventType
   */
  exports.WSEvents = {
    READY: 'READY',
    RESUMED: 'RESUMED',
    GUILD_SYNC: 'GUILD_SYNC',
    GUILD_CREATE: 'GUILD_CREATE',
    GUILD_DELETE: 'GUILD_DELETE',
    GUILD_UPDATE: 'GUILD_UPDATE',
    GUILD_MEMBER_ADD: 'GUILD_MEMBER_ADD',
    GUILD_MEMBER_REMOVE: 'GUILD_MEMBER_REMOVE',
    GUILD_MEMBER_UPDATE: 'GUILD_MEMBER_UPDATE',
    GUILD_MEMBERS_CHUNK: 'GUILD_MEMBERS_CHUNK',
    GUILD_ROLE_CREATE: 'GUILD_ROLE_CREATE',
    GUILD_ROLE_DELETE: 'GUILD_ROLE_DELETE',
    GUILD_ROLE_UPDATE: 'GUILD_ROLE_UPDATE',
    GUILD_BAN_ADD: 'GUILD_BAN_ADD',
    GUILD_BAN_REMOVE: 'GUILD_BAN_REMOVE',
    GUILD_EMOJIS_UPDATE: 'GUILD_EMOJIS_UPDATE',
    CHANNEL_CREATE: 'CHANNEL_CREATE',
    CHANNEL_DELETE: 'CHANNEL_DELETE',
    CHANNEL_UPDATE: 'CHANNEL_UPDATE',
    CHANNEL_PINS_UPDATE: 'CHANNEL_PINS_UPDATE',
    MESSAGE_CREATE: 'MESSAGE_CREATE',
    MESSAGE_DELETE: 'MESSAGE_DELETE',
    MESSAGE_UPDATE: 'MESSAGE_UPDATE',
    MESSAGE_DELETE_BULK: 'MESSAGE_DELETE_BULK',
    MESSAGE_REACTION_ADD: 'MESSAGE_REACTION_ADD',
    MESSAGE_REACTION_REMOVE: 'MESSAGE_REACTION_REMOVE',
    MESSAGE_REACTION_REMOVE_ALL: 'MESSAGE_REACTION_REMOVE_ALL',
    USER_UPDATE: 'USER_UPDATE',
    USER_NOTE_UPDATE: 'USER_NOTE_UPDATE',
    USER_SETTINGS_UPDATE: 'USER_SETTINGS_UPDATE',
    USER_GUILD_SETTINGS_UPDATE: 'USER_GUILD_SETTINGS_UPDATE',
    PRESENCE_UPDATE: 'PRESENCE_UPDATE',
    VOICE_STATE_UPDATE: 'VOICE_STATE_UPDATE',
    TYPING_START: 'TYPING_START',
    VOICE_SERVER_UPDATE: 'VOICE_SERVER_UPDATE',
    RELATIONSHIP_ADD: 'RELATIONSHIP_ADD',
    RELATIONSHIP_REMOVE: 'RELATIONSHIP_REMOVE',
  };
  
  /**
   * The type of a message, e.g. `DEFAULT`. Here are the available types:
   * * DEFAULT
   * * RECIPIENT_ADD
   * * RECIPIENT_REMOVE
   * * CALL
   * * CHANNEL_NAME_CHANGE
   * * CHANNEL_ICON_CHANGE
   * * PINS_ADD
   * * GUILD_MEMBER_JOIN
   * @typedef {string} MessageType
   */
  exports.MessageTypes = [
    'DEFAULT',
    'RECIPIENT_ADD',
    'RECIPIENT_REMOVE',
    'CALL',
    'CHANNEL_NAME_CHANGE',
    'CHANNEL_ICON_CHANGE',
    'PINS_ADD',
    'GUILD_MEMBER_JOIN',
  ];
  
  /**
   * The type of a message notification setting. Here are the available types:
   * * EVERYTHING
   * * MENTIONS
   * * NOTHING
   * * INHERIT (only for GuildChannel)
   * @typedef {string} MessageNotificationType
   */
  exports.MessageNotificationTypes = [
    'EVERYTHING',
    'MENTIONS',
    'NOTHING',
    'INHERIT',
  ];
  
  exports.DefaultAvatars = {
    BLURPLE: '6debd47ed13483642cf09e832ed0bc1b',
    GREY: '322c936a8c8be1b803cd94861bdfa868',
    GREEN: 'dd4dbc0016779df1378e7812eabaa04d',
    ORANGE: '0e291f67c9274a1abdddeb3fd919cbaa',
    RED: '1cbd08c76f8af6dddce02c5138971129',
  };
  
  exports.ExplicitContentFilterTypes = [
    'DISABLED',
    'NON_FRIENDS',
    'FRIENDS_AND_NON_FRIENDS',
  ];
  
  exports.UserSettingsMap = {
    /**
     * Automatically convert emoticons in your messages to emoji
     * For example, when you type `:-)` Discord will convert it to 😃
     * @name ClientUserSettings#convertEmoticons
     * @type {boolean}
     */
    convert_emoticons: 'convertEmoticons',
  
    /**
     * If new guilds should automatically disable DMs between you and its members
     * @name ClientUserSettings#defaultGuildsRestricted
     * @type {boolean}
     */
    default_guilds_restricted: 'defaultGuildsRestricted',
  
    /**
     * Automatically detect accounts from services like Steam and Blizzard when you open the Discord client
     * @name ClientUserSettings#detectPlatformAccounts
     * @type {boolean}
     */
    detect_platform_accounts: 'detectPlatformAccounts',
  
    /**
     * Developer Mode exposes context menu items helpful for people writing bots using the Discord API
     * @name ClientUserSettings#developerMode
     * @type {boolean}
     */
    developer_mode: 'developerMode',
  
    /**
     * Allow playback and usage of the `/tts` command
     * @name ClientUserSettings#enableTTSCommand
     * @type {boolean}
     */
    enable_tts_command: 'enableTTSCommand',
  
    /**
     * The theme of the client. Either `light` or `dark`
     * @name ClientUserSettings#theme
     * @type {string}
     */
    theme: 'theme',
  
    /**
     * Last status set in the client
     * @name ClientUserSettings#status
     * @type {PresenceStatus}
     */
    status: 'status',
  
    /**
     * Display currently running game as status message
     * @name ClientUserSettings#showCurrentGame
     * @type {boolean}
     */
    show_current_game: 'showCurrentGame',
  
    /**
     * Display images, videos, and lolcats when uploaded directly to Discord
     * @name ClientUserSettings#inlineAttachmentMedia
     * @type {boolean}
     */
    inline_attachment_media: 'inlineAttachmentMedia',
  
    /**
     * Display images, videos, and lolcats when uploaded posted as links in chat
     * @name ClientUserSettings#inlineEmbedMedia
     * @type {boolean}
     */
    inline_embed_media: 'inlineEmbedMedia',
  
    /**
     * Language the Discord client will use, as an RFC 3066 language identifier
     * @name ClientUserSettings#locale
     * @type {string}
     */
    locale: 'locale',
  
    /**
     * Display messages in compact mode
     * @name ClientUserSettings#messageDisplayCompact
     * @type {boolean}
     */
    message_display_compact: 'messageDisplayCompact',
  
    /**
     * Show emoji reactions on messages
     * @name ClientUserSettings#renderReactions
     * @type {boolean}
     */
    render_reactions: 'renderReactions',
  
    /**
     * Array of snowflake IDs for guilds, in the order they appear in the Discord client
     * @name ClientUserSettings#guildPositions
     * @type {Snowflake[]}
     */
    guild_positions: 'guildPositions',
  
    /**
     * Array of snowflake IDs for guilds which you will not recieve DMs from
     * @name ClientUserSettings#restrictedGuilds
     * @type {Snowflake[]}
     */
    restricted_guilds: 'restrictedGuilds',
  
    explicit_content_filter: function explicitContentFilter(type) { // eslint-disable-line func-name-matching
      /**
       * Safe direct messaging; force people's messages with images to be scanned before they are sent to you.
       * One of `DISABLED`, `NON_FRIENDS`, `FRIENDS_AND_NON_FRIENDS`
       * @name ClientUserSettings#explicitContentFilter
       * @type {string}
       */
      return exports.ExplicitContentFilterTypes[type];
    },
    friend_source_flags: function friendSources(flags) { // eslint-disable-line func-name-matching
      /**
       * Who can add you as a friend
       * @name ClientUserSettings#friendSources
       * @type {Object}
       * @property {boolean} all Mutual friends and mutual guilds
       * @property {boolean} mutualGuilds Only mutual guilds
       * @property {boolean} mutualFriends Only mutual friends
       */
      return {
        all: flags.all || false,
        mutualGuilds: flags.all ? true : flags.mutual_guilds || false,
        mutualFriends: flags.all ? true : flags.mutualFriends || false,
      };
    },
  };
  
  exports.UserGuildSettingsMap = {
    message_notifications: function messageNotifications(type) { // eslint-disable-line func-name-matching
      /**
       * The type of message that should notify you
       * @name ClientUserGuildSettings#messageNotifications
       * @type {MessageNotificationType}
       */
      return exports.MessageNotificationTypes[type];
    },
    /**
     * Whether to receive mobile push notifications
     * @name ClientUserGuildSettings#mobilePush
     * @type {boolean}
     */
    mobile_push: 'mobilePush',
    /**
     * Whether the guild is muted
     * @name ClientUserGuildSettings#muted
     * @type {boolean}
     */
    muted: 'muted',
    /**
     * Whether to suppress everyone mention
     * @name ClientUserGuildSettings#suppressEveryone
     * @type {boolean}
     */
    suppress_everyone: 'suppressEveryone',
    /**
     * A collection containing all the channel overrides
     * @name ClientUserGuildSettings#channelOverrides
     * @type {Collection<ClientUserChannelOverride>}
     */
    channel_overrides: 'channelOverrides',
  };
  
  exports.UserChannelOverrideMap = {
    message_notifications: function messageNotifications(type) { // eslint-disable-line func-name-matching
      /**
       * The type of message that should notify you
       * @name ClientUserChannelOverride#messageNotifications
       * @type {MessageNotificationType}
       */
      return exports.MessageNotificationTypes[type];
    },
    /**
     * Whether the channel is muted
     * @name ClientUserChannelOverride#muted
     * @type {boolean}
     */
    muted: 'muted',
  };
  
  exports.Colors = {
    DEFAULT: 0x000000,
    AQUA: 0x1ABC9C,
    GREEN: 0x2ECC71,
    BLUE: 0x3498DB,
    PURPLE: 0x9B59B6,
    LUMINOUS_VIVID_PINK: 0xE91E63,
    GOLD: 0xF1C40F,
    ORANGE: 0xE67E22,
    RED: 0xE74C3C,
    GREY: 0x95A5A6,
    NAVY: 0x34495E,
    DARK_AQUA: 0x11806A,
    DARK_GREEN: 0x1F8B4C,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368A,
    DARK_VIVID_PINK: 0xAD1457,
    DARK_GOLD: 0xC27C0E,
    DARK_ORANGE: 0xA84300,
    DARK_RED: 0x992D22,
    DARK_GREY: 0x979C9F,
    DARKER_GREY: 0x7F8C8D,
    LIGHT_GREY: 0xBCC0C0,
    DARK_NAVY: 0x2C3E50,
    BLURPLE: 0x7289DA,
    GREYPLE: 0x99AAB5,
    DARK_BUT_NOT_BLACK: 0x2C2F33,
    NOT_QUITE_BLACK: 0x23272A,
  };
  
  /**
   * An error encountered while performing an API request. Here are the potential errors:
   * * UNKNOWN_ACCOUNT
   * * UNKNOWN_APPLICATION
   * * UNKNOWN_CHANNEL
   * * UNKNOWN_GUILD
   * * UNKNOWN_INTEGRATION
   * * UNKNOWN_INVITE
   * * UNKNOWN_MEMBER
   * * UNKNOWN_MESSAGE
   * * UNKNOWN_OVERWRITE
   * * UNKNOWN_PROVIDER
   * * UNKNOWN_ROLE
   * * UNKNOWN_TOKEN
   * * UNKNOWN_USER
   * * UNKNOWN_EMOJI
   * * BOT_PROHIBITED_ENDPOINT
   * * BOT_ONLY_ENDPOINT
   * * MAXIMUM_GUILDS
   * * MAXIMUM_FRIENDS
   * * MAXIMUM_PINS
   * * MAXIMUM_ROLES
   * * MAXIMUM_REACTIONS
   * * UNAUTHORIZED
   * * MISSING_ACCESS
   * * INVALID_ACCOUNT_TYPE
   * * CANNOT_EXECUTE_ON_DM
   * * EMBED_DISABLED
   * * CANNOT_EDIT_MESSAGE_BY_OTHER
   * * CANNOT_SEND_EMPTY_MESSAGE
   * * CANNOT_MESSAGE_USER
   * * CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL
   * * CHANNEL_VERIFICATION_LEVEL_TOO_HIGH
   * * OAUTH2_APPLICATION_BOT_ABSENT
   * * MAXIMUM_OAUTH2_APPLICATIONS
   * * INVALID_OAUTH_STATE
   * * MISSING_PERMISSIONS
   * * INVALID_AUTHENTICATION_TOKEN
   * * NOTE_TOO_LONG
   * * INVALID_BULK_DELETE_QUANTITY
   * * CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL
   * * CANNOT_EXECUTE_ON_SYSTEM_MESSAGE
   * * BULK_DELETE_MESSAGE_TOO_OLD
   * * INVITE_ACCEPTED_TO_GUILD_NOT_CONTANING_BOT
   * * REACTION_BLOCKED
   * @typedef {string} APIError
   */
  exports.APIErrors = {
    UNKNOWN_ACCOUNT: 10001,
    UNKNOWN_APPLICATION: 10002,
    UNKNOWN_CHANNEL: 10003,
    UNKNOWN_GUILD: 10004,
    UNKNOWN_INTEGRATION: 10005,
    UNKNOWN_INVITE: 10006,
    UNKNOWN_MEMBER: 10007,
    UNKNOWN_MESSAGE: 10008,
    UNKNOWN_OVERWRITE: 10009,
    UNKNOWN_PROVIDER: 10010,
    UNKNOWN_ROLE: 10011,
    UNKNOWN_TOKEN: 10012,
    UNKNOWN_USER: 10013,
    UNKNOWN_EMOJI: 10014,
    BOT_PROHIBITED_ENDPOINT: 20001,
    BOT_ONLY_ENDPOINT: 20002,
    MAXIMUM_GUILDS: 30001,
    MAXIMUM_FRIENDS: 30002,
    MAXIMUM_PINS: 30003,
    MAXIMUM_ROLES: 30005,
    MAXIMUM_REACTIONS: 30010,
    UNAUTHORIZED: 40001,
    MISSING_ACCESS: 50001,
    INVALID_ACCOUNT_TYPE: 50002,
    CANNOT_EXECUTE_ON_DM: 50003,
    EMBED_DISABLED: 50004,
    CANNOT_EDIT_MESSAGE_BY_OTHER: 50005,
    CANNOT_SEND_EMPTY_MESSAGE: 50006,
    CANNOT_MESSAGE_USER: 50007,
    CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008,
    CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009,
    OAUTH2_APPLICATION_BOT_ABSENT: 50010,
    MAXIMUM_OAUTH2_APPLICATIONS: 50011,
    INVALID_OAUTH_STATE: 50012,
    MISSING_PERMISSIONS: 50013,
    INVALID_AUTHENTICATION_TOKEN: 50014,
    NOTE_TOO_LONG: 50015,
    INVALID_BULK_DELETE_QUANTITY: 50016,
    CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019,
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021,
    BULK_DELETE_MESSAGE_TOO_OLD: 50034,
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTANING_BOT: 50036,
    REACTION_BLOCKED: 90001,
  };
  
  /**
   * The value set for a guild's default message notifications, e.g. `ALL`. Here are the available types:
   * * ALL
   * * MENTIONS
   * @typedef {string} DefaultMessageNotifications
   */
  exports.DefaultMessageNotifications = [
    'ALL',
    'MENTIONS',
  ];
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))
  
  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {
  
  class AbstractHandler {
    constructor(packetManager) {
      this.packetManager = packetManager;
    }
  
    handle(packet) {
      return packet;
    }
  }
  
  module.exports = AbstractHandler;
  
  
  /***/ }),
  /* 2 */
  /***/ (function(module, exports) {
  
  /*
  
  ABOUT ACTIONS
  
  Actions are similar to WebSocket Packet Handlers, but since introducing
  the REST API methods, in order to prevent rewriting code to handle data,
  "actions" have been introduced. They're basically what Packet Handlers
  used to be but they're strictly for manipulating data and making sure
  that WebSocket events don't clash with REST methods.
  
  */
  
  class GenericAction {
    constructor(client) {
      this.client = client;
    }
  
    handle(data) {
      return data;
    }
  }
  
  module.exports = GenericAction;
  
  
  /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(process) {const util = __webpack_require__(6);
  
  /**
   * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
   * an ID, for significantly improved performance and ease-of-use.
   * @extends {Map}
   */
  class Collection extends Map {
    constructor(iterable) {
      super(iterable);
  
      /**
       * Cached array for the `array()` method - will be reset to `null` whenever `set()` or `delete()` are called
       * @name Collection#_array
       * @type {?Array}
       * @private
       */
      Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
  
      /**
       * Cached array for the `keyArray()` method - will be reset to `null` whenever `set()` or `delete()` are called
       * @name Collection#_keyArray
       * @type {?Array}
       * @private
       */
      Object.defineProperty(this, '_keyArray', { value: null, writable: true, configurable: true });
    }
  
    set(key, val) {
      this._array = null;
      this._keyArray = null;
      return super.set(key, val);
    }
  
    delete(key) {
      this._array = null;
      this._keyArray = null;
      return super.delete(key);
    }
  
    /**
     * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.values()]` or
     * `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    array() {
      if (!this._array || this._array.length !== this.size) this._array = [...this.values()];
      return this._array;
    }
  
    /**
     * Creates an ordered array of the keys of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.keys()]` or
     * `Array.from(collection.keys())` instead.
     * @returns {Array}
     */
    keyArray() {
      if (!this._keyArray || this._keyArray.length !== this.size) this._keyArray = [...this.keys()];
      return this._keyArray;
    }
  
    /**
     * Obtains the first value(s) in this collection.
     * @param {number} [count] Number of values to obtain from the beginning
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    first(count) {
      if (count === undefined) return this.values().next().value;
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      count = Math.min(this.size, count);
      const arr = new Array(count);
      const iter = this.values();
      for (let i = 0; i < count; i++) arr[i] = iter.next().value;
      return arr;
    }
  
    /**
     * Obtains the first key(s) in this collection.
     * @param {number} [count] Number of keys to obtain from the beginning
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    firstKey(count) {
      if (count === undefined) return this.keys().next().value;
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      count = Math.min(this.size, count);
      const arr = new Array(count);
      const iter = this.keys();
      for (let i = 0; i < count; i++) arr[i] = iter.next().value;
      return arr;
    }
  
    /**
     * Obtains the last value(s) in this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of values to obtain from the end
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    last(count) {
      const arr = this.array();
      if (count === undefined) return arr[arr.length - 1];
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      return arr.slice(-count);
    }
  
    /**
     * Obtains the last key(s) in this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of keys to obtain from the end
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    lastKey(count) {
      const arr = this.keyArray();
      if (count === undefined) return arr[arr.length - 1];
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      return arr.slice(-count);
    }
  
    /**
     * Obtains random value(s) from this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of values to obtain randomly
     * @returns {*|Array<*>} The single value if `count` is undefined, or an array of values of `count` length
     */
    random(count) {
      let arr = this.array();
      if (count === undefined) return arr[Math.floor(Math.random() * arr.length)];
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      if (arr.length === 0) return [];
      const rand = new Array(count);
      arr = arr.slice();
      for (let i = 0; i < count; i++) rand[i] = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      return rand;
    }
  
    /**
     * Obtains random key(s) from this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [count] Number of keys to obtain randomly
     * @returns {*|Array<*>} The single key if `count` is undefined, or an array of keys of `count` length
     */
    randomKey(count) {
      let arr = this.keyArray();
      if (count === undefined) return arr[Math.floor(Math.random() * arr.length)];
      if (typeof count !== 'number') throw new TypeError('The count must be a number.');
      if (!Number.isInteger(count) || count < 1) throw new RangeError('The count must be an integer greater than 0.');
      if (arr.length === 0) return [];
      const rand = new Array(count);
      arr = arr.slice();
      for (let i = 0; i < count; i++) rand[i] = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      return rand;
    }
  
    /**
     * Searches for all items where their specified property's value is identical to the given value
     * (`item[prop] === value`).
     * @param {string} prop The property to test against
     * @param {*} value The expected value
     * @returns {Array}
     * @deprecated
     * @example
     * collection.findAll('username', 'Bob');
     */
    findAll(prop, value) {
      if (typeof prop !== 'string') throw new TypeError('Key must be a string.');
      if (typeof value === 'undefined') throw new Error('Value must be specified.');
      const results = [];
      for (const item of this.values()) {
        if (item[prop] === value) results.push(item);
      }
      return results;
    }
  
    /**
     * Searches for a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {string|Function} propOrFn The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.find('username', 'Bob');
     * @example
     * collection.find(val => val.username === 'Bob');
     */
    find(propOrFn, value) {
      if (typeof propOrFn === 'string') {
        if (typeof value === 'undefined') throw new Error('Value must be specified.');
        for (const item of this.values()) {
          if (item[propOrFn] === value) return item;
        }
        return null;
      } else if (typeof propOrFn === 'function') {
        for (const [key, val] of this) {
          if (propOrFn(val, key, this)) return val;
        }
        return null;
      } else {
        throw new Error('First argument must be a property string or a function.');
      }
    }
  
    /* eslint-disable max-len */
    /**
     * Searches for the key of a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).
     * @param {string|Function} propOrFn The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.findKey('username', 'Bob');
     * @example
     * collection.findKey(val => val.username === 'Bob');
     */
    /* eslint-enable max-len */
    findKey(propOrFn, value) {
      if (typeof propOrFn === 'string') {
        if (typeof value === 'undefined') throw new Error('Value must be specified.');
        for (const [key, val] of this) {
          if (val[propOrFn] === value) return key;
        }
        return null;
      } else if (typeof propOrFn === 'function') {
        for (const [key, val] of this) {
          if (propOrFn(val, key, this)) return key;
        }
        return null;
      } else {
        throw new Error('First argument must be a property string or a function.');
      }
    }
  
    /**
     * Searches for the existence of a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`).
     * <warn>Do not use this to check for an item by its ID. Instead, use `collection.has(id)`. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) for details.</warn>
     * @param {string} prop The property to test against
     * @param {*} value The expected value
     * @returns {boolean}
     * @deprecated
     * @example
     * if (collection.exists('username', 'Bob')) {
     *  console.log('user here!');
     * }
     */
    exists(prop, value) {
      return Boolean(this.find(prop, value));
    }
  
    /**
     * Removes entries that satisfy the provided filter function.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {number} The number of removed entries
     */
    sweep(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      const previousSize = this.size;
      for (const [key, val] of this) {
        if (fn(val, key, this)) this.delete(key);
      }
      return previousSize - this.size;
    }
  
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a Collection instead of an Array.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {Collection}
     */
    filter(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      const results = new Collection();
      for (const [key, val] of this) {
        if (fn(val, key, this)) results.set(key, val);
      }
      return results;
    }
  
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     * @deprecated
     */
    filterArray(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      const results = [];
      for (const [key, val] of this) {
        if (fn(val, key, this)) results.push(val);
      }
      return results;
    }
  
    /**
     * Partitions the collection into two collections where the first collection
     * contains the items that passed and the second contains the items that failed.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Collection[]}
     * @example const [big, small] = collection.partition(guild => guild.memberCount > 250);
     */
    partition(fn, thisArg) {
      if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
      const results = [new Collection(), new Collection()];
      for (const [key, val] of this) {
        if (fn(val, key, this)) {
          results[0].set(key, val);
        } else {
          results[1].set(key, val);
        }
      }
      return results;
    }
  
    /**
     * Identical to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new array, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     */
    map(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      const arr = new Array(this.size);
      let i = 0;
      for (const [key, val] of this) arr[i++] = fn(val, key, this);
      return arr;
    }
  
    /**
     * Identical to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     */
    some(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      for (const [key, val] of this) {
        if (fn(val, key, this)) return true;
      }
      return false;
    }
  
    /**
     * Identical to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {Object} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     */
    every(fn, thisArg) {
      if (thisArg) fn = fn.bind(thisArg);
      for (const [key, val] of this) {
        if (!fn(val, key, this)) return false;
      }
      return true;
    }
  
    /**
     * Identical to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param {Function} fn Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
     * and `collection`
     * @param {*} [initialValue] Starting value for the accumulator
     * @returns {*}
     */
    reduce(fn, initialValue) {
      let accumulator;
      if (typeof initialValue !== 'undefined') {
        accumulator = initialValue;
        for (const [key, val] of this) accumulator = fn(accumulator, val, key, this);
      } else {
        let first = true;
        for (const [key, val] of this) {
          if (first) {
            accumulator = val;
            first = false;
            continue;
          }
          accumulator = fn(accumulator, val, key, this);
        }
      }
      return accumulator;
    }
  
    /**
     * Identical to
     * [Map.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach),
     * but returns the collection instead of undefined.
     * @param {Function} fn Function to execute for each element
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Collection}
     * @example
     * collection
     *  .tap(user => console.log(user.username))
     *  .filter(user => user.bot)
     *  .tap(user => console.log(user.username));
     */
    tap(fn, thisArg) {
      this.forEach(fn, thisArg);
      return this;
    }
  
    /**
     * Creates an identical shallow copy of this collection.
     * @returns {Collection}
     * @example const newColl = someColl.clone();
     */
    clone() {
      return new this.constructor(this);
    }
  
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     * @param {...Collection} collections Collections to merge
     * @returns {Collection}
     * @example const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     */
    concat(...collections) {
      const newColl = this.clone();
      for (const coll of collections) {
        for (const [key, val] of coll) newColl.set(key, val);
      }
      return newColl;
    }
  
    /**
     * Calls the `delete()` method on all items that have it.
     * @returns {Promise[]}
     */
    deleteAll() {
      const returns = [];
      for (const item of this.values()) {
        if (item.delete) returns.push(item.delete());
      }
      return returns;
    }
  
    /**
     * Checks if this collection shares identical key-value pairings with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {Collection} collection Collection to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    equals(collection) {
      if (!collection) return false;
      if (this === collection) return true;
      if (this.size !== collection.size) return false;
      return !this.find((value, key) => {
        const testVal = collection.get(key);
        return testVal !== value || (testVal === undefined && !collection.has(key));
      });
    }
  
    /**
     * The sort() method sorts the elements of a collection in place and returns the collection.
     * The sort is not necessarily stable. The default sort order is according to string Unicode code points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * if omitted, the collection is sorted according to each character's Unicode code point value,
     * according to the string conversion of each element.
     * @returns {Collection}
     */
    sort(compareFunction = (x, y) => +(x > y) || +(x === y) - 1) {
      return new Collection([...this.entries()].sort((a, b) => compareFunction(a[1], b[1], a[0], b[0])));
    }
  }
  
  Collection.prototype.findAll =
    util.deprecate(Collection.prototype.findAll, 'Collection#findAll: use Collection#filter instead');
  
  Collection.prototype.filterArray =
    util.deprecate(Collection.prototype.filterArray, 'Collection#filterArray: use Collection#filter instead');
  
  Collection.prototype.exists =
    util.deprecate(Collection.prototype.exists, 'Collection#exists: use Collection#some instead');
  
  Collection.prototype.find = function find(propOrFn, value) {
    if (typeof propOrFn === 'string') {
      process.emitWarning('Collection#find: pass a function instead', 'DeprecationWarning');
      if (typeof value === 'undefined') throw new Error('Value must be specified.');
      for (const item of this.values()) {
        if (item[propOrFn] === value) return item;
      }
      return null;
    } else if (typeof propOrFn === 'function') {
      for (const [key, val] of this) {
        if (propOrFn(val, key, this)) return val;
      }
      return null;
    } else {
      throw new Error('First argument must be a property string or a function.');
    }
  };
  
  Collection.prototype.findKey = function findKey(propOrFn, value) {
    if (typeof propOrFn === 'string') {
      process.emitWarning('Collection#findKey: pass a function instead', 'DeprecationWarning');
      if (typeof value === 'undefined') throw new Error('Value must be specified.');
      for (const [key, val] of this) {
        if (val[propOrFn] === value) return key;
      }
      return null;
    } else if (typeof propOrFn === 'function') {
      for (const [key, val] of this) {
        if (propOrFn(val, key, this)) return key;
      }
      return null;
    } else {
      throw new Error('First argument must be a property string or a function.');
    }
  };
  
  module.exports = Collection;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))
  
  /***/ }),
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(Buffer) {const snekfetch = __webpack_require__(25);
  const Constants = __webpack_require__(0);
  const ConstantsHttp = Constants.DefaultOptions.http;
  
  /**
   * Contains various general-purpose utility methods. These functions are also available on the base `Discord` object.
   */
  class Util {
    constructor() {
      throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
  
    /**
     * Splits a string into multiple chunks at a designated character that do not exceed a specific length.
     * @param {string} text Content to split
     * @param {SplitOptions} [options] Options controlling the behaviour of the split
     * @returns {string|string[]}
     */
    static splitMessage(text, { maxLength = 1950, char = '\n', prepend = '', append = '' } = {}) {
      if (text.length <= maxLength) return text;
      const splitText = text.split(char);
      if (splitText.length === 1) throw new Error('Message exceeds the max length and contains no split characters.');
      const messages = [''];
      let msg = 0;
      for (let i = 0; i < splitText.length; i++) {
        if (messages[msg].length + splitText[i].length + 1 > maxLength) {
          messages[msg] += append;
          messages.push(prepend);
          msg++;
        }
        messages[msg] += (messages[msg].length > 0 && messages[msg] !== prepend ? char : '') + splitText[i];
      }
      return messages;
    }
  
    /**
     * Escapes any Discord-flavour markdown in a string.
     * @param {string} text Content to escape
     * @param {boolean} [onlyCodeBlock=false] Whether to only escape codeblocks (takes priority)
     * @param {boolean} [onlyInlineCode=false] Whether to only escape inline code
     * @returns {string}
     */
    static escapeMarkdown(text, onlyCodeBlock = false, onlyInlineCode = false) {
      if (onlyCodeBlock) return text.replace(/```/g, '`\u200b``');
      if (onlyInlineCode) return text.replace(/\\(`|\\)/g, '$1').replace(/(`|\\)/g, '\\$1');
      return text.replace(/\\(\*|_|`|~|\\)/g, '$1').replace(/(\*|_|`|~|\\)/g, '\\$1');
    }
  
    /**
     * Gets the recommended shard count from Discord.
     * @param {string} token Discord auth token
     * @param {number} [guildsPerShard=1000] Number of guilds per shard
     * @returns {Promise<number>} The recommended number of shards
     */
    static fetchRecommendedShards(token, guildsPerShard = 1000) {
      return new Promise((resolve, reject) => {
        if (!token) throw new Error('A token must be provided.');
        snekfetch.get(`${ConstantsHttp.host}/api/v${ConstantsHttp.version}${Constants.Endpoints.gateway.bot}`)
          .set('Authorization', `Bot ${token.replace(/^Bot\s*/i, '')}`)
          .end((err, res) => {
            if (err) reject(err);
            resolve(res.body.shards * (1000 / guildsPerShard));
          });
      });
    }
  
    /**
     * Parses emoji info out of a string. The string must be one of:
     * * A UTF-8 emoji (no ID)
     * * A URL-encoded UTF-8 emoji (no ID)
     * * A Discord custom emoji (`<:name:id>` or `<a:name:id>`)
     * @param {string} text Emoji string to parse
     * @returns {?Object} Object with `animated`, `name`, and `id` properties
     * @private
     */
    static parseEmoji(text) {
      if (text.includes('%')) text = decodeURIComponent(text);
      if (!text.includes(':')) return { animated: false, name: text, id: null };
      const m = text.match(/<?(a:)?(\w{2,32}):(\d{17,19})>?/);
      if (!m) return null;
      return { animated: Boolean(m[1]), name: m[2], id: m[3] };
    }
  
    /**
     * Checks whether the arrays are equal, also removes duplicated entries from b.
     * @param {Array<*>} a Array which will not be modified.
     * @param {Array<*>} b Array to remove duplicated entries from.
     * @returns {boolean} Whether the arrays are equal.
     * @private
     */
    static arraysEqual(a, b) {
      if (a === b) return true;
      if (a.length !== b.length) return false;
  
      for (const item of a) {
        const ind = b.indexOf(item);
        if (ind !== -1) b.splice(ind, 1);
      }
  
      return b.length === 0;
    }
  
    /**
     * Shallow-copies an object with its class/prototype intact.
     * @param {Object} obj Object to clone
     * @returns {Object}
     * @private
     */
    static cloneObject(obj) {
      return Object.assign(Object.create(obj), obj);
    }
  
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     * @private
     */
    static mergeDefault(def, given) {
      if (!given) return def;
      for (const key in def) {
        if (!{}.hasOwnProperty.call(given, key)) {
          given[key] = def[key];
        } else if (given[key] === Object(given[key])) {
          given[key] = this.mergeDefault(def[key], given[key]);
        }
      }
  
      return given;
    }
  
    /**
     * Converts an ArrayBuffer or string to a Buffer.
     * @param {ArrayBuffer|string} ab ArrayBuffer to convert
     * @returns {Buffer}
     * @private
     */
    static convertToBuffer(ab) {
      if (typeof ab === 'string') ab = this.str2ab(ab);
      return Buffer.from(ab);
    }
  
    /**
     * Converts a string to an ArrayBuffer.
     * @param {string} str String to convert
     * @returns {ArrayBuffer}
     * @private
     */
    static str2ab(str) {
      const buffer = new ArrayBuffer(str.length * 2);
      const view = new Uint16Array(buffer);
      for (var i = 0, strLen = str.length; i < strLen; i++) view[i] = str.charCodeAt(i);
      return buffer;
    }
  
    /**
     * Makes an Error from a plain info object.
     * @param {Object} obj Error info
     * @param {string} obj.name Error type
     * @param {string} obj.message Message for the error
     * @param {string} obj.stack Stack for the error
     * @returns {Error}
     * @private
     */
    static makeError(obj) {
      const err = new Error(obj.message);
      err.name = obj.name;
      err.stack = obj.stack;
      return err;
    }
  
    /**
     * Makes a plain error info object from an Error.
     * @param {Error} err Error to get info from
     * @returns {Object}
     * @private
     */
    static makePlainError(err) {
      const obj = {};
      obj.name = err.name;
      obj.message = err.message;
      obj.stack = err.stack;
      return obj;
    }
  
    /**
     * Moves an element in an array *in place*.
     * @param {Array<*>} array Array to modify
     * @param {*} element Element to move
     * @param {number} newIndex Index or offset to move the element to
     * @param {boolean} [offset=false] Move the element by an offset amount rather than to a set index
     * @returns {number}
     * @private
     */
    static moveElementInArray(array, element, newIndex, offset = false) {
      const index = array.indexOf(element);
      newIndex = (offset ? index : 0) + newIndex;
      if (newIndex > -1 && newIndex < array.length) {
        const removedElement = array.splice(index, 1)[0];
        array.splice(newIndex, 0, removedElement);
      }
      return array.indexOf(element);
    }
  
    /**
     * Creates a Promise that resolves after a specified duration.
     * @param {number} ms How long to wait before resolving (in milliseconds)
     * @returns {Promise<void>}
     * @private
     */
    static delayFor(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
  }
  
  module.exports = Util;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))
  
  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const util = __webpack_require__(6);
  
  /**
   * Data structure that makes it easy to interact with a permission bitfield. All {@link GuildMember}s have a set of
   * permissions in their guild, and each channel in the guild may also have {@link PermissionOverwrites} for the member
   * that override their default permissions.
   */
  class Permissions {
    /**
     * @param {GuildMember} [member] Member the permissions are for **(deprecated)**
     * @param {number|PermissionResolvable} permissions Permissions or bitfield to read from
     */
    constructor(member, permissions) {
      permissions = typeof member === 'object' && !(member instanceof Array) ? permissions : member;
  
      /**
       * Member the permissions are for
       * @type {GuildMember}
       * @deprecated
       */
      this._member = typeof member === 'object' ? member : null;
  
      /**
       * Bitfield of the packed permissions
       * @type {number}
       */
      this.bitfield = typeof permissions === 'number' ? permissions : this.constructor.resolve(permissions);
    }
  
    get member() {
      return this._member;
    }
  
    set member(value) {
      this._member = value;
    }
  
    /**
     * Bitfield of the packed permissions
     * @type {number}
     * @see {@link Permissions#bitfield}
     * @deprecated
     * @readonly
     */
    get raw() {
      return this.bitfield;
    }
  
    set raw(raw) {
      this.bitfield = raw;
    }
  
    /**
     * Checks whether the bitfield has a permission, or multiple permissions.
     * @param {PermissionResolvable} permission Permission(s) to check for
     * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
     * @returns {boolean}
     */
    has(permission, checkAdmin = true) {
      if (permission instanceof Array) return permission.every(p => this.has(p, checkAdmin));
      permission = this.constructor.resolve(permission);
      if (checkAdmin && (this.bitfield & this.constructor.FLAGS.ADMINISTRATOR) > 0) return true;
      return (this.bitfield & permission) === permission;
    }
  
    /**
     * Gets all given permissions that are missing from the bitfield.
     * @param {PermissionResolvable} permissions Permissions to check for
     * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
     * @returns {PermissionResolvable}
     */
    missing(permissions, checkAdmin = true) {
      if (!(permissions instanceof Array)) permissions = [permissions];
      return permissions.filter(p => !this.has(p, checkAdmin));
    }
  
    /**
     * Adds permissions to this one, creating a new instance to represent the new bitfield.
     * @param {...PermissionResolvable} permissions Permissions to add
     * @returns {Permissions}
     */
    add(...permissions) {
      let total = 0;
      for (let p = permissions.length - 1; p >= 0; p--) {
        const perm = this.constructor.resolve(permissions[p]);
        total |= perm;
      }
      if (Object.isFrozen(this)) return new this.constructor(this.bitfield | total);
      this.bitfield |= total;
      return this;
    }
  
    /**
     * Removes permissions to this one, creating a new instance to represent the new bitfield.
     * @param {...PermissionResolvable} permissions Permissions to remove
     * @returns {Permissions}
     */
    remove(...permissions) {
      let total = 0;
      for (let p = permissions.length - 1; p >= 0; p--) {
        const perm = this.constructor.resolve(permissions[p]);
        total |= perm;
      }
      if (Object.isFrozen(this)) return new this.constructor(this.bitfield & ~total);
      this.bitfield &= ~total;
      return this;
    }
  
    /**
     * Gets an object mapping permission name (like `VIEW_CHANNEL`) to a {@link boolean} indicating whether the
     * permission is available.
     * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
     * @returns {Object}
     */
    serialize(checkAdmin = true) {
      const serialized = {};
      for (const perm in this.constructor.FLAGS) serialized[perm] = this.has(perm, checkAdmin);
      return serialized;
    }
  
    /**
     * Checks whether the user has a certain permission, e.g. `READ_MESSAGES`.
     * @param {PermissionResolvable} permission The permission to check for
     * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permission
     * @returns {boolean}
     * @see {@link Permissions#has}
     * @deprecated
     */
    hasPermission(permission, explicit = false) {
      return this.has(permission, !explicit);
    }
  
    /**
     * Checks whether the user has all specified permissions.
     * @param {PermissionResolvable} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permissions
     * @returns {boolean}
     * @see {@link Permissions#has}
     * @deprecated
     */
    hasPermissions(permissions, explicit = false) {
      return this.has(permissions, !explicit);
    }
  
    /**
     * Checks whether the user has all specified permissions, and lists any missing permissions.
     * @param {PermissionResolvable} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permissions
     * @returns {PermissionResolvable}
     * @see {@link Permissions#missing}
     * @deprecated
     */
    missingPermissions(permissions, explicit = false) {
      return this.missing(permissions, !explicit);
    }
  
    /**
     * Gets an {@link Array} of permission names (such as `VIEW_CHANNEL`) based on the permissions available.
     * @param {boolean} [checkAdmin=true] Whether to allow the administrator permission to override
     * @returns {string[]}
     */
    toArray(checkAdmin = true) {
      return Object.keys(this.constructor.FLAGS).filter(perm => this.has(perm, checkAdmin));
    }
  
    /**
     * Freezes these permissions, making them immutable.
     * @returns {Permissions} These permissions
     */
    freeze() {
      return Object.freeze(this);
    }
  
    valueOf() {
      return this.bitfield;
    }
  
    /**
     * Data that can be resolved to give a permission number. This can be:
     * * A string (see {@link Permissions.FLAGS})
     * * A permission number
     * @typedef {string|number|Permissions|PermissionResolvable[]} PermissionResolvable
     */
  
    /**
     * Resolves permissions to their numeric form.
     * @param {PermissionResolvable} permission - Permission(s) to resolve
     * @returns {number}
     */
    static resolve(permission) {
      if (permission instanceof Array) return permission.map(p => this.resolve(p)).reduce((prev, p) => prev | p, 0);
      if (typeof permission === 'string') permission = this.FLAGS[permission];
      if (typeof permission !== 'number' || permission < 0) throw new RangeError(Constants.Errors.NOT_A_PERMISSION);
      return permission;
    }
  }
  
  /**
   * Numeric permission flags. All available properties:
   * - `ADMINISTRATOR` (implicitly has *all* permissions, and bypasses all channel overwrites)
   * - `CREATE_INSTANT_INVITE` (create invitations to the guild)
   * - `KICK_MEMBERS`
   * - `BAN_MEMBERS`
   * - `MANAGE_CHANNELS` (edit and reorder channels)
   * - `MANAGE_GUILD` (edit the guild information, region, etc.)
   * - `ADD_REACTIONS` (add new reactions to messages)
   * - `VIEW_AUDIT_LOG`
   * - `PRIORITY_SPEAKER`
   * - `VIEW_CHANNEL`
   * - `READ_MESSAGES` **(deprecated)**
   * - `SEND_MESSAGES`
   * - `SEND_TTS_MESSAGES`
   * - `MANAGE_MESSAGES` (delete messages and reactions)
   * - `EMBED_LINKS` (links posted will have a preview embedded)
   * - `ATTACH_FILES`
   * - `READ_MESSAGE_HISTORY` (view messages that were posted prior to opening Discord)
   * - `MENTION_EVERYONE`
   * - `USE_EXTERNAL_EMOJIS` (use emojis from different guilds)
   * - `EXTERNAL_EMOJIS` **(deprecated)**
   * - `CONNECT` (connect to a voice channel)
   * - `SPEAK` (speak in a voice channel)
   * - `MUTE_MEMBERS` (mute members across all voice channels)
   * - `DEAFEN_MEMBERS` (deafen members across all voice channels)
   * - `MOVE_MEMBERS` (move members between voice channels)
   * - `USE_VAD` (use voice activity detection)
   * - `CHANGE_NICKNAME`
   * - `MANAGE_NICKNAMES` (change other members' nicknames)
   * - `MANAGE_ROLES`
   * - `MANAGE_ROLES_OR_PERMISSIONS` **(deprecated)**
   * - `MANAGE_WEBHOOKS`
   * - `MANAGE_EMOJIS`
   * @type {Object}
   * @see {@link https://discordapp.com/developers/docs/topics/permissions}
   */
  Permissions.FLAGS = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    PRIORITY_SPEAKER: 1 << 8,
  
    VIEW_CHANNEL: 1 << 10,
    READ_MESSAGES: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    EXTERNAL_EMOJIS: 1 << 18,
    USE_EXTERNAL_EMOJIS: 1 << 18,
  
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
  
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_ROLES_OR_PERMISSIONS: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS: 1 << 30,
  };
  
  /**
   * Bitfield representing every permission combined
   * @type {number}
   */
  Permissions.ALL = Object.keys(Permissions.FLAGS).reduce((all, p) => all | Permissions.FLAGS[p], 0);
  
  /**
   * Bitfield representing the default permissions for users
   * @type {number}
   */
  Permissions.DEFAULT = 104324097;
  
  /**
   * @class EvaluatedPermissions
   * @classdesc The final evaluated permissions for a member in a channel
   * @see {@link Permissions}
   * @deprecated
   */
  
  Permissions.prototype.hasPermission = util.deprecate(Permissions.prototype.hasPermission,
    'EvaluatedPermissions#hasPermission is deprecated, use Permissions#has instead');
  Permissions.prototype.hasPermissions = util.deprecate(Permissions.prototype.hasPermissions,
    'EvaluatedPermissions#hasPermissions is deprecated, use Permissions#has instead');
  Permissions.prototype.missingPermissions = util.deprecate(Permissions.prototype.missingPermissions,
    'EvaluatedPermissions#missingPermissions is deprecated, use Permissions#missing instead');
  Object.defineProperty(Permissions.prototype, 'member', {
    get: util
      .deprecate(Object.getOwnPropertyDescriptor(Permissions.prototype, 'member').get,
        'EvaluatedPermissions#member is deprecated'),
  });
  
  module.exports = Permissions;
  
  
  /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  var formatRegExp = /%[sdj%]/g;
  exports.format = function(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(' ');
    }
  
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s': return String(args[i++]);
        case '%d': return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }
    return str;
  };
  
  
  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  exports.deprecate = function(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global.process)) {
      return function() {
        return exports.deprecate(fn, msg).apply(this, arguments);
      };
    }
  
    if (process.noDeprecation === true) {
      return fn;
    }
  
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
  
    return deprecated;
  };
  
  
  var debugs = {};
  var debugEnviron;
  exports.debuglog = function(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = Object({"__DISCORD_WEBPACK__":"true"}).NODE_DEBUG || '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = process.pid;
        debugs[set] = function() {
          var msg = exports.format.apply(exports, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  };
  
  
  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      exports._extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports.inspect = inspect;
  
  
  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };
  
  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };
  
  
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
  
    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str +
             '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }
  
  
  function stylizeNoColor(str, styleType) {
    return str;
  }
  
  
  function arrayToHash(array) {
    var hash = {};
  
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
  
    return hash;
  }
  
  
  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== exports.inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
  
    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
  
    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
  
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
  
    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }
  
    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
  
    var base = '', array = false, braces = ['{', '}'];
  
    // Make Array say that they are Array
    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    }
  
    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }
  
    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }
  
    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }
  
    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }
  
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
  
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }
  
    ctx.seen.push(value);
  
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
  
    ctx.seen.pop();
  
    return reduceToSingleString(output, base, braces);
  }
  
  
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }
  
  
  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }
  
  
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }
  
  
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }
  
    return name + ': ' + str;
  }
  
  
  function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);
  
    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }
  
    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }
  
  
  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray(ar) {
    return Array.isArray(ar);
  }
  exports.isArray = isArray;
  
  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }
  exports.isBoolean = isBoolean;
  
  function isNull(arg) {
    return arg === null;
  }
  exports.isNull = isNull;
  
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports.isNullOrUndefined = isNullOrUndefined;
  
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  exports.isNumber = isNumber;
  
  function isString(arg) {
    return typeof arg === 'string';
  }
  exports.isString = isString;
  
  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }
  exports.isSymbol = isSymbol;
  
  function isUndefined(arg) {
    return arg === void 0;
  }
  exports.isUndefined = isUndefined;
  
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }
  exports.isRegExp = isRegExp;
  
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  exports.isObject = isObject;
  
  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }
  exports.isDate = isDate;
  
  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }
  exports.isError = isError;
  
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  exports.isFunction = isFunction;
  
  function isPrimitive(arg) {
    return arg === null ||
           typeof arg === 'boolean' ||
           typeof arg === 'number' ||
           typeof arg === 'string' ||
           typeof arg === 'symbol' ||  // ES6 symbol
           typeof arg === 'undefined';
  }
  exports.isPrimitive = isPrimitive;
  
  exports.isBuffer = __webpack_require__(71);
  
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  
  
  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }
  
  
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];
  
  // 26 Feb 16:19:34
  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  }
  
  
  // log is just a thin wrapper to console.log that prepends a timestamp
  exports.log = function() {
    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
  };
  
  
  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * The Function.prototype.inherits from lang.js rewritten as a standalone
   * function (not on Function.prototype). NOTE: If this file is to be loaded
   * during bootstrapping this function needs to be rewritten using some native
   * functions as prototype setup using normal JavaScript does not work as
   * expected during bootstrapping (see mirror.js in r114903).
   *
   * @param {function} ctor Constructor function which needs to inherit the
   *     prototype.
   * @param {function} superCtor Constructor function to inherit prototype from.
   */
  exports.inherits = __webpack_require__(72);
  
  exports._extend = function(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
  
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  };
  
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(9)))
  
  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Long = __webpack_require__(26);
  
  // Discord epoch (2015-01-01T00:00:00.000Z)
  const EPOCH = 1420070400000;
  let INCREMENT = 0;
  
  /**
   * A container for useful snowflake-related methods.
   */
  class SnowflakeUtil {
    constructor() {
      throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
  
    /**
     * A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z
     * ```
     * If we have a snowflake '266241948824764416' we can represent it as binary:
     *
     * 64                                          22     17     12          0
     *  000000111011000111100001101001000101000000  00001  00000  000000000000
     *       number of ms since Discord epoch       worker  pid    increment
     * ```
     * @typedef {string} Snowflake
     */
  
    /**
     * Generates a Discord snowflake.
     * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
     * @param {number|Date} [timestamp=Date.now()] Timestamp or date of the snowflake to generate
     * @returns {Snowflake} The generated snowflake
     */
    static generate(timestamp = Date.now()) {
      if (timestamp instanceof Date) timestamp = timestamp.getTime();
      if (typeof timestamp !== 'number' || isNaN(timestamp)) {
        throw new TypeError(
          `"timestamp" argument must be a number (received ${isNaN(timestamp) ? 'NaN' : typeof timestamp})`
        );
      }
      if (INCREMENT >= 4095) INCREMENT = 0;
      const BINARY = `${pad((timestamp - EPOCH).toString(2), 42)}0000100000${pad((INCREMENT++).toString(2), 12)}`;
      return Long.fromString(BINARY, 2).toString();
    }
  
    /**
     * A deconstructed snowflake.
     * @typedef {Object} DeconstructedSnowflake
     * @property {number} timestamp Timestamp the snowflake was created
     * @property {Date} date Date the snowflake was created
     * @property {number} workerID Worker ID in the snowflake
     * @property {number} processID Process ID in the snowflake
     * @property {number} increment Increment in the snowflake
     * @property {string} binary Binary representation of the snowflake
     */
  
    /**
     * Deconstructs a Discord snowflake.
     * @param {Snowflake} snowflake Snowflake to deconstruct
     * @returns {DeconstructedSnowflake} Deconstructed snowflake
     */
    static deconstruct(snowflake) {
      const BINARY = pad(Long.fromString(snowflake).toString(2), 64);
      const res = {
        timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
        workerID: parseInt(BINARY.substring(42, 47), 2),
        processID: parseInt(BINARY.substring(47, 52), 2),
        increment: parseInt(BINARY.substring(52, 64), 2),
        binary: BINARY,
      };
      Object.defineProperty(res, 'date', {
        get: function get() { return new Date(this.timestamp); },
        enumerable: true,
      });
      return res;
    }
  }
  
  function pad(v, n, c = '0') {
    return String(v).length >= n ? String(v) : (String(c).repeat(n) + v).slice(-n);
  }
  
  module.exports = SnowflakeUtil;
  
  
  /***/ }),
  /* 8 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Snowflake = __webpack_require__(7);
  const Permissions = __webpack_require__(5);
  const util = __webpack_require__(6);
  
  /**
   * Represents a role on Discord.
   */
  class Role {
    constructor(guild, data) {
      /**
       * The client that instantiated the role
       * @name Role#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: guild.client });
  
      /**
       * The guild that the role belongs to
       * @type {Guild}
       */
      this.guild = guild;
  
      /**
       * Whether the role has been deleted
       * @type {boolean}
       */
      this.deleted = false;
  
      if (data) this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of the role (unique to the guild it is part of)
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The name of the role
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The base 10 color of the role
       * @type {number}
       */
      this.color = data.color;
  
      /**
       * If true, users that are part of this role will appear in a separate category in the users list
       * @type {boolean}
       */
      this.hoist = data.hoist;
  
      /**
       * The position of the role from the API
       * @type {number}
       */
      this.position = data.position;
  
      /**
       * The permissions bitfield of the role
       * @type {number}
       */
      this.permissions = data.permissions;
  
      /**
       * Whether or not the role is managed by an external service
       * @type {boolean}
       */
      this.managed = data.managed;
  
      /**
       * Whether or not the role can be mentioned by anyone
       * @type {boolean}
       */
      this.mentionable = data.mentionable;
    }
  
    /**
     * The timestamp the role was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the role was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The hexadecimal version of the role color, with a leading hashtag
     * @type {string}
     * @readonly
     */
    get hexColor() {
      let col = this.color.toString(16);
      while (col.length < 6) col = `0${col}`;
      return `#${col}`;
    }
  
    /**
     * The cached guild members that have this role
     * @type {Collection<Snowflake, GuildMember>}
     * @readonly
     */
    get members() {
      return this.guild.members.filter(m => m.roles.has(this.id));
    }
  
    /**
     * Whether the role is editable by the client user
     * @type {boolean}
     * @readonly
     */
    get editable() {
      if (this.managed) return false;
      const clientMember = this.guild.member(this.client.user);
      if (!clientMember.permissions.has(Permissions.FLAGS.MANAGE_ROLES_OR_PERMISSIONS)) return false;
      return clientMember.highestRole.comparePositionTo(this) > 0;
    }
  
    /**
     * The position of the role in the role manager
     * @type {number}
     * @readonly
     */
    get calculatedPosition() {
      const sorted = this.guild._sortedRoles;
      return sorted.array().indexOf(sorted.get(this.id));
    }
  
    /**
     * Get an object mapping permission names to whether or not the role enables that permission.
     * @returns {Object<string, boolean>}
     * @example
     * // Print the serialized role permissions
     * console.log(role.serialize());
     */
    serialize() {
      return new Permissions(this.permissions).serialize();
    }
  
    /**
     * Checks if the role has a permission.
     * @param {PermissionResolvable} permission Permission(s) to check for
     * @param {boolean} [explicit=false] Whether to require the role to explicitly have the exact permission
     * **(deprecated)**
     * @param {boolean} [checkAdmin] Whether to allow the administrator permission to override
     * (takes priority over `explicit`)
     * @returns {boolean}
     * @example
     * // See if a role can ban a member
     * if (role.hasPermission('BAN_MEMBERS')) {
     *   console.log('This role can ban members');
     * } else {
     *   console.log('This role can\'t ban members');
     * }
     */
    hasPermission(permission, explicit = false, checkAdmin) {
      return new Permissions(this.permissions).has(
        permission, typeof checkAdmin !== 'undefined' ? checkAdmin : !explicit
      );
    }
  
    /**
     * Checks if the role has all specified permissions.
     * @param {PermissionResolvable} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the role to explicitly have the exact permissions
     * @returns {boolean}
     * @deprecated
     */
    hasPermissions(permissions, explicit = false) {
      return new Permissions(this.permissions).has(permissions, !explicit);
    }
  
    /**
     * Compares this role's position to another role's.
     * @param {Role} role Role to compare to this one
     * @returns {number} Negative number if this role's position is lower (other role's is higher),
     * positive number if this one is higher (other's is lower), 0 if equal
     */
    comparePositionTo(role) {
      return this.constructor.comparePositions(this, role);
    }
  
    /**
     * The data for a role.
     * @typedef {Object} RoleData
     * @property {string} [name] The name of the role
     * @property {ColorResolvable} [color] The color of the role, either a hex string or a base 10 number
     * @property {boolean} [hoist] Whether or not the role should be hoisted
     * @property {number} [position] The position of the role
     * @property {PermissionResolvable|number} [permissions] The permissions of the role
     * @property {boolean} [mentionable] Whether or not the role should be mentionable
     */
  
    /**
     * Edits the role.
     * @param {RoleData} data The new data for the role
     * @param {string} [reason] The reason for editing this role
     * @returns {Promise<Role>}
     * @example
     * // Edit name of a role
     * role.edit({ name: 'New Name' })
     *   .then(updated => console.log(`Edited role name from ${role.name} to ${updated.name}`))
     *   .catch(console.error);
     */
    edit(data, reason) {
      return this.client.rest.methods.updateGuildRole(this, data, reason);
    }
  
    /**
     * Set a new name for the role.
     * @param {string} name The new name of the role
     * @param {string} [reason] Reason for changing the role's name
     * @returns {Promise<Role>}
     * @example
     * // Set the name of the role
     * role.setName('New Name')
     *   .then(updated => console.log(`Edited role name from ${role.name} to ${updated.name}`))
     *   .catch(console.error);
     */
    setName(name, reason) {
      return this.edit({ name }, reason);
    }
  
    /**
     * Set a new color for the role.
     * @param {ColorResolvable} color The color of the role
     * @param {string} [reason] Reason for changing the role's color
     * @returns {Promise<Role>}
     * @example
     * // Set the color of a role
     * role.setColor('#FF0000')
     *   .then(updated => console.log(`Set color of role to ${role.color}`))
     *   .catch(console.error);
     */
    setColor(color, reason) {
      return this.edit({ color }, reason);
    }
  
    /**
     * Set whether or not the role should be hoisted.
     * @param {boolean} hoist Whether or not to hoist the role
     * @param {string} [reason] Reason for setting whether or not the role should be hoisted
     * @returns {Promise<Role>}
     * @example
     * // Set the hoist of the role
     * role.setHoist(true)
     *   .then(updated => console.log(`Role hoisted: ${updated.hoist}`))
     *   .catch(console.error);
     */
    setHoist(hoist, reason) {
      return this.edit({ hoist }, reason);
    }
  
    /**
     * Set the position of the role.
     * @param {number} position The position of the role
     * @param {boolean} [relative=false] Move the position relative to its current value
     * @returns {Promise<Role>}
     * @example
     * // Set the position of the role
     * role.setPosition(1)
     *   .then(updated => console.log(`Role position: ${updated.position}`))
     *   .catch(console.error);
     */
    setPosition(position, relative) {
      return this.guild.setRolePosition(this, position, relative).then(() => this);
    }
  
    /**
     * Set the permissions of the role.
     * @param {PermissionResolvable} permissions The permissions of the role
     * @param {string} [reason] Reason for changing the role's permissions
     * @returns {Promise<Role>}
     * @example
     * // Set the permissions of the role
     * role.setPermissions(['KICK_MEMBERS', 'BAN_MEMBERS'])
     *   .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
     *   .catch(console.error);
     * @example
     * // Remove all permissions from a role
     * role.setPermissions(0)
     *   .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
     *   .catch(console.error);
     */
    setPermissions(permissions, reason) {
      return this.edit({ permissions }, reason);
    }
  
    /**
     * Set whether this role is mentionable.
     * @param {boolean} mentionable Whether this role should be mentionable
     * @param {string} [reason] Reason for setting whether or not this role should be mentionable
     * @returns {Promise<Role>}
     * @example
     * // Make the role mentionable
     * role.setMentionable(true, 'Role needs to be pinged')
     *   .then(updated => console.log(`Role mentionable: ${updated.mentionable}`))
     *   .catch(console.error);
     */
    setMentionable(mentionable, reason) {
      return this.edit({ mentionable }, reason);
    }
  
    /**
     * Deletes the role.
     * @param {string} [reason] Reason for deleting the role
     * @returns {Promise<Role>}
     * @example
     * // Delete a role
     * role.delete('The role needed to go')
     *   .then(deleted => console.log(`Deleted role ${deleted.name}`))
     *   .catch(console.error);
     */
    delete(reason) {
      return this.client.rest.methods.deleteGuildRole(this, reason);
    }
  
    /**
     * Whether this role equals another role. It compares all properties, so for most operations
     * it is advisable to just compare `role.id === role2.id` as it is much faster and is often
     * what most users need.
     * @param {Role} role Role to compare with
     * @returns {boolean}
     */
    equals(role) {
      return role &&
        this.id === role.id &&
        this.name === role.name &&
        this.color === role.color &&
        this.hoist === role.hoist &&
        this.position === role.position &&
        this.permissions === role.permissions &&
        this.managed === role.managed;
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the role mention rather than the Role object.
     * @returns {string}
     */
    toString() {
      if (this.id === this.guild.id) return '@everyone';
      return `<@&${this.id}>`;
    }
  
    /**
     * Compares the positions of two roles.
     * @param {Role} role1 First role to compare
     * @param {Role} role2 Second role to compare
     * @returns {number} Negative number if the first role's position is lower (second role's is higher),
     * positive number if the first's is higher (second's is lower), 0 if equal
     */
    static comparePositions(role1, role2) {
      if (role1.position === role2.position) return role2.id - role1.id;
      return role1.position - role2.position;
    }
  }
  
  Role.prototype.hasPermissions = util
    .deprecate(Role.prototype.hasPermissions,
      'Role#hasPermissions is deprecated - use Role#hasPermission instead, it now takes an array');
  
  module.exports = Role;
  
  
  /***/ }),
  /* 9 */
  /***/ (function(module, exports) {
  
  // shim for using process in browser
  var process = module.exports = {};
  
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  
  var cachedSetTimeout;
  var cachedClearTimeout;
  
  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  (function () {
      try {
          if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
          } else {
              cachedSetTimeout = defaultSetTimout;
          }
      } catch (e) {
          cachedSetTimeout = defaultSetTimout;
      }
      try {
          if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
          } else {
              cachedClearTimeout = defaultClearTimeout;
          }
      } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
      }
  } ())
  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }
  
  
  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }
  
  
  
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }
  
  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  
  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  };
  
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  
  process.listeners = function (name) { return [] }
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };
  
  
  /***/ }),
  /* 10 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const TextBasedChannel = __webpack_require__(15);
  const Constants = __webpack_require__(0);
  const Presence = __webpack_require__(11).Presence;
  const Snowflake = __webpack_require__(7);
  const util = __webpack_require__(6);
  
  /**
   * Represents a user on Discord.
   * @implements {TextBasedChannel}
   */
  class User {
    constructor(client, data) {
      /**
       * The client that created the instance of the user
       * @name User#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      if (data) this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of the user
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The username of the user
       * @type {string}
       */
      this.username = data.username;
  
      /**
       * A discriminator based on username for the user
       * @type {string}
       */
      this.discriminator = data.discriminator;
  
      /**
       * The ID of the user's avatar
       * @type {string}
       */
      this.avatar = data.avatar;
  
      /**
       * Whether or not the user is a bot
       * @type {boolean}
       */
      this.bot = Boolean(data.bot);
  
      /**
       * The ID of the last message sent by the user, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = null;
  
      /**
       * The Message object of the last message sent by the user, if one was sent
       * @type {?Message}
       */
      this.lastMessage = null;
    }
  
    patch(data) {
      for (const prop of ['id', 'username', 'discriminator', 'avatar', 'bot']) {
        if (typeof data[prop] !== 'undefined') this[prop] = data[prop];
      }
      if (data.token) this.client.token = data.token;
    }
  
    /**
     * The timestamp the user was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the user was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The presence of this user
     * @type {Presence}
     * @readonly
     */
    get presence() {
      if (this.client.presences.has(this.id)) return this.client.presences.get(this.id);
      for (const guild of this.client.guilds.values()) {
        if (guild.presences.has(this.id)) return guild.presences.get(this.id);
      }
      return new Presence(undefined, this.client);
    }
  
    /**
     * A link to the user's avatar
     * @type {?string}
     * @readonly
     */
    get avatarURL() {
      if (!this.avatar) return null;
      return Constants.Endpoints.User(this).Avatar(this.client.options.http.cdn, this.avatar);
    }
  
    /**
     * A link to the user's default avatar
     * @type {string}
     * @readonly
     */
    get defaultAvatarURL() {
      const avatars = Object.keys(Constants.DefaultAvatars);
      const avatar = avatars[this.discriminator % avatars.length];
      return Constants.Endpoints.CDN(this.client.options.http.host).Asset(`${Constants.DefaultAvatars[avatar]}.png`);
    }
  
    /**
     * A link to the user's avatar if they have one. Otherwise a link to their default avatar will be returned
     * @type {string}
     * @readonly
     */
    get displayAvatarURL() {
      return this.avatarURL || this.defaultAvatarURL;
    }
  
    /**
     * The Discord "tag" for this user
     * @type {string}
     * @readonly
     */
    get tag() {
      return `${this.username}#${this.discriminator}`;
    }
  
    /**
     * The note that is set for the user
     * <warn>This is only available when using a user account.</warn>
     * @type {?string}
     * @readonly
     */
    get note() {
      return this.client.user.notes.get(this.id) || null;
    }
  
    /**
     * Check whether the user is typing in a channel.
     * @param {ChannelResolvable} channel The channel to check in
     * @returns {boolean}
     */
    typingIn(channel) {
      channel = this.client.resolver.resolveChannel(channel);
      return channel._typing.has(this.id);
    }
  
    /**
     * Get the time that the user started typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {?Date}
     */
    typingSinceIn(channel) {
      channel = this.client.resolver.resolveChannel(channel);
      return channel._typing.has(this.id) ? new Date(channel._typing.get(this.id).since) : null;
    }
  
    /**
     * Get the amount of time the user has been typing in a channel for (in milliseconds), or -1 if they're not typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {number}
     */
    typingDurationIn(channel) {
      channel = this.client.resolver.resolveChannel(channel);
      return channel._typing.has(this.id) ? channel._typing.get(this.id).elapsedTime : -1;
    }
  
    /**
     * The DM between the client's user and this user
     * @type {?DMChannel}
     * @readonly
     */
    get dmChannel() {
      return this.client.channels.filter(c => c.type === 'dm').find(c => c.recipient.id === this.id);
    }
  
    /**
     * Creates a DM channel between the client and the user.
     * @returns {Promise<DMChannel>}
     */
    createDM() {
      return this.client.rest.methods.createDM(this);
    }
  
    /**
     * Deletes a DM channel (if one exists) between the client and the user. Resolves with the channel if successful.
     * @returns {Promise<DMChannel>}
     */
    deleteDM() {
      return this.client.rest.methods.deleteChannel(this);
    }
  
    /**
     * Sends a friend request to the user.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<User>}
     */
    addFriend() {
      return this.client.rest.methods.addFriend(this);
    }
  
    /**
     * Removes the user from your friends.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<User>}
     */
    removeFriend() {
      return this.client.rest.methods.removeFriend(this);
    }
  
    /**
     * Blocks the user.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<User>}
     */
    block() {
      return this.client.rest.methods.blockUser(this);
    }
  
    /**
     * Unblocks the user.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<User>}
     */
    unblock() {
      return this.client.rest.methods.unblockUser(this);
    }
  
    /**
     * Get the profile of the user.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<UserProfile>}
     */
    fetchProfile() {
      return this.client.rest.methods.fetchUserProfile(this);
    }
  
    /**
     * Sets a note for the user.
     * <warn>This is only available when using a user account.</warn>
     * @param {string} note The note to set for the user
     * @returns {Promise<User>}
     */
    setNote(note) {
      return this.client.rest.methods.setNote(this, note);
    }
  
    /**
     * Checks if the user is equal to another. It compares ID, username, discriminator, avatar, and bot flags.
     * It is recommended to compare equality by using `user.id === user2.id` unless you want to compare all properties.
     * @param {User} user User to compare with
     * @returns {boolean}
     */
    equals(user) {
      let equal = user &&
        this.id === user.id &&
        this.username === user.username &&
        this.discriminator === user.discriminator &&
        this.avatar === user.avatar &&
        this.bot === Boolean(user.bot);
  
      return equal;
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the user's mention instead of the User object.
     * @returns {string}
     * @example
     * // logs: Hello from <@123456789>!
     * console.log(`Hello from ${user}!`);
     */
    toString() {
      return `<@${this.id}>`;
    }
  
    // These are here only for documentation purposes - they are implemented by TextBasedChannel
    /* eslint-disable no-empty-function */
    send() {}
    sendMessage() {}
    sendEmbed() {}
    sendFile() {}
    sendCode() {}
  }
  
  TextBasedChannel.applyToClass(User);
  
  User.prototype.block =
    util.deprecate(User.prototype.block, 'User#block: userbot methods will be removed');
  
  User.prototype.unblock =
    util.deprecate(User.prototype.unblock, 'User#unblock: userbot methods will be removed');
  
  User.prototype.addFriend =
    util.deprecate(User.prototype.addFriend, 'User#addFriend: userbot methods will be removed');
  
  User.prototype.removeFriend =
    util.deprecate(User.prototype.removeFriend, 'User#removeFriend: userbot methods will be removed');
  
  User.prototype.setNote =
    util.deprecate(User.prototype.setNote, 'User#setNote, userbot methods will be removed');
  
  User.prototype.fetchProfile =
    util.deprecate(User.prototype.fetchProfile, 'User#fetchProfile: userbot methods will be removed');
  
  module.exports = User;
  
  
  /***/ }),
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const { ActivityFlags, Endpoints } = __webpack_require__(0);
  
  /**
   * Represents a user's presence.
   */
  class Presence {
    constructor(data = {}, client) {
      Object.defineProperty(this, 'client', { value: client });
  
      /**
       * The status of the presence:
       *
       * * **`online`** - user is online
       * * **`offline`** - user is offline or invisible
       * * **`idle`** - user is AFK
       * * **`dnd`** - user is in Do not Disturb
       * @type {string}
       */
      this.status = data.status || 'offline';
  
      /**
       * The game that the user is playing
       * @type {?Game}
       */
      this.game = data.game ? new Game(data.game, this) : null;
    }
  
    update(data) {
      this.status = data.status || this.status;
      this.game = data.game ? new Game(data.game, this) : null;
    }
  
    /**
     * Whether this presence is equal to another
     * @param {Presence} presence The presence to compare with
     * @returns {boolean}
     */
    equals(presence) {
      return this === presence || (
        presence &&
        this.status === presence.status &&
        this.game ? this.game.equals(presence.game) : !presence.game
      );
    }
  }
  
  /**
   * Represents a game that is part of a user's presence.
   */
  class Game {
    constructor(data, presence) {
      Object.defineProperty(this, 'presence', { value: presence });
  
      /**
       * The name of the game being played
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The type of the game status
       * @type {number}
       */
      this.type = data.type;
  
      /**
       * If the game is being streamed, a link to the stream
       * @type {?string}
       */
      this.url = data.url || null;
  
      /**
       * Details about the activity
       * @type {?string}
       */
      this.details = data.details || null;
  
      /**
       * State of the activity
       * @type {?string}
       */
      this.state = data.state || null;
  
      /**
       * Application ID associated with this activity
       * @type {?Snowflake}
       */
      this.applicationID = data.application_id || null;
  
      /**
       * Timestamps for the activity
       * @type {?Object}
       * @prop {?Date} start When the activity started
       * @prop {?Date} end When the activity will end
       */
      this.timestamps = data.timestamps ? {
        start: data.timestamps.start ? new Date(Number(data.timestamps.start)) : null,
        end: data.timestamps.end ? new Date(Number(data.timestamps.end)) : null,
      } : null;
  
      /**
       * Party of the activity
       * @type {?Object}
       * @prop {?string} id ID of the party
       * @prop {number[]} size Size of the party as `[current, max]`
       */
      this.party = data.party || null;
  
      /**
       * Assets for rich presence
       * @type {?RichPresenceAssets}
       */
      this.assets = data.assets ? new RichPresenceAssets(this, data.assets) : null;
  
      this.syncID = data.sync_id;
      this._flags = data.flags;
    }
  
    get flags() {
      const flags = [];
      for (const [name, flag] of Object.entries(ActivityFlags)) {
        if ((this._flags & flag) === flag) flags.push(name);
      }
      return flags;
    }
  
    /**
     * Whether or not the game is being streamed
     * @type {boolean}
     * @readonly
     */
    get streaming() {
      return this.type === 1;
    }
  
    /**
     * When concatenated with a string, this automatically returns the game's name instead of the Game object.
     * @returns {string}
     */
    toString() {
      return this.name;
    }
  
    /**
     * Whether this game is equal to another game
     * @param {Game} game The game to compare with
     * @returns {boolean}
     */
    equals(game) {
      return this === game || (
        game &&
        this.name === game.name &&
        this.type === game.type &&
        this.url === game.url
      );
    }
  }
  
  /**
   * Assets for a rich presence
   */
  class RichPresenceAssets {
    constructor(game, assets) {
      Object.defineProperty(this, 'game', { value: game });
  
      /**
       * Hover text for the large image
       * @type {?string}
       */
      this.largeText = assets.large_text || null;
  
      /**
       * Hover text for the small image
       * @type {?string}
       */
      this.smallText = assets.small_text || null;
  
      /**
       * ID of the large image asset
       * @type {?Snowflake}
       */
      this.largeImage = assets.large_image || null;
  
      /**
       * ID of the small image asset
       * @type {?Snowflake}
       */
      this.smallImage = assets.small_image || null;
    }
  
    /**
     * The URL of the small image asset
     * @type {?string}
     * @readonly
     */
    get smallImageURL() {
      if (!this.smallImage) return null;
      return Endpoints.CDN(this.game.presence.client.options.http.cdn)
        .AppAsset(this.game.applicationID, this.smallImage);
    }
  
    /**
     * The URL of the large image asset
     * @type {?string}
     * @readonly
     */
    get largeImageURL() {
      if (!this.largeImage) return null;
      if (/^spotify:/.test(this.largeImage)) {
        return `https://i.scdn.co/image/${this.largeImage.slice(8)}`;
      }
      return Endpoints.CDN(this.game.presence.client.options.http.cdn)
        .AppAsset(this.game.applicationID, this.largeImage);
    }
  }
  
  exports.Presence = Presence;
  exports.Game = Game;
  exports.RichPresenceAssets = RichPresenceAssets;
  
  
  /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Snowflake = __webpack_require__(7);
  
  /**
   * Represents any channel on Discord.
   */
  class Channel {
    constructor(client, data) {
      /**
       * The client that instantiated the Channel
       * @name Channel#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      /**
       * The type of the channel, either:
       * * `dm` - a DM channel
       * * `group` - a Group DM channel
       * * `text` - a guild text channel
       * * `voice` - a guild voice channel
       * * `category` - a guild category channel
       * @type {string}
       */
      this.type = null;
  
      /**
       * Whether the channel has been deleted
       * @type {boolean}
       */
      this.deleted = false;
  
      if (data) this.setup(data);
    }
  
    setup(data) {
      /**
       * The unique ID of the channel
       * @type {Snowflake}
       */
      this.id = data.id;
    }
  
    /**
     * The timestamp the channel was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the channel was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * Deletes the channel.
     * @returns {Promise<Channel>}
     * @example
     * // Delete the channel
     * channel.delete()
     *   .then(console.log)
     *   .catch(console.error);
     */
    delete() {
      return this.client.rest.methods.deleteChannel(this);
    }
  }
  
  module.exports = Channel;
  
  
  /***/ }),
  /* 13 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(global) {/*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  /* eslint-disable no-proto */
  
  
  
  var base64 = __webpack_require__(60)
  var ieee754 = __webpack_require__(61)
  var isArray = __webpack_require__(62)
  
  exports.Buffer = Buffer
  exports.SlowBuffer = SlowBuffer
  exports.INSPECT_MAX_BYTES = 50
  
  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.
  
   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
    ? global.TYPED_ARRAY_SUPPORT
    : typedArraySupport()
  
  /*
   * Export kMaxLength after typed array support is determined.
   */
  exports.kMaxLength = kMaxLength()
  
  function typedArraySupport () {
    try {
      var arr = new Uint8Array(1)
      arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
      return arr.foo() === 42 && // typed array instances can be augmented
          typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
          arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
    } catch (e) {
      return false
    }
  }
  
  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }
  
  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length)
      that.__proto__ = Buffer.prototype
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length)
      }
      that.length = length
    }
  
    return that
  }
  
  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */
  
  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }
  
    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }
  
  Buffer.poolSize = 8192 // not used by this implementation
  
  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype
    return arr
  }
  
  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }
  
    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }
  
    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }
  
    return fromObject(that, value)
  }
  
  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  }
  
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype
    Buffer.__proto__ = Uint8Array
    if (typeof Symbol !== 'undefined' && Symbol.species &&
        Buffer[Symbol.species] === Buffer) {
      // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
      Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true
      })
    }
  }
  
  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }
  
  function alloc (that, size, fill, encoding) {
    assertSize(size)
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }
  
  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  }
  
  function allocUnsafe (that, size) {
    assertSize(size)
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0
      }
    }
    return that
  }
  
  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  }
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  }
  
  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8'
    }
  
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }
  
    var length = byteLength(string, encoding) | 0
    that = createBuffer(that, length)
  
    var actual = that.write(string, encoding)
  
    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual)
    }
  
    return that
  }
  
  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0
    that = createBuffer(that, length)
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255
    }
    return that
  }
  
  function fromArrayBuffer (that, array, byteOffset, length) {
    array.byteLength // this throws if `array` is not a valid ArrayBuffer
  
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }
  
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }
  
    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array)
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset)
    } else {
      array = new Uint8Array(array, byteOffset, length)
    }
  
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array
      that.__proto__ = Buffer.prototype
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array)
    }
    return that
  }
  
  function fromObject (that, obj) {
    if (Buffer.isBuffer(obj)) {
      var len = checked(obj.length) | 0
      that = createBuffer(that, len)
  
      if (that.length === 0) {
        return that
      }
  
      obj.copy(that, 0, 0, len)
      return that
    }
  
    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }
  
      if (obj.type === 'Buffer' && isArray(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }
  
    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }
  
  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }
  
  function SlowBuffer (length) {
    if (+length != length) { // eslint-disable-line eqeqeq
      length = 0
    }
    return Buffer.alloc(+length)
  }
  
  Buffer.isBuffer = function isBuffer (b) {
    return !!(b != null && b._isBuffer)
  }
  
  Buffer.compare = function compare (a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }
  
    if (a === b) return 0
  
    var x = a.length
    var y = b.length
  
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i]
        y = b[i]
        break
      }
    }
  
    if (x < y) return -1
    if (y < x) return 1
    return 0
  }
  
  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  }
  
  Buffer.concat = function concat (list, length) {
    if (!isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
  
    if (list.length === 0) {
      return Buffer.alloc(0)
    }
  
    var i
    if (length === undefined) {
      length = 0
      for (i = 0; i < list.length; ++i) {
        length += list[i].length
      }
    }
  
    var buffer = Buffer.allocUnsafe(length)
    var pos = 0
    for (i = 0; i < list.length; ++i) {
      var buf = list[i]
      if (!Buffer.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos)
      pos += buf.length
    }
    return buffer
  }
  
  function byteLength (string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string
    }
  
    var len = string.length
    if (len === 0) return 0
  
    // Use a for loop to avoid recursion
    var loweredCase = false
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase()
          loweredCase = true
      }
    }
  }
  Buffer.byteLength = byteLength
  
  function slowToString (encoding, start, end) {
    var loweredCase = false
  
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
  
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }
  
    if (end === undefined || end > this.length) {
      end = this.length
    }
  
    if (end <= 0) {
      return ''
    }
  
    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0
    start >>>= 0
  
    if (end <= start) {
      return ''
    }
  
    if (!encoding) encoding = 'utf8'
  
    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)
  
        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)
  
        case 'ascii':
          return asciiSlice(this, start, end)
  
        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)
  
        case 'base64':
          return base64Slice(this, start, end)
  
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)
  
        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase()
          loweredCase = true
      }
    }
  }
  
  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true
  
  function swap (b, n, m) {
    var i = b[n]
    b[n] = b[m]
    b[m] = i
  }
  
  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1)
    }
    return this
  }
  
  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3)
      swap(this, i + 1, i + 2)
    }
    return this
  }
  
  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7)
      swap(this, i + 1, i + 6)
      swap(this, i + 2, i + 5)
      swap(this, i + 3, i + 4)
    }
    return this
  }
  
  Buffer.prototype.toString = function toString () {
    var length = this.length | 0
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  }
  
  Buffer.prototype.equals = function equals (b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  }
  
  Buffer.prototype.inspect = function inspect () {
    var str = ''
    var max = exports.INSPECT_MAX_BYTES
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
      if (this.length > max) str += ' ... '
    }
    return '<Buffer ' + str + '>'
  }
  
  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!Buffer.isBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }
  
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = target ? target.length : 0
    }
    if (thisStart === undefined) {
      thisStart = 0
    }
    if (thisEnd === undefined) {
      thisEnd = this.length
    }
  
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }
  
    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }
  
    start >>>= 0
    end >>>= 0
    thisStart >>>= 0
    thisEnd >>>= 0
  
    if (this === target) return 0
  
    var x = thisEnd - thisStart
    var y = end - start
    var len = Math.min(x, y)
  
    var thisCopy = this.slice(thisStart, thisEnd)
    var targetCopy = target.slice(start, end)
  
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i]
        y = targetCopy[i]
        break
      }
    }
  
    if (x < y) return -1
    if (y < x) return 1
    return 0
  }
  
  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1
  
    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset
      byteOffset = 0
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000
    }
    byteOffset = +byteOffset  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1)
    }
  
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0
      else return -1
    }
  
    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding)
    }
  
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }
  
    throw new TypeError('val must be string, number or Buffer')
  }
  
  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1
    var arrLength = arr.length
    var valLength = val.length
  
    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase()
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2
        arrLength /= 2
        valLength /= 2
        byteOffset /= 2
      }
    }
  
    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }
  
    var i
    if (dir) {
      var foundIndex = -1
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex
          foundIndex = -1
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
      for (i = byteOffset; i >= 0; i--) {
        var found = true
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false
            break
          }
        }
        if (found) return i
      }
    }
  
    return -1
  }
  
  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  }
  
  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  }
  
  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  }
  
  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0
    var remaining = buf.length - offset
    if (!length) {
      length = remaining
    } else {
      length = Number(length)
      if (length > remaining) {
        length = remaining
      }
    }
  
    // must be an even number of digits
    var strLen = string.length
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
  
    if (length > strLen / 2) {
      length = strLen / 2
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16)
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed
    }
    return i
  }
  
  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }
  
  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }
  
  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }
  
  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }
  
  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }
  
  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8'
      length = this.length
      offset = 0
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset
      length = this.length
      offset = 0
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0
      if (isFinite(length)) {
        length = length | 0
        if (encoding === undefined) encoding = 'utf8'
      } else {
        encoding = length
        length = undefined
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }
  
    var remaining = this.length - offset
    if (length === undefined || length > remaining) length = remaining
  
    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }
  
    if (!encoding) encoding = 'utf8'
  
    var loweredCase = false
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)
  
        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)
  
        case 'ascii':
          return asciiWrite(this, string, offset, length)
  
        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)
  
        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)
  
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)
  
        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase()
          loweredCase = true
      }
    }
  }
  
  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  }
  
  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf)
    } else {
      return base64.fromByteArray(buf.slice(start, end))
    }
  }
  
  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end)
    var res = []
  
    var i = start
    while (i < end) {
      var firstByte = buf[i]
      var codePoint = null
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1
  
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint
  
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte
            }
            break
          case 2:
            secondByte = buf[i + 1]
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint
              }
            }
            break
          case 3:
            secondByte = buf[i + 1]
            thirdByte = buf[i + 2]
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint
              }
            }
            break
          case 4:
            secondByte = buf[i + 1]
            thirdByte = buf[i + 2]
            fourthByte = buf[i + 3]
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint
              }
            }
        }
      }
  
      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD
        bytesPerSequence = 1
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000
        res.push(codePoint >>> 10 & 0x3FF | 0xD800)
        codePoint = 0xDC00 | codePoint & 0x3FF
      }
  
      res.push(codePoint)
      i += bytesPerSequence
    }
  
    return decodeCodePointsArray(res)
  }
  
  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000
  
  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }
  
    // Decode in chunks to avoid "call stack size exceeded".
    var res = ''
    var i = 0
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      )
    }
    return res
  }
  
  function asciiSlice (buf, start, end) {
    var ret = ''
    end = Math.min(buf.length, end)
  
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F)
    }
    return ret
  }
  
  function latin1Slice (buf, start, end) {
    var ret = ''
    end = Math.min(buf.length, end)
  
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i])
    }
    return ret
  }
  
  function hexSlice (buf, start, end) {
    var len = buf.length
  
    if (!start || start < 0) start = 0
    if (!end || end < 0 || end > len) end = len
  
    var out = ''
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i])
    }
    return out
  }
  
  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end)
    var res = ''
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
    }
    return res
  }
  
  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length
    start = ~~start
    end = end === undefined ? len : ~~end
  
    if (start < 0) {
      start += len
      if (start < 0) start = 0
    } else if (start > len) {
      start = len
    }
  
    if (end < 0) {
      end += len
      if (end < 0) end = 0
    } else if (end > len) {
      end = len
    }
  
    if (end < start) end = start
  
    var newBuf
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end)
      newBuf.__proto__ = Buffer.prototype
    } else {
      var sliceLen = end - start
      newBuf = new Buffer(sliceLen, undefined)
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start]
      }
    }
  
    return newBuf
  }
  
  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }
  
  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
  
    var val = this[offset]
    var mul = 1
    var i = 0
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul
    }
  
    return val
  }
  
  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length)
    }
  
    var val = this[offset + --byteLength]
    var mul = 1
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul
    }
  
    return val
  }
  
  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length)
    return this[offset]
  }
  
  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    return this[offset] | (this[offset + 1] << 8)
  }
  
  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    return (this[offset] << 8) | this[offset + 1]
  }
  
  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
  
    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  }
  
  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
  
    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  }
  
  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
  
    var val = this[offset]
    var mul = 1
    var i = 0
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul
    }
    mul *= 0x80
  
    if (val >= mul) val -= Math.pow(2, 8 * byteLength)
  
    return val
  }
  
  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
  
    var i = byteLength
    var mul = 1
    var val = this[offset + --i]
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul
    }
    mul *= 0x80
  
    if (val >= mul) val -= Math.pow(2, 8 * byteLength)
  
    return val
  }
  
  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length)
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  }
  
  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    var val = this[offset] | (this[offset + 1] << 8)
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  }
  
  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    var val = this[offset + 1] | (this[offset] << 8)
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  }
  
  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
  
    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  }
  
  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
  
    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  }
  
  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return ieee754.read(this, offset, true, 23, 4)
  }
  
  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return ieee754.read(this, offset, false, 23, 4)
  }
  
  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length)
    return ieee754.read(this, offset, true, 52, 8)
  }
  
  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length)
    return ieee754.read(this, offset, false, 52, 8)
  }
  
  function checkInt (buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }
  
  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1
      checkInt(this, value, offset, byteLength, maxBytes, 0)
    }
  
    var mul = 1
    var i = 0
    this[offset] = value & 0xFF
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF
    }
  
    return offset + byteLength
  }
  
  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1
      checkInt(this, value, offset, byteLength, maxBytes, 0)
    }
  
    var i = byteLength - 1
    var mul = 1
    this[offset + i] = value & 0xFF
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF
    }
  
    return offset + byteLength
  }
  
  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
    this[offset] = (value & 0xff)
    return offset + 1
  }
  
  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8
    }
  }
  
  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
    } else {
      objectWriteUInt16(this, value, offset, true)
    }
    return offset + 2
  }
  
  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8)
      this[offset + 1] = (value & 0xff)
    } else {
      objectWriteUInt16(this, value, offset, false)
    }
    return offset + 2
  }
  
  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
    }
  }
  
  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24)
      this[offset + 2] = (value >>> 16)
      this[offset + 1] = (value >>> 8)
      this[offset] = (value & 0xff)
    } else {
      objectWriteUInt32(this, value, offset, true)
    }
    return offset + 4
  }
  
  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24)
      this[offset + 1] = (value >>> 16)
      this[offset + 2] = (value >>> 8)
      this[offset + 3] = (value & 0xff)
    } else {
      objectWriteUInt32(this, value, offset, false)
    }
    return offset + 4
  }
  
  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1)
  
      checkInt(this, value, offset, byteLength, limit - 1, -limit)
    }
  
    var i = 0
    var mul = 1
    var sub = 0
    this[offset] = value & 0xFF
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
    }
  
    return offset + byteLength
  }
  
  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1)
  
      checkInt(this, value, offset, byteLength, limit - 1, -limit)
    }
  
    var i = byteLength - 1
    var mul = 1
    var sub = 0
    this[offset + i] = value & 0xFF
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
    }
  
    return offset + byteLength
  }
  
  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
    if (value < 0) value = 0xff + value + 1
    this[offset] = (value & 0xff)
    return offset + 1
  }
  
  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
    } else {
      objectWriteUInt16(this, value, offset, true)
    }
    return offset + 2
  }
  
  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8)
      this[offset + 1] = (value & 0xff)
    } else {
      objectWriteUInt16(this, value, offset, false)
    }
    return offset + 2
  }
  
  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff)
      this[offset + 1] = (value >>> 8)
      this[offset + 2] = (value >>> 16)
      this[offset + 3] = (value >>> 24)
    } else {
      objectWriteUInt32(this, value, offset, true)
    }
    return offset + 4
  }
  
  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
    if (value < 0) value = 0xffffffff + value + 1
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24)
      this[offset + 1] = (value >>> 16)
      this[offset + 2] = (value >>> 8)
      this[offset + 3] = (value & 0xff)
    } else {
      objectWriteUInt32(this, value, offset, false)
    }
    return offset + 4
  }
  
  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }
  
  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4)
    return offset + 4
  }
  
  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  }
  
  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  }
  
  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8)
    return offset + 8
  }
  
  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  }
  
  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  }
  
  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0
    if (!end && end !== 0) end = this.length
    if (targetStart >= target.length) targetStart = target.length
    if (!targetStart) targetStart = 0
    if (end > 0 && end < start) end = start
  
    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0
  
    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')
  
    // Are we oob?
    if (end > this.length) end = this.length
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start
    }
  
    var len = end - start
    var i
  
    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start]
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start]
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      )
    }
  
    return len
  }
  
  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start
        start = 0
        end = this.length
      } else if (typeof end === 'string') {
        encoding = end
        end = this.length
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0)
        if (code < 256) {
          val = code
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255
    }
  
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }
  
    if (end <= start) {
      return this
    }
  
    start = start >>> 0
    end = end === undefined ? this.length : end >>> 0
  
    if (!val) val = 0
  
    var i
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val
      }
    } else {
      var bytes = Buffer.isBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString())
      var len = bytes.length
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len]
      }
    }
  
    return this
  }
  
  // HELPER FUNCTIONS
  // ================
  
  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
  
  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '')
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '='
    }
    return str
  }
  
  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }
  
  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }
  
  function utf8ToBytes (string, units) {
    units = units || Infinity
    var codePoint
    var length = string.length
    var leadSurrogate = null
    var bytes = []
  
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i)
  
      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
            continue
          }
  
          // valid lead
          leadSurrogate = codePoint
  
          continue
        }
  
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        }
  
        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      }
  
      leadSurrogate = null
  
      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint)
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        )
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        )
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        )
      } else {
        throw new Error('Invalid code point')
      }
    }
  
    return bytes
  }
  
  function asciiToBytes (str) {
    var byteArray = []
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF)
    }
    return byteArray
  }
  
  function utf16leToBytes (str, units) {
    var c, hi, lo
    var byteArray = []
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break
  
      c = str.charCodeAt(i)
      hi = c >> 8
      lo = c % 256
      byteArray.push(lo)
      byteArray.push(hi)
    }
  
    return byteArray
  }
  
  function base64ToBytes (str) {
    return base64.toByteArray(base64clean(str))
  }
  
  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i]
    }
    return i
  }
  
  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))
  
  /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Attachment = __webpack_require__(21);
  const MessageEmbed = __webpack_require__(27);
  let ClientDataResolver;
  
  /**
   * A rich embed to be sent with a message with a fluent interface for creation.
   * @param {Object} [data] Data to set in the rich embed
   */
  class RichEmbed {
    constructor(data = {}) {
      /**
       * Title for this Embed
       * @type {string}
       */
      this.title = data.title;
  
      /**
       * Description for this Embed
       * @type {string}
       */
      this.description = data.description;
  
      /**
       * URL for this Embed
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * Color for this Embed
       * @type {number}
       */
      this.color = data.color;
  
      /**
       * Author for this Embed
       * @type {Object}
       */
      this.author = data.author;
  
      /**
       * Timestamp for this Embed
       * @type {Date}
       */
      this.timestamp = data.timestamp;
  
      /**
       * Fields for this Embed
       * @type {Object[]}
       */
      this.fields = data.fields || [];
  
      /**
       * Thumbnail for this Embed
       * @type {Object}
       */
      this.thumbnail = data.thumbnail;
  
      /**
       * Image for this Embed
       * @type {Object}
       */
      this.image = data.image;
  
      /**
       * Footer for this Embed
       * @type {Object}
       */
      this.footer = data.footer;
  
      /**
       * File to upload alongside this Embed
       * @type {FileOptions|string|Attachment}
       */
      this.file = data.file;
  
      /**
       * The files to upload alongside this Embed
       * @type {Array<FileOptions|string|Attachment>}
       */
      this.files = [];
    }
  
    /**
     * Sets the title of this embed.
     * @param {StringResolvable} title The title
     * @returns {RichEmbed} This embed
     */
    setTitle(title) {
      title = resolveString(title);
      if (title.length > 256) throw new RangeError('RichEmbed titles may not exceed 256 characters.');
      this.title = title;
      return this;
    }
  
    /**
     * Sets the description of this embed.
     * @param {StringResolvable} description The description
     * @returns {RichEmbed} This embed
     */
    setDescription(description) {
      description = resolveString(description);
      if (description.length > 2048) throw new RangeError('RichEmbed descriptions may not exceed 2048 characters.');
      this.description = description;
      return this;
    }
  
    /**
     * Sets the URL of this embed.
     * @param {string} url The URL
     * @returns {RichEmbed} This embed
     */
    setURL(url) {
      this.url = url;
      return this;
    }
  
    /**
     * Sets the color of this embed.
     * @param {ColorResolvable} color The color of the embed
     * @returns {RichEmbed} This embed
     */
    setColor(color) {
      if (!ClientDataResolver) ClientDataResolver = __webpack_require__(28);
      this.color = ClientDataResolver.resolveColor(color);
      return this;
    }
  
    /**
     * Sets the author of this embed.
     * @param {StringResolvable} name The name of the author
     * @param {string} [icon] The icon URL of the author
     * @param {string} [url] The URL of the author
     * @returns {RichEmbed} This embed
     */
    setAuthor(name, icon, url) {
      this.author = { name: resolveString(name), icon_url: icon, url };
      return this;
    }
  
    /**
     * Sets the timestamp of this embed.
     * @param {Date} [timestamp=new Date()] The timestamp
     * @returns {RichEmbed} This embed
     */
    setTimestamp(timestamp = new Date()) {
      this.timestamp = timestamp;
      return this;
    }
  
    /**
     * Adds a field to the embed (max 25).
     * @param {StringResolvable} name The name of the field
     * @param {StringResolvable} value The value of the field
     * @param {boolean} [inline=false] Set the field to display inline
     * @returns {RichEmbed} This embed
     */
    addField(name, value, inline = false) {
      if (this.fields.length >= 25) throw new RangeError('RichEmbeds may not exceed 25 fields.');
      name = resolveString(name);
      if (name.length > 256) throw new RangeError('RichEmbed field names may not exceed 256 characters.');
      if (!/\S/.test(name)) throw new RangeError('RichEmbed field names may not be empty.');
      value = resolveString(value);
      if (value.length > 1024) throw new RangeError('RichEmbed field values may not exceed 1024 characters.');
      if (!/\S/.test(value)) throw new RangeError('RichEmbed field values may not be empty.');
      this.fields.push({ name, value, inline });
      return this;
    }
  
    /**
     * Convenience function for `<RichEmbed>.addField('\u200B', '\u200B', inline)`.
     * @param {boolean} [inline=false] Set the field to display inline
     * @returns {RichEmbed} This embed
     */
    addBlankField(inline = false) {
      return this.addField('\u200B', '\u200B', inline);
    }
  
    /**
     * Set the thumbnail of this embed.
     * @param {string} url The URL of the thumbnail
     * @returns {RichEmbed} This embed
     */
    setThumbnail(url) {
      this.thumbnail = { url };
      return this;
    }
  
    /**
     * Set the image of this embed.
     * @param {string} url The URL of the image
     * @returns {RichEmbed} This embed
     */
    setImage(url) {
      this.image = { url };
      return this;
    }
  
    /**
     * Sets the footer of this embed.
     * @param {StringResolvable} text The text of the footer
     * @param {string} [icon] The icon URL of the footer
     * @returns {RichEmbed} This embed
     */
    setFooter(text, icon) {
      text = resolveString(text);
      if (text.length > 2048) throw new RangeError('RichEmbed footer text may not exceed 2048 characters.');
      this.footer = { text, icon_url: icon };
      return this;
    }
  
    /**
     * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
     * setting an embed image or author/footer icons. Only one file may be attached.
     * @param {FileOptions|string|Attachment} file Local path or URL to the file to attach,
     * or valid FileOptions for a file to attach
     * @returns {RichEmbed} This embed
     */
    attachFile(file) {
      if (this.file) throw new RangeError('You may not upload more than one file at once.');
      if (file instanceof Attachment) file = file.file;
      this.file = file;
      return this;
    }
  
    /**
     * Sets the files to upload alongside the embed. A file can be accessed via `attachment://fileName.extension` when
     * setting an embed image or author/footer icons. Multiple files can be attached.
     * @param {Array<FileOptions|string|Attachment>} files Files to attach
     * @returns {RichEmbed}
     */
    attachFiles(files) {
      files = files.map(file => file instanceof Attachment ? file.file : file);
      this.files = this.files.concat(files);
      return this;
    }
  
    /**
     * Transforms the embed object to be processed.
     * @returns {Object} The raw data of this embed
     * @private
     */
    _apiTransform() {
      return {
        title: this.title,
        type: 'rich',
        description: this.description,
        url: this.url,
        timestamp: this.timestamp ? new Date(this.timestamp) : null,
        color: this.color,
        fields: this.fields ?
          this.fields.map(field => ({ name: field.name, value: field.value, inline: field.inline })) :
          null,
        thumbnail: this.thumbnail ? {
          url: this.thumbnail.url,
        } : null,
        image: this.image ? {
          url: this.image.url,
        } : null,
        author: this.author ? {
          name: this.author.name,
          url: this.author.url,
          icon_url: this.author instanceof MessageEmbed.Author ? this.author.iconURL : this.author.icon_url,
        } : null,
        footer: this.footer ? {
          text: this.footer.text,
          icon_url: this.footer instanceof MessageEmbed.Footer ? this.footer.iconURL : this.footer.icon_url,
        } : null,
      };
    }
  }
  
  module.exports = RichEmbed;
  
  function resolveString(data) {
    if (typeof data === 'string') return data;
    if (data instanceof Array) return data.join('\n');
    return String(data);
  }
  
  
  /***/ }),
  /* 15 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(Buffer) {const path = __webpack_require__(29);
  const Message = __webpack_require__(16);
  const MessageCollector = __webpack_require__(44);
  const Collection = __webpack_require__(3);
  const Attachment = __webpack_require__(21);
  const RichEmbed = __webpack_require__(14);
  const Snowflake = __webpack_require__(7);
  const util = __webpack_require__(6);
  
  /**
   * Interface for classes that have text-channel-like features.
   * @interface
   */
  class TextBasedChannel {
    constructor() {
      /**
       * A collection containing the messages sent to this channel
       * @type {Collection<Snowflake, Message>}
       */
      this.messages = new Collection();
  
      /**
       * The ID of the last message in the channel, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = null;
  
      /**
       * The Message object of the last message in the channel, if one was sent
       * @type {?Message}
       */
      this.lastMessage = null;
    }
  
    /**
     * Options provided when sending or editing a message.
     * @typedef {Object} MessageOptions
     * @property {boolean} [tts=false] Whether or not the message should be spoken aloud
     * @property {string} [nonce=''] The nonce for the message
     * @property {RichEmbed|Object} [embed] An embed for the message
     * (see [here](https://discordapp.com/developers/docs/resources/channel#embed-object) for more details)
     * @property {boolean} [disableEveryone=this.client.options.disableEveryone] Whether or not @everyone and @here
     * should be replaced with plain-text
     * @property {FileOptions|BufferResolvable|Attachment} [file] A file to send with the message **(deprecated)**
     * @property {FileOptions[]|BufferResolvable[]|Attachment[]} [files] Files to send with the message
     * @property {string|boolean} [code] Language for optional codeblock formatting to apply
     * @property {boolean|SplitOptions} [split=false] Whether or not the message should be split into multiple messages if
     * it exceeds the character limit. If an object is provided, these are the options for splitting the message
     * @property {UserResolvable} [reply] User to reply to (prefixes the message with a mention, except in DMs)
     */
  
    /**
     * @typedef {Object} FileOptions
     * @property {BufferResolvable} attachment File to attach
     * @property {string} [name='file.jpg'] Filename of the attachment
     */
  
    /**
     * Options for splitting a message.
     * @typedef {Object} SplitOptions
     * @property {number} [maxLength=1950] Maximum character length per message piece
     * @property {string} [char='\n'] Character to split the message with
     * @property {string} [prepend=''] Text to prepend to every piece except the first
     * @property {string} [append=''] Text to append to every piece except the last
     */
  
    /**
     * Send a message to this channel.
     * @param {StringResolvable} [content] Text for the message
     * @param {MessageOptions|Attachment|RichEmbed} [options] Options for the message,
     * can also be just a RichEmbed or Attachment
     * @returns {Promise<Message|Message[]>}
     * @example
     * // Send a basic message
     * channel.send('hello!')
     *   .then(message => console.log(`Sent message: ${message.content}`))
     *   .catch(console.error);
     * @example
     * // Send a remote file
     * channel.send({
     *   files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
     * })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Send a local file
     * channel.send({
     *   files: [{
     *     attachment: 'entire/path/to/file.jpg',
     *     name: 'file.jpg'
     *   }]
     * })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Send an embed with a local image inside
     * channel.send('This is an embed', {
     *   embed: {
     *     thumbnail: {
     *          url: 'attachment://file.jpg'
     *       }
     *    },
     *    files: [{
     *       attachment: 'entire/path/to/file.jpg',
     *       name: 'file.jpg'
     *    }]
     * })
     *   .then(console.log)
     *   .catch(console.error);
     */
    // eslint-disable-next-line complexity
    send(content, options) {
      if (!options && typeof content === 'object' && !(content instanceof Array)) {
        options = content;
        content = '';
      } else if (!options) {
        options = {};
      }
  
      const { reply } = options;
      if (options instanceof Attachment) options = { files: [options.file] };
      if (options instanceof RichEmbed) {
        if (options.reply) options.reply = undefined;
        options = { embed: options };
      }
      options.reply = reply;
  
      if (options.embed) {
        if (options.embed.file) {
          if (options.files) options.files.push(options.embed.file);
          else options.files = [options.embed.file];
        }
        if (options.embed.files) {
          if (options.files) options.files = options.files.concat(options.embed.files);
          else options.files = options.embed.files;
        }
      }
  
      if (options.file) {
        if (options.files) options.files.push(options.file);
        else options.files = [options.file];
      }
  
      if (options.embed) options.embed = new RichEmbed(options.embed)._apiTransform();
  
      if (options.files) {
        for (let i = 0; i < options.files.length; i++) {
          let file = options.files[i];
          if (!file || typeof file === 'string' || Buffer.isBuffer(file)) file = { attachment: file };
          if (!file.name) {
            if (typeof file.attachment === 'string') {
              file.name = path.basename(file.attachment);
            } else if (file.attachment && file.attachment.path) {
              file.name = path.basename(file.attachment.path);
            } else if (file instanceof Attachment) {
              file = { attachment: file.file, name: path.basename(file.file) || 'file.jpg' };
            } else {
              file.name = 'file.jpg';
            }
          } else if (file instanceof Attachment) {
            file = file.file;
          }
          options.files[i] = file;
        }
  
        return Promise.all(options.files.map(file =>
          this.client.resolver.resolveFile(file.attachment).then(resource => {
            file.file = resource;
            return file;
          })
        )).then(files => this.client.rest.methods.sendMessage(this, content, options, files));
      }
  
      return this.client.rest.methods.sendMessage(this, content, options);
    }
  
    /**
     * Gets a single message from this channel, regardless of it being cached or not. Since the single message fetching
     * endpoint is reserved for bot accounts, this abstracts the `fetchMessages` method to obtain the single message when
     * using a user account.
     * @param {Snowflake} messageID ID of the message to get
     * @returns {Promise<Message>}
     * @example
     * // Get message
     * channel.fetchMessage('99539446449315840')
     *   .then(message => console.log(message.content))
     *   .catch(console.error);
     */
    fetchMessage(messageID) {
      if (!this.client.user.bot) {
        return this.fetchMessages({ limit: 1, around: messageID }).then(messages => {
          const msg = messages.get(messageID);
          if (!msg) throw new Error('Message not found.');
          return msg;
        });
      }
      return this.client.rest.methods.getChannelMessage(this, messageID).then(data => {
        const msg = data instanceof Message ? data : new Message(this, data, this.client);
        this._cacheMessage(msg);
        return msg;
      });
    }
  
    /**
     * The parameters to pass in when requesting previous messages from a channel. `around`, `before` and
     * `after` are mutually exclusive. All the parameters are optional.
     * @typedef {Object} ChannelLogsQueryOptions
     * @property {number} [limit=50] Number of messages to acquire
     * @property {Snowflake} [before] ID of a message to get the messages that were posted before it
     * @property {Snowflake} [after] ID of a message to get the messages that were posted after it
     * @property {Snowflake} [around] ID of a message to get the messages that were posted around it
     */
  
    /**
     * Gets the past messages sent in this channel. Resolves with a collection mapping message ID's to Message objects.
     * <info>The returned Collection does not contain reaction users of the messages if they were not cached.
     * Those need to be fetched separately in such a case.</info>
     * @param {ChannelLogsQueryOptions} [options={}] Query parameters to pass in
     * @returns {Promise<Collection<Snowflake, Message>>}
     * @example
     * // Get messages
     * channel.fetchMessages({ limit: 10 })
     *   .then(messages => console.log(`Received ${messages.size} messages`))
     *   .catch(console.error);
     * @example
     * // Get messages and filter by user ID
     * channel.fetchMessages()
     *   .then(messages => console.log(`${messages.filter(m => m.author.id === '84484653687267328').size} messages`))
     *   .catch(console.error);
     */
    fetchMessages(options = {}) {
      return this.client.rest.methods.getChannelMessages(this, options).then(data => {
        const messages = new Collection();
        for (const message of data) {
          const msg = new Message(this, message, this.client);
          messages.set(message.id, msg);
          this._cacheMessage(msg);
        }
        return messages;
      });
    }
  
    /**
     * Fetches the pinned messages of this channel and returns a collection of them.
     * <info>The returned Collection does not contain any reaction data of the messages.
     * Those need to be fetched separately.</info>
     * @returns {Promise<Collection<Snowflake, Message>>}
     * @example
     * // Get pinned messages
     * channel.fetchPinnedMessages()
     *   .then(messages => console.log(`Received ${messages.size} messages`))
     *   .catch(console.error);
     */
    fetchPinnedMessages() {
      return this.client.rest.methods.getChannelPinnedMessages(this).then(data => {
        const messages = new Collection();
        for (const message of data) {
          const msg = new Message(this, message, this.client);
          messages.set(message.id, msg);
          this._cacheMessage(msg);
        }
        return messages;
      });
    }
  
    /**
     * @typedef {Object} MessageSearchOptions
     * @property {string} [content] Message content
     * @property {Snowflake} [maxID] Maximum ID for the filter
     * @property {Snowflake} [minID] Minimum ID for the filter
     * @property {string} [has] One of `link`, `embed`, `file`, `video`, `image`, or `sound`,
     * or add `-` to negate (e.g. `-file`)
     * @property {ChannelResolvable} [channel] Channel to limit search to (only for guild search endpoint)
     * @property {UserResolvable} [author] Author to limit search
     * @property {string} [authorType] One of `user`, `bot`, `webhook`, or add `-` to negate (e.g. `-webhook`)
     * @property {string} [sortBy='recent'] `recent` or `relevant`
     * @property {string} [sortOrder='desc'] `asc` or `desc`
     * @property {number} [contextSize=2] How many messages to get around the matched message (0 to 2)
     * @property {number} [limit=25] Maximum number of results to get (1 to 25)
     * @property {number} [offset=0] Offset the "pages" of results (since you can only see 25 at a time)
     * @property {UserResolvable} [mentions] Mentioned user filter
     * @property {boolean} [mentionsEveryone] If everyone is mentioned
     * @property {string} [linkHostname] Filter links by hostname
     * @property {string} [embedProvider] The name of an embed provider
     * @property {string} [embedType] one of `image`, `video`, `url`, `rich`
     * @property {string} [attachmentFilename] The name of an attachment
     * @property {string} [attachmentExtension] The extension of an attachment
     * @property {Date} [before] Date to find messages before
     * @property {Date} [after] Date to find messages before
     * @property {Date} [during] Date to find messages during (range of date to date + 24 hours)
     * @property {boolean} [nsfw=false] Include results from NSFW channels
     */
  
    /**
     * @typedef {Object} MessageSearchResult
     * @property {number} totalResults Total result count
     * @property {Message[][]} messages Array of message results
     * The message which has triggered the result will have the `hit` property set to `true`
     */
  
    /**
     * Performs a search within the channel.
     * <warn>This is only available when using a user account.</warn>
     * @param {MessageSearchOptions} [options={}] Options to pass to the search
     * @returns {Promise<MessageSearchResult>}
     * @example
     * channel.search({
     *   content: 'discord.js',
     *   before: '2016-11-17'
     * }).then(res => {
     *   const hit = res.messages[0].find(m => m.hit).content;
     *   console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
     * }).catch(console.error);
     */
    search(options = {}) {
      return this.client.rest.methods.search(this, options);
    }
  
    /**
     * Starts a typing indicator in the channel.
     * @param {number} [count] The number of times startTyping should be considered to have been called
     * @example
     * // Start typing in a channel
     * channel.startTyping();
     */
    startTyping(count) {
      if (typeof count !== 'undefined' && count < 1) throw new RangeError('Count must be at least 1.');
      if (this.client.user._typing.has(this.id)) {
        const entry = this.client.user._typing.get(this.id);
        entry.count = count || entry.count + 1;
        return;
      }
  
      const entry = {
        count: count || 1,
        interval: this.client.setInterval(() => {
          this.client.rest.methods.sendTyping(this.id).catch(() => {
            this.client.clearInterval(entry.interval);
            this.client.user._typing.delete(this.id);
          });
        }, 9000),
      };
      this.client.rest.methods.sendTyping(this.id).catch(() => {
        this.client.clearInterval(entry.interval);
        this.client.user._typing.delete(this.id);
      });
      this.client.user._typing.set(this.id, entry);
    }
  
    /**
     * Stops the typing indicator in the channel.
     * The indicator will only stop if this is called as many times as startTyping().
     * <info>It can take a few seconds for the client user to stop typing.</info>
     * @param {boolean} [force=false] Whether or not to reset the call count and force the indicator to stop
     * @example
     * // Reduce the typing count by one and stop typing if it reached 0
     * channel.stopTyping();
     * @example
     * // Force typing to fully stop in a channel
     * channel.stopTyping(true);
     */
    stopTyping(force = false) {
      if (this.client.user._typing.has(this.id)) {
        const entry = this.client.user._typing.get(this.id);
        entry.count--;
        if (entry.count <= 0 || force) {
          this.client.clearInterval(entry.interval);
          this.client.user._typing.delete(this.id);
        }
      }
    }
  
    /**
     * Whether or not the typing indicator is being shown in the channel
     * @type {boolean}
     * @readonly
     */
    get typing() {
      return this.client.user._typing.has(this.id);
    }
  
    /**
     * Number of times `startTyping` has been called
     * @type {number}
     * @readonly
     */
    get typingCount() {
      if (this.client.user._typing.has(this.id)) return this.client.user._typing.get(this.id).count;
      return 0;
    }
  
    /**
     * Creates a Message Collector
     * @param {CollectorFilter} filter The filter to create the collector with
     * @param {MessageCollectorOptions} [options={}] The options to pass to the collector
     * @returns {MessageCollector}
     * @deprecated
     */
    createCollector(filter, options) {
      return this.createMessageCollector(filter, options);
    }
  
    /**
     * Creates a Message Collector.
     * @param {CollectorFilter} filter The filter to create the collector with
     * @param {MessageCollectorOptions} [options={}] The options to pass to the collector
     * @returns {MessageCollector}
     * @example
     * // Create a message collector
     * const filter = m => m.content.includes('discord');
     * const collector = channel.createMessageCollector(filter, { time: 15000 });
     * collector.on('collect', m => console.log(`Collected ${m.content}`));
     * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    createMessageCollector(filter, options = {}) {
      return new MessageCollector(this, filter, options);
    }
  
    /**
     * An object containing the same properties as CollectorOptions, but a few more:
     * @typedef {MessageCollectorOptions} AwaitMessagesOptions
     * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
     */
  
    /**
     * Similar to createCollector but in promise form. Resolves with a collection of messages that pass the specified
     * filter.
     * @param {CollectorFilter} filter The filter function to use
     * @param {AwaitMessagesOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<Snowflake, Message>>}
     * @example
     * // Await !vote messages
     * const filter = m => m.content.startsWith('!vote');
     * // Errors: ['time'] treats ending because of the time limit as an error
     * channel.awaitMessages(filter, { max: 4, time: 60000, errors: ['time'] })
     *   .then(collected => console.log(collected.size))
     *   .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
     */
    awaitMessages(filter, options = {}) {
      return new Promise((resolve, reject) => {
        const collector = this.createCollector(filter, options);
        collector.once('end', (collection, reason) => {
          if (options.errors && options.errors.includes(reason)) {
            reject(collection);
          } else {
            resolve(collection);
          }
        });
      });
    }
  
    /**
     * Bulk delete given messages that are newer than two weeks.
     * <warn>This is only available when using a bot account.</warn>
     * @param {Collection<Snowflake, Message>|Message[]|Snowflake[]|number} messages
     * Messages or number of messages to delete
     * @param {boolean} [filterOld=false] Filter messages to remove those which are older than two weeks automatically
     * @returns {Promise<Collection<Snowflake, Message>>} Deleted messages
     * @example
     * // Bulk delete messages
     * channel.bulkDelete(5)
     *   .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
     *   .catch(console.error);
     */
    bulkDelete(messages, filterOld = false) {
      if (messages instanceof Array || messages instanceof Collection) {
        let messageIDs = messages instanceof Collection ? messages.keyArray() : messages.map(m => m.id || m);
        if (filterOld) {
          messageIDs = messageIDs.filter(id => Date.now() - Snowflake.deconstruct(id).date.getTime() < 1209600000);
        }
        if (messageIDs.length === 0) return Promise.resolve(new Collection());
        if (messageIDs.length === 1) {
          return this.fetchMessage(messageIDs[0]).then(m => m.delete()).then(m => new Collection([[m.id, m]]));
        }
        return this.client.rest.methods.bulkDeleteMessages(this, messageIDs);
      }
      if (!isNaN(messages)) return this.fetchMessages({ limit: messages }).then(msgs => this.bulkDelete(msgs, filterOld));
      throw new TypeError('The messages must be an Array, Collection, or number.');
    }
  
    /**
     * Marks all messages in this channel as read.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<TextChannel|GroupDMChannel|DMChannel>}
     */
    acknowledge() {
      if (!this.lastMessageID) return Promise.resolve(this);
      return this.client.rest.methods.ackTextChannel(this);
    }
  
    _cacheMessage(message) {
      const maxSize = this.client.options.messageCacheMaxSize;
      if (maxSize === 0) return null;
      if (this.messages.size >= maxSize && maxSize > 0) this.messages.delete(this.messages.firstKey());
      this.messages.set(message.id, message);
      return message;
    }
  }
  
  /** @lends TextBasedChannel.prototype */
  const Deprecated = {
    /**
     * Send a message to this channel.
     * @param {StringResolvable} [content] Text for the message
     * @param {MessageOptions} [options={}] Options for the message
     * @returns {Promise<Message|Message[]>}
     * @deprecated
     * @example
     * // Send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.error);
     */
    sendMessage(content, options) {
      return this.send(content, options);
    },
  
    /**
     * Send an embed to this channel.
     * @param {RichEmbed|Object} embed Embed for the message
     * @param {string} [content] Text for the message
     * @param {MessageOptions} [options] Options for the message
     * @returns {Promise<Message>}
     * @deprecated
     */
    sendEmbed(embed, content, options) {
      if (!options && typeof content === 'object' && !(content instanceof Array)) {
        options = content;
        content = '';
      } else if (!options) {
        options = {};
      }
      return this.send(content, Object.assign(options, { embed }));
    },
  
    /**
     * Send files to this channel.
     * @param {FileOptions[]|string[]} files Files to send with the message
     * @param {StringResolvable} [content] Text for the message
     * @param {MessageOptions} [options] Options for the message
     * @returns {Promise<Message>}
     * @deprecated
     */
    sendFiles(files, content, options = {}) {
      return this.send(content, Object.assign(options, { files }));
    },
  
    /**
     * Send a file to this channel.
     * @param {BufferResolvable} attachment File to send
     * @param {string} [name='file.jpg'] Name and extension of the file
     * @param {StringResolvable} [content] Text for the message
     * @param {MessageOptions} [options] Options for the message
     * @returns {Promise<Message>}
     * @deprecated
     */
    sendFile(attachment, name, content, options = {}) {
      return this.send({ files: [{ attachment, name }], content, options });
    },
  
    /**
     * Send a code block to this channel.
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} [options] Options for the message
     * @returns {Promise<Message|Message[]>}
     * @deprecated
     */
    sendCode(lang, content, options = {}) {
      return this.send(content, Object.assign(options, { code: lang }));
    },
  };
  
  for (const key of Object.keys(Deprecated)) {
    TextBasedChannel.prototype[key] = util.deprecate(Deprecated[key], `TextChannel#${key}: use TextChannel#send instead`);
  }
  
  exports.applyToClass = (structure, full = false, ignore = []) => {
    const props = ['send', 'sendMessage', 'sendEmbed', 'sendFile', 'sendFiles', 'sendCode'];
    if (full) {
      props.push(
        '_cacheMessage',
        'acknowledge',
        'fetchMessages',
        'fetchMessage',
        'search',
        'bulkDelete',
        'startTyping',
        'stopTyping',
        'typing',
        'typingCount',
        'fetchPinnedMessages',
        'createCollector',
        'createMessageCollector',
        'awaitMessages'
      );
    }
    for (const prop of props) {
      if (ignore.includes(prop)) continue;
      Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(TextBasedChannel.prototype, prop));
    }
  };
  
  TextBasedChannel.prototype.acknowledge = util.deprecate(
    TextBasedChannel.prototype.acknowledge, 'TextBasedChannel#acknowledge: userbot methods will be removed'
  );
  
  TextBasedChannel.prototype.search =
    util.deprecate(TextBasedChannel.prototype.search, 'TextBasedChannel#search: userbot methods will be removed');
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))
  
  /***/ }),
  /* 16 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Mentions = __webpack_require__(40);
  const Attachment = __webpack_require__(41);
  const Embed = __webpack_require__(27);
  const RichEmbed = __webpack_require__(14);
  const MessageReaction = __webpack_require__(42);
  const ReactionCollector = __webpack_require__(43);
  const Util = __webpack_require__(4);
  const Collection = __webpack_require__(3);
  const Constants = __webpack_require__(0);
  const Permissions = __webpack_require__(5);
  let GuildMember;
  
  /**
   * Represents a message on Discord.
   */
  class Message {
    constructor(channel, data, client) {
      /**
       * The client that instantiated the Message
       * @name Message#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      /**
       * The channel that the message was sent in
       * @type {TextChannel|DMChannel|GroupDMChannel}
       */
      this.channel = channel;
  
      /**
       * Whether this message has been deleted
       * @type {boolean}
       */
      this.deleted = false;
  
      if (data) this.setup(data);
    }
  
    setup(data) { // eslint-disable-line complexity
      /**
       * The ID of the message
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The type of the message
       * @type {MessageType}
       */
      this.type = Constants.MessageTypes[data.type];
  
      /**
       * The content of the message
       * @type {string}
       */
      this.content = data.content;
  
      /**
       * The author of the message
       * @type {User}
       */
      this.author = this.client.dataManager.newUser(data.author, !data.webhook_id);
  
      /**
       * Represents the author of the message as a guild member
       * Only available if the message comes from a guild where the author is still a member
       * @type {?GuildMember}
       */
      this.member = this.guild ? this.guild.member(this.author) || null : null;
  
      /**
       * Whether or not this message is pinned
       * @type {boolean}
       */
      this.pinned = data.pinned;
  
      /**
       * Whether or not the message was Text-To-Speech
       * @type {boolean}
       */
      this.tts = data.tts;
  
      /**
       * A random number or string used for checking message delivery
       * @type {string}
       */
      this.nonce = data.nonce;
  
      /**
       * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
       * @type {boolean}
       */
      this.system = data.type === 6;
  
      /**
       * A list of embeds in the message - e.g. YouTube Player
       * @type {MessageEmbed[]}
       */
      this.embeds = data.embeds.map(e => new Embed(this, e));
  
      /**
       * A collection of attachments in the message - e.g. Pictures - mapped by their ID
       * @type {Collection<Snowflake, MessageAttachment>}
       */
      this.attachments = new Collection();
      for (const attachment of data.attachments) this.attachments.set(attachment.id, new Attachment(this, attachment));
  
      /**
       * The timestamp the message was sent at
       * @type {number}
       */
      this.createdTimestamp = new Date(data.timestamp).getTime();
  
      /**
       * The timestamp the message was last edited at (if applicable)
       * @type {?number}
       */
      this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp).getTime() : null;
  
      /**
       * A collection of reactions to this message, mapped by the reaction ID
       * @type {Collection<Snowflake, MessageReaction>}
       */
      this.reactions = new Collection();
      if (data.reactions && data.reactions.length > 0) {
        for (const reaction of data.reactions) {
          const id = reaction.emoji.id ? `${reaction.emoji.name}:${reaction.emoji.id}` : reaction.emoji.name;
          this.reactions.set(id, new MessageReaction(this, reaction.emoji, reaction.count, reaction.me));
        }
      }
  
      /**
       * All valid mentions that the message contains
       * @type {MessageMentions}
       */
      this.mentions = new Mentions(this, data.mentions, data.mention_roles, data.mention_everyone);
  
      /**
       * ID of the webhook that sent the message, if applicable
       * @type {?Snowflake}
       */
      this.webhookID = data.webhook_id || null;
  
      /**
       * Whether this message is a hit in a search
       * @type {?boolean}
       */
      this.hit = typeof data.hit === 'boolean' ? data.hit : null;
  
      /**
       * The previous versions of the message, sorted with the most recent first
       * @type {Message[]}
       * @private
       */
      this._edits = [];
    }
  
    /**
     * Updates the message.
     * @param {Object} data Raw Discord message update data
     * @private
     */
    patch(data) {
      const clone = Util.cloneObject(this);
      this._edits.unshift(clone);
  
      if ('editedTimestamp' in data) this.editedTimestamp = new Date(data.edited_timestamp).getTime();
      if ('content' in data) this.content = data.content;
      if ('pinned' in data) this.pinned = data.pinned;
      if ('tts' in data) this.tts = data.tts;
      if ('embeds' in data) this.embeds = data.embeds.map(e => new Embed(this, e));
      else this.embeds = this.embeds.slice();
  
      if ('attachments' in data) {
        this.attachments = new Collection();
        for (const attachment of data.attachments) this.attachments.set(attachment.id, new Attachment(this, attachment));
      } else {
        this.attachments = new Collection(this.attachments);
      }
  
      this.mentions = new Mentions(
        this,
        'mentions' in data ? data.mentions : this.mentions.users,
        'mentions_roles' in data ? data.mentions_roles : this.mentions.roles,
        'mention_everyone' in data ? data.mention_everyone : this.mentions.everyone
      );
    }
  
    /**
     * The time the message was sent
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The time the message was last edited at (if applicable)
     * @type {?Date}
     * @readonly
     */
    get editedAt() {
      return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
    }
  
    /**
     * The guild the message was sent in (if in a guild channel)
     * @type {?Guild}
     * @readonly
     */
    get guild() {
      return this.channel.guild || null;
    }
  
    /**
     * The url to jump to the message
     * @type {string}
     * @readonly
     */
    get url() {
      return `https://discordapp.com/channels/${this.guild ? this.guild.id : '@me'}/${this.channel.id}/${this.id}`;
    }
  
    /**
     * The message contents with all mentions replaced by the equivalent text.
     * If mentions cannot be resolved to a name, the relevant mention in the message content will not be converted.
     * @type {string}
     * @readonly
     */
    get cleanContent() {
      return this.content
        .replace(/@(everyone|here)/g, '@\u200b$1')
        .replace(/<@!?[0-9]+>/g, input => {
          const id = input.replace(/<|!|>|@/g, '');
          if (this.channel.type === 'dm' || this.channel.type === 'group') {
            return this.client.users.has(id) ? `@${this.client.users.get(id).username}` : input;
          }
  
          const member = this.channel.guild.members.get(id);
          if (member) {
            if (member.nickname) return `@${member.nickname}`;
            return `@${member.user.username}`;
          } else {
            const user = this.client.users.get(id);
            if (user) return `@${user.username}`;
            return input;
          }
        })
        .replace(/<#[0-9]+>/g, input => {
          const channel = this.client.channels.get(input.replace(/<|#|>/g, ''));
          if (channel) return `#${channel.name}`;
          return input;
        })
        .replace(/<@&[0-9]+>/g, input => {
          if (this.channel.type === 'dm' || this.channel.type === 'group') return input;
          const role = this.guild.roles.get(input.replace(/<|@|>|&/g, ''));
          if (role) return `@${role.name}`;
          return input;
        });
    }
  
    /**
     * Creates a reaction collector.
     * @param {CollectorFilter} filter The filter to apply
     * @param {ReactionCollectorOptions} [options={}] Options to send to the collector
     * @returns {ReactionCollector}
     * @example
     * // Create a reaction collector
     * const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
     * const collector = message.createReactionCollector(filter, { time: 15000 });
     * collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
     * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    createReactionCollector(filter, options = {}) {
      return new ReactionCollector(this, filter, options);
    }
  
    /**
     * An object containing the same properties as CollectorOptions, but a few more:
     * @typedef {ReactionCollectorOptions} AwaitReactionsOptions
     * @property {string[]} [errors] Stop/end reasons that cause the promise to reject
     */
  
    /**
     * Similar to createMessageCollector but in promise form.
     * Resolves with a collection of reactions that pass the specified filter.
     * @param {CollectorFilter} filter The filter function to use
     * @param {AwaitReactionsOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<string, MessageReaction>>}
     * @example
     * // Create a reaction collector
     * const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
     * message.awaitReactions(filter, { time: 15000 })
     *   .then(collected => console.log(`Collected ${collected.size} reactions`))
     *   .catch(console.error);
     */
    awaitReactions(filter, options = {}) {
      return new Promise((resolve, reject) => {
        const collector = this.createReactionCollector(filter, options);
        collector.once('end', (reactions, reason) => {
          if (options.errors && options.errors.includes(reason)) reject(reactions);
          else resolve(reactions);
        });
      });
    }
  
    /**
     * An array of cached versions of the message, including the current version
     * Sorted from latest (first) to oldest (last)
     * @type {Message[]}
     * @readonly
     */
    get edits() {
      const copy = this._edits.slice();
      copy.unshift(this);
      return copy;
    }
  
    /**
     * Whether the message is editable by the client user
     * @type {boolean}
     * @readonly
     */
    get editable() {
      return this.author.id === this.client.user.id;
    }
  
    /**
     * Whether the message is deletable by the client user
     * @type {boolean}
     * @readonly
     */
    get deletable() {
      return !this.deleted && (this.author.id === this.client.user.id || (this.guild &&
        this.channel.permissionsFor(this.client.user).has(Permissions.FLAGS.MANAGE_MESSAGES)
      ));
    }
  
    /**
     * Whether the message is pinnable by the client user
     * @type {boolean}
     * @readonly
     */
    get pinnable() {
      return !this.guild ||
        this.channel.permissionsFor(this.client.user).has(Permissions.FLAGS.MANAGE_MESSAGES);
    }
  
    /**
     * Whether or not a user, channel or role is mentioned in this message.
     * @param {GuildChannel|User|Role|string} data Either a guild channel, user or a role object, or a string representing
     * the ID of any of these
     * @returns {boolean}
     */
    isMentioned(data) {
      data = data && data.id ? data.id : data;
      return this.mentions.users.has(data) || this.mentions.channels.has(data) || this.mentions.roles.has(data);
    }
  
    /**
     * Whether or not a guild member is mentioned in this message. Takes into account
     * user mentions, role mentions, and @everyone/@here mentions.
     * @param {GuildMember|User} member The member/user to check for a mention of
     * @returns {boolean}
     */
    isMemberMentioned(member) {
      // Lazy-loading is used here to get around a circular dependency that breaks things
      if (!GuildMember) GuildMember = __webpack_require__(18);
      if (this.mentions.everyone) return true;
      if (this.mentions.users.has(member.id)) return true;
      if (member instanceof GuildMember && member.roles.some(r => this.mentions.roles.has(r.id))) return true;
      return false;
    }
  
    /**
     * Options that can be passed into editMessage.
     * @typedef {Object} MessageEditOptions
     * @property {Object} [embed] An embed to be added/edited
     * @property {string|boolean} [code] Language for optional codeblock formatting to apply
     */
  
    /**
     * Edit the content of the message.
     * @param {StringResolvable} [content] The new content for the message
     * @param {MessageEditOptions|RichEmbed} [options] The options to provide
     * @returns {Promise<Message>}
     * @example
     * // Update the content of a message
     * message.edit('This is my new content!')
     *   .then(msg => console.log(`New message content: ${msg}`))
     *   .catch(console.error);
     */
    edit(content, options) {
      if (!options && typeof content === 'object' && !(content instanceof Array)) {
        options = content;
        content = '';
      } else if (!options) {
        options = {};
      }
      if (options instanceof RichEmbed) options = { embed: options };
      return this.client.rest.methods.updateMessage(this, content, options);
    }
  
    /**
     * Edit the content of the message, with a code block.
     * @param {string} lang The language for the code block
     * @param {StringResolvable} content The new content for the message
     * @returns {Promise<Message>}
     * @deprecated
     */
    editCode(lang, content) {
      content = Util.escapeMarkdown(this.client.resolver.resolveString(content), true);
      return this.edit(`\`\`\`${lang || ''}\n${content}\n\`\`\``);
    }
  
    /**
     * Pins this message to the channel's pinned messages.
     * @returns {Promise<Message>}
     */
    pin() {
      return this.client.rest.methods.pinMessage(this);
    }
  
    /**
     * Unpins this message from the channel's pinned messages.
     * @returns {Promise<Message>}
     */
    unpin() {
      return this.client.rest.methods.unpinMessage(this);
    }
  
    /**
     * Add a reaction to the message.
     * @param {string|Emoji|ReactionEmoji} emoji The emoji to react with
     * @returns {Promise<MessageReaction>}
     * @example
     * // React to a message with a unicode emoji
     * message.react('🤔')
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // React to a message with a custom emoji
     * message.react(message.guild.emojis.get('123456789012345678'))
     *   .then(console.log)
     *   .catch(console.error);
     */
    react(emoji) {
      emoji = this.client.resolver.resolveEmojiIdentifier(emoji);
      if (!emoji) throw new TypeError('Emoji must be a string or Emoji/ReactionEmoji');
  
      return this.client.rest.methods.addMessageReaction(this, emoji);
    }
  
    /**
     * Remove all reactions from a message.
     * @returns {Promise<Message>}
     */
    clearReactions() {
      return this.client.rest.methods.removeMessageReactions(this);
    }
  
    /**
     * Deletes the message.
     * @param {number} [timeout=0] How long to wait to delete the message in milliseconds
     * @returns {Promise<Message>}
     * @example
     * // Delete a message
     * message.delete()
     *   .then(msg => console.log(`Deleted message from ${msg.author.username}`))
     *   .catch(console.error);
     */
    delete(timeout = 0) {
      if (timeout <= 0) {
        return this.client.rest.methods.deleteMessage(this);
      } else {
        return new Promise(resolve => {
          this.client.setTimeout(() => {
            resolve(this.delete());
          }, timeout);
        });
      }
    }
  
    /**
     * Reply to the message.
     * @param {StringResolvable} [content] The content for the message
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // Reply to a message
     * message.reply('Hey, I\'m a reply!')
     *   .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
     *   .catch(console.error);
     */
    reply(content, options) {
      if (!options && typeof content === 'object' && !(content instanceof Array)) {
        options = content;
        content = '';
      } else if (!options) {
        options = {};
      }
      return this.channel.send(content, Object.assign(options, { reply: this.member || this.author }));
    }
  
    /**
     * Marks the message as read.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<Message>}
     */
    acknowledge() {
      return this.client.rest.methods.ackMessage(this);
    }
  
    /**
     * Fetches the webhook used to create this message.
     * @returns {Promise<?Webhook>}
     */
    fetchWebhook() {
      if (!this.webhookID) return Promise.reject(new Error('The message was not sent by a webhook.'));
      return this.client.fetchWebhook(this.webhookID);
    }
  
    /**
     * Used mainly internally. Whether two messages are identical in properties. If you want to compare messages
     * without checking all the properties, use `message.id === message2.id`, which is much more efficient. This
     * method allows you to see if there are differences in content, embeds, attachments, nonce and tts properties.
     * @param {Message} message The message to compare it to
     * @param {Object} rawData Raw data passed through the WebSocket about this message
     * @returns {boolean}
     */
    equals(message, rawData) {
      if (!message) return false;
      const embedUpdate = !message.author && !message.attachments;
      if (embedUpdate) return this.id === message.id && this.embeds.length === message.embeds.length;
  
      let equal = this.id === message.id &&
          this.author.id === message.author.id &&
          this.content === message.content &&
          this.tts === message.tts &&
          this.nonce === message.nonce &&
          this.embeds.length === message.embeds.length &&
          this.attachments.length === message.attachments.length;
  
      if (equal && rawData) {
        equal = this.mentions.everyone === message.mentions.everyone &&
          this.createdTimestamp === new Date(rawData.timestamp).getTime() &&
          this.editedTimestamp === new Date(rawData.edited_timestamp).getTime();
      }
  
      return equal;
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the message's content instead of the object.
     * @returns {string}
     * @example
     * // Logs: Message: This is a message!
     * console.log(`Message: ${message}`);
     */
    toString() {
      return this.content;
    }
  
    _addReaction(emoji, user) {
      const emojiID = emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name;
      let reaction;
      if (this.reactions.has(emojiID)) {
        reaction = this.reactions.get(emojiID);
        if (!reaction.me) reaction.me = user.id === this.client.user.id;
      } else {
        reaction = new MessageReaction(this, emoji, 0, user.id === this.client.user.id);
        this.reactions.set(emojiID, reaction);
      }
      if (!reaction.users.has(user.id)) {
        reaction.users.set(user.id, user);
        reaction.count++;
      }
      return reaction;
    }
  
    _removeReaction(emoji, user) {
      const emojiID = emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name;
      if (this.reactions.has(emojiID)) {
        const reaction = this.reactions.get(emojiID);
        if (reaction.users.has(user.id)) {
          reaction.users.delete(user.id);
          reaction.count--;
          if (user.id === this.client.user.id) reaction.me = false;
          if (reaction.count <= 0) this.reactions.delete(emojiID);
          return reaction;
        }
      }
      return null;
    }
  
    _clearReactions() {
      this.reactions.clear();
    }
  }
  
  module.exports = Message;
  
  
  /***/ }),
  /* 17 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const Collection = __webpack_require__(3);
  const Permissions = __webpack_require__(5);
  const Snowflake = __webpack_require__(7);
  
  /**
   * Represents a custom emoji.
   */
  class Emoji {
    constructor(guild, data) {
      /**
       * The client that instantiated this object
       * @name Emoji#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: guild.client });
  
      /**
       * The guild this emoji is part of
       * @type {Guild}
       */
      this.guild = guild;
  
      /**
       * Whether this emoji has been deleted
       * @type {boolean}
       */
      this.deleted = false;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of the emoji
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The name of the emoji
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * Whether or not this emoji requires colons surrounding it
       * @type {boolean}
       */
      this.requiresColons = data.require_colons;
  
      /**
       * Whether this emoji is managed by an external service
       * @type {boolean}
       */
      this.managed = data.managed;
  
      /**
       * Whether this emoji is animated
       * @type {boolean}
       */
      this.animated = data.animated;
  
      this._roles = data.roles;
    }
  
    /**
     * The timestamp the emoji was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the emoji was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * Whether the moej is deletable by the client user
     * @type {boolean}
     * @readonly
     */
    get deletable() {
      return !this.managed && this.guild.me.hasPermission(Permissions.FLAGS.MANAGE_EMOJIS);
    }
  
    /**
     * A collection of roles this emoji is active for (empty if all), mapped by role ID
     * @type {Collection<Snowflake, Role>}
     * @readonly
     */
    get roles() {
      const roles = new Collection();
      for (const role of this._roles) {
        if (this.guild.roles.has(role)) roles.set(role, this.guild.roles.get(role));
      }
      return roles;
    }
  
    /**
     * The URL to the emoji file
     * @type {string}
     * @readonly
     */
    get url() {
      return Constants.Endpoints.CDN(this.client.options.http.cdn).Emoji(this.id, this.animated ? 'gif' : 'png');
    }
  
    /**
     * The identifier of this emoji, used for message reactions
     * @type {string}
     * @readonly
     */
    get identifier() {
      if (this.id) return `${this.name}:${this.id}`;
      return encodeURIComponent(this.name);
    }
  
    /**
     * Data for editing an emoji.
     * @typedef {Object} EmojiEditData
     * @property {string} [name] The name of the emoji
     * @property {Collection<Snowflake, Role>|Array<Snowflake|Role>} [roles] Roles to restrict emoji to
     */
  
    /**
     * Edits the emoji.
     * @param {EmojiEditData} data The new data for the emoji
     * @param {string} [reason] Reason for editing this emoji
     * @returns {Promise<Emoji>}
     * @example
     * // Edit an emoji
     * emoji.edit({name: 'newemoji'})
     *   .then(e => console.log(`Edited emoji ${e}`))
     *   .catch(console.error);
     */
    edit(data, reason) {
      return this.client.rest.methods.updateEmoji(this, data, reason);
    }
  
    /**
     * Set the name of the emoji.
     * @param {string} name The new name for the emoji
     * @param {string} [reason] The reason for changing the emoji's name
     * @returns {Promise<Emoji>}
     */
    setName(name, reason) {
      return this.edit({ name }, reason);
    }
  
    /**
     * Fetches the author for this emoji
     * @returns {Promise<User>}
     */
    fetchAuthor() {
      if (this.managed) return Promise.reject(new Error('Emoji is managed and has no Author.'));
      return this.client.rest.makeRequest('get', Constants.Endpoints.Guild(this.guild).Emoji(this.id), true)
        .then(emoji => this.client.dataManager.newUser(emoji.user));
    }
  
    /**
     * Add a role to the list of roles that can use this emoji.
     * @param {Role} role The role to add
     * @returns {Promise<Emoji>}
     */
    addRestrictedRole(role) {
      return this.addRestrictedRoles([role]);
    }
  
    /**
     * Add multiple roles to the list of roles that can use this emoji.
     * @param {Role[]} roles Roles to add
     * @returns {Promise<Emoji>}
     */
    addRestrictedRoles(roles) {
      const newRoles = new Collection(this.roles);
      for (const role of roles) {
        if (this.guild.roles.has(role.id)) newRoles.set(role.id, role);
      }
      return this.edit({ roles: newRoles });
    }
  
    /**
     * Remove a role from the list of roles that can use this emoji.
     * @param {Role} role The role to remove
     * @returns {Promise<Emoji>}
     */
    removeRestrictedRole(role) {
      return this.removeRestrictedRoles([role]);
    }
  
    /**
     * Remove multiple roles from the list of roles that can use this emoji.
     * @param {Role[]} roles Roles to remove
     * @returns {Promise<Emoji>}
     */
    removeRestrictedRoles(roles) {
      const newRoles = new Collection(this.roles);
      for (const role of roles) {
        if (newRoles.has(role.id)) newRoles.delete(role.id);
      }
      return this.edit({ roles: newRoles });
    }
  
    /**
     * When concatenated with a string, this automatically returns the emoji mention rather than the object.
     * @returns {string}
     * @example
     * // Send an emoji:
     * const emoji = guild.emojis.first();
     * msg.reply(`Hello! ${emoji}`);
     */
    toString() {
      if (!this.id || !this.requiresColons) {
        return this.name;
      }
  
      return `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>`;
    }
  
    /**
     * Whether this emoji is the same as another one.
     * @param {Emoji|Object} other The emoji to compare it to
     * @returns {boolean} Whether the emoji is equal to the given emoji or not
     */
    equals(other) {
      if (other instanceof Emoji) {
        return (
          other.id === this.id &&
          other.name === this.name &&
          other.managed === this.managed &&
          other.requiresColons === this.requiresColons
        );
      } else {
        return (
          other.id === this.id &&
          other.name === this.name
        );
      }
    }
  }
  
  module.exports = Emoji;
  
  
  /***/ }),
  /* 18 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const TextBasedChannel = __webpack_require__(15);
  const Role = __webpack_require__(8);
  const Permissions = __webpack_require__(5);
  const Collection = __webpack_require__(3);
  const { Presence } = __webpack_require__(11);
  const util = __webpack_require__(6);
  
  /**
   * Represents a member of a guild on Discord.
   * @implements {TextBasedChannel}
   */
  class GuildMember {
    constructor(guild, data) {
      /**
       * The client that instantiated this GuildMember
       * @name GuildMember#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: guild.client });
  
      /**
       * The guild that this member is part of
       * @type {Guild}
       */
      this.guild = guild;
  
      /**
       * The user that this member instance Represents
       * @type {User}
       */
      this.user = {};
  
      /**
       * The timestamp this member joined the guild at
       * @type {number}
       */
      this.joinedTimestamp = null;
  
      this._roles = [];
      if (data) this.setup(data);
  
      /**
       * The ID of the last message sent by this member in their guild, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = null;
  
      /**
       * The Message object of the last message sent by this member in their guild, if one was sent
       * @type {?Message}
       */
      this.lastMessage = null;
  
      /**
       * Whether the member has been removed from the guild
       * @type {boolean}
       */
      this.deleted = false;
    }
  
    setup(data) {
      /**
       * Whether this member is deafened server-wide
       * @type {boolean}
       */
      this.serverDeaf = data.deaf;
  
      /**
       * Whether this member is muted server-wide
       * @type {boolean}
       */
      this.serverMute = data.mute;
  
      /**
       * Whether this member is self-muted
       * @type {boolean}
       */
      this.selfMute = data.self_mute;
  
      /**
       * Whether this member is self-deafened
       * @type {boolean}
       */
      this.selfDeaf = data.self_deaf;
  
      /**
       * The voice session ID of this member, if any
       * @type {?Snowflake}
       */
      this.voiceSessionID = data.session_id;
  
      /**
       * The voice channel ID of this member, if any
       * @type {?Snowflake}
       */
      this.voiceChannelID = data.channel_id;
  
      /**
       * Whether this member is speaking and the client is in the same channel
       * @type {boolean}
       */
      this.speaking = false;
  
      /**
       * The nickname of this member, if they have one
       * @type {?string}
       */
      this.nickname = data.nick || null;
  
      if (data.joined_at) this.joinedTimestamp = new Date(data.joined_at).getTime();
  
      this.user = data.user;
      this._roles = data.roles;
    }
  
    /**
     * The time this member joined the guild
     * @type {?Date}
     * @readonly
     */
    get joinedAt() {
      return this.joinedTimestamp ? new Date(this.joinedTimestamp) : null;
    }
  
    /**
     * The presence of this member
     * @type {Presence}
     * @readonly
     */
    get presence() {
      return this.frozenPresence || this.guild.presences.get(this.id) || new Presence(undefined, this.client);
    }
  
    /**
     * A list of roles that are applied to this member, mapped by the role ID
     * @type {Collection<Snowflake, Role>}
     * @readonly
     */
    get roles() {
      const list = new Collection();
      const everyoneRole = this.guild.roles.get(this.guild.id);
  
      if (everyoneRole) list.set(everyoneRole.id, everyoneRole);
  
      for (const roleID of this._roles) {
        const role = this.guild.roles.get(roleID);
        if (role) list.set(role.id, role);
      }
  
      return list;
    }
  
    /**
     * The role of this member with the highest position
     * @type {Role}
     * @readonly
     */
    get highestRole() {
      return this.roles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);
    }
  
    /**
     * The role of this member used to set their color
     * @type {?Role}
     * @readonly
     */
    get colorRole() {
      const coloredRoles = this.roles.filter(role => role.color);
      if (!coloredRoles.size) return null;
      return coloredRoles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);
    }
  
    /**
     * The displayed color of this member in base 10
     * @type {number}
     * @readonly
     */
    get displayColor() {
      const role = this.colorRole;
      return (role && role.color) || 0;
    }
  
    /**
     * The displayed color of this member in hexadecimal
     * @type {string}
     * @readonly
     */
    get displayHexColor() {
      const role = this.colorRole;
      return (role && role.hexColor) || '#000000';
    }
  
    /**
     * The role of this member used to hoist them in a separate category in the users list
     * @type {?Role}
     * @readonly
     */
    get hoistRole() {
      const hoistedRoles = this.roles.filter(role => role.hoist);
      if (!hoistedRoles.size) return null;
      return hoistedRoles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);
    }
  
    /**
     * Whether this member is muted in any way
     * @type {boolean}
     * @readonly
     */
    get mute() {
      return this.selfMute || this.serverMute;
    }
  
    /**
     * Whether this member is deafened in any way
     * @type {boolean}
     * @readonly
     */
    get deaf() {
      return this.selfDeaf || this.serverDeaf;
    }
  
    /**
     * The voice channel this member is in, if any
     * @type {?VoiceChannel}
     * @readonly
     */
    get voiceChannel() {
      return this.guild.channels.get(this.voiceChannelID);
    }
  
    /**
     * The ID of this user
     * @type {Snowflake}
     * @readonly
     */
    get id() {
      return this.user.id;
    }
  
    /**
     * The nickname of this member, or their username if they don't have one
     * @type {string}
     * @readonly
     */
    get displayName() {
      return this.nickname || this.user.username;
    }
  
    /**
     * The overall set of permissions for this member, taking only roles into account
     * @type {Permissions}
     * @readonly
     */
    get permissions() {
      if (this.user.id === this.guild.ownerID) return new Permissions(this, Permissions.ALL);
  
      let permissions = 0;
      const roles = this.roles;
      for (const role of roles.values()) permissions |= role.permissions;
  
      return new Permissions(this, permissions);
    }
  
    /**
     * Whether this member is manageable in terms of role hierarchy by the client user
     * @type {boolean}
     * @readonly
     */
    get manageable() {
      if (this.user.id === this.guild.ownerID) return false;
      if (this.user.id === this.client.user.id) return false;
      return this.guild.me.highestRole.comparePositionTo(this.highestRole) > 0;
    }
  
    /**
     * Whether this member is kickable by the client user
     * @type {boolean}
     * @readonly
     */
    get kickable() {
      return this.manageable && this.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS);
    }
  
    /**
     * Whether this member is bannable by the client user
     * @type {boolean}
     * @readonly
     */
    get bannable() {
      return this.manageable && this.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
    }
  
    /**
     * Returns `channel.permissionsFor(guildMember)`. Returns permissions for this member in a guild channel,
     * taking into account roles and permission overwrites.
     * @param {ChannelResolvable} channel The guild channel to use as context
     * @returns {?Permissions}
     */
    permissionsIn(channel) {
      channel = this.client.resolver.resolveChannel(channel);
      if (!channel || !channel.guild) throw new Error('Could not resolve channel to a guild channel.');
      return channel.permissionsFor(this);
    }
  
    /**
     * Checks if any of this member's roles have a permission.
     * @param {PermissionResolvable} permission Permission(s) to check for
     * @param {boolean} [explicit=false] Whether to require the role to explicitly have the exact permission
     * **(deprecated)**
     * @param {boolean} [checkAdmin] Whether to allow the administrator permission to override
     * (takes priority over `explicit`)
     * @param {boolean} [checkOwner] Whether to allow being the guild's owner to override
     * (takes priority over `explicit`)
     * @returns {boolean}
     */
    hasPermission(permission, explicit = false, checkAdmin, checkOwner) {
      if (typeof checkAdmin === 'undefined') checkAdmin = !explicit;
      if (typeof checkOwner === 'undefined') checkOwner = !explicit;
      if (checkOwner && this.user.id === this.guild.ownerID) return true;
      return this.roles.some(r => r.hasPermission(permission, undefined, checkAdmin));
    }
  
    /**
     * Checks whether the roles of this member allows them to perform specific actions.
     * @param {PermissionResolvable} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the member to explicitly have the exact permissions
     * @returns {boolean}
     * @deprecated
     */
    hasPermissions(permissions, explicit = false) {
      if (!explicit && this.user.id === this.guild.ownerID) return true;
      return this.hasPermission(permissions, explicit);
    }
  
    /**
     * Checks whether the roles of this member allows them to perform specific actions, and lists any missing permissions.
     * @param {PermissionResolvable} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the member to explicitly have the exact permissions
     * @returns {PermissionResolvable}
     */
    missingPermissions(permissions, explicit = false) {
      if (!(permissions instanceof Array)) permissions = [permissions];
      return this.permissions.missing(permissions, explicit);
    }
  
    /**
     * The data for editing this member.
     * @typedef {Object} GuildMemberEditData
     * @property {string} [nick] The nickname to set for the member
     * @property {Collection<Snowflake, Role>|RoleResolvable[]} [roles] The roles or role IDs to apply
     * @property {boolean} [mute] Whether or not the member should be muted
     * @property {boolean} [deaf] Whether or not the member should be deafened
     * @property {ChannelResolvable} [channel] Channel to move member to (if they are connected to voice)
     */
  
    /**
     * Edits this member.
     * @param {GuildMemberEditData} data The data to edit the member with
     * @param {string} [reason] Reason for editing this user
     * @returns {Promise<GuildMember>}
     * @example
     * // Set a member's nickname and clear their roles
     * message.member.edit({
     *   nick: 'Cool Name',
     *   roles: []
     * })
     *   .then(console.log)
     *   .catch(console.error);
     */
    edit(data, reason) {
      return this.client.rest.methods.updateGuildMember(this, data, reason);
    }
  
    /**
     * Mute/unmute this member.
     * @param {boolean} mute Whether or not the member should be muted
     * @param {string} [reason] Reason for muting or unmuting
     * @returns {Promise<GuildMember>}
     * @example
     * // Mute a member with a reason
     * message.member.setMute(true, 'It needed to be done')
     *   .then(() => console.log(`Muted ${message.member.displayName}`)))
     *   .catch(console.error);
     */
    setMute(mute, reason) {
      return this.edit({ mute }, reason);
    }
  
    /**
     * Deafen/undeafen this member.
     * @param {boolean} deaf Whether or not the member should be deafened
     * @param {string} [reason] Reason for deafening or undeafening
     * @returns {Promise<GuildMember>}
     * @example
     * // Deafen a member
     * message.member.setDeaf(true)
     *   .then(() => console.log(`Deafened ${message.member.displayName}`))
     *   .catch(console.error);
     */
    setDeaf(deaf, reason) {
      return this.edit({ deaf }, reason);
    }
  
    /**
     * Moves this member to the given channel.
     * @param {ChannelResolvable} channel The channel to move the member to
     * @returns {Promise<GuildMember>}
     * @example
     * // Moves a member to a voice channel
     * member.setVoiceChannel('174674066072928256')
     *   .then(() => console.log(`Moved ${member.displayName}`))
     *   .catch(console.error);
     */
    setVoiceChannel(channel) {
      return this.edit({ channel });
    }
  
    /**
     * Sets the roles applied to this member.
     * @param {Collection<Snowflake, Role>|RoleResolvable[]} roles The roles or role IDs to apply
     * @param {string} [reason] Reason for applying the roles
     * @returns {Promise<GuildMember>}
     * @example
     * // Set the member's roles to a single role
     * guildMember.setRoles(['391156570408615936'])
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Remove all of the member's roles
     * guildMember.setRoles([])
     *   .then(member => console.log(`${member.displayName} now has ${member.roles.size} roles`))
     *   .catch(console.error);
     */
    setRoles(roles, reason) {
      return this.edit({ roles }, reason);
    }
  
    /**
     * Adds a single role to this member.
     * @param {RoleResolvable} role The role or ID of the role to add
     * @param {string} [reason] Reason for adding the role
     * @returns {Promise<GuildMember>}
     * @example
     * // Give a role to a member
     * message.member.addRole('193654001089118208')
     *   .then(console.log)
     *   .catch(console.error);
     */
    addRole(role, reason) {
      if (!(role instanceof Role)) role = this.guild.roles.get(role);
      if (!role) return Promise.reject(new TypeError('Supplied parameter was neither a Role nor a Snowflake.'));
      return this.client.rest.methods.addMemberRole(this, role, reason);
    }
  
    /**
     * Adds multiple roles to this member.
     * @param {Collection<Snowflake, Role>|RoleResolvable[]} roles The roles or role IDs to add
     * @param {string} [reason] Reason for adding the roles
     * @returns {Promise<GuildMember>}
     * @example
     * // Gives a member a few roles
     * message.member.addRoles(['193654001089118208', '369308579892690945'])
     *   .then(console.log)
     *   .catch(console.error);
     */
    addRoles(roles, reason) {
      let allRoles;
      if (roles instanceof Collection) {
        allRoles = this._roles.slice();
        for (const role of roles.values()) allRoles.push(role.id);
      } else {
        allRoles = this._roles.concat(roles);
      }
      return this.edit({ roles: allRoles }, reason);
    }
  
    /**
     * Removes a single role from this member.
     * @param {RoleResolvable} role The role or ID of the role to remove
     * @param {string} [reason] Reason for removing the role
     * @returns {Promise<GuildMember>}
     * @example
     * // Remove a role from a member
     * message.member.removeRole('193654001089118208')
     *   .then(console.log)
     *   .catch(console.error);
     */
    removeRole(role, reason) {
      if (!(role instanceof Role)) role = this.guild.roles.get(role);
      if (!role) return Promise.reject(new TypeError('Supplied parameter was neither a Role nor a Snowflake.'));
      return this.client.rest.methods.removeMemberRole(this, role, reason);
    }
  
    /**
     * Removes multiple roles from this member.
     * @param {Collection<Snowflake, Role>|RoleResolvable[]} roles The roles or role IDs to remove
     * @param {string} [reason] Reason for removing the roles
     * @returns {Promise<GuildMember>}
     * @example
     * // Removes a few roles from the member
     * message.member.removeRoles(['193654001089118208', '369308579892690945'])
     *   .then(console.log)
     *   .catch(console.error);
     */
    removeRoles(roles, reason) {
      const allRoles = this._roles.slice();
      if (roles instanceof Collection) {
        for (const role of roles.values()) {
          const index = allRoles.indexOf(role.id);
          if (index >= 0) allRoles.splice(index, 1);
        }
      } else {
        for (const role of roles) {
          const index = allRoles.indexOf(role instanceof Role ? role.id : role);
          if (index >= 0) allRoles.splice(index, 1);
        }
      }
      return this.edit({ roles: allRoles }, reason);
    }
  
    /**
     * Set the nickname for this member.
     * @param {string} nick The nickname for the guild member
     * @param {string} [reason] Reason for setting the nickname
     * @returns {Promise<GuildMember>}
     * @example
     * // Update the member's nickname
     * message.member.setNickname('Cool Name')
     *   .then(console.log)
     *   .catch(console.error);
     */
    setNickname(nick, reason) {
      return this.edit({ nick }, reason);
    }
  
    /**
     * Creates a DM channel between the client and this member.
     * @returns {Promise<DMChannel>}
     */
    createDM() {
      return this.user.createDM();
    }
  
    /**
     * Deletes any DMs with this guild member.
     * @returns {Promise<DMChannel>}
     */
    deleteDM() {
      return this.user.deleteDM();
    }
  
    /**
     * Kick this member from the guild.
     * @param {string} [reason] Reason for kicking user
     * @returns {Promise<GuildMember>}
     * @example
     * // Kick a member
     * member.kick()
     *   .then(() => console.log(`Kicked ${member.displayName}`))
     *   .catch(console.error);
     */
    kick(reason) {
      return this.client.rest.methods.kickGuildMember(this.guild, this, reason);
    }
  
    /**
     * Ban this member.
     * @param {Object|number|string} [options] Ban options. If a number, the number of days to delete messages for, if a
     * string, the ban reason. Supplying an object allows you to do both.
     * @param {number} [options.days=0] Number of days of messages to delete
     * @param {string} [options.reason] Reason for banning
     * @returns {Promise<GuildMember>}
     * @example
     * // Ban a guild member
     * member.ban(7)
     *   .then(() => console.log(`Banned ${member.displayName}`))
     *   .catch(console.error);
     */
    ban(options) {
      return this.guild.ban(this, options);
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the user's mention instead of the Member object.
     * @returns {string}
     * @example
     * // Logs: Hello from <@123456789>!
     * console.log(`Hello from ${member}!`);
     */
    toString() {
      return `<@${this.nickname ? '!' : ''}${this.user.id}>`;
    }
  
    // These are here only for documentation purposes - they are implemented by TextBasedChannel
    /* eslint-disable no-empty-function */
    send() {}
    sendMessage() {}
    sendEmbed() {}
    sendFile() {}
    sendCode() {}
  }
  
  TextBasedChannel.applyToClass(GuildMember);
  
  GuildMember.prototype.hasPermissions = util.deprecate(GuildMember.prototype.hasPermissions,
    'GuildMember#hasPermissions is deprecated - use GuildMember#hasPermission, it now takes an array');
  
  module.exports = GuildMember;
  
  
  /***/ }),
  /* 19 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Channel = __webpack_require__(12);
  const Role = __webpack_require__(8);
  const PermissionOverwrites = __webpack_require__(50);
  const Permissions = __webpack_require__(5);
  const Collection = __webpack_require__(3);
  const Constants = __webpack_require__(0);
  const Invite = __webpack_require__(23);
  
  /**
   * Represents a guild channel (i.e. text channels and voice channels).
   * @extends {Channel}
   */
  class GuildChannel extends Channel {
    constructor(guild, data) {
      super(guild.client, data);
  
      /**
       * The guild the channel is in
       * @type {Guild}
       */
      this.guild = guild;
    }
  
    setup(data) {
      super.setup(data);
  
      /**
       * The name of the guild channel
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The position of the channel in the list
       * @type {number}
       */
      this.position = data.position;
  
      /**
       * The ID of the category parent of this channel
       * @type {?Snowflake}
       */
      this.parentID = data.parent_id;
  
      /**
       * A map of permission overwrites in this channel for roles and users
       * @type {Collection<Snowflake, PermissionOverwrites>}
       */
      this.permissionOverwrites = new Collection();
      if (data.permission_overwrites) {
        for (const overwrite of data.permission_overwrites) {
          this.permissionOverwrites.set(overwrite.id, new PermissionOverwrites(this, overwrite));
        }
      }
    }
  
    /**
     * The position of the channel
     * @type {number}
     * @readonly
     */
    get calculatedPosition() {
      const sorted = this.guild._sortedChannels(this.type);
      return sorted.array().indexOf(sorted.get(this.id));
    }
  
    /**
     * The category parent of this channel
     * @type {?CategoryChannel}
     * @readonly
     */
    get parent() {
      return this.guild.channels.get(this.parentID) || null;
    }
  
    /**
     * Gets the overall set of permissions for a user in this channel, taking into account channel overwrites.
     * @param {GuildMemberResolvable} member The user that you want to obtain the overall permissions for
     * @returns {?Permissions}
     */
    memberPermissions(member) {
      member = this.client.resolver.resolveGuildMember(this.guild, member);
      if (!member) return null;
  
      if (member.id === this.guild.ownerID) return new Permissions(member, Permissions.ALL);
  
      const roles = member.roles;
      const permissions = new Permissions(roles.map(role => role.permissions));
  
      if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return new Permissions(Permissions.ALL).freeze();
  
      const overwrites = this.overwritesFor(member, true, roles);
  
      return permissions
        .remove(overwrites.everyone ? overwrites.everyone.deny : 0)
        .add(overwrites.everyone ? overwrites.everyone.allow : 0)
        .remove(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.deny) : 0)
        .add(overwrites.roles.length > 0 ? overwrites.roles.map(role => role.allow) : 0)
        .remove(overwrites.member ? overwrites.member.deny : 0)
        .add(overwrites.member ? overwrites.member.allow : 0)
        .freeze();
    }
  
    /**
     * Gets the overall set of permissions for a role in this channel, taking into account channel overwrites.
     * @param {RoleResolvable} role The role that you want to obtain the overall permissions for
     * @returns {?Permissions}
     */
    rolePermissions(role) {
      if (role.permissions & Permissions.FLAGS.ADMINISTRATOR) return new Permissions(Permissions.ALL).freeze();
  
      const everyoneOverwrites = this.permissionOverwrites.get(this.guild.id);
      const roleOverwrites = this.permissionOverwrites.get(role.id);
  
      return new Permissions(role.permissions)
        .remove(everyoneOverwrites ? everyoneOverwrites.deny : 0)
        .add(everyoneOverwrites ? everyoneOverwrites.allow : 0)
        .remove(roleOverwrites ? roleOverwrites.deny : 0)
        .add(roleOverwrites ? roleOverwrites.allow : 0)
        .freeze();
    }
  
    /**
     * Get the overall set of permissions for a member or role in this channel, taking into account channel overwrites.
     * @param {GuildMemberResolvable|RoleResolvable} memberOrRole The member or role to obtain the overall permissions for
     * @returns {?Permissions}
     */
    permissionsFor(memberOrRole) {
      const member = this.guild.member(memberOrRole);
      if (member) return this.memberPermissions(member);
      const role = this.client.resolver.resolveRole(this.guild, memberOrRole);
      if (role) return this.rolePermissions(role);
      return null;
    }
  
    overwritesFor(member, verified = false, roles = null) {
      if (!verified) member = this.client.resolver.resolveGuildMember(this.guild, member);
      if (!member) return [];
  
      roles = roles || member.roles;
      const roleOverwrites = [];
      let memberOverwrites;
      let everyoneOverwrites;
  
      for (const overwrite of this.permissionOverwrites.values()) {
        if (overwrite.id === this.guild.id) {
          everyoneOverwrites = overwrite;
        } else if (roles.has(overwrite.id)) {
          roleOverwrites.push(overwrite);
        } else if (overwrite.id === member.id) {
          memberOverwrites = overwrite;
        }
      }
  
      return {
        everyone: everyoneOverwrites,
        roles: roleOverwrites,
        member: memberOverwrites,
      };
    }
  
    /**
     * Replaces the permission overwrites for a channel
     * @param {Object} [options] Options
     * @param {ChannelCreationOverwrites[]|Collection<Snowflake, PermissionOverwrites>} [options.overwrites]
     * Permission overwrites
     * @param {string} [options.reason] Reason for updating the channel overwrites
     * @returns {Promise<GuildChannel>}
     * @example
     * channel.replacePermissionOverwrites({
     * overwrites: [
     *   {
     *      id: message.author.id,
     *      denied: ['VIEW_CHANNEL'],
     *   },
     * ],
     *   reason: 'Needed to change permissions'
     * });
     */
    replacePermissionOverwrites({ overwrites, reason } = {}) {
      return this.edit({ permissionOverwrites: overwrites, reason })
        .then(() => this);
    }
  
    /**
     * An object mapping permission flags to `true` (enabled), `null` (unset) or `false` (disabled).
     * ```js
     * {
     *  'SEND_MESSAGES': true,
     *  'EMBED_LINKS': null,
     *  'ATTACH_FILES': false,
     * }
     * ```
     * @typedef {Object} PermissionOverwriteOptions
     */
  
    /**
     * Overwrites the permissions for a user or role in this channel.
     * @param {Role|Snowflake|UserResolvable} userOrRole The user or role to update
     * @param {PermissionOverwriteOptions} options The configuration for the update
     * @param {string} [reason] Reason for creating/editing this overwrite
     * @returns {Promise<GuildChannel>}
     * @example
     * // Overwrite permissions for a message author
     * message.channel.overwritePermissions(message.author, {
     *   SEND_MESSAGES: false
     * })
     *   .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
     *   .catch(console.error);
     * @example
     * // Overwite permissions for a message author and reset some
     * message.channel.overwritePermissions(message.author, {
     *   VIEW_CHANNEL: false,
     *   SEND_MESSAGES: null
     * })
     *   .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
     *   .catch(console.error);
     */
    overwritePermissions(userOrRole, options, reason) {
      const payload = {
        allow: 0,
        deny: 0,
      };
  
      if (userOrRole instanceof Role) {
        payload.type = 'role';
      } else if (this.guild.roles.has(userOrRole)) {
        userOrRole = this.guild.roles.get(userOrRole);
        payload.type = 'role';
      } else {
        userOrRole = this.client.resolver.resolveUser(userOrRole);
        payload.type = 'member';
        if (!userOrRole) return Promise.reject(new TypeError('Supplied parameter was neither a User nor a Role.'));
      }
  
      payload.id = userOrRole.id;
  
      const prevOverwrite = this.permissionOverwrites.get(userOrRole.id);
  
      if (prevOverwrite) {
        payload.allow = prevOverwrite.allow;
        payload.deny = prevOverwrite.deny;
      }
  
      for (const perm in options) {
        if (options[perm] === true) {
          payload.allow |= Permissions.FLAGS[perm] || 0;
          payload.deny &= ~(Permissions.FLAGS[perm] || 0);
        } else if (options[perm] === false) {
          payload.allow &= ~(Permissions.FLAGS[perm] || 0);
          payload.deny |= Permissions.FLAGS[perm] || 0;
        } else if (options[perm] === null) {
          payload.allow &= ~(Permissions.FLAGS[perm] || 0);
          payload.deny &= ~(Permissions.FLAGS[perm] || 0);
        }
      }
  
      return this.client.rest.methods.setChannelOverwrite(this, payload, reason).then(() => this);
    }
  
    /**
     * Locks in the permission overwrites from the parent channel.
     * @returns {Promise<GuildChannel>}
     */
    lockPermissions() {
      if (!this.parent) return Promise.reject(new TypeError('Could not find a parent to this guild channel.'));
      const permissionOverwrites = this.parent.permissionOverwrites.map(overwrite => ({
        deny: overwrite.deny.bitfield,
        allow: overwrite.allow.bitfield,
        id: overwrite.id,
        type: overwrite.type,
      }));
      return this.edit({ permissionOverwrites });
    }
  
    /**
     * The data for a guild channel.
     * @typedef {Object} ChannelData
     * @property {string} [name] The name of the channel
     * @property {number} [position] The position of the channel
     * @property {string} [topic] The topic of the text channel
     * @property {boolean} [nsfw] Whether the channel is NSFW
     * @property {number} [bitrate] The bitrate of the voice channel
     * @property {number} [userLimit] The user limit of the channel
     * @property {string} [parent] The parent ID of the channel
     * @property {ChannelCreationOverwrites[]|Collection<Snowflake, PermissionOverwrites>} [overwrites]
     * Overwrites of the channel
     */
  
    /**
     * Edits the channel.
     * @param {ChannelData} data The new data for the channel
     * @param {string} [reason] Reason for editing this channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // Edit a channel
     * channel.edit({ name: 'new-channel' })
     *   .then(console.log)
     *   .catch(console.error);
     */
    edit(data, reason) {
      return this.client.rest.methods.updateChannel(this, data, reason).then(() => this);
    }
  
    /**
     * Set a new name for the guild channel.
     * @param {string} name The new name for the guild channel
     * @param {string} [reason] Reason for changing the guild channel's name
     * @returns {Promise<GuildChannel>}
     * @example
     * // Set a new channel name
     * channel.setName('not_general')
     *   .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
     *   .catch(console.error);
     */
    setName(name, reason) {
      return this.edit({ name }, reason);
    }
  
    /**
     * Set a new position for the guild channel.
     * @param {number} position The new position for the guild channel
     * @param {boolean} [relative=false] Move the position relative to its current value
     * @returns {Promise<GuildChannel>}
     * @example
     * // Set a new channel position
     * channel.setPosition(2)
     *   .then(newChannel => console.log(`Channel's new position is ${newChannel.position}`))
     *   .catch(console.error);
     */
    setPosition(position, relative) {
      return this.guild.setChannelPosition(this, position, relative);
    }
  
    /**
     * Set a new parent for the guild channel.
     * @param {CategoryChannel|SnowFlake} parent The new parent for the guild channel
     * @param {string} [reason] Reason for changing the guild channel's parent
     * @returns {Promise<GuildChannel>}
     * @example
     * // Sets the parent of a channel
     * channel.setParent('174674066072928256')
     *   .then(updated => console.log(`Set the category of ${updated.name} to ${updated.parent.name}`))
     *   .catch(console.error);
     */
    setParent(parent, reason) {
      parent = this.client.resolver.resolveChannelID(parent);
      return this.edit({ parent }, reason);
    }
  
    /**
     * Set a new topic for the guild channel.
     * @param {string} topic The new topic for the guild channel
     * @param {string} [reason] Reason for changing the guild channel's topic
     * @returns {Promise<GuildChannel>}
     * @example
     * // Set a new channel topic
     * channel.setTopic('Needs more rate limiting')
     *   .then(updated => console.log(`Channel's new topic is ${updated.topic}`))
     *   .catch(console.error);
     */
    setTopic(topic, reason) {
      return this.edit({ topic }, reason);
    }
  
    /**
     * Create an invite to this guild channel.
     * <warn>This is only available when using a bot account.</warn>
     * @param {Object} [options={}] Options for the invite
     * @param {boolean} [options.temporary=false] Whether members that joined via the invite should be automatically
     * kicked after 24 hours if they have not yet received a role
     * @param {number} [options.maxAge=86400] How long the invite should last (in seconds, 0 for forever)
     * @param {number} [options.maxUses=0] Maximum number of uses
     * @param {boolean} [options.unique=false] Create a unique invite, or use an existing one with similar settings
     * @param {string} [reason] Reason for creating the invite
     * @returns {Promise<Invite>}
     * @example
     * // Create an invite to a channel
     * channel.createInvite()
     *   .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
     *   .catch(console.error);
     */
    createInvite(options = {}, reason) {
      return this.client.rest.methods.createChannelInvite(this, options, reason);
    }
  
    /**
     * Clone this channel.
     * @param {string} [name=this.name] Optional name for the new channel, otherwise it has the name of this channel
     * @param {boolean} [withPermissions=true] Whether to clone the channel with this channel's permission overwrites
     * @param {boolean} [withTopic=true] Whether to clone the channel with this channel's topic
     * @param {string} [reason] Reason for cloning this channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // Clone a channel
     * channel.clone(undefined, true, false, 'Needed a clone')
     *   .then(clone => console.log(`Cloned ${channel.name} to make a channel called ${clone.name}`))
     *   .catch(console.error);
     */
    clone(name = this.name, withPermissions = true, withTopic = true, reason) {
      return this.guild.createChannel(name, this.type, withPermissions ? this.permissionOverwrites : [], reason)
        .then(channel => withTopic ? channel.setTopic(this.topic) : channel);
    }
  
    /**
     * Fetches a collection of invites to this guild channel.
     * Resolves with a collection mapping invites by their codes.
     * @returns {Promise<Collection<string, Invite>>}
     */
    fetchInvites() {
      return this.client.rest.makeRequest('get', Constants.Endpoints.Channel(this.id).invites, true)
        .then(data => {
          const invites = new Collection();
          for (let invite of data) {
            invite = new Invite(this.client, invite);
            invites.set(invite.code, invite);
          }
  
          return invites;
        });
    }
  
    /**
     * Deletes this channel.
     * @param {string} [reason] Reason for deleting this channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // Delete the channel
     * channel.delete('Making room for new channels')
     *   .then(deleted => console.log(`Deleted ${deleted.name} to make room for new channels`))
     *   .catch(console.error);
     */
    delete(reason) {
      return this.client.rest.methods.deleteChannel(this, reason);
    }
  
    /**
     * Checks if this channel has the same type, topic, position, name, overwrites and ID as another channel.
     * In most cases, a simple `channel.id === channel2.id` will do, and is much faster too.
     * @param {GuildChannel} channel Channel to compare with
     * @returns {boolean}
     */
    equals(channel) {
      let equal = channel &&
        this.id === channel.id &&
        this.type === channel.type &&
        this.topic === channel.topic &&
        this.position === channel.position &&
        this.name === channel.name;
  
      if (equal) {
        if (this.permissionOverwrites && channel.permissionOverwrites) {
          equal = this.permissionOverwrites.equals(channel.permissionOverwrites);
        } else {
          equal = !this.permissionOverwrites && !channel.permissionOverwrites;
        }
      }
  
      return equal;
    }
  
    /**
     * Whether the channel is deletable by the client user
     * @type {boolean}
     * @readonly
     */
    get deletable() {
      return this.id !== this.guild.id &&
        this.permissionsFor(this.client.user).has(Permissions.FLAGS.MANAGE_CHANNELS);
    }
  
    /**
     * Whether the channel is manageable by the client user
     * @type {boolean}
     * @readonly
     */
    get manageable() {
      if (this.client.user.id === this.guild.ownerID) return true;
      const permissions = this.permissionsFor(this.client.user);
      if (!permissions) return false;
      return permissions.has([Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.VIEW_CHANNEL]);
    }
  
    /**
     * Whether the channel is muted
     * <warn>This is only available when using a user account.</warn>
     * @type {?boolean}
     * @readonly
     */
    get muted() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.guild.id).channelOverrides.get(this.id).muted;
      } catch (err) {
        return false;
      }
    }
  
    /**
     * The type of message that should notify you
     * <warn>This is only available when using a user account.</warn>
     * @type {?MessageNotificationType}
     * @readonly
     */
    get messageNotifications() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.guild.id).channelOverrides.get(this.id).messageNotifications;
      } catch (err) {
        return Constants.MessageNotificationTypes[3];
      }
    }
  
    /**
     * When concatenated with a string, this automatically returns the channel's mention instead of the Channel object.
     * @returns {string}
     * @example
     * // Logs: Hello from <#123456789012345678>
     * console.log(`Hello from ${channel}`);
     * @example
     * // Logs: Hello from <#123456789012345678>
     * console.log('Hello from ' + channel);
     */
    toString() {
      return `<#${this.id}>`;
    }
  }
  
  module.exports = GuildChannel;
  
  
  /***/ }),
  /* 20 */
  /***/ (function(module, exports) {
  
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  
  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;
  
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  
  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;
  
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };
  
  EventEmitter.prototype.emit = function(type) {
    var er, handler, len, args, i, listeners;
  
    if (!this._events)
      this._events = {};
  
    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error ||
          (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
      }
    }
  
    handler = this._events[type];
  
    if (isUndefined(handler))
      return false;
  
    if (isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
  
    return true;
  };
  
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
  
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    if (!this._events)
      this._events = {};
  
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener)
      this.emit('newListener', type,
                isFunction(listener.listener) ?
                listener.listener : listener);
  
    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      // If we've already got an array, just append.
      this._events[type].push(listener);
    else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
  
    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
  
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        if (typeof console.trace === 'function') {
          // not supported in IE 10
          console.trace();
        }
      }
    }
  
    return this;
  };
  
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  
  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    var fired = false;
  
    function g() {
      this.removeListener(type, g);
  
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
  
    g.listener = listener;
    this.on(type, g);
  
    return this;
  };
  
  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list, position, length, i;
  
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    if (!this._events || !this._events[type])
      return this;
  
    list = this._events[type];
    length = list.length;
    position = -1;
  
    if (list === listener ||
        (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
  
    } else if (isObject(list)) {
      for (i = length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
  
      if (position < 0)
        return this;
  
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
  
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }
  
    return this;
  };
  
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key, listeners;
  
    if (!this._events)
      return this;
  
    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }
  
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }
  
    listeners = this._events[type];
  
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
  
    return this;
  };
  
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  
  EventEmitter.prototype.listenerCount = function(type) {
    if (this._events) {
      var evlistener = this._events[type];
  
      if (isFunction(evlistener))
        return 1;
      else if (evlistener)
        return evlistener.length;
    }
    return 0;
  };
  
  EventEmitter.listenerCount = function(emitter, type) {
    return emitter.listenerCount(type);
  };
  
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  
  function isUndefined(arg) {
    return arg === void 0;
  }
  
  
  /***/ }),
  /* 21 */
  /***/ (function(module, exports) {
  
  /**
   * Represents an attachment in a message.
   * @param {BufferResolvable|Stream} file The file
   * @param {string} [name] The name of the file, if any
   */
  class Attachment {
    constructor(file, name) {
      this.file = null;
      if (name) this.setAttachment(file, name);
      else this._attach(file);
    }
  
    /**
      * The name of the file
      * @type {?string}
      * @readonly
      */
    get name() {
      return this.file.name;
    }
  
    /**
      * The file
      * @type {?BufferResolvable|Stream}
      * @readonly
      */
    get attachment() {
      return this.file.attachment;
    }
  
    /**
      * Set the file of this attachment.
      * @param {BufferResolvable|Stream} file The file
      * @param {string} name The name of the file
      * @returns {Attachment} This attachment
      */
    setAttachment(file, name) {
      this.file = { attachment: file, name };
      return this;
    }
  
    /**
      * Set the file of this attachment.
      * @param {BufferResolvable|Stream} attachment The file
      * @returns {Attachment} This attachment
      */
    setFile(attachment) {
      this.file = { attachment };
      return this;
    }
  
    /**
      * Set the name of this attachment.
      * @param {string} name The name of the image
      * @returns {Attachment} This attachment
      */
    setName(name) {
      this.file.name = name;
      return this;
    }
  
    /**
      * Set the file of this attachment.
      * @param {BufferResolvable|Stream} file The file
      * @param {string} name The name of the file
      * @returns {void}
      * @private
      */
    _attach(file, name) {
      if (typeof file === 'string') this.file = file;
      else this.setAttachment(file, name);
    }
  }
  
  module.exports = Attachment;
  
  
  /***/ }),
  /* 22 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const util = __webpack_require__(6);
  const Long = __webpack_require__(26);
  const User = __webpack_require__(10);
  const Role = __webpack_require__(8);
  const Emoji = __webpack_require__(17);
  const Presence = __webpack_require__(11).Presence;
  const GuildMember = __webpack_require__(18);
  const Constants = __webpack_require__(0);
  const Collection = __webpack_require__(3);
  const Util = __webpack_require__(4);
  const Snowflake = __webpack_require__(7);
  
  /**
   * Represents a guild (or a server) on Discord.
   * <info>It's recommended to see if a guild is available before performing operations or reading data from it. You can
   * check this with `guild.available`.</info>
   */
  class Guild {
    constructor(client, data) {
      /**
       * The client that created the instance of the guild
       * @name Guild#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      /**
       * A collection of members that are in this guild. The key is the member's ID, the value is the member
       * @type {Collection<Snowflake, GuildMember>}
       */
      this.members = new Collection();
  
      /**
       * A collection of channels that are in this guild. The key is the channel's ID, the value is the channel
       * @type {Collection<Snowflake, GuildChannel>}
       */
      this.channels = new Collection();
  
      /**
       * A collection of roles that are in this guild. The key is the role's ID, the value is the role
       * @type {Collection<Snowflake, Role>}
       */
      this.roles = new Collection();
  
      /**
       * A collection of presences in this guild
       * @type {Collection<Snowflake, Presence>}
       */
      this.presences = new Collection();
  
      /**
       * Whether the bot has been removed from the guild
       * @type {boolean}
       */
      this.deleted = false;
  
      if (!data) return;
      if (data.unavailable) {
        /**
         * Whether the guild is available to access. If it is not available, it indicates a server outage
         * @type {boolean}
         */
        this.available = false;
  
        /**
         * The Unique ID of the guild, useful for comparisons
         * @type {Snowflake}
         */
        this.id = data.id;
      } else {
        this.setup(data);
        if (!data.channels) this.available = false;
      }
    }
  
    /* eslint-disable complexity */
    /**
     * Sets up the guild.
     * @param {*} data The raw data of the guild
     * @private
     */
    setup(data) {
      /**
       * The name of the guild
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The hash of the guild icon
       * @type {?string}
       */
      this.icon = data.icon;
  
      /**
       * The hash of the guild splash image (VIP only)
       * @type {?string}
       */
      this.splash = data.splash;
  
      /**
       * The region the guild is located in
       * @type {string}
       */
      this.region = data.region;
  
      /**
       * The full amount of members in this guild as of `READY`
       * @type {number}
       */
      this.memberCount = data.member_count || this.memberCount;
  
      /**
       * Whether the guild is "large" (has more than 250 members)
       * @type {boolean}
       */
      this.large = Boolean('large' in data ? data.large : this.large);
  
      /**
       * An array of guild features
       * @type {Object[]}
       */
      this.features = data.features;
  
      /**
       * The ID of the application that created this guild (if applicable)
       * @type {?Snowflake}
       */
      this.applicationID = data.application_id;
  
      /**
       * The time in seconds before a user is counted as "away from keyboard"
       * @type {?number}
       */
      this.afkTimeout = data.afk_timeout;
  
      /**
       * The ID of the voice channel where AFK members are moved
       * @type {?string}
       */
      this.afkChannelID = data.afk_channel_id;
  
      /**
       * The ID of the system channel
       * @type {?Snowflake}
       */
      this.systemChannelID = data.system_channel_id;
  
      /**
       * Whether embedded images are enabled on this guild
       * @type {boolean}
       */
      this.embedEnabled = data.embed_enabled;
  
      /**
       * The verification level of the guild
       * @type {number}
       */
      this.verificationLevel = data.verification_level;
  
      /**
       * The explicit content filter level of the guild
       * @type {number}
       */
      this.explicitContentFilter = data.explicit_content_filter;
  
      /**
       * The required MFA level for the guild
       * @type {number}
       */
      this.mfaLevel = data.mfa_level;
  
      /**
       * The timestamp the client user joined the guild at
       * @type {number}
       */
      this.joinedTimestamp = data.joined_at ? new Date(data.joined_at).getTime() : this.joinedTimestamp;
  
      /**
       * The value set for a guild's default message notifications
       * @type {DefaultMessageNotifications|number}
       */
      this.defaultMessageNotifications = Constants.DefaultMessageNotifications[data.default_message_notifications] ||
        data.default_message_notifications;
  
      this.id = data.id;
      this.available = !data.unavailable;
      this.features = data.features || this.features || [];
  
      if (data.members) {
        this.members.clear();
        for (const guildUser of data.members) this._addMember(guildUser, false);
      }
  
      if (data.owner_id) {
        /**
         * The user ID of this guild's owner
         * @type {Snowflake}
         */
        this.ownerID = data.owner_id;
      }
  
      if (data.channels) {
        this.channels.clear();
        for (const channel of data.channels) this.client.dataManager.newChannel(channel, this);
      }
  
      if (data.roles) {
        this.roles.clear();
        for (const role of data.roles) {
          const newRole = new Role(this, role);
          this.roles.set(newRole.id, newRole);
        }
      }
  
      if (data.presences) {
        for (const presence of data.presences) {
          this._setPresence(presence.user.id, presence);
        }
      }
  
      this._rawVoiceStates = new Collection();
      if (data.voice_states) {
        for (const voiceState of data.voice_states) {
          this._rawVoiceStates.set(voiceState.user_id, voiceState);
          const member = this.members.get(voiceState.user_id);
          if (member) {
            member.serverMute = voiceState.mute;
            member.serverDeaf = voiceState.deaf;
            member.selfMute = voiceState.self_mute;
            member.selfDeaf = voiceState.self_deaf;
            member.voiceSessionID = voiceState.session_id;
            member.voiceChannelID = voiceState.channel_id;
            this.channels.get(voiceState.channel_id).members.set(member.user.id, member);
          }
        }
      }
  
      if (!this.emojis) {
        /**
         * A collection of emojis that are in this guild
         * The key is the emoji's ID, the value is the emoji
         * @type {Collection<Snowflake, Emoji>}
         */
        this.emojis = new Collection();
        for (const emoji of data.emojis) this.emojis.set(emoji.id, new Emoji(this, emoji));
      } else {
        this.client.actions.GuildEmojisUpdate.handle({
          guild_id: this.id,
          emojis: data.emojis,
        });
      }
    }
  
    /**
     * The timestamp the guild was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the guild was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The time the client user joined the guild
     * @type {Date}
     * @readonly
     */
    get joinedAt() {
      return new Date(this.joinedTimestamp);
    }
  
    /**
     * If this guild is verified
     * @type {boolean}
     * @readonly
     */
    get verified() {
      return this.features.includes('VERIFIED');
    }
  
    /**
     * The URL to this guild's icon
     * @type {?string}
     * @readonly
     */
    get iconURL() {
      if (!this.icon) return null;
      return Constants.Endpoints.Guild(this).Icon(this.client.options.http.cdn, this.icon);
    }
  
    /**
     * The acronym that shows up in place of a guild icon.
     * @type {string}
     * @readonly
     */
    get nameAcronym() {
      return this.name.replace(/\w+/g, name => name[0]).replace(/\s/g, '');
    }
  
    /**
     * The URL to this guild's splash
     * @type {?string}
     * @readonly
     */
    get splashURL() {
      if (!this.splash) return null;
      return Constants.Endpoints.Guild(this).Splash(this.client.options.http.cdn, this.splash);
    }
  
    /**
     * The owner of the guild
     * @type {?GuildMember}
     * @readonly
     */
    get owner() {
      return this.members.get(this.ownerID);
    }
  
    /**
     * AFK voice channel for this guild
     * @type {?VoiceChannel}
     * @readonly
     */
    get afkChannel() {
      return this.client.channels.get(this.afkChannelID) || null;
    }
  
    /**
     * System channel for this guild
     * @type {?GuildChannel}
     * @readonly
     */
    get systemChannel() {
      return this.client.channels.get(this.systemChannelID) || null;
    }
  
    /**
     * If the client is connected to any voice channel in this guild, this will be the relevant VoiceConnection
     * @type {?VoiceConnection}
     * @readonly
     */
    get voiceConnection() {
      if (this.client.browser) return null;
      return this.client.voice.connections.get(this.id) || null;
    }
  
    /**
     * The position of this guild
     * <warn>This is only available when using a user account.</warn>
     * @type {?number}
     * @readonly
     */
    get position() {
      if (this.client.user.bot) return null;
      if (!this.client.user.settings.guildPositions) return null;
      return this.client.user.settings.guildPositions.indexOf(this.id);
    }
  
    /**
     * Whether the guild is muted
     * <warn>This is only available when using a user account.</warn>
     * @type {?boolean}
     * @readonly
     */
    get muted() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.id).muted;
      } catch (err) {
        return false;
      }
    }
  
    /**
     * The type of message that should notify you
     * <warn>This is only available when using a user account.</warn>
     * @type {?MessageNotificationType}
     * @readonly
     */
    get messageNotifications() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.id).messageNotifications;
      } catch (err) {
        return null;
      }
    }
  
    /**
     * Whether to receive mobile push notifications
     * <warn>This is only available when using a user account.</warn>
     * @type {?boolean}
     * @readonly
     */
    get mobilePush() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.id).mobilePush;
      } catch (err) {
        return false;
      }
    }
  
    /**
     * Whether to suppress everyone messages
     * <warn>This is only available when using a user account.</warn>
     * @type {?boolean}
     * @readonly
     */
    get suppressEveryone() {
      if (this.client.user.bot) return null;
      try {
        return this.client.user.guildSettings.get(this.id).suppressEveryone;
      } catch (err) {
        return null;
      }
    }
  
    /**
     * The `@everyone` role of the guild
     * @type {Role}
     * @readonly
     */
    get defaultRole() {
      return this.roles.get(this.id);
    }
  
    /**
     * The client user as a GuildMember of this guild
     * @type {?GuildMember}
     * @readonly
     */
    get me() {
      return this.members.get(this.client.user.id);
    }
  
    /**
     * Fetches a collection of roles in the current guild sorted by position
     * @type {Collection<Snowflake, Role>}
     * @readonly
     * @private
     */
    get _sortedRoles() {
      return this._sortPositionWithID(this.roles);
    }
  
    /**
     * Returns the GuildMember form of a User object, if the user is present in the guild.
     * @param {UserResolvable} user The user that you want to obtain the GuildMember of
     * @returns {?GuildMember}
     * @example
     * // Get the guild member of a user
     * const member = guild.member(message.author);
     */
    member(user) {
      return this.client.resolver.resolveGuildMember(this, user);
    }
  
    /**
     * Fetch a collection of banned users in this guild.
     * @returns {Promise<Collection<Snowflake, User>>}
     * @example
     * // Fetch bans in guild
     * guild.fetchBans()
     *   .then(bans => console.log(`This guild has ${bans.size} bans`))
     *   .catch(console.error);
     */
    fetchBans() {
      return this.client.rest.methods.getGuildBans(this)
        .then(bans => {
          const users = new Collection();
          for (const ban of bans.values()) users.set(ban.user.id, ban.user);
          return users;
        });
    }
  
    /**
     * Fetch a collection of invites to this guild.
     * Resolves with a collection mapping invites by their codes.
     * @returns {Promise<Collection<string, Invite>>}
     * @example
     * // Fetch invites
     * guild.fetchInvites()
     *   .then(invites => console.log(`Fetched ${invites.size} invites`))
     *   .catch(console.error);
     * @example
     * // Fetch invite creator by their id
     * guild.fetchInvites()
     *  .then(invites => console.log(invites.find(invite => invite.inviter.id === '84484653687267328')))
     *  .catch(console.error);
     */
    fetchInvites() {
      return this.client.rest.methods.getGuildInvites(this);
    }
  
    /**
     * Fetch all webhooks for the guild.
     * @returns {Promise<Collection<Snowflake, Webhook>>}
     * @example
     * // Fetch webhooks
     * guild.fetchWebhooks()
     *   .then(webhooks => console.log(`Fetched ${webhooks.size} webhooks`))
     *   .catch(console.error);
     */
    fetchWebhooks() {
      return this.client.rest.methods.getGuildWebhooks(this);
    }
  
    /**
     * Fetch available voice regions.
     * @returns {Promise<Collection<string, VoiceRegion>>}
     * @example
     * // Fetch voice regions
     * guild.fetchVoiceRegions()
     *   .then(console.log)
     *   .catch(console.error);
     */
    fetchVoiceRegions() {
      return this.client.rest.methods.fetchVoiceRegions(this.id);
    }
  
    /**
     * Fetch audit logs for this guild.
     * @param {Object} [options={}] Options for fetching audit logs
     * @param {Snowflake|GuildAuditLogsEntry} [options.before] Limit to entries from before specified entry
     * @param {Snowflake|GuildAuditLogsEntry} [options.after] Limit to entries from after specified entry
     * @param {number} [options.limit] Limit number of entries
     * @param {UserResolvable} [options.user] Only show entries involving this user
     * @param {string|number} [options.type] Only show entries involving this action type
     * @returns {Promise<GuildAuditLogs>}
     * @example
     * // Output audit log entries
     * guild.fetchAuditLogs()
     *   .then(audit => console.log(audit.entries.first()))
     *   .catch(console.error);
     */
    fetchAuditLogs(options) {
      return this.client.rest.methods.getGuildAuditLogs(this, options);
    }
  
    /**
     * Adds a user to the guild using OAuth2. Requires the `CREATE_INSTANT_INVITE` permission.
     * @param {UserResolvable} user User to add to the guild
     * @param {Object} options Options for the addition
     * @param {string} options.accessToken An OAuth2 access token for the user with the `guilds.join` scope granted to the
     * bot's application
     * @param {string} [options.nick] Nickname to give the member (requires `MANAGE_NICKNAMES`)
     * @param {Collection<Snowflake, Role>|Role[]|Snowflake[]} [options.roles] Roles to add to the member
     * (requires `MANAGE_ROLES`)
     * @param {boolean} [options.mute] Whether the member should be muted (requires `MUTE_MEMBERS`)
     * @param {boolean} [options.deaf] Whether the member should be deafened (requires `DEAFEN_MEMBERS`)
     * @returns {Promise<GuildMember>}
     */
    addMember(user, options) {
      if (this.members.has(user.id)) return Promise.resolve(this.members.get(user.id));
      return this.client.rest.methods.putGuildMember(this, user, options);
    }
  
    /**
     * Fetch a single guild member from a user.
     * @param {UserResolvable} user The user to fetch the member for
     * @param {boolean} [cache=true] Insert the member into the members cache
     * @returns {Promise<GuildMember>}
     * @example
     * // Fetch a guild member
     * guild.fetchMember(message.author)
     *   .then(console.log)
     *   .catch(console.error);
     */
    fetchMember(user, cache = true) {
      user = this.client.resolver.resolveUser(user);
      if (!user) return Promise.reject(new Error('Invalid or uncached id provided.'));
      const member = this.members.get(user.id);
      if (member && member.joinedTimestamp) return Promise.resolve(member);
      return this.client.rest.methods.getGuildMember(this, user, cache);
    }
  
    /**
     * Fetches all the members in the guild, even if they are offline. If the guild has less than 250 members,
     * this should not be necessary.
     * @param {string} [query=''] Limit fetch to members with similar usernames
     * @param {number} [limit=0] Maximum number of members to request
     * @returns {Promise<Guild>}
     * @example
     * // Fetch guild members
     * guild.fetchMembers()
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetches a maximum of 1 member with the given query
     * guild.fetchMembers('hydrabolt', 1)
     *   .then(console.log)
     *   .catch(console.error);
     */
    fetchMembers(query = '', limit = 0) {
      return new Promise((resolve, reject) => {
        if (this.memberCount === this.members.size) {
          resolve(this);
          return;
        }
        this.client.ws.send({
          op: Constants.OPCodes.REQUEST_GUILD_MEMBERS,
          d: {
            guild_id: this.id,
            query,
            limit,
          },
        });
        const handler = (members, guild) => {
          if (guild.id !== this.id) return;
          if (this.memberCount === this.members.size || members.length < 1000) {
            this.client.removeListener(Constants.Events.GUILD_MEMBERS_CHUNK, handler);
            resolve(this);
          }
        };
        this.client.on(Constants.Events.GUILD_MEMBERS_CHUNK, handler);
        this.client.setTimeout(() => reject(new Error('Members didn\'t arrive in time.')), 120 * 1000);
      });
    }
  
    /**
     * Performs a search within the entire guild.
     * <warn>This is only available when using a user account.</warn>
     * @param {MessageSearchOptions} [options={}] Options to pass to the search
     * @returns {Promise<MessageSearchResult>}
     * @example
     * guild.search({
     *   content: 'discord.js',
     *   before: '2016-11-17'
     * })
     *   .then(res => {
     *     const hit = res.messages[0].find(m => m.hit).content;
     *     console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
     *   })
     *   .catch(console.error);
     */
    search(options = {}) {
      return this.client.rest.methods.search(this, options);
    }
  
    /**
     * The data for editing a guild.
     * @typedef {Object} GuildEditData
     * @property {string} [name] The name of the guild
     * @property {string} [region] The region of the guild
     * @property {number} [verificationLevel] The verification level of the guild
     * @property {number} [explicitContentFilter] The level of the explicit content filter
     * @property {ChannelResolvable} [afkChannel] The AFK channel of the guild
     * @property {ChannelResolvable} [systemChannel] The system channel of the guild
     * @property {number} [afkTimeout] The AFK timeout of the guild
     * @property {Base64Resolvable} [icon] The icon of the guild
     * @property {GuildMemberResolvable} [owner] The owner of the guild
     * @property {Base64Resolvable} [splash] The splash screen of the guild
     */
  
    /**
     * Updates the guild with new information - e.g. a new name.
     * @param {GuildEditData} data The data to update the guild with
     * @param {string} [reason] Reason for editing the guild
     * @returns {Promise<Guild>}
     * @example
     * // Set the guild name and region
     * guild.edit({
     *   name: 'Discord Guild',
     *   region: 'london',
     * })
     *   .then(g => console.log(`Changed guild name to ${g} and region to ${g.region}`))
     *   .catch(console.error);
     */
    edit(data, reason) {
      const _data = {};
      if (data.name) _data.name = data.name;
      if (data.region) _data.region = data.region;
      if (typeof data.verificationLevel !== 'undefined') _data.verification_level = Number(data.verificationLevel);
      if (typeof data.afkChannel !== 'undefined') {
        _data.afk_channel_id = this.client.resolver.resolveChannelID(data.afkChannel);
      }
      if (typeof data.systemChannel !== 'undefined') {
        _data.system_channel_id = this.client.resolver.resolveChannelID(data.systemChannel);
      }
      if (data.afkTimeout) _data.afk_timeout = Number(data.afkTimeout);
      if (typeof data.icon !== 'undefined') _data.icon = data.icon;
      if (data.owner) _data.owner_id = this.client.resolver.resolveUser(data.owner).id;
      if (typeof data.splash !== 'undefined') _data.splash = data.splash;
      if (typeof data.explicitContentFilter !== 'undefined') {
        _data.explicit_content_filter = Number(data.explicitContentFilter);
      }
      if (typeof data.defaultMessageNotifications !== 'undefined') {
        _data.default_message_notifications = typeof data.defaultMessageNotifications === 'string' ?
          Constants.DefaultMessageNotifications.indexOf(data.defaultMessageNotifications) :
          Number(data.defaultMessageNotifications);
      }
      return this.client.rest.methods.updateGuild(this, _data, reason);
    }
  
    /**
     * Edit the level of the explicit content filter.
     * @param {number} explicitContentFilter The new level of the explicit content filter
     * @param {string} [reason] Reason for changing the level of the guild's explicit content filter
     * @returns {Promise<Guild>}
     */
    setExplicitContentFilter(explicitContentFilter, reason) {
      return this.edit({ explicitContentFilter }, reason);
    }
  
    /**
     * Edits the setting of the default message notifications of the guild.
     * @param {DefaultMessageNotifications|number} defaultMessageNotifications
     * The new setting for the default message notifications
     * @param {string} [reason] Reason for changing the setting of the default message notifications
     * @returns {Promise<Guild>}
     */
    setDefaultMessageNotifications(defaultMessageNotifications, reason) {
      return this.edit({ defaultMessageNotifications }, reason);
    }
  
    /**
     * Edit the name of the guild.
     * @param {string} name The new name of the guild
     * @param {string} [reason] Reason for changing the guild's name
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild name
     * guild.setName('Discord Guild')
     *  .then(g => console.log(`Updated guild name to ${g}`))
     *  .catch(console.error);
     */
    setName(name, reason) {
      return this.edit({ name }, reason);
    }
  
    /**
     * Edit the region of the guild.
     * @param {string} region The new region of the guild
     * @param {string} [reason] Reason for changing the guild's region
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild region
     * guild.setRegion('london')
     *  .then(g => console.log(`Updated guild region to ${g.region}`))
     *  .catch(console.error);
     */
    setRegion(region, reason) {
      return this.edit({ region }, reason);
    }
  
    /**
     * Edit the verification level of the guild.
     * @param {number} verificationLevel The new verification level of the guild
     * @param {string} [reason] Reason for changing the guild's verification level
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild verification level
     * guild.setVerificationLevel(1)
     *  .then(g => console.log(`Updated guild verification level to ${g.verificationLevel}`))
     *  .catch(console.error);
     */
    setVerificationLevel(verificationLevel, reason) {
      return this.edit({ verificationLevel }, reason);
    }
  
    /**
     * Edit the AFK channel of the guild.
     * @param {ChannelResolvable} afkChannel The new AFK channel
     * @param {string} [reason] Reason for changing the guild's AFK channel
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild AFK channel
     * guild.setAFKChannel(channel)
     *  .then(g => console.log(`Updated guild AFK channel to ${g.afkChannel.name}`))
     *  .catch(console.error);
     */
    setAFKChannel(afkChannel, reason) {
      return this.edit({ afkChannel }, reason);
    }
  
    /**
     * Edit the system channel of the guild.
     * @param {ChannelResolvable} systemChannel The new system channel
     * @param {string} [reason] Reason for changing the guild's system channel
     * @returns {Promise<Guild>}
     */
    setSystemChannel(systemChannel, reason) {
      return this.edit({ systemChannel }, reason);
    }
  
    /**
     * Edit the AFK timeout of the guild.
     * @param {number} afkTimeout The time in seconds that a user must be idle to be considered AFK
     * @param {string} [reason] Reason for changing the guild's AFK timeout
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild AFK channel
     * guild.setAFKTimeout(60)
     *  .then(g => console.log(`Updated guild AFK timeout to ${g.afkTimeout}`))
     *  .catch(console.error);
     */
    setAFKTimeout(afkTimeout, reason) {
      return this.edit({ afkTimeout }, reason);
    }
  
    /**
     * Set a new guild icon.
     * @param {Base64Resolvable|BufferResolvable} icon The new icon of the guild
     * @param {string} [reason] Reason for changing the guild's icon
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild icon
     * guild.setIcon('./icon.png')
     *  .then(console.log)
     *  .catch(console.error);
     */
    setIcon(icon, reason) {
      return this.client.resolver.resolveImage(icon).then(data => this.edit({ icon: data, reason }));
    }
  
    /**
     * Sets a new owner of the guild.
     * @param {GuildMemberResolvable} owner The new owner of the guild
     * @param {string} [reason] Reason for setting the new owner
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild owner
     * guild.setOwner(guild.members.first())
     *  .then(g => console.log(`Updated the guild owner to ${g.owner.displayName}`))
     *  .catch(console.error);
     */
    setOwner(owner, reason) {
      return this.edit({ owner }, reason);
    }
  
    /**
     * Set a new guild splash screen.
     * @param {BufferResolvable|Base64Resolvable} splash The new splash screen of the guild
     * @param {string} [reason] Reason for changing the guild's splash screen
     * @returns {Promise<Guild>}
     * @example
     * // Edit the guild splash
     * guild.setSplash('./splash.png')
     *  .then(console.log)
     *  .catch(console.error);
     */
    setSplash(splash) {
      return this.client.resolver.resolveImage(splash).then(data => this.edit({ splash: data }));
    }
  
    /**
     * Sets the position of the guild in the guild listing.
     * <warn>This is only available when using a user account.</warn>
     * @param {number} position Absolute or relative position
     * @param {boolean} [relative=false] Whether to position relatively or absolutely
     * @returns {Promise<Guild>}
     */
    setPosition(position, relative) {
      if (this.client.user.bot) {
        return Promise.reject(new Error('Setting guild position is only available for user accounts'));
      }
      return this.client.user.settings.setGuildPosition(this, position, relative);
    }
  
    /**
     * Marks all messages in this guild as read.
     * <warn>This is only available when using a user account.</warn>
     * @returns {Promise<Guild>}
     */
    acknowledge() {
      return this.client.rest.methods.ackGuild(this);
    }
  
    /**
     * Allow direct messages from guild members.
     * <warn>This is only available when using a user account.</warn>
     * @param {boolean} allow Whether to allow direct messages
     * @returns {Promise<Guild>}
     */
    allowDMs(allow) {
      const settings = this.client.user.settings;
      if (allow) return settings.removeRestrictedGuild(this);
      else return settings.addRestrictedGuild(this);
    }
  
    /**
     * Bans a user from the guild.
     * @param {UserResolvable} user The user to ban
     * @param {Object|number|string} [options] Ban options. If a number, the number of days to delete messages for, if a
     * string, the ban reason. Supplying an object allows you to do both.
     * @param {number} [options.days=0] Number of days of messages to delete
     * @param {string} [options.reason] Reason for banning
     * @returns {Promise<GuildMember|User|string>} Result object will be resolved as specifically as possible.
     * If the GuildMember cannot be resolved, the User will instead be attempted to be resolved. If that also cannot
     * be resolved, the user ID will be the result.
     * @example
     * // Ban a user by ID
     * guild.ban('some user ID')
     *   .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild}`))
     *   .catch(console.error);
     * @example
     * // Ban a user by object with reason and days
     * guild.ban(user, { days: 7, reason: 'He needed to go' })
     *   .then(console.log)
     *   .catch(console.error);
     */
    ban(user, options = {}) {
      if (typeof options === 'number') {
        options = { reason: null, 'delete-message-days': options };
      } else if (typeof options === 'string') {
        options = { reason: options, 'delete-message-days': 0 };
      }
      if (options.days) options['delete-message-days'] = options.days;
      return this.client.rest.methods.banGuildMember(this, user, options);
    }
  
    /**
     * Unbans a user from the guild.
     * @param {UserResolvable} user The user to unban
     * @param {string} [reason] Reason for unbanning the user
     * @returns {Promise<User>}
     * @example
     * // Unban a user by ID (or with a user/guild member object)
     * guild.unban('some user ID')
     *   .then(user => console.log(`Unbanned ${user.username} from ${guild}`))
     *   .catch(console.error);
     */
    unban(user, reason) {
      return this.client.rest.methods.unbanGuildMember(this, user, reason);
    }
  
    /**
     * Prunes members from the guild based on how long they have been inactive.
     * @param {number} days Number of days of inactivity required to kick
     * @param {boolean} [dry=false] If true, will return number of users that will be kicked, without actually doing it
     * @param {string} [reason] Reason for this prune
     * @returns {Promise<number>} The number of members that were/will be kicked
     * @example
     * // See how many members will be pruned
     * guild.pruneMembers(12, true)
     *   .then(pruned => console.log(`This will prune ${pruned} people!`))
     *   .catch(console.error);
     * @example
     * // Actually prune the members
     * guild.pruneMembers(12)
     *   .then(pruned => console.log(`I just pruned ${pruned} people!`))
     *   .catch(console.error);
     */
    pruneMembers(days, dry = false, reason) {
      if (typeof days !== 'number') throw new TypeError('Days must be a number.');
      return this.client.rest.methods.pruneGuildMembers(this, days, dry, reason);
    }
  
    /**
     * Syncs this guild (already done automatically every 30 seconds).
     * <warn>This is only available when using a user account.</warn>
     */
    sync() {
      if (!this.client.user.bot) this.client.syncGuilds([this]);
    }
  
    /**
     * Overwrites to use when creating a channel or replacing overwrites
     * @typedef {Object} ChannelCreationOverwrites
     * @property {PermissionResolvable} [allow] The permissions to allow
     * **(deprecated)**
     * @property {PermissionResolvable} [allowed] The permissions to allow
     * @property {PermissionResolvable} [deny] The permissions to deny
     * **(deprecated)**
     * @property {PermissionResolvable} [denied] The permissions to deny
     * @property {GuildMemberResolvable|RoleResolvable} memberOrRole Member or role this overwrite is for
     */
  
    /**
     * Creates a new channel in the guild.
     * @param {string} name The name of the new channel
     * @param {string} [type='text'] The type of the new channel, either `text` or `voice` or `category`
     * @param {ChannelCreationOverwrites[]|Collection<Snowflake, PermissionOverwrites>} [overwrites] Permission overwrites
     * @param {string} [reason] Reason for creating this channel
     * @returns {Promise<CategoryChannel|TextChannel|VoiceChannel>}
     * @example
     * // Create a new text channel
     * guild.createChannel('new-general', 'text')
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Create a new category channel with permission overwrites
     * guild.createChannel('new-category', 'category', [{
     *   id: guild.id,
     *   deny: ['MANAGE_MESSAGES'],
     *   allow: ['SEND_MESSAGES']
     * }])
     *   .then(console.log)
     *   .catch(console.error);
     */
    createChannel(name, type, overwrites, reason) {
      return this.client.rest.methods.createChannel(this, name, type, overwrites, reason);
    }
  
    /**
     * The data needed for updating a channel's position.
     * @typedef {Object} ChannelPosition
     * @property {ChannelResolvable} channel Channel to update
     * @property {number} position New position for the channel
     */
  
    /**
     * Batch-updates the guild's channels' positions.
     * @param {ChannelPosition[]} channelPositions Channel positions to update
     * @returns {Promise<Guild>}
     * @example
     * guild.updateChannels([{ channel: channelID, position: newChannelIndex }])
     *   .then(g => console.log(`Updated channel positions for ${g}`))
     *   .catch(console.error);
     */
    setChannelPositions(channelPositions) {
      return this.client.rest.methods.updateChannelPositions(this.id, channelPositions);
    }
  
    /**
     * Creates a new role in the guild with given information.
     * @param {RoleData} [data] The data to update the role with
     * @param {string} [reason] Reason for creating this role
     * @returns {Promise<Role>}
     * @example
     * // Create a new role
     * guild.createRole()
     *   .then(role => console.log(`Created new role with name ${role.name}`))
     *   .catch(console.error);
     * @example
     * // Create a new role with data
     * guild.createRole({
     *   name: 'Super Cool People',
     *   color: 'BLUE',
     * })
     *   .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
     *   .catch(console.error)
     */
    createRole(data = {}, reason) {
      return this.client.rest.methods.createGuildRole(this, data, reason);
    }
  
    /**
     * Creates a new custom emoji in the guild.
     * @param {BufferResolvable|Base64Resolvable} attachment The image for the emoji
     * @param {string} name The name for the emoji
     * @param {Collection<Snowflake, Role>|Role[]} [roles] Roles to limit the emoji to
     * @param {string} [reason] Reason for creating the emoji
     * @returns {Promise<Emoji>} The created emoji
     * @example
     * // Create a new emoji from a url
     * guild.createEmoji('https://i.imgur.com/w3duR07.png', 'rip')
     *   .then(emoji => console.log(`Created new emoji with name ${emoji.name}`))
     *   .catch(console.error);
     * @example
     * // Create a new emoji from a file on your computer
     * guild.createEmoji('./memes/banana.png', 'banana')
     *   .then(emoji => console.log(`Created new emoji with name ${emoji.name}`))
     *   .catch(console.error);
     */
    createEmoji(attachment, name, roles, reason) {
      if (typeof attachment === 'string' && attachment.startsWith('data:')) {
        return this.client.rest.methods.createEmoji(this, attachment, name, roles, reason);
      } else {
        return this.client.resolver.resolveImage(attachment).then(data =>
          this.client.rest.methods.createEmoji(this, data, name, roles, reason)
        );
      }
    }
  
    /**
     * Delete an emoji.
     * @param {Emoji|string} emoji The emoji to delete
     * @param {string} [reason] Reason for deleting the emoji
     * @returns {Promise}
     */
    deleteEmoji(emoji, reason) {
      if (!(emoji instanceof Emoji)) emoji = this.emojis.get(emoji);
      return this.client.rest.methods.deleteEmoji(emoji, reason);
    }
  
    /**
     * Causes the client to leave the guild.
     * @returns {Promise<Guild>}
     * @example
     * // Leave a guild
     * guild.leave()
     *   .then(g => console.log(`Left the guild ${g}`))
     *   .catch(console.error);
     */
    leave() {
      return this.client.rest.methods.leaveGuild(this);
    }
  
    /**
     * Causes the client to delete the guild.
     * @returns {Promise<Guild>}
     * @example
     * // Delete a guild
     * guild.delete()
     *   .then(g => console.log(`Deleted the guild ${g}`))
     *   .catch(console.error);
     */
    delete() {
      return this.client.rest.methods.deleteGuild(this);
    }
  
    /**
     * Whether this guild equals another guild. It compares all properties, so for most operations
     * it is advisable to just compare `guild.id === guild2.id` as it is much faster and is often
     * what most users need.
     * @param {Guild} guild The guild to compare with
     * @returns {boolean}
     */
    equals(guild) {
      let equal =
        guild &&
        this.id === guild.id &&
        this.available === !guild.unavailable &&
        this.splash === guild.splash &&
        this.region === guild.region &&
        this.name === guild.name &&
        this.memberCount === guild.member_count &&
        this.large === guild.large &&
        this.icon === guild.icon &&
        Util.arraysEqual(this.features, guild.features) &&
        this.ownerID === guild.owner_id &&
        this.verificationLevel === guild.verification_level &&
        this.embedEnabled === guild.embed_enabled;
  
      if (equal) {
        if (this.embedChannel) {
          if (this.embedChannel.id !== guild.embed_channel_id) equal = false;
        } else if (guild.embed_channel_id) {
          equal = false;
        }
      }
  
      return equal;
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the guild's name instead of the guild object.
     * @returns {string}
     * @example
     * // Logs: Hello from My Guild!
     * console.log(`Hello from ${guild}!`);
     * @example
     * // Logs: Hello from My Guild!
     * console.log('Hello from ' + guild + '!');
     */
    toString() {
      return this.name;
    }
  
    _addMember(guildUser, emitEvent = true) {
      const existing = this.members.has(guildUser.user.id);
      if (!(guildUser.user instanceof User)) guildUser.user = this.client.dataManager.newUser(guildUser.user);
  
      guildUser.joined_at = guildUser.joined_at || 0;
      const member = new GuildMember(this, guildUser);
      this.members.set(member.id, member);
  
      if (this._rawVoiceStates && this._rawVoiceStates.has(member.user.id)) {
        const voiceState = this._rawVoiceStates.get(member.user.id);
        member.serverMute = voiceState.mute;
        member.serverDeaf = voiceState.deaf;
        member.selfMute = voiceState.self_mute;
        member.selfDeaf = voiceState.self_deaf;
        member.voiceSessionID = voiceState.session_id;
        member.voiceChannelID = voiceState.channel_id;
        if (this.client.channels.has(voiceState.channel_id)) {
          this.client.channels.get(voiceState.channel_id).members.set(member.user.id, member);
        } else {
          this.client.emit('warn', `Member ${member.id} added in guild ${this.id} with an uncached voice channel`);
        }
      }
  
      /**
       * Emitted whenever a user joins a guild.
       * @event Client#guildMemberAdd
       * @param {GuildMember} member The member that has joined a guild
       */
      if (this.client.ws.connection.status === Constants.Status.READY && emitEvent && !existing) {
        this.client.emit(Constants.Events.GUILD_MEMBER_ADD, member);
      }
  
      return member;
    }
  
    _updateMember(member, data) {
      const oldMember = Util.cloneObject(member);
  
      if (data.roles) member._roles = data.roles;
      if (typeof data.nick !== 'undefined') member.nickname = data.nick;
  
      const notSame = member.nickname !== oldMember.nickname || !Util.arraysEqual(member._roles, oldMember._roles);
  
      if (this.client.ws.connection.status === Constants.Status.READY && notSame) {
        /**
         * Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
         * @event Client#guildMemberUpdate
         * @param {GuildMember} oldMember The member before the update
         * @param {GuildMember} newMember The member after the update
         */
        this.client.emit(Constants.Events.GUILD_MEMBER_UPDATE, oldMember, member);
      }
  
      return {
        old: oldMember,
        mem: member,
      };
    }
  
    _removeMember(guildMember) {
      this.members.delete(guildMember.id);
    }
  
    _memberSpeakUpdate(user, speaking) {
      const member = this.members.get(user);
      if (member && member.speaking !== speaking) {
        member.speaking = speaking;
        /**
         * Emitted once a guild member starts/stops speaking.
         * @event Client#guildMemberSpeaking
         * @param {GuildMember} member The member that started/stopped speaking
         * @param {boolean} speaking Whether or not the member is speaking
         */
        this.client.emit(Constants.Events.GUILD_MEMBER_SPEAKING, member, speaking);
      }
    }
  
    _setPresence(id, presence) {
      if (this.presences.get(id)) {
        this.presences.get(id).update(presence);
        return;
      }
      this.presences.set(id, new Presence(presence, this.client));
    }
  
    /**
     * Set the position of a role in this guild.
     * @param {string|Role} role The role to edit, can be a role object or a role ID
     * @param {number} position The new position of the role
     * @param {boolean} [relative=false] Position Moves the role relative to its current position
     * @returns {Promise<Guild>}
     */
    setRolePosition(role, position, relative = false) {
      if (typeof role === 'string') {
        role = this.roles.get(role);
        if (!role) return Promise.reject(new Error('Supplied role is not a role or snowflake.'));
      }
  
      position = Number(position);
      if (isNaN(position)) return Promise.reject(new Error('Supplied position is not a number.'));
  
      let updatedRoles = this._sortedRoles.array();
  
      Util.moveElementInArray(updatedRoles, role, position, relative);
  
      updatedRoles = updatedRoles.map((r, i) => ({ id: r.id, position: i }));
      return this.client.rest.methods.setRolePositions(this.id, updatedRoles);
    }
  
    /**
     * Set the position of a channel in this guild.
     * @param {string|GuildChannel} channel The channel to edit, can be a channel object or a channel ID
     * @param {number} position The new position of the channel
     * @param {boolean} [relative=false] Position Moves the channel relative to its current position
     * @returns {Promise<Guild>}
     */
    setChannelPosition(channel, position, relative = false) {
      if (typeof channel === 'string') {
        channel = this.channels.get(channel);
        if (!channel) return Promise.reject(new Error('Supplied channel is not a channel or snowflake.'));
      }
  
      position = Number(position);
      if (isNaN(position)) return Promise.reject(new Error('Supplied position is not a number.'));
  
      let updatedChannels = this._sortedChannels(channel.type).array();
  
      Util.moveElementInArray(updatedChannels, channel, position, relative);
  
      updatedChannels = updatedChannels.map((r, i) => ({ id: r.id, position: i }));
      return this.client.rest.methods.setChannelPositions(this.id, updatedChannels);
    }
  
    /**
     * Fetches a collection of channels in the current guild sorted by position.
     * @param {string} type The channel type
     * @returns {Collection<Snowflake, GuildChannel>}
     * @private
     */
    _sortedChannels(type) {
      return this._sortPositionWithID(this.channels.filter(c => {
        if (type === 'voice' && c.type === 'voice') return true;
        else if (type !== 'voice' && c.type !== 'voice') return true;
        else return type === c.type;
      }));
    }
  
    /**
     * Sorts a collection by object position or ID if the positions are equivalent.
     * Intended to be identical to Discord's sorting method.
     * @param {Collection} collection The collection to sort
     * @returns {Collection}
     * @private
     */
    _sortPositionWithID(collection) {
      return collection.sort((a, b) =>
        a.position !== b.position ?
          a.position - b.position :
          Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber()
      );
    }
  }
  
  /**
   * The `#general` TextChannel of the guild
   * @name Guild#defaultChannel
   * @type {TextChannel}
   * @readonly
   * @deprecated
   */
  Object.defineProperty(Guild.prototype, 'defaultChannel', {
    get: util.deprecate(function defaultChannel() {
      return this.channels.get(this.id);
    }, 'Guild#defaultChannel: This property is obsolete, will be removed in v12.0.0, and may not function as expected.'),
  });
  
  Guild.prototype.acknowledge =
    util.deprecate(Guild.prototype.acknowledge, 'Guild#acknowledge: userbot methods will be removed');
  
  Guild.prototype.setPosition =
    util.deprecate(Guild.prototype.setPosition, 'Guild#setPosition: userbot methods will be removed');
  
  Guild.prototype.search =
    util.deprecate(Guild.prototype.search, 'Guild#search: userbot methods will be removed');
  
  Guild.prototype.sync =
    util.deprecate(Guild.prototype.sync, 'Guild#sync:, userbot methods will be removed');
  
  module.exports = Guild;
  
  
  /***/ }),
  /* 23 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const PartialGuild = __webpack_require__(45);
  const PartialGuildChannel = __webpack_require__(46);
  const Constants = __webpack_require__(0);
  
  /**
   * Represents an invitation to a guild channel.
   * <warn>The only guaranteed properties are `code`, `guild` and `channel`. Other properties can be missing.</warn>
   */
  class Invite {
    constructor(client, data) {
      /**
       * The client that instantiated the invite
       * @name Invite#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The guild the invite is for. If this guild is already known, this will be a guild object. If the guild is
       * unknown, this will be a PartialGuild object
       * @type {Guild|PartialGuild}
       */
      this.guild = this.client.guilds.get(data.guild.id) || new PartialGuild(this.client, data.guild);
  
      /**
       * The code for this invite
       * @type {string}
       */
      this.code = data.code;
  
      /**
       * The approximate number of online members of the guild this invite is for
       * @type {number}
       */
      this.presenceCount = data.approximate_presence_count;
  
      /**
       * The approximate total number of members of the guild this invite is for
       * @type {number}
       */
      this.memberCount = data.approximate_member_count;
  
      /**
       * The number of text channels the guild this invite goes to has
       * @type {number}
       */
      this.textChannelCount = data.guild.text_channel_count;
  
      /**
       * The number of voice channels the guild this invite goes to has
       * @type {number}
       */
      this.voiceChannelCount = data.guild.voice_channel_count;
  
      /**
       * Whether or not this invite is temporary
       * @type {boolean}
       */
      this.temporary = data.temporary;
  
      /**
       * The maximum age of the invite, in seconds
       * @type {?number}
       */
      this.maxAge = data.max_age;
  
      /**
       * How many times this invite has been used
       * @type {number}
       */
      this.uses = data.uses;
  
      /**
       * The maximum uses of this invite
       * @type {number}
       */
      this.maxUses = data.max_uses;
  
      if (data.inviter) {
        /**
         * The user who created this invite
         * @type {?User}
         */
        this.inviter = this.client.dataManager.newUser(data.inviter);
      }
  
      /**
       * The channel the invite is for. If this channel is already known, this will be a GuildChannel object.
       * If the channel is unknown, this will be a PartialGuildChannel object.
       * @type {GuildChannel|PartialGuildChannel}
       */
      this.channel = this.client.channels.get(data.channel.id) || new PartialGuildChannel(this.client, data.channel);
  
      /**
       * The timestamp the invite was created at
       * @type {number}
       */
      this.createdTimestamp = new Date(data.created_at).getTime();
    }
  
    /**
     * The time the invite was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The timestamp the invite will expire at
     * @type {number}
     * @readonly
     */
    get expiresTimestamp() {
      return this.createdTimestamp + (this.maxAge * 1000);
    }
  
    /**
     * The time the invite will expire
     * @type {Date}
     * @readonly
     */
    get expiresAt() {
      return new Date(this.expiresTimestamp);
    }
  
    /**
     * The URL to the invite
     * @type {string}
     * @readonly
     */
    get url() {
      return Constants.Endpoints.inviteLink(this.code);
    }
  
    /**
     * Deletes this invite.
     * @param {string} [reason] Reason for deleting this invite
     * @returns {Promise<Invite>}
     */
    delete(reason) {
      return this.client.rest.methods.deleteInvite(this, reason);
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the invite's URL instead of the object.
     * @returns {string}
     * @example
     * // Logs: Invite: https://discord.gg/A1b2C3
     * console.log(`Invite: ${invite}`);
     */
    toString() {
      return this.url;
    }
  }
  
  module.exports = Invite;
  
  
  /***/ }),
  /* 24 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(Buffer) {const path = __webpack_require__(29);
  const Util = __webpack_require__(4);
  const Attachment = __webpack_require__(21);
  const RichEmbed = __webpack_require__(14);
  
  /**
   * Represents a webhook.
   */
  class Webhook {
    constructor(client, dataOrID, token) {
      if (client) {
        /**
         * The client that instantiated the webhook
         * @name Webhook#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });
        if (dataOrID) this.setup(dataOrID);
      } else {
        this.id = dataOrID;
        this.token = token;
        Object.defineProperty(this, 'client', { value: this });
      }
    }
  
    setup(data) {
      /**
       * The name of the webhook
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The token for the webhook
       * @type {string}
       */
      Object.defineProperty(this, 'token', { value: data.token, writable: true, configurable: true });
  
      /**
       * The avatar for the webhook
       * @type {?string}
       */
      this.avatar = data.avatar;
  
      /**
       * The ID of the webhook
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The guild the webhook belongs to
       * @type {Snowflake}
       */
      this.guildID = data.guild_id;
  
      /**
       * The channel the webhook belongs to
       * @type {Snowflake}
       */
      this.channelID = data.channel_id;
  
      if (data.user) {
        /**
         * The owner of the webhook
         * @type {?User|Object}
         */
        this.owner = this.client.users ? this.client.users.get(data.user.id) : data.user;
      } else {
        this.owner = null;
      }
    }
  
    /**
     * Options that can be passed into send, sendMessage, sendFile, sendEmbed, and sendCode.
     * @typedef {Object} WebhookMessageOptions
     * @property {string} [username=this.name] Username override for the message
     * @property {string} [avatarURL] Avatar URL override for the message
     * @property {boolean} [tts=false] Whether or not the message should be spoken aloud
     * @property {string} [nonce=''] The nonce for the message
     * @property {Array<RichEmbed|Object>} [embeds] An array of embeds for the message
     * (see [here](https://discordapp.com/developers/docs/resources/channel#embed-object) for more details)
     * @property {boolean} [disableEveryone=this.client.options.disableEveryone] Whether or not @everyone and @here
     * should be replaced with plain-text
     * @property {FileOptions|BufferResolvable|Attachment} [file] A file to send with the message **(deprecated)**
     * @property {FileOptions[]|BufferResolvable[]|Attachment[]} [files] Files to send with the message
     * @property {string|boolean} [code] Language for optional codeblock formatting to apply
     * @property {boolean|SplitOptions} [split=false] Whether or not the message should be split into multiple messages if
     * it exceeds the character limit. If an object is provided, these are the options for splitting the message.
     */
  
    /**
     * Send a message with this webhook.
     * @param {StringResolvable} content The content to send
     * @param {WebhookMessageOptions|Attachment|RichEmbed} [options] The options to provide,
     * can also be just a RichEmbed or Attachment
     * @returns {Promise<Message|Message[]|Object|Object[]>}
     * @example
     * // Send a basic message
     * webhook.send('hello!')
     *   .then(message => console.log(`Sent message: ${message.content}`))
     *   .catch(console.error);
     * @example
     * // Send a remote file
     * webhook.send({
     *   files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
     * })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Send a local file
     * webhook.send({
     *   files: [{
     *     attachment: 'entire/path/to/file.jpg',
     *     name: 'file.jpg'
     *   }]
     * })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Send an embed with a local image inside
     * webhook.send('This is an embed', {
     *   embeds: [{
     *     thumbnail: {
     *          url: 'attachment://file.jpg'
     *       }
     *    }],
     *    files: [{
     *       attachment: 'entire/path/to/file.jpg',
     *       name: 'file.jpg'
     *    }]
     * })
     *   .then(console.log)
     *   .catch(console.error);
     */
    send(content, options) { // eslint-disable-line complexity
      if (!options && typeof content === 'object' && !(content instanceof Array)) {
        options = content;
        content = '';
      } else if (!options) {
        options = {};
      }
  
      if (options instanceof Attachment) options = { files: [options] };
      if (options instanceof RichEmbed) options = { embeds: [options] };
  
      if (content) {
        content = this.client.resolver.resolveString(content);
        let { split, code, disableEveryone } = options;
        if (split && typeof split !== 'object') split = {};
        if (typeof code !== 'undefined' && (typeof code !== 'boolean' || code === true)) {
          content = Util.escapeMarkdown(content, true);
          content = `\`\`\`${typeof code !== 'boolean' ? code || '' : ''}\n${content}\n\`\`\``;
          if (split) {
            split.prepend = `\`\`\`${typeof code !== 'boolean' ? code || '' : ''}\n`;
            split.append = '\n```';
          }
        }
        if (disableEveryone || (typeof disableEveryone === 'undefined' && this.client.options.disableEveryone)) {
          content = content.replace(/@(everyone|here)/g, '@\u200b$1');
        }
  
        if (split) content = Util.splitMessage(content, split);
      }
  
      if (options.file) {
        if (options.files) options.files.push(options.file);
        else options.files = [options.file];
      }
  
      if (options.embeds) {
        const files = [];
        for (const embed of options.embeds) {
          if (embed.file) files.push(embed.file);
        }
        if (options.files) options.files.push(...files);
        else options.files = files;
      }
  
      if (options.embeds) options.embeds = options.embeds.map(e => new RichEmbed(e)._apiTransform());
  
      if (options.files) {
        for (let i = 0; i < options.files.length; i++) {
          let file = options.files[i];
          if (typeof file === 'string' || Buffer.isBuffer(file)) file = { attachment: file };
          if (!file.name) {
            if (typeof file.attachment === 'string') {
              file.name = path.basename(file.attachment);
            } else if (file.attachment && file.attachment.path) {
              file.name = path.basename(file.attachment.path);
            } else if (file instanceof Attachment) {
              file = { attachment: file.file, name: path.basename(file.file) || 'file.jpg' };
            } else {
              file.name = 'file.jpg';
            }
          } else if (file instanceof Attachment) {
            file = file.file;
          }
          options.files[i] = file;
        }
  
        return Promise.all(options.files.map(file =>
          this.client.resolver.resolveFile(file.attachment).then(resource => {
            file.file = resource;
            return file;
          })
        )).then(files => this.client.rest.methods.sendWebhookMessage(this, content, options, files));
      }
  
      return this.client.rest.methods.sendWebhookMessage(this, content, options);
    }
  
    /**
     * Send a message with this webhook
     * @param {StringResolvable} content The content to send
     * @param {WebhookMessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @deprecated
     * @example
     * // Send a message
     * webhook.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.error);
     */
    sendMessage(content, options = {}) {
      return this.send(content, options);
    }
  
    /**
     * Send a file with this webhook.
     * @param {BufferResolvable} attachment The file to send
     * @param {string} [name='file.jpg'] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {WebhookMessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     * @deprecated
     */
    sendFile(attachment, name, content, options = {}) {
      return this.send(content, Object.assign(options, { file: { attachment, name } }));
    }
  
    /**
     * Send a code block with this webhook.
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {WebhookMessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     * @deprecated
     */
    sendCode(lang, content, options = {}) {
      return this.send(content, Object.assign(options, { code: lang }));
    }
  
    /**
     * Send a raw slack message with this webhook.
     * @param {Object} body The raw body to send
     * @returns {Promise}
     * @example
     * // Send a slack message
     * webhook.sendSlackMessage({
     *   'username': 'Wumpus',
     *   'attachments': [{
     *     'pretext': 'this looks pretty cool',
     *     'color': '#F0F',
     *     'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
     *     'footer': 'Powered by sneks',
     *     'ts': Date.now() / 1000
     *   }]
     * }).catch(console.error);
     */
    sendSlackMessage(body) {
      return this.client.rest.methods.sendSlackWebhookMessage(this, body);
    }
  
    /**
     * Edit the webhook.
     * @param {string} name The new name for the webhook
     * @param {BufferResolvable} [avatar] The new avatar for the webhook
     * @returns {Promise<Webhook>}
     */
    edit(name = this.name, avatar) {
      if (avatar) {
        return this.client.resolver.resolveImage(avatar).then(data =>
          this.client.rest.methods.editWebhook(this, name, data)
        );
      }
      return this.client.rest.methods.editWebhook(this, name);
    }
  
    /**
     * Delete the webhook.
     * @param {string} [reason] Reason for deleting the webhook
     * @returns {Promise}
     */
    delete(reason) {
      return this.client.rest.methods.deleteWebhook(this, reason);
    }
  }
  
  module.exports = Webhook;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))
  
  /***/ }),
  /* 25 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete", function() { return _delete; });
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(63);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_js__);
  
  
  /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__index_js___default.a);
  
  const version = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.version;
  /* harmony export (immutable) */ __webpack_exports__["version"] = version;
  
  const METHODS = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.METHODS;
  /* harmony export (immutable) */ __webpack_exports__["METHODS"] = METHODS;
  
  
  const acl = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.acl;
  /* harmony export (immutable) */ __webpack_exports__["acl"] = acl;
  
  const bind = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.bind;
  /* harmony export (immutable) */ __webpack_exports__["bind"] = bind;
  
  const checkout = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.checkout;
  /* harmony export (immutable) */ __webpack_exports__["checkout"] = checkout;
  
  const connect = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.connect;
  /* harmony export (immutable) */ __webpack_exports__["connect"] = connect;
  
  const copy = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.copy;
  /* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
  
  const _delete = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.delete;
  
  const get = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.get;
  /* harmony export (immutable) */ __webpack_exports__["get"] = get;
  
  const head = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.head;
  /* harmony export (immutable) */ __webpack_exports__["head"] = head;
  
  const link = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.link;
  /* harmony export (immutable) */ __webpack_exports__["link"] = link;
  
  const lock = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.lock;
  /* harmony export (immutable) */ __webpack_exports__["lock"] = lock;
  
  const merge = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.merge;
  /* harmony export (immutable) */ __webpack_exports__["merge"] = merge;
  
  const mkactivity = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.mkactivity;
  /* harmony export (immutable) */ __webpack_exports__["mkactivity"] = mkactivity;
  
  const mkcalendar = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.mkcalendar;
  /* harmony export (immutable) */ __webpack_exports__["mkcalendar"] = mkcalendar;
  
  const mkcol = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.mkcol;
  /* harmony export (immutable) */ __webpack_exports__["mkcol"] = mkcol;
  
  const move = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.move;
  /* harmony export (immutable) */ __webpack_exports__["move"] = move;
  
  const notify = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.notify;
  /* harmony export (immutable) */ __webpack_exports__["notify"] = notify;
  
  const options = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.options;
  /* harmony export (immutable) */ __webpack_exports__["options"] = options;
  
  const patch = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.patch;
  /* harmony export (immutable) */ __webpack_exports__["patch"] = patch;
  
  const post = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.post;
  /* harmony export (immutable) */ __webpack_exports__["post"] = post;
  
  const propfind = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.propfind;
  /* harmony export (immutable) */ __webpack_exports__["propfind"] = propfind;
  
  const proppatch = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.proppatch;
  /* harmony export (immutable) */ __webpack_exports__["proppatch"] = proppatch;
  
  const purge = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.purge;
  /* harmony export (immutable) */ __webpack_exports__["purge"] = purge;
  
  const put = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.put;
  /* harmony export (immutable) */ __webpack_exports__["put"] = put;
  
  const rebind = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.rebind;
  /* harmony export (immutable) */ __webpack_exports__["rebind"] = rebind;
  
  const report = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.report;
  /* harmony export (immutable) */ __webpack_exports__["report"] = report;
  
  const search = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.search;
  /* harmony export (immutable) */ __webpack_exports__["search"] = search;
  
  const subscribe = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.subscribe;
  /* harmony export (immutable) */ __webpack_exports__["subscribe"] = subscribe;
  
  const trace = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.trace;
  /* harmony export (immutable) */ __webpack_exports__["trace"] = trace;
  
  const unbind = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.unbind;
  /* harmony export (immutable) */ __webpack_exports__["unbind"] = unbind;
  
  const unlink = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.unlink;
  /* harmony export (immutable) */ __webpack_exports__["unlink"] = unlink;
  
  const unlock = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.unlock;
  /* harmony export (immutable) */ __webpack_exports__["unlock"] = unlock;
  
  const unsubscribe = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.unsubscribe;
  /* harmony export (immutable) */ __webpack_exports__["unsubscribe"] = unsubscribe;
  
  const brew = __WEBPACK_IMPORTED_MODULE_0__index_js___default.a.brew;
  /* harmony export (immutable) */ __webpack_exports__["brew"] = brew;
  
  
  
  /***/ }),
  /* 26 */
  /***/ (function(module, exports) {
  
  module.exports = Long;
  
  /**
   * wasm optimizations, to do native i64 multiplication and divide
   */
  var wasm = null;
  
  try {
    wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
    ])), {}).exports;
  } catch (e) {
    // no wasm support :(
  }
  
  /**
   * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
   *  See the from* functions below for more convenient ways of constructing Longs.
   * @exports Long
   * @class A Long class for representing a 64 bit two's-complement integer value.
   * @param {number} low The low (signed) 32 bits of the long
   * @param {number} high The high (signed) 32 bits of the long
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @constructor
   */
  function Long(low, high, unsigned) {
  
      /**
       * The low 32 bits as a signed value.
       * @type {number}
       */
      this.low = low | 0;
  
      /**
       * The high 32 bits as a signed value.
       * @type {number}
       */
      this.high = high | 0;
  
      /**
       * Whether unsigned or not.
       * @type {boolean}
       */
      this.unsigned = !!unsigned;
  }
  
  // The internal representation of a long is the two given signed, 32-bit values.
  // We use 32-bit pieces because these are the size of integers on which
  // Javascript performs bit-operations.  For operations like addition and
  // multiplication, we split each number into 16 bit pieces, which can easily be
  // multiplied within Javascript's floating-point representation without overflow
  // or change in sign.
  //
  // In the algorithms below, we frequently reduce the negative case to the
  // positive case by negating the input(s) and then post-processing the result.
  // Note that we must ALWAYS check specially whether those values are MIN_VALUE
  // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
  // a positive number, it overflows back into a negative).  Not handling this
  // case would often result in infinite recursion.
  //
  // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
  // methods on which they depend.
  
  /**
   * An indicator used to reliably determine if an object is a Long or not.
   * @type {boolean}
   * @const
   * @private
   */
  Long.prototype.__isLong__;
  
  Object.defineProperty(Long.prototype, "__isLong__", { value: true });
  
  /**
   * @function
   * @param {*} obj Object
   * @returns {boolean}
   * @inner
   */
  function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
  }
  
  /**
   * Tests if the specified object is a Long.
   * @function
   * @param {*} obj Object
   * @returns {boolean}
   */
  Long.isLong = isLong;
  
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @inner
   */
  var INT_CACHE = {};
  
  /**
   * A cache of the Long representations of small unsigned integer values.
   * @type {!Object}
   * @inner
   */
  var UINT_CACHE = {};
  
  /**
   * @param {number} value
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */
  function fromInt(value, unsigned) {
      var obj, cachedObj, cache;
      if (unsigned) {
          value >>>= 0;
          if (cache = (0 <= value && value < 256)) {
              cachedObj = UINT_CACHE[value];
              if (cachedObj)
                  return cachedObj;
          }
          obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
          if (cache)
              UINT_CACHE[value] = obj;
          return obj;
      } else {
          value |= 0;
          if (cache = (-128 <= value && value < 128)) {
              cachedObj = INT_CACHE[value];
              if (cachedObj)
                  return cachedObj;
          }
          obj = fromBits(value, value < 0 ? -1 : 0, false);
          if (cache)
              INT_CACHE[value] = obj;
          return obj;
      }
  }
  
  /**
   * Returns a Long representing the given 32 bit integer value.
   * @function
   * @param {number} value The 32 bit integer in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
  Long.fromInt = fromInt;
  
  /**
   * @param {number} value
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */
  function fromNumber(value, unsigned) {
      if (isNaN(value))
          return unsigned ? UZERO : ZERO;
      if (unsigned) {
          if (value < 0)
              return UZERO;
          if (value >= TWO_PWR_64_DBL)
              return MAX_UNSIGNED_VALUE;
      } else {
          if (value <= -TWO_PWR_63_DBL)
              return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL)
              return MAX_VALUE;
      }
      if (value < 0)
          return fromNumber(-value, unsigned).neg();
      return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
  }
  
  /**
   * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
   * @function
   * @param {number} value The number in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
  Long.fromNumber = fromNumber;
  
  /**
   * @param {number} lowBits
   * @param {number} highBits
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */
  function fromBits(lowBits, highBits, unsigned) {
      return new Long(lowBits, highBits, unsigned);
  }
  
  /**
   * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
   *  assumed to use 32 bits.
   * @function
   * @param {number} lowBits The low 32 bits
   * @param {number} highBits The high 32 bits
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
  Long.fromBits = fromBits;
  
  /**
   * @function
   * @param {number} base
   * @param {number} exponent
   * @returns {number}
   * @inner
   */
  var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)
  
  /**
   * @param {string} str
   * @param {(boolean|number)=} unsigned
   * @param {number=} radix
   * @returns {!Long}
   * @inner
   */
  function fromString(str, unsigned, radix) {
      if (str.length === 0)
          throw Error('empty string');
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return ZERO;
      if (typeof unsigned === 'number') {
          // For goog.math.long compatibility
          radix = unsigned,
          unsigned = false;
      } else {
          unsigned = !! unsigned;
      }
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
          throw RangeError('radix');
  
      var p;
      if ((p = str.indexOf('-')) > 0)
          throw Error('interior hyphen');
      else if (p === 0) {
          return fromString(str.substring(1), unsigned, radix).neg();
      }
  
      // Do several (8) digits each time through the loop, so as to
      // minimize the calls to the very expensive emulated div.
      var radixToPower = fromNumber(pow_dbl(radix, 8));
  
      var result = ZERO;
      for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i),
              value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
              var power = fromNumber(pow_dbl(radix, size));
              result = result.mul(power).add(fromNumber(value));
          } else {
              result = result.mul(radixToPower);
              result = result.add(fromNumber(value));
          }
      }
      result.unsigned = unsigned;
      return result;
  }
  
  /**
   * Returns a Long representation of the given string, written using the specified radix.
   * @function
   * @param {string} str The textual representation of the Long
   * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
   * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
   * @returns {!Long} The corresponding Long value
   */
  Long.fromString = fromString;
  
  /**
   * @function
   * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */
  function fromValue(val, unsigned) {
      if (typeof val === 'number')
          return fromNumber(val, unsigned);
      if (typeof val === 'string')
          return fromString(val, unsigned);
      // Throws for non-objects, converts non-instanceof Long:
      return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
  }
  
  /**
   * Converts the specified value to a Long using the appropriate from* function for its type.
   * @function
   * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long}
   */
  Long.fromValue = fromValue;
  
  // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
  // no runtime penalty for these.
  
  /**
   * @type {number}
   * @const
   * @inner
   */
  var TWO_PWR_16_DBL = 1 << 16;
  
  /**
   * @type {number}
   * @const
   * @inner
   */
  var TWO_PWR_24_DBL = 1 << 24;
  
  /**
   * @type {number}
   * @const
   * @inner
   */
  var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
  
  /**
   * @type {number}
   * @const
   * @inner
   */
  var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
  
  /**
   * @type {number}
   * @const
   * @inner
   */
  var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
  
  /**
   * @type {!Long}
   * @const
   * @inner
   */
  var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
  
  /**
   * @type {!Long}
   * @inner
   */
  var ZERO = fromInt(0);
  
  /**
   * Signed zero.
   * @type {!Long}
   */
  Long.ZERO = ZERO;
  
  /**
   * @type {!Long}
   * @inner
   */
  var UZERO = fromInt(0, true);
  
  /**
   * Unsigned zero.
   * @type {!Long}
   */
  Long.UZERO = UZERO;
  
  /**
   * @type {!Long}
   * @inner
   */
  var ONE = fromInt(1);
  
  /**
   * Signed one.
   * @type {!Long}
   */
  Long.ONE = ONE;
  
  /**
   * @type {!Long}
   * @inner
   */
  var UONE = fromInt(1, true);
  
  /**
   * Unsigned one.
   * @type {!Long}
   */
  Long.UONE = UONE;
  
  /**
   * @type {!Long}
   * @inner
   */
  var NEG_ONE = fromInt(-1);
  
  /**
   * Signed negative one.
   * @type {!Long}
   */
  Long.NEG_ONE = NEG_ONE;
  
  /**
   * @type {!Long}
   * @inner
   */
  var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);
  
  /**
   * Maximum signed value.
   * @type {!Long}
   */
  Long.MAX_VALUE = MAX_VALUE;
  
  /**
   * @type {!Long}
   * @inner
   */
  var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);
  
  /**
   * Maximum unsigned value.
   * @type {!Long}
   */
  Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
  
  /**
   * @type {!Long}
   * @inner
   */
  var MIN_VALUE = fromBits(0, 0x80000000|0, false);
  
  /**
   * Minimum signed value.
   * @type {!Long}
   */
  Long.MIN_VALUE = MIN_VALUE;
  
  /**
   * @alias Long.prototype
   * @inner
   */
  var LongPrototype = Long.prototype;
  
  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   * @returns {number}
   */
  LongPrototype.toInt = function toInt() {
      return this.unsigned ? this.low >>> 0 : this.low;
  };
  
  /**
   * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   * @returns {number}
   */
  LongPrototype.toNumber = function toNumber() {
      if (this.unsigned)
          return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
  };
  
  /**
   * Converts the Long to a string written in the specified radix.
   * @param {number=} radix Radix (2-36), defaults to 10
   * @returns {string}
   * @override
   * @throws {RangeError} If `radix` is out of range
   */
  LongPrototype.toString = function toString(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
          throw RangeError('radix');
      if (this.isZero())
          return '0';
      if (this.isNegative()) { // Unsigned Longs are never negative
          if (this.eq(MIN_VALUE)) {
              // We need to change the Long value before it can be negated, so we remove
              // the bottom-most digit in this base and then recurse to do the rest.
              var radixLong = fromNumber(radix),
                  div = this.div(radixLong),
                  rem1 = div.mul(radixLong).sub(this);
              return div.toString(radix) + rem1.toInt().toString(radix);
          } else
              return '-' + this.neg().toString(radix);
      }
  
      // Do several (6) digits each time through the loop, so as to
      // minimize the calls to the very expensive emulated div.
      var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
          rem = this;
      var result = '';
      while (true) {
          var remDiv = rem.div(radixToPower),
              intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
              digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero())
              return digits + result;
          else {
              while (digits.length < 6)
                  digits = '0' + digits;
              result = '' + digits + result;
          }
      }
  };
  
  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   */
  LongPrototype.getHighBits = function getHighBits() {
      return this.high;
  };
  
  /**
   * Gets the high 32 bits as an unsigned integer.
   * @returns {number} Unsigned high bits
   */
  LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
      return this.high >>> 0;
  };
  
  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   */
  LongPrototype.getLowBits = function getLowBits() {
      return this.low;
  };
  
  /**
   * Gets the low 32 bits as an unsigned integer.
   * @returns {number} Unsigned low bits
   */
  LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
      return this.low >>> 0;
  };
  
  /**
   * Gets the number of bits needed to represent the absolute value of this Long.
   * @returns {number}
   */
  LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
      if (this.isNegative()) // Unsigned Longs are never negative
          return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      var val = this.high != 0 ? this.high : this.low;
      for (var bit = 31; bit > 0; bit--)
          if ((val & (1 << bit)) != 0)
              break;
      return this.high != 0 ? bit + 33 : bit + 1;
  };
  
  /**
   * Tests if this Long's value equals zero.
   * @returns {boolean}
   */
  LongPrototype.isZero = function isZero() {
      return this.high === 0 && this.low === 0;
  };
  
  /**
   * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
   * @returns {boolean}
   */
  LongPrototype.eqz = LongPrototype.isZero;
  
  /**
   * Tests if this Long's value is negative.
   * @returns {boolean}
   */
  LongPrototype.isNegative = function isNegative() {
      return !this.unsigned && this.high < 0;
  };
  
  /**
   * Tests if this Long's value is positive.
   * @returns {boolean}
   */
  LongPrototype.isPositive = function isPositive() {
      return this.unsigned || this.high >= 0;
  };
  
  /**
   * Tests if this Long's value is odd.
   * @returns {boolean}
   */
  LongPrototype.isOdd = function isOdd() {
      return (this.low & 1) === 1;
  };
  
  /**
   * Tests if this Long's value is even.
   * @returns {boolean}
   */
  LongPrototype.isEven = function isEven() {
      return (this.low & 1) === 0;
  };
  
  /**
   * Tests if this Long's value equals the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.equals = function equals(other) {
      if (!isLong(other))
          other = fromValue(other);
      if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
          return false;
      return this.high === other.high && this.low === other.low;
  };
  
  /**
   * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.eq = LongPrototype.equals;
  
  /**
   * Tests if this Long's value differs from the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.notEquals = function notEquals(other) {
      return !this.eq(/* validates */ other);
  };
  
  /**
   * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.neq = LongPrototype.notEquals;
  
  /**
   * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.ne = LongPrototype.notEquals;
  
  /**
   * Tests if this Long's value is less than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.lessThan = function lessThan(other) {
      return this.comp(/* validates */ other) < 0;
  };
  
  /**
   * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.lt = LongPrototype.lessThan;
  
  /**
   * Tests if this Long's value is less than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(/* validates */ other) <= 0;
  };
  
  /**
   * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.lte = LongPrototype.lessThanOrEqual;
  
  /**
   * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.le = LongPrototype.lessThanOrEqual;
  
  /**
   * Tests if this Long's value is greater than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(/* validates */ other) > 0;
  };
  
  /**
   * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.gt = LongPrototype.greaterThan;
  
  /**
   * Tests if this Long's value is greater than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(/* validates */ other) >= 0;
  };
  
  /**
   * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.gte = LongPrototype.greaterThanOrEqual;
  
  /**
   * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */
  LongPrototype.ge = LongPrototype.greaterThanOrEqual;
  
  /**
   * Compares this Long's value with the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */
  LongPrototype.compare = function compare(other) {
      if (!isLong(other))
          other = fromValue(other);
      if (this.eq(other))
          return 0;
      var thisNeg = this.isNegative(),
          otherNeg = other.isNegative();
      if (thisNeg && !otherNeg)
          return -1;
      if (!thisNeg && otherNeg)
          return 1;
      // At this point the sign bits are the same
      if (!this.unsigned)
          return this.sub(other).isNegative() ? -1 : 1;
      // Both are positive if at least one is unsigned
      return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
  };
  
  /**
   * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */
  LongPrototype.comp = LongPrototype.compare;
  
  /**
   * Negates this Long's value.
   * @returns {!Long} Negated Long
   */
  LongPrototype.negate = function negate() {
      if (!this.unsigned && this.eq(MIN_VALUE))
          return MIN_VALUE;
      return this.not().add(ONE);
  };
  
  /**
   * Negates this Long's value. This is an alias of {@link Long#negate}.
   * @function
   * @returns {!Long} Negated Long
   */
  LongPrototype.neg = LongPrototype.negate;
  
  /**
   * Returns the sum of this and the specified Long.
   * @param {!Long|number|string} addend Addend
   * @returns {!Long} Sum
   */
  LongPrototype.add = function add(addend) {
      if (!isLong(addend))
          addend = fromValue(addend);
  
      // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
  
      var a48 = this.high >>> 16;
      var a32 = this.high & 0xFFFF;
      var a16 = this.low >>> 16;
      var a00 = this.low & 0xFFFF;
  
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 0xFFFF;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 0xFFFF;
  
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 0xFFFF;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c48 += a48 + b48;
      c48 &= 0xFFFF;
      return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
  };
  
  /**
   * Returns the difference of this and the specified Long.
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */
  LongPrototype.subtract = function subtract(subtrahend) {
      if (!isLong(subtrahend))
          subtrahend = fromValue(subtrahend);
      return this.add(subtrahend.neg());
  };
  
  /**
   * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
   * @function
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */
  LongPrototype.sub = LongPrototype.subtract;
  
  /**
   * Returns the product of this and the specified Long.
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */
  LongPrototype.multiply = function multiply(multiplier) {
      if (this.isZero())
          return ZERO;
      if (!isLong(multiplier))
          multiplier = fromValue(multiplier);
  
      // use wasm support if present
      if (wasm) {
          var low = wasm.mul(this.low,
                             this.high,
                             multiplier.low,
                             multiplier.high);
          return fromBits(low, wasm.get_high(), this.unsigned);
      }
  
      if (multiplier.isZero())
          return ZERO;
      if (this.eq(MIN_VALUE))
          return multiplier.isOdd() ? MIN_VALUE : ZERO;
      if (multiplier.eq(MIN_VALUE))
          return this.isOdd() ? MIN_VALUE : ZERO;
  
      if (this.isNegative()) {
          if (multiplier.isNegative())
              return this.neg().mul(multiplier.neg());
          else
              return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative())
          return this.mul(multiplier.neg()).neg();
  
      // If both longs are small, use float multiplication
      if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
          return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  
      // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
      // We can skip products that would overflow.
  
      var a48 = this.high >>> 16;
      var a32 = this.high & 0xFFFF;
      var a16 = this.low >>> 16;
      var a00 = this.low & 0xFFFF;
  
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 0xFFFF;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 0xFFFF;
  
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 0xFFFF;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 0xFFFF;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 0xFFFF;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 0xFFFF;
      return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
  };
  
  /**
   * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
   * @function
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */
  LongPrototype.mul = LongPrototype.multiply;
  
  /**
   * Returns this Long divided by the specified. The result is signed if this Long is signed or
   *  unsigned if this Long is unsigned.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */
  LongPrototype.divide = function divide(divisor) {
      if (!isLong(divisor))
          divisor = fromValue(divisor);
      if (divisor.isZero())
          throw Error('division by zero');
  
      // use wasm support if present
      if (wasm) {
          // guard against signed division overflow: the largest
          // negative number / -1 would be 1 larger than the largest
          // positive number, due to two's complement.
          if (!this.unsigned &&
              this.high === -0x80000000 &&
              divisor.low === -1 && divisor.high === -1) {
              // be consistent with non-wasm code path
              return this;
          }
          var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
              this.low,
              this.high,
              divisor.low,
              divisor.high
          );
          return fromBits(low, wasm.get_high(), this.unsigned);
      }
  
      if (this.isZero())
          return this.unsigned ? UZERO : ZERO;
      var approx, rem, res;
      if (!this.unsigned) {
          // This section is only relevant for signed longs and is derived from the
          // closure library as a whole.
          if (this.eq(MIN_VALUE)) {
              if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                  return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
              else if (divisor.eq(MIN_VALUE))
                  return ONE;
              else {
                  // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                  var halfThis = this.shr(1);
                  approx = halfThis.div(divisor).shl(1);
                  if (approx.eq(ZERO)) {
                      return divisor.isNegative() ? ONE : NEG_ONE;
                  } else {
                      rem = this.sub(divisor.mul(approx));
                      res = approx.add(rem.div(divisor));
                      return res;
                  }
              }
          } else if (divisor.eq(MIN_VALUE))
              return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
              if (divisor.isNegative())
                  return this.neg().div(divisor.neg());
              return this.neg().div(divisor).neg();
          } else if (divisor.isNegative())
              return this.div(divisor.neg()).neg();
          res = ZERO;
      } else {
          // The algorithm below has not been made for unsigned longs. It's therefore
          // required to take special care of the MSB prior to running it.
          if (!divisor.unsigned)
              divisor = divisor.toUnsigned();
          if (divisor.gt(this))
              return UZERO;
          if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
              return UONE;
          res = UZERO;
      }
  
      // Repeat the following until the remainder is less than other:  find a
      // floating-point that approximates remainder / other *from below*, add this
      // into the result, and subtract it from the remainder.  It is critical that
      // the approximate value is less than or equal to the real value so that the
      // remainder never becomes negative.
      rem = this;
      while (rem.gte(divisor)) {
          // Approximate the result of division. This may be a little greater or
          // smaller than the actual value.
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
  
          // We will tweak the approximate result by changing it in the 48-th digit or
          // the smallest non-fractional digit, whichever is larger.
          var log2 = Math.ceil(Math.log(approx) / Math.LN2),
              delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),
  
          // Decrease the approximation until it is smaller than the remainder.  Note
          // that if it is too large, the product overflows and is negative.
              approxRes = fromNumber(approx),
              approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
              approx -= delta;
              approxRes = fromNumber(approx, this.unsigned);
              approxRem = approxRes.mul(divisor);
          }
  
          // We know the answer can't be zero... and actually, zero would cause
          // infinite recursion since we would make no progress.
          if (approxRes.isZero())
              approxRes = ONE;
  
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
      }
      return res;
  };
  
  /**
   * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
   * @function
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */
  LongPrototype.div = LongPrototype.divide;
  
  /**
   * Returns this Long modulo the specified.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Remainder
   */
  LongPrototype.modulo = function modulo(divisor) {
      if (!isLong(divisor))
          divisor = fromValue(divisor);
  
      // use wasm support if present
      if (wasm) {
          var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
              this.low,
              this.high,
              divisor.low,
              divisor.high
          );
          return fromBits(low, wasm.get_high(), this.unsigned);
      }
  
      return this.sub(this.div(divisor).mul(divisor));
  };
  
  /**
   * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
   * @function
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Remainder
   */
  LongPrototype.mod = LongPrototype.modulo;
  
  /**
   * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
   * @function
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Remainder
   */
  LongPrototype.rem = LongPrototype.modulo;
  
  /**
   * Returns the bitwise NOT of this Long.
   * @returns {!Long}
   */
  LongPrototype.not = function not() {
      return fromBits(~this.low, ~this.high, this.unsigned);
  };
  
  /**
   * Returns the bitwise AND of this Long and the specified.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */
  LongPrototype.and = function and(other) {
      if (!isLong(other))
          other = fromValue(other);
      return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
  };
  
  /**
   * Returns the bitwise OR of this Long and the specified.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */
  LongPrototype.or = function or(other) {
      if (!isLong(other))
          other = fromValue(other);
      return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
  };
  
  /**
   * Returns the bitwise XOR of this Long and the given one.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */
  LongPrototype.xor = function xor(other) {
      if (!isLong(other))
          other = fromValue(other);
      return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
  };
  
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shiftLeft = function shiftLeft(numBits) {
      if (isLong(numBits))
          numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
          return this;
      else if (numBits < 32)
          return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
      else
          return fromBits(0, this.low << (numBits - 32), this.unsigned);
  };
  
  /**
   * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shl = LongPrototype.shiftLeft;
  
  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shiftRight = function shiftRight(numBits) {
      if (isLong(numBits))
          numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
          return this;
      else if (numBits < 32)
          return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
      else
          return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
  };
  
  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shr = LongPrototype.shiftRight;
  
  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
      if (isLong(numBits))
          numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0)
          return this;
      else {
          var high = this.high;
          if (numBits < 32) {
              var low = this.low;
              return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
          } else if (numBits === 32)
              return fromBits(high, 0, this.unsigned);
          else
              return fromBits(high >>> (numBits - 32), 0, this.unsigned);
      }
  };
  
  /**
   * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shru = LongPrototype.shiftRightUnsigned;
  
  /**
   * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */
  LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
  
  /**
   * Converts this Long to signed.
   * @returns {!Long} Signed long
   */
  LongPrototype.toSigned = function toSigned() {
      if (!this.unsigned)
          return this;
      return fromBits(this.low, this.high, false);
  };
  
  /**
   * Converts this Long to unsigned.
   * @returns {!Long} Unsigned long
   */
  LongPrototype.toUnsigned = function toUnsigned() {
      if (this.unsigned)
          return this;
      return fromBits(this.low, this.high, true);
  };
  
  /**
   * Converts this Long to its byte representation.
   * @param {boolean=} le Whether little or big endian, defaults to big endian
   * @returns {!Array.<number>} Byte representation
   */
  LongPrototype.toBytes = function toBytes(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
  };
  
  /**
   * Converts this Long to its little endian byte representation.
   * @returns {!Array.<number>} Little endian byte representation
   */
  LongPrototype.toBytesLE = function toBytesLE() {
      var hi = this.high,
          lo = this.low;
      return [
          lo        & 0xff,
          lo >>>  8 & 0xff,
          lo >>> 16 & 0xff,
          lo >>> 24       ,
          hi        & 0xff,
          hi >>>  8 & 0xff,
          hi >>> 16 & 0xff,
          hi >>> 24
      ];
  };
  
  /**
   * Converts this Long to its big endian byte representation.
   * @returns {!Array.<number>} Big endian byte representation
   */
  LongPrototype.toBytesBE = function toBytesBE() {
      var hi = this.high,
          lo = this.low;
      return [
          hi >>> 24       ,
          hi >>> 16 & 0xff,
          hi >>>  8 & 0xff,
          hi        & 0xff,
          lo >>> 24       ,
          lo >>> 16 & 0xff,
          lo >>>  8 & 0xff,
          lo        & 0xff
      ];
  };
  
  /**
   * Creates a Long from its byte representation.
   * @param {!Array.<number>} bytes Byte representation
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @param {boolean=} le Whether little or big endian, defaults to big endian
   * @returns {Long} The corresponding Long value
   */
  Long.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
  };
  
  /**
   * Creates a Long from its little endian byte representation.
   * @param {!Array.<number>} bytes Little endian byte representation
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {Long} The corresponding Long value
   */
  Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long(
          bytes[0]       |
          bytes[1] <<  8 |
          bytes[2] << 16 |
          bytes[3] << 24,
          bytes[4]       |
          bytes[5] <<  8 |
          bytes[6] << 16 |
          bytes[7] << 24,
          unsigned
      );
  };
  
  /**
   * Creates a Long from its big endian byte representation.
   * @param {!Array.<number>} bytes Big endian byte representation
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {Long} The corresponding Long value
   */
  Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long(
          bytes[4] << 24 |
          bytes[5] << 16 |
          bytes[6] <<  8 |
          bytes[7],
          bytes[0] << 24 |
          bytes[1] << 16 |
          bytes[2] <<  8 |
          bytes[3],
          unsigned
      );
  };
  
  
  /***/ }),
  /* 27 */
  /***/ (function(module, exports) {
  
  /**
   * Represents an embed in a message (image/video preview, rich embed, etc.)
   * <info>This class is only used for *recieved* embeds. If you wish to send one, use the {@link RichEmbed} class.</info>
   */
  class MessageEmbed {
    constructor(message, data) {
      /**
       * The client that instantiated this embed
       * @name MessageEmbed#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: message.client });
  
      /**
       * The message this embed is part of
       * @type {Message}
       */
      this.message = message;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The type of this embed
       * @type {string}
       */
      this.type = data.type;
  
      /**
       * The title of this embed
       * @type {?string}
       */
      this.title = data.title;
  
      /**
       * The description of this embed
       * @type {?string}
       */
      this.description = data.description;
  
      /**
       * The URL of this embed
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The color of the embed
       * @type {number}
       */
      this.color = data.color;
  
      /**
       * The fields of this embed
       * @type {MessageEmbedField[]}
       */
      this.fields = [];
      if (data.fields) for (const field of data.fields) this.fields.push(new MessageEmbedField(this, field));
  
      /**
       * The timestamp of this embed
       * @type {number}
       */
      this.timestamp = data.timestamp;
  
      /**
       * The thumbnail of this embed
       * @type {?MessageEmbedThumbnail}
       */
      this.thumbnail = data.thumbnail ? new MessageEmbedThumbnail(this, data.thumbnail) : null;
  
      /**
       * The image of this embed
       * @type {?MessageEmbedImage}
       */
      this.image = data.image ? new MessageEmbedImage(this, data.image) : null;
  
      /**
       * The video of this embed
       * @type {?MessageEmbedVideo}
       */
      this.video = data.video ? new MessageEmbedVideo(this, data.video) : null;
  
      /**
       * The author of this embed
       * @type {?MessageEmbedAuthor}
       */
      this.author = data.author ? new MessageEmbedAuthor(this, data.author) : null;
  
      /**
       * The provider of this embed
       * @type {?MessageEmbedProvider}
       */
      this.provider = data.provider ? new MessageEmbedProvider(this, data.provider) : null;
  
      /**
       * The footer of this embed
       * @type {?MessageEmbedFooter}
       */
      this.footer = data.footer ? new MessageEmbedFooter(this, data.footer) : null;
    }
  
    /**
     * The date this embed was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * The hexadecimal version of the embed color, with a leading hash
     * @type {?string}
     * @readonly
     */
    get hexColor() {
      if (!this.color) return null;
      let col = this.color.toString(16);
      while (col.length < 6) col = `0${col}`;
      return `#${col}`;
    }
  }
  
  /**
   * Represents a thumbnail for a message embed.
   */
  class MessageEmbedThumbnail {
    constructor(embed, data) {
      /**
       * The embed this thumbnail is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The URL for this thumbnail
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The Proxy URL for this thumbnail
       * @type {string}
       */
      this.proxyURL = data.proxy_url;
  
      /**
       * The height of the thumbnail
       * @type {number}
       */
      this.height = data.height;
  
      /**
       * The width of the thumbnail
       * @type {number}
       */
      this.width = data.width;
    }
  }
  
  /**
   * Represents an image for a message embed.
   */
  class MessageEmbedImage {
    constructor(embed, data) {
      /**
       * The embed this image is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The URL for this image
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The Proxy URL for this image
       * @type {string}
       */
      this.proxyURL = data.proxy_url;
  
      /**
       * The height of the image
       * @type {number}
       */
      this.height = data.height;
  
      /**
       * The width of the image
       * @type {number}
       */
      this.width = data.width;
    }
  }
  
  /**
   * Represents a video for a message embed.
   */
  class MessageEmbedVideo {
    constructor(embed, data) {
      /**
       * The embed this video is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The source URL for this video
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The height of the video
       * @type {number}
       */
      this.height = data.height;
  
      /**
       * The width of the video
       * @type {number}
       */
      this.width = data.width;
    }
  }
  
  /**
   * Represents a provider for a message embed.
   */
  class MessageEmbedProvider {
    constructor(embed, data) {
      /**
       * The embed this provider is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The name of this provider
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The URL of this provider
       * @type {string}
       */
      this.url = data.url;
    }
  }
  
  /**
   * Represents an author for a message embed.
   */
  class MessageEmbedAuthor {
    constructor(embed, data) {
      /**
       * The embed this author is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The name of this author
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The URL of this author
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The icon URL of this author
       * @type {string}
       */
      this.iconURL = data.icon_url;
    }
  }
  
  /**
   * Represents a field for a message embed.
   */
  class MessageEmbedField {
    constructor(embed, data) {
      /**
       * The embed this footer is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The name of this field
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The value of this field
       * @type {string}
       */
      this.value = data.value;
  
      /**
       * If this field is displayed inline
       * @type {boolean}
       */
      this.inline = data.inline;
    }
  }
  
  /**
   * Represents the footer of a message embed.
   */
  class MessageEmbedFooter {
    constructor(embed, data) {
      /**
       * The embed this footer is part of
       * @type {MessageEmbed}
       */
      this.embed = embed;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The text in this footer
       * @type {string}
       */
      this.text = data.text;
  
      /**
       * The icon URL of this footer
       * @type {string}
       */
      this.iconURL = data.icon_url;
  
      /**
       * The proxy icon URL of this footer
       * @type {string}
       */
      this.proxyIconUrl = data.proxy_icon_url;
    }
  }
  
  MessageEmbed.Thumbnail = MessageEmbedThumbnail;
  MessageEmbed.Image = MessageEmbedImage;
  MessageEmbed.Video = MessageEmbedVideo;
  MessageEmbed.Provider = MessageEmbedProvider;
  MessageEmbed.Author = MessageEmbedAuthor;
  MessageEmbed.Field = MessageEmbedField;
  MessageEmbed.Footer = MessageEmbedFooter;
  
  module.exports = MessageEmbed;
  
  
  /***/ }),
  /* 28 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(Buffer) {const path = __webpack_require__(29);
  const fs = __webpack_require__(39);
  const snekfetch = __webpack_require__(25);
  
  const Constants = __webpack_require__(0);
  const convertToBuffer = __webpack_require__(4).convertToBuffer;
  const User = __webpack_require__(10);
  const Message = __webpack_require__(16);
  const Guild = __webpack_require__(22);
  const Channel = __webpack_require__(12);
  const GuildMember = __webpack_require__(18);
  const Emoji = __webpack_require__(17);
  const ReactionEmoji = __webpack_require__(30);
  const Role = __webpack_require__(8);
  
  /**
   * The DataResolver identifies different objects and tries to resolve a specific piece of information from them, e.g.
   * extracting a User from a Message object.
   * @private
   */
  class ClientDataResolver {
    /**
     * @param {Client} client The client the resolver is for
     */
    constructor(client) {
      this.client = client;
    }
  
    /**
     * Data that resolves to give a User object. This can be:
     * * A User object
     * * A Snowflake
     * * A Message object (resolves to the message author)
     * * A Guild object (owner of the guild)
     * * A GuildMember object
     * @typedef {User|Snowflake|Message|Guild|GuildMember} UserResolvable
     */
  
    /**
     * Resolves a UserResolvable to a User object.
     * @param {UserResolvable} user The UserResolvable to identify
     * @returns {?User}
     */
    resolveUser(user) {
      if (user instanceof User) return user;
      if (typeof user === 'string') return this.client.users.get(user) || null;
      if (user instanceof GuildMember) return user.user;
      if (user instanceof Message) return user.author;
      if (user instanceof Guild) return user.owner;
      return null;
    }
  
    /**
     * Resolves a UserResolvable to a user ID string.
     * @param {UserResolvable} user The UserResolvable to identify
     * @returns {?Snowflake}
     */
    resolveUserID(user) {
      if (user instanceof User || user instanceof GuildMember) return user.id;
      if (typeof user === 'string') return user || null;
      if (user instanceof Message) return user.author.id;
      if (user instanceof Guild) return user.ownerID;
      return null;
    }
  
    /**
     * Data that resolves to give a Guild object. This can be:
     * * A Guild object
     * * A Snowflake
     * @typedef {Guild|Snowflake} GuildResolvable
     */
  
    /**
     * Resolves a GuildResolvable to a Guild object.
     * @param {GuildResolvable} guild The GuildResolvable to identify
     * @returns {?Guild}
     */
    resolveGuild(guild) {
      if (guild instanceof Guild) return guild;
      if (typeof guild === 'string') return this.client.guilds.get(guild) || null;
      return null;
    }
  
    /**
     * Data that resolves to give a GuildMember object. This can be:
     * * A GuildMember object
     * * A User object
     * @typedef {GuildMember|User} GuildMemberResolvable
     */
  
    /**
     * Resolves a GuildMemberResolvable to a GuildMember object.
     * @param {GuildResolvable} guild The guild that the member is part of
     * @param {UserResolvable} user The user that is part of the guild
     * @returns {?GuildMember}
     */
    resolveGuildMember(guild, user) {
      if (user instanceof GuildMember) return user;
      guild = this.resolveGuild(guild);
      user = this.resolveUser(user);
      if (!guild || !user) return null;
      return guild.members.get(user.id) || null;
    }
  
    /**
     * Data that can be resolved to a Role object. This can be:
     * * A Role
     * * A Snowflake
     * @typedef {Role|Snowflake} RoleResolvable
     */
  
    /**
      * Resolves a RoleResolvable to a Role object.
      * @param {GuildResolvable} guild The guild that this role is part of
      * @param {RoleResolvable} role The role resolvable to resolve
      * @returns {?Role}
      */
    resolveRole(guild, role) {
      if (role instanceof Role) return role;
      guild = this.resolveGuild(guild);
      if (!guild) return null;
      if (typeof role === 'string') return guild.roles.get(role);
      return null;
    }
  
    /**
     * Data that can be resolved to give a Channel object. This can be:
     * * A Channel object
     * * A Message object (the channel the message was sent in)
     * * A Guild object (the #general channel)
     * * A Snowflake
     * @typedef {Channel|Guild|Message|Snowflake} ChannelResolvable
     */
  
    /**
     * Resolves a ChannelResolvable to a Channel object.
     * @param {ChannelResolvable} channel The channel resolvable to resolve
     * @returns {?Channel}
     */
    resolveChannel(channel) {
      if (channel instanceof Channel) return channel;
      if (typeof channel === 'string') return this.client.channels.get(channel) || null;
      if (channel instanceof Message) return channel.channel;
      if (channel instanceof Guild) return channel.channels.get(channel.id) || null;
      return null;
    }
  
    /**
     * Resolves a ChannelResolvable to a channel ID.
     * @param {ChannelResolvable} channel The channel resolvable to resolve
     * @returns {?Snowflake}
     */
    resolveChannelID(channel) {
      if (channel instanceof Channel) return channel.id;
      if (typeof channel === 'string') return channel;
      if (channel instanceof Message) return channel.channel.id;
      if (channel instanceof Guild) return channel.defaultChannel.id;
      return null;
    }
  
    /**
     * Data that can be resolved to give an invite code. This can be:
     * * An invite code
     * * An invite URL
     * @typedef {string} InviteResolvable
     */
  
    /**
     * Resolves InviteResolvable to an invite code.
     * @param {InviteResolvable} data The invite resolvable to resolve
     * @returns {string}
     */
    resolveInviteCode(data) {
      const inviteRegex = /discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
      const match = inviteRegex.exec(data);
      if (match && match[1]) return match[1];
      return data;
    }
  
    /**
     * Data that can be resolved to give a string. This can be:
     * * A string
     * * An array (joined with a new line delimiter to give a string)
     * * Any value
     * @typedef {string|Array|*} StringResolvable
     */
  
    /**
     * Resolves a StringResolvable to a string.
     * @param {StringResolvable} data The string resolvable to resolve
     * @returns {string}
     */
    resolveString(data) {
      if (typeof data === 'string') return data;
      if (data instanceof Array) return data.join('\n');
      return String(data);
    }
  
  
    /**
     * Resolves a Base64Resolvable, a string, or a BufferResolvable to a Base 64 image.
     * @param {BufferResolvable|Base64Resolvable} image The image to be resolved
     * @returns {Promise<?string>}
     */
    resolveImage(image) {
      if (!image) return Promise.resolve(null);
      if (typeof image === 'string' && image.startsWith('data:')) {
        return Promise.resolve(image);
      }
      return this.resolveFile(image).then(this.resolveBase64);
    }
  
    /**
     * Data that resolves to give a Base64 string, typically for image uploading. This can be:
     * * A Buffer
     * * A base64 string
     * @typedef {Buffer|string} Base64Resolvable
     */
  
    /**
     * Resolves a Base64Resolvable to a Base 64 image.
     * @param {Base64Resolvable} data The base 64 resolvable you want to resolve
     * @returns {?string}
     */
    resolveBase64(data) {
      if (data instanceof Buffer) return `data:image/jpg;base64,${data.toString('base64')}`;
      return data;
    }
  
    /**
      * Data that can be resolved to give a Buffer. This can be:
      * * A Buffer
      * * The path to a local file
      * * A URL
      * * A Stream
      * @typedef {string|Buffer} BufferResolvable
      */
  
    /**
      * @external Stream
      * @see {@link https://nodejs.org/api/stream.html}
      */
  
    /**
      * Resolves a BufferResolvable to a Buffer.
      * @param {BufferResolvable|Stream} resource The buffer or stream resolvable to resolve
      * @returns {Promise<Buffer>}
      */
    resolveFile(resource) {
      if (resource instanceof Buffer) return Promise.resolve(resource);
      if (this.client.browser && resource instanceof ArrayBuffer) return Promise.resolve(convertToBuffer(resource));
  
      if (typeof resource === 'string') {
        if (/^https?:\/\//.test(resource)) {
          return snekfetch.get(resource).then(res => res.body instanceof Buffer ? res.body : Buffer.from(res.text));
        }
        return new Promise((resolve, reject) => {
          const file = path.resolve(resource);
          fs.stat(file, (err, stats) => {
            if (err) return reject(err);
            if (!stats || !stats.isFile()) return reject(new Error(`The file could not be found: ${file}`));
            fs.readFile(file, (err2, data) => {
              if (err2) reject(err2);
              else resolve(data);
            });
            return null;
          });
        });
      } else if (resource && resource.pipe && typeof resource.pipe === 'function') {
        return new Promise((resolve, reject) => {
          const buffers = [];
          resource.once('error', reject);
          resource.on('data', data => buffers.push(data));
          resource.once('end', () => resolve(Buffer.concat(buffers)));
        });
      }
  
      return Promise.reject(new TypeError('The resource must be a string or Buffer.'));
    }
  
    /**
     * Data that can be resolved to give an emoji identifier. This can be:
     * * The unicode representation of an emoji
     * * A custom emoji ID
     * * An Emoji object
     * * A ReactionEmoji object
     * @typedef {string|Emoji|ReactionEmoji} EmojiIdentifierResolvable
     */
  
    /**
     * Resolves an EmojiResolvable to an emoji identifier.
     * @param {EmojiIdentifierResolvable} emoji The emoji resolvable to resolve
     * @returns {?string}
     */
    resolveEmojiIdentifier(emoji) {
      if (emoji instanceof Emoji || emoji instanceof ReactionEmoji) return emoji.identifier;
      if (typeof emoji === 'string') {
        if (this.client.emojis.has(emoji)) return this.client.emojis.get(emoji).identifier;
        else if (!emoji.includes('%')) return encodeURIComponent(emoji);
        else return emoji;
      }
      return null;
    }
  
    /**
     * Can be a Hex Literal, Hex String, Number, RGB Array, or one of the following
     * ```
     * [
     *   'DEFAULT',
     *   'AQUA',
     *   'GREEN',
     *   'BLUE',
     *   'PURPLE',
     *   'LUMINOUS_VIVID_PINK',
     *   'GOLD',
     *   'ORANGE',
     *   'RED',
     *   'GREY',
     *   'DARKER_GREY',
     *   'NAVY',
     *   'DARK_AQUA',
     *   'DARK_GREEN',
     *   'DARK_BLUE',
     *   'DARK_PURPLE',
     *   'DARK_VIVID_PINK',
     *   'DARK_GOLD',
     *   'DARK_ORANGE',
     *   'DARK_RED',
     *   'DARK_GREY',
     *   'LIGHT_GREY',
     *   'DARK_NAVY',
     *   'RANDOM',
     * ]
     * ```
     * or something like
     * ```
     * [255, 0, 255]
     * ```
     * for purple
     * @typedef {string|number|Array} ColorResolvable
     */
  
    /**
     * Resolves a ColorResolvable into a color number.
     * @param {ColorResolvable} color Color to resolve
     * @returns {number} A color
     */
    static resolveColor(color) {
      if (typeof color === 'string') {
        if (color === 'RANDOM') return Math.floor(Math.random() * (0xFFFFFF + 1));
        if (color === 'DEFAULT') return 0;
        color = Constants.Colors[color] || parseInt(color.replace('#', ''), 16);
      } else if (color instanceof Array) {
        color = (color[0] << 16) + (color[1] << 8) + color[2];
      }
  
      if (color < 0 || color > 0xFFFFFF) {
        throw new RangeError('Color must be within the range 0 - 16777215 (0xFFFFFF).');
      } else if (color && isNaN(color)) {
        throw new TypeError('Unable to convert color to a number.');
      }
  
      return color;
    }
  
    /**
     * @param {ColorResolvable} color Color to resolve
     * @returns {number} A color
     */
    resolveColor(color) {
      return this.constructor.resolveColor(color);
    }
  }
  
  module.exports = ClientDataResolver;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))
  
  /***/ }),
  /* 29 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
  
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }
  
    return parts;
  }
  
  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };
  
  // path.resolve([from ...], to)
  // posix version
  exports.resolve = function() {
    var resolvedPath = '',
        resolvedAbsolute = false;
  
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : process.cwd();
  
      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }
  
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }
  
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
  
    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');
  
    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  };
  
  // path.normalize(path)
  // posix version
  exports.normalize = function(path) {
    var isAbsolute = exports.isAbsolute(path),
        trailingSlash = substr(path, -1) === '/';
  
    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function(p) {
      return !!p;
    }), !isAbsolute).join('/');
  
    if (!path && !isAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }
  
    return (isAbsolute ? '/' : '') + path;
  };
  
  // posix version
  exports.isAbsolute = function(path) {
    return path.charAt(0) === '/';
  };
  
  // posix version
  exports.join = function() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return exports.normalize(filter(paths, function(p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  };
  
  
  // path.relative(from, to)
  // posix version
  exports.relative = function(from, to) {
    from = exports.resolve(from).substr(1);
    to = exports.resolve(to).substr(1);
  
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }
  
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }
  
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
  
    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));
  
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
  
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }
  
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
  
    return outputParts.join('/');
  };
  
  exports.sep = '/';
  exports.delimiter = ':';
  
  exports.dirname = function(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];
  
    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }
  
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }
  
    return root + dir;
  };
  
  
  exports.basename = function(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  };
  
  
  exports.extname = function(path) {
    return splitPath(path)[3];
  };
  
  function filter (xs, f) {
      if (xs.filter) return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
      }
      return res;
  }
  
  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b'
      ? function (str, start, len) { return str.substr(start, len) }
      : function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
      }
  ;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))
  
  /***/ }),
  /* 30 */
  /***/ (function(module, exports) {
  
  /**
   * Represents a limited emoji set used for both custom and unicode emojis. Custom emojis
   * will use this class opposed to the Emoji class when the client doesn't know enough
   * information about them.
   */
  class ReactionEmoji {
    constructor(reaction, name, id) {
      /**
       * The message reaction this emoji refers to
       * @type {MessageReaction}
       */
      this.reaction = reaction;
  
      /**
       * The name of this reaction emoji
       * @type {string}
       */
      this.name = name;
  
      /**
       * The ID of this reaction emoji
       * @type {?Snowflake}
       */
      this.id = id;
    }
  
    /**
     * The identifier of this emoji, used for message reactions
     * @type {string}
     * @readonly
     */
    get identifier() {
      if (this.id) return `${this.name}:${this.id}`;
      return encodeURIComponent(this.name);
    }
  
    /**
     * Creates the text required to form a graphical emoji on Discord.
     * @example
     * // Send the emoji used in a reaction to the channel the reaction is part of
     * reaction.message.channel.send(`The emoji used is ${reaction.emoji}`);
     * @returns {string}
     */
    toString() {
      return this.id ? `<:${this.name}:${this.id}>` : this.name;
    }
  }
  
  module.exports = ReactionEmoji;
  
  
  /***/ }),
  /* 31 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collection = __webpack_require__(3);
  const EventEmitter = __webpack_require__(20).EventEmitter;
  
  /**
   * Filter to be applied to the collector.
   * @typedef {Function} CollectorFilter
   * @param {...*} args Any arguments received by the listener
   * @param {Collection} collection The items collected by this collector
   * @returns {boolean}
   */
  
  /**
   * Options to be applied to the collector.
   * @typedef {Object} CollectorOptions
   * @property {number} [time] How long to run the collector for
   */
  
  /**
   * Abstract class for defining a new Collector.
   * @abstract
   */
  class Collector extends EventEmitter {
    constructor(client, filter, options = {}) {
      super();
  
      /**
       * The client
       * @name Collector#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      /**
       * The filter applied to this collector
       * @type {CollectorFilter}
       */
      this.filter = filter;
  
      /**
       * The options of this collector
       * @type {CollectorOptions}
       */
      this.options = options;
  
      /**
       * The items collected by this collector
       * @type {Collection}
       */
      this.collected = new Collection();
  
      /**
       * Whether this collector has finished collecting
       * @type {boolean}
       */
      this.ended = false;
  
      /**
       * Timeout for cleanup
       * @type {?Timeout}
       * @private
       */
      this._timeout = null;
  
      /**
       * Call this to handle an event as a collectable element
       * Accepts any event data as parameters
       * @type {Function}
       * @private
       */
      this.listener = this._handle.bind(this);
      if (options.time) this._timeout = this.client.setTimeout(() => this.stop('time'), options.time);
    }
  
    /**
     * @param {...*} args The arguments emitted by the listener
     * @emits Collector#collect
     * @private
     */
    _handle(...args) {
      const collect = this.handle(...args);
      if (!collect || !this.filter(...args, this.collected)) return;
  
      this.collected.set(collect.key, collect.value);
  
      /**
       * Emitted whenever an element is collected.
       * @event Collector#collect
       * @param {*} element The element that got collected
       * @param {Collector} collector The collector
       */
      this.emit('collect', collect.value, this);
  
      const post = this.postCheck(...args);
      if (post) this.stop(post);
    }
  
    /**
     * Return a promise that resolves with the next collected element;
     * rejects with collected elements if the collector finishes without receiving a next element
     * @type {Promise}
     * @readonly
     */
    get next() {
      return new Promise((resolve, reject) => {
        if (this.ended) {
          reject(this.collected);
          return;
        }
  
        const cleanup = () => {
          this.removeListener('collect', onCollect);
          this.removeListener('end', onEnd);
        };
  
        const onCollect = item => {
          cleanup();
          resolve(item);
        };
  
        const onEnd = () => {
          cleanup();
          reject(this.collected); // eslint-disable-line prefer-promise-reject-errors
        };
  
        this.on('collect', onCollect);
        this.on('end', onEnd);
      });
    }
  
    /**
     * Stop this collector and emit the `end` event.
     * @param {string} [reason='user'] The reason this collector is ending
     * @emits Collector#end
     */
    stop(reason = 'user') {
      if (this.ended) return;
  
      if (this._timeout) this.client.clearTimeout(this._timeout);
      this.ended = true;
      this.cleanup();
  
      /**
       * Emitted when the collector is finished collecting.
       * @event Collector#end
       * @param {Collection} collected The elements collected by the collector
       * @param {string} reason The reason the collector ended
       */
      this.emit('end', this.collected, reason);
    }
  
    /* eslint-disable no-empty-function, valid-jsdoc */
    /**
     * Handles incoming events from the `listener` function. Returns null if the event should not be collected,
     * or returns an object describing the data that should be stored.
     * @see Collector#listener
     * @param {...*} args Any args the event listener emits
     * @returns {?{key: string, value}} Data to insert into collection, if any
     * @abstract
     */
    handle() {}
  
    /**
     * This method runs after collection to see if the collector should finish.
     * @param {...*} args Any args the event listener emits
     * @returns {?string} Reason to end the collector, if any
     * @abstract
     */
    postCheck() {}
  
    /**
     * Called when the collector is ending.
     * @abstract
     */
    cleanup() {}
    /* eslint-enable no-empty-function, valid-jsdoc */
  }
  
  module.exports = Collector;
  
  
  /***/ }),
  /* 32 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Snowflake = __webpack_require__(7);
  const util = __webpack_require__(6);
  
  /**
   * Represents an OAuth2 Application.
   */
  class OAuth2Application {
    constructor(client, data) {
      /**
       * The client that instantiated the application
       * @name OAuth2Application#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of the app
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The name of the app
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The app's description
       * @type {string}
       */
      this.description = data.description;
  
      /**
       * The app's icon hash
       * @type {?string}
       */
      this.icon = data.icon;
  
      /**
       * The app's icon URL
       * @type {string}
       */
      this.iconURL = `https://cdn.discordapp.com/app-icons/${this.id}/${this.icon}.jpg`;
  
      /**
       * The app's RPC origins
       * @type {?string[]}
       */
      this.rpcOrigins = data.rpc_origins;
  
      /**
       * The app's redirect URIs
       * @type {string[]}
       */
      this.redirectURIs = data.redirect_uris;
  
      /**
       * If this app's bot requires a code grant when using the OAuth2 flow
       * @type {boolean}
       */
      this.botRequireCodeGrant = data.bot_require_code_grant;
  
      /**
       * If this app's bot is public
       * @type {boolean}
       */
      this.botPublic = data.bot_public;
  
      /**
       * If this app can use rpc
       * @type {boolean}
       */
      this.rpcApplicationState = data.rpc_application_state;
  
      /**
       * Object containing basic info about this app's bot
       * @type {Object}
       */
      this.bot = data.bot;
  
      /**
       * The flags for the app
       * @type {number}
       */
      this.flags = data.flags;
  
      /**
       * OAuth2 secret for the application
       * @type {boolean}
       */
      this.secret = data.secret;
  
      if (data.owner) {
        /**
         * The owner of this OAuth application
         * @type {?User}
         */
        this.owner = this.client.dataManager.newUser(data.owner);
      }
    }
  
    /**
     * The timestamp the app was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time the app was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  
    /**
     * Reset the app's secret and bot token.
     * <warn>This is only available when using a user account.</warn>
     * @returns {OAuth2Application}
     */
    reset() {
      return this.client.rest.methods.resetApplication(this.id);
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the app name rather than the app object.
     * @returns {string}
     */
    toString() {
      return this.name;
    }
  }
  
  OAuth2Application.prototype.reset =
    util.deprecate(OAuth2Application.prototype.reset, 'OAuth2Application#reset: userbot methods will be removed');
  
  module.exports = OAuth2Application;
  
  
  /***/ }),
  /* 33 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Channel = __webpack_require__(12);
  const TextBasedChannel = __webpack_require__(15);
  const Collection = __webpack_require__(3);
  const Constants = __webpack_require__(0);
  
  /*
  { type: 3,
    recipients:
     [ { username: 'Charlie',
         id: '123',
         discriminator: '6631',
         avatar: '123' },
       { username: 'Ben',
         id: '123',
         discriminator: '2055',
         avatar: '123' },
       { username: 'Adam',
         id: '123',
         discriminator: '2406',
         avatar: '123' } ],
    owner_id: '123',
    name: null,
    last_message_id: '123',
    id: '123',
    icon: null }
  */
  
  /**
   * Represents a Group DM on Discord.
   * @extends {Channel}
   * @implements {TextBasedChannel}
   */
  class GroupDMChannel extends Channel {
    constructor(client, data) {
      super(client, data);
      this.type = 'group';
      this.messages = new Collection();
      this._typing = new Map();
    }
  
    setup(data) {
      super.setup(data);
  
      /**
       * The name of this Group DM, can be null if one isn't set
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * A hash of this Group DM icon
       * @type {?string}
       */
      this.icon = data.icon;
  
      /**
       * The user ID of this Group DM's owner
       * @type {string}
       */
      this.ownerID = data.owner_id;
  
      /**
       * If the DM is managed by an application
       * @type {boolean}
       */
      this.managed = data.managed;
  
      /**
       * Application ID of the application that made this Group DM, if applicable
       * @type {?string}
       */
      this.applicationID = data.application_id;
  
      if (data.nicks) {
        /**
         * Nicknames for group members
         * @type {?Collection<Snowflake, string>}
         */
        this.nicks = new Collection(data.nicks.map(n => [n.id, n.nick]));
      }
  
      if (!this.recipients) {
        /**
         * A collection of the recipients of this DM, mapped by their ID
         * @type {Collection<Snowflake, User>}
         */
        this.recipients = new Collection();
      }
  
      if (data.recipients) {
        for (const recipient of data.recipients) {
          const user = this.client.dataManager.newUser(recipient);
          this.recipients.set(user.id, user);
        }
      }
  
      /**
       * The ID of the last message in the channel, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = data.last_message_id;
    }
  
    /**
     * The owner of this Group DM
     * @type {User}
     * @readonly
     */
    get owner() {
      return this.client.users.get(this.ownerID);
    }
  
    /**
     * The URL to this guild's icon
     * @type {?string}
     * @readonly
     */
    get iconURL() {
      if (!this.icon) return null;
      return Constants.Endpoints.Channel(this).Icon(this.client.options.http.cdn, this.icon);
    }
  
    edit(data) {
      const _data = {};
      if (data.name) _data.name = data.name;
      if (typeof data.icon !== 'undefined') _data.icon = data.icon;
      return this.client.rest.methods.updateGroupDMChannel(this, _data);
    }
  
    /**
     * Whether this channel equals another channel. It compares all properties, so for most operations
     * it is advisable to just compare `channel.id === channel2.id` as it is much faster and is often
     * what most users need.
     * @param {GroupDMChannel} channel Channel to compare with
     * @returns {boolean}
     */
    equals(channel) {
      const equal = channel &&
        this.id === channel.id &&
        this.name === channel.name &&
        this.icon === channel.icon &&
        this.ownerID === channel.ownerID;
  
      if (equal) {
        return this.recipients.equals(channel.recipients);
      }
  
      return equal;
    }
  
    /**
     * Add a user to the DM
     * @param {UserResolvable|string} accessTokenOrID Access token or user resolvable
     * @param {string} [nick] Permanent nickname to give the user (only available if a bot is creating the DM)
     * @returns {Promise<GroupDMChannel>}
     */
  
    addUser(accessTokenOrID, nick) {
      return this.client.rest.methods.addUserToGroupDM(this, {
        nick,
        id: this.client.resolver.resolveUserID(accessTokenOrID),
        accessToken: accessTokenOrID,
      });
    }
  
    /**
     * Set a new GroupDMChannel icon.
     * @param {Base64Resolvable|BufferResolvable} icon The new icon of the group dm
     * @returns {Promise<GroupDMChannel>}
     * @example
     * // Edit the group dm icon
     * channel.setIcon('./icon.png')
     *  .then(updated => console.log('Updated the channel icon'))
     *  .catch(console.error);
     */
    setIcon(icon) {
      return this.client.resolver.resolveImage(icon).then(data => this.edit({ icon: data }));
    }
  
    /**
     * Sets a new name for this Group DM.
     * @param {string} name New name for this Group DM
     * @returns {Promise<GroupDMChannel>}
     */
    setName(name) {
      return this.edit({ name });
    }
  
    /**
     * Removes a user from this Group DM.
     * @param {UserResolvable} user User to remove
     * @returns {Promise<GroupDMChannel>}
     */
    removeUser(user) {
      const id = this.client.resolver.resolveUserID(user);
      return this.client.rest.methods.removeUserFromGroupDM(this, id);
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the channel's name instead of the Channel object.
     * @returns {string}
     * @example
     * // Logs: Hello from My Group DM!
     * console.log(`Hello from ${channel}!`);
     * @example
     * // Logs: Hello from My Group DM!
     * console.log(`Hello from ' + channel + '!');
     */
    toString() {
      return this.name;
    }
  
    // These are here only for documentation purposes - they are implemented by TextBasedChannel
    /* eslint-disable no-empty-function */
    send() {}
    sendMessage() {}
    sendEmbed() {}
    sendFile() {}
    sendFiles() {}
    sendCode() {}
    fetchMessage() {}
    fetchMessages() {}
    fetchPinnedMessages() {}
    search() {}
    startTyping() {}
    stopTyping() {}
    get typing() {}
    get typingCount() {}
    createCollector() {}
    createMessageCollector() {}
    awaitMessages() {}
    // Doesn't work on Group DMs; bulkDelete() {}
    acknowledge() {}
    _cacheMessage() {}
  }
  
  TextBasedChannel.applyToClass(GroupDMChannel, true, ['bulkDelete']);
  
  module.exports = GroupDMChannel;
  
  
  /***/ }),
  /* 34 */
  /***/ (function(module, exports) {
  
  /**
   * Represents an error from the Discord API.
   * @extends Error
   */
  class DiscordAPIError extends Error {
    constructor(path, error, method) {
      super();
      const flattened = this.constructor.flattenErrors(error.errors || error).join('\n');
      this.name = 'DiscordAPIError';
      this.message = error.message && flattened ? `${error.message}\n${flattened}` : error.message || flattened;
  
      /**
       * The path of the request relative to the HTTP endpoint
       * @type {string}
       */
      this.path = path;
  
      /**
       * HTTP error code returned by Discord
       * @type {number}
       */
      this.code = error.code;
  
      /**
       * The HTTP method used for the request
       * @type {string}
       */
      this.method = method;
    }
  
    /**
     * Flattens an errors object returned from the API into an array.
     * @param {Object} obj Discord errors object
     * @param {string} [key] Used internally to determine key names of nested fields
     * @returns {string[]}
     * @private
     */
    static flattenErrors(obj, key = '') {
      let messages = [];
  
      for (const k of Object.keys(obj)) {
        if (k === 'message') continue;
        const newKey = key ? isNaN(k) ? `${key}.${k}` : `${key}[${k}]` : k;
  
        if (obj[k]._errors) {
          messages.push(`${newKey}: ${obj[k]._errors.map(e => e.message).join(' ')}`);
        } else if (obj[k].code || obj[k].message) {
          messages.push(`${obj[k].code ? `${obj[k].code}: ` : ''}: ${obj[k].message}`.trim());
        } else if (typeof obj[k] === 'string') {
          messages.push(obj[k]);
        } else {
          messages = messages.concat(this.flattenErrors(obj[k], newKey));
        }
      }
  
      return messages;
    }
  }
  
  module.exports = DiscordAPIError;
  
  
  /***/ }),
  /* 35 */
  /***/ (function(module, exports) {
  
  var g;
  
  // This works in non-strict mode
  g = (function() {
      return this;
  })();
  
  try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1,eval)("this");
  } catch(e) {
      // This works if the window reference is available
      if(typeof window === "object")
          g = window;
  }
  
  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}
  
  module.exports = g;
  
  
  /***/ }),
  /* 36 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  exports.decode = exports.parse = __webpack_require__(65);
  exports.encode = exports.stringify = __webpack_require__(66);
  
  
  /***/ }),
  /* 37 */
  /***/ (function(module, exports) {
  
  module.exports = {"name":"discord.js","version":"11.4.2","description":"A powerful library for interacting with the Discord API","main":"./src/index","types":"./typings/index.d.ts","scripts":{"test":"npm run lint && npm run docs:test","docs":"docgen --source src --custom docs/index.yml --output docs/docs.json","docs:test":"docgen --source src --custom docs/index.yml","lint":"eslint src","lint:fix":"eslint --fix src","webpack":"parallel-webpack"},"repository":{"type":"git","url":"git+https://github.com/discordjs/discord.js.git"},"keywords":["discord","api","bot","client","node","discordapp"],"author":"Amish Shah <amishshah.2k@gmail.com>","license":"Apache-2.0","bugs":{"url":"https://github.com/discordjs/discord.js/issues"},"homepage":"https://github.com/discordjs/discord.js#readme","runkitExampleFilename":"./docs/examples/ping.js","dependencies":{"long":"^4.0.0","prism-media":"^0.0.3","snekfetch":"^3.6.4","tweetnacl":"^1.0.0","ws":"^4.0.0"},"peerDependencies":{"bufferutil":"^3.0.3","erlpack":"discordapp/erlpack","node-opus":"^0.2.7","opusscript":"^0.0.6","sodium":"^2.0.3","libsodium-wrappers":"^0.7.3","uws":"^9.14.0"},"devDependencies":{"@types/node":"^9.4.6","discord.js-docgen":"discordjs/docgen","eslint":"^4.18.0","parallel-webpack":"^2.2.0","uglifyjs-webpack-plugin":"^1.2.0","webpack":"^3.11.0"},"engines":{"node":">=6.0.0"},"browser":{"ws":false,"uws":false,"erlpack":false,"prism-media":false,"opusscript":false,"node-opus":false,"tweetnacl":false,"sodium":false,"src/sharding/Shard.js":false,"src/sharding/ShardClientUtil.js":false,"src/sharding/ShardingManager.js":false,"src/client/voice/dispatcher/StreamDispatcher.js":false,"src/client/voice/opus/BaseOpusEngine.js":false,"src/client/voice/opus/NodeOpusEngine.js":false,"src/client/voice/opus/OpusEngineList.js":false,"src/client/voice/opus/OpusScriptEngine.js":false,"src/client/voice/pcm/ConverterEngine.js":false,"src/client/voice/pcm/ConverterEngineList.js":false,"src/client/voice/pcm/FfmpegConverterEngine.js":false,"src/client/voice/player/AudioPlayer.js":false,"src/client/voice/receiver/VoiceReadable.js":false,"src/client/voice/receiver/VoiceReceiver.js":false,"src/client/voice/util/Secretbox.js":false,"src/client/voice/util/SecretKey.js":false,"src/client/voice/util/VolumeInterface.js":false,"src/client/voice/ClientVoiceManager.js":false,"src/client/voice/VoiceBroadcast.js":false,"src/client/voice/VoiceConnection.js":false,"src/client/voice/VoiceUDPClient.js":false,"src/client/voice/VoiceWebSocket.js":false}}
  
  /***/ }),
  /* 38 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const UserAgentManager = __webpack_require__(73);
  const RESTMethods = __webpack_require__(74);
  const SequentialRequestHandler = __webpack_require__(79);
  const BurstRequestHandler = __webpack_require__(80);
  const APIRequest = __webpack_require__(81);
  const Constants = __webpack_require__(0);
  
  class RESTManager {
    constructor(client) {
      this.client = client;
      this.handlers = {};
      this.userAgentManager = new UserAgentManager(this);
      this.methods = new RESTMethods(this);
      this.rateLimitedEndpoints = {};
      this.globallyRateLimited = false;
    }
  
    destroy() {
      for (const handlerKey of Object.keys(this.handlers)) {
        const handler = this.handlers[handlerKey];
        if (handler.destroy) handler.destroy();
      }
    }
  
    push(handler, apiRequest) {
      return new Promise((resolve, reject) => {
        handler.push({
          request: apiRequest,
          resolve,
          reject,
        });
      });
    }
  
    getRequestHandler() {
      switch (this.client.options.apiRequestMethod) {
        case 'sequential':
          return SequentialRequestHandler;
        case 'burst':
          return BurstRequestHandler;
        default:
          throw new Error(Constants.Errors.INVALID_RATE_LIMIT_METHOD);
      }
    }
  
    makeRequest(method, url, auth, data, file, reason) {
      const apiRequest = new APIRequest(this, method, url, auth, data, file, reason);
      if (!this.handlers[apiRequest.route]) {
        const RequestHandlerType = this.getRequestHandler();
        this.handlers[apiRequest.route] = new RequestHandlerType(this, apiRequest.route);
      }
  
      return this.push(this.handlers[apiRequest.route], apiRequest);
    }
  }
  
  module.exports = RESTManager;
  
  
  /***/ }),
  /* 39 */
  /***/ (function(module, exports) {
  
  
  
  /***/ }),
  /* 40 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collection = __webpack_require__(3);
  
  /**
   * Keeps track of mentions in a {@link Message}.
   */
  class MessageMentions {
    constructor(message, users, roles, everyone) {
      /**
       * Whether `@everyone` or `@here` were mentioned
       * @type {boolean}
       */
      this.everyone = Boolean(everyone);
  
      if (users) {
        if (users instanceof Collection) {
          /**
           * Any users that were mentioned
           * @type {Collection<Snowflake, User>}
           */
          this.users = new Collection(users);
        } else {
          this.users = new Collection();
          for (const mention of users) {
            let user = message.client.users.get(mention.id);
            if (!user) user = message.client.dataManager.newUser(mention);
            this.users.set(user.id, user);
          }
        }
      } else {
        this.users = new Collection();
      }
  
      if (roles) {
        if (roles instanceof Collection) {
          /**
           * Any roles that were mentioned
           * @type {Collection<Snowflake, Role>}
           */
          this.roles = new Collection(roles);
        } else {
          this.roles = new Collection();
          for (const mention of roles) {
            const role = message.channel.guild.roles.get(mention);
            if (role) this.roles.set(role.id, role);
          }
        }
      } else {
        this.roles = new Collection();
      }
  
      /**
       * Content of the message
       * @type {Message}
       * @private
       */
      this._content = message.content;
  
      /**
       * The client the message is from
       * @type {Client}
       * @private
       */
      this._client = message.client;
  
      /**
       * The guild the message is in
       * @type {?Guild}
       * @private
       */
      this._guild = message.channel.guild;
  
      /**
       * Cached members for {@MessageMention#members}
       * @type {?Collection<Snowflake, GuildMember>}
       * @private
       */
      this._members = null;
  
      /**
       * Cached channels for {@MessageMention#channels}
       * @type {?Collection<Snowflake, GuildChannel>}
       * @private
       */
      this._channels = null;
    }
  
    /**
     * Any members that were mentioned (only in {@link TextChannel}s)
     * @type {?Collection<Snowflake, GuildMember>}
     * @readonly
     */
    get members() {
      if (this._members) return this._members;
      if (!this._guild) return null;
      this._members = new Collection();
      this.users.forEach(user => {
        const member = this._guild.member(user);
        if (member) this._members.set(member.user.id, member);
      });
      return this._members;
    }
  
    /**
     * Any channels that were mentioned
     * @type {Collection<Snowflake, GuildChannel>}
     * @readonly
     */
    get channels() {
      if (this._channels) return this._channels;
      this._channels = new Collection();
      let matches;
      while ((matches = this.constructor.CHANNELS_PATTERN.exec(this._content)) !== null) {
        const chan = this._client.channels.get(matches[1]);
        if (chan) this._channels.set(chan.id, chan);
      }
      return this._channels;
    }
  }
  
  /**
   * Regular expression that globally matches `@everyone` and `@here`
   * @type {RegExp}
   */
  MessageMentions.EVERYONE_PATTERN = /@(everyone|here)/g;
  
  /**
   * Regular expression that globally matches user mentions like `<@81440962496172032>`
   * @type {RegExp}
   */
  MessageMentions.USERS_PATTERN = /<@!?[0-9]+>/g;
  
  /**
   * Regular expression that globally matches role mentions like `<@&297577916114403338>`
   * @type {RegExp}
   */
  MessageMentions.ROLES_PATTERN = /<@&[0-9]+>/g;
  
  /**
   * Regular expression that globally matches channel mentions like `<#222079895583457280>`
   * @type {RegExp}
   */
  MessageMentions.CHANNELS_PATTERN = /<#([0-9]+)>/g;
  
  module.exports = MessageMentions;
  
  
  /***/ }),
  /* 41 */
  /***/ (function(module, exports) {
  
  /**
   * Represents an attachment in a message.
   */
  class MessageAttachment {
    constructor(message, data) {
      /**
       * The client that instantiated this MessageAttachment
       * @name MessageAttachment#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: message.client });
  
      /**
       * The message this attachment is part of
       * @type {Message}
       */
      this.message = message;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of this attachment
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The file name of this attachment
       * @type {string}
       */
      this.filename = data.filename;
  
      /**
       * The size of this attachment in bytes
       * @type {number}
       */
      this.filesize = data.size;
  
      /**
       * The URL to this attachment
       * @type {string}
       */
      this.url = data.url;
  
      /**
       * The Proxy URL to this attachment
       * @type {string}
       */
      this.proxyURL = data.proxy_url;
  
      /**
       * The height of this attachment (if an image)
       * @type {?number}
       */
      this.height = data.height;
  
      /**
       * The width of this attachment (if an image)
       * @type {?number}
       */
      this.width = data.width;
    }
  }
  
  module.exports = MessageAttachment;
  
  
  /***/ }),
  /* 42 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collection = __webpack_require__(3);
  const Emoji = __webpack_require__(17);
  const ReactionEmoji = __webpack_require__(30);
  
  /**
   * Represents a reaction to a message.
   */
  class MessageReaction {
    constructor(message, emoji, count, me) {
      /**
       * The message that this reaction refers to
       * @type {Message}
       */
      this.message = message;
  
      /**
       * Whether the client has given this reaction
       * @type {boolean}
       */
      this.me = me;
  
      /**
       * The number of people that have given the same reaction
       * @type {number}
       */
      this.count = count || 0;
  
      /**
       * The users that have given this reaction, mapped by their ID
       * @type {Collection<Snowflake, User>}
       */
      this.users = new Collection();
  
      this._emoji = new ReactionEmoji(this, emoji.name, emoji.id);
    }
  
    /**
     * The emoji of this reaction, either an Emoji object for known custom emojis, or a ReactionEmoji
     * object which has fewer properties. Whatever the prototype of the emoji, it will still have
     * `name`, `id`, `identifier` and `toString()`
     * @type {Emoji|ReactionEmoji}
     * @readonly
     */
    get emoji() {
      if (this._emoji instanceof Emoji) return this._emoji;
      // Check to see if the emoji has become known to the client
      if (this._emoji.id) {
        const emojis = this.message.client.emojis;
        if (emojis.has(this._emoji.id)) {
          const emoji = emojis.get(this._emoji.id);
          this._emoji = emoji;
          return emoji;
        }
      }
      return this._emoji;
    }
  
    /**
     * Removes a user from this reaction.
     * @param {UserResolvable} [user=this.message.client.user] The user to remove the reaction of
     * @returns {Promise<MessageReaction>}
     */
    remove(user = this.message.client.user) {
      const message = this.message;
      const userID = this.message.client.resolver.resolveUserID(user);
      if (!userID) return Promise.reject(new Error('Couldn\'t resolve the user ID to remove from the reaction.'));
      return message.client.rest.methods.removeMessageReaction(
        message, this.emoji.identifier, userID
      );
    }
  
    /**
     * Fetch all the users that gave this reaction. Resolves with a collection of users, mapped by their IDs.
     * @param {number} [limit=100] The maximum amount of users to fetch, defaults to 100
     * @param {Object} [options] Options to fetch users
     * @param {Snowflake} [options.before] Limit fetching users to those with an id lower than the supplied id
     * @param {Snowflake} [options.after] Limit fetching users to those with an id greater than the supplied id
     * @returns {Promise<Collection<Snowflake, User>>}
     */
    fetchUsers(limit = 100, { after, before } = {}) {
      const message = this.message;
      return message.client.rest.methods.getMessageReactionUsers(
        message, this.emoji.identifier, { after, before, limit }
      ).then(data => {
        const users = new Collection();
        for (const rawUser of data) {
          const user = this.message.client.dataManager.newUser(rawUser);
          this.users.set(user.id, user);
          users.set(user.id, user);
        }
        return users;
      });
    }
  }
  
  module.exports = MessageReaction;
  
  
  /***/ }),
  /* 43 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collector = __webpack_require__(31);
  const Collection = __webpack_require__(3);
  
  /**
   * @typedef {CollectorOptions} ReactionCollectorOptions
   * @property {number} max The maximum total amount of reactions to collect
   * @property {number} maxEmojis The maximum number of emojis to collect
   * @property {number} maxUsers The maximum number of users to react
   */
  
  /**
   * Collects reactions on messages.
   * @extends {Collector}
   */
  class ReactionCollector extends Collector {
    /**
     * @param {Message} message The message upon which to collect reactions
     * @param {CollectorFilter} filter The filter to apply to this collector
     * @param {ReactionCollectorOptions} [options={}] The options to apply to this collector
     */
    constructor(message, filter, options = {}) {
      super(message.client, filter, options);
  
      /**
       * The message
       * @type {Message}
       */
      this.message = message;
  
      /**
       * The users which have reacted
       * @type {Collection}
       */
      this.users = new Collection();
  
      /**
       * The total number of reactions collected
       * @type {number}
       */
      this.total = 0;
  
      this.client.setMaxListeners(this.client.getMaxListeners() + 1);
      this.client.on('messageReactionAdd', this.listener);
    }
  
    /**
     * Handle an incoming reaction for possible collection.
     * @param {MessageReaction} reaction The reaction to possibly collect
     * @returns {?{key: Snowflake, value: MessageReaction}}
     * @private
     */
    handle(reaction) {
      if (reaction.message.id !== this.message.id) return null;
      return {
        key: reaction.emoji.id || reaction.emoji.name,
        value: reaction,
      };
    }
  
    /**
     * Check after collection to see if the collector is done.
     * @param {MessageReaction} reaction The reaction that was collected
     * @param {User} user The user that reacted
     * @returns {?string} Reason to end the collector, if any
     * @private
     */
    postCheck(reaction, user) {
      this.users.set(user.id, user);
      if (this.options.max && ++this.total >= this.options.max) return 'limit';
      if (this.options.maxEmojis && this.collected.size >= this.options.maxEmojis) return 'emojiLimit';
      if (this.options.maxUsers && this.users.size >= this.options.maxUsers) return 'userLimit';
      return null;
    }
  
    /**
     * Remove event listeners.
     * @private
     */
    cleanup() {
      this.client.removeListener('messageReactionAdd', this.listener);
      this.client.setMaxListeners(this.client.getMaxListeners() - 1);
    }
  }
  
  module.exports = ReactionCollector;
  
  
  /***/ }),
  /* 44 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collector = __webpack_require__(31);
  const util = __webpack_require__(6);
  
  /**
   * @typedef {CollectorOptions} MessageCollectorOptions
   * @property {number} max The maximum amount of messages to process
   * @property {number} maxMatches The maximum amount of messages to collect
   */
  
  /**
   * Collects messages on a channel.
   * @extends {Collector}
   */
  class MessageCollector extends Collector {
    /**
     * @param {TextChannel|DMChannel|GroupDMChannel} channel The channel
     * @param {CollectorFilter} filter The filter to be applied to this collector
     * @param {MessageCollectorOptions} options The options to be applied to this collector
     * @emits MessageCollector#message
     */
    constructor(channel, filter, options = {}) {
      super(channel.client, filter, options);
  
      /**
       * The channel
       * @type {TextBasedChannel}
       */
      this.channel = channel;
  
      /**
       * Total number of messages that were received in the channel during message collection
       * @type {number}
       */
      this.received = 0;
  
      this.client.setMaxListeners(this.client.getMaxListeners() + 1);
      this.client.on('message', this.listener);
  
      // For backwards compatibility (remove in v12)
      if (this.options.max) this.options.maxProcessed = this.options.max;
      if (this.options.maxMatches) this.options.max = this.options.maxMatches;
      this._reEmitter = message => {
        /**
         * Emitted when the collector receives a message.
         * @event MessageCollector#message
         * @param {Message} message The message
         * @deprecated
         */
        this.emit('message', message);
      };
      this.on('collect', this._reEmitter);
    }
  
    // Remove in v12
    on(eventName, listener) {
      if (eventName === 'message') {
        listener = util.deprecate(listener, 'MessageCollector will soon no longer emit "message", use "collect" instead');
      }
      super.on(eventName, listener);
    }
  
    /**
     * Handle an incoming message for possible collection.
     * @param {Message} message The message that could be collected
     * @returns {?{key: Snowflake, value: Message}}
     * @private
     */
    handle(message) {
      if (message.channel.id !== this.channel.id) return null;
      this.received++;
      return {
        key: message.id,
        value: message,
      };
    }
  
    /**
     * Check after collection to see if the collector is done.
     * @returns {?string} Reason to end the collector, if any
     * @private
     */
    postCheck() {
      // Consider changing the end reasons for v12
      if (this.options.maxMatches && this.collected.size >= this.options.max) return 'matchesLimit';
      if (this.options.max && this.received >= this.options.maxProcessed) return 'limit';
      return null;
    }
  
    /**
     * Removes event listeners.
     * @private
     */
    cleanup() {
      this.removeListener('collect', this._reEmitter);
      this.client.removeListener('message', this.listener);
      this.client.setMaxListeners(this.client.getMaxListeners() - 1);
    }
  }
  
  module.exports = MessageCollector;
  
  
  /***/ }),
  /* 45 */
  /***/ (function(module, exports) {
  
  /*
  { splash: null,
       id: '123123123',
       icon: '123123123',
       name: 'name' }
  */
  
  /**
   * Represents a guild that the client only has limited information for - e.g. from invites.
   */
  class PartialGuild {
    constructor(client, data) {
      /**
       * The client that instantiated this PartialGuild
       * @name PartialGuild#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of this guild
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The name of this guild
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The hash of this guild's icon
       * @type {?string}
       */
      this.icon = data.icon;
  
      /**
       * The hash of the guild splash image (VIP only)
       * @type {?string}
       */
      this.splash = data.splash;
    }
  }
  
  module.exports = PartialGuild;
  
  
  /***/ }),
  /* 46 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  
  /*
  { type: 0, id: '123123', name: 'heavy-testing' } }
  */
  
  /**
   * Represents a guild channel that the client only has limited information for - e.g. from invites.
   */
  class PartialGuildChannel {
    constructor(client, data) {
      /**
       * The client that instantiated this PartialGuildChannel
       * @name PartialGuildChannel#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of this guild channel
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The name of this guild channel
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The type of this guild channel - `text` or `voice`
       * @type {string}
       */
      this.type = Constants.ChannelTypes.TEXT === data.type ? 'text' : 'voice';
    }
  }
  
  module.exports = PartialGuildChannel;
  
  
  /***/ }),
  /* 47 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collection = __webpack_require__(3);
  const Snowflake = __webpack_require__(7);
  const Webhook = __webpack_require__(24);
  const Invite = __webpack_require__(23);
  
  /**
   * The target type of an entry, e.g. `GUILD`. Here are the available types:
   * * GUILD
   * * CHANNEL
   * * USER
   * * ROLE
   * * INVITE
   * * WEBHOOK
   * * EMOJI
   * * MESSAGE
   * @typedef {string} AuditLogTargetType
   */
  
  /**
   * Key mirror of all available audit log targets.
   * @name GuildAuditLogs.Targets
   * @type {AuditLogTargetType}
   */
  const Targets = {
    ALL: 'ALL',
    GUILD: 'GUILD',
    CHANNEL: 'CHANNEL',
    USER: 'USER',
    ROLE: 'ROLE',
    INVITE: 'INVITE',
    WEBHOOK: 'WEBHOOK',
    EMOJI: 'EMOJI',
    MESSAGE: 'MESSAGE',
  };
  
  /**
   * The action of an entry. Here are the available actions:
   * * ALL: null
   * * GUILD_UPDATE: 1
   * * CHANNEL_CREATE: 10
   * * CHANNEL_UPDATE: 11
   * * CHANNEL_DELETE: 12
   * * CHANNEL_OVERWRITE_CREATE: 13
   * * CHANNEL_OVERWRITE_UPDATE: 14
   * * CHANNEL_OVERWRITE_DELETE: 15
   * * MEMBER_KICK: 20
   * * MEMBER_PRUNE: 21
   * * MEMBER_BAN_ADD: 22
   * * MEMBER_BAN_REMOVE: 23
   * * MEMBER_UPDATE: 24
   * * MEMBER_ROLE_UPDATE: 25
   * * ROLE_CREATE: 30
   * * ROLE_UPDATE: 31
   * * ROLE_DELETE: 32
   * * INVITE_CREATE: 40
   * * INVITE_UPDATE: 41
   * * INVITE_DELETE: 42
   * * WEBHOOK_CREATE: 50
   * * WEBHOOK_UPDATE: 51
   * * WEBHOOK_DELETE: 52
   * * EMOJI_CREATE: 60
   * * EMOJI_UPDATE: 61
   * * EMOJI_DELETE: 62
   * * MESSAGE_DELETE: 72
   * @typedef {?number|string} AuditLogAction
   */
  
  /**
   * All available actions keyed under their names to their numeric values.
   * @name GuildAuditLogs.Actions
   * @type {AuditLogAction}
   */
  const Actions = {
    ALL: null,
    GUILD_UPDATE: 1,
    CHANNEL_CREATE: 10,
    CHANNEL_UPDATE: 11,
    CHANNEL_DELETE: 12,
    CHANNEL_OVERWRITE_CREATE: 13,
    CHANNEL_OVERWRITE_UPDATE: 14,
    CHANNEL_OVERWRITE_DELETE: 15,
    MEMBER_KICK: 20,
    MEMBER_PRUNE: 21,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_ROLE_UPDATE: 25,
    ROLE_CREATE: 30,
    ROLE_UPDATE: 31,
    ROLE_DELETE: 32,
    INVITE_CREATE: 40,
    INVITE_UPDATE: 41,
    INVITE_DELETE: 42,
    WEBHOOK_CREATE: 50,
    WEBHOOK_UPDATE: 51,
    WEBHOOK_DELETE: 52,
    EMOJI_CREATE: 60,
    EMOJI_UPDATE: 61,
    EMOJI_DELETE: 62,
    MESSAGE_DELETE: 72,
  };
  
  
  /**
   * Audit logs entries are held in this class.
   */
  class GuildAuditLogs {
    constructor(guild, data) {
      if (data.users) for (const user of data.users) guild.client.dataManager.newUser(user);
  
      /**
       * Cached webhooks
       * @type {Collection<Snowflake, Webhook>}
       * @private
       */
      this.webhooks = new Collection();
      if (data.webhooks) {
        for (const hook of data.webhooks) {
          this.webhooks.set(hook.id, new Webhook(guild.client, hook));
        }
      }
  
      /**
       * The entries for this guild's audit logs
       * @type {Collection<Snowflake, GuildAuditLogsEntry>}
       */
      this.entries = new Collection();
      for (const item of data.audit_log_entries) {
        const entry = new GuildAuditLogsEntry(this, guild, item);
        this.entries.set(entry.id, entry);
      }
    }
  
    /**
     * Handles possible promises for entry targets.
     * @returns {Promise<GuildAuditLogs>}
     */
    static build(...args) {
      const logs = new GuildAuditLogs(...args);
      return Promise.all(logs.entries.map(e => e.target)).then(() => logs);
    }
  
    /**
     * The target of an entry. It can be one of:
     * * A guild
     * * A user
     * * A role
     * * An emoji
     * * An invite
     * * A webhook
     * * An object where the keys represent either the new value or the old value
     * @typedef {?Object|Guild|User|Role|Emoji|Invite|Webhook} AuditLogEntryTarget
     */
  
    /**
     * Find target type from entry action.
     * @param {number} target The action target
     * @returns {?string}
     */
    static targetType(target) {
      if (target < 10) return Targets.GUILD;
      if (target < 20) return Targets.CHANNEL;
      if (target < 30) return Targets.USER;
      if (target < 40) return Targets.ROLE;
      if (target < 50) return Targets.INVITE;
      if (target < 60) return Targets.WEBHOOK;
      if (target < 70) return Targets.EMOJI;
      if (target < 80) return Targets.MESSAGE;
      return null;
    }
  
    /**
     * The action type of an entry, e.g. `CREATE`. Here are the available types:
     * * CREATE
     * * DELETE
     * * UPDATE
     * * ALL
     * @typedef {string} AuditLogActionType
     */
  
  
    /**
     * Finds the action type from the entry action.
     * @param {AuditLogAction} action The action target
     * @returns {AuditLogActionType}
     */
    static actionType(action) {
      if ([
        Actions.CHANNEL_CREATE,
        Actions.CHANNEL_OVERWRITE_CREATE,
        Actions.MEMBER_BAN_REMOVE,
        Actions.ROLE_CREATE,
        Actions.INVITE_CREATE,
        Actions.WEBHOOK_CREATE,
        Actions.EMOJI_CREATE,
      ].includes(action)) return 'CREATE';
  
      if ([
        Actions.CHANNEL_DELETE,
        Actions.CHANNEL_OVERWRITE_DELETE,
        Actions.MEMBER_KICK,
        Actions.MEMBER_PRUNE,
        Actions.MEMBER_BAN_ADD,
        Actions.ROLE_DELETE,
        Actions.INVITE_DELETE,
        Actions.WEBHOOK_DELETE,
        Actions.EMOJI_DELETE,
        Actions.MESSAGE_DELETE,
      ].includes(action)) return 'DELETE';
  
      if ([
        Actions.GUILD_UPDATE,
        Actions.CHANNEL_UPDATE,
        Actions.CHANNEL_OVERWRITE_UPDATE,
        Actions.MEMBER_UPDATE,
        Actions.MEMBER_ROLE_UPDATE,
        Actions.ROLE_UPDATE,
        Actions.INVITE_UPDATE,
        Actions.WEBHOOK_UPDATE,
        Actions.EMOJI_UPDATE,
      ].includes(action)) return 'UPDATE';
  
      return 'ALL';
    }
  }
  
  /**
   * Audit logs entry.
   */
  class GuildAuditLogsEntry {
    constructor(logs, guild, data) {
      const targetType = GuildAuditLogs.targetType(data.action_type);
      /**
       * The target type of this entry
       * @type {AuditLogTargetType}
       */
      this.targetType = targetType;
  
      /**
       * The action type of this entry
       * @type {AuditLogActionType}
       */
      this.actionType = GuildAuditLogs.actionType(data.action_type);
  
      /**
       * Specific action type of this entry in its string representation
       * @type {AuditLogAction}
       */
      this.action = Object.keys(Actions).find(k => Actions[k] === data.action_type);
  
      /**
       * The reason of this entry
       * @type {?string}
       */
      this.reason = data.reason || null;
  
      /**
       * The user that executed this entry
       * @type {User}
       */
      this.executor = guild.client.users.get(data.user_id);
  
      /**
       * An entry in the audit log representing a specific change.
       * @typedef {object} AuditLogChange
       * @property {string} key The property that was changed, e.g. `nick` for nickname changes
       * @property {*} [old] The old value of the change, e.g. for nicknames, the old nickname
       * @property {*} [new] The new value of the change, e.g. for nicknames, the new nickname
       */
  
      /**
       * Specific property changes
       * @type {AuditLogChange[]}
       */
      this.changes = data.changes ? data.changes.map(c => ({ key: c.key, old: c.old_value, new: c.new_value })) : null;
  
      /**
       * The ID of this entry
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * Any extra data from the entry
       * @type {?Object|Role|GuildMember}
       */
      this.extra = null;
      if (data.options) {
        if (data.action_type === Actions.MEMBER_PRUNE) {
          this.extra = {
            removed: data.options.members_removed,
            days: data.options.delete_member_days,
          };
        } else if (data.action_type === Actions.MESSAGE_DELETE) {
          this.extra = {
            count: data.options.count,
            channel: guild.channels.get(data.options.channel_id),
          };
        } else {
          switch (data.options.type) {
            case 'member':
              this.extra = guild.members.get(data.options.id);
              if (!this.extra) this.extra = { id: data.options.id };
              break;
            case 'role':
              this.extra = guild.roles.get(data.options.id);
              if (!this.extra) this.extra = { id: data.options.id, name: data.options.role_name };
              break;
            default:
              break;
          }
        }
      }
  
      if ([Targets.USER, Targets.GUILD].includes(targetType)) {
        /**
         * The target of this entry
         * @type {AuditLogEntryTarget}
         */
        this.target = guild.client[`${targetType.toLowerCase()}s`].get(data.target_id);
      } else if (targetType === Targets.WEBHOOK) {
        this.target = logs.webhooks.get(data.target_id) ||
          new Webhook(guild.client,
            this.changes.reduce((o, c) => {
              o[c.key] = c.new || c.old;
              return o;
            }, {
              id: data.target_id,
              guild_id: guild.id,
            }));
      } else if (targetType === Targets.INVITE) {
        const changes = this.changes.reduce((o, c) => {
          o[c.key] = c.new || c.old;
          return o;
        }, {
          id: data.target_id,
          guild,
        });
        changes.channel = { id: changes.channel_id };
        this.target = new Invite(guild.client, changes);
      } else if (targetType === Targets.MESSAGE) {
        this.target = guild.client.users.get(data.target_id);
      } else {
        this.target = guild[`${targetType.toLowerCase()}s`].get(data.target_id);
      }
    }
  
    /**
     * The timestamp this entry was created at
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
      return Snowflake.deconstruct(this.id).timestamp;
    }
  
    /**
     * The time this entry was created
     * @type {Date}
     * @readonly
     */
    get createdAt() {
      return new Date(this.createdTimestamp);
    }
  }
  
  GuildAuditLogs.Actions = Actions;
  GuildAuditLogs.Targets = Targets;
  GuildAuditLogs.Entry = GuildAuditLogsEntry;
  
  module.exports = GuildAuditLogs;
  
  
  /***/ }),
  /* 48 */
  /***/ (function(module, exports) {
  
  /**
   * A base class for different types of rate limiting handlers for the REST API.
   * @private
   */
  class RequestHandler {
    /**
     * @param {RESTManager} restManager The REST manager to use
     */
    constructor(restManager) {
      /**
       * The RESTManager that instantiated this RequestHandler
       * @type {RESTManager}
       */
      this.restManager = restManager;
  
      /**
       * A list of requests that have yet to be processed
       * @type {APIRequest[]}
       */
      this.queue = [];
    }
  
    /**
     * Whether or not the client is being rate limited on every endpoint
     * @type {boolean}
     * @readonly
     */
    get globalLimit() {
      return this.restManager.globallyRateLimited;
    }
  
    set globalLimit(value) {
      this.restManager.globallyRateLimited = value;
    }
  
    /**
     * Push a new API request into this bucket.
     * @param {APIRequest} request The new request to push into the queue
     */
    push(request) {
      this.queue.push(request);
    }
  
    /**
     * Attempts to get this RequestHandler to process its current queue.
     */
    handle() {} // eslint-disable-line no-empty-function
  
    destroy() {
      this.queue = [];
    }
  }
  
  module.exports = RequestHandler;
  
  
  /***/ }),
  /* 49 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const GuildChannel = __webpack_require__(19);
  
  /**
   * Represents a guild category channel on Discord.
   * @extends {GuildChannel}
   */
  class CategoryChannel extends GuildChannel {
    constructor(guild, data) {
      super(guild, data);
      this.type = 'category';
    }
    /**
     * The channels that are part of this category
     * @type {?Collection<Snowflake, GuildChannel>}
     * @readonly
     */
    get children() {
      return this.guild.channels.filter(c => c.parentID === this.id);
    }
  }
  
  module.exports = CategoryChannel;
  
  
  /***/ }),
  /* 50 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Permissions = __webpack_require__(5);
  
  /**
   * Represents a permission overwrite for a role or member in a guild channel.
   */
  class PermissionOverwrites {
    constructor(guildChannel, data) {
      /**
       * The GuildChannel this overwrite is for
       * @name PermissionOverwrites#channel
       * @type {GuildChannel}
       * @readonly
       */
      Object.defineProperty(this, 'channel', { value: guildChannel });
  
      if (data) this.setup(data);
    }
  
    setup(data) {
      /**
       * The ID of this overwrite, either a user ID or a role ID
       * @type {Snowflake}
       */
      this.id = data.id;
  
      /**
       * The type of this overwrite
       * @type {string}
       */
      this.type = data.type;
  
      /**
       * The permissions that are denied for the user or role as a bitfield.
       * @type {number}
       * @deprecated
       */
      this.deny = data.deny;
  
      /**
       * The permissions that are allowed for the user or role as a bitfield.
       * @type {number}
       * @deprecated
       */
      this.allow = data.allow;
  
      /**
       * The permissions that are denied for the user or role.
       * @type {Permissions}
       */
      this.denied = new Permissions(data.deny).freeze();
  
      /**
       * The permissions that are allowed for the user or role.
       * @type {Permissions}
       */
      this.allowed = new Permissions(data.allow).freeze();
    }
  
    /**
     * Delete this Permission Overwrite.
     * @param {string} [reason] Reason for deleting this overwrite
     * @returns {Promise<PermissionOverwrites>}
     */
    delete(reason) {
      return this.channel.client.rest.methods.deletePermissionOverwrites(this, reason);
    }
  }
  
  module.exports = PermissionOverwrites;
  
  
  /***/ }),
  /* 51 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Channel = __webpack_require__(12);
  const TextBasedChannel = __webpack_require__(15);
  const Collection = __webpack_require__(3);
  
  /**
   * Represents a direct message channel between two users.
   * @extends {Channel}
   * @implements {TextBasedChannel}
   */
  class DMChannel extends Channel {
    constructor(client, data) {
      super(client, data);
      this.type = 'dm';
      this.messages = new Collection();
      this._typing = new Map();
    }
  
    setup(data) {
      super.setup(data);
  
      /**
       * The recipient on the other end of the DM
       * @type {User}
       */
      this.recipient = this.client.dataManager.newUser(data.recipients[0]);
  
      /**
       * The ID of the last message in the channel, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = data.last_message_id;
    }
  
    /**
     * When concatenated with a string, this automatically concatenates the recipient's mention instead of the
     * DM channel object.
     * @returns {string}
     */
    toString() {
      return this.recipient.toString();
    }
  
    // These are here only for documentation purposes - they are implemented by TextBasedChannel
    /* eslint-disable no-empty-function */
    send() {}
    sendMessage() {}
    sendEmbed() {}
    sendFile() {}
    sendFiles() {}
    sendCode() {}
    fetchMessage() {}
    fetchMessages() {}
    fetchPinnedMessages() {}
    search() {}
    startTyping() {}
    stopTyping() {}
    get typing() {}
    get typingCount() {}
    createCollector() {}
    createMessageCollector() {}
    awaitMessages() {}
    // Doesn't work on DM channels; bulkDelete() {}
    acknowledge() {}
    _cacheMessage() {}
  }
  
  TextBasedChannel.applyToClass(DMChannel, true, ['bulkDelete']);
  
  module.exports = DMChannel;
  
  
  /***/ }),
  /* 52 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const GuildChannel = __webpack_require__(19);
  const TextBasedChannel = __webpack_require__(15);
  const Collection = __webpack_require__(3);
  
  /**
   * Represents a guild text channel on Discord.
   * @extends {GuildChannel}
   * @implements {TextBasedChannel}
   */
  class TextChannel extends GuildChannel {
    constructor(guild, data) {
      super(guild, data);
      this.type = 'text';
      this.messages = new Collection();
      this._typing = new Map();
    }
  
    setup(data) {
      super.setup(data);
  
      /**
       * The topic of the text channel
       * @type {?string}
       */
      this.topic = data.topic;
  
      /**
       * If the Discord considers this channel NSFW
       * @type {boolean}
       * @readonly
       */
      this.nsfw = Boolean(data.nsfw);
  
      /**
       * The ID of the last message sent in this channel, if one was sent
       * @type {?Snowflake}
       */
      this.lastMessageID = data.last_message_id;
    }
  
    /**
     * A collection of members that can see this channel, mapped by their ID
     * @type {Collection<Snowflake, GuildMember>}
     * @readonly
     */
    get members() {
      const members = new Collection();
      for (const member of this.guild.members.values()) {
        if (this.permissionsFor(member).has('READ_MESSAGES')) {
          members.set(member.id, member);
        }
      }
      return members;
    }
  
    /**
     * Fetch all webhooks for the channel.
     * @returns {Promise<Collection<Snowflake, Webhook>>}
     * @example
     * // Fetch webhooks
     * channel.fetchWebhooks()
     *   .then(hooks => console.log(`This channel has ${hooks.size} hooks`))
     *   .catch(console.error);
     */
    fetchWebhooks() {
      return this.client.rest.methods.getChannelWebhooks(this);
    }
  
    /**
     * Sets whether this channel is flagged as NSFW.
     * @param {boolean} nsfw Whether the channel should be considered NSFW
     * @param {string} [reason] Reason for changing the channel's NSFW flag
     * @returns {Promise<TextChannel>}
     */
    setNSFW(nsfw, reason) {
      return this.edit({ nsfw }, reason);
    }
  
    /**
     * Create a webhook for the channel.
     * @param {string} name The name of the webhook
     * @param {BufferResolvable|Base64Resolvable} [avatar] The avatar for the webhook
     * @param {string} [reason] Reason for creating this webhook
     * @returns {Promise<Webhook>} webhook The created webhook
     * @example
     * channel.createWebhook('Snek', 'https://i.imgur.com/mI8XcpG.jpg')
     *   .then(webhook => console.log(`Created webhook ${webhook}`))
     *   .catch(console.error)
     */
    createWebhook(name, avatar, reason) {
      if (typeof avatar === 'string' && avatar.startsWith('data:')) {
        return this.client.rest.methods.createWebhook(this, name, avatar, reason);
      } else {
        return this.client.resolver.resolveImage(avatar).then(data =>
          this.client.rest.methods.createWebhook(this, name, data, reason)
        );
      }
    }
  
    // These are here only for documentation purposes - they are implemented by TextBasedChannel
    /* eslint-disable no-empty-function */
    send() { }
    sendMessage() { }
    sendEmbed() { }
    sendFile() { }
    sendFiles() { }
    sendCode() { }
    fetchMessage() { }
    fetchMessages() { }
    fetchPinnedMessages() { }
    search() { }
    startTyping() { }
    stopTyping() { }
    get typing() { }
    get typingCount() { }
    createCollector() { }
    createMessageCollector() { }
    awaitMessages() { }
    bulkDelete() { }
    acknowledge() { }
    _cacheMessage() { }
  }
  
  TextBasedChannel.applyToClass(TextChannel, true);
  
  module.exports = TextChannel;
  
  
  /***/ }),
  /* 53 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const GuildChannel = __webpack_require__(19);
  const Collection = __webpack_require__(3);
  const Permissions = __webpack_require__(5);
  
  /**
   * Represents a guild voice channel on Discord.
   * @extends {GuildChannel}
   */
  class VoiceChannel extends GuildChannel {
    constructor(guild, data) {
      super(guild, data);
  
      /**
       * The members in this voice channel
       * @type {Collection<Snowflake, GuildMember>}
       */
      this.members = new Collection();
  
      this.type = 'voice';
    }
  
    setup(data) {
      super.setup(data);
  
      /**
       * The bitrate of this voice channel
       * @type {number}
       */
      this.bitrate = data.bitrate * 0.001;
  
      /**
       * The maximum amount of users allowed in this channel - 0 means unlimited.
       * @type {number}
       */
      this.userLimit = data.user_limit;
    }
  
    /**
     * The voice connection for this voice channel, if the client is connected
     * @type {?VoiceConnection}
     * @readonly
     */
    get connection() {
      const connection = this.guild.voiceConnection;
      if (connection && connection.channel.id === this.id) return connection;
      return null;
    }
  
    /**
     * Checks if the voice channel is full
     * @type {boolean}
     * @readonly
     */
    get full() {
      return this.userLimit > 0 && this.members.size >= this.userLimit;
    }
  
    /**
     * Whether the channel is deletable by the client user
     * @type {boolean}
     * @readonly
     */
    get deletable() {
      return super.deletable && this.permissionsFor(this.client.user).has(Permissions.FLAGS.CONNECT);
    }
  
    /**
     * Checks if the client has permission join the voice channel
     * @type {boolean}
     * @readonly
     */
    get joinable() {
      if (this.client.browser) return false;
      if (!this.permissionsFor(this.client.user).has('CONNECT')) return false;
      if (this.full && !this.permissionsFor(this.client.user).has('MOVE_MEMBERS')) return false;
      return true;
    }
  
    /**
     * Checks if the client has permission to send audio to the voice channel
     * @type {boolean}
     * @readonly
     */
    get speakable() {
      return this.permissionsFor(this.client.user).has('SPEAK');
    }
  
    /**
     * Sets the bitrate of the channel (in kbps).
     * @param {number} bitrate The new bitrate
     * @param {string} [reason] Reason for changing the channel's bitrate
     * @returns {Promise<VoiceChannel>}
     * @example
     * // Set the bitrate of a voice channel
     * voiceChannel.setBitrate(48)
     *   .then(vc => console.log(`Set bitrate to ${vc.bitrate}kbps for ${vc.name}`))
     *   .catch(console.error);
     */
    setBitrate(bitrate, reason) {
      bitrate *= 1000;
      return this.edit({ bitrate }, reason);
    }
  
    /**
     * Sets the user limit of the channel.
     * @param {number} userLimit The new user limit
     * @param {string} [reason] Reason for changing the user limit
     * @returns {Promise<VoiceChannel>}
     * @example
     * // Set the user limit of a voice channel
     * voiceChannel.setUserLimit(42)
     *   .then(vc => console.log(`Set user limit to ${vc.userLimit} for ${vc.name}`))
     *   .catch(console.error);
     */
    setUserLimit(userLimit, reason) {
      return this.edit({ userLimit }, reason);
    }
  
    /**
     * Attempts to join this voice channel.
     * @returns {Promise<VoiceConnection>}
     * @example
     * // Join a voice channel
     * voiceChannel.join()
     *   .then(connection => console.log('Connected!'))
     *   .catch(console.error);
     */
    join() {
      if (this.client.browser) return Promise.reject(new Error('Voice connections are not available in browsers.'));
      return this.client.voice.joinChannel(this);
    }
  
    /**
     * Leaves this voice channel.
     * @example
     * // Leave a voice channel
     * voiceChannel.leave();
     */
    leave() {
      if (this.client.browser) return;
      const connection = this.client.voice.connections.get(this.guild.id);
      if (connection && connection.channel.id === this.id) connection.disconnect();
    }
  }
  
  module.exports = VoiceChannel;
  
  
  /***/ }),
  /* 54 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(Buffer) {const browser = typeof window !== 'undefined';
  const EventEmitter = __webpack_require__(20);
  const Constants = __webpack_require__(0);
  const zlib = __webpack_require__(39);
  const PacketManager = __webpack_require__(84);
  const erlpack = (function findErlpack() {
    try {
      const e = __webpack_require__(123);
      if (!e.pack) return null;
      return e;
    } catch (e) {
      return null;
    }
  }());
  
  const WebSocket = (function findWebSocket() {
    if (browser) return window.WebSocket; // eslint-disable-line no-undef
    try {
      return __webpack_require__(124);
    } catch (e) {
      return __webpack_require__(125);
    }
  }());
  
  /**
   * Abstracts a WebSocket connection with decoding/encoding for the Discord gateway.
   * @private
   */
  class WebSocketConnection extends EventEmitter {
    /**
     * @param {WebSocketManager} manager The WebSocket manager
     * @param {string} gateway The WebSocket gateway to connect to
     */
    constructor(manager, gateway) {
      super();
      /**
       * The WebSocket Manager of this connection
       * @type {WebSocketManager}
       */
      this.manager = manager;
  
      /**
       * The client this belongs to
       * @type {Client}
       */
      this.client = manager.client;
  
      /**
       * The WebSocket connection itself
       * @type {WebSocket}
       */
      this.ws = null;
  
      /**
       * The current sequence of the WebSocket
       * @type {number}
       */
      this.sequence = -1;
  
      /**
       * The current status of the client
       * @type {number}
       */
      this.status = Constants.Status.IDLE;
  
      /**
       * The Packet Manager of the connection
       * @type {WebSocketPacketManager}
       */
      this.packetManager = new PacketManager(this);
  
      /**
       * The last time a ping was sent (a timestamp)
       * @type {number}
       */
      this.lastPingTimestamp = 0;
  
      /**
       * Contains the rate limit queue and metadata
       * @type {Object}
       */
      this.ratelimit = {
        queue: [],
        remaining: 120,
        total: 120,
        time: 60e3,
        resetTimer: null,
      };
      this.connect(gateway);
  
      /**
       * Events that are disabled (will not be processed)
       * @type {Object}
       */
      this.disabledEvents = {};
  
      /**
       * The sequence on WebSocket close
       * @type {number}
       */
      this.closeSequence = 0;
  
      /**
       * Whether or not the WebSocket is expecting to be closed
       * @type {boolean}
       */
      this.expectingClose = false;
      for (const event of this.client.options.disabledEvents) this.disabledEvents[event] = true;
    }
  
    /**
     * Causes the client to be marked as ready and emits the ready event.
     * @returns {void}
     */
    triggerReady() {
      if (this.status === Constants.Status.READY) {
        this.debug('Tried to mark self as ready, but already ready');
        return;
      }
      /**
       * Emitted when the client becomes ready to start working.
       * @event Client#ready
       */
      this.status = Constants.Status.READY;
      this.client.emit(Constants.Events.READY);
      this.packetManager.handleQueue();
    }
  
    /**
     * Checks whether the client is ready to be marked as ready.
     * @returns {void}
     */
    checkIfReady() {
      if (this.status === Constants.Status.READY || this.status === Constants.Status.NEARLY) return false;
      let unavailableGuilds = 0;
      for (const guild of this.client.guilds.values()) {
        if (!guild.available) unavailableGuilds++;
      }
      if (unavailableGuilds === 0) {
        this.status = Constants.Status.NEARLY;
        if (!this.client.options.fetchAllMembers) return this.triggerReady();
        // Fetch all members before marking self as ready
        const promises = this.client.guilds.map(g => g.fetchMembers());
        Promise.all(promises)
          .then(() => this.triggerReady())
          .catch(e => {
            this.debug(`Failed to fetch all members before ready! ${e}`);
            this.triggerReady();
          });
      }
      return true;
    }
  
    // Util
    /**
     * Emits a debug message.
     * @param {string} message Debug message
     * @returns {void}
     */
    debug(message) {
      if (message instanceof Error) message = message.stack;
      return this.manager.debug(`[connection] ${message}`);
    }
  
    /**
     * Attempts to serialise data from the WebSocket.
     * @param {string|Object} data Data to unpack
     * @returns {Object}
     */
    unpack(data) {
      if (data instanceof ArrayBuffer) data = Buffer.from(new Uint8Array(data));
  
      if (erlpack && typeof data !== 'string') return erlpack.unpack(data);
      else if (data instanceof Buffer) data = zlib.inflateSync(data).toString();
  
      return JSON.parse(data);
    }
  
    /**
     * Packs an object ready to be sent.
     * @param {Object} data Data to pack
     * @returns {string|Buffer}
     */
    pack(data) {
      return erlpack ? erlpack.pack(data) : JSON.stringify(data);
    }
  
    /**
     * Processes the current WebSocket queue.
     */
    processQueue() {
      if (this.ratelimit.remaining === 0) return;
      if (this.ratelimit.queue.length === 0) return;
      if (this.ratelimit.remaining === this.ratelimit.total) {
        this.ratelimit.resetTimer = this.client.setTimeout(() => {
          this.ratelimit.remaining = this.ratelimit.total;
          this.processQueue();
        }, this.ratelimit.time);
      }
      while (this.ratelimit.remaining > 0) {
        const item = this.ratelimit.queue.shift();
        if (!item) return;
        this._send(item);
        this.ratelimit.remaining--;
      }
    }
  
    /**
     * Sends data, bypassing the queue.
     * @param {Object} data Packet to send
     * @returns {void}
     */
    _send(data) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.debug(`Tried to send packet ${data} but no WebSocket is available!`);
        return;
      }
      this.ws.send(this.pack(data));
    }
  
    /**
     * Adds data to the queue to be sent.
     * @param {Object} data Packet to send
     * @returns {void}
     */
    send(data) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.debug(`Tried to send packet ${data} but no WebSocket is available!`);
        return;
      }
      this.ratelimit.queue.push(data);
      this.processQueue();
    }
  
    /**
     * Creates a connection to a gateway.
     * @param {string} gateway The gateway to connect to
     * @param {number} [after=0] How long to wait before connecting
     * @param {boolean} [force=false] Whether or not to force a new connection even if one already exists
     * @returns {boolean}
     */
    connect(gateway = this.gateway, after = 0, force = false) {
      if (after) return this.client.setTimeout(() => this.connect(gateway, 0, force), after); // eslint-disable-line
      if (this.ws && !force) {
        this.debug('WebSocket connection already exists');
        return false;
      } else if (typeof gateway !== 'string') {
        this.debug(`Tried to connect to an invalid gateway: ${gateway}`);
        return false;
      }
      this.expectingClose = false;
      this.gateway = gateway;
      this.debug(`Connecting to ${gateway}`);
      const ws = this.ws = new WebSocket(gateway);
      if (browser) ws.binaryType = 'arraybuffer';
      ws.onmessage = this.onMessage.bind(this);
      ws.onopen = this.onOpen.bind(this);
      ws.onerror = this.onError.bind(this);
      ws.onclose = this.onClose.bind(this);
      this.status = Constants.Status.CONNECTING;
      return true;
    }
  
    /**
     * Destroys the connection.
     * @returns {boolean}
     */
    destroy() {
      const ws = this.ws;
      if (!ws) {
        this.debug('Attempted to destroy WebSocket but no connection exists!');
        return false;
      }
      this.heartbeat(-1);
      this.expectingClose = true;
      ws.close(1000);
      this.packetManager.handleQueue();
      this.ws = null;
      this.status = Constants.Status.DISCONNECTED;
      this.ratelimit.remaining = this.ratelimit.total;
      return true;
    }
  
    /**
     * Called whenever a message is received.
     * @param {Event} event Event received
     * @returns {boolean}
     */
    onMessage(event) {
      let data;
      try {
        data = this.unpack(event.data);
      } catch (err) {
        this.emit('debug', err);
      }
      return this.onPacket(data);
    }
  
    /**
     * Sets the current sequence of the connection.
     * @param {number} s New sequence
     */
    setSequence(s) {
      this.sequence = s > this.sequence ? s : this.sequence;
    }
  
    /**
     * Called whenever a packet is received.
     * @param {Object} packet Received packet
     * @returns {boolean}
     */
    onPacket(packet) {
      if (!packet) {
        this.debug('Received null packet');
        return false;
      }
      this.client.emit('raw', packet);
      switch (packet.op) {
        case Constants.OPCodes.HELLO:
          return this.heartbeat(packet.d.heartbeat_interval);
        case Constants.OPCodes.RECONNECT:
          return this.reconnect();
        case Constants.OPCodes.INVALID_SESSION:
          if (!packet.d) this.sessionID = null;
          this.sequence = -1;
          this.debug('Session invalidated -- will identify with a new session');
          return this.identify(packet.d ? 2500 : 0);
        case Constants.OPCodes.HEARTBEAT_ACK:
          return this.ackHeartbeat();
        case Constants.OPCodes.HEARTBEAT:
          return this.heartbeat();
        default:
          return this.packetManager.handle(packet);
      }
    }
  
    /**
     * Called whenever a connection is opened to the gateway.
     * @param {Event} event Received open event
     */
    onOpen(event) {
      if (event && event.target && event.target.url) this.gateway = event.target.url;
      this.debug(`Connected to gateway ${this.gateway}`);
      this.identify();
    }
  
    /**
     * Causes a reconnection to the gateway.
     */
    reconnect() {
      this.debug('Attemping to reconnect in 5500ms...');
      /**
       * Emitted whenever the client tries to reconnect to the WebSocket.
       * @event Client#reconnecting
       */
      this.client.emit(Constants.Events.RECONNECTING);
      this.connect(this.gateway, 5500, true);
    }
  
    /**
     * Called whenever an error occurs with the WebSocket.
     * @param {Error} error The error that occurred
     */
    onError(error) {
      if (error && error.message === 'uWs client connection error') {
        this.reconnect();
        return;
      }
      /**
       * Emitted whenever the client's WebSocket encounters a connection error.
       * @event Client#error
       * @param {Error} error The encountered error
       */
      this.client.emit(Constants.Events.ERROR, error);
    }
  
    /**
     * @external CloseEvent
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent}
     */
  
    /**
     * Called whenever a connection to the gateway is closed.
     * @param {CloseEvent} event Close event that was received
     */
    onClose(event) {
      this.debug(`${this.expectingClose ? 'Client' : 'Server'} closed the WebSocket connection: ${event.code}`);
      this.closeSequence = this.sequence;
      // Reset the state before trying to fix anything
      this.emit('close', event);
      this.heartbeat(-1);
      // Should we reconnect?
      if (event.code === 1000 ? this.expectingClose : Constants.WSCodes[event.code]) {
        this.expectingClose = false;
        /**
         * Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.
         * @event Client#disconnect
         * @param {CloseEvent} event The WebSocket close event
         */
        this.client.emit(Constants.Events.DISCONNECT, event);
        this.debug(Constants.WSCodes[event.code]);
        this.destroy();
        return;
      }
      this.expectingClose = false;
      this.reconnect();
    }
  
    // Heartbeat
    /**
     * Acknowledges a heartbeat.
     */
    ackHeartbeat() {
      this.debug(`Heartbeat acknowledged, latency of ${Date.now() - this.lastPingTimestamp}ms`);
      this.client._pong(this.lastPingTimestamp);
    }
  
    /**
     * Sends a heartbeat or sets an interval for sending heartbeats.
     * @param {number} [time] If -1, clears the interval, any other number sets an interval
     * If no value is given, a heartbeat will be sent instantly
     */
    heartbeat(time) {
      if (!isNaN(time)) {
        if (time === -1) {
          this.debug('Clearing heartbeat interval');
          this.client.clearInterval(this.heartbeatInterval);
          this.heartbeatInterval = null;
        } else {
          this.debug(`Setting a heartbeat interval for ${time}ms`);
          this.heartbeatInterval = this.client.setInterval(() => this.heartbeat(), time);
        }
        return;
      }
      this.debug('Sending a heartbeat');
      this.lastPingTimestamp = Date.now();
      this.send({
        op: Constants.OPCodes.HEARTBEAT,
        d: this.sequence,
      });
    }
  
    // Identification
    /**
     * Identifies the client on a connection.
     * @param {number} [after] How long to wait before identifying
     * @returns {void}
     */
    identify(after) {
      if (after) return this.client.setTimeout(this.identify.bind(this), after);
      return this.sessionID ? this.identifyResume() : this.identifyNew();
    }
  
    /**
     * Identifies as a new connection on the gateway.
     * @returns {void}
     */
    identifyNew() {
      if (!this.client.token) {
        this.debug('No token available to identify a new session with');
        return;
      }
      // Clone the generic payload and assign the token
      const d = Object.assign({ token: this.client.token }, this.client.options.ws);
  
      // Sharding stuff
      const { shardId, shardCount } = this.client.options;
      if (shardCount > 0) d.shard = [Number(shardId), Number(shardCount)];
  
      // Send the payload
      this.debug('Identifying as a new session');
      this.send({ op: Constants.OPCodes.IDENTIFY, d });
    }
  
    /**
     * Resumes a session on the gateway.
     * @returns {void}
     */
    identifyResume() {
      if (!this.sessionID) {
        this.debug('Warning: wanted to resume but session ID not available; identifying as a new session instead');
        return this.identifyNew();
      }
      this.debug(`Attempting to resume session ${this.sessionID}`);
  
      const d = {
        token: this.client.token,
        session_id: this.sessionID,
        seq: this.sequence,
      };
  
      return this.send({
        op: Constants.OPCodes.RESUME,
        d,
      });
    }
  }
  
  /**
   * Encoding the WebSocket connections will use.
   * @type {string}
   */
  WebSocketConnection.ENCODING = erlpack ? 'etf' : 'json';
  WebSocketConnection.WebSocket = WebSocket;
  
  module.exports = WebSocketConnection;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))
  
  /***/ }),
  /* 55 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const User = __webpack_require__(10);
  const Collection = __webpack_require__(3);
  const ClientUserSettings = __webpack_require__(56);
  const ClientUserGuildSettings = __webpack_require__(57);
  const Constants = __webpack_require__(0);
  const util = __webpack_require__(6);
  
  /**
   * Represents the logged in client's Discord user.
   * @extends {User}
   */
  class ClientUser extends User {
    setup(data) {
      super.setup(data);
  
      /**
       * Whether or not this account has been verified
       * @type {boolean}
       */
      this.verified = data.verified;
  
      /**
       * The email of this account
       * <warn>This is only filled when using a user account.</warn>
       * @type {?string}
       */
      this.email = data.email;
      this.localPresence = {};
      this._typing = new Map();
  
      /**
       * A Collection of friends for the logged in user
       * <warn>This is only filled when using a user account.</warn>
       * @type {Collection<Snowflake, User>}
       */
      this.friends = new Collection();
  
      /**
       * A Collection of blocked users for the logged in user
       * <warn>This is only filled when using a user account.</warn>
       * @type {Collection<Snowflake, User>}
       */
      this.blocked = new Collection();
  
      /**
       * A Collection of notes for the logged in user
       * <warn>This is only filled when using a user account.</warn>
       * @type {Collection<Snowflake, string>}
       */
      this.notes = new Collection();
  
      /**
       * If the user has Discord premium (nitro)
       * <warn>This is only filled when using a user account.</warn>
       * @type {?boolean}
       */
      this.premium = typeof data.premium === 'boolean' ? data.premium : null;
  
      /**
       * If the user has MFA enabled on their account
       * <warn>This is only filled when using a user account.</warn>
       * @type {?boolean}
       */
      this.mfaEnabled = typeof data.mfa_enabled === 'boolean' ? data.mfa_enabled : null;
  
      /**
       * If the user has ever used a mobile device on Discord
       * <warn>This is only filled when using a user account.</warn>
       * @type {?boolean}
       */
      this.mobile = typeof data.mobile === 'boolean' ? data.mobile : null;
  
      /**
       * Various settings for this user
       * <warn>This is only filled when using a user account.</warn>
       * @type {?ClientUserSettings}
       */
      this.settings = data.user_settings ? new ClientUserSettings(this, data.user_settings) : null;
  
      /**
       * All of the user's guild settings
       * <warn>This is only filled when using a user account</warn>
       * @type {Collection<Snowflake, ClientUserGuildSettings>}
       */
      this.guildSettings = new Collection();
      if (data.user_guild_settings) {
        for (const settings of data.user_guild_settings) {
          this.guildSettings.set(settings.guild_id, new ClientUserGuildSettings(settings, this.client));
        }
      }
    }
  
    edit(data) {
      return this.client.rest.methods.updateCurrentUser(data);
    }
  
    /**
     * Set the username of the logged in client.
     * <info>Changing usernames in Discord is heavily rate limited, with only 2 requests
     * every hour. Use this sparingly!</info>
     * @param {string} username The new username
     * @param {string} [password] Current password (only for user accounts)
     * @returns {Promise<ClientUser>}
     * @example
     * // Set username
     * client.user.setUsername('discordjs')
     *   .then(user => console.log(`My new username is ${user.username}`))
     *   .catch(console.error);
     */
    setUsername(username, password) {
      return this.client.rest.methods.updateCurrentUser({ username }, password);
    }
  
    /**
     * Changes the email for the client user's account.
     * <warn>This is only available when using a user account.</warn>
     * @param {string} email New email to change to
     * @param {string} password Current password
     * @returns {Promise<ClientUser>}
     * @example
     * // Set email
     * client.user.setEmail('bob@gmail.com', 'some amazing password 123')
     *   .then(user => console.log(`My new email is ${user.email}`))
     *   .catch(console.error);
     */
    setEmail(email, password) {
      return this.client.rest.methods.updateCurrentUser({ email }, password);
    }
  
    /**
     * Changes the password for the client user's account.
     * <warn>This is only available when using a user account.</warn>
     * @param {string} newPassword New password to change to
     * @param {string} oldPassword Current password
     * @returns {Promise<ClientUser>}
     * @example
     * // Set password
     * client.user.setPassword('some new amazing password 456', 'some amazing password 123')
     *   .then(user => console.log('New password set!'))
     *   .catch(console.error);
     */
    setPassword(newPassword, oldPassword) {
      return this.client.rest.methods.updateCurrentUser({ password: newPassword }, oldPassword);
    }
  
    /**
     * Set the avatar of the logged in client.
     * @param {BufferResolvable|Base64Resolvable} avatar The new avatar
     * @returns {Promise<ClientUser>}
     * @example
     * // Set avatar
     * client.user.setAvatar('./avatar.png')
     *   .then(user => console.log(`New avatar set!`))
     *   .catch(console.error);
     */
    setAvatar(avatar) {
      return this.client.resolver.resolveImage(avatar).then(data =>
        this.client.rest.methods.updateCurrentUser({ avatar: data })
      );
    }
  
    /**
     * Data resembling a raw Discord presence.
     * @typedef {Object} PresenceData
     * @property {PresenceStatus} [status] Status of the user
     * @property {boolean} [afk] Whether the user is AFK
     * @property {Object} [game] Game the user is playing
     * @property {string} [game.name] Name of the game
     * @property {string} [game.url] Twitch stream URL
     * @property {?ActivityType|number} [game.type] Type of the activity
     */
  
    /**
     * Sets the full presence of the client user.
     * @param {PresenceData} data Data for the presence
     * @returns {Promise<ClientUser>}
     * @example
     * // Set the client user's presence
     * client.user.setPresence({ game: { name: 'with discord.js' }, status: 'idle' })
     *   .then(console.log)
     *   .catch(console.error);
     */
    setPresence(data) {
      // {"op":3,"d":{"status":"dnd","since":0,"game":null,"afk":false}}
      return new Promise(resolve => {
        let status = this.localPresence.status || this.presence.status;
        let game = this.localPresence.game;
        let afk = this.localPresence.afk || this.presence.afk;
  
        if (!game && this.presence.game) {
          game = {
            name: this.presence.game.name,
            type: this.presence.game.type,
            url: this.presence.game.url,
          };
        }
  
        if (data.status) {
          if (typeof data.status !== 'string') throw new TypeError('Status must be a string');
          if (this.bot) {
            status = data.status;
          } else {
            this.settings.update(Constants.UserSettingsMap.status, data.status);
            status = 'invisible';
          }
        }
  
        if (data.game) {
          game = data.game;
          game.type = game.url && typeof game.type === 'undefined' ? 1 : game.type || 0;
          if (typeof game.type === 'string') {
            game.type = Constants.ActivityTypes.indexOf(game.type.toUpperCase());
          }
        } else if (typeof data.game !== 'undefined') {
          game = null;
        }
  
        if (typeof data.afk !== 'undefined') afk = data.afk;
        afk = Boolean(afk);
  
        this.localPresence = { status, game, afk };
        this.localPresence.since = 0;
        this.localPresence.game = this.localPresence.game || null;
  
        this.client.ws.send({
          op: 3,
          d: this.localPresence,
        });
  
        this.client._setPresence(this.id, this.localPresence);
  
        resolve(this);
      });
    }
  
    /**
     * A user's status. Must be one of:
     * * `online`
     * * `idle`
     * * `invisible`
     * * `dnd` (do not disturb)
     * @typedef {string} PresenceStatus
     */
  
    /**
     * Sets the status of the client user.
     * @param {PresenceStatus} status Status to change to
     * @returns {Promise<ClientUser>}
     * @example
     * // Set the client user's status
     * client.user.setStatus('idle')
     *   .then(console.log)
     *   .catch(console.error);
     */
    setStatus(status) {
      return this.setPresence({ status });
    }
  
    /**
     * Sets the game the client user is playing.
     * @param {?string} game Game being played
     * @param {?string} [streamingURL] Twitch stream URL
     * @returns {Promise<ClientUser>}
     * @deprecated
     */
    setGame(game, streamingURL) {
      if (!game) return this.setPresence({ game: null });
      return this.setPresence({
        game: {
          name: game,
          url: streamingURL,
        },
      });
    }
  
    /**
     * Sets the activity the client user is playing.
     * @param {?string} name Activity being played
     * @param {Object} [options] Options for setting the activity
     * @param {string} [options.url] Twitch stream URL
     * @param {ActivityType|number} [options.type] Type of the activity
     * @returns {Promise<Presence>}
     * @example
     * client.user.setActivity('YouTube', { type: 'WATCHING' })
     *   .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
     *   .catch(console.error);
     */
    setActivity(name, { url, type } = {}) {
      if (!name) return this.setPresence({ game: null });
      return this.setPresence({
        game: { name, type, url },
      }).then(clientUser => clientUser.presence);
    }
  
    /**
     * Sets/removes the AFK flag for the client user.
     * @param {boolean} afk Whether or not the user is AFK
     * @returns {Promise<ClientUser>}
     */
    setAFK(afk) {
      return this.setPresence({ afk });
    }
  
    /**
     * Fetches messages that mentioned the client's user.
     * <warn>This is only available when using a user account.</warn>
     * @param {Object} [options] Options for the fetch
     * @param {number} [options.limit=25] Maximum number of mentions to retrieve
     * @param {boolean} [options.roles=true] Whether to include role mentions
     * @param {boolean} [options.everyone=true] Whether to include everyone/here mentions
     * @param {GuildResolvable} [options.guild] Limit the search to a specific guild
     * @returns {Promise<Message[]>}
     * @example
     * // Fetch mentions
     * client.user.fetchMentions()
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetch mentions from a guild
     * client.user.fetchMentions({ guild: '222078108977594368' })
     *   .then(console.log)
     *   .catch(console.error);
     */
    fetchMentions(options = {}) {
      return this.client.rest.methods.fetchMentions(options);
    }
  
    /**
     * Send a friend request.
     * <warn>This is only available when using a user account.</warn>
     * @param {UserResolvable} user The user to send the friend request to
     * @returns {Promise<User>} The user the friend request was sent to
     */
    addFriend(user) {
      user = this.client.resolver.resolveUser(user);
      return this.client.rest.methods.addFriend(user);
    }
  
    /**
     * Remove a friend.
     * <warn>This is only available when using a user account.</warn>
     * @param {UserResolvable} user The user to remove from your friends
     * @returns {Promise<User>} The user that was removed
     */
    removeFriend(user) {
      user = this.client.resolver.resolveUser(user);
      return this.client.rest.methods.removeFriend(user);
    }
  
    /**
     * Creates a guild.
     * <warn>This is only available to bots in less than 10 guilds and user accounts.</warn>
     * @param {string} name The name of the guild
     * @param {string} [region] The region for the server
     * @param {BufferResolvable|Base64Resolvable} [icon=null] The icon for the guild
     * @returns {Promise<Guild>} The guild that was created
     */
    createGuild(name, region, icon = null) {
      if (typeof icon === 'string' && icon.startsWith('data:')) {
        return this.client.rest.methods.createGuild({ name, icon, region });
      } else {
        return this.client.resolver.resolveImage(icon).then(data =>
          this.client.rest.methods.createGuild({ name, icon: data, region })
        );
      }
    }
  
    /**
     * An object containing either a user or access token, and an optional nickname.
     * @typedef {Object} GroupDMRecipientOptions
     * @property {UserResolvable|Snowflake} [user] User to add to the Group DM
     * (only available if a user is creating the DM)
     * @property {string} [accessToken] Access token to use to add a user to the Group DM
     * (only available if a bot is creating the DM)
     * @property {string} [nick] Permanent nickname (only available if a bot is creating the DM)
     */
  
    /**
     * Creates a Group DM.
     * @param {GroupDMRecipientOptions[]} recipients The recipients
     * @returns {Promise<GroupDMChannel>}
     * @example
     * // Create a Group DM with a token provided from OAuth
     * client.user.createGroupDM([{
     *   user: '66564597481480192',
     *   accessToken: token
     * }])
     *   .then(console.log)
     *   .catch(console.error);
     */
    createGroupDM(recipients) {
      return this.client.rest.methods.createGroupDM({
        recipients: recipients.map(u => this.client.resolver.resolveUserID(u.user)),
        accessTokens: recipients.map(u => u.accessToken),
        nicks: recipients.reduce((o, r) => {
          if (r.nick) o[r.user ? r.user.id : r.id] = r.nick;
          return o;
        }, {}),
      });
    }
  
    /**
     * Accepts an invite to join a guild.
     * <warn>This is only available when using a user account.</warn>
     * @param {Invite|string} invite Invite or code to accept
     * @returns {Promise<Guild>} Joined guild
     */
    acceptInvite(invite) {
      return this.client.rest.methods.acceptInvite(invite);
    }
  }
  
  ClientUser.prototype.setGame =
    util.deprecate(ClientUser.prototype.setGame, 'ClientUser#setGame: use ClientUser#setActivity instead');
  
  ClientUser.prototype.addFriend =
    util.deprecate(ClientUser.prototype.addFriend, 'ClientUser#addFriend: userbot methods will be removed');
  
  ClientUser.prototype.removeFriend =
    util.deprecate(ClientUser.prototype.removeFriend, 'ClientUser#removeFriend: userbot methods will be removed');
  
  ClientUser.prototype.setPassword =
    util.deprecate(ClientUser.prototype.setPassword, 'ClientUser#setPassword: userbot methods will be removed');
  
  ClientUser.prototype.setEmail =
    util.deprecate(ClientUser.prototype.setEmail, 'ClientUser#setEmail: userbot methods will be removed');
  
  ClientUser.prototype.fetchMentions =
    util.deprecate(ClientUser.prototype.fetchMentions, 'ClientUser#fetchMentions: userbot methods will be removed');
  
  module.exports = ClientUser;
  
  
  /***/ }),
  /* 56 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  /**
   * A wrapper around the ClientUser's settings.
   */
  class ClientUserSettings {
    constructor(user, data) {
      this.user = user;
      this.patch(data);
    }
  
    /**
     * Patch the data contained in this class with new partial data.
     * @param {Object} data Data to patch this with
     * @returns {void}
     * @private
     */
    patch(data) {
      for (const key of Object.keys(Constants.UserSettingsMap)) {
        const value = Constants.UserSettingsMap[key];
        if (!data.hasOwnProperty(key)) continue;
        if (typeof value === 'function') {
          this[value.name] = value(data[key]);
        } else {
          this[value] = data[key];
        }
      }
    }
  
    /**
     * Update a specific property of of user settings.
     * @param {string} name Name of property
     * @param {*} value Value to patch
     * @returns {Promise<Object>}
     */
    update(name, value) {
      return this.user.client.rest.methods.patchUserSettings({ [name]: value });
    }
  
    /**
     * Sets the position at which this guild will appear in the Discord client.
     * @param {Guild} guild The guild to move
     * @param {number} position Absolute or relative position
     * @param {boolean} [relative=false] Whether to position relatively or absolutely
     * @returns {Promise<Guild>}
     */
    setGuildPosition(guild, position, relative) {
      const temp = Object.assign([], this.guildPositions);
      Util.moveElementInArray(temp, guild.id, position, relative);
      return this.update('guild_positions', temp).then(() => guild);
    }
  
    /**
     * Add a guild to the list of restricted guilds.
     * @param {Guild} guild The guild to add
     * @returns {Promise<Guild>}
     */
    addRestrictedGuild(guild) {
      const temp = Object.assign([], this.restrictedGuilds);
      if (temp.includes(guild.id)) return Promise.reject(new Error('Guild is already restricted'));
      temp.push(guild.id);
      return this.update('restricted_guilds', temp).then(() => guild);
    }
  
    /**
     * Remove a guild from the list of restricted guilds.
     * @param {Guild} guild The guild to remove
     * @returns {Promise<Guild>}
     */
    removeRestrictedGuild(guild) {
      const temp = Object.assign([], this.restrictedGuilds);
      const index = temp.indexOf(guild.id);
      if (index < 0) return Promise.reject(new Error('Guild is not restricted'));
      temp.splice(index, 1);
      return this.update('restricted_guilds', temp).then(() => guild);
    }
  }
  
  module.exports = ClientUserSettings;
  
  
  /***/ }),
  /* 57 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const Collection = __webpack_require__(3);
  const ClientUserChannelOverride = __webpack_require__(86);
  
  /**
   * A wrapper around the ClientUser's guild settings.
   */
  class ClientUserGuildSettings {
    constructor(data, client) {
      /**
       * The client that created the instance of the ClientUserGuildSettings
       * @name ClientUserGuildSettings#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: client });
      /**
       * The ID of the guild this settings are for
       * @type {Snowflake}
       */
      this.guildID = data.guild_id;
      this.channelOverrides = new Collection();
      this.patch(data);
    }
  
    /**
     * Patch the data contained in this class with new partial data.
     * @param {Object} data Data to patch this with
     * @returns {void}
     * @private
     */
    patch(data) {
      for (const key of Object.keys(Constants.UserGuildSettingsMap)) {
        const value = Constants.UserGuildSettingsMap[key];
        if (!data.hasOwnProperty(key)) continue;
        if (key === 'channel_overrides') {
          for (const channel of data[key]) {
            this.channelOverrides.set(channel.channel_id,
              new ClientUserChannelOverride(channel));
          }
        } else if (typeof value === 'function') {
          this[value.name] = value(data[key]);
        } else {
          this[value] = data[key];
        }
      }
    }
  
    /**
     * Update a specific property of the guild settings.
     * @param {string} name Name of property
     * @param {value} value Value to patch
     * @returns {Promise<Object>}
     */
    update(name, value) {
      return this.client.rest.methods.patchClientUserGuildSettings(this.guildID, { [name]: value });
    }
  }
  
  module.exports = ClientUserGuildSettings;
  
  
  /***/ }),
  /* 58 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const browser = typeof window !== 'undefined';
  const webpack = !!"true";
  
  const Discord = __webpack_require__(59);
  
  module.exports = Discord;
  if (browser && webpack) window.Discord = Discord; // eslint-disable-line no-undef
  // eslint-disable-next-line no-console
  else if (!browser) console.warn('Warning: Attempting to use browser version of Discord.js in a non-browser environment!');
  
  
  /***/ }),
  /* 59 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Util = __webpack_require__(4);
  
  module.exports = {
    // "Root" classes (starting points)
    Client: __webpack_require__(70),
    Shard: __webpack_require__(159),
    ShardClientUtil: __webpack_require__(160),
    ShardingManager: __webpack_require__(161),
    WebhookClient: __webpack_require__(162),
  
    // Utilities
    Collection: __webpack_require__(3),
    Constants: __webpack_require__(0),
    DiscordAPIError: __webpack_require__(34),
    EvaluatedPermissions: __webpack_require__(5),
    Permissions: __webpack_require__(5),
    Snowflake: __webpack_require__(7),
    SnowflakeUtil: __webpack_require__(7),
    Util: Util,
    util: Util,
    version: __webpack_require__(37).version,
  
    // Shortcuts to Util methods
    escapeMarkdown: Util.escapeMarkdown,
    fetchRecommendedShards: Util.fetchRecommendedShards,
    splitMessage: Util.splitMessage,
  
    // Structures
    Attachment: __webpack_require__(21),
    CategoryChannel: __webpack_require__(49),
    Channel: __webpack_require__(12),
    ClientUser: __webpack_require__(55),
    ClientUserSettings: __webpack_require__(56),
    Collector: __webpack_require__(31),
    DMChannel: __webpack_require__(51),
    Emoji: __webpack_require__(17),
    Game: __webpack_require__(11).Game,
    GroupDMChannel: __webpack_require__(33),
    Guild: __webpack_require__(22),
    GuildAuditLogs: __webpack_require__(47),
    GuildChannel: __webpack_require__(19),
    GuildMember: __webpack_require__(18),
    Invite: __webpack_require__(23),
    Message: __webpack_require__(16),
    MessageAttachment: __webpack_require__(41),
    MessageCollector: __webpack_require__(44),
    MessageEmbed: __webpack_require__(27),
    MessageMentions: __webpack_require__(40),
    MessageReaction: __webpack_require__(42),
    OAuth2Application: __webpack_require__(32),
    ClientOAuth2Application: __webpack_require__(32),
    PartialGuild: __webpack_require__(45),
    PartialGuildChannel: __webpack_require__(46),
    PermissionOverwrites: __webpack_require__(50),
    Presence: __webpack_require__(11).Presence,
    ReactionEmoji: __webpack_require__(30),
    ReactionCollector: __webpack_require__(43),
    RichEmbed: __webpack_require__(14),
    Role: __webpack_require__(8),
    TextChannel: __webpack_require__(52),
    User: __webpack_require__(10),
    VoiceChannel: __webpack_require__(53),
    Webhook: __webpack_require__(24),
  };
  
  
  /***/ }),
  /* 60 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  exports.byteLength = byteLength
  exports.toByteArray = toByteArray
  exports.fromByteArray = fromByteArray
  
  var lookup = []
  var revLookup = []
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
  
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }
  
  // Support decoding URL-safe base64 strings, as Node.js does.
  // See: https://en.wikipedia.org/wiki/Base64#URL_applications
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
  
  function getLens (b64) {
    var len = b64.length
  
    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }
  
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=')
    if (validLen === -1) validLen = len
  
    var placeHoldersLen = validLen === len
      ? 0
      : 4 - (validLen % 4)
  
    return [validLen, placeHoldersLen]
  }
  
  // base64 is 4/3 + up to two characters of the original data
  function byteLength (b64) {
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }
  
  function _byteLength (b64, validLen, placeHoldersLen) {
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }
  
  function toByteArray (b64) {
    var tmp
    var lens = getLens(b64)
    var validLen = lens[0]
    var placeHoldersLen = lens[1]
  
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))
  
    var curByte = 0
  
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0
      ? validLen - 4
      : validLen
  
    for (var i = 0; i < len; i += 4) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 18) |
        (revLookup[b64.charCodeAt(i + 1)] << 12) |
        (revLookup[b64.charCodeAt(i + 2)] << 6) |
        revLookup[b64.charCodeAt(i + 3)]
      arr[curByte++] = (tmp >> 16) & 0xFF
      arr[curByte++] = (tmp >> 8) & 0xFF
      arr[curByte++] = tmp & 0xFF
    }
  
    if (placeHoldersLen === 2) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 2) |
        (revLookup[b64.charCodeAt(i + 1)] >> 4)
      arr[curByte++] = tmp & 0xFF
    }
  
    if (placeHoldersLen === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 10) |
        (revLookup[b64.charCodeAt(i + 1)] << 4) |
        (revLookup[b64.charCodeAt(i + 2)] >> 2)
      arr[curByte++] = (tmp >> 8) & 0xFF
      arr[curByte++] = tmp & 0xFF
    }
  
    return arr
  }
  
  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] +
      lookup[num >> 12 & 0x3F] +
      lookup[num >> 6 & 0x3F] +
      lookup[num & 0x3F]
  }
  
  function encodeChunk (uint8, start, end) {
    var tmp
    var output = []
    for (var i = start; i < end; i += 3) {
      tmp =
        ((uint8[i] << 16) & 0xFF0000) +
        ((uint8[i + 1] << 8) & 0xFF00) +
        (uint8[i + 2] & 0xFF)
      output.push(tripletToBase64(tmp))
    }
    return output.join('')
  }
  
  function fromByteArray (uint8) {
    var tmp
    var len = uint8.length
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    var parts = []
    var maxChunkLength = 16383 // must be multiple of 3
  
    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(
        uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
      ))
    }
  
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1]
      parts.push(
        lookup[tmp >> 2] +
        lookup[(tmp << 4) & 0x3F] +
        '=='
      )
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1]
      parts.push(
        lookup[tmp >> 10] +
        lookup[(tmp >> 4) & 0x3F] +
        lookup[(tmp << 2) & 0x3F] +
        '='
      )
    }
  
    return parts.join('')
  }
  
  
  /***/ }),
  /* 61 */
  /***/ (function(module, exports) {
  
  exports.read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m
    var eLen = (nBytes * 8) - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var nBits = -7
    var i = isLE ? (nBytes - 1) : 0
    var d = isLE ? -1 : 1
    var s = buffer[offset + i]
  
    i += d
  
    e = s & ((1 << (-nBits)) - 1)
    s >>= (-nBits)
    nBits += eLen
    for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}
  
    m = e & ((1 << (-nBits)) - 1)
    e >>= (-nBits)
    nBits += mLen
    for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}
  
    if (e === 0) {
      e = 1 - eBias
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen)
      e = e - eBias
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }
  
  exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c
    var eLen = (nBytes * 8) - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
    var i = isLE ? 0 : (nBytes - 1)
    var d = isLE ? 1 : -1
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
  
    value = Math.abs(value)
  
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0
      e = eMax
    } else {
      e = Math.floor(Math.log(value) / Math.LN2)
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--
        c *= 2
      }
      if (e + eBias >= 1) {
        value += rt / c
      } else {
        value += rt * Math.pow(2, 1 - eBias)
      }
      if (value * c >= 2) {
        e++
        c /= 2
      }
  
      if (e + eBias >= eMax) {
        m = 0
        e = eMax
      } else if (e + eBias >= 1) {
        m = ((value * c) - 1) * Math.pow(2, mLen)
        e = e + eBias
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
        e = 0
      }
    }
  
    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
  
    e = (e << mLen) | m
    eLen += mLen
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
  
    buffer[offset + i - d] |= s * 128
  }
  
  
  /***/ }),
  /* 62 */
  /***/ (function(module, exports) {
  
  var toString = {}.toString;
  
  module.exports = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };
  
  
  /***/ }),
  /* 63 */
  /***/ (function(module, exports, __webpack_require__) {
  
  module.exports = __webpack_require__(64);
  
  
  /***/ }),
  /* 64 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const browser = typeof window !== 'undefined';
  const querystring = __webpack_require__(36);
  const transport = browser ? __webpack_require__(67) : __webpack_require__(68);
  
  /**
   * Snekfetch
   * @extends Stream.Readable
   * @extends Promise
   */
  class Snekfetch extends transport.Extension {
    /**
     * Options to pass to the Snekfetch constructor
     * @typedef {object} SnekfetchOptions
     * @memberof Snekfetch
     * @property {object} [headers] Headers to initialize the request with
     * @property {object|string|Buffer} [data] Data to initialize the request with
     * @property {string|Object} [query] Query to intialize the request with
     * @property {boolean} [followRedirects=true] If the request should follow redirects
     * @property {object} [qs=querystring] Querystring module to use, any object providing
     * `stringify` and `parse` for querystrings
     * @property {number} [version = 1] The http version to use [1 or 2]
     * @property {external:Agent} [agent] Whether to use an http agent
     */
  
    /**
     * Create a request.
     * Usually you'll want to do `Snekfetch#method(url [, options])` instead of
     * `new Snekfetch(method, url [, options])`
     * @param {string} method HTTP method
     * @param {string} url URL
     * @param {SnekfetchOptions} [opts] Options
     */
    constructor(method, url, opts = {}) {
      super();
      this.options = Object.assign({ version: 1, qs: querystring, followRedirects: true }, opts);
      this.request = transport.buildRequest.call(this, method, url, opts);
      if (opts.headers)
        this.set(opts.headers);
      if (opts.query)
        this.query(opts.query);
      if (opts.data)
        this.send(opts.data);
    }
  
    /**
     * Add a query param to the request
     * @param {string|Object} name Name of query param or object to add to query
     * @param {string} [value] If name is a string value, this will be the value of the query param
     * @returns {Snekfetch} This request
     */
    query(name, value) {
      if (!this.request.query)
        this.request.query = {};
      if (name !== null && typeof name === 'object') {
        for (const [k, v] of Object.entries(name))
          this.query(k, v);
      } else {
        this.request.query[name] = value;
      }
  
      return this;
    }
  
    /**
     * Add a header to the request
     * @param {string|Object} name Name of query param or object to add to headers
     * @param {string} [value] If name is a string value, this will be the value of the header
     * @returns {Snekfetch} This request
     */
    set(name, value) {
      if (name !== null && typeof name === 'object') {
        for (const key of Object.keys(name))
          this.set(key, name[key]);
      } else {
        this.request.setHeader(name, value);
      }
  
      return this;
    }
  
    /**
     * Attach a form data object
     * @param {string} name Name of the form attachment
     * @param {string|Object|Buffer} data Data for the attachment
     * @param {string} [filename] Optional filename if form attachment name needs to be overridden
     * @returns {Snekfetch} This request
     */
    attach(...args) {
      const form = this.data instanceof transport.FormData ? this.data : this.data = new transport.FormData();
      if (typeof args[0] === 'object') {
        for (const [k, v] of Object.entries(args[0]))
          this.attach(k, v);
      } else {
        form.append(...args);
      }
  
      return this;
    }
  
    /**
     * Send data with the request
     * @param {string|Buffer|Object} data Data to send
     * @returns {Snekfetch} This request
     */
    send(data) {
      if (data instanceof transport.FormData || transport.shouldSendRaw(data)) {
        this.data = data;
      } else if (data !== null && typeof data === 'object') {
        const header = this.request.getHeader('content-type');
        let serialize;
        if (header) {
          if (header.includes('json'))
            serialize = JSON.stringify;
          else if (header.includes('urlencoded'))
            serialize = this.options.qs.stringify;
        } else {
          this.set('Content-Type', 'application/json');
          serialize = JSON.stringify;
        }
        this.data = serialize(data);
      } else {
        this.data = data;
      }
      return this;
    }
  
    then(resolver, rejector) {
      if (this._response)
        return this._response.then(resolver, rejector);
      // eslint-disable-next-line no-return-assign
      return this._response = transport.finalizeRequest.call(this)
        .then(({ response, raw, redirect, headers }) => {
          if (redirect) {
            let method = this.request.method;
            if ([301, 302].includes(response.statusCode)) {
              if (method !== 'HEAD')
                method = 'GET';
              this.data = null;
            } else if (response.statusCode === 303) {
              method = 'GET';
            }
  
            const redirectHeaders = this.request.getHeaders();
            delete redirectHeaders.host;
            return new Snekfetch(method, redirect, {
              data: this.data,
              headers: redirectHeaders,
              version: this.options.version,
            });
          }
  
          const statusCode = response.statusCode || response.status;
          // forgive me :(
          const self = this; // eslint-disable-line consistent-this
          /**
           * Response from Snekfetch
           * @typedef {Object} SnekfetchResponse
           * @memberof Snekfetch
           * @prop {HTTP.Request} request
           * @prop {?string|object|Buffer} body Processed response body
           * @prop {string} text Raw response body
           * @prop {boolean} ok If the response code is >= 200 and < 300
           * @prop {number} status HTTP status code
           * @prop {string} statusText Human readable HTTP status
           */
          const res = {
            request: this.request,
            get body() {
              delete res.body;
              const type = this.headers['content-type'];
              if (type && type.includes('application/json')) {
                try {
                  res.body = JSON.parse(res.text);
                } catch (err) {
                  res.body = res.text;
                }
              } else if (type && type.includes('application/x-www-form-urlencoded')) {
                res.body = self.options.qs.parse(res.text);
              } else {
                res.body = raw;
              }
  
              return res.body;
            },
            text: raw.toString(),
            ok: statusCode >= 200 && statusCode < 400,
            headers: headers || response.headers,
            status: statusCode,
            statusText: response.statusText || transport.STATUS_CODES[response.statusCode],
          };
  
          if (res.ok) {
            return res;
          } else {
            const err = new Error(`${res.status} ${res.statusText}`.trim());
            Object.assign(err, res);
            return Promise.reject(err);
          }
        })
        .then(resolver, rejector);
    }
  
    catch(rejector) {
      return this.then(null, rejector);
    }
  
    /**
     * End the request
     * @param {Function} [cb] Optional callback to handle the response
     * @returns {Promise} This request
     */
    end(cb) {
      return this.then(
        (res) => cb ? cb(null, res) : res,
        (err) => cb ? cb(err, err.status ? err : null) : Promise.reject(err)
      );
    }
  
    _finalizeRequest() {
      if (!this.request)
        return;
  
      if (this.request.method !== 'HEAD')
        this.set('Accept-Encoding', 'gzip, deflate');
      if (this.data && this.data.getBoundary)
        this.set('Content-Type', `multipart/form-data; boundary=${this.data.getBoundary()}`);
  
      if (this.request.query) {
        const [path, query] = this.request.path.split('?');
        this.request.path = `${path}?${this.options.qs.stringify(this.request.query)}${query ? `&${query}` : ''}`;
      }
    }
  }
  
  /**
   * Create a ((THIS)) request
   * @dynamic this.METHODS
   * @method Snekfetch.((THIS)lowerCase)
   * @param {string} url The url to request
   * @param {Snekfetch.snekfetchOptions} [opts] Options
   * @returns {Snekfetch}
   */
  Snekfetch.METHODS = transport.METHODS.concat('BREW').filter((m) => m !== 'M-SEARCH');
  for (const method of Snekfetch.METHODS) {
    Snekfetch[method.toLowerCase()] = function runMethod(url, opts) {
      const Constructor = this.prototype instanceof Snekfetch ? this : Snekfetch;
      return new Constructor(method, url, opts);
    };
  }
  
  module.exports = Snekfetch;
  
  /**
   * @external Agent
   * @see {@link https://nodejs.org/api/http.html#http_class_http_agent}
   */
  
  
  /***/ }),
  /* 65 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  
  
  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  
  module.exports = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};
  
    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }
  
    var regexp = /\+/g;
    qs = qs.split(sep);
  
    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }
  
    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }
  
    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;
  
      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }
  
      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);
  
      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }
  
    return obj;
  };
  
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  
  
  /***/ }),
  /* 66 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  
  
  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;
  
      case 'boolean':
        return v ? 'true' : 'false';
  
      case 'number':
        return isFinite(v) ? v : '';
  
      default:
        return '';
    }
  };
  
  module.exports = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }
  
    if (typeof obj === 'object') {
      return map(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) {
          return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
  
    }
  
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  };
  
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  
  function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }
  
  var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
  };
  
  
  /***/ }),
  /* 67 */
  /***/ (function(module, exports) {
  
  function buildRequest(method, url) {
    return {
      method,
      path: url,
      redirect: this.options.followRedirects ? 'follow' : 'manual',
      headers: {},
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return this.headers[name.toLowerCase()];
      },
    };
  }
  
  function finalizeRequest() {
    this._finalizeRequest();
    if (this.data)
      this.request.body = this.data;
    return window.fetch(this.request.path, this.request)
      .then((r) => r.text().then((t) => {
        const headers = {};
        for (const [k, v] of r.headers.entries())
          headers[k.toLowerCase()] = v;
        return { response: r, raw: t, headers };
      }));
  }
  
  module.exports = {
    buildRequest, finalizeRequest,
    shouldSendRaw: () => false,
    METHODS: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'PATCH'],
    STATUS_CODES: {},
    Extension: Object,
    FormData: window.FormData,
  };
  
  
  /***/ }),
  /* 68 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 69 */
  /***/ (function(module, exports) {
  
  exports.endianness = function () { return 'LE' };
  
  exports.hostname = function () {
      if (typeof location !== 'undefined') {
          return location.hostname
      }
      else return '';
  };
  
  exports.loadavg = function () { return [] };
  
  exports.uptime = function () { return 0 };
  
  exports.freemem = function () {
      return Number.MAX_VALUE;
  };
  
  exports.totalmem = function () {
      return Number.MAX_VALUE;
  };
  
  exports.cpus = function () { return [] };
  
  exports.type = function () { return 'Browser' };
  
  exports.release = function () {
      if (typeof navigator !== 'undefined') {
          return navigator.appVersion;
      }
      return '';
  };
  
  exports.networkInterfaces
  = exports.getNetworkInterfaces
  = function () { return {} };
  
  exports.arch = function () { return 'javascript' };
  
  exports.platform = function () { return 'browser' };
  
  exports.tmpdir = exports.tmpDir = function () {
      return '/tmp';
  };
  
  exports.EOL = '\n';
  
  exports.homedir = function () {
      return '/'
  };
  
  
  /***/ }),
  /* 70 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(process) {const EventEmitter = __webpack_require__(20);
  const Constants = __webpack_require__(0);
  const Permissions = __webpack_require__(5);
  const Util = __webpack_require__(4);
  const RESTManager = __webpack_require__(38);
  const ClientDataManager = __webpack_require__(82);
  const ClientManager = __webpack_require__(83);
  const ClientDataResolver = __webpack_require__(28);
  const ClientVoiceManager = __webpack_require__(126);
  const WebSocketManager = __webpack_require__(127);
  const ActionsManager = __webpack_require__(128);
  const Collection = __webpack_require__(3);
  const Presence = __webpack_require__(11).Presence;
  const ShardClientUtil = __webpack_require__(157);
  const VoiceBroadcast = __webpack_require__(158);
  
  /**
   * The main hub for interacting with the Discord API, and the starting point for any bot.
   * @extends {EventEmitter}
   */
  class Client extends EventEmitter {
    /**
     * @param {ClientOptions} [options] Options for the client
     */
    constructor(options = {}) {
      super();
  
      // Obtain shard details from environment
      if (!options.shardId && 'SHARD_ID' in Object({"__DISCORD_WEBPACK__":"true"})) options.shardId = Number(Object({"__DISCORD_WEBPACK__":"true"}).SHARD_ID);
      if (!options.shardCount && 'SHARD_COUNT' in Object({"__DISCORD_WEBPACK__":"true"})) options.shardCount = Number(Object({"__DISCORD_WEBPACK__":"true"}).SHARD_COUNT);
  
      /**
       * The options the client was instantiated with
       * @type {ClientOptions}
       */
      this.options = Util.mergeDefault(Constants.DefaultOptions, options);
      this._validateOptions();
  
      /**
       * The REST manager of the client
       * @type {RESTManager}
       * @private
       */
      this.rest = new RESTManager(this);
  
      /**
       * The data manager of the client
       * @type {ClientDataManager}
       * @private
       */
      this.dataManager = new ClientDataManager(this);
  
      /**
       * The manager of the client
       * @type {ClientManager}
       * @private
       */
      this.manager = new ClientManager(this);
  
      /**
       * The WebSocket manager of the client
       * @type {WebSocketManager}
       * @private
       */
      this.ws = new WebSocketManager(this);
  
      /**
       * The data resolver of the client
       * @type {ClientDataResolver}
       * @private
       */
      this.resolver = new ClientDataResolver(this);
  
      /**
       * The action manager of the client
       * @type {ActionsManager}
       * @private
       */
      this.actions = new ActionsManager(this);
  
      /**
       * The voice manager of the client (`null` in browsers)
       * @type {?ClientVoiceManager}
       * @private
       */
      this.voice = !this.browser ? new ClientVoiceManager(this) : null;
  
      /**
       * The shard helpers for the client
       * (only if the process was spawned as a child, such as from a {@link ShardingManager})
       * @type {?ShardClientUtil}
       */
      this.shard = process.send ? ShardClientUtil.singleton(this) : null;
  
      /**
       * All of the {@link User} objects that have been cached at any point, mapped by their IDs
       * @type {Collection<Snowflake, User>}
       */
      this.users = new Collection();
  
      /**
       * All of the guilds the client is currently handling, mapped by their IDs -
       * as long as sharding isn't being used, this will be *every* guild the bot is a member of
       * @type {Collection<Snowflake, Guild>}
       */
      this.guilds = new Collection();
  
      /**
       * All of the {@link Channel}s that the client is currently handling, mapped by their IDs -
       * as long as sharding isn't being used, this will be *every* channel in *every* guild, and all DM channels
       * @type {Collection<Snowflake, Channel>}
       */
      this.channels = new Collection();
  
      /**
       * Presences that have been received for the client user's friends, mapped by user IDs
       * <warn>This is only filled when using a user account.</warn>
       * @type {Collection<Snowflake, Presence>}
       */
      this.presences = new Collection();
  
      Object.defineProperty(this, 'token', { writable: true });
      if (!this.token && 'CLIENT_TOKEN' in Object({"__DISCORD_WEBPACK__":"true"})) {
        /**
         * Authorization token for the logged in user/bot
         * <warn>This should be kept private at all times.</warn>
         * @type {?string}
         */
        this.token = Object({"__DISCORD_WEBPACK__":"true"}).CLIENT_TOKEN;
      } else {
        this.token = null;
      }
  
      /**
       * User that the client is logged in as
       * @type {?ClientUser}
       */
      this.user = null;
  
      /**
       * Time at which the client was last regarded as being in the `READY` state
       * (each time the client disconnects and successfully reconnects, this will be overwritten)
       * @type {?Date}
       */
      this.readyAt = null;
  
      /**
       * Active voice broadcasts that have been created
       * @type {VoiceBroadcast[]}
       */
      this.broadcasts = [];
  
      /**
       * Previous heartbeat pings of the websocket (most recent first, limited to three elements)
       * @type {number[]}
       */
      this.pings = [];
  
      /**
       * Timeouts set by {@link Client#setTimeout} that are still active
       * @type {Set<Timeout>}
       * @private
       */
      this._timeouts = new Set();
  
      /**
       * Intervals set by {@link Client#setInterval} that are still active
       * @type {Set<Timeout>}
       * @private
       */
      this._intervals = new Set();
  
      if (this.options.messageSweepInterval > 0) {
        this.setInterval(this.sweepMessages.bind(this), this.options.messageSweepInterval * 1000);
      }
    }
  
    /**
     * Timestamp of the latest ping's start time
     * @type {number}
     * @private
     */
    get _pingTimestamp() {
      return this.ws.connection ? this.ws.connection.lastPingTimestamp : 0;
    }
  
    /**
     * Current status of the client's connection to Discord
     * @type {?number}
     * @readonly
     */
    get status() {
      return this.ws.connection.status;
    }
  
    /**
     * How long it has been since the client last entered the `READY` state in milliseconds
     * @type {?number}
     * @readonly
     */
    get uptime() {
      return this.readyAt ? Date.now() - this.readyAt : null;
    }
  
    /**
     * Average heartbeat ping of the websocket, obtained by averaging the {@link Client#pings} property
     * @type {number}
     * @readonly
     */
    get ping() {
      return this.pings.reduce((prev, p) => prev + p, 0) / this.pings.length;
    }
  
    /**
     * All active voice connections that have been established, mapped by guild ID
     * @type {Collection<Snowflake, VoiceConnection>}
     * @readonly
     */
    get voiceConnections() {
      if (this.browser) return new Collection();
      return this.voice.connections;
    }
  
    /**
     * All custom emojis that the client has access to, mapped by their IDs
     * @type {Collection<Snowflake, Emoji>}
     * @readonly
     */
    get emojis() {
      const emojis = new Collection();
      for (const guild of this.guilds.values()) {
        for (const emoji of guild.emojis.values()) emojis.set(emoji.id, emoji);
      }
      return emojis;
    }
  
    /**
     * Timestamp of the time the client was last `READY` at
     * @type {?number}
     * @readonly
     */
    get readyTimestamp() {
      return this.readyAt ? this.readyAt.getTime() : null;
    }
  
    /**
     * Whether the client is in a browser environment
     * @type {boolean}
     * @readonly
     */
    get browser() {
      return typeof window !== 'undefined';
    }
  
    /**
     * Creates a voice broadcast.
     * @returns {VoiceBroadcast}
     */
    createVoiceBroadcast() {
      const broadcast = new VoiceBroadcast(this);
      this.broadcasts.push(broadcast);
      return broadcast;
    }
  
    /**
     * Logs the client in, establishing a websocket connection to Discord.
     * <info>Both bot and regular user accounts are supported, but it is highly recommended to use a bot account whenever
     * possible. User accounts are subject to harsher ratelimits and other restrictions that don't apply to bot accounts.
     * Bot accounts also have access to many features that user accounts cannot utilise. Automating a user account is
     * considered a violation of the ToS.</info>
     * @param {string} token Token of the account to log in with
     * @returns {Promise<string>} Token of the account used
     * @example
     * client.login('my token')
     *  .then(console.log)
     *  .catch(console.error);
     */
    login(token = this.token) {
      return this.rest.methods.login(token);
    }
  
    /**
     * Logs out, terminates the connection to Discord, and destroys the client.
     * @returns {Promise}
     */
    destroy() {
      for (const t of this._timeouts) clearTimeout(t);
      for (const i of this._intervals) clearInterval(i);
      this._timeouts.clear();
      this._intervals.clear();
      return this.manager.destroy();
    }
  
    /**
     * Requests a sync of guild data with Discord.
     * <info>This can be done automatically every 30 seconds by enabling {@link ClientOptions#sync}.</info>
     * <warn>This is only available when using a user account.</warn>
     * @param {Guild[]|Collection<Snowflake, Guild>} [guilds=this.guilds] An array or collection of guilds to sync
     */
    syncGuilds(guilds = this.guilds) {
      if (this.user.bot) return;
      this.ws.send({
        op: 12,
        d: guilds instanceof Collection ? guilds.keyArray() : guilds.map(g => g.id),
      });
    }
  
    /**
     * Obtains a user from Discord, or the user cache if it's already available.
     * <warn>This is only available when using a bot account.</warn>
     * @param {Snowflake} id ID of the user
     * @param {boolean} [cache=true] Whether to cache the new user object if it isn't already
     * @returns {Promise<User>}
     */
    fetchUser(id, cache = true) {
      if (this.users.has(id)) return Promise.resolve(this.users.get(id));
      return this.rest.methods.getUser(id, cache);
    }
  
    /**
     * Obtains an invite from Discord.
     * @param {InviteResolvable} invite Invite code or URL
     * @returns {Promise<Invite>}
     * @example
     * client.fetchInvite('https://discord.gg/bRCvFy9')
     *   .then(invite => console.log(`Obtained invite with code: ${invite.code}`)
     *   .catch(console.error);
     */
    fetchInvite(invite) {
      const code = this.resolver.resolveInviteCode(invite);
      return this.rest.methods.getInvite(code);
    }
  
    /**
     * Obtains a webhook from Discord.
     * @param {Snowflake} id ID of the webhook
     * @param {string} [token] Token for the webhook
     * @returns {Promise<Webhook>}
     * @example
     * client.fetchWebhook('id', 'token')
     *   .then(webhook => console.log(`Obtained webhook with name: ${webhook.name}`))
     *   .catch(console.error);
     */
    fetchWebhook(id, token) {
      return this.rest.methods.getWebhook(id, token);
    }
  
    /**
     * Obtains the available voice regions from Discord.
     * @returns {Collection<string, VoiceRegion>}
     * @example
     * client.fetchVoiceRegions()
     *   .then(regions => console.log(`Available regions are: ${regions.map(region => region.name).join(', ')}`))
     *   .catch(console.error);
     */
    fetchVoiceRegions() {
      return this.rest.methods.fetchVoiceRegions();
    }
  
    /**
     * Sweeps all text-based channels' messages and removes the ones older than the max message lifetime.
     * If the message has been edited, the time of the edit is used rather than the time of the original message.
     * @param {number} [lifetime=this.options.messageCacheLifetime] Messages that are older than this (in seconds)
     * will be removed from the caches. The default is based on {@link ClientOptions#messageCacheLifetime}
     * @returns {number} Amount of messages that were removed from the caches,
     * or -1 if the message cache lifetime is unlimited
     */
    sweepMessages(lifetime = this.options.messageCacheLifetime) {
      if (typeof lifetime !== 'number' || isNaN(lifetime)) throw new TypeError('The lifetime must be a number.');
      if (lifetime <= 0) {
        this.emit('debug', 'Didn\'t sweep messages - lifetime is unlimited');
        return -1;
      }
  
      const lifetimeMs = lifetime * 1000;
      const now = Date.now();
      let channels = 0;
      let messages = 0;
  
      for (const channel of this.channels.values()) {
        if (!channel.messages) continue;
        channels++;
  
        messages += channel.messages.sweep(
          message => now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs
        );
      }
  
      this.emit('debug', `Swept ${messages} messages older than ${lifetime} seconds in ${channels} text-based channels`);
      return messages;
    }
  
    /**
     * Obtains the OAuth Application of the bot from Discord.
     * <warn>Bots can only fetch their own profile.</warn>
     * @param {Snowflake} [id='@me'] ID of application to fetch
     * @returns {Promise<OAuth2Application>}
     * client.fetchApplication()
     *   .then(application => console.log(`Obtained application with name: ${application.name}`)
     *   .catch(console.error);
     */
    fetchApplication(id = '@me') {
      if (id !== '@me') process.emitWarning('fetchApplication: use "@me" as an argument', 'DeprecationWarning');
      return this.rest.methods.getApplication(id);
    }
  
    /**
     * Generates a link that can be used to invite the bot to a guild.
     * <warn>This is only available when using a bot account.</warn>
     * @param {PermissionResolvable} [permissions] Permissions to request
     * @returns {Promise<string>}
     * @example
     * client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
     *   .then(link => console.log(`Generated bot invite link: ${link}`))
     *   .catch(console.error);
     */
    generateInvite(permissions) {
      permissions = typeof permissions === 'undefined' ? 0 : Permissions.resolve(permissions);
      return this.fetchApplication().then(application =>
        `https://discordapp.com/oauth2/authorize?client_id=${application.id}&permissions=${permissions}&scope=bot`
      );
    }
  
    /**
     * Sets a timeout that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setTimeout(fn, delay, ...args) {
      const timeout = setTimeout(() => {
        fn(...args);
        this._timeouts.delete(timeout);
      }, delay);
      this._timeouts.add(timeout);
      return timeout;
    }
  
    /**
     * Clears a timeout.
     * @param {Timeout} timeout Timeout to cancel
     */
    clearTimeout(timeout) {
      clearTimeout(timeout);
      this._timeouts.delete(timeout);
    }
  
    /**
     * Sets an interval that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setInterval(fn, delay, ...args) {
      const interval = setInterval(fn, delay, ...args);
      this._intervals.add(interval);
      return interval;
    }
  
    /**
     * Clears an interval.
     * @param {Timeout} interval Interval to cancel
     */
    clearInterval(interval) {
      clearInterval(interval);
      this._intervals.delete(interval);
    }
  
    /**
     * Adds a ping to {@link Client#pings}.
     * @param {number} startTime Starting time of the ping
     * @private
     */
    _pong(startTime) {
      this.pings.unshift(Date.now() - startTime);
      if (this.pings.length > 3) this.pings.length = 3;
      this.ws.lastHeartbeatAck = true;
    }
  
    /**
     * Adds/updates a friend's presence in {@link Client#presences}.
     * @param {Snowflake} id ID of the user
     * @param {Object} presence Raw presence object from Discord
     * @private
     */
    _setPresence(id, presence) {
      if (this.presences.has(id)) {
        this.presences.get(id).update(presence);
        return;
      }
      this.presences.set(id, new Presence(presence, this));
    }
  
    /**
     * Calls {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval} on a script
     * with the client as `this`.
     * @param {string} script Script to eval
     * @returns {*}
     * @private
     */
    _eval(script) {
      return eval(script);
    }
  
    /**
     * Validates the client options.
     * @param {ClientOptions} [options=this.options] Options to validate
     * @private
     */
    _validateOptions(options = this.options) {
      if (typeof options.shardCount !== 'number' || isNaN(options.shardCount)) {
        throw new TypeError('The shardCount option must be a number.');
      }
      if (typeof options.shardId !== 'number' || isNaN(options.shardId)) {
        throw new TypeError('The shardId option must be a number.');
      }
      if (options.shardCount < 0) throw new RangeError('The shardCount option must be at least 0.');
      if (options.shardId < 0) throw new RangeError('The shardId option must be at least 0.');
      if (options.shardId !== 0 && options.shardId >= options.shardCount) {
        throw new RangeError('The shardId option must be less than shardCount.');
      }
      if (typeof options.messageCacheMaxSize !== 'number' || isNaN(options.messageCacheMaxSize)) {
        throw new TypeError('The messageCacheMaxSize option must be a number.');
      }
      if (typeof options.messageCacheLifetime !== 'number' || isNaN(options.messageCacheLifetime)) {
        throw new TypeError('The messageCacheLifetime option must be a number.');
      }
      if (typeof options.messageSweepInterval !== 'number' || isNaN(options.messageSweepInterval)) {
        throw new TypeError('The messageSweepInterval option must be a number.');
      }
      if (typeof options.fetchAllMembers !== 'boolean') {
        throw new TypeError('The fetchAllMembers option must be a boolean.');
      }
      if (typeof options.disableEveryone !== 'boolean') {
        throw new TypeError('The disableEveryone option must be a boolean.');
      }
      if (typeof options.restWsBridgeTimeout !== 'number' || isNaN(options.restWsBridgeTimeout)) {
        throw new TypeError('The restWsBridgeTimeout option must be a number.');
      }
      if (!(options.disabledEvents instanceof Array)) throw new TypeError('The disabledEvents option must be an Array.');
    }
  }
  
  module.exports = Client;
  
  /**
   * Emitted for general warnings.
   * @event Client#warn
   * @param {string} info The warning
   */
  
  /**
   * Emitted for general debugging information.
   * @event Client#debug
   * @param {string} info The debug information
   */
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))
  
  /***/ }),
  /* 71 */
  /***/ (function(module, exports) {
  
  module.exports = function isBuffer(arg) {
    return arg && typeof arg === 'object'
      && typeof arg.copy === 'function'
      && typeof arg.fill === 'function'
      && typeof arg.readUInt8 === 'function';
  }
  
  /***/ }),
  /* 72 */
  /***/ (function(module, exports) {
  
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
  
  
  /***/ }),
  /* 73 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(process) {const Constants = __webpack_require__(0);
  
  class UserAgentManager {
    constructor() {
      this.build(this.constructor.DEFAULT);
    }
  
    set({ url, version } = {}) {
      this.build({
        url: url || this.constructor.DFEAULT.url,
        version: version || this.constructor.DEFAULT.version,
      });
    }
  
    build(ua) {
      this.userAgent = `DiscordBot (${ua.url}, ${ua.version}) Node.js/${process.version}`;
    }
  }
  
  UserAgentManager.DEFAULT = {
    url: Constants.Package.homepage.split('#')[0],
    version: Constants.Package.version,
  };
  
  module.exports = UserAgentManager;
  
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))
  
  /***/ }),
  /* 74 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const querystring = __webpack_require__(36);
  const long = __webpack_require__(26);
  const Permissions = __webpack_require__(5);
  const Constants = __webpack_require__(0);
  const Endpoints = Constants.Endpoints;
  const Collection = __webpack_require__(3);
  const Util = __webpack_require__(4);
  const resolvePermissions = __webpack_require__(75);
  
  const RichEmbed = __webpack_require__(14);
  const User = __webpack_require__(10);
  const GuildMember = __webpack_require__(18);
  const Message = __webpack_require__(16);
  const Role = __webpack_require__(8);
  const Invite = __webpack_require__(23);
  const Webhook = __webpack_require__(24);
  const UserProfile = __webpack_require__(76);
  const OAuth2Application = __webpack_require__(32);
  const Channel = __webpack_require__(12);
  const GroupDMChannel = __webpack_require__(33);
  const Guild = __webpack_require__(22);
  const VoiceRegion = __webpack_require__(78);
  const GuildAuditLogs = __webpack_require__(47);
  
  class RESTMethods {
    constructor(restManager) {
      this.rest = restManager;
      this.client = restManager.client;
      this._ackToken = null;
    }
  
    login(token = this.client.token) {
      return new Promise((resolve, reject) => {
        if (!token || typeof token !== 'string') throw new Error(Constants.Errors.INVALID_TOKEN);
        token = token.replace(/^Bot\s*/i, '');
        this.client.manager.connectToWebSocket(token, resolve, reject);
      }).catch(e => {
        this.client.destroy();
        return Promise.reject(e);
      });
    }
  
    logout() {
      return this.rest.makeRequest('post', Endpoints.logout, true, {});
    }
  
    getGateway(bot = false) {
      return this.rest.makeRequest('get', bot ? Endpoints.gateway.bot : Endpoints.gateway, true);
    }
  
    fetchVoiceRegions(guildID) {
      let endpoint;
      if (guildID) endpoint = Endpoints.Guild(guildID).voiceRegions;
      else endpoint = Endpoints.voiceRegions;
      return this.rest.makeRequest('get', endpoint, true).then(res => {
        const regions = new Collection();
        for (const region of res) regions.set(region.id, new VoiceRegion(region));
        return regions;
      });
    }
  
    sendMessage(channel, content, { tts, nonce, embed, disableEveryone, split, code, reply } = {}, files = null) {
      return new Promise((resolve, reject) => { // eslint-disable-line complexity
        if (typeof content !== 'undefined') content = this.client.resolver.resolveString(content);
  
        // The nonce has to be a uint64 :<
        if (typeof nonce !== 'undefined') {
          nonce = parseInt(nonce);
          if (isNaN(nonce) || nonce < 0) throw new RangeError('Message nonce must fit in an unsigned 64-bit integer.');
        }
  
        if (content) {
          if (split && typeof split !== 'object') split = {};
  
          // Wrap everything in a code block
          if (typeof code !== 'undefined' && (typeof code !== 'boolean' || code === true)) {
            content = Util.escapeMarkdown(this.client.resolver.resolveString(content), true);
            content = `\`\`\`${typeof code !== 'boolean' ? code || '' : ''}\n${content}\n\`\`\``;
            if (split) {
              split.prepend = `\`\`\`${typeof code !== 'boolean' ? code || '' : ''}\n`;
              split.append = '\n```';
            }
          }
  
          // Add zero-width spaces to @everyone/@here
          if (disableEveryone || (typeof disableEveryone === 'undefined' && this.client.options.disableEveryone)) {
            content = content.replace(/@(everyone|here)/g, '@\u200b$1');
          }
  
          // Add the reply prefix
          if (reply && !(channel instanceof User || channel instanceof GuildMember) && channel.type !== 'dm') {
            const id = this.client.resolver.resolveUserID(reply);
            const mention = `<@${reply instanceof GuildMember && reply.nickname ? '!' : ''}${id}>`;
            content = `${mention}${content ? `, ${content}` : ''}`;
            if (split) split.prepend = `${mention}, ${split.prepend || ''}`;
          }
  
          // Split the content
          if (split) content = Util.splitMessage(content, split);
        } else if (reply && !(channel instanceof User || channel instanceof GuildMember) && channel.type !== 'dm') {
          const id = this.client.resolver.resolveUserID(reply);
          content = `<@${reply instanceof GuildMember && reply.nickname ? '!' : ''}${id}>`;
        }
  
        const send = chan => {
          if (content instanceof Array) {
            const messages = [];
            (function sendChunk(list, index) {
              const options = index === list.length - 1 ? { tts, embed, files } : { tts };
              chan.send(list[index], options).then(message => {
                messages.push(message);
                if (index >= list.length - 1) return resolve(messages);
                return sendChunk(list, ++index);
              }).catch(reject);
            }(content, 0));
          } else {
            this.rest.makeRequest('post', Endpoints.Channel(chan).messages, true, {
              content, tts, nonce, embed,
            }, files).then(data => resolve(this.client.actions.MessageCreate.handle(data).message), reject);
          }
        };
  
        if (channel instanceof User || channel instanceof GuildMember) this.createDM(channel).then(send, reject);
        else send(channel);
      });
    }
  
    updateMessage(message, content, { embed, code, reply } = {}) {
      if (typeof content !== 'undefined') content = this.client.resolver.resolveString(content);
  
      // Wrap everything in a code block
      if (typeof code !== 'undefined' && (typeof code !== 'boolean' || code === true)) {
        content = Util.escapeMarkdown(this.client.resolver.resolveString(content), true);
        content = `\`\`\`${typeof code !== 'boolean' ? code || '' : ''}\n${content}\n\`\`\``;
      }
  
      // Add the reply prefix
      if (reply && message.channel.type !== 'dm') {
        const id = this.client.resolver.resolveUserID(reply);
        const mention = `<@${reply instanceof GuildMember && reply.nickname ? '!' : ''}${id}>`;
        content = `${mention}${content ? `, ${content}` : ''}`;
      }
  
      if (embed instanceof RichEmbed) embed = embed._apiTransform();
  
      return this.rest.makeRequest('patch', Endpoints.Message(message), true, {
        content, embed,
      }).then(data => this.client.actions.MessageUpdate.handle(data).updated);
    }
  
    deleteMessage(message) {
      return this.rest.makeRequest('delete', Endpoints.Message(message), true)
        .then(() =>
          this.client.actions.MessageDelete.handle({
            id: message.id,
            channel_id: message.channel.id,
          }).message
        );
    }
  
    ackMessage(message) {
      return this.rest.makeRequest('post', Endpoints.Message(message).ack, true, { token: this._ackToken }).then(res => {
        if (res.token) this._ackToken = res.token;
        return message;
      });
    }
  
    ackTextChannel(channel) {
      return this.rest.makeRequest('post', Endpoints.Channel(channel).Message(channel.lastMessageID).ack, true, {
        token: this._ackToken,
      }).then(res => {
        if (res.token) this._ackToken = res.token;
        return channel;
      });
    }
  
    ackGuild(guild) {
      return this.rest.makeRequest('post', Endpoints.Guild(guild).ack, true).then(() => guild);
    }
  
    bulkDeleteMessages(channel, messages) {
      return this.rest.makeRequest('post', Endpoints.Channel(channel).messages.bulkDelete, true, {
        messages: messages,
      }).then(() =>
        this.client.actions.MessageDeleteBulk.handle({
          channel_id: channel.id,
          ids: messages,
        }).messages
      );
    }
  
    search(target, options) {
      if (typeof options === 'string') options = { content: options };
      if (options.before) {
        if (!(options.before instanceof Date)) options.before = new Date(options.before);
        options.maxID = long.fromNumber(options.before.getTime() - 14200704e5).shiftLeft(22).toString();
      }
      if (options.after) {
        if (!(options.after instanceof Date)) options.after = new Date(options.after);
        options.minID = long.fromNumber(options.after.getTime() - 14200704e5).shiftLeft(22).toString();
      }
      if (options.during) {
        if (!(options.during instanceof Date)) options.during = new Date(options.during);
        const t = options.during.getTime() - 14200704e5;
        options.minID = long.fromNumber(t).shiftLeft(22).toString();
        options.maxID = long.fromNumber(t + 86400000).shiftLeft(22).toString();
      }
      if (options.channel) options.channel = this.client.resolver.resolveChannelID(options.channel);
      if (options.author) options.author = this.client.resolver.resolveUserID(options.author);
      if (options.mentions) options.mentions = this.client.resolver.resolveUserID(options.options.mentions);
      options = {
        content: options.content,
        max_id: options.maxID,
        min_id: options.minID,
        has: options.has,
        channel_id: options.channel,
        author_id: options.author,
        author_type: options.authorType,
        context_size: options.contextSize,
        sort_by: options.sortBy,
        sort_order: options.sortOrder,
        limit: options.limit,
        offset: options.offset,
        mentions: options.mentions,
        mentions_everyone: options.mentionsEveryone,
        link_hostname: options.linkHostname,
        embed_provider: options.embedProvider,
        embed_type: options.embedType,
        attachment_filename: options.attachmentFilename,
        attachment_extension: options.attachmentExtension,
        include_nsfw: options.nsfw,
      };
  
      for (const key in options) if (options[key] === undefined) delete options[key];
      const queryString = (querystring.stringify(options).match(/[^=&?]+=[^=&?]+/g) || []).join('&');
  
      let endpoint;
      if (target instanceof Channel) {
        endpoint = Endpoints.Channel(target).search;
      } else if (target instanceof Guild) {
        endpoint = Endpoints.Guild(target).search;
      } else {
        throw new TypeError('Target must be a TextChannel, DMChannel, GroupDMChannel, or Guild.');
      }
      return this.rest.makeRequest('get', `${endpoint}?${queryString}`, true).then(body => {
        const messages = body.messages.map(x =>
          x.map(m => new Message(this.client.channels.get(m.channel_id), m, this.client))
        );
        return {
          totalResults: body.total_results,
          messages,
        };
      });
    }
  
    createChannel(guild, channelName, channelType, overwrites, reason) {
      return this.rest.makeRequest('post', Endpoints.Guild(guild).channels, true, {
        name: channelName,
        type: channelType ? Constants.ChannelTypes[channelType.toUpperCase()] : 'text',
        permission_overwrites: resolvePermissions.call(this, overwrites, guild),
      }, undefined, reason).then(data => this.client.actions.ChannelCreate.handle(data).channel);
    }
  
    createDM(recipient) {
      const dmChannel = this.getExistingDM(recipient);
      if (dmChannel) return Promise.resolve(dmChannel);
      return this.rest.makeRequest('post', Endpoints.User(this.client.user).channels, true, {
        recipient_id: recipient.id,
      }).then(data => this.client.actions.ChannelCreate.handle(data).channel);
    }
  
    createGroupDM(options) {
      const data = this.client.user.bot ?
        { access_tokens: options.accessTokens, nicks: options.nicks } :
        { recipients: options.recipients };
      return this.rest.makeRequest('post', Endpoints.User('@me').channels, true, data)
        .then(res => new GroupDMChannel(this.client, res));
    }
  
    addUserToGroupDM(channel, options) {
      const data = this.client.user.bot ?
        { nick: options.nick, access_token: options.accessToken } :
        { recipient: options.id };
      return this.rest.makeRequest('put', Endpoints.Channel(channel).Recipient(options.id), true, data)
        .then(() => channel);
    }
  
    removeUserFromGroupDM(channel, userId) {
      return this.rest.makeRequest('delete', Endpoints.Channel(channel).Recipient(userId), true)
        .then(() => channel);
    }
  
    updateGroupDMChannel(channel, _data) {
      const data = {};
      data.name = _data.name;
      data.icon = _data.icon;
      return this.rest.makeRequest('patch', Endpoints.Channel(channel), true, data).then(() => channel);
    }
  
    getExistingDM(recipient) {
      return this.client.channels.find(channel =>
        channel.recipient && channel.recipient.id === recipient.id
      );
    }
  
    deleteChannel(channel, reason) {
      if (channel instanceof User || channel instanceof GuildMember) channel = this.getExistingDM(channel);
      if (!channel) return Promise.reject(new Error('No channel to delete.'));
      return this.rest.makeRequest('delete', Endpoints.Channel(channel), true, undefined, undefined, reason)
        .then(data => {
          data.id = channel.id;
          return this.client.actions.ChannelDelete.handle(data).channel;
        });
    }
  
    updateChannel(channel, _data, reason) {
      const data = {};
      data.name = (_data.name || channel.name).trim();
      data.topic = typeof _data.topic === 'undefined' ? channel.topic : _data.topic;
      data.nsfw = typeof _data.nsfw === 'undefined' ? channel.nsfw : _data.nsfw;
      data.position = _data.position || channel.position;
      data.bitrate = _data.bitrate || (channel.bitrate ? channel.bitrate * 1000 : undefined);
      data.user_limit = typeof _data.userLimit !== 'undefined' ? _data.userLimit : channel.userLimit;
      data.parent_id = _data.parent;
      data.permission_overwrites = _data.permissionOverwrites ?
        resolvePermissions.call(this, _data.permissionOverwrites, channel.guild) : undefined;
      return this.rest.makeRequest('patch', Endpoints.Channel(channel), true, data, undefined, reason).then(newData =>
        this.client.actions.ChannelUpdate.handle(newData).updated
      );
    }
  
    leaveGuild(guild) {
      if (guild.ownerID === this.client.user.id) return Promise.reject(new Error('Guild is owned by the client.'));
      return this.rest.makeRequest('delete', Endpoints.User('@me').Guild(guild.id), true).then(() =>
        this.client.actions.GuildDelete.handle({ id: guild.id }).guild
      );
    }
  
    createGuild(options) {
      options.icon = this.client.resolver.resolveBase64(options.icon) || null;
      options.region = options.region || 'us-central';
      return new Promise((resolve, reject) => {
        this.rest.makeRequest('post', Endpoints.guilds, true, options).then(data => {
          if (this.client.guilds.has(data.id)) return resolve(this.client.guilds.get(data.id));
  
          const handleGuild = guild => {
            if (guild.id === data.id) {
              this.client.removeListener(Constants.Events.GUILD_CREATE, handleGuild);
              this.client.clearTimeout(timeout);
              resolve(guild);
            }
          };
          this.client.on(Constants.Events.GUILD_CREATE, handleGuild);
  
          const timeout = this.client.setTimeout(() => {
            this.client.removeListener(Constants.Events.GUILD_CREATE, handleGuild);
            reject(new Error('Took too long to receive guild data.'));
          }, 10000);
          return undefined;
        }, reject);
      });
    }
  
    // Untested but probably will work
    deleteGuild(guild) {
      return this.rest.makeRequest('delete', Endpoints.Guild(guild), true).then(() =>
        this.client.actions.GuildDelete.handle({ id: guild.id }).guild
      );
    }
  
    getUser(userID, cache) {
      return this.rest.makeRequest('get', Endpoints.User(userID), true).then(data => {
        if (cache) return this.client.actions.UserGet.handle(data).user;
        else return new User(this.client, data);
      });
    }
  
    updateCurrentUser(_data, password) {
      const user = this.client.user;
      const data = {};
      data.username = _data.username || user.username;
      data.avatar = typeof _data.avatar === 'undefined' ? user.avatar : this.client.resolver.resolveBase64(_data.avatar);
      if (!user.bot) {
        data.email = _data.email || user.email;
        data.password = password;
        if (_data.new_password) data.new_password = _data.newPassword;
      }
      return this.rest.makeRequest('patch', Endpoints.User('@me'), true, data).then(newData =>
        this.client.actions.UserUpdate.handle(newData).updated
      );
    }
  
    updateGuild(guild, data, reason) {
      return this.rest.makeRequest('patch', Endpoints.Guild(guild), true, data, undefined, reason).then(newData =>
        this.client.actions.GuildUpdate.handle(newData).updated
      );
    }
  
    kickGuildMember(guild, member, reason) {
      return this.rest.makeRequest(
        'delete', Endpoints.Guild(guild).Member(member), true,
        undefined, undefined, reason)
        .then(() => member);
    }
  
    createGuildRole(guild, data, reason) {
      if (data.color) data.color = this.client.resolver.resolveColor(data.color);
      if (data.permissions) data.permissions = Permissions.resolve(data.permissions);
      return this.rest.makeRequest('post', Endpoints.Guild(guild).roles, true, data, undefined, reason).then(r => {
        const { role } = this.client.actions.GuildRoleCreate.handle({
          guild_id: guild.id,
          role: r,
        });
        if (data.position) return role.setPosition(data.position, reason);
        return role;
      });
    }
  
    deleteGuildRole(role, reason) {
      return this.rest.makeRequest(
        'delete', Endpoints.Guild(role.guild).Role(role.id), true,
        undefined, undefined, reason)
        .then(() =>
          this.client.actions.GuildRoleDelete.handle({
            guild_id: role.guild.id,
            role_id: role.id,
          }).role
        );
    }
  
    setChannelOverwrite(channel, payload) {
      return this.rest.makeRequest('put', `${Endpoints.Channel(channel).permissions}/${payload.id}`, true, payload);
    }
  
    deletePermissionOverwrites(overwrite, reason) {
      return this.rest.makeRequest(
        'delete', `${Endpoints.Channel(overwrite.channel).permissions}/${overwrite.id}`,
        true, undefined, undefined, reason
      ).then(() => overwrite);
    }
  
    getChannelMessages(channel, payload = {}) {
      const params = [];
      if (payload.limit) params.push(`limit=${payload.limit}`);
      if (payload.around) params.push(`around=${payload.around}`);
      else if (payload.before) params.push(`before=${payload.before}`);
      else if (payload.after) params.push(`after=${payload.after}`);
  
      let endpoint = Endpoints.Channel(channel).messages;
      if (params.length > 0) endpoint += `?${params.join('&')}`;
      return this.rest.makeRequest('get', endpoint, true);
    }
  
    getChannelMessage(channel, messageID) {
      const msg = channel.messages.get(messageID);
      if (msg) return Promise.resolve(msg);
      return this.rest.makeRequest('get', Endpoints.Channel(channel).Message(messageID), true);
    }
  
    putGuildMember(guild, user, options) {
      options.access_token = options.accessToken;
      if (options.roles) {
        const roles = options.roles;
        if (roles instanceof Collection || (roles instanceof Array && roles[0] instanceof Role)) {
          options.roles = roles.map(role => role.id);
        }
      }
      return this.rest.makeRequest('put', Endpoints.Guild(guild).Member(user.id), true, options)
        .then(data => this.client.actions.GuildMemberGet.handle(guild, data).member);
    }
  
    getGuildMember(guild, user, cache) {
      return this.rest.makeRequest('get', Endpoints.Guild(guild).Member(user.id), true).then(data => {
        if (cache) return this.client.actions.GuildMemberGet.handle(guild, data).member;
        else return new GuildMember(guild, data);
      });
    }
  
    updateGuildMember(member, data, reason) {
      if (data.channel) {
        data.channel_id = this.client.resolver.resolveChannel(data.channel).id;
        data.channel = null;
      }
      if (data.roles) data.roles = data.roles.map(role => role instanceof Role ? role.id : role);
  
      let endpoint = Endpoints.Member(member);
      // Fix your endpoints, discord ;-;
      if (member.id === this.client.user.id) {
        const keys = Object.keys(data);
        if (keys.length === 1 && keys[0] === 'nick') {
          endpoint = Endpoints.Member(member).nickname;
        }
      }
  
      return this.rest.makeRequest('patch', endpoint, true, data, undefined, reason).then(newData =>
        member.guild._updateMember(member, newData).mem
      );
    }
  
    addMemberRole(member, role, reason) {
      return new Promise((resolve, reject) => {
        if (member._roles.includes(role.id)) return resolve(member);
  
        const listener = (oldMember, newMember) => {
          if (newMember.id === member.id && !oldMember._roles.includes(role.id) && newMember._roles.includes(role.id)) {
            this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
            resolve(newMember);
          }
        };
  
        this.client.on(Constants.Events.GUILD_MEMBER_UPDATE, listener);
        const timeout = this.client.setTimeout(() => {
          this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
          reject(new Error('Adding the role timed out.'));
        }, 10e3);
  
        return this.rest.makeRequest('put', Endpoints.Member(member).Role(role.id), true, undefined, undefined, reason)
          .catch(err => {
            this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
            this.client.clearTimeout(timeout);
            reject(err);
          });
      });
    }
  
    removeMemberRole(member, role, reason) {
      return new Promise((resolve, reject) => {
        if (!member._roles.includes(role.id)) return resolve(member);
  
        const listener = (oldMember, newMember) => {
          if (newMember.id === member.id && oldMember._roles.includes(role.id) && !newMember._roles.includes(role.id)) {
            this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
            resolve(newMember);
          }
        };
  
        this.client.on(Constants.Events.GUILD_MEMBER_UPDATE, listener);
        const timeout = this.client.setTimeout(() => {
          this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
          reject(new Error('Removing the role timed out.'));
        }, 10e3);
  
        return this.rest.makeRequest('delete', Endpoints.Member(member).Role(role.id), true, undefined, undefined, reason)
          .catch(err => {
            this.client.removeListener(Constants.Events.GUILD_MEMBER_UPDATE, listener);
            this.client.clearTimeout(timeout);
            reject(err);
          });
      });
    }
  
    sendTyping(channelID) {
      return this.rest.makeRequest('post', Endpoints.Channel(channelID).typing, true);
    }
  
    banGuildMember(guild, member, options) {
      const id = this.client.resolver.resolveUserID(member);
      if (!id) return Promise.reject(new Error('Couldn\'t resolve the user ID to ban.'));
  
      const url = `${Endpoints.Guild(guild).bans}/${id}?${querystring.stringify(options)}`;
      return this.rest.makeRequest('put', url, true).then(() => {
        if (member instanceof GuildMember) return member;
        const user = this.client.resolver.resolveUser(id);
        if (user) {
          member = this.client.resolver.resolveGuildMember(guild, user);
          return member || user;
        }
        return id;
      });
    }
  
    unbanGuildMember(guild, member, reason) {
      return new Promise((resolve, reject) => {
        const id = this.client.resolver.resolveUserID(member);
        if (!id) throw new Error('Couldn\'t resolve the user ID to unban.');
  
        const listener = (eGuild, eUser) => {
          if (eGuild.id === guild.id && eUser.id === id) {
            this.client.removeListener(Constants.Events.GUILD_BAN_REMOVE, listener);
            this.client.clearTimeout(timeout);
            resolve(eUser);
          }
        };
        this.client.on(Constants.Events.GUILD_BAN_REMOVE, listener);
  
        const timeout = this.client.setTimeout(() => {
          this.client.removeListener(Constants.Events.GUILD_BAN_REMOVE, listener);
          reject(new Error('Took too long to receive the ban remove event.'));
        }, 10000);
  
        this.rest.makeRequest('delete', `${Endpoints.Guild(guild).bans}/${id}`, true, undefined, undefined, reason)
          .catch(err => {
            this.client.removeListener(Constants.Events.GUILD_BAN_REMOVE, listener);
            this.client.clearTimeout(timeout);
            reject(err);
          });
      });
    }
  
    getGuildBans(guild) {
      return this.rest.makeRequest('get', Endpoints.Guild(guild).bans, true).then(bans =>
        bans.reduce((collection, ban) => {
          collection.set(ban.user.id, {
            reason: ban.reason,
            user: this.client.dataManager.newUser(ban.user),
          });
          return collection;
        }, new Collection())
      );
    }
  
    updateGuildRole(role, _data, reason) {
      const data = {};
      data.name = _data.name || role.name;
      data.position = typeof _data.position !== 'undefined' ? _data.position : role.position;
      data.color = _data.color === null ? null : this.client.resolver.resolveColor(_data.color || role.color);
      data.hoist = typeof _data.hoist !== 'undefined' ? _data.hoist : role.hoist;
      data.mentionable = typeof _data.mentionable !== 'undefined' ? _data.mentionable : role.mentionable;
  
      if (typeof _data.permissions !== 'undefined') data.permissions = Permissions.resolve(_data.permissions);
      else data.permissions = role.permissions;
  
      return this.rest.makeRequest('patch', Endpoints.Guild(role.guild).Role(role.id), true, data, undefined, reason)
        .then(_role =>
          this.client.actions.GuildRoleUpdate.handle({
            role: _role,
            guild_id: role.guild.id,
          }).updated
        );
    }
  
    pinMessage(message) {
      return this.rest.makeRequest('put', Endpoints.Channel(message.channel).Pin(message.id), true)
        .then(() => message);
    }
  
    unpinMessage(message) {
      return this.rest.makeRequest('delete', Endpoints.Channel(message.channel).Pin(message.id), true)
        .then(() => message);
    }
  
    getChannelPinnedMessages(channel) {
      return this.rest.makeRequest('get', Endpoints.Channel(channel).pins, true);
    }
  
    createChannelInvite(channel, options, reason) {
      const payload = {};
      payload.temporary = options.temporary;
      payload.max_age = options.maxAge;
      payload.max_uses = options.maxUses;
      payload.unique = options.unique;
      return this.rest.makeRequest('post', Endpoints.Channel(channel).invites, true, payload, undefined, reason)
        .then(invite => new Invite(this.client, invite));
    }
  
    deleteInvite(invite, reason) {
      return this.rest.makeRequest('delete', Endpoints.Invite(invite.code), true, undefined, undefined, reason)
        .then(() => invite);
    }
  
    getInvite(code) {
      return this.rest.makeRequest('get', Endpoints.Invite(code), true).then(invite =>
        new Invite(this.client, invite)
      );
    }
  
    getGuildInvites(guild) {
      return this.rest.makeRequest('get', Endpoints.Guild(guild).invites, true).then(inviteItems => {
        const invites = new Collection();
        for (const inviteItem of inviteItems) {
          const invite = new Invite(this.client, inviteItem);
          invites.set(invite.code, invite);
        }
        return invites;
      });
    }
  
    pruneGuildMembers(guild, days, dry, reason) {
      return this.rest.makeRequest(dry ?
        'get' :
        'post',
      `${Endpoints.Guild(guild).prune}?days=${days}`, true, undefined, undefined, reason)
        .then(data => data.pruned);
    }
  
    createEmoji(guild, image, name, roles, reason) {
      const data = { image, name };
      if (roles) data.roles = roles.map(r => r.id ? r.id : r);
      return this.rest.makeRequest('post', Endpoints.Guild(guild).emojis, true, data, undefined, reason)
        .then(emoji => this.client.actions.GuildEmojiCreate.handle(guild, emoji).emoji);
    }
  
    updateEmoji(emoji, _data, reason) {
      const data = {};
      if (_data.name) data.name = _data.name;
      if (_data.roles) data.roles = _data.roles.map(r => r.id ? r.id : r);
      return this.rest.makeRequest('patch', Endpoints.Guild(emoji.guild).Emoji(emoji.id), true, data, undefined, reason)
        .then(newEmoji => this.client.actions.GuildEmojiUpdate.handle(emoji, newEmoji).emoji);
    }
  
    deleteEmoji(emoji, reason) {
      return this.rest.makeRequest('delete', Endpoints.Guild(emoji.guild).Emoji(emoji.id), true, undefined, reason)
        .then(() => this.client.actions.GuildEmojiDelete.handle(emoji).data);
    }
  
    getGuildAuditLogs(guild, options = {}) {
      if (options.before && options.before instanceof GuildAuditLogs.Entry) options.before = options.before.id;
      if (options.after && options.after instanceof GuildAuditLogs.Entry) options.after = options.after.id;
      if (typeof options.type === 'string') options.type = GuildAuditLogs.Actions[options.type];
  
      const queryString = (querystring.stringify({
        before: options.before,
        after: options.after,
        limit: options.limit,
        user_id: this.client.resolver.resolveUserID(options.user),
        action_type: options.type,
      }).match(/[^=&?]+=[^=&?]+/g) || []).join('&');
  
      return this.rest.makeRequest('get', `${Endpoints.Guild(guild).auditLogs}?${queryString}`, true)
        .then(data => GuildAuditLogs.build(guild, data));
    }
  
    getWebhook(id, token) {
      return this.rest.makeRequest('get', Endpoints.Webhook(id, token), !token).then(data =>
        new Webhook(this.client, data)
      );
    }
  
    getGuildWebhooks(guild) {
      return this.rest.makeRequest('get', Endpoints.Guild(guild).webhooks, true).then(data => {
        const hooks = new Collection();
        for (const hook of data) hooks.set(hook.id, new Webhook(this.client, hook));
        return hooks;
      });
    }
  
    getChannelWebhooks(channel) {
      return this.rest.makeRequest('get', Endpoints.Channel(channel).webhooks, true).then(data => {
        const hooks = new Collection();
        for (const hook of data) hooks.set(hook.id, new Webhook(this.client, hook));
        return hooks;
      });
    }
  
    createWebhook(channel, name, avatar, reason) {
      return this.rest.makeRequest('post', Endpoints.Channel(channel).webhooks, true, { name, avatar }, undefined, reason)
        .then(data => new Webhook(this.client, data));
    }
  
    editWebhook(webhook, name, avatar) {
      return this.rest.makeRequest('patch', Endpoints.Webhook(webhook.id, webhook.token), false, {
        name,
        avatar,
      }).then(data => {
        webhook.name = data.name;
        webhook.avatar = data.avatar;
        return webhook;
      });
    }
  
    deleteWebhook(webhook, reason) {
      return this.rest.makeRequest(
        'delete', Endpoints.Webhook(webhook.id, webhook.token),
        false, undefined, undefined, reason);
    }
  
    sendWebhookMessage(webhook, content, { avatarURL, tts, embeds, username } = {}, files = null) {
      return new Promise((resolve, reject) => {
        username = username || webhook.name;
  
        if (content instanceof Array) {
          const messages = [];
          (function sendChunk(list, index) {
            const options = index === list.length - 1 ? { tts, embeds, files } : { tts };
            webhook.send(list[index], options).then(message => {
              messages.push(message);
              if (index >= list.length - 1) return resolve(messages);
              return sendChunk(list, ++index);
            }).catch(reject);
          }(content, 0));
        } else {
          this.rest.makeRequest('post', `${Endpoints.Webhook(webhook.id, webhook.token)}?wait=true`, false, {
            username,
            avatar_url: avatarURL,
            content,
            tts,
            embeds,
          }, files).then(data => {
            if (!this.client.channels) resolve(data);
            else resolve(this.client.actions.MessageCreate.handle(data).message);
          }, reject);
        }
      });
    }
  
    sendSlackWebhookMessage(webhook, body) {
      return this.rest.makeRequest(
        'post', `${Endpoints.Webhook(webhook.id, webhook.token)}/slack?wait=true`, false, body
      );
    }
  
    fetchUserProfile(user) {
      return this.rest.makeRequest('get', Endpoints.User(user).profile, true).then(data =>
        new UserProfile(user, data)
      );
    }
  
    fetchMentions(options) {
      if (options.guild instanceof Guild) options.guild = options.guild.id;
      Util.mergeDefault({ limit: 25, roles: true, everyone: true, guild: null }, options);
  
      return this.rest.makeRequest(
        'get', Endpoints.User('@me').Mentions(options.limit, options.roles, options.everyone, options.guild), true
      ).then(data => data.map(m => new Message(this.client.channels.get(m.channel_id), m, this.client)));
    }
  
    addFriend(user) {
      return this.rest.makeRequest('post', Endpoints.User('@me'), true, {
        username: user.username,
        discriminator: user.discriminator,
      }).then(() => user);
    }
  
    removeFriend(user) {
      return this.rest.makeRequest('delete', Endpoints.User('@me').Relationship(user.id), true)
        .then(() => user);
    }
  
    blockUser(user) {
      return this.rest.makeRequest('put', Endpoints.User('@me').Relationship(user.id), true, { type: 2 })
        .then(() => user);
    }
  
    unblockUser(user) {
      return this.rest.makeRequest('delete', Endpoints.User('@me').Relationship(user.id), true)
        .then(() => user);
    }
  
    updateChannelPositions(guildID, channels) {
      const data = new Array(channels.length);
      for (let i = 0; i < channels.length; i++) {
        data[i] = {
          id: this.client.resolver.resolveChannelID(channels[i].channel),
          position: channels[i].position,
        };
      }
  
      return this.rest.makeRequest('patch', Endpoints.Guild(guildID).channels, true, data).then(() =>
        this.client.actions.GuildChannelsPositionUpdate.handle({
          guild_id: guildID,
          channels,
        }).guild
      );
    }
  
    setRolePositions(guildID, roles) {
      return this.rest.makeRequest('patch', Endpoints.Guild(guildID).roles, true, roles).then(() =>
        this.client.actions.GuildRolesPositionUpdate.handle({
          guild_id: guildID,
          roles,
        }).guild
      );
    }
  
    setChannelPositions(guildID, channels) {
      return this.rest.makeRequest('patch', Endpoints.Guild(guildID).channels, true, channels).then(() =>
        this.client.actions.GuildChannelsPositionUpdate.handle({
          guild_id: guildID,
          channels,
        }).guild
      );
    }
  
    addMessageReaction(message, emoji) {
      return this.rest.makeRequest(
        'put', Endpoints.Message(message).Reaction(emoji).User('@me'), true
      ).then(() =>
        message._addReaction(Util.parseEmoji(emoji), message.client.user)
      );
    }
  
    removeMessageReaction(message, emoji, userID) {
      const endpoint = Endpoints.Message(message).Reaction(emoji).User(userID === this.client.user.id ? '@me' : userID);
      return this.rest.makeRequest('delete', endpoint, true).then(() =>
        this.client.actions.MessageReactionRemove.handle({
          user_id: userID,
          message_id: message.id,
          emoji: Util.parseEmoji(emoji),
          channel_id: message.channel.id,
        }).reaction
      );
    }
  
    removeMessageReactions(message) {
      return this.rest.makeRequest('delete', Endpoints.Message(message).reactions, true)
        .then(() => message);
    }
  
    getMessageReactionUsers(message, emoji, options) {
      const queryString = (querystring.stringify(options).match(/[^=&?]+=[^=&?]+/g) || []).join('&');
  
      return this.rest.makeRequest('get', `${Endpoints.Message(message).Reaction(emoji)}?${queryString}`, true);
    }
  
    getApplication(id) {
      return this.rest.makeRequest('get', Endpoints.OAUTH2.Application(id), true).then(app =>
        new OAuth2Application(this.client, app)
      );
    }
  
    resetApplication(id) {
      return this.rest.makeRequest('post', Endpoints.OAUTH2.Application(id).resetToken, true)
        .then(() => this.rest.makeRequest('post', Endpoints.OAUTH2.Application(id).resetSecret, true))
        .then(app => new OAuth2Application(this.client, app));
    }
  
    setNote(user, note) {
      return this.rest.makeRequest('put', Endpoints.User(user).note, true, { note }).then(() => user);
    }
  
    acceptInvite(code) {
      if (code.id) code = code.id;
      return new Promise((resolve, reject) =>
        this.rest.makeRequest('post', Endpoints.Invite(code), true).then(res => {
          const handler = guild => {
            if (guild.id === res.id) {
              resolve(guild);
              this.client.removeListener(Constants.Events.GUILD_CREATE, handler);
            }
          };
          this.client.on(Constants.Events.GUILD_CREATE, handler);
          this.client.setTimeout(() => {
            this.client.removeListener(Constants.Events.GUILD_CREATE, handler);
            reject(new Error('Accepting invite timed out'));
          }, 120e3);
        })
      );
    }
  
    patchUserSettings(data) {
      return this.rest.makeRequest('patch', Constants.Endpoints.User('@me').settings, true, data);
    }
  
    patchClientUserGuildSettings(guildID, data) {
      return this.rest.makeRequest('patch', Constants.Endpoints.User('@me').Guild(guildID).settings, true, data);
    }
  }
  
  module.exports = RESTMethods;
  
  
  /***/ }),
  /* 75 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Permissions = __webpack_require__(5);
  const Collection = __webpack_require__(3);
  
  module.exports = function resolvePermissions(overwrites, guild) {
    if (overwrites instanceof Collection || overwrites instanceof Array) {
      overwrites = overwrites.map(overwrite => {
        const role = this.client.resolver.resolveRole(guild, overwrite.id);
        if (role) {
          overwrite.id = role.id;
          overwrite.type = 'role';
        } else {
          overwrite.id = this.client.resolver.resolveUserID(overwrite.id);
          overwrite.type = 'member';
        }
  
        return {
          allow: Permissions.resolve(overwrite.allow || overwrite.allowed || 0),
          deny: Permissions.resolve(overwrite.deny || overwrite.denied || 0),
          type: overwrite.type,
          id: overwrite.id,
        };
      });
    }
  
    return overwrites;
  };
  
  
  /***/ }),
  /* 76 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Collection = __webpack_require__(3);
  const UserConnection = __webpack_require__(77);
  
  /**
   * Represents a user's profile on Discord.
   */
  class UserProfile {
    constructor(user, data) {
      /**
       * The owner of the profile
       * @type {User}
       */
      this.user = user;
  
      /**
       * The client that created the instance of the UserProfile
       * @name UserProfile#client
       * @type {Client}
       * @readonly
       */
      Object.defineProperty(this, 'client', { value: user.client });
  
      /**
       * The guilds that the client user and the user share
       * @type {Collection<Snowflake, Guild>}
       */
      this.mutualGuilds = new Collection();
  
      /**
       * The user's connections
       * @type {Collection<Snowflake, UserConnection>}
       */
      this.connections = new Collection();
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * If the user has Discord Premium
       * @type {boolean}
       */
      this.premium = data.premium;
  
      /**
       * The date since which the user has had Discord Premium
       * @type {?Date}
       */
      this.premiumSince = data.premium_since ? new Date(data.premium_since) : null;
  
      for (const guild of data.mutual_guilds) {
        if (this.client.guilds.has(guild.id)) {
          this.mutualGuilds.set(guild.id, this.client.guilds.get(guild.id));
        }
      }
      for (const connection of data.connected_accounts) {
        this.connections.set(connection.id, new UserConnection(this.user, connection));
      }
    }
  }
  
  module.exports = UserProfile;
  
  
  /***/ }),
  /* 77 */
  /***/ (function(module, exports) {
  
  /**
   * Represents a user connection (or "platform identity").
   */
  class UserConnection {
    constructor(user, data) {
      /**
       * The user that owns the connection
       * @type {User}
       */
      this.user = user;
  
      this.setup(data);
    }
  
    setup(data) {
      /**
       * The type of the connection
       * @type {string}
       */
      this.type = data.type;
  
      /**
       * The username of the connection account
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * The id of the connection account
       * @type {string}
       */
      this.id = data.id;
  
      /**
       * Whether the connection is revoked
       * @type {boolean}
       */
      this.revoked = data.revoked;
  
      /**
       * Partial server integrations (not yet implemented)
       * @type {Object[]}
       */
      this.integrations = data.integrations;
    }
  }
  
  module.exports = UserConnection;
  
  
  /***/ }),
  /* 78 */
  /***/ (function(module, exports) {
  
  /**
   * Represents a Discord voice region for guilds.
   */
  class VoiceRegion {
    constructor(data) {
      /**
       * The ID of the region
       * @type {string}
       */
      this.id = data.id;
  
      /**
       * Name of the region
       * @type {string}
       */
      this.name = data.name;
  
      /**
       * Whether the region is VIP-only
       * @type {boolean}
       */
      this.vip = data.vip;
  
      /**
       * Whether the region is deprecated
       * @type {boolean}
       */
      this.deprecated = data.deprecated;
  
      /**
       * Whether the region is optimal
       * @type {boolean}
       */
      this.optimal = data.optimal;
  
      /**
       * Whether the region is custom
       * @type {boolean}
       */
      this.custom = data.custom;
  
      /**
       * A sample hostname for what a connection might look like
       * @type {string}
       */
      this.sampleHostname = data.sample_hostname;
    }
  }
  
  module.exports = VoiceRegion;
  
  
  /***/ }),
  /* 79 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const RequestHandler = __webpack_require__(48);
  const DiscordAPIError = __webpack_require__(34);
  const { Events: { RATE_LIMIT } } = __webpack_require__(0);
  
  /**
   * Handles API Requests sequentially, i.e. we wait until the current request is finished before moving onto
   * the next. This plays a _lot_ nicer in terms of avoiding 429's when there is more than one session of the account,
   * but it can be slower.
   * @extends {RequestHandler}
   * @private
   */
  class SequentialRequestHandler extends RequestHandler {
    /**
     * @param {RESTManager} restManager The REST manager to use
     * @param {string} endpoint The endpoint to handle
     */
    constructor(restManager, endpoint) {
      super(restManager, endpoint);
  
      /**
       * The client that instantiated this handler
       * @type {Client}
       */
      this.client = restManager.client;
  
      /**
       * The endpoint that this handler is handling
       * @type {string}
       */
      this.endpoint = endpoint;
  
      /**
       * The time difference between Discord's Dates and the local computer's Dates. A positive number means the local
       * computer's time is ahead of Discord's
       * @type {number}
       */
      this.timeDifference = 0;
  
      /**
       * Whether the queue is being processed or not
       * @type {boolean}
       */
      this.busy = false;
    }
  
    push(request) {
      super.push(request);
      this.handle();
    }
  
    /**
     * Performs a request then resolves a promise to indicate its readiness for a new request.
     * @param {APIRequest} item The item to execute
     * @returns {Promise<?Object|Error>}
     */
    execute(item) {
      this.busy = true;
      return new Promise(resolve => {
        item.request.gen().end((err, res) => {
          if (res && res.headers) {
            this.requestLimit = Number(res.headers['x-ratelimit-limit']);
            this.requestResetTime = Number(res.headers['x-ratelimit-reset']) * 1000;
            this.requestRemaining = Number(res.headers['x-ratelimit-remaining']);
            this.timeDifference = Date.now() - new Date(res.headers.date).getTime();
          }
          if (err) {
            if (err.status === 429) {
              this.queue.unshift(item);
              this.restManager.client.setTimeout(() => {
                this.globalLimit = false;
                resolve();
              }, Number(res.headers['retry-after']) + this.restManager.client.options.restTimeOffset);
              if (res.headers['x-ratelimit-global']) this.globalLimit = true;
            } else if (err.status >= 500 && err.status < 600) {
              this.queue.unshift(item);
              this.restManager.client.setTimeout(resolve, 1e3 + this.restManager.client.options.restTimeOffset);
            } else {
              item.reject(err.status >= 400 && err.status < 500 ?
                new DiscordAPIError(res.request.path, res.body, res.request.method) : err);
              resolve(err);
            }
          } else {
            this.globalLimit = false;
            const data = res && res.body ? res.body : {};
            item.resolve(data);
            if (this.requestRemaining === 0) {
              if (this.client.listenerCount(RATE_LIMIT)) {
                /**
                 * Emitted when the client hits a rate limit while making a request
                 * @event Client#rateLimit
                 * @param {Object} rateLimitInfo Object containing the rate limit info
                 * @param {number} rateLimitInfo.requestLimit Number of requests that can be made to this endpoint
                 * @param {number} rateLimitInfo.timeDifference Delta-T in ms between your system and Discord servers
                 * @param {string} rateLimitInfo.method HTTP method used for request that triggered this event
                 * @param {string} rateLimitInfo.path Path used for request that triggered this event
                 */
                this.client.emit(RATE_LIMIT, {
                  limit: this.requestLimit,
                  timeDifference: this.timeDifference,
                  path: item.request.path,
                  method: item.request.method,
                });
              }
              this.restManager.client.setTimeout(
                () => resolve(data),
                this.requestResetTime - Date.now() + this.timeDifference + this.restManager.client.options.restTimeOffset
              );
            } else {
              resolve(data);
            }
          }
        });
      });
    }
  
    handle() {
      super.handle();
      if (this.busy || this.remaining === 0 || this.queue.length === 0 || this.globalLimit) return;
      this.execute(this.queue.shift()).then(() => {
        this.busy = false;
        this.handle();
      });
    }
  }
  
  module.exports = SequentialRequestHandler;
  
  
  /***/ }),
  /* 80 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const RequestHandler = __webpack_require__(48);
  const DiscordAPIError = __webpack_require__(34);
  const { Events: { RATE_LIMIT } } = __webpack_require__(0);
  
  class BurstRequestHandler extends RequestHandler {
    constructor(restManager, endpoint) {
      super(restManager, endpoint);
  
      this.client = restManager.client;
  
      this.limit = Infinity;
      this.resetTime = null;
      this.remaining = 1;
      this.timeDifference = 0;
  
      this.resetTimeout = null;
    }
  
    push(request) {
      super.push(request);
      this.handle();
    }
  
    execute(item) {
      if (!item) return;
      item.request.gen().end((err, res) => {
        if (res && res.headers) {
          this.limit = Number(res.headers['x-ratelimit-limit']);
          this.resetTime = Number(res.headers['x-ratelimit-reset']) * 1000;
          this.remaining = Number(res.headers['x-ratelimit-remaining']);
          this.timeDifference = Date.now() - new Date(res.headers.date).getTime();
        }
        if (err) {
          if (err.status === 429) {
            this.queue.unshift(item);
            if (res.headers['x-ratelimit-global']) this.globalLimit = true;
            if (this.resetTimeout) return;
            this.resetTimeout = this.client.setTimeout(() => {
              this.remaining = this.limit;
              this.globalLimit = false;
              this.handle();
              this.resetTimeout = null;
            }, Number(res.headers['retry-after']) + this.client.options.restTimeOffset);
          } else if (err.status >= 500 && err.status < 600) {
            this.queue.unshift(item);
            this.resetTimeout = this.client.setTimeout(() => {
              this.handle();
              this.resetTimeout = null;
            }, 1e3 + this.client.options.restTimeOffset);
          } else {
            item.reject(err.status >= 400 && err.status < 500 ?
              new DiscordAPIError(res.request.path, res.body, res.request.method) : err);
            this.handle();
          }
        } else {
          if (this.remaining === 0) {
            if (this.client.listenerCount(RATE_LIMIT)) {
              this.client.emit(RATE_LIMIT, {
                limit: this.limit,
                timeDifference: this.timeDifference,
                path: item.request.path,
                method: item.request.method,
              });
            }
          }
          this.globalLimit = false;
          const data = res && res.body ? res.body : {};
          item.resolve(data);
          this.handle();
        }
      });
    }
  
    handle() {
      super.handle();
      if (this.queue.length === 0) return;
      if ((this.remaining <= 0 || this.globalLimit) && Date.now() - this.timeDifference < this.resetTime) return;
      this.execute(this.queue.shift());
      this.remaining--;
      this.handle();
    }
  }
  
  module.exports = BurstRequestHandler;
  
  
  /***/ }),
  /* 81 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const snekfetch = __webpack_require__(25);
  const Constants = __webpack_require__(0);
  
  class APIRequest {
    constructor(rest, method, path, auth, data, files, reason) {
      this.rest = rest;
      this.client = rest.client;
      this.method = method;
      this.path = path.toString();
      this.auth = auth;
      this.data = data;
      this.files = files;
      this.route = this.getRoute(this.path);
      this.reason = reason;
    }
  
    getRoute(url) {
      let route = url.split('?')[0];
      if (route.includes('/channels/') || route.includes('/guilds/')) {
        const startInd = route.includes('/channels/') ? route.indexOf('/channels/') : route.indexOf('/guilds/');
        const majorID = route.substring(startInd).split('/')[2];
        route = route.replace(/(\d{8,})/g, ':id').replace(':id', majorID);
      }
      return route;
    }
  
    getAuth() {
      if (this.client.token && this.client.user && this.client.user.bot) {
        return `Bot ${this.client.token}`;
      } else if (this.client.token) {
        return this.client.token;
      }
      throw new Error(Constants.Errors.NO_TOKEN);
    }
  
    gen() {
      const API = `${this.client.options.http.host}/api/v${this.client.options.http.version}`;
      const request = snekfetch[this.method](`${API}${this.path}`);
      if (this.auth) request.set('Authorization', this.getAuth());
      if (this.reason) request.set('X-Audit-Log-Reason', encodeURIComponent(this.reason));
      if (!this.rest.client.browser) request.set('User-Agent', this.rest.userAgentManager.userAgent);
      if (this.files) {
        for (const file of this.files) if (file && file.file) request.attach(file.name, file.file, file.name);
        if (typeof this.data !== 'undefined') request.attach('payload_json', JSON.stringify(this.data));
      } else if (this.data) {
        request.send(this.data);
      }
      return request;
    }
  }
  
  module.exports = APIRequest;
  
  
  /***/ }),
  /* 82 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  const Guild = __webpack_require__(22);
  const User = __webpack_require__(10);
  const CategoryChannel = __webpack_require__(49);
  const DMChannel = __webpack_require__(51);
  const Emoji = __webpack_require__(17);
  const TextChannel = __webpack_require__(52);
  const VoiceChannel = __webpack_require__(53);
  const GuildChannel = __webpack_require__(19);
  const GroupDMChannel = __webpack_require__(33);
  
  class ClientDataManager {
    constructor(client) {
      this.client = client;
    }
  
    get pastReady() {
      return this.client.ws.connection.status === Constants.Status.READY;
    }
  
    newGuild(data) {
      const already = this.client.guilds.has(data.id);
      const guild = new Guild(this.client, data);
      this.client.guilds.set(guild.id, guild);
      if (this.pastReady && !already) {
        /**
         * Emitted whenever the client joins a guild.
         * @event Client#guildCreate
         * @param {Guild} guild The created guild
         */
        if (this.client.options.fetchAllMembers) {
          guild.fetchMembers().then(() => { this.client.emit(Constants.Events.GUILD_CREATE, guild); });
        } else {
          this.client.emit(Constants.Events.GUILD_CREATE, guild);
        }
      }
  
      return guild;
    }
  
    newUser(data, cache = true) {
      if (this.client.users.has(data.id)) return this.client.users.get(data.id);
      const user = new User(this.client, data);
      if (cache) this.client.users.set(user.id, user);
      return user;
    }
  
    newChannel(data, guild) {
      const already = this.client.channels.has(data.id);
      let channel;
      if (data.type === Constants.ChannelTypes.DM) {
        channel = new DMChannel(this.client, data);
      } else if (data.type === Constants.ChannelTypes.GROUP_DM) {
        channel = new GroupDMChannel(this.client, data);
      } else {
        guild = guild || this.client.guilds.get(data.guild_id);
        if (already) {
          channel = this.client.channels.get(data.id);
        } else if (guild) {
          if (data.type === Constants.ChannelTypes.TEXT) {
            channel = new TextChannel(guild, data);
            guild.channels.set(channel.id, channel);
          } else if (data.type === Constants.ChannelTypes.VOICE) {
            channel = new VoiceChannel(guild, data);
            guild.channels.set(channel.id, channel);
          } else if (data.type === Constants.ChannelTypes.CATEGORY) {
            channel = new CategoryChannel(guild, data);
            guild.channels.set(channel.id, channel);
          }
        }
      }
  
      if (channel && !already) {
        if (this.pastReady) this.client.emit(Constants.Events.CHANNEL_CREATE, channel);
        this.client.channels.set(channel.id, channel);
        return channel;
      } else if (already) {
        return channel;
      }
  
      return null;
    }
  
    newEmoji(data, guild) {
      const already = guild.emojis.has(data.id);
      if (data && !already) {
        let emoji = new Emoji(guild, data);
        this.client.emit(Constants.Events.GUILD_EMOJI_CREATE, emoji);
        guild.emojis.set(emoji.id, emoji);
        return emoji;
      } else if (already) {
        return guild.emojis.get(data.id);
      }
  
      return null;
    }
  
    killEmoji(emoji) {
      if (!(emoji instanceof Emoji && emoji.guild)) return;
      this.client.emit(Constants.Events.GUILD_EMOJI_DELETE, emoji);
      emoji.guild.emojis.delete(emoji.id);
    }
  
    killGuild(guild) {
      const already = this.client.guilds.has(guild.id);
      this.client.guilds.delete(guild.id);
      if (already && this.pastReady) this.client.emit(Constants.Events.GUILD_DELETE, guild);
    }
  
    killUser(user) {
      this.client.users.delete(user.id);
    }
  
    killChannel(channel) {
      this.client.channels.delete(channel.id);
      if (channel instanceof GuildChannel) channel.guild.channels.delete(channel.id);
    }
  
    updateGuild(currentGuild, newData) {
      const oldGuild = Util.cloneObject(currentGuild);
      currentGuild.setup(newData);
      if (this.pastReady) this.client.emit(Constants.Events.GUILD_UPDATE, oldGuild, currentGuild);
    }
  
    updateChannel(currentChannel, newData) {
      currentChannel.setup(newData);
    }
  
    updateEmoji(currentEmoji, newData) {
      const oldEmoji = Util.cloneObject(currentEmoji);
      currentEmoji.setup(newData);
      this.client.emit(Constants.Events.GUILD_EMOJI_UPDATE, oldEmoji, currentEmoji);
      return currentEmoji;
    }
  }
  
  module.exports = ClientDataManager;
  
  
  /***/ }),
  /* 83 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  const WebSocketConnection = __webpack_require__(54);
  
  /**
   * Manages the state and background tasks of the client.
   * @private
   */
  class ClientManager {
    constructor(client) {
      /**
       * The client that instantiated this Manager
       * @type {Client}
       */
      this.client = client;
  
      /**
       * The heartbeat interval
       * @type {?number}
       */
      this.heartbeatInterval = null;
    }
  
    /**
     * The status of the client
     * @type {number}
     */
    get status() {
      return this.connection ? this.connection.status : Constants.Status.IDLE;
    }
  
    /**
     * Connects the client to the WebSocket.
     * @param {string} token The authorization token
     * @param {Function} resolve Function to run when connection is successful
     * @param {Function} reject Function to run when connection fails
     */
    connectToWebSocket(token, resolve, reject) {
      this.client.emit(Constants.Events.DEBUG, `Authenticated using token ${token}`);
      this.client.token = token;
      const timeout = this.client.setTimeout(() => reject(new Error(Constants.Errors.TOOK_TOO_LONG)), 1000 * 300);
      this.client.rest.methods.getGateway().then(res => {
        const protocolVersion = Constants.DefaultOptions.ws.version;
        const gateway = `${res.url}/?v=${protocolVersion}&encoding=${WebSocketConnection.ENCODING}`;
        this.client.emit(Constants.Events.DEBUG, `Using gateway ${gateway}`);
        this.client.ws.connect(gateway);
        this.client.ws.connection.once('error', reject);
        this.client.ws.connection.once('close', event => {
          if (event.code === 4004) reject(new Error(Constants.Errors.BAD_LOGIN));
          if (event.code === 4010) reject(new Error(Constants.Errors.INVALID_SHARD));
          if (event.code === 4011) reject(new Error(Constants.Errors.SHARDING_REQUIRED));
        });
        this.client.once(Constants.Events.READY, () => {
          resolve(token);
          this.client.clearTimeout(timeout);
        });
      }, reject);
    }
  
    destroy() {
      this.client.ws.destroy();
      this.client.rest.destroy();
      if (!this.client.user) return Promise.resolve();
      if (this.client.user.bot) {
        this.client.token = null;
        return Promise.resolve();
      } else {
        return this.client.rest.methods.logout().then(() => {
          this.client.token = null;
        });
      }
    }
  }
  
  module.exports = ClientManager;
  
  
  /***/ }),
  /* 84 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  
  const BeforeReadyWhitelist = [
    Constants.WSEvents.READY,
    Constants.WSEvents.RESUMED,
    Constants.WSEvents.GUILD_CREATE,
    Constants.WSEvents.GUILD_DELETE,
    Constants.WSEvents.GUILD_MEMBERS_CHUNK,
    Constants.WSEvents.GUILD_MEMBER_ADD,
    Constants.WSEvents.GUILD_MEMBER_REMOVE,
  ];
  
  class WebSocketPacketManager {
    constructor(connection) {
      this.ws = connection;
      this.handlers = {};
      this.queue = [];
  
      this.register(Constants.WSEvents.READY, __webpack_require__(85));
      this.register(Constants.WSEvents.RESUMED, __webpack_require__(87));
      this.register(Constants.WSEvents.GUILD_CREATE, __webpack_require__(88));
      this.register(Constants.WSEvents.GUILD_DELETE, __webpack_require__(89));
      this.register(Constants.WSEvents.GUILD_UPDATE, __webpack_require__(90));
      this.register(Constants.WSEvents.GUILD_BAN_ADD, __webpack_require__(91));
      this.register(Constants.WSEvents.GUILD_BAN_REMOVE, __webpack_require__(92));
      this.register(Constants.WSEvents.GUILD_MEMBER_ADD, __webpack_require__(93));
      this.register(Constants.WSEvents.GUILD_MEMBER_REMOVE, __webpack_require__(94));
      this.register(Constants.WSEvents.GUILD_MEMBER_UPDATE, __webpack_require__(95));
      this.register(Constants.WSEvents.GUILD_ROLE_CREATE, __webpack_require__(96));
      this.register(Constants.WSEvents.GUILD_ROLE_DELETE, __webpack_require__(97));
      this.register(Constants.WSEvents.GUILD_ROLE_UPDATE, __webpack_require__(98));
      this.register(Constants.WSEvents.GUILD_EMOJIS_UPDATE, __webpack_require__(99));
      this.register(Constants.WSEvents.GUILD_MEMBERS_CHUNK, __webpack_require__(100));
      this.register(Constants.WSEvents.CHANNEL_CREATE, __webpack_require__(101));
      this.register(Constants.WSEvents.CHANNEL_DELETE, __webpack_require__(102));
      this.register(Constants.WSEvents.CHANNEL_UPDATE, __webpack_require__(103));
      this.register(Constants.WSEvents.CHANNEL_PINS_UPDATE, __webpack_require__(104));
      this.register(Constants.WSEvents.PRESENCE_UPDATE, __webpack_require__(105));
      this.register(Constants.WSEvents.USER_UPDATE, __webpack_require__(106));
      this.register(Constants.WSEvents.USER_NOTE_UPDATE, __webpack_require__(107));
      this.register(Constants.WSEvents.USER_SETTINGS_UPDATE, __webpack_require__(108));
      this.register(Constants.WSEvents.USER_GUILD_SETTINGS_UPDATE, __webpack_require__(109));
      this.register(Constants.WSEvents.VOICE_STATE_UPDATE, __webpack_require__(110));
      this.register(Constants.WSEvents.TYPING_START, __webpack_require__(111));
      this.register(Constants.WSEvents.MESSAGE_CREATE, __webpack_require__(112));
      this.register(Constants.WSEvents.MESSAGE_DELETE, __webpack_require__(113));
      this.register(Constants.WSEvents.MESSAGE_UPDATE, __webpack_require__(114));
      this.register(Constants.WSEvents.MESSAGE_DELETE_BULK, __webpack_require__(115));
      this.register(Constants.WSEvents.VOICE_SERVER_UPDATE, __webpack_require__(116));
      this.register(Constants.WSEvents.GUILD_SYNC, __webpack_require__(117));
      this.register(Constants.WSEvents.RELATIONSHIP_ADD, __webpack_require__(118));
      this.register(Constants.WSEvents.RELATIONSHIP_REMOVE, __webpack_require__(119));
      this.register(Constants.WSEvents.MESSAGE_REACTION_ADD, __webpack_require__(120));
      this.register(Constants.WSEvents.MESSAGE_REACTION_REMOVE, __webpack_require__(121));
      this.register(Constants.WSEvents.MESSAGE_REACTION_REMOVE_ALL, __webpack_require__(122));
    }
  
    get client() {
      return this.ws.client;
    }
  
    register(event, Handler) {
      this.handlers[event] = new Handler(this);
    }
  
    handleQueue() {
      this.queue.forEach((element, index) => {
        this.handle(this.queue[index], true);
        this.queue.splice(index, 1);
      });
    }
  
    handle(packet, queue = false) {
      if (packet.op === Constants.OPCodes.HEARTBEAT_ACK) {
        this.ws.client._pong(this.ws.client._pingTimestamp);
        this.ws.lastHeartbeatAck = true;
        this.ws.client.emit('debug', 'Heartbeat acknowledged');
      } else if (packet.op === Constants.OPCodes.HEARTBEAT) {
        this.client.ws.send({
          op: Constants.OPCodes.HEARTBEAT,
          d: this.client.ws.sequence,
        });
        this.ws.client.emit('debug', 'Received gateway heartbeat');
      }
  
      if (this.ws.status === Constants.Status.RECONNECTING) {
        this.ws.reconnecting = false;
        this.ws.checkIfReady();
      }
  
      this.ws.setSequence(packet.s);
  
      if (this.ws.disabledEvents[packet.t] !== undefined) return false;
  
      if (this.ws.status !== Constants.Status.READY) {
        if (BeforeReadyWhitelist.indexOf(packet.t) === -1) {
          this.queue.push(packet);
          return false;
        }
      }
  
      if (!queue && this.queue.length > 0) this.handleQueue();
      if (this.handlers[packet.t]) return this.handlers[packet.t].handle(packet);
      return false;
    }
  }
  
  module.exports = WebSocketPacketManager;
  
  
  /***/ }),
  /* 85 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  const ClientUser = __webpack_require__(55);
  
  class ReadyHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
  
      client.ws.heartbeat();
  
      data.user.user_settings = data.user_settings;
      data.user.user_guild_settings = data.user_guild_settings;
  
      const clientUser = new ClientUser(client, data.user);
      client.user = clientUser;
      client.readyAt = new Date();
      client.users.set(clientUser.id, clientUser);
  
      for (const guild of data.guilds) if (!client.guilds.has(guild.id)) client.dataManager.newGuild(guild);
      for (const privateDM of data.private_channels) client.dataManager.newChannel(privateDM);
  
      for (const relation of data.relationships) {
        const user = client.dataManager.newUser(relation.user);
        if (relation.type === 1) {
          client.user.friends.set(user.id, user);
        } else if (relation.type === 2) {
          client.user.blocked.set(user.id, user);
        }
      }
  
      data.presences = data.presences || [];
      for (const presence of data.presences) {
        client.dataManager.newUser(presence.user);
        client._setPresence(presence.user.id, presence);
      }
  
      if (data.notes) {
        for (const user in data.notes) {
          let note = data.notes[user];
          if (!note.length) note = null;
  
          client.user.notes.set(user, note);
        }
      }
  
      if (!client.user.bot && client.options.sync) client.setInterval(client.syncGuilds.bind(client), 30000);
  
      if (!client.users.has('1')) {
        client.dataManager.newUser({
          id: '1',
          username: 'Clyde',
          discriminator: '0000',
          avatar: 'https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png',
          bot: true,
          status: 'online',
          game: null,
          verified: true,
        });
      }
  
      const t = client.setTimeout(() => {
        client.ws.connection.triggerReady();
      }, 1200 * data.guilds.length);
  
      client.setMaxListeners(data.guilds.length + 10);
  
      client.once('ready', () => {
        client.syncGuilds();
        client.setMaxListeners(10);
        client.clearTimeout(t);
      });
  
      const ws = this.packetManager.ws;
  
      ws.sessionID = data.session_id;
      ws._trace = data._trace;
      client.emit('debug', `READY ${ws._trace.join(' -> ')} ${ws.sessionID}`);
      ws.checkIfReady();
    }
  }
  
  module.exports = ReadyHandler;
  
  
  /***/ }),
  /* 86 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Constants = __webpack_require__(0);
  
  /**
   * A wrapper around the ClientUser's channel overrides.
   */
  class ClientUserChannelOverride {
    constructor(data) {
      this.patch(data);
    }
  
    /**
     * Patch the data contained in this class with new partial data.
     * @param {Object} data Data to patch this with
     * @returns {void}
     * @private
     */
    patch(data) {
      for (const key of Object.keys(Constants.UserChannelOverrideMap)) {
        const value = Constants.UserChannelOverrideMap[key];
        if (!data.hasOwnProperty(key)) continue;
        if (typeof value === 'function') {
          this[value.name] = value(data[key]);
        } else {
          this[value] = data[key];
        }
      }
    }
  }
  
  module.exports = ClientUserChannelOverride;
  
  
  /***/ }),
  /* 87 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class ResumedHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const ws = client.ws.connection;
  
      ws._trace = packet.d._trace;
  
      ws.status = Constants.Status.READY;
      this.packetManager.handleQueue();
  
      const replayed = ws.sequence - ws.closeSequence;
  
      ws.debug(`RESUMED ${ws._trace.join(' -> ')} | replayed ${replayed} events.`);
      client.emit(Constants.Events.RESUME, replayed);
      ws.heartbeat();
    }
  }
  
  /**
   * Emitted whenever a WebSocket resumes.
   * @event Client#resume
   * @param {number} replayed The number of events that were replayed
   */
  
  module.exports = ResumedHandler;
  
  
  /***/ }),
  /* 88 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildCreateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
  
      const guild = client.guilds.get(data.id);
      if (guild) {
        if (!guild.available && !data.unavailable) {
          // A newly available guild
          guild.setup(data);
          this.packetManager.ws.checkIfReady();
        }
      } else {
        // A new guild
        client.dataManager.newGuild(data);
      }
    }
  }
  
  module.exports = GuildCreateHandler;
  
  
  /***/ }),
  /* 89 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class GuildDeleteHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const response = client.actions.GuildDelete.handle(data);
      if (response.guild) client.emit(Constants.Events.GUILD_DELETE, response.guild);
    }
  }
  
  /**
   * Emitted whenever a guild is deleted/left.
   * @event Client#guildDelete
   * @param {Guild} guild The guild that was deleted
   */
  
  module.exports = GuildDeleteHandler;
  
  
  /***/ }),
  /* 90 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildUpdate.handle(data);
    }
  }
  
  module.exports = GuildUpdateHandler;
  
  
  /***/ }),
  /* 91 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // ##untested handler##
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class GuildBanAddHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const guild = client.guilds.get(data.guild_id);
      const user = client.users.get(data.user.id);
      if (guild && user) client.emit(Constants.Events.GUILD_BAN_ADD, guild, user);
    }
  }
  
  /**
   * Emitted whenever a member is banned from a guild.
   * @event Client#guildBanAdd
   * @param {Guild} guild The guild that the ban occurred in
   * @param {User} user The user that was banned
   */
  
  module.exports = GuildBanAddHandler;
  
  
  /***/ }),
  /* 92 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // ##untested handler##
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildBanRemoveHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildBanRemove.handle(data);
    }
  }
  
  /**
   * Emitted whenever a member is unbanned from a guild.
   * @event Client#guildBanRemove
   * @param {Guild} guild The guild that the unban occurred in
   * @param {User} user The user that was unbanned
   */
  
  module.exports = GuildBanRemoveHandler;
  
  
  /***/ }),
  /* 93 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // ##untested handler##
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildMemberAddHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const guild = client.guilds.get(data.guild_id);
      if (guild) {
        guild.memberCount++;
        guild._addMember(data);
      }
    }
  }
  
  module.exports = GuildMemberAddHandler;
  
  
  /***/ }),
  /* 94 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // ##untested handler##
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildMemberRemoveHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildMemberRemove.handle(data);
    }
  }
  
  module.exports = GuildMemberRemoveHandler;
  
  
  /***/ }),
  /* 95 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // ##untested handler##
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildMemberUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
  
      const guild = client.guilds.get(data.guild_id);
      if (guild) {
        const member = guild.members.get(data.user.id);
        if (member) guild._updateMember(member, data);
      }
    }
  }
  
  module.exports = GuildMemberUpdateHandler;
  
  
  /***/ }),
  /* 96 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildRoleCreateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildRoleCreate.handle(data);
    }
  }
  
  module.exports = GuildRoleCreateHandler;
  
  
  /***/ }),
  /* 97 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildRoleDeleteHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildRoleDelete.handle(data);
    }
  }
  
  module.exports = GuildRoleDeleteHandler;
  
  
  /***/ }),
  /* 98 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildRoleUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildRoleUpdate.handle(data);
    }
  }
  
  module.exports = GuildRoleUpdateHandler;
  
  
  /***/ }),
  /* 99 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildEmojisUpdate extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildEmojisUpdate.handle(data);
    }
  }
  
  module.exports = GuildEmojisUpdate;
  
  
  /***/ }),
  /* 100 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  // Uncomment in v12
  // const Collection = require('../../../../util/Collection');
  
  class GuildMembersChunkHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const guild = client.guilds.get(data.guild_id);
      if (!guild) return;
  
      // Uncomment in v12
      // const members = new Collection();
      //
      // for (const member of data.members) members.set(member.id, guild._addMember(member, false));
  
      const members = data.members.map(member => guild._addMember(member, false));
  
      client.emit(Constants.Events.GUILD_MEMBERS_CHUNK, members, guild);
  
      client.ws.lastHeartbeatAck = true;
    }
  }
  
  /**
   * Emitted whenever a chunk of guild members is received (all members come from the same guild).
   * @event Client#guildMembersChunk
   * @param {GuildMember[]} members The members in the chunk
   * @param {Guild} guild The guild related to the member chunk
   */
  
  module.exports = GuildMembersChunkHandler;
  
  
  /***/ }),
  /* 101 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class ChannelCreateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.ChannelCreate.handle(data);
    }
  }
  
  /**
   * Emitted whenever a channel is created.
   * @event Client#channelCreate
   * @param {Channel} channel The channel that was created
   */
  
  module.exports = ChannelCreateHandler;
  
  
  /***/ }),
  /* 102 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  const Constants = __webpack_require__(0);
  
  class ChannelDeleteHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const response = client.actions.ChannelDelete.handle(data);
      if (response.channel) client.emit(Constants.Events.CHANNEL_DELETE, response.channel);
    }
  }
  
  /**
   * Emitted whenever a channel is deleted.
   * @event Client#channelDelete
   * @param {Channel} channel The channel that was deleted
   */
  
  module.exports = ChannelDeleteHandler;
  
  
  /***/ }),
  /* 103 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class ChannelUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.ChannelUpdate.handle(data);
    }
  }
  
  module.exports = ChannelUpdateHandler;
  
  
  /***/ }),
  /* 104 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  /*
  { t: 'CHANNEL_PINS_UPDATE',
    s: 666,
    op: 0,
    d:
     { last_pin_timestamp: '2016-08-28T17:37:13.171774+00:00',
       channel_id: '314866471639044027' } }
  */
  
  class ChannelPinsUpdate extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const channel = client.channels.get(data.channel_id);
      const time = new Date(data.last_pin_timestamp);
      if (channel && time) client.emit(Constants.Events.CHANNEL_PINS_UPDATE, channel, time);
    }
  }
  
  /**
   * Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information
   * can be provided easily here - you need to manually check the pins yourself.
   * @event Client#channelPinsUpdate
   * @param {Channel} channel The channel that the pins update occured in
   * @param {Date} time The time of the pins update
   */
  
  module.exports = ChannelPinsUpdate;
  
  
  /***/ }),
  /* 105 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class PresenceUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      let user = client.users.get(data.user.id);
      const guild = client.guilds.get(data.guild_id);
  
      // Step 1
      if (!user) {
        if (data.user.username) {
          user = client.dataManager.newUser(data.user);
        } else {
          return;
        }
      }
  
      const oldUser = Util.cloneObject(user);
      user.patch(data.user);
      if (!user.equals(oldUser)) {
        client.emit(Constants.Events.USER_UPDATE, oldUser, user);
      }
  
      if (guild) {
        let member = guild.members.get(user.id);
        if (!member && data.status !== 'offline') {
          member = guild._addMember({
            user,
            roles: data.roles,
            deaf: false,
            mute: false,
          }, false);
          client.emit(Constants.Events.GUILD_MEMBER_AVAILABLE, member);
        }
        if (member) {
          if (client.listenerCount(Constants.Events.PRESENCE_UPDATE) === 0) {
            guild._setPresence(user.id, data);
            return;
          }
          const oldMember = Util.cloneObject(member);
          if (member.presence) {
            oldMember.frozenPresence = Util.cloneObject(member.presence);
          }
          guild._setPresence(user.id, data);
          client.emit(Constants.Events.PRESENCE_UPDATE, oldMember, member);
        } else {
          guild._setPresence(user.id, data);
        }
      }
    }
  }
  
  /**
   * Emitted whenever a guild member's presence changes, or they change one of their details.
   * @event Client#presenceUpdate
   * @param {GuildMember} oldMember The member before the presence update
   * @param {GuildMember} newMember The member after the presence update
   */
  
  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * @event Client#userUpdate
   * @param {User} oldUser The user before the update
   * @param {User} newUser The user after the update
   */
  
  /**
   * Emitted whenever a member becomes available in a large guild.
   * @event Client#guildMemberAvailable
   * @param {GuildMember} member The member that became available
   */
  
  module.exports = PresenceUpdateHandler;
  
  
  /***/ }),
  /* 106 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class UserUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.UserUpdate.handle(data);
    }
  }
  
  module.exports = UserUpdateHandler;
  
  
  /***/ }),
  /* 107 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class UserNoteUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
  
      client.actions.UserNoteUpdate.handle(data);
    }
  }
  
  module.exports = UserNoteUpdateHandler;
  
  
  /***/ }),
  /* 108 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class UserSettingsUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      client.user.settings.patch(packet.d);
      client.emit(Constants.Events.USER_SETTINGS_UPDATE, client.user.settings);
    }
  }
  
  /**
   * Emitted when the client user's settings update.
   * @event Client#clientUserSettingsUpdate
   * @param {ClientUserSettings} clientUserSettings The new client user settings
   */
  
  module.exports = UserSettingsUpdateHandler;
  
  
  /***/ }),
  /* 109 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  const ClientUserGuildSettings = __webpack_require__(57);
  
  class UserGuildSettingsUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const settings = client.user.guildSettings.get(packet.d.guild_id);
      if (settings) settings.patch(packet.d);
      else client.user.guildSettings.set(packet.d.guild_id, new ClientUserGuildSettings(packet.d, client));
      client.emit(Constants.Events.USER_GUILD_SETTINGS_UPDATE, client.user.guildSettings.get(packet.d.guild_id));
    }
  }
  
  /**
   * Emitted whenever the client user's settings update.
   * @event Client#clientUserGuildSettingsUpdate
   * @param {ClientUserGuildSettings} clientUserGuildSettings The new client user guild settings
   */
  
  module.exports = UserGuildSettingsUpdateHandler;
  
  
  /***/ }),
  /* 110 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class VoiceStateUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
  
      const guild = client.guilds.get(data.guild_id);
      if (guild) {
        const member = guild.members.get(data.user_id);
        if (member) {
          const oldVoiceChannelMember = Util.cloneObject(member);
          if (member.voiceChannel && member.voiceChannel.id !== data.channel_id) {
            member.voiceChannel.members.delete(oldVoiceChannelMember.id);
          }
  
          // If the member left the voice channel, unset their speaking property
          if (!data.channel_id) member.speaking = null;
  
          if (member.user.id === client.user.id && data.channel_id) {
            client.emit('self.voiceStateUpdate', data);
          }
  
          const newChannel = client.channels.get(data.channel_id);
          if (newChannel) {
            newChannel.members.set(member.id, member);
            member.guild.channels.set(data.channel_id, newChannel);
          }
  
          member.serverMute = data.mute;
          member.serverDeaf = data.deaf;
          member.selfMute = data.self_mute;
          member.selfDeaf = data.self_deaf;
          member.voiceSessionID = data.session_id;
          member.voiceChannelID = data.channel_id;
          client.emit(Constants.Events.VOICE_STATE_UPDATE, oldVoiceChannelMember, member);
        }
      }
    }
  }
  
  /**
   * Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @event Client#voiceStateUpdate
   * @param {GuildMember} oldMember The member before the voice state update
   * @param {GuildMember} newMember The member after the voice state update
   */
  
  module.exports = VoiceStateUpdateHandler;
  
  
  /***/ }),
  /* 111 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class TypingStartHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const channel = client.channels.get(data.channel_id);
      const user = client.users.get(data.user_id);
      const timestamp = new Date(data.timestamp * 1000);
  
      if (channel && user) {
        if (channel.type === 'voice') {
          client.emit(Constants.Events.WARN, `Discord sent a typing packet to voice channel ${channel.id}`);
          return;
        }
        if (channel._typing.has(user.id)) {
          const typing = channel._typing.get(user.id);
          typing.lastTimestamp = timestamp;
          typing.resetTimeout(tooLate(channel, user));
        } else {
          channel._typing.set(user.id, new TypingData(client, timestamp, timestamp, tooLate(channel, user)));
          client.emit(Constants.Events.TYPING_START, channel, user);
        }
      }
    }
  }
  
  class TypingData {
    constructor(client, since, lastTimestamp, _timeout) {
      this.client = client;
      this.since = since;
      this.lastTimestamp = lastTimestamp;
      this._timeout = _timeout;
    }
  
    resetTimeout(_timeout) {
      this.client.clearTimeout(this._timeout);
      this._timeout = _timeout;
    }
  
    get elapsedTime() {
      return Date.now() - this.since;
    }
  }
  
  function tooLate(channel, user) {
    return channel.client.setTimeout(() => {
      channel.client.emit(Constants.Events.TYPING_STOP, channel, user, channel._typing.get(user.id));
      channel._typing.delete(user.id);
    }, 6000);
  }
  
  /**
   * Emitted whenever a user starts typing in a channel.
   * @event Client#typingStart
   * @param {Channel} channel The channel the user started typing in
   * @param {User} user The user that started typing
   */
  
  /**
   * Emitted whenever a user stops typing in a channel.
   * @event Client#typingStop
   * @param {Channel} channel The channel the user stopped typing in
   * @param {User} user The user that stopped typing
   */
  
  module.exports = TypingStartHandler;
  
  
  /***/ }),
  /* 112 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class MessageCreateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const response = client.actions.MessageCreate.handle(data);
      if (response.message) client.emit(Constants.Events.MESSAGE_CREATE, response.message);
    }
  }
  
  /**
   * Emitted whenever a message is created.
   * @event Client#message
   * @param {Message} message The created message
   */
  
  module.exports = MessageCreateHandler;
  
  
  /***/ }),
  /* 113 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  const Constants = __webpack_require__(0);
  
  class MessageDeleteHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      const response = client.actions.MessageDelete.handle(data);
      if (response.message) client.emit(Constants.Events.MESSAGE_DELETE, response.message);
    }
  }
  
  /**
   * Emitted whenever a message is deleted.
   * @event Client#messageDelete
   * @param {Message} message The deleted message
   */
  
  module.exports = MessageDeleteHandler;
  
  
  /***/ }),
  /* 114 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class MessageUpdateHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.MessageUpdate.handle(data);
    }
  }
  
  module.exports = MessageUpdateHandler;
  
  
  /***/ }),
  /* 115 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class MessageDeleteBulkHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.MessageDeleteBulk.handle(data);
    }
  }
  
  /**
   * Emitted whenever messages are deleted in bulk.
   * @event Client#messageDeleteBulk
   * @param {Collection<Snowflake, Message>} messages The deleted messages, mapped by their ID
   */
  
  module.exports = MessageDeleteBulkHandler;
  
  
  /***/ }),
  /* 116 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  /*
  {
      "token": "my_token",
      "guild_id": "41771983423143937",
      "endpoint": "smart.loyal.discord.gg"
  }
  */
  
  class VoiceServerUpdate extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.emit('self.voiceServer', data);
    }
  }
  
  module.exports = VoiceServerUpdate;
  
  
  /***/ }),
  /* 117 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class GuildSyncHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.GuildSync.handle(data);
    }
  }
  
  module.exports = GuildSyncHandler;
  
  
  /***/ }),
  /* 118 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class RelationshipAddHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      if (data.type === 1) {
        client.fetchUser(data.id).then(user => {
          client.user.friends.set(user.id, user);
        });
      } else if (data.type === 2) {
        client.fetchUser(data.id).then(user => {
          client.user.blocked.set(user.id, user);
        });
      }
    }
  }
  
  module.exports = RelationshipAddHandler;
  
  
  /***/ }),
  /* 119 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class RelationshipRemoveHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      if (data.type === 2) {
        if (client.user.blocked.has(data.id)) {
          client.user.blocked.delete(data.id);
        }
      } else if (data.type === 1) {
        if (client.user.friends.has(data.id)) {
          client.user.friends.delete(data.id);
        }
      }
    }
  }
  
  module.exports = RelationshipRemoveHandler;
  
  
  /***/ }),
  /* 120 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class MessageReactionAddHandler extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.MessageReactionAdd.handle(data);
    }
  }
  
  module.exports = MessageReactionAddHandler;
  
  
  /***/ }),
  /* 121 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class MessageReactionRemove extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.MessageReactionRemove.handle(data);
    }
  }
  
  module.exports = MessageReactionRemove;
  
  
  /***/ }),
  /* 122 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const AbstractHandler = __webpack_require__(1);
  
  class MessageReactionRemoveAll extends AbstractHandler {
    handle(packet) {
      const client = this.packetManager.client;
      const data = packet.d;
      client.actions.MessageReactionRemoveAll.handle(data);
    }
  }
  
  module.exports = MessageReactionRemoveAll;
  
  
  /***/ }),
  /* 123 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 124 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 125 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 126 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 127 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const EventEmitter = __webpack_require__(20).EventEmitter;
  const Constants = __webpack_require__(0);
  const WebSocketConnection = __webpack_require__(54);
  
  /**
   * WebSocket Manager of the client.
   * @private
   */
  class WebSocketManager extends EventEmitter {
    constructor(client) {
      super();
      /**
       * The client that instantiated this WebSocketManager
       * @type {Client}
       */
      this.client = client;
  
      /**
       * The WebSocket connection of this manager
       * @type {?WebSocketConnection}
       */
      this.connection = null;
    }
  
    /**
     * Sends a heartbeat on the available connection.
     * @returns {void}
     */
    heartbeat() {
      if (!this.connection) return this.debug('No connection to heartbeat');
      return this.connection.heartbeat();
    }
  
    /**
     * Emits a debug event.
     * @param {string} message Debug message
     * @returns {void}
     */
    debug(message) {
      return this.client.emit('debug', `[ws] ${message}`);
    }
  
    /**
     * Destroy the client.
     * @returns {void} Whether or not destruction was successful
     */
    destroy() {
      if (!this.connection) {
        this.debug('Attempted to destroy WebSocket but no connection exists!');
        return false;
      }
      return this.connection.destroy();
    }
  
    /**
     * Send a packet on the available WebSocket.
     * @param {Object} packet Packet to send
     * @returns {void}
     */
    send(packet) {
      if (!this.connection) {
        this.debug('No connection to websocket');
        return;
      }
      this.connection.send(packet);
    }
  
    /**
     * Connects the client to a gateway.
     * @param {string} gateway The gateway to connect to
     * @returns {boolean}
     */
    connect(gateway) {
      if (!this.connection) {
        this.connection = new WebSocketConnection(this, gateway);
        return true;
      }
      switch (this.connection.status) {
        case Constants.Status.IDLE:
        case Constants.Status.DISCONNECTED:
          this.connection.connect(gateway, 5500);
          return true;
        default:
          this.debug(`Couldn't connect to ${gateway} as the websocket is at state ${this.connection.status}`);
          return false;
      }
    }
  }
  
  module.exports = WebSocketManager;
  
  
  /***/ }),
  /* 128 */
  /***/ (function(module, exports, __webpack_require__) {
  
  class ActionsManager {
    constructor(client) {
      this.client = client;
  
      this.register(__webpack_require__(129));
      this.register(__webpack_require__(130));
      this.register(__webpack_require__(131));
      this.register(__webpack_require__(132));
      this.register(__webpack_require__(133));
      this.register(__webpack_require__(134));
      this.register(__webpack_require__(135));
      this.register(__webpack_require__(136));
      this.register(__webpack_require__(137));
      this.register(__webpack_require__(138));
      this.register(__webpack_require__(139));
      this.register(__webpack_require__(140));
      this.register(__webpack_require__(141));
      this.register(__webpack_require__(142));
      this.register(__webpack_require__(143));
      this.register(__webpack_require__(144));
      this.register(__webpack_require__(145));
      this.register(__webpack_require__(146));
      this.register(__webpack_require__(147));
      this.register(__webpack_require__(148));
      this.register(__webpack_require__(149));
      this.register(__webpack_require__(150));
      this.register(__webpack_require__(151));
      this.register(__webpack_require__(152));
      this.register(__webpack_require__(153));
      this.register(__webpack_require__(154));
      this.register(__webpack_require__(155));
      this.register(__webpack_require__(156));
    }
  
    register(Action) {
      this[Action.name.replace(/Action$/, '')] = new Action(this.client);
    }
  }
  
  module.exports = ActionsManager;
  
  
  /***/ }),
  /* 129 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Message = __webpack_require__(16);
  
  class MessageCreateAction extends Action {
    handle(data) {
      const client = this.client;
  
      const channel = client.channels.get((data instanceof Array ? data[0] : data).channel_id);
      const user = client.users.get((data instanceof Array ? data[0] : data).author.id);
      if (channel) {
        const member = channel.guild ? channel.guild.member(user) : null;
        if (data instanceof Array) {
          const messages = new Array(data.length);
          for (let i = 0; i < data.length; i++) {
            messages[i] = channel._cacheMessage(new Message(channel, data[i], client));
          }
          const lastMessage = messages[messages.length - 1];
          channel.lastMessageID = lastMessage.id;
          channel.lastMessage = lastMessage;
          if (user) {
            user.lastMessageID = lastMessage.id;
            user.lastMessage = lastMessage;
          }
          if (member) {
            member.lastMessageID = lastMessage.id;
            member.lastMessage = lastMessage;
          }
          return {
            messages,
          };
        } else {
          const message = channel._cacheMessage(new Message(channel, data, client));
          channel.lastMessageID = data.id;
          channel.lastMessage = message;
          if (user) {
            user.lastMessageID = data.id;
            user.lastMessage = message;
          }
          if (member) {
            member.lastMessageID = data.id;
            member.lastMessage = message;
          }
          return {
            message,
          };
        }
      }
  
      return {
        message: null,
      };
    }
  }
  
  module.exports = MessageCreateAction;
  
  
  /***/ }),
  /* 130 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class MessageDeleteAction extends Action {
    constructor(client) {
      super(client);
      this.deleted = new Map();
    }
  
    handle(data) {
      const client = this.client;
      const channel = client.channels.get(data.channel_id);
      let message;
  
      if (channel) {
        message = channel.messages.get(data.id);
        if (message) {
          channel.messages.delete(message.id);
          this.deleted.set(channel.id + message.id, message);
          this.scheduleForDeletion(channel.id, message.id);
        } else {
          message = this.deleted.get(channel.id + data.id) || null;
        }
        if (message) message.deleted = true;
      }
  
      return { message };
    }
  
    scheduleForDeletion(channelID, messageID) {
      this.client.setTimeout(() => this.deleted.delete(channelID + messageID),
        this.client.options.restWsBridgeTimeout);
    }
  }
  
  module.exports = MessageDeleteAction;
  
  
  /***/ }),
  /* 131 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Collection = __webpack_require__(3);
  const Constants = __webpack_require__(0);
  
  class MessageDeleteBulkAction extends Action {
    handle(data) {
      const messages = new Collection();
      const channel = this.client.channels.get(data.channel_id);
  
      if (channel) {
        for (const id of data.ids) {
          const message = channel.messages.get(id);
          if (message) {
            message.deleted = true;
            messages.set(message.id, message);
            channel.messages.delete(id);
          }
        }
      }
  
      if (messages.size > 0) this.client.emit(Constants.Events.MESSAGE_BULK_DELETE, messages);
      return { messages };
    }
  }
  
  module.exports = MessageDeleteBulkAction;
  
  
  /***/ }),
  /* 132 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class MessageUpdateAction extends Action {
    handle(data) {
      const client = this.client;
  
      const channel = client.channels.get(data.channel_id);
      if (channel) {
        const message = channel.messages.get(data.id);
        if (message) {
          message.patch(data);
          client.emit(Constants.Events.MESSAGE_UPDATE, message._edits[0], message);
          return {
            old: message._edits[0],
            updated: message,
          };
        }
  
        return {
          old: message,
          updated: message,
        };
      }
  
      return {
        old: null,
        updated: null,
      };
    }
  }
  
  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * @event Client#messageUpdate
   * @param {Message} oldMessage The message before the update
   * @param {Message} newMessage The message after the update
   */
  
  module.exports = MessageUpdateAction;
  
  
  /***/ }),
  /* 133 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  /*
  { user_id: 'id',
       message_id: 'id',
       emoji: { name: '�', id: null },
       channel_id: 'id' } }
  */
  
  class MessageReactionAdd extends Action {
    handle(data) {
      const user = this.client.users.get(data.user_id);
      if (!user) return false;
      // Verify channel
      const channel = this.client.channels.get(data.channel_id);
      if (!channel || channel.type === 'voice') return false;
      // Verify message
      const message = channel.messages.get(data.message_id);
      if (!message) return false;
      if (!data.emoji) return false;
      // Verify reaction
      const reaction = message._addReaction(data.emoji, user);
      if (reaction) this.client.emit(Constants.Events.MESSAGE_REACTION_ADD, reaction, user);
  
      return { message, reaction, user };
    }
  }
  
  /**
   * Emitted whenever a reaction is added to a cached message.
   * @event Client#messageReactionAdd
   * @param {MessageReaction} messageReaction The reaction object
   * @param {User} user The user that applied the emoji or reaction emoji
   */
  
  module.exports = MessageReactionAdd;
  
  
  /***/ }),
  /* 134 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  /*
  { user_id: 'id',
       message_id: 'id',
       emoji: { name: '�', id: null },
       channel_id: 'id' } }
  */
  
  class MessageReactionRemove extends Action {
    handle(data) {
      const user = this.client.users.get(data.user_id);
      if (!user) return false;
      // Verify channel
      const channel = this.client.channels.get(data.channel_id);
      if (!channel || channel.type === 'voice') return false;
      // Verify message
      const message = channel.messages.get(data.message_id);
      if (!message) return false;
      if (!data.emoji) return false;
      // Verify reaction
      const reaction = message._removeReaction(data.emoji, user);
      if (reaction) this.client.emit(Constants.Events.MESSAGE_REACTION_REMOVE, reaction, user);
  
      return { message, reaction, user };
    }
  }
  
  /**
   * Emitted whenever a reaction is removed from a cached message.
   * @event Client#messageReactionRemove
   * @param {MessageReaction} messageReaction The reaction object
   * @param {User} user The user whose emoji or reaction emoji was removed
   */
  
  module.exports = MessageReactionRemove;
  
  
  /***/ }),
  /* 135 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class MessageReactionRemoveAll extends Action {
    handle(data) {
      const channel = this.client.channels.get(data.channel_id);
      if (!channel || channel.type === 'voice') return false;
  
      const message = channel.messages.get(data.message_id);
      if (!message) return false;
  
      message._clearReactions();
      this.client.emit(Constants.Events.MESSAGE_REACTION_REMOVE_ALL, message);
  
      return { message };
    }
  }
  
  /**
   * Emitted whenever all reactions are removed from a cached message.
   * @event Client#messageReactionRemoveAll
   * @param {Message} message The message the reactions were removed from
   */
  
  module.exports = MessageReactionRemoveAll;
  
  
  /***/ }),
  /* 136 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class ChannelCreateAction extends Action {
    handle(data) {
      const client = this.client;
      const channel = client.dataManager.newChannel(data);
      return { channel };
    }
  }
  
  module.exports = ChannelCreateAction;
  
  
  /***/ }),
  /* 137 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class ChannelDeleteAction extends Action {
    constructor(client) {
      super(client);
      this.deleted = new Map();
    }
  
    handle(data) {
      const client = this.client;
  
      let channel = client.channels.get(data.id);
      if (channel) {
        client.dataManager.killChannel(channel);
        this.deleted.set(channel.id, channel);
        this.scheduleForDeletion(channel.id);
      } else {
        channel = this.deleted.get(data.id) || null;
      }
      if (channel) channel.deleted = true;
  
      return { channel };
    }
  
    scheduleForDeletion(id) {
      this.client.setTimeout(() => this.deleted.delete(id), this.client.options.restWsBridgeTimeout);
    }
  }
  
  module.exports = ChannelDeleteAction;
  
  
  /***/ }),
  /* 138 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class ChannelUpdateAction extends Action {
    handle(data) {
      const client = this.client;
  
      const channel = client.channels.get(data.id);
      if (channel) {
        const oldChannel = Util.cloneObject(channel);
        channel.setup(data);
        client.emit(Constants.Events.CHANNEL_UPDATE, oldChannel, channel);
        return {
          old: oldChannel,
          updated: channel,
        };
      }
  
      return {
        old: null,
        updated: null,
      };
    }
  }
  
  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change.
   * @event Client#channelUpdate
   * @param {Channel} oldChannel The channel before the update
   * @param {Channel} newChannel The channel after the update
   */
  
  module.exports = ChannelUpdateAction;
  
  
  /***/ }),
  /* 139 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class GuildDeleteAction extends Action {
    constructor(client) {
      super(client);
      this.deleted = new Map();
    }
  
    handle(data) {
      const client = this.client;
  
      let guild = client.guilds.get(data.id);
      if (guild) {
        for (const channel of guild.channels.values()) {
          if (channel.type === 'text') channel.stopTyping(true);
        }
  
        if (guild.available && data.unavailable) {
          // Guild is unavailable
          guild.available = false;
          client.emit(Constants.Events.GUILD_UNAVAILABLE, guild);
  
          // Stops the GuildDelete packet thinking a guild was actually deleted,
          // handles emitting of event itself
          return {
            guild: null,
          };
        }
  
        for (const channel of guild.channels.values()) this.client.channels.delete(channel.id);
        if (guild.voiceConnection) guild.voiceConnection.disconnect();
  
        // Delete guild
        client.guilds.delete(guild.id);
        this.deleted.set(guild.id, guild);
        this.scheduleForDeletion(guild.id);
      } else {
        guild = this.deleted.get(data.id) || null;
      }
      if (guild) guild.deleted = true;
  
      return { guild };
    }
  
    scheduleForDeletion(id) {
      this.client.setTimeout(() => this.deleted.delete(id), this.client.options.restWsBridgeTimeout);
    }
  }
  
  /**
   * Emitted whenever a guild becomes unavailable, likely due to a server outage.
   * @event Client#guildUnavailable
   * @param {Guild} guild The guild that has become unavailable
   */
  
  module.exports = GuildDeleteAction;
  
  
  /***/ }),
  /* 140 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class GuildUpdateAction extends Action {
    handle(data) {
      const client = this.client;
  
      const guild = client.guilds.get(data.id);
      if (guild) {
        const oldGuild = Util.cloneObject(guild);
        guild.setup(data);
        client.emit(Constants.Events.GUILD_UPDATE, oldGuild, guild);
        return {
          old: oldGuild,
          updated: guild,
        };
      }
  
      return {
        old: null,
        updated: null,
      };
    }
  }
  
  /**
   * Emitted whenever a guild is updated - e.g. name change.
   * @event Client#guildUpdate
   * @param {Guild} oldGuild The guild before the update
   * @param {Guild} newGuild The guild after the update
   */
  
  module.exports = GuildUpdateAction;
  
  
  /***/ }),
  /* 141 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildMemberGetAction extends Action {
    handle(guild, data) {
      const member = guild._addMember(data, false);
      return { member };
    }
  }
  
  module.exports = GuildMemberGetAction;
  
  
  /***/ }),
  /* 142 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class GuildMemberRemoveAction extends Action {
    constructor(client) {
      super(client);
      this.deleted = new Map();
    }
  
    handle(data) {
      const client = this.client;
      const guild = client.guilds.get(data.guild_id);
      let member = null;
      if (guild) {
        member = guild.members.get(data.user.id);
        guild.memberCount--;
        if (member) {
          guild._removeMember(member);
          this.deleted.set(guild.id + data.user.id, member);
          if (client.status === Constants.Status.READY) client.emit(Constants.Events.GUILD_MEMBER_REMOVE, member);
          this.scheduleForDeletion(guild.id, data.user.id);
        } else {
          member = this.deleted.get(guild.id + data.user.id) || null;
        }
        if (member) member.deleted = true;
      }
      return { guild, member };
    }
  
    scheduleForDeletion(guildID, userID) {
      this.client.setTimeout(() => this.deleted.delete(guildID + userID), this.client.options.restWsBridgeTimeout);
    }
  }
  
  /**
   * Emitted whenever a member leaves a guild, or is kicked.
   * @event Client#guildMemberRemove
   * @param {GuildMember} member The member that has left/been kicked from the guild
   */
  
  module.exports = GuildMemberRemoveAction;
  
  
  /***/ }),
  /* 143 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class GuildBanRemove extends Action {
    handle(data) {
      const client = this.client;
      const guild = client.guilds.get(data.guild_id);
      const user = client.dataManager.newUser(data.user);
      if (guild && user) client.emit(Constants.Events.GUILD_BAN_REMOVE, guild, user);
    }
  }
  
  module.exports = GuildBanRemove;
  
  
  /***/ }),
  /* 144 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  const Role = __webpack_require__(8);
  
  class GuildRoleCreate extends Action {
    handle(data) {
      const client = this.client;
      const guild = client.guilds.get(data.guild_id);
      let role;
      if (guild) {
        const already = guild.roles.has(data.role.id);
        role = new Role(guild, data.role);
        guild.roles.set(role.id, role);
        if (!already) client.emit(Constants.Events.GUILD_ROLE_CREATE, role);
      }
      return { role };
    }
  }
  
  /**
   * Emitted whenever a role is created.
   * @event Client#roleCreate
   * @param {Role} role The role that was created
   */
  
  module.exports = GuildRoleCreate;
  
  
  /***/ }),
  /* 145 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class GuildRoleDeleteAction extends Action {
    constructor(client) {
      super(client);
      this.deleted = new Map();
    }
  
    handle(data) {
      const client = this.client;
      const guild = client.guilds.get(data.guild_id);
      let role;
  
      if (guild) {
        role = guild.roles.get(data.role_id);
        if (role) {
          guild.roles.delete(data.role_id);
          this.deleted.set(guild.id + data.role_id, role);
          this.scheduleForDeletion(guild.id, data.role_id);
          client.emit(Constants.Events.GUILD_ROLE_DELETE, role);
        } else {
          role = this.deleted.get(guild.id + data.role_id) || null;
        }
        if (role) role.deleted = true;
      }
  
      return { role };
    }
  
    scheduleForDeletion(guildID, roleID) {
      this.client.setTimeout(() => this.deleted.delete(guildID + roleID), this.client.options.restWsBridgeTimeout);
    }
  }
  
  /**
   * Emitted whenever a guild role is deleted.
   * @event Client#roleDelete
   * @param {Role} role The role that was deleted
   */
  
  module.exports = GuildRoleDeleteAction;
  
  
  /***/ }),
  /* 146 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class GuildRoleUpdateAction extends Action {
    handle(data) {
      const client = this.client;
      const guild = client.guilds.get(data.guild_id);
  
      if (guild) {
        const roleData = data.role;
        let oldRole = null;
  
        const role = guild.roles.get(roleData.id);
        if (role) {
          oldRole = Util.cloneObject(role);
          role.setup(data.role);
          client.emit(Constants.Events.GUILD_ROLE_UPDATE, oldRole, role);
        }
  
        return {
          old: oldRole,
          updated: role,
        };
      }
  
      return {
        old: null,
        updated: null,
      };
    }
  }
  
  /**
   * Emitted whenever a guild role is updated.
   * @event Client#roleUpdate
   * @param {Role} oldRole The role before the update
   * @param {Role} newRole The role after the update
   */
  
  module.exports = GuildRoleUpdateAction;
  
  
  /***/ }),
  /* 147 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class UserGetAction extends Action {
    handle(data) {
      const client = this.client;
      const user = client.dataManager.newUser(data);
      return { user };
    }
  }
  
  module.exports = UserGetAction;
  
  
  /***/ }),
  /* 148 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  class UserUpdateAction extends Action {
    handle(data) {
      const client = this.client;
  
      if (client.user) {
        if (client.user.equals(data)) {
          return {
            old: client.user,
            updated: client.user,
          };
        }
  
        const oldUser = Util.cloneObject(client.user);
        client.user.patch(data);
        client.emit(Constants.Events.USER_UPDATE, oldUser, client.user);
        return {
          old: oldUser,
          updated: client.user,
        };
      }
  
      return {
        old: null,
        updated: null,
      };
    }
  }
  
  module.exports = UserUpdateAction;
  
  
  /***/ }),
  /* 149 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  const Constants = __webpack_require__(0);
  
  class UserNoteUpdateAction extends Action {
    handle(data) {
      const client = this.client;
  
      const oldNote = client.user.notes.get(data.id);
      const note = data.note.length ? data.note : null;
  
      client.user.notes.set(data.id, note);
  
      client.emit(Constants.Events.USER_NOTE_UPDATE, data.id, oldNote, note);
  
      return {
        old: oldNote,
        updated: note,
      };
    }
  }
  
  /**
   * Emitted whenever a note is updated.
   * @event Client#userNoteUpdate
   * @param {User} user The user the note belongs to
   * @param {string} oldNote The note content before the update
   * @param {string} newNote The note content after the update
   */
  
  module.exports = UserNoteUpdateAction;
  
  
  /***/ }),
  /* 150 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildSync extends Action {
    handle(data) {
      const client = this.client;
  
      const guild = client.guilds.get(data.id);
      if (guild) {
        if (data.presences) {
          for (const presence of data.presences) guild._setPresence(presence.user.id, presence);
        }
  
        if (data.members) {
          for (const syncMember of data.members) {
            const member = guild.members.get(syncMember.user.id);
            if (member) {
              guild._updateMember(member, syncMember);
            } else {
              guild._addMember(syncMember, false);
            }
          }
        }
  
        if ('large' in data) guild.large = data.large;
      }
    }
  }
  
  module.exports = GuildSync;
  
  
  /***/ }),
  /* 151 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildEmojiCreateAction extends Action {
    handle(guild, createdEmoji) {
      const client = this.client;
      const emoji = client.dataManager.newEmoji(createdEmoji, guild);
      return { emoji };
    }
  }
  
  /**
   * Emitted whenever a custom emoji is created in a guild.
   * @event Client#emojiCreate
   * @param {Emoji} emoji The emoji that was created
   */
  
  module.exports = GuildEmojiCreateAction;
  
  
  /***/ }),
  /* 152 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildEmojiDeleteAction extends Action {
    handle(emoji) {
      const client = this.client;
      client.dataManager.killEmoji(emoji);
      emoji.deleted = true;
      return { emoji };
    }
  }
  
  /**
   * Emitted whenever a custom guild emoji is deleted.
   * @event Client#emojiDelete
   * @param {Emoji} emoji The emoji that was deleted
   */
  
  module.exports = GuildEmojiDeleteAction;
  
  
  /***/ }),
  /* 153 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildEmojiUpdateAction extends Action {
    handle(oldEmoji, newEmoji) {
      const emoji = this.client.dataManager.updateEmoji(oldEmoji, newEmoji);
      return { emoji };
    }
  }
  
  /**
   * Emitted whenever a custom guild emoji is updated.
   * @event Client#emojiUpdate
   * @param {Emoji} oldEmoji The old emoji
   * @param {Emoji} newEmoji The new emoji
   */
  
  module.exports = GuildEmojiUpdateAction;
  
  
  /***/ }),
  /* 154 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  function mappify(iterable) {
    const map = new Map();
    for (const x of iterable) map.set(...x);
    return map;
  }
  
  class GuildEmojisUpdateAction extends Action {
    handle(data) {
      const guild = this.client.guilds.get(data.guild_id);
      if (!guild || !guild.emojis) return;
  
      const deletions = mappify(guild.emojis.entries());
  
      for (const emoji of data.emojis) {
        // Determine type of emoji event
        const cachedEmoji = guild.emojis.get(emoji.id);
        if (cachedEmoji) {
          deletions.delete(emoji.id);
          if (!cachedEmoji.equals(emoji, true)) {
            // Emoji updated
            this.client.actions.GuildEmojiUpdate.handle(cachedEmoji, emoji);
          }
        } else {
          // Emoji added
          this.client.actions.GuildEmojiCreate.handle(guild, emoji);
        }
      }
  
      for (const emoji of deletions.values()) {
        // Emoji deleted
        this.client.actions.GuildEmojiDelete.handle(emoji);
      }
    }
  }
  
  module.exports = GuildEmojisUpdateAction;
  
  
  /***/ }),
  /* 155 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildRolesPositionUpdate extends Action {
    handle(data) {
      const client = this.client;
  
      const guild = client.guilds.get(data.guild_id);
      if (guild) {
        for (const partialRole of data.roles) {
          const role = guild.roles.get(partialRole.id);
          if (role) role.position = partialRole.position;
        }
      }
  
      return { guild };
    }
  }
  
  module.exports = GuildRolesPositionUpdate;
  
  
  /***/ }),
  /* 156 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Action = __webpack_require__(2);
  
  class GuildChannelsPositionUpdate extends Action {
    handle(data) {
      const client = this.client;
  
      const guild = client.guilds.get(data.guild_id);
      if (guild) {
        for (const partialChannel of data.channels) {
          const channel = guild.channels.get(partialChannel.id);
          if (channel) channel.position = partialChannel.position;
        }
      }
  
      return { guild };
    }
  }
  
  module.exports = GuildChannelsPositionUpdate;
  
  
  /***/ }),
  /* 157 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 158 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 159 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 160 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 161 */
  /***/ (function(module, exports) {
  
  /* (ignored) */
  
  /***/ }),
  /* 162 */
  /***/ (function(module, exports, __webpack_require__) {
  
  const Webhook = __webpack_require__(24);
  const RESTManager = __webpack_require__(38);
  const ClientDataResolver = __webpack_require__(28);
  const Constants = __webpack_require__(0);
  const Util = __webpack_require__(4);
  
  /**
   * The webhook client.
   * @extends {Webhook}
   */
  class WebhookClient extends Webhook {
    /**
     * @param {Snowflake} id ID of the webhook
     * @param {string} token Token of the webhook
     * @param {ClientOptions} [options] Options for the client
     * @example
     * // Create a new webhook and send a message
     * const hook = new Discord.WebhookClient('1234', 'abcdef');
     * hook.sendMessage('This will send a message').catch(console.error);
     */
    constructor(id, token, options) {
      super(null, id, token);
  
      /**
       * The options the client was instantiated with
       * @type {ClientOptions}
       */
      this.options = Util.mergeDefault(Constants.DefaultOptions, options);
  
      /**
       * The REST manager of the client
       * @type {RESTManager}
       * @private
       */
      this.rest = new RESTManager(this);
  
      /**
       * The data resolver of the client
       * @type {ClientDataResolver}
       * @private
       */
      this.resolver = new ClientDataResolver(this);
  
      /**
       * Timeouts set by {@link WebhookClient#setTimeout} that are still active
       * @type {Set<Timeout>}
       * @private
       */
      this._timeouts = new Set();
  
      /**
       * Intervals set by {@link WebhookClient#setInterval} that are still active
       * @type {Set<Timeout>}
       * @private
       */
      this._intervals = new Set();
    }
  
    /**
     * Sets a timeout that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setTimeout(fn, delay, ...args) {
      const timeout = setTimeout(() => {
        fn(...args);
        this._timeouts.delete(timeout);
      }, delay);
      this._timeouts.add(timeout);
      return timeout;
    }
  
    /**
     * Clears a timeout.
     * @param {Timeout} timeout Timeout to cancel
     */
    clearTimeout(timeout) {
      clearTimeout(timeout);
      this._timeouts.delete(timeout);
    }
  
    /**
     * Sets an interval that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setInterval(fn, delay, ...args) {
      const interval = setInterval(fn, delay, ...args);
      this._intervals.add(interval);
      return interval;
    }
  
    /**
     * Clears an interval.
     * @param {Timeout} interval Interval to cancel
     */
    clearInterval(interval) {
      clearInterval(interval);
      this._intervals.delete(interval);
    }
  
  
    /**
     * Destroys the client.
     */
    destroy() {
      for (const t of this._timeouts) clearTimeout(t);
      for (const i of this._intervals) clearInterval(i);
      this._timeouts.clear();
      this._intervals.clear();
    }
  }
  
  module.exports = WebhookClient;
  
  
  /***/ })
  /******/ ]);