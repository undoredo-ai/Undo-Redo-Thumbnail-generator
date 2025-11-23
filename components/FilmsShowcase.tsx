import React, { useState } from 'react';
import { Icons } from './Icon';

interface Film {
  id: string;
  title: string;
  thumbnail: string;
  year: string;
  duration: string;
  category: string;
  description: string;
  videoUrl?: string;
}

interface FilmsShowcaseProps {
  onBack: () => void;
}

const FILMS: Film[] = [
  {
    id: '1',
    title: 'Sample Film 1',
    thumbnail: 'https://placehold.co/400x225/1a1a1a/FFEA00/png?text=Film+1&font=montserrat',
    year: '2024',
    duration: '15:30',
    category: 'Documentary',
    description: 'An amazing documentary about creative AI tools and their impact on content creation.'
  },
  {
    id: '2',
    title: 'Sample Film 2',
    thumbnail: 'https://placehold.co/400x225/1a1a1a/EE4035/png?text=Film+2&font=montserrat',
    year: '2024',
    duration: '22:45',
    category: 'Commercial',
    description: 'A stunning commercial showcasing innovative technology and creative storytelling.'
  },
  {
    id: '3',
    title: 'Sample Film 3',
    thumbnail: 'https://placehold.co/400x225/1a1a1a/FFEA00/png?text=Film+3&font=montserrat',
    year: '2023',
    duration: '18:20',
    category: 'Short Film',
    description: 'A captivating short film exploring the intersection of art and technology.'
  }
];

const FilmsShowcase: React.FC<FilmsShowcaseProps> = ({ onBack }) => {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [hoveredFilm, setHoveredFilm] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-screen bg-black font-brand relative overflow-y-auto">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 234, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 234, 0, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-black via-black to-transparent backdrop-blur-sm border-b-2 border-[#222]">
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-[#FFEA00] hover:text-white transition-colors game-button flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-mono text-sm font-bold">BACK</span>
              </button>
              
              <div className="h-8 w-px bg-[#333]"></div>
              
              <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                <span className="text-[#FFEA00]">UnReDO</span> Films
              </h1>
            </div>

            <div className="flex items-center gap-2 border border-[#333] px-3 py-1 bg-[#111]">
              <div className="w-2 h-2 rounded-full bg-[#EE4035] animate-pulse"></div>
              <span className="text-[10px] font-mono text-white">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        
        {FILMS[0] && (
          <img 
            src={FILMS[0].thumbnail}
            alt="Featured"
            className="w-full h-full object-cover opacity-40"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-block bg-[#EE4035] text-white text-xs font-black px-3 py-1 mb-4">
              FEATURED
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter neon-text">
              Our Latest Work
            </h2>
            <p className="text-sm md:text-lg text-[#AAA] font-mono max-w-2xl mb-6">
              Explore our collection of films, commercials, and creative projects
            </p>
            <button className="bg-[#FFEA00] text-black px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base uppercase border-2 border-black shadow-[4px_4px_0_#EE4035] hover:scale-105 transition-transform game-button">
              ▶ PLAY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Films Grid */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
            <div className="w-1 h-6 bg-[#FFEA00]"></div>
            All Films
          </h3>
          <p className="text-sm text-[#666] font-mono">Browse our complete portfolio</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FILMS.map((film, index) => (
            <div
              key={film.id}
              className="group relative bg-[#0a0a0a] border-2 border-[#222] hover:border-[#FFEA00] transition-all duration-300 cursor-pointer overflow-hidden game-button"
              onMouseEnter={() => setHoveredFilm(film.id)}
              onMouseLeave={() => setHoveredFilm(null)}
              onClick={() => setSelectedFilm(film)}
              style={{
                animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden bg-black relative">
                <img 
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFEA00] flex items-center justify-center border-2 border-black shadow-[0_0_20px_rgba(255,234,0,0.5)]">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-1 border border-[#333]">
                  {film.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1 line-clamp-1">
                  {film.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-[#666] font-mono">
                  <span>{film.year}</span>
                  <span>•</span>
                  <span className="text-[#FFEA00]">{film.category}</span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 border-2 border-[#FFEA00] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[inset_0_0_20px_rgba(255,234,0,0.3)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Film Detail Modal */}
      {selectedFilm && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black border-4 border-[#FFEA00] shadow-[0_0_50px_rgba(255,234,0,0.3)]">
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute -top-4 -right-4 bg-[#EE4035] text-white p-3 border-2 border-black shadow-[4px_4px_0_#000] hover:scale-110 transition-transform z-10"
            >
              <Icons.Close className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-black">
              <img 
                src={selectedFilm.thumbnail}
                alt={selectedFilm.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 border-t-4 border-[#EE4035]">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-3">
                {selectedFilm.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-4 text-sm font-mono">
                <span className="text-[#FFEA00]">{selectedFilm.year}</span>
                <span className="text-[#666]">•</span>
                <span className="text-white">{selectedFilm.duration}</span>
                <span className="text-[#666]">•</span>
                <span className="bg-[#EE4035] text-white px-2 py-0.5 text-xs font-bold">{selectedFilm.category}</span>
              </div>

              <p className="text-sm md:text-base text-[#AAA] font-mono mb-6">
                {selectedFilm.description}
              </p>

              <button className="bg-[#FFEA00] text-black px-8 py-3 font-black text-base uppercase border-2 border-black shadow-[4px_4px_0_#EE4035] hover:scale-105 transition-transform game-button">
                ▶ WATCH NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmsShowcase;
