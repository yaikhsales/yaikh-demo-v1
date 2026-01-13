import React from "react";

const ModuleCard = ({ data, onClick, botVersion = 'default', onBotClick, isDropdownOpen = false, isLightOn = false, isAdministration = false, isOrangeGroup = false, isWhiteGroup = false, theme = 'normal' }) => {
  const isComingSoon = data.status === "coming-soon";

  const handleCardClick = () => {
    if (isComingSoon) return;
    if (botVersion === 'bot-v1' && onBotClick) {
      onBotClick(data);
      return;
    }
    if (onClick) onClick(data);
  };

  const renderIcon = () => {
    if (data.logo) {
      return (
        <div
          className={`text-3xl font-black italic ${
            data.color || "text-green-500"
          }`}
        >
          {data.title === "E-Invoicing"
            ? "Ei"
            : data.title === "YQMS"
            ? "Q"
            : "S"}
        </div>
      );
    }
    if (data.image) {
      return (
        <div className={`relative flex items-center justify-center ${
          isDropdownOpen ? 'w-14 h-14' : 'w-20 h-20 group-hover:w-21 group-hover:h-21'
        } transition-all duration-300`}>
          <img
            src={`/${data.image}`}
            alt={data.title}
            className={`w-full h-full object-contain transition-all duration-300 ${
              isDropdownOpen ? 'rounded-2xl' : 'rounded-3xl'
            }`}
            style={{
              mixBlendMode: isDropdownOpen ? 'normal' : 'screen',
              filter: isDropdownOpen 
                ? 'none' 
                : 'brightness(0.8) contrast(1) saturate(1.00) drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
              WebkitFilter: isDropdownOpen 
                ? 'none' 
                : 'brightness(0.8) contrast(1) saturate(1.00) drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      );
    }
    const IconComponent = data.icon;
    return (
      <IconComponent
        size={32}
        className={`${
          isComingSoon
            ? "text-black"
            : data.color || "text-slate-800"
        }`}
      />
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
            relative group flex flex-col items-center justify-center 
            h-28 w-full transition-all duration-300 cursor-pointer mb-3 overflow-hidden light-effect
            ${isDropdownOpen ? 'rounded-xl' : 'rounded-2xl apple-card'}
            ${isComingSoon 
              ? isDropdownOpen ? "bg-white/90" : theme === 'normal' ? "bg-white/30 backdrop-blur-md border-2 border-white/40" : "glass-effect"
              : isAdministration && !isDropdownOpen
                ? "bg-gradient-to-br from-green-500/30 via-emerald-500/25 to-teal-500/30 backdrop-blur-md border-2 border-green-200/50 hover:border-green-300/60 hover:bg-green-500/35"
                : isOrangeGroup && !isDropdownOpen
                  ? "bg-gradient-to-br from-orange-300/30 via-amber-300/25 to-yellow-500/30 backdrop-blur-md border-2 border-orange-400/50 hover:border-orange-400/60 hover:bg-orange-500/35"
                  : isWhiteGroup && !isDropdownOpen
                    ? "bg-white/90 backdrop-blur-md border-2 border-white/50 hover:border-white/60 hover:bg-white/95"
                    : isDropdownOpen ? "bg-white hover:bg-blue-50" : theme === 'normal' ? "bg-white/35 backdrop-blur-md border-2 border-white/50 hover:border-white/60 hover:bg-white/40" : "glass-effect-strong hover:bg-white/15"
            }
            ${
              data.highlight
                ? isDropdownOpen 
                  ? "border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_22px_rgba(34,211,238,0.55)]"
                : isAdministration && !isDropdownOpen
                  ? "shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_17px_rgba(34,197,94,0.45)]"
                  : isOrangeGroup && !isDropdownOpen
                    ? "shadow-[0_0_15px_rgba(251,146,60,0.4)] hover:shadow-[0_0_17px_rgba(251,146,60,0.45)]"
                    : isWhiteGroup && !isDropdownOpen
                      ? "shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_17px_rgba(255,255,255,0.35)]"
                      : isDropdownOpen
                        ? "border border-transparent hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "border border-white/20 hover:border-white/30 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            }
            ${isLightOn ? 'brightness-110' : ''}
        `}
    >
      {/* Gradient Overlay on Hover - Only when dropdown is closed */}
      {!isDropdownOpen && !isAdministration && !isOrangeGroup && !isWhiteGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/3 group-hover:via-blue-500/3 group-hover:to-purple-500/3 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* Green Gradient Overlay for Administration modules */}
      {!isDropdownOpen && isAdministration && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-300/0 via-emerald-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* Orange Gradient Overlay for QA, Production, DT Sync modules */}
      {!isDropdownOpen && isOrangeGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300/0 via-amber-300/0 to-yellow-500/0 group-hover:from-orange-500/5 group-hover:via-amber-500/5 group-hover:to-yellow-500/5 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* White Gradient Overlay for PRE PRO, Production Materials modules */}
      {!isDropdownOpen && isWhiteGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-gray-100/0 to-white/0 group-hover:from-white/5 group-hover:via-gray-100/5 group-hover:to-white/5 transition-all duration-500 rounded-2xl"></div>
      )}
      
      {/* Inner Content - Hidden for coming soon modules */}
      {!isComingSoon && (
        <div
          className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-300 ${
            isDropdownOpen ? "opacity-100" : "opacity-100 group-hover:scale-[1.02]"
          }`}
        >
          <div className={isDropdownOpen ? "" : "transition-transform duration-300 group-hover:scale-[1.03]"}>
            {renderIcon()}
          </div>

          <span className={`text-center font-bold text-xs px-1 leading-tight line-clamp-2 ${
            isDropdownOpen ? 'text-slate-800' 
            : isWhiteGroup ? 'text-slate-800 drop-shadow-sm' 
            : 'text-white drop-shadow-lg'
          }`}>
            {data.title}
          </span>
        </div>
      )}

      {/* Coming Soon Overlay - Hidden */}
      {/* {isComingSoon && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
          <div className="bg-black/10 absolute inset-0"></div>
          <div
            className="transform -rotate-12 border-2 border-black/80 px-1 py-0.5 text-black font-black text-sm uppercase tracking-tighter opacity-80"
            style={{ mixBlendMode: "multiply" }}
          >
            COMING SOON
          </div>
        </div>
      )} */}

      {/* Active Glow for highlight items */}
      {data.highlight && !isDropdownOpen && !isAdministration && !isOrangeGroup && !isWhiteGroup && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-purple-400/20 animate-pulse pointer-events-none"></div>
      )}
      {/* Green Glow for Administration modules */}
      {isAdministration && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/15 via-emerald-400/15 to-teal-400/15 pointer-events-none"></div>
      )}
      {/* Orange Glow for QA, Production, DT Sync modules */}
      {isOrangeGroup && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-300/15 via-amber-400/15 to-yellow-400/15 pointer-events-none"></div>
      )}
      {/* White Glow for PRE PRO, Production Materials modules */}
      {isWhiteGroup && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-gray-100/10 to-white/10 pointer-events-none"></div>
      )}
      
      {/* Shimmer Effect on Hover - Only when dropdown is closed */}
      {!isComingSoon && !isDropdownOpen && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
