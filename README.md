# Discord Exporter

Powerful NodeJS scripts to easily export your Discord data.

[![axios](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/discord-exporters/axios)](https://www.npmjs.com/package/axios)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/discord-exporters.svg)](https://github.com/LockBlock-dev/discord-exporters/stargazers)

This tool can be use alongside with [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter).


## Disclaimer

• This repository is an unofficial use of the [Discord's API](https://discord.com/developers/docs/intro). Bugs can occur.

• You must also use your token in the process, something [prohibited by Discord](https://discord.com/developers/docs/topics/oauth2#bot-vs-user-accounts) : `"Automating normal user accounts [...] can result in an account termination"`. I can not be held responsible for the use of this script, nor any ban of your account.


## Modules

| Name | Description | Ban risk level |  Reason |
| --- | --- | --- | --- |
| [Emotes](./doc/Emotes.md) | Export your emotes | ![Low](https://img.shields.io/badge/-Low-brightgreen) | Emotes are downloaded from the CDN |
| [Friends-List](./doc/Friends-List.md) | Export your friends | ![Low](https://img.shields.io/badge/-Low-brightgreen) | Only 1 request is made |
| [Guilds](./doc/Guilds.md) | Export your guilds | ![Medium](https://img.shields.io/badge/-Medium-orange) | A lot of requests are made (with invites) |
| [Token](./doc/Token.md) | Get your token | ![None](https://img.shields.io/badge/-None-inactive) | Discord is closed during this process |


## How to use

• Download [NodeJS](https://nodejs.org) and [NPM](https://www.npmjs.com/get-npm)

• Download the project or clone it

• Go to the Discord-Exporters folder and do `npm install`

• Edit the [config](./config.json) :
```js
token: "",
//your Discord token
debug: false,
//debug logs
pathToDiscordDB: "",
//path to Discord leveldb
//for Windows it is: C:/Users/USERNAME/AppData/Roaming/discord/Local Storage/leveldb
//used only in the Token getter
```

• Run it : with the [starter](./start.bat) / by doing `node index.js` / by doing `npm start`

• Find the results in the [results](./results) folder

• These are in 3 formats :

JSON :
```json
[
    {
        "property1": "property1",
        "property2": "property2"
    }
]
```
TEXT :
```css
PROPERTY1 : PROPERTY2
```
IMAGES :
`emotes/GUILD_NAME/EMOTE_NAME.FILE_EXTENSION`


## Credits

Original [leveldb-reader](https://github.com/harshvsingh8/leveldb-reader) I used to make my own.


## Copyright

[Discord Inc.](https://discord.com)

See the [license](/LICENSE).