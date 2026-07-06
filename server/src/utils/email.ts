// Email utility for sending transactional emails (password reset, etc.)
import nodemailer from 'nodemailer';
import { env as ENV } from '../config/env';
import { logger } from './logger';

// Create reusable transporter using SMTP config from env
const transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: false, // true for 465, false for 587 (STARTTLS)
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
});

// Sends a password reset email containing a reset link with the token
export const sendResetPasswordEmail = async (to: string, resetToken: string): Promise<void> => {
  const resetUrl = `${ENV.CLIENT_URL}/influencer/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"Influnite" <${ENV.SMTP_FROM}>`,
    to,
    subject: 'Reset Your Password — Influnite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your Influnite account.</p>
        <p>Click the button below to reset your password. This link expires in <strong>15 minutes</strong>.</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #888; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #aaa; font-size: 12px;">© Influnite</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info({ to }, 'Password reset email sent');
  } catch (error) {
    logger.error({ error, to }, 'Failed to send password reset email');
    throw error;
  }
};
