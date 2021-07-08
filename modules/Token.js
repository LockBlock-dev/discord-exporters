const { spawn } = require('child_process')
const fs = require('fs')
const path = require('../config').pathToDiscord
const debug = require('../config').debug
var errored = false

module.exports = async () => {
 
    const list = await require('find-process')("name", "Discord", true)

    if (list.length > 0) {
        console.log("\nDiscord Exporters - YOU MUST CLOSE DISCORD BEFORE USING THIS SCRIPT")
        process.exit(1)
    }

    try {
        fs.unlinkSync("./leveldb.dat")
    } catch (e) {
        if (debug) {
            console.log(`Could not delete leveldb: ${e}`)
        }
    }
    
    if (process.platform == "darwin" || process.platform == "linux") {
        try {
            //path ? spawn(`${process.cwd()}/utils/leveldb_reader`, [path]) : spawn("", [""])
            errored = true
            console.log("Linux is not yet supported (and may never be)")
        } catch (e) {
            errored = true
            console.log("Could not find your discord leveldb path automatically, please write it in config.js!")
        }
    } else if (process.platform == "win32") {
        try {
            path ? spawn(`${process.cwd()}/utils/leveldb_reader.exe`, [path]) : spawn(`${process.cwd()}/utils/leveldb_reader.exe`, [`C:/Users/${require('os').userInfo().username}/AppData/Roaming/discord/Local Storage/leveldb`])
        } catch (e) {
            errored = true
            console.log("Could not find your discord leveldb path automatically, please write it in config.js!")
        }
    }
    
    if (!errored) {
        const reMatch = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}( )*"_https:\/\/discord\.com(.)*token":(.){0,2}"([A-Za-z\d]{24}\.[\w-]{6}\.[\w-]{27})?(mfa\.[A-Za-z\d-_]{84})?"/
        const reReplace = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}( )*"_https:\/\/discord\.com(.)*token":(.){0,2}"/
        var found = false

        await require('../utils/sleep')(1000)
    
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream(require('path').join(__dirname, "../leveldb.dat"))
        })
    
        lineReader.on("error", (err) => console.log(err))
        
        lineReader.on("line", (line) => {
            const end = reMatch.exec(line)
            if (end && !found) {
                found = true
                line = line.replace(reReplace, "").replace("\"", "")
                const token = line
                console.log(`TOKEN found: ${token}\nWrite it in the config.js!\nThis message will be cleared in 10 seconds..`)
                setTimeout(() => {
                    console.clear()

                    try {
                        fs.unlinkSync("./leveldb.dat")
                    } catch (e) {
                        if (debug) {
                            console.log(`Could not delete leveldb: ${e}`)
                        }
                    }
                }, 10000)
            }
        })
    } else {
        await require('../utils/sleep')(1000)

        try {
            fs.unlinkSync("./leveldb.dat")
        } catch (e) {
            if (debug) {
                console.log(`Could not delete leveldb: ${e}`)
            }
        }
    }
}
