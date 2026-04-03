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
    const message = String(body?.message || "").trim()

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
    const subject = "New portfolio contact message"
    const sentAt = new Date().toISOString()

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject,
      text: `New message from portfolio contact form\n\nSent at: ${sentAt}\n\nMessage:\n${message}`,
      html: `<p><strong>New message from portfolio contact form</strong></p><p><strong>Sent at:</strong> ${sentAt}</p><p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${message}</pre>`,
    })

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json(
      { error: error?.message || "Failed to send message." },
      { status: 500 }
    )
  }
}
