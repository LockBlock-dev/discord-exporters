const token = require('./config').token

const modules = require('./utils/loader')()

console.log("\nDiscord Exporters - To begin, select a module")

const i = require('readline-sync').keyInSelect(modules, "Available modules :")

i > -1 ? require(`./modules/${modules[i]}`)(token) : null