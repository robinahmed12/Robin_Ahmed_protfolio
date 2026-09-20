import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/data/db.json";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP credentials are not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function readField(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = readField(form, "name");
  const email = readField(form, "email");
  const subject = readField(form, "subject");
  const message = readField(form, "message");

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (subject.length < 2) {
    return NextResponse.json({ error: "Please enter a subject." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  try {
    const transport = getTransport();
    await transport.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: db.profile.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3 style="margin: 0 0 8px;">New message from your portfolio</h3>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 4px 12px 4px 0;"><strong>Subject:</strong></td><td>${subject}</td></tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap; margin: 0;">${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    const message =
      error instanceof Error && error.message.includes("not configured")
        ? "The contact form is not configured yet. Configure SMTP credentials in .env.local."
        : "Could not send your message right now. Please try again later or email directly.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}