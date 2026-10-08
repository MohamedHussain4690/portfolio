# Portfolio Contact Form Setup Guide

## Changes Made

### 1. Updated Philosophy Section
- Changed main quote from "I DON'T JUST CODE. I SHIP SYSTEMS THAT THINK." to **"CODE IS CRAFT. PRODUCTS ARE ART."**
- Updated three principle cards:
  - **ATTENTION TO DETAIL** — Every pixel, every interaction, every error message matters. Craft is in the details.
  - **USER EMPATHY** — Technology serves humans. Build for delight, accessibility, and intuitive experiences.
  - **CONTINUOUS REFINEMENT** — Great products are never finished. Always iterating, always improving, always learning.

### 2. Backend Email Integration
- Created API route: `src/app/api/contact/route.ts`
- Updated Contact component to send real emails instead of simulated submissions
- Added `nodemailer` package for email handling
- Created `.env.local` file for credentials (already gitignored)

## Setup Instructions

### Step 1: Install Dependencies
```bash
cd portfolio
npm install
```

### Step 2: Get Gmail App Password
Since you're using Gmail (`mhhussain4690@gmail.com`), follow these steps:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** if not already enabled
4. Scroll down and find **App passwords**
5. Select **Mail** and **Windows Computer** (or your device)
6. Google will generate a 16-character password
7. Copy this password

### Step 3: Configure Environment Variables
Update `.env.local` in the portfolio directory:

```env
EMAIL_USER=mhhussain4690@gmail.com
EMAIL_PASSWORD=paste-your-16-char-app-password-here
```

**Important:** Never commit `.env.local` to git — it's already in `.gitignore`

### Step 4: Test Locally
```bash
npm run dev
```

Then:
1. Open `http://localhost:3000`
2. Scroll to the Contact section
3. Fill in the contact form and submit
4. You should receive an email at `mhhussain4690@gmail.com` with:
   - Sender's name
   - Sender's email (they can reply directly)
   - Their message
5. The sender also receives a confirmation email

## How It Works

**Form Submission Flow:**
- User fills out contact form
- Form sends POST request to `/api/contact`
- API validates the data (name, email, message required)
- Sends two emails:
  1. **To you** — Full submission details with reply-to set to sender's email
  2. **To sender** — Confirmation that you received their message
- User sees success message

## Email Features

- ✅ HTML-formatted emails with your brand colors (lime green #D9FF00)
- ✅ Reply-to field set to sender's email for easy responses
- ✅ Confirmation email sent to the sender
- ✅ Input validation and error handling
- ✅ HTML escaping to prevent injection attacks

## Alternative Email Providers

If you want to use a different email service instead of Gmail:

**SendGrid:**
```env
SENDGRID_API_KEY=your-api-key
```

**Resend (recommended for Next.js):**
```env
RESEND_API_KEY=your-api-key
```

Let me know if you want to switch providers!

## Troubleshooting

**"Failed to send email" error?**
- Check your Gmail App Password is correct (16 characters)
- Make sure 2-Step Verification is enabled
- Verify `EMAIL_USER` matches your Gmail address

**No email received?**
- Check spam/junk folder
- Verify environment variables are set in `.env.local`
- Check server logs in terminal for error messages

---

Everything is ready to go! Just add your Gmail credentials to `.env.local` and test it out. 🚀
