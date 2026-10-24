import type { OtpPurpose } from "./admin.schema";

const copy: Record<OtpPurpose, { subject: string; intro: string }> = {
  setup: {
    subject: "Confirm your Brescia Lions admin account",
    intro: "Use this code to confirm your email and finish creating the admin account.",
  },
  reset: {
    subject: "Reset your Brescia Lions admin password",
    intro: "Use this code to reset your admin password.",
  },
};

export function otpEmail(otp: string, purpose: OtpPurpose) {
  const { subject, intro } = copy[purpose];

  const text = `${intro}

Your code: ${otp}

It expires in 10 minutes. If you did not ask for this, you can ignore this email.

Brescia Lions`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#062a17;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr><td align="center">
        <table role="presentation" width="480" cellspacing="0" cellpadding="0" style="max-width:480px;background:#0b3d22;border:1px solid #d4a73a;border-radius:12px;">
          <tr><td style="padding:28px 28px 8px;text-align:center;">
            <div style="font-family:Georgia,serif;font-size:22px;font-weight:bold;letter-spacing:2px;color:#f3d27a;">BRESCIA LIONS</div>
          </td></tr>
          <tr><td style="padding:8px 28px;color:#f7f1e1;font-size:15px;line-height:1.6;text-align:center;">${intro}</td></tr>
          <tr><td align="center" style="padding:16px 28px;">
            <div style="display:inline-block;padding:14px 28px;background:#062a17;border:1px solid #d4a73a;border-radius:8px;font-size:34px;letter-spacing:10px;font-weight:bold;color:#f3d27a;">${otp}</div>
          </td></tr>
          <tr><td style="padding:8px 28px 28px;color:#f7f1e1;opacity:.7;font-size:13px;line-height:1.6;text-align:center;">
            This code expires in 10 minutes. If you did not ask for it, you can ignore this email.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
