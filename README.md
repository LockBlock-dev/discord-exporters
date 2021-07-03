# Discord Exporter

Powerful NodeJS scripts to easily export your Discord data.

Made with [![axios](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/discord-friends-list-exporter/axios)](https://www.npmjs.com/package/axios)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/discord-friends-list-exporter.svg)](https://github.com/LockBlock-dev/discord-friends-list-exporter/stargazers)

This tool can be use alongside with [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter).


## Disclaimer

• This repository is an unofficial use of the [Discord's API](https://discord.com/developers/docs/intro). Bugs can occur.

• You must also use your token in the process, something [prohibited by Discord](https://discord.com/developers/docs/topics/oauth2#bot-vs-user-accounts) : `"Automating normal user accounts [...] can result in an account termination"`. I can not be held responsible for the use of this script, nor any ban of your account.


## Modules

| Name | Description | Text | JSON  | Ban risk level |  Reason |
| --- | --- | --- | --- | --- | --- |
| [Friends-List](./modules/Friends-List.js) | Export your friends | <code>username#discriminator : ID<code> | <code>{ username#discriminator, id }<code> | <span style="color:green">Low</span> | Only 1 request is made
| [Guilds](./modules/Guilds.js) | Export your friends | <code>name : ID<code> | <code>{ name, id, invite }<code> | <span style="color:orange">Medium</span> | A lot of requests are made


## How to use

• Download [NodeJS](https://nodejs.org) and [NPM](https://www.npmjs.com/get-npm)

• Download the project or clone it

• Go to the Discord-Exporters exporter folder and do `npm install`

• Edit the [config](./config.json) :
```js
token: "",
//your Discord token
debug: false,
//debug logs
```

• Run it : with the [starter](./start.bat) / by doing `node login.js` / by doing `npm start`

• Find the results in the [results](./results) folder

• These are in 2 formats :

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


## Copyright

[Discord Inc.](https://discord.com)

See the [license](/LICENSE).