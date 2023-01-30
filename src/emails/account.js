const mailGun = require("mailgun-js");

const mg = mailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN});

const sendWelcomeEmail =  (email, name) => {
    mg.messages().send({
        from: 'nkhatri@ramapo.edu',
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }, (error, body) => {
        console.log(body)
    })
}

const sendCancellationEmail = (email, name) => {
    mg.messages().send({
        from: 'nkhatri@ramapo.edu',
        to: email,
        subject: 'Sorry to see you go.',
        text: `We are sorry to see you leave, ${name}. Please let us know if there is anything we can do to help you stay with us longer.`
    }, (error, body) => {
        console.log(body)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}