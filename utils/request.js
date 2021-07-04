module.exports = async (token, path, method, data) => {
    if (!token) {
        throw new Error("No token provided!")
    }

    var options = {
        method: method,
        url: `https://discord.com/api/v9${path}`,
        headers: {
            "authority": "discord.com",
            "accept": "*/*",
            "accept-language": "en-US",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9002 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",                  
            "content-type": "application/json",
            "authorization": `${token}`,
            "accept-encoding": "UTF8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-super-properties": Buffer.from(`{"os":"Windows","browser":"Discord Client","release_channel":"stable","client_version":"1.0.9002","os_version":"10.0","os_arch":"x64","system_locale":"en-US","client_build_number":88296,"client_event_source":null}`).toString("base64"),
            "cookie": "locale=en-US"
        },
        credentials: "include",
        referrer: "https://discord.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        data: data ? JSON.stringify(data) : null,
        mode: "cors"
    }

    return require('axios').default(options)
    .then(response => {
        if (response.data && typeof(response.data) == "object") {
            return { success: true, data: response.data }
        }
    })
    .catch(error => {
        var err = error.response
        var data = {}
        err.status ? data.status = err.status : data.status = null
        err.statusText ? data.statusText = err.statusText : data.statusText = null
        err.data.message ? data.message = err.data.message : data.message = "Invalid API response"
        return { success: false, data: data }
    })
}
