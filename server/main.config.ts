// Salt used for generate captcha and a lot of thing later.
// Change value before launch for prod
export const Server = {
    salt : 'gijagoijaognrni'
}

// Admin setting
// classic username, password, email
// Change value before launch for prod
// TODO search solution for encrypt password here...
function Ninja() {
    this.username = "myroot",
    this.password = "afroninja",
    this.email = "myroot@ki.ki"
}

export const ninja = new Ninja()

// IMGUR setting, (service is free for non-commercial use, look on their site else)
// For it work, you need register account here https://api.imgur.com/oauth2/addclient
// you will receive your ID.
export const Imgur = {
    username : 's',
    clientId : '6',
    secretId : 'd'
}
