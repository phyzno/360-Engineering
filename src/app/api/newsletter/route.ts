import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    // Save to Database (Supabase)
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: "Newsletter Subscriber",
          email: email,
          phone: "",
          message: "Subscribed to Newsletter",
          is_read: false
        }
      ]);

    if (dbError) {
      console.error("Supabase insert error (Newsletter):", dbError);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Saved to DB." });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
