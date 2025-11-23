
import React, { useState } from 'react';
import { UploadedImage, Actor, GeneratorState, AspectRatio } from '../types';
import { Icons } from './Icon';
import { STYLE_PRESETS, AVAILABLE_MODELS } from '../constants';

interface InputControlsProps {
  state: GeneratorState;
  setState: React.Dispatch<React.SetStateAction<GeneratorState>>;
  isGenerating: boolean;
  onGenerate: () => void;
  activeJobs: number;
  onClose?: () => void;
}

const InputControls: React.FC<InputControlsProps> = ({ state, setState, isGenerating, onGenerate, activeJobs, onClose }) => {
  const [infiniteMode, setInfiniteMode] = useState(false);

  const handleTextChange = (field: keyof GeneratorState, value: string | number) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'actor' | 'reference') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        const mimeType = result.split(';')[0].split(':')[1];

        const newImage: UploadedImage = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          previewUrl: result,
          base64Data,
          mimeType
        };

        if (type === 'actor') {
          const newActor: Actor = { ...newImage, emotion: '' };
          setState(prev => ({ ...prev, actors: [...prev.actors, newActor] }));
        } else {
          setState(prev => ({ ...prev, references: [...prev.references, newImage] }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id: string, type: 'actor' | 'reference') => {
    if (type === 'actor') {
      setState(prev => ({ ...prev, actors: prev.actors.filter(a => a.id !== id) }));
    } else {
      setState(prev => ({ ...prev, references: prev.references.filter(r => r.id !== id) }));
    }
  };

  const isProModel = state.modelId === 'gemini-3-pro-image-preview';

  return (
    <div className="flex flex-col h-full bg-black border-r-0 md:border-r-4 border-double border-[#FFEA00] text-white w-full md:w-[500px] shrink-0 z-30 overflow-hidden relative shadow-[20px_0_0_0_rgba(238,64,53,0.1)]">
      
      {/* 1. Sticky Acid Header */}
      <div className="shrink-0 bg-black border-b-4 border-[#EE4035] px-4 md:px-6 py-4 md:py-6 z-50 flex items-center justify-between relative overflow-hidden">
         {/* Moving Gradient Stripe */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFEA00] via-[#EE4035] to-[#FFEA00] animate-[gradient-move_2s_linear_infinite] bg-[length:200%_100%]"></div>

         {/* Logo */}
         <div className="relative group cursor-pointer active:scale-95 transition-transform z-10" onClick={() => window.location.reload()}>
           <div className="absolute inset-0 bg-[#FFEA00] blur-md opacity-0 group-hover:opacity-50 transition-opacity rounded-full"></div>
           <img 
             src="https://iamishir.com/wp-content/uploads/2025/11/undo-redo-ai.png" 
             alt="UnReDO." 
             className="h-[40px] w-auto object-contain relative mix-blend-screen"
             onError={(e) => {
               e.currentTarget.src = 'https://placehold.co/180x50/000000/FFEA00/png?text=ACID.MODE&font=montserrat';
             }}
           />
         </div>
         
         {/* Right side - Status or Close button */}
         <div className="flex items-center gap-2">
           {onClose && (
             <button 
               onClick={onClose}
               className="md:hidden bg-[#EE4035] text-white p-2 border-2 border-black active:scale-95 transition-transform"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           )}
           <div className="hidden md:flex items-center gap-2 border border-[#333] px-2 py-1 bg-[#111] skew-x-[-10deg]">
               <div className={`w-3 h-3 rounded-full ${activeJobs > 0 ? 'bg-[#FFEA00] shadow-[0_0_10px_#FFEA00]' : 'bg-[#333]'} animate-pulse`}></div>
               <span className="text-[10px] font-mono text-white skew-x-[10deg]">SYSTEM.V2</span>
           </div>
         </div>
      </div>

      {/* 2. Scrollable Void */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6 md:space-y-8 relative z-0 pb-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] to-black">
        
        {/* SECTION: SYSTEM CORE */}
        <div className="space-y-2 relative">
           <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-mono text-[#333] whitespace-nowrap tracking-[0.5em]">CPU_THREAD_01</div>
           <div className="bg-[#FFEA00] text-black text-xs font-black inline-block px-2 py-0.5 transform -rotate-1 shadow-[4px_4px_0_#EE4035] mb-2">
             SYSTEM CORE
           </div>
           <div className="relative group brutal-border bg-black">
              <select
                  className="w-full bg-transparent p-4 text-sm text-white font-mono uppercase outline-none appearance-none tracking-widest cursor-pointer"
                  value={state.modelId}
                  onChange={(e) => setState(prev => ({ ...prev, modelId: e.target.value }))}
              >
                  {AVAILABLE_MODELS.map(model => (
                      <option key={model.id} value={model.id} className="bg-black">{model.name}</option>
                  ))}
              </select>
              <div className="absolute right-4 top-4 pointer-events-none text-[#FFEA00] group-hover:rotate-180 transition-transform">
                 <Icons.Refresh className="w-5 h-5 animate-spin-slow" />
              </div>
           </div>
        </div>

        {/* SECTION: ACTION */}
        <div className="space-y-4 relative">
             <div className="bg-[#EE4035] text-white text-xs font-black inline-block px-2 py-0.5 transform rotate-1 shadow-[4px_4px_0_#FFEA00] mb-2">
                ACTION INJECTION
             </div>
             
             <div className="grid grid-cols-3 gap-2 md:gap-4">
                 {[
                   { id: 'actor', label: 'ACTOR', icon: Icons.User, data: state.actors[0], remove: () => removeImage(state.actors[0].id, 'actor'), upload: (e: any) => handleFileUpload(e, 'actor') },
                   { id: 'ref', label: 'REF_IMG', icon: Icons.Image, data: state.references[0], remove: () => removeImage(state.references[0].id, 'reference'), upload: (e: any) => handleFileUpload(e, 'reference') },
                   { id: 'logo', label: 'LOGO', icon: Icons.Star, data: state.references[1], remove: () => removeImage(state.references[1].id, 'reference'), upload: (e: any) => handleFileUpload(e, 'reference') }
                 ].map((slot, i) => (
                    <div key={i} className="aspect-square bg-black border-2 border-dashed border-[#333] active:border-[#FFEA00] md:hover:border-[#FFEA00] md:hover:border-solid transition-all relative group overflow-hidden md:hover:rotate-1 md:hover:scale-105 duration-300">
                        {slot.data ? (
                            <>
                                <img src={slot.data.previewUrl} className="w-full h-full object-cover filter contrast-125 grayscale md:group-hover:grayscale-0 transition-all" alt="upload" />
                                <button onClick={slot.remove} className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 md:group-hover:opacity-100 active:opacity-100 transition-opacity">
                                    <Icons.Trash className="w-5 h-5 md:w-6 md:h-6 text-[#EE4035]" />
                                </button>
                            </>
                        ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-[#333] active:text-[#FFEA00] md:hover:text-[#FFEA00] active:bg-[#111] md:group-hover:bg-[#111]">
                                <slot.icon className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2" />
                                <span className="text-[8px] md:text-[9px] font-mono font-bold tracking-widest">{slot.label}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={slot.upload} />
                            </label>
                        )}
                        {/* Decorative corner */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFEA00]"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#EE4035]"></div>
                    </div>
                 ))}
             </div>
        </div>

        {/* SECTION: JOB_PARAMETERS */}
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="bg-[#FFF] text-black text-xs font-black px-2 py-0.5 -skew-x-12 shadow-[4px_4px_0_#FFEA00]">
                    JOB_PARAMETERS
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FFEA00] to-transparent"></div>
            </div>

            {/* RAW INPUTS */}
            <div className="space-y-6">
                <div className="relative group">
                    <label className="text-[9px] text-[#666] font-mono absolute -top-3 left-0 bg-black px-1 group-focus-within:text-[#FFEA00] transition-colors">SCENE_DATA_STREAM</label>
                    <textarea
                        className="w-full bg-black border-2 border-[#222] p-3 text-sm text-[#FFEA00] font-mono placeholder-[#333] outline-none min-h-[100px] resize-none focus:border-[#FFEA00] focus:shadow-[0_0_15px_rgba(255,234,0,0.2)] transition-all"
                        placeholder="> INITIATE SCENE DESCRIPTION..."
                        value={state.mainPrompt}
                        onChange={(e) => handleTextChange('mainPrompt', e.target.value)}
                    />
                </div>

                <div className="relative group">
                    <label className="text-[9px] text-[#666] font-mono absolute -top-3 left-0 bg-black px-1 group-focus-within:text-[#FFEA00] transition-colors">ENV_CONFIG</label>
                    <input 
                        type="text" 
                        className="w-full bg-black border-b-2 border-[#222] py-2 text-xs text-white font-mono placeholder-[#333] outline-none focus:border-[#EE4035] transition-all"
                        placeholder="> BACKGROUND PARAMETERS..."
                        value={state.backgroundPrompt}
                        onChange={(e) => handleTextChange('backgroundPrompt', e.target.value)}
                    />
                </div>

                <div className="relative group">
                    <label className="text-[9px] text-[#666] font-mono absolute -top-3 left-0 bg-black px-1 group-focus-within:text-[#FFEA00] transition-colors">TEXT_OVERLAY</label>
                    <input 
                        type="text" 
                        className="w-full bg-black border-2 border-[#222] p-4 text-lg font-black text-white placeholder-[#333] outline-none uppercase font-brand focus:border-[#FFF] focus:skew-x-2 transition-all"
                        placeholder="HEADLINE"
                        value={state.headlineText}
                        onChange={(e) => handleTextChange('headlineText', e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* SECTION: OUTPUT_FORMAT */}
        <div className="space-y-4">
            <div className="bg-[#FFEA00] text-black text-xs font-black inline-block px-2 py-0.5 shadow-[4px_4px_0_#FFF] mb-2">
                OUTPUT_FORMAT
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                
                {/* Resolution */}
                <div className="border border-[#333] p-2 hover:border-[#FFEA00] transition-colors">
                    <div className="flex justify-between mb-1">
                         <label className="text-[8px] text-[#666] font-mono uppercase">RES_LIMIT</label>
                         {isProModel && <span className="text-[8px] bg-[#EE4035] text-black font-bold px-1">PRO</span>}
                    </div>
                    <select
                        className={`w-full bg-transparent text-xs font-mono outline-none text-white ${!isProModel && 'opacity-20 cursor-not-allowed'}`}
                        value={state.imageResolution}
                        onChange={(e) => handleTextChange('imageResolution', e.target.value)}
                        disabled={!isProModel}
                    >
                        <option value="1K">1K [1024px]</option>
                        <option value="2K">2K [2048px]</option>
                        <option value="4K">4K [4096px]</option>
                    </select>
                </div>

                {/* Batch Size */}
                <div className="border border-[#333] p-2 hover:border-[#FFEA00] transition-colors">
                    <label className="text-[8px] text-[#666] font-mono uppercase block mb-1">QUANTITY</label>
                    <div className="flex items-center justify-between">
                        <button className="text-[#666] hover:text-white" onClick={() => handleTextChange('generationCount', Math.max(1, state.generationCount - 1))}>[-]</button>
                        <div className="text-[#FFEA00] font-mono font-bold text-lg">{state.generationCount}</div>
                        <button className="text-[#666] hover:text-white" onClick={() => handleTextChange('generationCount', Math.min(4, state.generationCount + 1))}>[+]</button>
                    </div>
                </div>

                {/* Aspect Ratio */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    {[AspectRatio.LANDSCAPE, AspectRatio.PORTRAIT].map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => handleTextChange('aspectRatio', ratio)}
                            className={`h-[50px] font-mono text-xs border-2 transition-all relative overflow-hidden group
                                ${state.aspectRatio === ratio 
                                    ? 'border-[#FFEA00] bg-[#FFEA00]/10 text-[#FFEA00] shadow-[0_0_15px_rgba(255,234,0,0.3)]' 
                                    : 'border-[#333] text-[#666] hover:border-white hover:text-white'
                                }
                            `}
                        >
                            <span className="relative z-10 font-bold">{ratio === AspectRatio.LANDSCAPE ? '16:9' : '9:16'}</span>
                            {/* Scanning line animation for active */}
                            {state.aspectRatio === ratio && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFEA00]/20 to-transparent animate-[shimmer_1s_infinite]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* SECTION: STYLE MATRIX */}
        <div className="space-y-2 pb-10">
            <div className="bg-[#EE4035] text-white text-xs font-black inline-block px-2 py-0.5 shadow-[4px_4px_0_#333]">
                STYLE_MATRIX
            </div>
            <div className="relative border-2 border-[#333] hover:border-[#EE4035] transition-colors bg-black">
                <select
                    className="w-full bg-transparent p-3 text-xs text-white font-mono outline-none appearance-none cursor-pointer"
                    value={state.stylePreset}
                    onChange={(e) => handleTextChange('stylePreset', e.target.value)}
                >
                    {STYLE_PRESETS.map((style, i) => (
                        <option key={i} value={style}>{style}</option>
                    ))}
                </select>
                <div className="absolute top-0 right-0 h-full w-8 bg-[#EE4035] flex items-center justify-center pointer-events-none">
                     <Icons.Wand2 className="w-4 h-4 text-black" />
                </div>
            </div>
        </div>

      </div>

      {/* 3. Sticky Button */}
      <div className="shrink-0 p-3 md:p-4 bg-black border-t-4 border-double border-[#333] z-50 relative">
        <button
          onClick={onGenerate}
          disabled={!state.mainPrompt}
          className={`w-full h-[50px] md:h-[60px] flex items-center justify-center gap-2 font-black text-base md:text-lg uppercase tracking-widest transition-all transform active:scale-95 active:rotate-1 relative group overflow-hidden
            ${!state.mainPrompt 
              ? 'bg-[#222] text-[#555] cursor-not-allowed border-2 border-[#333]' 
              : 'bg-[#FFEA00] text-black border-2 border-[#FFEA00] md:hover:bg-white md:hover:border-white shadow-[6px_6px_0px_#EE4035]'
            }`}
        >
          {activeJobs > 0 ? (
             <span className="animate-pulse">PROCESSING...</span>
          ) : (
            <>
              <span className="relative z-10 mix-blend-multiply">INITIATE</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300"></div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputControls;
