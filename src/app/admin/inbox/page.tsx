import { createAdminClient } from '@/utils/supabase/admin';
import InboxClient from './InboxClient';

export default async function InboxPage() {
  const supabase = await createAdminClient();
  
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error.message || JSON.stringify(error));
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Inbox & Leads</h1>
        <p className="text-gray-500 font-body">Manage messages and inquiries from potential clients.</p>
      </div>

      <InboxClient initialLeads={leads || []} />
    </div>
  );
}
