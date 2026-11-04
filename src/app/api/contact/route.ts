import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-Memory Rate Limiter (sliding bucket per IP)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per 15 minutes per IP
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Periodically cleanup expired entries
  if (ipRateLimitMap.size > 500) {
    ipRateLimitMap.forEach((value, key) => {
      if (now > value.resetTime) {
        ipRateLimitMap.delete(key);
      }
    });
  }

  const record = ipRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Module-level Singleton Transporter
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not configured');
  }
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  return cachedTransporter;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown-client';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, _gotcha } = body;

    // 2. Honeypot check: If the hidden honeypot field has any value, silently pretend success
    if (_gotcha && typeof _gotcha === 'string' && _gotcha.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // 3. Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input too long' },
        { status: 400 }
      );
    }

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 5. Header injection defense: sanitize newlines/control characters from name
    const sanitizedName = name.replace(/[\r\n\t]/g, ' ').trim().slice(0, 100);

    // 6. Email to portfolio owner (both plain-text and escaped HTML)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: `New Portfolio Message\n\nFrom: ${sanitizedName}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nTransmitted from portfolio contact portal.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #9C502F;">New Message from Your Portfolio</h2>
          <hr style="border: none; border-top: 1px solid #9C502F;">

          <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>

          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #9C502F; margin: 20px 0;">
            <strong>Message:</strong>
            <p style="margin-top: 10px; white-space: pre-wrap; word-wrap: break-word;">
              ${escapeHtml(message)}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 11px;">
            Transmitted from portfolio contact portal. Client IP: ${escapeHtml(clientIp)}
          </p>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);

    // 7. Confirmation email to the visitor
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message received — Mohamed Hussain N',
      text: `Hello ${sanitizedName},\n\nThank you for reaching out! I've received your transmission and will review it and get back to you shortly.\n\nBest regards,\nMohamed Hussain N\nAI + Full Stack Developer\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #9C502F;">Thank You, ${escapeHtml(sanitizedName)}!</h2>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p>Looking forward to connecting!</p>
          <br>
          <p>Best regards,<br><strong>Mohamed Hussain N</strong><br>AI + Full Stack Developer</p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email sending error:', errorMsg);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML metacharacters safely
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#96;',
    '=': '&#61;',
  };
  return text.replace(/[&<>"'`=]/g, (m) => map[m]);
}
