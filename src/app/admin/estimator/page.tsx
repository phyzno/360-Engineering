import { createAdminClient } from '@/utils/supabase/admin';
import EstimatorSettingsClient from './EstimatorSettingsClient';

export default async function EstimatorSettingsPage() {
  const supabase = await createAdminClient();
  
  // Try to fetch existing settings
  const { data, error } = await supabase
    .from('estimator_settings')
    .select('*')
    .limit(1)
    .single();

  const defaultSettings = {
    property_apartment_base: 1500,
    property_duplex_base: 2500,
    property_office_base: 2000,
    finishing_standard_mult: 1.0,
    finishing_premium_mult: 1.5,
    finishing_ultra_mult: 2.5,
  };

  const initialSettings = (data && !error) ? data : defaultSettings;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Estimator Settings</h1>
        <p className="text-gray-500 font-body">Manage the pricing and multiplier rules for the public Cost Estimator.</p>
      </div>

      <EstimatorSettingsClient initialSettings={initialSettings} />
    </div>
  );
}
