import React from 'react';
import ModuleCard from './ModuleCard';

const ColumnGroup = ({ group, onModuleClick }) => {
  return (
    <div className="flex flex-col min-w-[100px] flex-1">
      {/* Sub Label (Only show if title exists) */}
      {group.title && (
          <div className="mb-3 flex justify-center">
            <div className="bg-slate-700/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-500 shadow-lg text-center w-full max-w-[120px]">
                {group.title}
            </div>
          </div>
      )}
      
      {/* Vertical Stack of Modules */}
      <div className="flex flex-col gap-1">
        {group.modules.map((mod, idx) => (
          <ModuleCard key={idx} data={mod} onClick={onModuleClick} />
        ))}
      </div>
    </div>
  );
};

export default ColumnGroup;