import nodemailer from "nodemailer"

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
]

const isConfigured = () => requiredEnv.every((key) => Boolean(process.env[key]))

export async function POST(request) {
  try {
    if (!isConfigured()) {
      return Response.json(
        { error: "Email server is not configured yet." },
        { status: 500 }
      )
    }

    const body = await request.json()
    const name = String(body?.name || "").trim()
    const email = String(body?.email || "").trim()
    const message = String(body?.message || "").trim()

    // Validate required fields
    if (!name) {
      return Response.json({ error: "Name is required." }, { status: 400 })
    }

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    if (!message) {
      return Response.json({ error: "Message is required." }, { status: 400 })
    }

    if (message.length > 3000) {
      return Response.json(
        { error: "Message is too long (max 3000 chars)." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER
    const toAddress = process.env.CONTACT_TO_EMAIL
    const subject = `[Portfolio] New message from ${name}`
    const sentAt = new Date().toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })

    const textBody = [
      "New message from your portfolio contact form",
      "─".repeat(48),
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Sent at: ${sentAt} (ICT)`,
      "─".repeat(48),
      message,
    ].join("\n")

    const htmlBody = `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:28px 32px;border-radius:12px 12px 0 0">
          <h2 style="margin:0;color:#f8fafc;font-size:18px;font-weight:700;letter-spacing:-0.3px">
            📬 New Portfolio Message
          </h2>
        </div>
        <div style="background:#f8fafc;padding:28px 32px;border:1px solid #e2e8f0;border-top:none">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr>
              <td style="padding:8px 12px 8px 0;width:80px;color:#64748b;font-size:13px;font-weight:600;vertical-align:top">Name</td>
              <td style="padding:8px 0;font-size:14px;font-weight:600;color:#0f172a">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px 8px 0;color:#64748b;font-size:13px;font-weight:600;vertical-align:top">Email</td>
              <td style="padding:8px 0;font-size:14px">
                <a href="mailto:${email}" style="color:#0ea5e9;text-decoration:none">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 12px 8px 0;color:#64748b;font-size:13px;font-weight:600;vertical-align:top">Sent</td>
              <td style="padding:8px 0;font-size:14px;color:#475569">${sentAt} (ICT)</td>
            </tr>
          </table>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8">Message</p>
            <pre style="margin:0;white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.7;color:#1e293b">${message}</pre>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:14px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;text-align:center">
          <p style="margin:0;font-size:12px;color:#94a3b8">Sent from your portfolio contact form · Reply directly to respond to ${name}</p>
        </div>
      </div>`

    await transporter.sendMail({
      from: `"Portfolio Contact" <${fromAddress}>`,
      to: toAddress,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: textBody,
      html: htmlBody,
    })

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json(
      { error: error?.message || "Failed to send message." },
      { status: 500 }
    )
  }
}
