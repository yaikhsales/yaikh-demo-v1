import React from 'react';
import ColumnGroup from './ColumnGroup';

const SectionContainer = ({ section, onModuleClick, onGMChatClick, botVersion = 'default', onBotModuleClick, isDropdownOpen = false, isLightOn = false }) => {
  // Central Section (Management Dashboard)
  if (section.isCentral) {
      return (
          <div className={`flex flex-col items-center mx-2 w-48 shrink-0 ${isDropdownOpen ? '' : 'apple-fade-in-delay'}`}>
             {/* GM Bot Icon */}
             <div className="mb-4 relative group">
                {!isDropdownOpen && <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl group-hover:bg-purple-400/30 transition-all duration-500 scale-150"></div>}
                <button onClick={onGMChatClick} className={`relative rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isDropdownOpen ? 'shadow-lg' : 'shadow-2xl hover:shadow-purple-500/50'}`} aria-label="Open GM Bot Assistant">
                    <img src="/assets/modules-image/top-bot.png" alt="GM Bot Assistant" className={`w-16 h-16 rounded-full object-cover border-2 border-purple-400/50 transition-all duration-300 ${isDropdownOpen ? '' : 'group-hover:border-purple-300'}`} />
                </button>
             </div>

             {/* Big Label */}
             <div className={`w-full text-white font-bold text-center py-2 rounded-lg mb-6 uppercase tracking-widest text-xs h-[38px] flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-slate-600/40 backdrop-blur-md border border-slate-500/50 shadow-lg' : 'glass-effect rounded-2xl shadow-xl hover:shadow-2xl'}`}>
                {section.title}
             </div>
             
             {/* Column or Separator */}
             {section.groups && section.groups.length > 0 ? (
                 <div className="w-full">
                    {section.groups.map(group => (
                        <ColumnGroup
                            key={group.id}
                            group={group}
                            onModuleClick={onModuleClick}
                            botVersion={botVersion}
                            onBotModuleClick={onBotModuleClick}
                            isDropdownOpen={isDropdownOpen}
                            isLightOn={isLightOn}
                        />
                    ))}
                 </div>
             ) : (
                <div className="h-full w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
             )}
          </div>
      );
  }

  // Regular Sections (Admin, Ops)
  return (
    <div className={`flex flex-col mx-2 ${isDropdownOpen ? '' : 'apple-fade-in-delay-2'}`}>
       {/* Big Section Label (Spans all children) */}
       <div className={`w-full text-white font-bold text-center py-2 rounded-lg mb-6 uppercase tracking-widest text-sm h-[38px] flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-slate-800/60 backdrop-blur-md border border-slate-600 shadow-xl' : 'glass-effect-strong rounded-2xl shadow-xl hover:shadow-2xl'}`}>
          {section.title}
       </div>
       
       {/* Container for Columns */}
       <div className="flex gap-3">
          {section.groups.map(group => (
            <ColumnGroup
                key={group.id}
                group={group}
                onModuleClick={onModuleClick}
                botVersion={botVersion}
                onBotModuleClick={onBotModuleClick}
                isDropdownOpen={isDropdownOpen}
                isLightOn={isLightOn}
            />
          ))}
       </div>
    </div>
  );
};

export default SectionContainer;