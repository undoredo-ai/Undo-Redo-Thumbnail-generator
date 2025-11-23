
import React, { useState, useEffect, useRef } from 'react';
import InputControls from './components/InputControls';
import ImageDisplay from './components/ImageDisplay';
import { GeneratorState, AspectRatio, GalleryItem } from './types';
import { STYLE_PRESETS, AVAILABLE_MODELS } from './constants';
import { generateSingleImage } from './services/geminiService';
import { getGalleryItems, saveGalleryItem, deleteGalleryItem, clearGalleryDB } from './services/storageService';

const App: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    modelId: AVAILABLE_MODELS[0].id,
    mainPrompt: '',
    backgroundPrompt: '',
    headlineText: '',
    aspectRatio: AspectRatio.LANDSCAPE,
    stylePreset: STYLE_PRESETS[0],
    actors: [],
    references: [],
    imageResolution: '1K',
    generationCount: 1
  });

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeJobs, setActiveJobs] = useState(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [hasValidKey, setHasValidKey] = useState(false);
  const [manualKeyInput, setManualKeyInput] = useState('');
  
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
      const checkKey = async () => {
          // 1. Check Vite Environment Variables (Vercel/Environment Variables) - PRIORITIZED
          const envKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (envKey) {
              setApiKey(envKey);
              setHasValidKey(true);
              console.log('✓ Using API key from environment variables');
              return;
          }

          // 2. Check LocalStorage (for persisted web session if no Env var)
          const storedKey = localStorage.getItem('GEMINI_API_KEY');
          if (storedKey) {
              setApiKey(storedKey);
              setHasValidKey(true);
              console.log('✓ Using API key from localStorage');
              return;
          }

          // 3. Check AI Studio Environment (IDX/AI Studio)
          const win = window as any;
          if (win.aistudio && win.aistudio.hasSelectedApiKey) {
              const selected = await win.aistudio.hasSelectedApiKey();
              if (selected) {
                 setHasValidKey(true);
                 console.log('✓ Using API key from AI Studio');
                 return;
              }
          }

          console.warn('⚠ No API key found. Please add VITE_GEMINI_API_KEY to .env file');
      };
      checkKey();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const items = await getGalleryItems();
      const cleanedItems = items.map(item => {
        if (item.status === 'generating' || item.status === 'queued') {
          return { ...item, status: 'error' as const, error: 'Session Interrupted', progress: 0 };
        }
        return item;
      });
      cleanedItems.forEach(item => {
        if (item.status === 'error' && item.error === 'Session Interrupted') saveGalleryItem(item);
      });
      setGallery(cleanedItems);
    };
    loadHistory();
  }, []);

  const handleSelectKey = async () => {
      const win = window as any;
      if (win.aistudio) {
          await win.aistudio.openSelectKey();
          const selected = await win.aistudio.hasSelectedApiKey();
          setHasValidKey(selected);
      }
  };

  const handleManualKeySubmit = () => {
      if (manualKeyInput.trim().length > 10) {
          localStorage.setItem('GEMINI_API_KEY', manualKeyInput.trim());
          setApiKey(manualKeyInput.trim());
          setHasValidKey(true);
      } else {
          alert("Invalid API Key format");
      }
  };

  useEffect(() => {
      progressInterval.current = window.setInterval(() => {
          setGallery(prev => prev.map(item => {
              if (item.status === 'generating' && item.progress < 90) {
                  return { ...item, progress: item.progress + (Math.random() * 2) };
              }
              return item;
          }));
      }, 200);
      return () => { if (progressInterval.current) clearInterval(progressInterval.current); };
  }, []);

  const handleGenerate = async () => {
    const count = Math.max(1, Math.min(4, state.generationCount));
    const newItems: GalleryItem[] = Array.from({ length: count }).map(() => ({
        id: Math.random().toString(36).substr(2, 9),
        status: 'queued',
        timestamp: Date.now(),
        settings: { ...state },
        progress: 0
    }));

    setGallery(prev => [...newItems, ...prev]);
    setActiveJobs(prev => prev + count);
    await Promise.all(newItems.map(item => saveGalleryItem(item)));

    newItems.forEach(async (item) => {
        setGallery(prev => prev.map(g => g.id === item.id ? { ...g, status: 'generating' } : g));
        const generatingItem = { ...item, status: 'generating' as const };
        await saveGalleryItem(generatingItem);

        try {
            // Pass the API key explicitly
            const imageUrl = await generateSingleImage(item.settings, apiKey);
            const successItem: GalleryItem = { ...generatingItem, status: 'success', imageUrl: imageUrl, progress: 100 };
            await saveGalleryItem(successItem);
            setGallery(prev => prev.map(g => g.id === item.id ? successItem : g));
        } catch (err: any) {
            console.error(`Generation failed`, err);
            const errorItem: GalleryItem = { ...generatingItem, status: 'error', error: err.message || 'Generation Failed', progress: 100 };
            await saveGalleryItem(errorItem);
            setGallery(prev => prev.map(g => g.id === item.id ? errorItem : g));
            if (err.message && err.message.includes("Requested entity was not found")) setHasValidKey(false);
        } finally {
            setActiveJobs(prev => Math.max(0, prev - 1));
        }
    });
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `UnReDO-ACID-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemove = async (id: string) => {
      await deleteGalleryItem(id);
      setGallery(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = async () => {
    if (confirm("NUKE DATABASE? THIS CANNOT BE UNDONE.")) {
      await clearGalleryDB();
      setGallery([]);
    }
  };
  
  if (!hasValidKey) {
      return (
          <div className="flex h-screen w-screen bg-[#050505] items-center justify-center relative overflow-hidden font-brand">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9IiMwMDAiLz4KPHBhdGggZD0iTTAgNDBMMTQwIDBoNDB2NDBIMHoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] opacity-20"></div>
              
              <div className="relative bg-black border-4 border-[#FFEA00] p-12 max-w-lg text-center shadow-[10px_10px_0px_#EE4035] transform rotate-1 z-10">
                  <div className="absolute -top-6 -left-6 bg-[#EE4035] text-white font-black px-4 py-2 text-xl rotate-[-10deg] shadow-[4px_4px_0_#000]">
                      ACCESS_DENIED
                  </div>

                  <img 
                    src="https://iamishir.com/wp-content/uploads/2025/11/undo-redo-ai.png" 
                    alt="Logo" 
                    className="h-12 mx-auto mb-8 invert mix-blend-screen"
                  />
                  
                  <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">KEY_MISSING</h1>
                  <p className="text-lg font-mono text-[#AAA] mb-8">
                      Inject a valid <span className="text-[#FFEA00]">API_KEY</span> or <span className="text-[#FFEA00]">GEMINI_API_KEY</span> to breach the mainframe.
                  </p>

                  <div className="space-y-4">
                      {/* Manual Entry for Vercel/Web */}
                      <div className="relative group">
                          <input 
                              type="password"
                              className="w-full bg-[#111] border-2 border-[#333] p-4 text-[#FFEA00] font-mono outline-none focus:border-[#FFEA00] transition-colors"
                              placeholder="ENTER_GEMINI_API_KEY"
                              value={manualKeyInput}
                              onChange={(e) => setManualKeyInput(e.target.value)}
                          />
                          <button 
                              onClick={handleManualKeySubmit}
                              className="w-full mt-2 bg-[#FFEA00] text-black text-lg font-black py-3 border-2 border-black hover:scale-[1.02] transition-transform shadow-[4px_4px_0px_#EE4035]"
                          >
                              ACTIVATE_SESSION
                          </button>
                      </div>

                      <div className="text-xs font-mono text-[#666] pt-4 border-t border-[#333]">
                         OR USE SYSTEM LINK
                      </div>

                      {/* AI Studio Link (Only shows if available or just as fallback action) */}
                      <button 
                        onClick={handleSelectKey}
                        className="w-full bg-[#222] text-white font-mono text-sm py-2 border border-[#333] hover:bg-[#333]"
                      >
                          LAUNCH_KEY_SELECTOR (AI STUDIO)
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden font-brand relative bg-transparent">
      <InputControls 
        state={state} 
        setState={setState} 
        isGenerating={activeJobs > 0} 
        onGenerate={handleGenerate}
        activeJobs={activeJobs}
      />
      <ImageDisplay 
        gallery={gallery}
        onDownload={handleDownload}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default App;
