import React, { useState } from 'react';

interface UndoRedoFilmsProps {
  onBack: () => void;
}

interface Film {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  category: string;
}

const UndoRedoFilms: React.FC<UndoRedoFilmsProps> = ({ onBack }) => {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async (filmId: string) => {
    const filmUrl = `${window.location.origin}${window.location.pathname}?film=${filmId}`;
    
    try {
      await navigator.clipboard.writeText(filmUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = filmUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Add your YouTube video IDs here
  const films: Film[] = [
    {
      id: '1',
      title: 'Daur-Ep:1 Discovery',
      description: 'In the sleepless heart of Mumbai, a young woman stumbles upon a strange new app that blurs the line between myth and reality. As ancient symbols awaken and the city\'s shadows twist into something divine, Aanya realizes she hasn\'t just opened an app—she\'s opened a portal between worlds.',
      youtubeId: 'za1dXTPkQVo',
      thumbnail: 'https://iamishir.com/wp-content/uploads/2025/11/daur-ep-1-thumbnail.png',
      category: 'Sci-Fi'
    },
    {
      id: '2',
      title: 'Coming Soon',
      description: 'More AI-generated films coming soon. Stay tuned!',
      youtubeId: '',
      thumbnail: 'https://placehold.co/360x640/111111/FFEA00/png?text=COMING+SOON&font=montserrat',
      category: 'Drama'
    },
    {
      id: '3',
      title: 'Coming Soon',
      description: 'More AI-generated films coming soon. Stay tuned!',
      youtubeId: '',
      thumbnail: 'https://placehold.co/360x640/111111/FFEA00/png?text=COMING+SOON&font=montserrat',
      category: 'Experimental'
    },
    // Add more films as needed
  ];

  const categories = ['All', ...Array.from(new Set(films.map(f => f.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFilms = activeCategory === 'All' 
    ? films 
    : films.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen w-screen bg-[#050505] font-brand relative overflow-y-auto overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-warp-grid opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-[#EE4035]/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Home Button - Floating */}
      <button
        onClick={onBack}
        className="fixed bottom-6 left-6 md:top-6 md:bottom-auto md:left-auto md:right-6 z-[60] w-14 h-14 md:w-12 md:h-12 rounded-full bg-black border-4 border-[#FFEA00] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        style={{
          boxShadow: '0 0 20px rgba(255, 234, 0, 0.6), 0 0 40px rgba(238, 64, 53, 0.4)'
        }}
        aria-label="Back to home"
      >
        <svg 
          className="w-6 h-6 md:w-5 md:h-5 text-[#FFEA00] group-hover:text-white transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>

      {/* Header - Netflix Style */}
      <div className="relative z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl md:text-4xl">🎬</div>
                <h1 className="text-xl md:text-2xl font-black text-[#FFEA00] uppercase tracking-tight neon-text">
                  UNDO REDO FILMS
                </h1>
              </div>
              
              {/* Category Navigation */}
              <nav className="hidden md:flex items-center gap-4 ml-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-bold transition-colors ${
                      activeCategory === cat 
                        ? 'text-[#FFEA00]' 
                        : 'text-[#AAA] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>


          </div>

          {/* Mobile Category Navigation */}
          <div className="md:hidden flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-3 py-1 border-2 whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#FFEA00] text-black border-[#FFEA00]' 
                    : 'bg-black text-[#AAA] border-[#333] hover:border-[#FFEA00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-block bg-[#EE4035] text-white text-xs font-black px-3 py-1 mb-4 transform -rotate-1 shadow-[3px_3px_0_#FFEA00]">
            🎥 AI-POWERED CINEMA
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 uppercase tracking-tighter">
            Our <span className="text-[#EE4035]">AI Films</span> Collection
          </h2>
          <p className="text-sm md:text-base text-[#AAA] font-mono max-w-2xl">
            Explore cutting-edge AI-generated films in stunning 9:16 vertical format
          </p>
        </div>

        {/* Films Grid - Netflix Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              onClick={() => film.youtubeId && setSelectedFilm(film)}
              className={`group transform transition-all duration-300 hover:scale-105 hover:z-10 ${film.youtubeId ? 'cursor-pointer' : 'cursor-default opacity-75'}`}
            >
              <div className="relative aspect-[9/16] bg-black border-2 border-[#333] overflow-hidden group-hover:border-[#FFEA00] transition-colors">
                {/* Thumbnail */}
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/360x640/111111/FFEA00/png?text=' + encodeURIComponent(film.title);
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#FFEA00] flex items-center justify-center border-2 border-black">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-white text-xs font-bold text-center line-clamp-2">
                      {film.title}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-[#EE4035] text-white text-[10px] font-black px-2 py-1 border border-black">
                  {film.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFilms.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-[#666] font-mono">No films in this category yet</p>
          </div>
        )}
      </div>

      {/* Film Modal - Instagram Style with Futuristic Animations */}
      {selectedFilm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(238, 64, 53, 0.15) 0%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            animation: 'modalBackdrop 0.5s ease-out forwards'
          }}
          onClick={() => setSelectedFilm(null)}
        >
          {/* Animated Glow Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255, 234, 0, 0.4) 0%, rgba(238, 64, 53, 0.3) 50%, transparent 70%)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(238, 64, 53, 0.3) 0%, rgba(255, 234, 0, 0.2) 50%, transparent 70%)',
                animation: 'pulse 4s ease-in-out infinite reverse'
              }}
            />
          </div>

          <div 
            className="relative w-full max-w-6xl h-[90vh] bg-black/90 backdrop-blur-xl border-4 border-[#FFEA00] flex flex-col md:flex-row overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(255, 234, 0, 0.5), 0 0 100px rgba(238, 64, 53, 0.3), inset 0 0 60px rgba(255, 234, 0, 0.1)',
              animation: 'modalSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#EE4035] text-white rounded-full flex items-center justify-center border-2 border-black hover:bg-[#FFEA00] hover:text-black transition-all shadow-[4px_4px_0_#000]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Side - Video Player (9:16) */}
            <div className="flex-shrink-0 bg-black flex items-center justify-center h-[50vh] md:h-full w-full md:max-w-[450px]">
              <div className="relative w-full h-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedFilm.youtubeId}?autoplay=1`}
                  title={selectedFilm.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right Side - Film Info & Story */}
            <div className="flex-1 bg-[#0a0a0a] md:border-l-4 border-t-4 md:border-t-0 border-[#333] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-4 md:p-6 border-b-2 border-[#333]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#FFEA00] overflow-hidden bg-black">
                    <img 
                      src="https://iamishir.com/wp-content/uploads/2025/11/undo-redo-logo.jpg" 
                      alt="Undo Redo Films"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
                      {selectedFilm.title}
                    </h3>
                    <p className="text-xs text-[#666] font-mono">UNDO REDO FILMS</p>
                  </div>
                </div>
                <span className="inline-block bg-[#EE4035] text-white text-xs font-black px-3 py-1 border border-black">
                  {selectedFilm.category}
                </span>
              </div>

              {/* Story/Description - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                <div className="space-y-6">
                  {/* Main Description */}
                  <div>
                    <h4 className="text-sm font-black text-[#FFEA00] uppercase mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#FFEA00]"></span>
                      STORY
                    </h4>
                    <p className="text-sm md:text-base text-[#CCC] font-mono leading-relaxed">
                      {selectedFilm.description}
                    </p>
                  </div>

                  {/* Additional Info Sections */}
                  <div>
                    <h4 className="text-sm font-black text-[#FFEA00] uppercase mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#FFEA00]"></span>
                      PRODUCTION
                    </h4>
                    <div className="space-y-2 text-sm text-[#AAA] font-mono">
                      <div className="flex justify-between border-b border-[#222] pb-2">
                        <span className="text-[#666]">Format:</span>
                        <span className="text-white">9:16 Vertical</span>
                      </div>
                      <div className="flex justify-between border-b border-[#222] pb-2">
                        <span className="text-[#666]">Technology:</span>
                        <span className="text-white">AI-Generated</span>
                      </div>
                      <div className="flex justify-between border-b border-[#222] pb-2">
                        <span className="text-[#666]">Studio:</span>
                        <span className="text-white">Undo Redo Films</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-sm font-black text-[#FFEA00] uppercase mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#FFEA00]"></span>
                      TAGS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['AI Film', 'Short Film', selectedFilm.category, 'Vertical Video'].map((tag, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-[#1a1a1a] text-[#FFEA00] px-3 py-1 border border-[#333] font-mono"
                        >
                          #{tag.replace(' ', '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-[#EE4035]/20 to-[#FFEA00]/20 border-2 border-[#FFEA00] p-4">
                    <p className="text-xs md:text-sm text-white font-mono mb-3">
                      Want to create your own AI film? Get in touch with us!
                    </p>
                    <a 
                      href="mailto:hello@undoredo.ai"
                      className="block w-full bg-[#FFEA00] text-black text-sm font-black py-2 px-4 border-2 border-black hover:bg-[#EE4035] hover:text-white transition-all shadow-[4px_4px_0_#000] active:scale-95 text-center"
                    >
                      CONTACT US →
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t-2 border-[#333] bg-black">
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => handleShare(selectedFilm.id)}
                    className="flex items-center gap-2 text-[#AAA] hover:text-[#FFEA00] transition-colors group"
                  >
                    {copySuccess ? (
                      <>
                        <svg className="w-6 h-6 text-[#FFEA00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-mono text-[#FFEA00]">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-sm font-mono">Share Film</span>
                      </>
                    )}
                  </button>
                  <a 
                    href={`https://youtube.com/watch?v=${selectedFilm.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm bg-[#EE4035] text-white font-black px-4 py-2 border-2 border-black hover:bg-[#FFEA00] hover:text-black transition-all"
                  >
                    WATCH ON YOUTUBE →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UndoRedoFilms;
