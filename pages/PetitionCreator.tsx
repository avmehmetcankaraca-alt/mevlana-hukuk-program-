
import React, { useState, useRef, useEffect } from 'react';
import { generatePetition } from '../services/geminiService';
import { Petition, AttachedFile } from '../types';

interface PetitionCreatorProps {
  onSave: (petition: Petition) => void;
}

const PetitionCreator: React.FC<PetitionCreatorProps> = ({ onSave }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [caseTitle, setCaseTitle] = useState('Yeni Dilekçe');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Fix: Explicitly type 'file' as File to resolve 'unknown' type errors
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setAttachedFiles(prev => [...prev, {
          name: file.name,
          type: file.type,
          base64: base64
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && attachedFiles.length === 0) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await generatePetition(
        prompt, 
        attachedFiles.map(f => ({ base64: f.base64, mimeType: f.type }))
      );
      setResult(response.text);
    } catch (error) {
      alert("Hukuk asistanı yanıt veremedi. Lütfen internet bağlantınızı ve API anahtarınızı kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    
    const newPetition: Petition = {
      id: Date.now().toString(),
      title: caseTitle,
      category: 'Genel',
      content: result,
      date: new Date().toLocaleDateString('tr-TR'),
    };
    
    onSave(newPetition);
    alert("Dilekçe başarıyla arşive kaydedildi.");
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    alert("Metin panoya kopyalandı.");
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-12rem)]">
      {/* Input Section */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Asistan Talimatı
          </h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Örn: İş kazası nedeniyle maddi manevi tazminat davası dilekçesi hazırlamak istiyorum. Olay şu şekilde gelişti..."
            className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-slate-700 leading-relaxed"
          ></textarea>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">Ek Belgeler (Mahkeme Kararı, Tutanak, vb.)</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {attachedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 text-xs">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700">
                    {/* Fix: Removed illegal extra closing path tag which breaks JSX parser */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              ))}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-200 text-xs font-bold hover:bg-indigo-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                Dosya Ekle
              </button>
              <input type="file" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-950 text-white hover:bg-indigo-900 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Dilekçe Hazırlanıyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Yapay Zekayı Çalıştır
              </>
            )}
          </button>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <h4 className="text-amber-800 font-bold text-sm mb-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            İpucu
          </h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Daha iyi sonuçlar için mahkeme karar özetlerini veya olayla ilgili detaylı kronolojik bilgiyi yukarıdaki alana ekleyin veya dosya olarak yükleyin.
          </p>
        </div>
      </div>

      {/* Result Section */}
      <div className="flex-[1.5] space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
            <input 
              type="text" 
              value={caseTitle} 
              onChange={(e) => setCaseTitle(e.target.value)}
              className="bg-transparent font-bold text-slate-700 outline-none focus:border-b border-indigo-500 px-1"
            />
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors" title="Kopyala">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              </button>
              <button onClick={handleSave} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors" title="Arşive Kaydet">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            {result ? (
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-800 font-serif leading-loose text-sm">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z"/></svg>
                <p className="text-center italic">Henüz bir dilekçe oluşturulmadı.<br/>Sol taraftaki asistan panelini kullanarak başlayın.</p>
              </div>
            )}
          </div>

          {result && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">MEVLANA GRUP HUKUK OTOMASYONU - RESMİ TASLAK ÇIKTISI</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetitionCreator;
