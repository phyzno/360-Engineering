import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here you would normally save to a database (Prisma, Supabase, etc.)
    // and/or send an email using Resend.
    // For now, we will just log the data and return success.
    
    console.log("New Lead Received:", body);

    /* 
    Example of sending email using Resend (uncomment when API key is added):
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'your-email@example.com',
      subject: `New Lead from ${body.source}`,
      html: `
        <h2>New Lead Details</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <hr/>
        <h3>Estimate Requirements</h3>
        <p><strong>Property Type:</strong> ${body.propertyType}</p>
        <p><strong>Area Size:</strong> ${body.areaSize} Sq Ft</p>
        <p><strong>Finishing Type:</strong> ${body.finishingType}</p>
      `
    });
    */

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
