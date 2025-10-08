import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, text, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Jascar Health <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return;
    }

    console.log('Email sent successfully to:', to);
    console.log('Email ID:', data.id);
  } catch (error) {
    console.error('Email error:', error.message);
  }
}
