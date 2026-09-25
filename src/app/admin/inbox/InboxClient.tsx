'use client';

import { useState } from 'react';
import { Mail, MailOpen, Trash2, Calendar, X, Copy, Check } from 'lucide-react';
import { markAsRead, deleteLead } from './actions';

const formatMessage = (msg: string) => {
  if (!msg) return '';
  return msg
    .replace(/---\s*New Lead from Cost Estimator\s*---/gi, '')
    .replace(/---\s*New Lead from Contact Form\s*---/gi, '')
    .replace(/\s*-{10,}\s*$/g, '')
    .trim();
};

export default function InboxClient({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'estimator' | 'newsletter' | 'contact'>('all');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleToggleRead = async (id: string, currentStatus: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const res = await markAsRead(id, !currentStatus);
    if (!res.error) {
      setLeads(leads.map(l => l.id === id ? { ...l, is_read: !currentStatus } : l));
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, is_read: !currentStatus });
      }
    }
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
      const res = await deleteLead(deleteConfirm);
      if (res?.error) {
        alert('Failed to delete message: ' + res.error);
      } else {
        setLeads(leads.filter(l => String(l.id) !== String(deleteConfirm)));
        if (selectedLead?.id === deleteConfirm) setSelectedLead(null);
        window.location.reload();
      }
    } catch (err: any) {
      alert('Failed to delete message: ' + err.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleSelectLead = (lead: any) => {
    setSelectedLead(lead);
    if (!lead.is_read) {
      handleToggleRead(lead.id, false);
    }
  };

  const counts = {
    all: leads.length,
    newsletter: leads.filter(l => l.name === "Newsletter Subscriber").length,
    contact: leads.filter(l => l.message?.includes('--- New Lead from Contact Form ---')).length,
    estimator: leads.filter(l => {
      const isNewsletter = l.name === "Newsletter Subscriber";
      const isContact = l.message?.includes('--- New Lead from Contact Form ---');
      return l.message?.includes('--- New Lead from Cost Estimator ---') || (!isNewsletter && !isContact);
    }).length,
  };

  const filteredLeads = leads.filter(lead => {
    const isNewsletter = lead.name === "Newsletter Subscriber";
    const isContact = lead.message?.includes('--- New Lead from Contact Form ---');
    const isEstimator = lead.message?.includes('--- New Lead from Cost Estimator ---') || (!isNewsletter && !isContact);

    if (filter === 'newsletter') return isNewsletter;
    if (filter === 'contact') return isContact;
    if (filter === 'estimator') return isEstimator;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Inbox List */}
      <div className="lg:col-span-5 bg-white border border-[#fadbc2] rounded-[2rem] shadow-sm overflow-hidden flex flex-col h-[700px]">
        <div className="p-5 border-b border-[#fadbc2] bg-[#FFF8F0] flex flex-col gap-4">
          <h3 className="font-heading text-lg font-semibold text-gray-900">Messages</h3>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 bg-white rounded-lg p-1 border border-[#fadbc2]">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-md transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-[#d96b11] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setFilter('estimator')}
              className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-md transition-colors whitespace-nowrap ${
                filter === 'estimator' ? 'bg-[#d96b11] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Estimator ({counts.estimator})
            </button>
            <button
              onClick={() => setFilter('contact')}
              className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-md transition-colors whitespace-nowrap ${
                filter === 'contact' ? 'bg-[#d96b11] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Contact ({counts.contact})
            </button>
            <button
              onClick={() => setFilter('newsletter')}
              className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-md transition-colors whitespace-nowrap ${
                filter === 'newsletter' ? 'bg-[#d96b11] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Newsletter ({counts.newsletter})
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1" data-lenis-prevent="true">
          {filteredLeads.length === 0 ? (
            <p className="text-center text-gray-500 py-10 font-body text-sm">No messages yet.</p>
          ) : (
            filteredLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => handleSelectLead(lead)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-l-4 ${
                  selectedLead?.id === lead.id
                    ? 'bg-[#fadbc2]/30 border-[#d96b11]'
                    : lead.is_read 
                      ? 'bg-transparent border-transparent hover:bg-gray-50' 
                      : 'bg-[#FFF8F0] border-transparent hover:bg-[#fadbc2]/20 font-semibold'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate pr-2">{lead.name}</h4>
                  <div className="flex items-center gap-2 shrink-0">
                    {lead.message?.includes('--- New Lead from Contact Form ---') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium whitespace-nowrap">Contact</span>
                    )}
                    {lead.message?.includes('--- New Lead from Cost Estimator ---') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium whitespace-nowrap">Estimator</span>
                    )}
                    {lead.name === "Newsletter Subscriber" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium whitespace-nowrap">Newsletter</span>
                    )}
                    {!lead.is_read && <span className="w-2 h-2 rounded-full bg-[#d96b11]"></span>}
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate mb-2">{lead.email}</p>
                <p className={`text-xs truncate ${lead.is_read ? 'text-gray-400' : 'text-gray-700'}`}>
                  {formatMessage(lead.message)}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Reader */}
      <div className={`
        ${selectedLead ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm lg:static lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:block' : 'hidden lg:block'}
        lg:col-span-7
      `}>
        <div className="bg-white border border-[#fadbc2] rounded-[2rem] shadow-sm flex flex-col w-full h-[85vh] lg:h-[700px] overflow-hidden max-w-2xl mx-auto lg:max-w-none">
        {selectedLead ? (
          <>
            <div className="p-6 md:p-8 border-b border-gray-100 bg-[#FFF8F0] flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl font-heading font-medium text-gray-900 mb-2 truncate">{selectedLead.name}</h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 font-body">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <a href={`mailto:${selectedLead.email}`} className="hover:text-[#d96b11] transition-colors truncate" title="Send Email">{selectedLead.email}</a>
                    <button onClick={() => handleCopy(selectedLead.email, 'email')} className="p-1 text-gray-400 hover:text-[#d96b11] transition-colors shrink-0" title="Copy Email">
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <div className="flex items-center gap-1.5">
                        <a href={`tel:${selectedLead.phone}`} className="hover:text-[#d96b11] transition-colors" title="Call Phone">{selectedLead.phone}</a>
                        <button onClick={() => handleCopy(selectedLead.phone, 'phone')} className="p-1 text-gray-400 hover:text-[#d96b11] transition-colors" title="Copy Phone">
                          {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={(e) => handleToggleRead(selectedLead.id, selectedLead.is_read, e)}
                  className="p-2.5 text-gray-400 hover:text-[#d96b11] hover:bg-[#fadbc2]/30 rounded-xl transition-colors"
                  title={selectedLead.is_read ? "Mark as unread" : "Mark as read"}
                >
                  {selectedLead.is_read ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                </button>
                <button
                  onClick={(e) => handleDeleteClick(selectedLead.id, e)}
                  className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors lg:hidden bg-gray-100"
                  title="Close message"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 overflow-y-auto" data-lenis-prevent="true">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-body mb-6">
                <Calendar className="w-4 h-4" />
                {new Date(selectedLead.created_at).toLocaleString()}
              </div>
              <div className="prose prose-sm max-w-none font-body text-gray-700 whitespace-pre-wrap leading-relaxed">
                {formatMessage(selectedLead.message)}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Mail className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-body text-sm">Select a message to read.</p>
          </div>
        )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl flex flex-col border border-[#fadbc2] overflow-hidden">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-medium text-gray-900">Delete Message?</h3>
              <p className="text-gray-500 font-body text-sm">
                Are you sure you want to delete this message? This action cannot be undone.
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
