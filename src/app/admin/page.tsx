import { createAdminClient } from '@/utils/supabase/admin';
import { Briefcase, Inbox, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createAdminClient();

  // Fetch stats concurrently
  const [
    { count: projectsCount },
    { count: featuredCount },
    { count: unreadLeadsCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_featured', true),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('is_read', false)
  ]);

  const stats = [
    {
      name: 'Total Projects',
      value: projectsCount || 0,
      icon: Briefcase,
      href: '/admin/projects',
      color: 'text-[#d96b11]',
      bg: 'bg-[#fadbc2]/30',
      border: 'border-[#fadbc2]'
    },
    {
      name: 'Featured Projects',
      value: featuredCount || 0,
      icon: TrendingUp,
      href: '/admin/projects',
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      border: 'border-amber-200'
    },
    {
      name: 'Unread Messages',
      value: unreadLeadsCount || 0,
      icon: Inbox,
      href: '/admin/inbox',
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      border: 'border-blue-200'
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-medium text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 font-body">Welcome back. Here's what's happening with your platform today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className={`group bg-white border ${stat.border} rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="p-2.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-800 group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
            <div>
              <h3 className="text-5xl font-light text-gray-900 mb-2 group-hover:scale-105 transition-transform origin-left font-heading">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider font-body">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-[#fadbc2] rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-heading font-medium text-gray-900 mb-6 flex items-center justify-between">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/projects" className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-[#FFF8F0] hover:border-[#fadbc2] transition-colors">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-[#d96b11] transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold mb-1 font-body">Add New Project</div>
                <div className="text-sm text-gray-500 font-body">Create a new portfolio item to showcase your work.</div>
              </div>
            </Link>
            <Link href="/admin/inbox" className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-[#FFF8F0] hover:border-[#fadbc2] transition-colors">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-[#d96b11] transition-colors">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold mb-1 font-body">Check Inbox</div>
                <div className="text-sm text-gray-500 font-body">Review recent messages from potential clients.</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
