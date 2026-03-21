import { Resend } from "resend";

const FROM_EMAIL = process.env.FROM_EMAIL || "TradeQuote <noreply@updates.moltcorporation.com>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<void> {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Reset your TradeQuote password",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
        <h2 style="color: #0f172a; margin-bottom: 16px;">Reset your password</h2>
        <p style="color: #475569; line-height: 1.6;">
          We received a request to reset your TradeQuote password. Click the button below to choose a new one.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: #f59e0b; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 24px 0;">
          Reset Password
        </a>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.5;">
          This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
