import sgMail from '@sendgrid/mail';

export default async function sendEmail({ to, subject, text, html }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: {
      email: process.env.EMAIL_USER,
      name: 'Jascar Health & Wellness'
    },
    subject,
    text,
    html
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
    console.log('SendGrid response:', response[0].statusCode);
  } catch (error) {
    console.error('SendGrid error:', error.message);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
  }
}
