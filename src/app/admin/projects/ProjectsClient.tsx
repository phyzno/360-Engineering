'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PlusCircle, Search, Edit2, Trash2, Star, X, Upload, ChevronDown } from 'lucide-react';
import { deleteProject, toggleFeatured, saveProject } from './actions';
import Image from 'next/image';
import { servicesData } from '@/data/services';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubcategoryDropdownOpen, setIsSubcategoryDropdownOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      const projectToEdit = projects.find(p => String(p.id) === editId);
      if (projectToEdit) {
        handleOpenModal(projectToEdit);
      }
    }
  }, [searchParams, projects]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    year: '',
    category: 'Residential',
    subcategory: '',
    image: '',
    overview: { location: '', sqft: '', timeline: '', clientReq: '' },
    blueprint: { plan2d: '', render3d: '', final: [] as string[] },
    materials: [] as { name: string; description: string }[],
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, subField?: string, arrayIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      const data = await res.json();
      if (data.success) {
        if (subField === 'final' && typeof arrayIndex === 'number') {
          // Handle array element update for final photography
          setFormData((prev: any) => {
            const newFinal = [...(prev.blueprint.final || [])];
            newFinal[arrayIndex] = data.url;
            return {
              ...prev,
              blueprint: {
                ...prev.blueprint,
                final: newFinal
              }
            };
          });
        } else if (subField) {
          setFormData((prev: any) => ({
            ...prev,
            [fieldName]: {
              ...prev[fieldName],
              [subField]: data.url
            }
          }));
        } else {
          setFormData((prev: any) => ({
            ...prev,
            [fieldName]: data.url
          }));
        }
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category).filter(Boolean)))];

  const handleOpenModal = (project: any = null) => {
    setError('');
    if (project) {
      setEditingProject(project);
      // Ensure final is an array even if old data had it as a string
      const rawFinal = project.blueprint?.final;
      const parsedFinal = Array.isArray(rawFinal) ? rawFinal : (rawFinal ? [rawFinal] : []);
      
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        year: project.year || '',
        category: project.category || 'Residential',
        subcategory: project.subcategory || '',
        image: project.image || '',
        overview: project.overview || { location: '', sqft: '', timeline: '', clientReq: '' },
        blueprint: {
          plan2d: project.blueprint?.plan2d || '',
          render3d: project.blueprint?.render3d || '',
          final: parsedFinal
        },
        materials: project.materials || [],
      });
    } else {
      setEditingProject(null);
      setFormData({ 
        title: '', slug: '', year: '', category: 'Residential', subcategory: '', image: '',
        overview: { location: '', sqft: '', timeline: '', clientReq: '' },
        blueprint: { plan2d: '', render3d: '', final: [] },
        materials: [],
      });
    }
    setIsCategoryDropdownOpen(false);
    setIsSubcategoryDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDeleteConfirm(id);
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await deleteProject(deleteConfirm);
      if (res?.error) {
        alert('Failed to delete project: ' + res.error);
      } else {
        setProjects(projects.filter(p => String(p.id) !== String(deleteConfirm)));
        window.location.reload();
      }
    } catch (err: any) {
      alert('Failed to delete project: ' + err.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleToggleFeature = async (id: string, currentStatus: boolean) => {
    const res = await toggleFeatured(id, currentStatus);
    if (res.error) {
      alert(res.error);
    } else {
      setProjects(projects.map(p => p.id === id ? { ...p, is_featured: !currentStatus } : p));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await saveProject(formData, editingProject?.id);
    
    if (res.error) {
      setError(res.error);
    } else {
      setIsModalOpen(false);
      window.location.reload(); // Quick way to refresh data from server
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-[#fadbc2] shadow-sm">
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#d96b11] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] transition-all font-body text-sm"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 btn-primary rounded-xl shrink-0 w-full sm:w-auto"
        >
          <span className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add Project
          </span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {uniqueCategories.map((cat) => (
          <button
            key={cat as string}
            onClick={() => setSelectedCategory(cat as string)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-[#d96b11] text-white'
                : 'bg-white text-gray-600 border border-[#fadbc2] hover:bg-[#FFF8F0]'
            }`}
          >
            {cat as string}
          </button>
        ))}
      </div>

      {/* Projects List Container */}
      <div className="bg-transparent md:bg-white md:border md:border-[#fadbc2] md:rounded-[2rem] md:shadow-sm overflow-hidden">
        
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredProjects.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-white rounded-[2rem] border border-[#fadbc2]">
              No projects found.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded-[2rem] border border-[#fadbc2] shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 line-clamp-1">{project.title}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      {project.slug} {project.subcategory ? `• ${project.subcategory}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleToggleFeature(project.id, project.is_featured)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      project.is_featured 
                        ? 'text-amber-600 bg-amber-50 border border-amber-200' 
                        : 'text-gray-500 bg-gray-50 border border-gray-200 hover:text-amber-500'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${project.is_featured ? 'fill-current' : ''}`} />
                    {project.is_featured ? 'Featured' : 'Feature'}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-gray-100 bg-gray-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(project.id, e)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-100 bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF8F0] border-b border-[#fadbc2]">
                <th className="py-4 px-6 font-heading font-semibold text-gray-700">Project</th>
                <th className="py-4 px-6 font-heading font-semibold text-gray-700 text-center">Featured</th>
                <th className="py-4 px-6 font-heading font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body text-sm">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-gray-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {project.image ? (
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{project.title}</p>
                          <p className="text-xs text-gray-500 font-mono">
                            {project.slug} {project.subcategory ? `• ${project.subcategory}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleToggleFeature(project.id, project.is_featured)}
                        className={`p-2 rounded-full transition-colors ${
                          project.is_featured 
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                            : 'text-gray-300 hover:text-amber-500 hover:bg-gray-100'
                        }`}
                        title={project.is_featured ? "Remove from Featured" : "Set as Featured"}
                      >
                        <Star className={`w-5 h-5 ${project.is_featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(project.id, e)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#fadbc2]">
            
            {/* Fixed Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FFF8F0] shrink-0">
              <h3 className="text-xl font-heading font-medium text-gray-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Form Body */}
            <form id="projectForm" data-lenis-prevent="true" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 font-body text-sm">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 shrink-0">
                  {error}
                </div>
              )}
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-100 pb-2">Basic Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Project Title *</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Slug (URL) *</label>
                    <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="e.g. urban-loft" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Category *</label>
                    <div 
                      className="relative"
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setIsCategoryDropdownOpen(false);
                        }
                      }}
                    >
                      <div
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] bg-white flex justify-between items-center cursor-pointer"
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      >
                        <span className={`block truncate ${!formData.category ? 'text-gray-400' : 'text-gray-900'}`}>
                          {formData.category || 'Select a category'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isCategoryDropdownOpen && (
                        <div 
                          className="absolute z-10 w-full mt-2 bg-white border border-[#fadbc2] rounded-xl shadow-xl max-h-[220px] overflow-y-auto"
                          style={{ scrollbarWidth: 'thin' }}
                        >
                          {['Residential', 'Commercial', 'Renovation'].map((cat, idx) => (
                            <div
                              key={idx}
                              className={`px-4 py-3 cursor-pointer hover:bg-[#FFF8F0] transition-colors border-b border-gray-50 last:border-b-0 ${formData.category === cat ? 'bg-[#FFF8F0] text-[#d96b11] font-semibold' : 'text-gray-700'}`}
                              onClick={() => {
                                setFormData({...formData, category: cat, subcategory: ''});
                                setIsCategoryDropdownOpen(false);
                              }}
                            >
                              <div className="font-medium">{cat}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Subcategory *</label>
                    <div 
                      className="relative"
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setIsSubcategoryDropdownOpen(false);
                        }
                      }}
                    >
                      <div
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] bg-white flex justify-between items-center cursor-pointer"
                        onClick={() => setIsSubcategoryDropdownOpen(!isSubcategoryDropdownOpen)}
                      >
                        <span className={`block truncate ${!formData.subcategory ? 'text-gray-400' : 'text-gray-900'}`}>
                          {(() => {
                            const s = servicesData.find(s => s.id === formData.subcategory && s.category.toLowerCase() === formData.category.toLowerCase());
                            return s ? s.title : 'Select a subcategory';
                          })()}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSubcategoryDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isSubcategoryDropdownOpen && (
                        <div 
                          className="absolute z-10 w-full mt-2 bg-white border border-[#fadbc2] rounded-xl shadow-xl max-h-[220px] overflow-y-auto"
                          style={{ scrollbarWidth: 'thin' }}
                        >
                          {servicesData.map((service) => (
                            <div
                              key={`${service.category}-${service.id}`}
                              className={`px-4 py-3 cursor-pointer hover:bg-[#FFF8F0] transition-colors border-b border-gray-50 last:border-b-0 ${(formData.subcategory === service.id && formData.category.toLowerCase() === service.category.toLowerCase()) ? 'bg-[#FFF8F0] text-[#d96b11] font-semibold' : 'text-gray-700'}`}

                              onClick={() => {
                                const capCategory = service.category.charAt(0).toUpperCase() + service.category.slice(1);
                                setFormData({...formData, subcategory: service.id, category: capCategory});
                                setIsSubcategoryDropdownOpen(false);
                              }}
                            >
                              <div className="font-medium">{service.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{service.category}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Year</label>
                    <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="e.g. 2023" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Cover Image URL *</label>
                  <div className="flex gap-2">
                    <input type="text" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="https://... or upload path" />
                    <label className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-gray-600" title="Upload Image">
                      <Upload className="w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Overview Details */}
              <div className="space-y-4 pt-4">
                <h4 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-100 pb-2">Overview Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Location</label>
                    <input type="text" value={formData.overview.location} onChange={(e) => setFormData({...formData, overview: {...formData.overview, location: e.target.value}})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="e.g. Dhaka, Bangladesh" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Area (Sq Ft)</label>
                    <input type="text" value={formData.overview.sqft} onChange={(e) => setFormData({...formData, overview: {...formData.overview, sqft: e.target.value}})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="e.g. 4,500 sq ft" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">Timeline</label>
                    <input type="text" value={formData.overview.timeline} onChange={(e) => setFormData({...formData, overview: {...formData.overview, timeline: e.target.value}})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="e.g. 8 Months" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-gray-700">Client Requirement / Description</label>
                  <textarea rows={3} value={formData.overview.clientReq} onChange={(e) => setFormData({...formData, overview: {...formData.overview, clientReq: e.target.value}})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="Describe the project goal..."></textarea>
                </div>
              </div>

              {/* Blueprints / Gallery */}
              <div className="space-y-4 pt-4">
                <h4 className="font-heading font-semibold text-lg text-gray-900 border-b border-gray-100 pb-2">Gallery / Blueprints</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">2D Plan Image URL <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="flex gap-2">
                      <input type="text" value={formData.blueprint.plan2d} onChange={(e) => setFormData({...formData, blueprint: {...formData.blueprint, plan2d: e.target.value}})} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="Leave empty to hide..." />
                      <label className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-gray-600" title="Upload Image">
                        <Upload className="w-5 h-5" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'blueprint', 'plan2d')} />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700">3D Render Image URL <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="flex gap-2">
                      <input type="text" value={formData.blueprint.render3d} onChange={(e) => setFormData({...formData, blueprint: {...formData.blueprint, render3d: e.target.value}})} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="Leave empty to hide..." />
                      <label className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-gray-600" title="Upload Image">
                        <Upload className="w-5 h-5" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'blueprint', 'render3d')} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-gray-700">Final Photography</label>
                      <button type="button" onClick={() => setFormData((prev: any) => ({ ...prev, blueprint: { ...prev.blueprint, final: [...(prev.blueprint.final || []), ''] } }))} className="text-sm text-[#d96b11] font-semibold flex items-center gap-1 hover:text-[#b5540b]">
                        <PlusCircle className="w-4 h-4" /> Add Image
                      </button>
                    </div>
                    
                    {formData.blueprint.final.map((finalUrl: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" value={finalUrl} onChange={(e) => {
                          const newFinal = [...formData.blueprint.final];
                          newFinal[idx] = e.target.value;
                          setFormData({...formData, blueprint: {...formData.blueprint, final: newFinal}});
                        }} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" placeholder="Image URL..." />
                        <label className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-gray-600" title="Upload Image">
                          <Upload className="w-5 h-5" />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'blueprint', 'final', idx)} />
                        </label>
                        <button type="button" onClick={() => {
                          const newFinal = formData.blueprint.final.filter((_, i) => i !== idx);
                          setFormData({...formData, blueprint: {...formData.blueprint, final: newFinal}});
                        }} className="p-3 text-gray-400 hover:text-red-500 bg-white rounded-xl border border-gray-200 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    {(!formData.blueprint.final || formData.blueprint.final.length === 0) && (
                      <p className="text-gray-400 text-sm italic">No final photography added.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Material Palette */}
              <div className="space-y-4 pt-4 pb-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h4 className="font-heading font-semibold text-lg text-gray-900">Material Palette</h4>
                  <button type="button" onClick={() => setFormData({...formData, materials: [...formData.materials, { name: '', description: '' }]})} className="text-sm text-[#d96b11] font-semibold flex items-center gap-1 hover:text-[#b5540b]">
                    <PlusCircle className="w-4 h-4" /> Add Material
                  </button>
                </div>
                {formData.materials.map((mat, index) => (
                  <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex-1 space-y-3">
                      <input type="text" value={mat.name} onChange={(e) => { const newMats = [...formData.materials]; newMats[index].name = e.target.value; setFormData({...formData, materials: newMats}); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] text-sm" placeholder="Material Name (e.g. Teak Wood)" />
                      <input type="text" value={mat.description} onChange={(e) => { const newMats = [...formData.materials]; newMats[index].description = e.target.value; setFormData({...formData, materials: newMats}); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] text-sm" placeholder="Description (e.g. Used for custom cabinetry)" />
                    </div>
                    <button type="button" onClick={() => { const newMats = formData.materials.filter((_, i) => i !== index); setFormData({...formData, materials: newMats}); }} className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg border border-gray-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.materials.length === 0 && <p className="text-gray-400 text-sm italic">No materials added yet.</p>}
              </div>
            </form>

            {/* Fixed Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0 rounded-b-[2rem]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="projectForm"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[#d96b11] text-white font-semibold hover:bg-[#b5540b] transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Project'}
              </button>
            </div>
            
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl flex flex-col border border-[#fadbc2] overflow-hidden">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-medium text-gray-900">Delete Project?</h3>
              <p className="text-gray-500 font-body text-sm">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-semibold transition-colors flex-1"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
