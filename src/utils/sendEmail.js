import nodemailer from 'nodemailer';

export default async function sendEmail({ to, subject, text, html }) {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: `"Jascar Health & Wellness" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Email error:', error.message);
  }
}
