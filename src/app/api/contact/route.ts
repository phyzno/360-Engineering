import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Escape user-supplied strings before inserting into HTML to prevent XSS
function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize Resend — will be undefined if env var is missing; checked before use below
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, budget, message } = body;

    // Validate required fields
    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured. Email would have been:", body);
      // If missing the key, simulate success to allow UI testing
      return NextResponse.json({ 
        success: true, 
        note: "Simulated success (Missing RESEND_API_KEY)" 
      });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_TO_EMAIL || email;

    // Sanitize all user-supplied values before injecting into HTML
    const safeName = htmlEscape(String(name));
    const safeEmail = htmlEscape(String(email));
    const safePhone = phone ? htmlEscape(String(phone)) : 'Not provided';
    const safeInterest = htmlEscape(String(interest));
    const safeBudget = budget ? htmlEscape(String(budget)) : 'Not specified';
    const safeMessage = htmlEscape(String(message)).replace(/\n/g, '<br/>');

    const data = await resend.emails.send({
      from: `360 Engineering and Consultancy <${fromEmail}>`,
      to: [toEmail],
      subject: `New Inquiry: ${safeInterest} - from ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a2912;">
          <h2 style="color: #2d5016; border-bottom: 1px solid #c9a84c; padding-bottom: 10px;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;">${safeName}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;">${safeEmail}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;">${safePhone}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;"><strong>Interest:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;">${safeInterest}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;"><strong>Budget:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #edf6ee;">${safeBudget}</td></tr>
          </table>
          <h3 style="margin-top: 30px; color: #4a7c59;">Message Details:</h3>
          <p style="background: #f5f0e8; padding: 15px; border-radius: 4px; line-height: 1.6;">${safeMessage}</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
