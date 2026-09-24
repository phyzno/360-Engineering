'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function deleteClient(id: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase.from('service_clients').delete().eq('id', id).select();
  if (error) return { error: error.message };
  if (!data || data.length === 0) return { error: "Client not found or could not be deleted." };
  revalidatePath('/admin/clients');
  revalidatePath('/services/[category]/[slug]', 'page');
  return { success: true };
}

export async function saveClient(data: { name: string, type: string, service_id: string, logo?: string }, id?: string) {
  const supabase = await createAdminClient();
  
  if (id) {
    // Update
    const { error } = await supabase.from('service_clients').update(data).eq('id', id);
    if (error) return { error: error.message };
  } else {
    // Insert
    const { error } = await supabase.from('service_clients').insert([data]);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/clients');
  revalidatePath('/services/[category]/[slug]', 'page');
  return { success: true };
}
