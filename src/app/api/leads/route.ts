import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    
    // Construct a nice message combining the inputs
    const estimateMessage = `
--- New Lead from Cost Estimator ---
Property Type: ${body.propertyType}
Total Area: ${body.areaSize} Sq Ft
Finishing Preference: ${body.finishingType}
------------------------------------
    `.trim();

    // Insert into Supabase leads table
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: estimateMessage,
          is_read: false
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
