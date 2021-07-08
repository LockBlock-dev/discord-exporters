const fs = require('fs')
const request = require('../utils/request')
const debug = require('../config').debug
const constants = require('../utils/constants')

var name, id, channels, invite
var guilds = ""
var json = []
var max = 0

const setMax = (list) => {
    for (var e in list) {
        name = list[e].name
        max < name.length ? max = name.length : max
    }
}

module.exports = async (token) => {
    if (!constants.tokenRe.test(token) && !constants.MFAtokenRe.test(token)) {
        console.log("\nDiscord Exporters - INVALID TOKEN PROVIDED")
    } else {
        const addInvites = require('readline-sync').keyInYNStrict("Getting invites is a very long process. Do you want to try to get an invite for each guild ?")

        var list = await request(token, "/users/@me/guilds", "GET")
    
        if (debug) {
            list.success ? console.log(`Guilds: ${list.success}`) : console.log(`Guilds: ${list.success} => ${JSON.stringify(list.data)}`)
        }
    
        list = list.data
    
        setMax(list)
    
        for (var e in list) {
            name = list[e].name
            id = list[e].id
            found = false
    
            if (addInvites) {
                channels = await request(token, `/guilds/${id}/channels`, "GET")
    
                if (debug) {
                    channels.success ? console.log(`Channels: ${channels.success}`) : console.log(`Channels: ${channels.success} => ${JSON.stringify(channels.data)}`)
                }
    
                channels = channels.data
    
                for (var c in channels) {
                    if (!found) {
                        var body = {
                            "validate": null,
                            "max_age": 0,
                            "max_uses": 0,
                            "target_type": null,
                            "temporary": false
                        }
                        invite = await request(token, `/channels/${channels[c].id}/invites`, "POST", body)
    
                        if (debug) {
                            invite.success ? console.log(`Invite: ${invite.success}`) : console.log(`Invite: ${invite.success} => ${JSON.stringify(invite.data)}`)
                        }
    
                        invite = invite.data
    
                        invite.code ? found = true : found = false
    
                        await require('../utils/sleep')(3000)
                    }
                }
    
                invite.code ? invite = `discord.gg/${invite.code}` : invite = "NO_INVITE"
    
                guilds += `${name}${" ".repeat((max - name.length) + 1)}: ${id} : ${invite}\n`
                json.push({
                    name: name,
                    id: id,
                    invite: invite
                })
            } else {
                guilds += `${name}${" ".repeat((max - name.length) + 1)}: ${id}\n`
                json.push({
                    name: name,
                    id: id
                })
            }
        }
    
        fs.writeFileSync("./results/guilds.txt", guilds)
        fs.writeFileSync("./results/guilds.json", JSON.stringify(json, null, 1))
        console.log("GUILDS exported in 'results' folder!")
    }
}