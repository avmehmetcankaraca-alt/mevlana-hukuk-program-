
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Ayarlar</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Profil Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ad Soyad</label>
              <input type="text" defaultValue="Av. Mehmetcan Karaca" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kurum / Baro No</label>
              <input type="text" defaultValue="Mevlana Grup Hukuk" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sistem Tercihleri</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Otomatik Arşivleme</p>
                <p className="text-xs text-slate-500">Oluşturulan her dilekçeyi otomatik olarak arşive ekle.</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Gelişmiş Hukuk Modu</p>
                <p className="text-xs text-slate-500">Dilekçelerde daha derin hukuki terimler ve referanslar kullan.</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50">
          <div className="flex items-center gap-4 text-slate-400">
             <div className="p-3 bg-white rounded-xl border border-slate-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
             </div>
             <div>
               <p className="text-xs font-bold uppercase tracking-wider">Sistem Versiyonu</p>
               <p className="text-sm font-medium">v2.4.0-PRO (Mevlana Grup Exclusive)</p>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="px-6 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors">İptal</button>
        <button className="px-6 py-2 bg-indigo-950 text-white font-bold text-sm rounded-xl hover:bg-indigo-900 transition-all shadow-md active:scale-95">Değişiklikleri Kaydet</button>
      </div>
    </div>
  );
};

export default Settings;
