import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const {name, email, token} = datos
    const url_Wiht_Token = process.env.BACKEND_URL + ":" + process.env.PORT + "/auth/confirm/" + token

    // Enviar el email
    // sendMail with npm nodemailer
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirm your account in Real Estate',
        text: 'Confirm your account in Real Estate',
        html:`
        <p>Hi ${name}, confirm your account at ${process.env.BACKEND_URL.substring(6)}</p>

        <p>Your account is ready to be use, you just need to confirm in the next link:
        <a href"${url_Wiht_Token}">Confirm account</a> </p>

        <p>If you didn't create this account, you can ignore this message.</p>`
    })
}

const emailOlvidePassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const {name, email, token} = datos
    const url_Wiht_Token = process.env.BACKEND_URL + ":" + process.env.PORT + "/auth/forgot-password/" + token

    // Enviar el email
    // sendMail with npm nodemailer
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Reset your password at Real Estate ',
        text: 'Reset your password at Real Estate ',
        html:`
        <p>Hi ${name}, you have requested to reset your password at ${process.env.BACKEND_URL.substring(6)}</p>

        <p>Press the link to set your new password:
        <a href"${url_Wiht_Token}">Reset Password</a> </p>

        <p>If you didn't asked for this change, you can ignore this message.</p>`
    })
}

export {
    emailRegistro,
    emailOlvidePassword
} 
    