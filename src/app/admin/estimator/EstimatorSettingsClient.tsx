'use client';

import { useState } from 'react';
import { Save, Loader2, Info } from 'lucide-react';

export default function EstimatorSettingsClient({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({ 
      ...prev, 
      [name]: name === 'custom_formula' ? value : (parseFloat(value) || 0) 
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/estimator-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      
      setMessage('Settings updated successfully!');
      setIsError(false);
    } catch (error: any) {
      setMessage(error.message);
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#fadbc2] rounded-[2rem] shadow-sm overflow-hidden p-6 md:p-10">
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 mb-8">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Note:</strong> The final cost is calculated as: 
          <code> Total Area × Base Price × Finishing Multiplier</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
        {/* Base Prices Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-gray-900 border-b pb-2">Base Prices (per Sq Ft)</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apartment Base Price (BDT)</label>
            <input
              type="number"
              name="property_apartment_base"
              value={settings.property_apartment_base}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duplex Base Price (BDT)</label>
            <input
              type="number"
              name="property_duplex_base"
              value={settings.property_duplex_base}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Base Price (BDT)</label>
            <input
              type="number"
              name="property_office_base"
              value={settings.property_office_base}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
          </div>
        </div>

        {/* Finishing Multipliers Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-gray-900 border-b pb-2">Finishing Multipliers</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Standard Finish</label>
            <input
              type="number"
              step="0.1"
              name="finishing_standard_mult"
              value={settings.finishing_standard_mult}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">E.g. 1.0 means no extra cost applied.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Premium Finish</label>
            <input
              type="number"
              step="0.1"
              name="finishing_premium_mult"
              value={settings.finishing_premium_mult}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">E.g. 1.5 means 50% extra cost applied.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ultra-Luxury Finish</label>
            <input
              type="number"
              step="0.1"
              name="finishing_ultra_mult"
              value={settings.finishing_ultra_mult}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">E.g. 2.5 means 150% extra cost applied.</p>
          </div>
        </div>

      </div>

      <div className="mt-10 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">Custom Formula</h2>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mathematical Expression</label>
          <input
            type="text"
            name="custom_formula"
            value={settings.custom_formula || 'Area * BasePrice * Multiplier'}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d96b11] font-mono"
            required
          />
          <p className="text-sm text-gray-500 mt-3">
            <strong>Available variables:</strong> <code>Area</code>, <code>BasePrice</code>, <code>Multiplier</code>.<br/>
            <strong>Example:</strong> <code>(Area * BasePrice * Multiplier) + 50000</code>
          </p>
        </div>
      </div>

      {message && (
        <div className={`mt-6 p-4 rounded-xl text-center ${isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <div className="mt-8 flex justify-center md:justify-end">
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#d96b11] hover:bg-[#b5540b] text-white px-8 py-3.5 rounded-full font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Settings
        </button>
      </div>

    </form>
  );
}
