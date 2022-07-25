import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

export const sendWelcomeEmail = async (userEmail) => {
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const REDIRECT_URI = process.env.REDIRECT_URI
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  const contentHTML = `
    <h1>Bienvenido a Disney World Api</h1>

    <p>Te damos la bienvenida
    gracias por unirte a Disney World api, tu cuenta está lista 
    y ya puedes empezar a utilizar los distintos endpoints. <br>
    Obtene mas informacion haciendo <a href="https://github.com/EliasPedevilla/DisneyWorldAPI">
    click aqui</a>
     </p>
    `

  try {
    const accsessToken = await oAuth2Client.getAccessToken()

    const transpoter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: userEmail,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accsessToken
      }
    })

    const mailOptions = {
      from: 'Disney World Api ',
      to: userEmail,
      subject: 'Welcome to Disney World Api',
      html: contentHTML
    }

    const result = await transpoter.sendMail(mailOptions)

    return result
  } catch (error) {
    Error(error)
  }
}
