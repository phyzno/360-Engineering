'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Inbox, TrendingUp, ArrowRight, X, Star, ExternalLink, PlusCircle, Edit2 } from 'lucide-react';
import { toggleFeatured } from './projects/actions';

export default function DashboardContent({ 
  projectsCount, 
  featuredCount, 
  unreadLeadsCount, 
  featuredProjects 
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localFeatured, setLocalFeatured] = useState(featuredProjects);

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
      href: '#',
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

  const handleToggleFeature = async (id: string, currentStatus: boolean) => {
    const res = await toggleFeatured(id, currentStatus);
    if (!res.error) {
      setLocalFeatured(localFeatured.filter((p: any) => p.id !== id));
    } else {
      alert(res.error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat: any) => {
          if (stat.name === 'Featured Projects') {
            return (
              <button
                key={stat.name}
                onClick={() => setIsModalOpen(true)}
                className={`group bg-white border ${stat.border} rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden text-left`}
              >
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <div className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 lg:w-7 lg:h-7 ${stat.color}`} />
                  </div>
                  <div className="p-2 lg:p-2.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 group-hover:text-gray-800 group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-5xl font-light text-gray-900 mb-1 lg:mb-2 group-hover:scale-105 transition-transform origin-left font-heading">
                    {stat.name === 'Featured Projects' ? localFeatured.length : stat.value}
                  </h3>
                  <p className="text-[10px] lg:text-sm font-medium text-gray-500 uppercase tracking-wider font-body">{stat.name}</p>
                </div>
              </button>
            );
          }

          return (
            <Link
              key={stat.name}
              href={stat.href}
              className={`group bg-white border ${stat.border} rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 lg:w-7 lg:h-7 ${stat.color}`} />
                </div>
                <div className="p-2 lg:p-2.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 group-hover:text-gray-800 group-hover:-rotate-45 transition-transform" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-light text-gray-900 mb-1 lg:mb-2 group-hover:scale-105 transition-transform origin-left font-heading">
                  {stat.value}
                </h3>
                <p className="text-[10px] lg:text-sm font-medium text-gray-500 uppercase tracking-wider font-body">{stat.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:gap-6 mt-10">
        <div className="bg-white border border-[#fadbc2] rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 shadow-sm">
          <h3 className="text-lg lg:text-xl font-heading font-medium text-gray-900 mb-4 lg:mb-6 flex items-center justify-between">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            <Link href="/admin/projects" className="group flex items-start gap-3 lg:gap-4 p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-gray-100 bg-gray-50 hover:bg-[#FFF8F0] hover:border-[#fadbc2] transition-colors">
              <div className="p-2.5 lg:p-3 bg-white rounded-lg lg:rounded-xl shadow-sm group-hover:text-[#d96b11] transition-colors shrink-0">
                <PlusCircle className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold mb-1 font-body text-sm lg:text-base">Add New Project</div>
                <div className="text-xs lg:text-sm text-gray-500 font-body">Create a new portfolio item to showcase your work.</div>
              </div>
            </Link>
            <Link href="/admin/inbox" className="group flex items-start gap-3 lg:gap-4 p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-gray-100 bg-gray-50 hover:bg-[#FFF8F0] hover:border-[#fadbc2] transition-colors">
              <div className="p-2.5 lg:p-3 bg-white rounded-lg lg:rounded-xl shadow-sm group-hover:text-[#d96b11] transition-colors shrink-0">
                <Inbox className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold mb-1 font-body text-sm lg:text-base">Check Inbox</div>
                <div className="text-xs lg:text-sm text-gray-500 font-body">Review recent messages from potential clients.</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#fadbc2]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FFF8F0] shrink-0">
              <h3 className="text-2xl font-heading font-medium text-gray-900 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" /> Featured Projects
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 font-body text-sm">
              {localFeatured.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-lg">No featured projects found.</p>
                  <p className="mt-2">Go to Projects Management to feature some projects.</p>
                  <Link href="/admin/projects" className="inline-block mt-4 text-[#d96b11] hover:underline font-medium">
                    Go to Projects &rarr;
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localFeatured.map((project: any) => (
                    <div key={project.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#fadbc2] transition-colors">
                      <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-base">{project.title}</h4>
                        <p className="text-xs text-gray-500 font-mono mt-0.5 truncate">{project.category}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => handleToggleFeature(project.id, true)}
                            className="text-xs font-medium px-3 py-1.5 rounded-full text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1"
                          >
                            <X className="w-3 h-3" /> Unfeature
                          </button>
                          <Link
                            href={`/admin/projects?edit=${project.id}`}
                            className="text-xs font-medium px-3 py-1.5 rounded-full text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" /> Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center md:justify-end shrink-0 rounded-b-[2rem]">
              <Link
                href="/admin/projects"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Manage All Projects <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
