async function sendOtp(email, otp) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "SuperShop Support",
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email: email,
        },
      ],

      subject: "Reset Your SuperShop Password",

      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px">

          <h2 style="color:#f97316;text-align:center;margin-bottom:10px;">
            SuperShop
          </h2>

          <h3 style="color:#111827;">
            Password Reset Request
          </h3>

          <p style="color:#374151;font-size:15px;">
            We received a request to reset the password for your SuperShop account.
          </p>

          <p style="color:#374151;font-size:15px;">
            Please use the following One-Time Password (OTP) to continue:
          </p>

          <div style="margin:30px 0;text-align:center;">
            <span style="
              display:inline-block;
              font-size:32px;
              letter-spacing:8px;
              font-weight:bold;
              color:#f97316;
              background:#fff7ed;
              padding:14px 28px;
              border-radius:8px;
              border:1px dashed #f97316;
            ">
              ${otp}
            </span>
          </div>

          <p style="color:#374151;font-size:15px;">
            This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <p style="color:#dc2626;font-size:14px;">
            If you did not request a password reset, you can safely ignore this email.
            Never share your OTP with anyone.
          </p>

          <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;">

          <p style="font-size:12px;color:#6b7280;text-align:center;">
            © ${new Date().getFullYear()} SuperShop. All rights reserved.
          </p>

        </div>
      `,
    }),
  });

  const data = await response.json();

  console.log("Brevo response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP email");
  }

  return data;
}

module.exports = sendOtp;