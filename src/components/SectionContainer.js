import React from 'react';
import ColumnGroup from './ColumnGroup';

const SectionContainer = ({ section, onModuleClick, onGMChatClick, botVersion = 'default', onBotModuleClick }) => {
  // Central Section (Management Dashboard)
  if (section.isCentral) {
      return (
          <div className="flex flex-col items-center mx-2 w-48 shrink-0">
             {/* GM Bot Icon */}
             <div className="mb-4">
                <button onClick={onGMChatClick} className="rounded-full shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900" aria-label="Open GM Bot Assistant">
                    <img src="/assets/modules-image/top-bot.png" alt="GM Bot Assistant" className="w-16 h-16 rounded-full object-cover border-2 border-purple-400/50" />
                </button>
             </div>

             {/* Big Label */}
             <div className="w-full bg-slate-600/40 backdrop-blur-md border border-slate-500/50 text-white font-bold text-center py-2 rounded-lg mb-6 shadow-lg uppercase tracking-widest text-xs h-[38px] flex items-center justify-center">
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
    <div className="flex flex-col mx-2">
       {/* Big Section Label (Spans all children) */}
       <div className="w-full bg-slate-800/60 backdrop-blur-md border border-slate-600 text-white font-bold text-center py-2 rounded-lg mb-6 shadow-xl uppercase tracking-widest text-sm h-[38px] flex items-center justify-center">
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
            />
          ))}
       </div>
    </div>
  );
};

export default SectionContainer;