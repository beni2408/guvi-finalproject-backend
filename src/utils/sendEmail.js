import nodemailer from "nodemailer";

export default function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password for Gmail
    },
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
    .catch((err) => console.error("Email sending failed:", err.message));
}
