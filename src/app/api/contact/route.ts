import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    // Save lead to Supabase database
    const supabase = await createClient();
    const dbMessage = `
--- New Lead from Contact Form ---
Interest: ${interest}
Budget: ${budget || 'Not specified'}
------------------------------------
${message}
    `.trim();

    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: name,
          email: email,
          phone: phone || '',
          message: dbMessage,
          is_read: false
        }
      ]);

    if (dbError) {
      console.error("Supabase insert error in contact form:", dbError);
      return NextResponse.json(
        { error: 'Failed to save contact information.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Lead saved successfully." });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
