# Guilds


## Description

| File | Ban risk level |
| --- | --- |
| [Guilds](../modules/Guilds.js) | ![Medium](https://img.shields.io/badge/-Medium-orange) |

Exports your Discord guilds list.


## How it works :

- If you asked for the invites :
First note that this takes a lot of time because the script needs to avoid begin rate limited by Discord. It requests the Discord API to get your entire list of guilds and processes it. Then it saves the results in a text and a json file.
- If you did not ask :
The script requests the Discord API to get your full list of guilds and processes it. Then it requests in each guild, each channel until it can creates an invite (if no invite is found, an error code is saved). Finally, it saves the results in a text file and a json file.


## Results :

JSON :
```json
[
    {
        "username": "guild name",
        "id": "guild id",
        "invite": "guild invite"
    }
]
```
TEXT :
```css
GUILD NAME : GUILD ID : GUILD INVITE
```