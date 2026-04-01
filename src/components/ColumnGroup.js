import React from 'react';
import ModuleCard from './ModuleCard';
import { useTranslation } from '../translate/TranslationContext';

const ColumnGroup = ({ group, onModuleClick, botVersion = 'default', onBotModuleClick, isDropdownOpen = false, isLightOn = false, isAdministration = false, isOperations = false, theme = 'normal' }) => {
  const { translateModuleTitle } = useTranslation();
  // Check if this group should have orange styling (QA, Production, DT Sync)
  const isOrangeGroup = group.id === 'qa-col' || group.id === 'prod-col' || group.id === 'dtsync-col';
  // Check if this group should have white styling (PRE PRO, Production Materials)
  const isWhiteGroup = group.id === 'prepro-col' || group.id === 'prodmat-col';
  
  return (
    <div className="flex flex-col min-w-[100px] flex-1">
      {/* Sub Label - Always show frame, even if title is empty - Big label size matching QA but rounded */}
      <div className="mb-6 flex justify-center h-[38px] items-center">
        <div className={`w-full text-center py-2 rounded-full uppercase tracking-widest text-sm font-bold h-[38px] flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-slate-800/60 backdrop-blur-md border border-slate-600 shadow-xl' : 'glass-effect-strong shadow-xl hover:shadow-2xl'} ${group.title ? 'text-white' : 'text-transparent'}`}>
            {group.title ? translateModuleTitle(group.title) : ''}
        </div>
      </div>
      
      {/* Vertical Stack of Modules */}
      <div className="flex flex-col gap-1">
        {group.modules.map((mod, idx) => (
          <div 
            key={idx}
            className={isDropdownOpen ? '' : 'apple-fade-in-delay'}
            style={isDropdownOpen ? {} : { 
              animationDelay: `${0.6 + idx * 0.1}s`,
              opacity: 0 
            }}
          >
            <ModuleCard
              data={mod}
              onClick={onModuleClick}
              botVersion={botVersion}
              onBotClick={onBotModuleClick}
              isDropdownOpen={isDropdownOpen}
              isLightOn={isLightOn}
              isAdministration={isAdministration}
              isOrangeGroup={isOrangeGroup}
              isWhiteGroup={isWhiteGroup}
              theme={theme}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnGroup;