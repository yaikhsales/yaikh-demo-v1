import React from "react";

const ModuleCard = ({ data, onClick, botVersion = 'default', onBotClick }) => {
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
            h-28 w-full rounded-xl transition-all duration-300 cursor-pointer
            ${isComingSoon ? "bg-white/90" : "bg-white hover:bg-blue-50"}
            ${
              data.highlight
                ? "border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                : "border border-transparent hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            }
            mb-3
        `}
    >
      {/* Inner Content */}
      <div
        className={`flex flex-col items-center gap-1 ${
          isComingSoon ? "opacity-40 grayscale" : "opacity-100"
        }`}
      >
        {renderIcon()}

        <span className="text-center font-bold text-slate-800 text-xs px-1 leading-tight line-clamp-2">
          {data.title}
        </span>
      </div>

      {/* Coming Soon Overlay */}
      {isComingSoon && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
          <div className="bg-black/10 absolute inset-0"></div>
          <div
            className="transform -rotate-12 border-2 border-black/80 px-1 py-0.5 text-black font-black text-sm uppercase tracking-tighter opacity-80"
            style={{ mixBlendMode: "multiply" }}
          >
            COMING SOON
          </div>
        </div>
      )}

      {/* Active Glow for highlight items */}
      {data.highlight && (
        <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default ModuleCard;
