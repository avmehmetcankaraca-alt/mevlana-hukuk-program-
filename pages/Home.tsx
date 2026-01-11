
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  recentCount: number;
}

const Home: React.FC<HomeProps> = ({ onNavigate, recentCount }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="bg-indigo-950 p-10 text-white relative">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Hoş Geldiniz, Av. Mehmetcan Karaca</h1>
            <p className="text-indigo-200 max-w-2xl text-lg">
              Mevlana Grup Hukuk Otomasyonu ile dilekçe hazırlama süreçlerinizi hızlandırın, 
              yapay zeka desteğiyle hata payını minimize edin.
            </p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => onNavigate(Page.PetitionCreator)}
                className="bg-amber-500 hover:bg-amber-400 text-indigo-950 px-6 py-3 rounded-xl font-bold transition-colors shadow-lg"
              >
                Yeni Dilekçe Hazırla
              </button>
              <button 
                onClick={() => onNavigate(Page.Archive)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-white/20"
              >
                Arşivi Görüntüle
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-900/50 to-transparent flex items-center justify-center opacity-30">
             <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Toplam Dilekçe</h3>
            <p className="text-slate-500 text-sm">Sistemde kayıtlı toplam evrak sayısı.</p>
          </div>
          <p className="text-4xl font-black text-indigo-900 mt-4">{recentCount}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Hızlı Erişim</h3>
            <p className="text-slate-500 text-sm">En sık kullanılan dilekçe şablonları.</p>
          </div>
          <div className="mt-4 space-y-2">
            <button className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 block w-full text-left">İstinaf Başvuru Dilekçesi</button>
            <button className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 block w-full text-left">İşe İade Davası</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Güvenli Veri</h3>
            <p className="text-slate-500 text-sm">Verileriniz yerel depolama ile korunmaktadır.</p>
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-100 rounded-full">SSL Korumalı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
