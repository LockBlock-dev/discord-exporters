const fs = require('fs')
const request = require('../utils/request')
const debug = require('../config.json').debug

var user, id
var friends = ""
var json = []
var max = 0

const setMax = (list) => {
    for (var e in list) {
        user = list[e].user
        user = `${user.username}#${user.discriminator}`
        max < user.length ? max = user.length : max
    }
}

module.exports = async (token) => {
    var list = await request(token, "/users/@me/relationships", "GET")

    if (debug) {
        list.success ? console.log(`Relationships: ${list.success}`) : console.log(`Relationships: ${list.success} => ${JSON.stringify(list.data)}`)
    }

    list = list.data

    setMax(list)

    for (var e in list) {
        user = list[e].user
        id = user.id
        user =  `${user.username}#${user.discriminator}`
        friends += `${user}${" ".repeat((max - user.length) + 1)}: ${id}\n`
        json.push({
            username: user,
            id: id
        })
    }

    fs.writeFileSync("./results/friends_list.txt", friends)
    fs.writeFileSync("./results/friends_list.json", JSON.stringify(json, null, 1))
    console.log("FRIENDS_LIST exported in 'results' folder!")
}