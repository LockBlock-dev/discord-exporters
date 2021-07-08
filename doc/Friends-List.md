# Friends-List


## Description

| File | Ban risk level |
| --- | --- |
| [Friends-List](../modules/Friends-List.js) | ![Low](https://img.shields.io/badge/-Low-brightgreen) |

Exports your Discord friends list.


## How it works :

The script requests the Discord API to get your entire friends list and processes it. Then it saves the results in a text and a json file.


## Results :

JSON :
```json
[
    {
        "username": "username#$discriminator",
        "id": "user id"
    }
]
```
TEXT :
```css
USERNAME#DISCRIMINATOR : USER ID
```