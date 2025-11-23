import React from 'react';

interface LandingPageProps {
  onSelectTool: (tool: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTool }) => {
  const tools = [
    {
      id: 'thumbnail-generator',
      name: 'THUMBNAIL GENERATOR',
      description: 'Create high-engagement YouTube thumbnails with AI',
      icon: '🎨',
      image: 'https://iamishir.com/wp-content/uploads/2025/11/IMG_8253-scaled.jpg',
      color: '#FFEA00',
      available: true
    },
    {
      id: 'coming-soon-1',
      name: 'COMING SOON',
      description: 'More AI tools on the way',
      icon: '🚀',
      color: '#666',
      available: false
    },
    {
      id: 'coming-soon-2',
      name: 'COMING SOON',
      description: 'More AI tools on the way',
      icon: '⚡',
      color: '#666',
      available: false
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#050505] font-brand relative overflow-y-auto overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-warp-grid opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9IiMwMDAiLz4KPHBhdGggZD0iTTAgNDBMMTQwIDBoNDB2NDBIMHoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      
      {/* Radial Gradient Spotlight */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFEA00] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EE4035] rounded-full blur-[120px] opacity-20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b-4 border-[#EE4035] bg-black/80 backdrop-blur-sm glow-line">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://iamishir.com/wp-content/uploads/2025/11/undo-redo-ai.png" 
                alt="UnReDO.ai" 
                className="h-10 md:h-12 w-auto object-contain mix-blend-screen"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/180x50/000000/FFEA00/png?text=UnReDO.ai&font=montserrat';
                }}
              />
            </div>
            <div className="flex items-center gap-2 border border-[#333] px-3 py-1 bg-[#111] skew-x-[-10deg] pulse-glow">
              <div className="w-3 h-3 rounded-full bg-[#FFEA00] shadow-[0_0_10px_#FFEA00] animate-pulse"></div>
              <span className="text-[10px] font-mono text-white skew-x-[10deg]">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block bg-[#FFEA00] text-black text-xs md:text-sm font-black px-4 py-1 mb-6 transform -rotate-2 shadow-[4px_4px_0_#EE4035] game-button">
            🎮 AI CREATIVE TOOLS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 uppercase tracking-tighter neon-text">
            Create <span className="text-[#FFEA00]">Magic</span> Now
          </h1>
          <p className="text-base md:text-xl text-[#AAA] font-mono max-w-2xl mx-auto">
            Powerful AI tools to supercharge your creative workflow
          </p>
          
          {/* Stats Bar - Gamified */}
          <div className="flex justify-center gap-4 md:gap-8 mt-8 flex-wrap">
            <div className="bg-black/60 border-2 border-[#FFEA00] px-4 py-2 backdrop-blur-sm">
              <div className="text-[#FFEA00] text-xs font-mono">TOOLS AVAILABLE</div>
              <div className="text-white text-2xl font-black">01</div>
            </div>
            <div className="bg-black/60 border-2 border-[#EE4035] px-4 py-2 backdrop-blur-sm">
              <div className="text-[#EE4035] text-xs font-mono">COMING SOON</div>
              <div className="text-white text-2xl font-black">02</div>
            </div>
            <div className="bg-black/60 border-2 border-[#FFEA00] px-4 py-2 backdrop-blur-sm coin-icon">
              <div className="text-[#FFEA00] text-xs font-mono">STATUS</div>
              <div className="text-white text-2xl font-black">⚡ LIVE</div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className={`group relative bg-black border-4 hex-pattern ${
                tool.available ? 'border-[#FFEA00] cursor-pointer holographic game-button' : 'border-[#333] cursor-not-allowed opacity-60'
              } p-6 md:p-8 transition-all duration-300 ${
                tool.available ? 'hover:scale-105 hover:shadow-[12px_12px_0px_rgba(255,234,0,0.3)] pulse-glow' : ''
              } ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              onClick={() => tool.available && onSelectTool(tool.id)}
            >
              {/* Level Badge */}
              {tool.available && (
                <div className="absolute -top-3 -right-3 bg-[#EE4035] text-white text-xs font-black px-3 py-1 rotate-12 border-2 border-black shadow-[2px_2px_0_#000] z-10">
                  LVL 1
                </div>
              )}

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#EE4035]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#EE4035]"></div>
              
              {/* Scan Line Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFEA00] to-transparent animate-[scan-line_2s_linear_infinite]"></div>
              </div>

              {/* Image or Icon */}
              {tool.image ? (
                <div className="mb-4 overflow-hidden border-2 border-[#333] group-hover:border-[#FFEA00] transition-colors bg-black aspect-video">
                  <img 
                    src={tool.image} 
                    alt={tool.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#AAA] font-mono mb-4">
                {tool.description}
              </p>

              {/* Action Button */}
              {tool.available ? (
                <div className="flex items-center gap-2 text-[#FFEA00] font-bold text-sm group-hover:gap-4 transition-all game-button">
                  <span className="glitch-hover">▶ LAUNCH TOOL</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              ) : (
                <div className="text-[#666] font-bold text-sm flex items-center gap-2">
                  <span className="animate-pulse">🔒</span>
                  COMING SOON
                </div>
              )}

              {/* Hover Effect */}
              {tool.available && (
                <div className="absolute inset-0 bg-[#FFEA00] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-sm text-[#666] font-mono">
            More tools coming soon. Stay tuned for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
