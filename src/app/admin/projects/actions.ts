'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function deleteProject(id: string) {
  const supabase = await createAdminClient();
  const { data, error } = await supabase.from('projects').delete().eq('id', id).select();
  if (error) return { error: error.message };
  if (!data || data.length === 0) return { error: "Project not found or could not be deleted." };
  revalidatePath('/admin/projects');
  return { success: true };
}

export async function toggleFeatured(id: string, currentStatus: boolean) {
  const supabase = await createAdminClient();

  if (!currentStatus) {
    // We are trying to feature it. Check how many are currently featured.
    const { count } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true);

    if (count !== null && count >= 3) {
      return { error: 'You can only feature up to 3 projects on the homepage.' };
    }
  }

  const { error } = await supabase
    .from('projects')
    .update({ is_featured: !currentStatus })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  return { success: true };
}

export async function saveProject(data: any, id?: string) {
  const supabase = await createAdminClient();
  
  if (id) {
    // Update
    const { error } = await supabase.from('projects').update(data).eq('id', id);
    if (error) return { error: error.message };
  } else {
    // Insert
    const { error } = await supabase.from('projects').insert([data]);
    if (error) return { error: error.message };
  }

  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  return { success: true };
}
