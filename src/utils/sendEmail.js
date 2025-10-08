import nodemailer from "nodemailer";

export default function sendEmail({ to, subject, text, html }) {
  // Skip email in production if SMTP is blocked
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email service not configured, skipping email");
    return;
  }
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter
    .sendMail({
      from: `"Jascar's Health & Wellness" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text, // optional plain text fallback
      html, // HTML content for styled email
    })
    .then((info) => console.log("Email sent:", info.messageId))
    .catch((err) => {
      console.error("Email sending failed:", err.message);
      // Don't crash the app if email fails
    });
}
