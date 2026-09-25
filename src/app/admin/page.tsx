import { createAdminClient } from '@/utils/supabase/admin';
import { Briefcase, Inbox, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DashboardContent from './DashboardContent';
export default async function AdminDashboard() {
  const supabase = await createAdminClient();

  // Fetch stats concurrently
  const [
    { count: projectsCount },
    { count: featuredCount, data: featuredProjects },
    { count: unreadLeadsCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact' }).eq('is_featured', true).order('created_at', { ascending: false }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('is_read', false)
  ]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 font-body">Welcome back. Here's what's happening with your platform today.</p>
      </div>

      <DashboardContent 
        projectsCount={projectsCount}
        featuredCount={featuredCount}
        unreadLeadsCount={unreadLeadsCount}
        featuredProjects={featuredProjects}
      />
    </div>
  );
}
