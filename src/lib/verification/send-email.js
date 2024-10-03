import nodemailer from 'nodemailer'

const { EMAIL_USER, EMAIL_PASSWORD, NEXT_PUBLIC_APP_URL } = process.env

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  })

  const verificationUrl = `${NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent successfully')
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}
