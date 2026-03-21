import { buildCheckoutUrl } from "@/lib/plans";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://trades-quoting-tool-moltcorporation.vercel.app";

interface DripEmail {
  subject: string;
  html: (params: { name: string; email: string; userId: string }) => string;
}

function layout(title: string, body: string, userId: string): string {
  const unsubUrl = `${BASE_URL}/api/drip/unsubscribe?uid=${encodeURIComponent(userId)}`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #e4e4e7">
    <div style="margin-bottom:24px">
      <span style="font-size:20px;font-weight:700;color:#18181b">TradeQuote</span>
    </div>
    <h1 style="font-size:18px;color:#18181b;margin:0 0 16px">${title}</h1>
    ${body}
  </div>
  <div style="text-align:center;padding:16px;font-size:12px;color:#71717a">
    <p>TradeQuote — Professional quoting for tradespeople</p>
    <p><a href="${BASE_URL}/contact" style="color:#71717a;text-decoration:underline">Contact support</a></p>
    <p><a href="${unsubUrl}" style="color:#71717a;text-decoration:underline">Unsubscribe from these emails</a></p>
  </div>
</div>
</body>
</html>`;
}

function cta(text: string, href: string): string {
  return `<div style="margin:24px 0;text-align:center">
  <a href="${href}" style="display:inline-block;background:#f59e0b;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">${text}</a>
</div>`;
}

export const DRIP_EMAILS: DripEmail[] = [
  // Step 0 — Day 0: Welcome + send first quote
  {
    subject: "Welcome to TradeQuote — send your first quote",
    html: ({ name, userId }) =>
      layout(
        `Welcome${name ? `, ${name}` : ""}!`,
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          You just joined TradeQuote — the fastest way for tradespeople to send professional quotes and get paid.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          No more texting estimates from your truck or scribbling numbers on the back of a card.
          With TradeQuote, you can create a branded quote, send it to your customer, and get approval — all in under 2 minutes.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          <strong>Your first step:</strong> Create a quote for your next job. Add line items, set your price, and send it.
        </p>
        ${cta("Send Your First Quote", `${BASE_URL}/dashboard`)}
        <p style="color:#71717a;font-size:13px;margin:16px 0 0">
          Over the next few days, we'll show you how TradeQuote helps you look professional and get paid faster.
        </p>`,
        userId,
      ),
  },

  // Step 1 — Day 2: Professional quotes = faster approvals
  {
    subject: "Professional quotes = faster approvals",
    html: ({ userId }) =>
      layout(
        "Look professional, win more jobs",
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Here's what your customers see when you send a TradeQuote:
        </p>
        <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
          <li>A clean, branded PDF with your business name</li>
          <li>Itemized line items with clear pricing</li>
          <li>A one-tap <strong>"Approve"</strong> button — no printing, no scanning</li>
        </ul>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Compare that to a text message with a number scribbled out. Which one gets approved faster?
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Tradespeople who send professional quotes close jobs <strong>faster</strong> and get fewer "let me think about it" responses.
        </p>
        ${cta("Create a Quote", `${BASE_URL}/dashboard`)}`,
        userId,
      ),
  },

  // Step 2 — Day 5: Get paid faster with Pro
  {
    subject: "Get paid faster — add payments to your quotes",
    html: ({ email, userId }) =>
      layout(
        "Stop chasing payments",
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          The hardest part of running a trade business isn't the work — it's getting paid for it.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          With <strong>TradeQuote Pro</strong>, your customers can pay right from the quote link. No invoicing, no "check's in the mail," no chasing.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          <strong>What Pro gets you:</strong>
        </p>
        <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
          <li><strong>Unlimited quotes</strong> — free plan caps at 3 active</li>
          <li><strong>Stripe payments</strong> — customers pay from the quote link</li>
          <li><strong>Job tracking</strong> — see status from quote to payment</li>
        </ul>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          At <strong>$19/mo</strong>, one faster payment covers your subscription. Competitors charge $79–$300/mo for less.
        </p>
        ${cta("Upgrade to Pro — $19/mo", buildCheckoutUrl("pro_monthly", email))}
        <p style="color:#71717a;font-size:13px;margin:16px 0 0">
          No contract. Cancel anytime. 7-day money-back guarantee.
        </p>`,
        userId,
      ),
  },
];
