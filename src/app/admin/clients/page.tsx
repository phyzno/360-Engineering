import { createAdminClient } from '@/utils/supabase/admin';
import ClientsClient from './ClientsClient';
import { servicesData } from '@/data/services';

export default async function ClientsPage() {
  const supabase = await createAdminClient();
  
  // Fetch all clients, order by created_at descending
  const { data: clients, error } = await supabase
    .from('service_clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching clients:', error.message || JSON.stringify(error));
  }

  // Pass servicesData to client component for dropdowns
  const availableServices = servicesData.map(s => ({
    id: s.id,
    title: s.title,
    category: s.category
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Clients Management</h1>
        <p className="text-gray-500 font-body">Manage clients for different service categories (e.g., Bathroom, Kitchen, Office).</p>
      </div>

      <ClientsClient initialClients={clients || []} availableServices={availableServices} />
    </div>
  );
}
