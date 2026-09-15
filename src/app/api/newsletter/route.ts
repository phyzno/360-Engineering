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

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!resend || !process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured. Newsletter subscription for:", email);
      return NextResponse.json({ 
        success: true, 
        note: "Simulated success (Missing RESEND_API_KEY)" 
      });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_TO_EMAIL || 'admin@group360bd@gmail.com'; // Usually send to admin to notify of new sub

    const safeEmail = htmlEscape(String(email));

    const data = await resend.emails.send({
      from: `360 Engineering and Consultancy <${fromEmail}>`,
      to: [toEmail],
      subject: `New Newsletter Subscriber: ${safeEmail}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a2912;">
          <h2 style="color: #2d5016; border-bottom: 1px solid #c9a84c; padding-bottom: 10px;">New Newsletter Subscription</h2>
          <p>A new user has subscribed to the newsletter:</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
