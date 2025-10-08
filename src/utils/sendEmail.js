import sgMail from "@sendgrid/mail";

export default async function sendEmail({ to, subject, text, html }) {
  console.log("SENDGRID_API_KEY exists:", !!process.env.SENDGRID_API_KEY);

  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid API key not configured");
    return;
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: {
      email: process.env.EMAIL_USER,
      name: "Jascar Health & Wellness",
    },
    subject,
    text,
    html,
    headers: {
      "X-Priority": "3",
      "X-MSMail-Priority": "Normal",
    },
    reply_to: {
      email: process.env.EMAIL_USER,
      name: "Jascar Health & Wellness",
    },
    tracking_settings: {
      click_tracking: { enable: false },
      open_tracking: { enable: false },
    },
    mail_settings: {
      sandbox_mode: { enable: false },
    },
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent successfully to:", to);
    console.log("SendGrid response:", response[0].statusCode);
  } catch (error) {
    console.error("SendGrid email error:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
  }
}
