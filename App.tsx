
import React, { useState, useEffect } from 'react';
import { Page, Petition } from './types';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PetitionCreator from './pages/PetitionCreator';
import Archive from './pages/Archive';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [petitions, setPetitions] = useState<Petition[]>([]);

  // Load petitions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mevlana_petitions');
    if (saved) {
      setPetitions(JSON.parse(saved));
    }
  }, []);

  const savePetition = (newPetition: Petition) => {
    const updated = [newPetition, ...petitions];
    setPetitions(updated);
    localStorage.setItem('mevlana_petitions', JSON.stringify(updated));
  };

  const deletePetition = (id: string) => {
    const updated = petitions.filter(p => p.id !== id);
    setPetitions(updated);
    localStorage.setItem('mevlana_petitions', JSON.stringify(updated));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigate={setCurrentPage} recentCount={petitions.length} />;
      case Page.PetitionCreator:
        return <PetitionCreator onSave={savePetition} />;
      case Page.Archive:
        return <Archive petitions={petitions} onDelete={deletePetition} />;
      case Page.Settings:
        return <Settings />;
      default:
        return <Home onNavigate={setCurrentPage} recentCount={petitions.length} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">Mevlana Grup Hukuk Otomasyonu</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">Av. Mehmetcan Karaca</p>
              <p className="text-xs text-slate-500">Yönetici Paneli</p>
            </div>
            <img 
              src="https://picsum.photos/seed/legal/40/40" 
              className="w-10 h-10 rounded-full border border-slate-200" 
              alt="Profil" 
            />
          </div>
        </header>
        <div className="p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
