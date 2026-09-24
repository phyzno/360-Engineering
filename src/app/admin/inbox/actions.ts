'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function markAsRead(id: string, isRead: boolean) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('leads').update({ is_read: isRead }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/inbox');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteLead(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/inbox');
  revalidatePath('/admin');
  return { success: true };
}
