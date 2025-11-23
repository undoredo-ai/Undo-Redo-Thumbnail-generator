import React from 'react';
import ReactDOM from 'react-dom';
import { Icons } from './Icon';

interface StyleOption {
  name: string;
  description: string;
  example: string;
  features: string[];
}

interface StyleSelectorProps {
  currentStyle: string;
  onSelect: (style: string) => void;
  onClose: () => void;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    name: "None (No Style Applied)",
    description: "Generate without any specific style constraints",
    example: "https://placehold.co/400x225/1a1a1a/FFEA00/png?text=Custom+Style&font=montserrat",
    features: ["Full creative control", "No preset limitations", "Custom styling"]
  },
  {
    name: "Mr. Beast Style (High Saturation, Shocked, Big Text)",
    description: "High-energy, attention-grabbing thumbnails",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935877535-scaled.jpg",
    features: ["High saturation colors", "Shocked expressions", "Bold text overlays", "Vibrant backgrounds"]
  },
  {
    name: "Vlogger Reaction (Close-up, Blur Background, Emoji)",
    description: "Personal, relatable reaction-style thumbnails",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935903634-scaled.jpg",
    features: ["Close-up faces", "Blurred backgrounds", "Emoji elements", "Expressive reactions"]
  },
  {
    name: "Gaming Cinematic (Dark, Neon, Action-Oriented)",
    description: "Epic gaming thumbnails with cinematic feel",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935911299-scaled.jpg",
    features: ["Dark atmosphere", "Neon accents", "Action poses", "Dramatic lighting"]
  },
  {
    name: "Minimalist Aesthetic (Clean, Pastel, Typography-Focus)",
    description: "Clean and modern minimalist design",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935918565-scaled.jpg",
    features: ["Clean layouts", "Pastel colors", "Typography focus", "Negative space"]
  },
  {
    name: "Tech Review (Sharp, Clean Lighting, Product Focus)",
    description: "Professional tech and product reviews",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935924996-scaled.jpg",
    features: ["Sharp details", "Clean lighting", "Product focus", "Professional look"]
  },
  {
    name: "Horror/Mystery (Dark, Grainy, Vignette)",
    description: "Spooky and mysterious atmosphere",
    example: "https://iamishir.com/wp-content/uploads/2025/11/UnReDO-ACID-1763935928557-scaled.jpg",
    features: ["Dark tones", "Grainy texture", "Vignette effect", "Eerie atmosphere"]
  }
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ currentStyle, onSelect, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  // Use portal to render at document body level
  const modalContent = (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${
        isClosing ? 'animate-out fade-out zoom-out duration-300' : 'backdrop-enter'
      }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 234, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 234, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }}></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFEA00] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#EE4035] rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`relative w-full max-w-7xl bg-black/95 border-4 border-[#FFEA00] shadow-[0_0_50px_rgba(255,234,0,0.3)] max-h-[90vh] overflow-hidden flex flex-col ${
        isClosing ? 'scale-95 opacity-0 transition-all duration-300' : 'modal-enter'
      }`}>
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-r from-black via-[#0a0a0a] to-black border-b-4 border-[#EE4035] p-3 md:p-4 relative overflow-hidden">
          {/* Animated Scan Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFEA00] to-transparent animate-[scan-line_3s_linear_infinite]"></div>
          
          {/* Glitch Effect Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#FFEA00_2px,#FFEA00_4px)]"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 md:h-10 bg-[#FFEA00] shadow-[0_0_10px_#FFEA00]"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter neon-text">
                  STYLE_MATRIX
                </h2>
                <p className="text-[10px] md:text-xs text-[#AAA] font-mono">Choose your template</p>
              </div>
            </div>
            
            <button 
              onClick={handleClose}
              className="text-white hover:text-[#EE4035] transition-colors p-2 game-button hover:rotate-90"
            >
              <Icons.Close className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Styles Grid - Spacious Layout */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {STYLE_OPTIONS.map((style, index) => (
              <div
                key={index}
                onClick={() => {
                  onSelect(style.name);
                  handleClose();
                }}
                className={`group relative bg-[#0a0a0a] border-3 transition-all duration-200 cursor-pointer overflow-hidden rounded-sm ${
                  currentStyle === style.name
                    ? 'border-[#FFEA00] ring-4 ring-[#FFEA00] ring-opacity-30 scale-105'
                    : 'border-[#333] hover:border-[#FFEA00] hover:scale-102'
                } grid-item-enter`}
                style={{
                  animationDelay: `${0.1 + index * 0.05}s`
                }}
              >
                {/* Selected Badge */}
                {currentStyle === style.name && (
                  <div className="absolute top-2 right-2 bg-[#FFEA00] text-black text-[10px] font-black px-2 py-1 z-10 shadow-lg">
                    ✓ ACTIVE
                  </div>
                )}

                {/* Thumbnail Image */}
                <div className="aspect-video w-full bg-black overflow-hidden">
                  <img 
                    src={style.example} 
                    alt={style.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight line-clamp-2">
                    {style.name.split('(')[0].trim()}
                  </h3>
                </div>

                {/* Hover Overlay with Details */}
                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-center">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2">
                    {style.name.split('(')[0].trim()}
                  </h3>
                  <p className="text-[10px] text-[#AAA] font-mono mb-2 line-clamp-2">
                    {style.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {style.features.slice(0, 3).map((feature, i) => (
                      <span 
                        key={i}
                        className="text-[8px] bg-[#FFEA00] text-black px-1.5 py-0.5 font-mono font-bold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 bg-gradient-to-r from-black via-[#0a0a0a] to-black border-t-2 border-[#222] p-2 md:p-3 text-center">
          <p className="text-[10px] md:text-xs text-[#555] font-mono">
            Click to select • ESC to close
          </p>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to escape sidebar constraints
  return ReactDOM.createPortal(modalContent, document.body);
};

export default StyleSelector;
