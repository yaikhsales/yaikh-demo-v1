import React from 'react';
import ColumnGroup from './ColumnGroup';
import { useTranslation } from '../translate/TranslationContext';

const SectionContainer = ({ section, onModuleClick, onGMChatClick, botVersion = 'default', onBotModuleClick, isDropdownOpen = false, isLightOn = false, theme = 'normal' }) => {
  const { translateModuleTitle, t } = useTranslation();
  // Central Section (Management Dashboard)
  if (section.isCentral) {
      return (
          <div className={`relative flex flex-col items-center mx-2 w-48 shrink-0 ${isDropdownOpen ? '' : 'apple-fade-in-delay'}`}>
             {/* GM Bot Icon - Positioned absolutely at the top, doesn't affect label position */}
             <div className="absolute -top-24 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2">
                {!isDropdownOpen && <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl group-hover:bg-purple-400/30 transition-all duration-500 scale-150"></div>}
                <button onClick={onGMChatClick} className={`relative rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isDropdownOpen ? 'shadow-lg' : 'shadow-2xl hover:shadow-purple-500/50'}`} aria-label="Open GM Bot Assistant">
                    <img src="/assets/modules-image/top-bot.png" alt="GM Bot Assistant" className={`w-16 h-16 rounded-full object-cover border-2 border-purple-400/50 transition-all duration-300 ${isDropdownOpen ? '' : 'group-hover:border-purple-300'}`} />
                </button>
                <div className="text-white font-semibold text-sm text-center drop-shadow-lg">
                    My AI Agent
                </div>
             </div>

             {/* Big Label - Aligned at same level as other sections */}
             <div className={`w-full text-white font-black text-center py-2.5 rounded-xl mb-8 uppercase tracking-[0.25em] text-sm h-[42px] flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-slate-700/40 backdrop-blur-md border border-slate-500/50' : 'bg-gradient-to-r from-[#F59E0B]/10 via-[#F59E0B]/30 to-[#F59E0B]/10 border border-[#F59E0B]/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]'}`}>
                {translateModuleTitle(section.title)}
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
                            theme={theme}
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
  const isAdministration = section.id === 'admin-section';
  
  return (
    <div className={`flex flex-col mx-2 ${isDropdownOpen ? '' : 'apple-fade-in-delay-2'}`}>
       {/* Big Section Label (Spans all children) */}
       <div className={`w-full text-white font-black text-center py-2.5 rounded-xl mb-4 uppercase tracking-[0.3em] text-sm h-[42px] flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-slate-800/60 backdrop-blur-md border border-slate-600' : 'bg-white/10 backdrop-blur-[2px] border border-white/20 shadow-2xl relative overflow-hidden'}`}>
          {translateModuleTitle(section.title)}
          {/* TOP BRIGHT LINE SHIMMER */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
       </div>
       
       {/* HORIZONTAL CONNECTOR LINE - AS SEEN IN IMAGE 1 */}
       <div className="relative mb-2 px-10">
          <div className={`h-[1px] w-full ${isAdministration ? 'bg-gradient-to-r from-transparent via-white/50 to-white/50' : 'bg-gradient-to-r from-white/50 via-white/50 to-transparent'}`} />
          {/* Vertical ticks for each group? For now just the line as Image 1 shows a continuous line. */}
       </div>
       
       {/* Container for Columns */}
       <div className="flex gap-3 items-start">
          {section.groups.map(group => (
            <ColumnGroup
                key={group.id}
                group={group}
                onModuleClick={onModuleClick}
                botVersion={botVersion}
                onBotModuleClick={onBotModuleClick}
                isDropdownOpen={isDropdownOpen}
                isLightOn={isLightOn}
                isAdministration={isAdministration}
                theme={theme}
            />
          ))}
       </div>
    </div>
  );
};

export default SectionContainer;