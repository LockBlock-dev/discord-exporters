# Guilds


## Description

| File | Ban risk level |
| --- | --- |
| [Token](../modules/Token.js) | ![None](https://img.shields.io/badge/-None-inactive) |

Gets your Discord token for you.

**Never share your token with someone else!**


## How it works :

The old method for automatically obtaining a Discord token was to access the localstorage of the Discord (since Discord is made on Electron and so Chromium). The problem is that Discord now deletes the localStorage to prevent any script from accessing it.

My new method is as follows, Chrome (then Chromium too) saves the localStorage in some files on your computer in a folder called "leveldb". My script uses a parser that saves the results in a file, then it checks the presence of your token inside this file. Finally, if your token is found, the script gives it.

The good part is this method cannot be patched by Discord (since it's a Chromium feature) unless Discord saves the token somewhere else than the localStorage.

The "bad" news is that you need to close Discord before reading the leveldb.


## Results :

The token is logged in the console and cleared after 10 seconds for security reasons.