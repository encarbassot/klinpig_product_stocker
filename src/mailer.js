

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587, // 465 for SSL, 587 for TLS
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "example@gmail.com",
    pass: process.env.SMTP_PASS || "password",
  },
});

/**
 * Enviar un email con adjunto
 * @param {Object} options
 * @param {string} options.to - Email del destinatario
 * @param {string} options.subject - Asunto del correo
 * @param {string} options.text - Cuerpo en texto plano
 * @param {Array} options.attachments - Array de adjuntos [{ filename, path }]
 */
export const sendMail = async ({ to, subject, text, attachments = [] }) => {
  const mailOptions = {
    from: process.env.SMTP_USER || "example@gmail.com",
    to,
    subject,
    text,
    attachments,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Email enviado: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Error enviando email:", error.message);
    throw error;
  }
};