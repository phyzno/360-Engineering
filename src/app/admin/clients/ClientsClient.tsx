'use client';

import { useState } from 'react';
import { PlusCircle, Search, Edit2, Trash2, X, Upload, ChevronDown } from 'lucide-react';
import { deleteClient, saveClient } from './actions';

interface ServiceOption {
  id: string;
  title: string;
  category: string;
}

export default function ClientsClient({ initialClients, availableServices }: { initialClients: any[], availableServices: ServiceOption[] }) {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    service_id: availableServices.length > 0 ? availableServices[0].id : '',
    logo: '',
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, logo: data.url }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.service_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (client: any = null) => {
    setError('');
    setIsServiceDropdownOpen(false);
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name || '',
        type: client.type || '',
        service_id: client.service_id || (availableServices.length > 0 ? availableServices[0].id : ''),
        logo: client.logo || '',
      });
    } else {
      setEditingClient(null);
      setFormData({ 
        name: '', 
        type: '', 
        service_id: availableServices.length > 0 ? availableServices[0].id : '',
        logo: ''
      });
    }
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
      const res = await deleteClient(deleteConfirm);
      if (res?.error) {
        alert('Failed to delete client: ' + res.error);
      } else {
        setClients(clients.filter(c => String(c.id) !== String(deleteConfirm)));
        window.location.reload();
      }
    } catch (err: any) {
      alert('Failed to delete client: ' + err.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await saveClient(formData, editingClient?.id);
    
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
            placeholder="Search clients..."
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
            Add Client
          </span>
        </button>
      </div>

      {/* Clients List Container */}
      <div className="bg-transparent md:bg-white md:border md:border-[#fadbc2] md:rounded-[2rem] md:shadow-sm overflow-hidden">
        
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredClients.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-white rounded-[2rem] border border-[#fadbc2]">
              No clients found.
            </div>
          ) : (
            filteredClients.map((client) => {
              const service = availableServices.find(s => s.id === client.service_id);
              return (
                <div key={client.id} className="bg-white p-4 rounded-[2rem] border border-[#fadbc2] shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="w-full h-full object-cover p-2" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-medium uppercase">
                          {client.name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 line-clamp-1">{client.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {client.type || '-'}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 line-clamp-1">
                          {service ? `${service.title} (${service.category})` : client.service_id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-3 border-t border-gray-100 gap-2">
                    <button
                      onClick={() => handleOpenModal(client)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-gray-100 bg-gray-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(client.id, e)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-100 bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto" data-lenis-prevent="true">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF8F0] border-b border-[#fadbc2]">
                <th className="py-4 px-6 font-heading font-semibold text-gray-700">Client Name</th>
                <th className="py-4 px-6 font-heading font-semibold text-gray-700">Type / Industry</th>
                <th className="py-4 px-6 font-heading font-semibold text-gray-700">Service Category</th>
                <th className="py-4 px-6 font-heading font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body text-sm">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const service = availableServices.find(s => s.id === client.service_id);
                  return (
                    <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {client.logo && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center p-1">
                              <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                            </div>
                          )}
                          <p className="font-semibold text-gray-900">{client.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">{client.type || '-'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {service ? `${service.title} (${service.category})` : client.service_id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(client)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(client.id, e)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl flex flex-col border border-[#fadbc2]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FFF8F0] shrink-0 rounded-t-[2rem]">
              <h3 className="text-xl font-heading font-medium text-gray-900">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form id="clientForm" onSubmit={handleSubmit} className="p-6 space-y-4 font-body text-sm">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Client Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" 
                  placeholder="e.g. TechNova Solutions" 
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Client Type / Industry</label>
                <input 
                  type="text" 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" 
                  placeholder="e.g. Software Company" 
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Service Category *</label>
                <div 
                  className="relative"
                  tabIndex={0}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setIsServiceDropdownOpen(false);
                    }
                  }}
                >
                  <div
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11] bg-white flex justify-between items-center cursor-pointer"
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  >
                    <span className={`block truncate ${!formData.service_id ? 'text-gray-400' : 'text-gray-900'}`}>
                      {(() => {
                        const s = availableServices.find(s => s.id === formData.service_id);
                        return s ? `${s.title} (${s.category})` : 'Select a category...';
                      })()}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isServiceDropdownOpen && (
                    <div 
                      className="absolute z-10 w-full mt-2 bg-white border border-[#fadbc2] rounded-xl shadow-xl max-h-[220px] overflow-y-auto"
                      style={{ scrollbarWidth: 'thin' }}
                      data-lenis-prevent="true"
                    >
                      {availableServices.length > 0 ? availableServices.map((service, idx) => (
                        <div
                          key={`${service.category}-${service.id}-${idx}`}
                          className={`px-4 py-3 cursor-pointer hover:bg-[#FFF8F0] transition-colors border-b border-gray-50 last:border-b-0 ${formData.service_id === service.id ? 'bg-[#FFF8F0] text-[#d96b11] font-semibold' : 'text-gray-700'}`}
                          onClick={() => {
                            setFormData({...formData, service_id: service.id});
                            setIsServiceDropdownOpen(false);
                          }}
                        >
                          <div className="font-medium">{service.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{service.category}</div>
                        </div>
                      )) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">No categories available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Client Logo <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={formData.logo} 
                    onChange={(e) => setFormData({...formData, logo: e.target.value})} 
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d96b11]/30 focus:border-[#d96b11]" 
                    placeholder="https://... or upload path" 
                  />
                  <label className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-gray-600" title="Upload Logo">
                    <Upload className="w-5 h-5" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
            </form>

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
                form="clientForm"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[#d96b11] text-white font-semibold hover:bg-[#b5540b] transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Client'}
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
              <h3 className="text-xl font-heading font-medium text-gray-900">Delete Client?</h3>
              <p className="text-gray-500 font-body text-sm">
                Are you sure you want to delete this client? This action cannot be undone.
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
