import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('estimator_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      // Fallback defaults if table doesn't exist or is empty
      return NextResponse.json({
        property_apartment_base: 1500,
        property_duplex_base: 2500,
        property_office_base: 2000,
        finishing_standard_mult: 1.0,
        finishing_premium_mult: 1.5,
        finishing_ultra_mult: 2.5,
        custom_formula: 'Area * BasePrice * Multiplier',
      }, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching estimator settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    
    // Make sure user is logged in (admin check)
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use admin client to bypass RLS for table update
    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if a row exists
    const { data: existing } = await adminSupabase.from('estimator_settings').select('id').limit(1).single();

    if (existing) {
      // Update
      const { error } = await adminSupabase
        .from('estimator_settings')
        .update({
          property_apartment_base: body.property_apartment_base,
          property_duplex_base: body.property_duplex_base,
          property_office_base: body.property_office_base,
          finishing_standard_mult: body.finishing_standard_mult,
          finishing_premium_mult: body.finishing_premium_mult,
          finishing_ultra_mult: body.finishing_ultra_mult,
          custom_formula: body.custom_formula,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Insert new
      const { error } = await adminSupabase
        .from('estimator_settings')
        .insert([{
          property_apartment_base: body.property_apartment_base,
          property_duplex_base: body.property_duplex_base,
          property_office_base: body.property_office_base,
          finishing_standard_mult: body.finishing_standard_mult,
          finishing_premium_mult: body.finishing_premium_mult,
          finishing_ultra_mult: body.finishing_ultra_mult,
          custom_formula: body.custom_formula
        }]);
        
      if (error) throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating estimator settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
