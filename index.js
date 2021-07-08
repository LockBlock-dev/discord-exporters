const token = require('./config.json').token

const tokenRe  = /[A-Za-z\d]{24}\.[\w-]{6}\.[\w-]{27}/
const MFAtokenRe = /mfa\.[A-Za-z\d-_]{84}/

if (!tokenRe.test(token) && !MFAtokenRe.test(token)) {
    console.log("\nDiscord Exporters - INVALID TOKEN PROVIDED")
} else {
    const modules = require('./utils/loader')()

    console.log("\nDiscord Exporters - To begin, select a module")

    const i = require('readline-sync').keyInSelect(modules, "Available modules :")

    i > -1 ? require(`./modules/${modules[i]}`)(token) : null
}