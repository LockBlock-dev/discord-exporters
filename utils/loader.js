module.exports = () => {
    const modules = []
    const files = require('fs').readdirSync("./modules/").filter(f => f.endsWith(".js"))

    for (var f of files) {
        modules.push(f.split('.')[0])
    }

    return modules
}