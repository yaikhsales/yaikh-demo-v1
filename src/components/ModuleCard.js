import React from "react";
import { useTranslation } from '../translate/TranslationContext';

const ModuleCard = ({ data, onClick, botVersion = 'default', onBotClick, isDropdownOpen = false, isLightOn = false, isAdministration = false, isOrangeGroup = false, isWhiteGroup = false, theme = 'normal' }) => {
  const { translateModuleTitle } = useTranslation();
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
          className={`text-3xl font-black italic ${data.color || "text-green-500"
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
      // Display icons in their original colors without any filters
      const iconStyle = {
        mixBlendMode: 'normal',
        filter: 'none',
        WebkitFilter: 'none',
      };

      return (
        <div className={`relative flex items-center justify-center ${isDropdownOpen ? 'w-14 h-14' : 'w-20 h-20 group-hover:w-21 group-hover:h-21'
          } transition-all duration-300`}>
          <img
            src={`/${data.image}`}
            alt={data.title}
            className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 ${isDropdownOpen ? 'rounded-2xl' : 'rounded-3xl'
              }`}
            style={iconStyle}
          />
        </div>
      );
    }
    const IconComponent = data.icon;
    return (
      <IconComponent
        size={32}
        className={`${isComingSoon
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
          ? isDropdownOpen ? "bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 backdrop-blur-md border-2 border-cyan-400" : theme === 'normal' ? "bg-gradient-to-br from-cyan-300/90 via-blue-300/90 to-indigo-300/90 backdrop-blur-md border-2 border-cyan-500/70" : "bg-gradient-to-br from-cyan-300/80 via-blue-300/80 to-indigo-300/80 backdrop-blur-md border-2 border-cyan-500/60"
          : isAdministration && !isDropdownOpen
            ? "bg-blue-700 backdrop-blur-md border-2 border-blue-600 hover:border-blue-500 hover:bg-blue-600"
            : isOrangeGroup && !isDropdownOpen
              ? "bg-gradient-to-br from-green-200 via-green-300 to-emerald-300 backdrop-blur-md border-2 border-green-400 hover:border-green-500 hover:from-green-300 hover:via-green-400 hover:to-emerald-400 shadow-lg"
              : isWhiteGroup && !isDropdownOpen
                ? "bg-gradient-to-br from-slate-200 via-slate-300 to-gray-400 backdrop-blur-md border-2 border-slate-400 hover:border-slate-500 hover:from-slate-300 hover:via-slate-400 hover:to-gray-500 shadow-lg"
                : isDropdownOpen ? "bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 backdrop-blur-md border-2 border-cyan-400 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400" : theme === 'normal' ? "bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 backdrop-blur-md border-2 border-cyan-500 hover:border-cyan-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 shadow-lg" : "bg-gradient-to-br from-cyan-300/90 via-blue-300/90 to-indigo-300/90 backdrop-blur-md border-2 border-cyan-500/70 hover:from-cyan-400/95 hover:via-blue-400/95 hover:to-indigo-400/95"
        }
            ${data.highlight
          ? isDropdownOpen
            ? "border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            : "border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_22px_rgba(34,211,238,0.55)]"
          : isAdministration && !isDropdownOpen
            ? "shadow-[0_0_15px_rgba(29,78,216,0.5)] hover:shadow-[0_0_17px_rgba(29,78,216,0.6)]"
            : isOrangeGroup && !isDropdownOpen
              ? "shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              : isWhiteGroup && !isDropdownOpen
                ? "shadow-[0_0_25px_rgba(71,85,105,0.4)] hover:shadow-[0_0_30px_rgba(71,85,105,0.5)]"
                : isDropdownOpen
                  ? "border border-transparent hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  : "border border-cyan-400/30 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        }
            ${isLightOn ? 'brightness-110' : ''}
        `}
    >
      {/* Gradient Overlay on Hover - Only when dropdown is closed */}
      {!isDropdownOpen && !isAdministration && !isOrangeGroup && !isWhiteGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-blue-400/0 to-indigo-400/0 group-hover:from-cyan-400/15 group-hover:via-blue-400/15 group-hover:to-indigo-400/15 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* Blue Gradient Overlay for Administration modules */}
      {!isDropdownOpen && isAdministration && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-500/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:via-blue-500/10 group-hover:to-blue-600/10 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* Enhanced Green Gradient Overlay for Operations modules */}
      {!isDropdownOpen && isOrangeGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/0 via-green-300/0 to-teal-300/0 group-hover:from-emerald-300/20 group-hover:via-green-400/20 group-hover:to-teal-400/20 transition-all duration-500 rounded-2xl"></div>
      )}
      {/* Slate Gradient Overlay for PRE PRO, Production Materials modules */}
      {!isDropdownOpen && isWhiteGroup && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300/0 via-slate-400/0 to-gray-500/0 group-hover:from-slate-400/20 group-hover:via-slate-500/20 group-hover:to-gray-600/20 transition-all duration-500 rounded-2xl"></div>
      )}

      {/* Inner Content - Hidden for coming soon modules */}
      {!isComingSoon && (
        <div
          className={`relative z-10 flex flex-col items-center gap-1 transition-all duration-300 ${isDropdownOpen ? "opacity-100" : "opacity-100 group-hover:scale-[1.02]"
            }`}
        >
          <div className={isDropdownOpen ? "" : "transition-transform duration-300 group-hover:scale-[1.03]"}>
            {renderIcon()}
          </div>

          <span className={`text-center font-bold text-sm px-1 leading-tight line-clamp-2 ${isDropdownOpen ? 'text-slate-800'
            : isWhiteGroup || isOrangeGroup || (!isAdministration && !isOrangeGroup && !isWhiteGroup) ? 'text-slate-800 drop-shadow-sm'
              : 'text-white drop-shadow-lg'
            }`}>
            {translateModuleTitle(data.title)}
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
      {/* Blue Glow for Administration modules */}
      {isAdministration && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/25 via-blue-500/25 to-blue-600/25 group-hover:from-blue-400/30 group-hover:via-blue-500/30 group-hover:to-blue-600/30 transition-all duration-500 pointer-events-none"></div>
      )}
      {/* Enhanced Green Glow for Operations modules */}
      {isOrangeGroup && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-300/30 via-green-400/30 to-teal-300/30 group-hover:from-emerald-400/35 group-hover:via-green-500/35 group-hover:to-teal-400/35 transition-all duration-500 pointer-events-none"></div>
      )}
      {/* Slate Glow for PRE PRO, Production Materials modules */}
      {isWhiteGroup && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-400/30 via-slate-500/30 to-gray-600/30 group-hover:from-slate-500/35 group-hover:via-slate-600/35 group-hover:to-gray-700/35 transition-all duration-500 pointer-events-none"></div>
      )}
      {/* Cyan/Blue Glow for default modules */}
      {!isAdministration && !isOrangeGroup && !isWhiteGroup && !isDropdownOpen && !isComingSoon && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-300/25 via-blue-300/25 to-indigo-300/25 group-hover:from-cyan-400/30 group-hover:via-blue-400/30 group-hover:to-indigo-400/30 transition-all duration-500 pointer-events-none"></div>
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
