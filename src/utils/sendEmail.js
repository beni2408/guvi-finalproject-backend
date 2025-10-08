import nodemailer from 'nodemailer';

export default async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
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
