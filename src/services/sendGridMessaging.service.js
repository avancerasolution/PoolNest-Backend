const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendSimpleMessage = async ({ subject, text, to, from }) => {
    const msg = {
        from,
        to,
        subject,
        text,
    }
    try {
        const result = await sgMail.send(msg)
        console.log(result, "<==== wow")

    } catch (e) {
        console.log(e)
    }
}



module.exports = { sendSimpleMessage }