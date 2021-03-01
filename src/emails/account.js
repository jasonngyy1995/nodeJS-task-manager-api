const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = ( email, name ) => {
    sgMail.send({
        to: email,
        from: 'a1798286@student.adelaide.edu.au',
        subject: 'Thanks for register',
        text: `Welcome to the app, ${name}` // template string ``
    })
}

const sendCancelEmail = ( email, name ) => {
    sgMail.send({
        to: email,
        from: 'a1798286@student.adelaide.edu.au',
        subject: 'Sad to see you leave us',
        text: `Is there anything we can do better ? ${name}`
    })
}

// sgMail.send({
//     to: 'a1798286@student.adelaide.edu.au',
//     from: 'a1798286@student.adelaide.edu.au',
//     subject: 'First email',
//     text: 'Hello World'
// })

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail 
}


