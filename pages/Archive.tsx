
import React, { useState } from 'react';
import { Petition } from '../types';

interface ArchiveProps {
  petitions: Petition[];
  onDelete: (id: string) => void;
}

const Archive: React.FC<ArchiveProps> = ({ petitions, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);

  const filteredPetitions = petitions.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Dilekçe Arşivi</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Arşivde ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-sm"
          />
          <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {filteredPetitions.length > 0 ? (
            filteredPetitions.map(petition => (
              <div 
                key={petition.id}
                onClick={() => setSelectedPetition(petition)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedPetition?.id === petition.id 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 truncate pr-2">{petition.title}</h3>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase">{petition.date}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {petition.content}
                </p>
                <div className="mt-3 flex justify-end gap-2">
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(confirm('Bu dilekçeyi silmek istediğinize emin misiniz?')) onDelete(petition.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-400 text-sm">Kayıtlı dilekçe bulunamadı.</p>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          {selectedPetition ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-[calc(100vh-14rem)] flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{selectedPetition.title}</h2>
                  <p className="text-xs text-slate-500">{selectedPetition.date} tarihinde oluşturuldu</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPetition.content);
                    alert("Kopyalandı!");
                  }}
                  className="bg-indigo-950 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-900 transition-colors"
                >
                  Metni Kopyala
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 font-serif text-slate-700 leading-loose whitespace-pre-wrap text-sm">
                {selectedPetition.content}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 h-full flex flex-col items-center justify-center p-12 text-slate-400">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z"/></svg>
              <p>Görüntülemek için soldan bir dilekçe seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
