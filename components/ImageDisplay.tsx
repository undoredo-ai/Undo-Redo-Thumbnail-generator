
import React, { useState } from 'react';
import { Icons } from './Icon';
import { GalleryItem, AspectRatio } from '../types';

interface ImageDisplayProps {
  gallery: GalleryItem[];
  onDownload: (imageUrl: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const ImageCard: React.FC<{ item: GalleryItem; onClick: () => void; onDownload: (url: string) => void; onRemove: (id: string) => void }> = ({ item, onClick, onDownload, onRemove }) => {
    const arClass = item.settings.aspectRatio === AspectRatio.PORTRAIT ? 'aspect-[9/16]' : 'aspect-video';

    return (
        <div 
            className={`group relative bg-[#111] border-2 border-[#333] active:border-[#FFEA00] md:hover:border-[#FFEA00] transition-all duration-300 ${arClass} md:hover:-translate-y-1 md:hover:shadow-[8px_8px_0px_rgba(255,234,0,0.2)]`}
        >
            {/* Status Overlays */}
            {(item.status === 'generating' || item.status === 'queued') && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 overflow-hidden">
                    {/* Trippy Scan Effect */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#FFEA00_2px,#FFEA00_4px)] opacity-10 animate-[scanline_0.5s_linear_infinite]"></div>
                    <div className="z-10 bg-[#FFEA00] text-black font-black text-xl px-4 py-2 rotate-2 animate-bounce shadow-[4px_4px_0_#FFF]">
                        {item.status === 'queued' ? 'WAIT' : 'COOKING'}
                    </div>
                    <div className="mt-4 font-mono text-[#EE4035] text-xs animate-pulse tracking-widest">
                        LOADING ASSETS...
                    </div>
                </div>
            )}

            {item.status === 'error' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a0505] z-10 border-4 border-[#EE4035] p-4">
                    <Icons.Alert className="w-12 h-12 text-[#EE4035] mb-2 animate-ping" />
                    <span className="bg-[#EE4035] text-white px-2 py-1 font-mono text-xs uppercase font-bold rotate-[-2deg] mb-2">SYSTEM_CRASH</span>
                    {item.error && (
                        <p className="text-[#EE4035] text-[10px] font-mono text-center px-2 max-h-20 overflow-y-auto">
                            {item.error}
                        </p>
                    )}
                    <button onClick={() => onRemove(item.id)} className="absolute top-2 right-2 text-[#EE4035] active:text-white md:hover:text-white">
                        <Icons.Trash className="w-5 h-5" />
                    </button>
                </div>
            )}

            {item.status === 'success' && item.imageUrl && (
                <>
                    <img 
                        src={item.imageUrl} 
                        alt="Generated" 
                        className="w-full h-full object-cover cursor-pointer md:hover:contrast-125 transition-all"
                        onClick={onClick}
                    />
                    
                    {/* Hover Actions - Sticker Style */}
                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity md:translate-y-2 md:group-hover:translate-y-0">
                        <button onClick={(e) => { e.stopPropagation(); onDownload(item.imageUrl!); }} className="bg-[#FFEA00] text-black p-2 border-2 border-black active:bg-white active:scale-110 md:hover:bg-white md:hover:scale-110 transition-transform shadow-[4px_4px_0_#000]">
                            <Icons.Download className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} className="bg-[#EE4035] text-white p-2 border-2 border-black active:bg-black active:scale-110 md:hover:bg-black md:hover:scale-110 transition-transform shadow-[4px_4px_0_#000]">
                            <Icons.Trash className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-mono px-2 py-0.5 border border-[#333]">
                        {item.settings.imageResolution}
                    </div>
                </>
            )}
        </div>
    );
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ gallery, onDownload, onRemove, onClearAll }) => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  return (
    <div className="flex-1 h-full relative flex flex-col font-brand z-10 overflow-hidden">
      
      {/* Header */}
      <div className="h-[80px] md:h-[100px] flex items-end justify-between px-4 md:px-8 pb-3 md:pb-4 shrink-0 z-20">
         <div className="relative">
             <div className="hidden md:block absolute -top-6 -left-4 text-[100px] font-black text-[#111] select-none pointer-events-none -z-10 leading-none">GALLERY</div>
             <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter drop-shadow-[4px_4px_0_#EE4035]">
                OUTPUT_ZONE
             </h2>
             <div className="flex gap-2 md:gap-4 mt-1">
                 <span className="bg-[#333] text-white text-[9px] md:text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#555]">
                    TOTAL: {gallery.length}
                 </span>
             </div>
         </div>

         {gallery.length > 0 && (
            <button 
                onClick={onClearAll}
                className="group relative px-3 md:px-6 py-2 bg-transparent border-2 border-[#EE4035] text-[#EE4035] active:bg-[#EE4035] active:text-white md:hover:bg-[#EE4035] md:hover:text-white transition-all font-mono text-[10px] md:text-xs font-bold uppercase overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-1 md:gap-2"><Icons.Trash className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">NUKE_DB</span><span className="sm:hidden">CLEAR</span></span>
                <div className="absolute inset-0 bg-[#EE4035] translate-x-[-100%] md:group-hover:translate-x-0 transition-transform"></div>
            </button>
         )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        {gallery.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center space-y-4 md:space-y-6 opacity-50">
              <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-dashed border-[#333] rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <Icons.Image className="w-12 h-12 md:w-16 md:h-16 text-[#333]" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#333] tracking-widest animate-pulse">VOID_DETECTED</h3>
           </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 pb-20">
                {gallery.map((item, i) => (
                    <div key={item.id} className={`${i % 2 === 0 ? 'translate-y-0' : 'md:translate-y-8'}`}>
                        <ImageCard 
                            item={item} 
                            onClick={() => item.status === 'success' && setLightboxItem(item)}
                            onDownload={onDownload}
                            onRemove={onRemove}
                        />
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Lightbox - Trippy Portal */}
      {lightboxItem && lightboxItem.imageUrl && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
              
              {/* Animated Background Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden">
                  <div className="w-[80vw] h-[80vw] border-[10px] md:border-[20px] border-[#FFEA00] rounded-full animate-[ping_3s_linear_infinite]"></div>
                  <div className="absolute w-[60vw] h-[60vw] border-[10px] md:border-[20px] border-[#EE4035] rounded-full animate-[ping_3s_linear_infinite_0.5s]"></div>
              </div>

              <button 
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 md:top-8 right-4 md:right-8 text-white active:text-[#EE4035] md:hover:text-[#EE4035] md:hover:rotate-90 transition-all transform scale-125 md:scale-150 z-50"
              >
                  <Icons.Close className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <div className="relative max-w-[90vw] max-h-[85vh] z-10 group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFEA00] to-[#EE4035] blur-lg opacity-50 md:group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <img 
                      src={lightboxItem.imageUrl} 
                      alt="Full" 
                      className="relative border-2 md:border-4 border-black shadow-[0_0_50px_rgba(0,0,0,1)] max-h-[70vh] md:max-h-[80vh]"
                  />
                  
                  <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4">
                      <button onClick={() => onDownload(lightboxItem.imageUrl!)} className="bg-[#FFEA00] text-black px-4 md:px-8 py-2 md:py-3 font-black text-base md:text-xl active:scale-110 md:hover:scale-110 transition-transform shadow-[4px_4px_0_#000] border-2 border-black">
                          DOWNLOAD
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default ImageDisplay;
