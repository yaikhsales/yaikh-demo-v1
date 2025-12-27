import React from 'react';
import ModuleCard from './ModuleCard';

const ColumnGroup = ({ group, onModuleClick, botVersion = 'default', onBotModuleClick, isDropdownOpen = false, isLightOn = false, isAdministration = false, isOperations = false, theme = 'normal' }) => {
  // Check if this group should have orange styling (QA, Production, DT Sync)
  const isOrangeGroup = group.id === 'qa' || group.id === 'prod' || group.id === 'dtsync';
  // Check if this group should have white styling (PRE PRO, Production Materials)
  const isWhiteGroup = group.id === 'prepro' || group.id === 'prodmat';
  
  return (
    <div className="flex flex-col min-w-[100px] flex-1">
      {/* Sub Label (Only show if title exists) */}
      {group.title && (
          <div className="mb-3 flex justify-center">
            <div className={`text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-center w-full max-w-[120px] transition-all duration-300 ${isDropdownOpen ? 'bg-slate-700/60 backdrop-blur-sm border border-slate-500 shadow-lg' : 'glass-effect shadow-lg hover:shadow-xl'}`}>
                {group.title}
            </div>
          </div>
      )}
      
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