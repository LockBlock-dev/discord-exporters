const fs = require('fs')
const request = require('../utils/request')
const axios = require('axios').default
const debug = require('../config.json').debug

module.exports = async (token) => {
    var list = await request(token, "/users/@me/guilds", "GET")

    if (debug) {
        list.success ? console.log(`Guilds: ${list.success}`) : console.log(`Guilds: ${list.success} => ${JSON.stringify(list.data)}`)
    }

    list = list.data

    for (var g in list) {
        var emotes = await request(token, `/guilds/${list[g].id}/emojis`, "GET")

        if (debug) {
            emotes.success ? console.log(`Emojis: ${emotes.success}`) : console.log(`Emojis: ${emotes.success} => ${JSON.stringify(emotes.data)}`)
        }

        emotes = emotes.data

        var ext = ""

        for (var e in emotes) {
            emotes[e].animated ? ext = ".gif" : ext = ".png"

            fs.mkdirSync(`results/emotes/${list[g].name}`, { recursive: true })

            const writer = fs.createWriteStream(`results/emotes/${list[g].name}/${emotes[e].name}${ext}`)

            try {

                const response = await axios({
                    url: `https://cdn.discordapp.com/emojis/${emotes[e].id}${ext}`,
                    method: "GET",
                    headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9002 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36" },
                    responseType: "stream"
                })

                const w = response.data.pipe(writer)

                w.on('finish', () => {
                    if (debug) {
                        console.log(`Downloaded: ${emotes[e].name}${ext}`)
                    }
                })

                w.on('error', (err) => {
                    console.error(err)
                })

            } catch (err) {
                err.response ? console.log(`${err.response.status} ${err.response.statusText}`) : console.log(err)
            }

            await require('../utils/sleep')(100)
        }

        await require('../utils/sleep')(1000)
        
    }

    console.log("EMOTES exported in 'results/emotes' folder!")
}