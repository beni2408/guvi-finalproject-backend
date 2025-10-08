import sgMail from '@sendgrid/mail';

export default async function sendEmail({ to, subject, text, html }) {
  console.log("SENDGRID_API_KEY exists:", !!process.env.SENDGRID_API_KEY);
  
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid API key not configured");
    return;
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'jascarshw@gmail.com', // Must be verified in SendGrid
    subject,
    text,
    html,
    mail_settings: {
      sandbox_mode: {
        enable: false // Set to true for testing without sending real emails
      }
    }
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('SendGrid email error:', error.message);
  }
}
