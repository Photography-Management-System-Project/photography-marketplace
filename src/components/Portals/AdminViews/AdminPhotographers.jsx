import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Search, MoreVertical, ShieldCheck, Mail, IndianRupee, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import toast from 'react-hot-toast';

export const AdminPhotographers = () => {
  const { t } = useTranslation();

  const { photographers } = useApp();
  const [localPhotographers, setLocalPhotographers] = useState(photographers);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPhotographer = () => {
    const newPro = { id: Date.now().toString(), name: 'New Photographer', specialty: 'General', rating: 5.0, reviews: 0 };
    setLocalPhotographers([...localPhotographers, newPro]);
    toast.success('New photographer added!');
  };

  const handleRemovePhotographer = (id) => {
    setLocalPhotographers(localPhotographers.filter(p => p.id !== id));
    toast.success('Photographer account removed.');
  };

  const filteredPhotographers = localPhotographers.filter(pro => 
    pro.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white font-serif tracking-tight">{t('adminPhotographers.photographerDirecto')}</h2>
          <p className="text-slate-400 font-light mt-1">{t('adminPhotographers.manageProfessionals')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('adminPhotographers.searchPhotographers')} 
              className="w-full sm:w-64 bg-slate-900 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <button 
            onClick={handleAddPhotographer}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Pro
          </button>
        </div>
      </div>

      <div className="glass-card border border-slate-700/60 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 font-bold tracking-widest border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">{t('adminPhotographers.photographer')}</th>
                <th className="px-6 py-4">{t('adminPhotographers.category')}</th>
                <th className="px-6 py-4">{t('adminPhotographers.pricing')}</th>
                <th className="px-6 py-4 text-center">{t('adminPhotographers.verification')}</th>
                <th className="px-6 py-4 text-center">{t('adminPhotographers.feeTier')}</th>
                <th className="px-6 py-4 text-right">{t('adminPhotographers.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/20">
              {filteredPhotographers.length > 0 ? filteredPhotographers.map((pro) => (
                <tr key={pro.photographer_id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pro.profile_picture || 'https://res.cloudinary.com/wcxgdspz/image/upload/v1785606959/photohub/images/faces/faces-1.jpg'} alt={pro.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1">
                          {pro.name}
                        </div>
                        <div className="text-[10px] text-slate-500">{pro.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 bg-slate-800 px-2 py-1 rounded text-xs">{pro.categories}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-amber-400">₹{pro.pricing}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {pro.rating > 4.5 ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-inner bg-emerald-500/10 border-emerald-500/30 text-emerald-400 inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
{t('adminPhotographers.verified')}
</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-inner bg-slate-800 border-slate-700 text-slate-400">
{t('adminPhotographers.pending')}
</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/30">15%</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemovePhotographer(pro.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove Photographer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No photographers found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
