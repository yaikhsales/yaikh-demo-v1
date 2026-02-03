import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../translate/TranslationContext';

// Mapping function to match module titles to sub-icon image filenames
const getYTMIconImage = (title) => {
    const titleToImageMap = {
        'Machine Location': 'machine-location.png',
        'Setup and Repair': 'setup-repair.png',
        'Routine Maintenance': 'routine-maintenance.png',
        'System Setup': 'system-setup.png',
        'Data': 'data.png',
        'TV': 'TV.png',
        'Transfers': 'transfer.png',
        'Download': 'download.png',
        'Analysis': 'analysis.png',
        'Report': 'report.png'
    };
    
    return titleToImageMap[title] || null;
};

const YTM = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [selectedModule, setSelectedModule] = useState(null);

    const handleBack = () => {
        if (selectedModule) {
            setSelectedModule(null);
        } else if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleSubModuleClick = (module) => {
        if (module.subModules && module.subModules.length > 0) {
            setSelectedModule(module);
        } else {
            console.log('YTM Sub-module clicked:', module.title);
            // Add navigation logic here if needed
        }
    };

    const handleNestedSubModuleClick = (nestedModule) => {
        console.log('YTM Nested Sub-module clicked:', nestedModule);
        // Add navigation logic here if needed
    };

    const ytmModules = [
        { 
            title: 'Machine Location',
            hasSubModules: true,
            subModules: [
                { title: 'TV' },
                { title: 'Transfers' }
            ],
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            shadow: 'shadow-blue-200'
        },
        { 
            title: 'Setup and Repair',
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            shadow: 'shadow-green-200'
        },
        { 
            title: 'Routine Maintenance',
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            shadow: 'shadow-purple-200'
        },
        { 
            title: 'System Setup',
            color: 'bg-gradient-to-br from-orange-500 to-orange-600',
            shadow: 'shadow-orange-200'
        },
        { 
            title: 'Data',
            hasSubModules: true,
            subModules: [
                { title: 'Download' },
                { title: 'Analysis' },
                { title: 'Report' }
            ],
            color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
            shadow: 'shadow-indigo-200'
        }
    ];

    // Render nested sub-modules view
    if (selectedModule) {
        return (
            <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-hidden z-[100]">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-[101]">
                    <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0 relative">
                        {/* Left: Empty space for balance */}
                        <div className="flex-1"></div>
                        
                        {/* Center: Back Button, Title, and Home Button */}
                        <div className="flex items-center gap-3 sm:gap-4 justify-center flex-1">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
                                aria-label="Back"
                            >
                                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                                <span className="font-medium hidden sm:inline">{t('back')}</span>
                            </button>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 px-2 sm:px-4">{translateModuleTitle(selectedModule.title)}</h1>
                            <button
                                onClick={() => navigate('/')}
                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                                title="Home"
                            >
                                <img 
                                    src="/logo.jpg" 
                                    alt="Home" 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                        
                        {/* Right: Empty space for balance */}
                        <div className="flex-1"></div>
                    </div>
                </div>

                {/* Main Content - Nested Sub-modules */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                            {selectedModule.subModules.map((nestedModule, idx) => {
                                const iconImage = getYTMIconImage(nestedModule.title);
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleNestedSubModuleClick(nestedModule)}
                                        className={`
                                            ${selectedModule.color} 
                                            text-white 
                                            p-6 sm:p-8 
                                            rounded-xl 
                                            shadow-lg 
                                            ${selectedModule.shadow}
                                            hover:shadow-2xl 
                                            transition-all 
                                            duration-300
                                            hover:scale-105 
                                            active:scale-95
                                            flex 
                                            flex-col 
                                            items-center 
                                            justify-center 
                                            gap-4
                                            min-h-[160px] 
                                            sm:min-h-[180px]
                                            relative
                                            overflow-hidden
                                            group
                                        `}
                                    >
                                        {/* Subtle overlay for depth */}
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Icon Container */}
                                        <div className="relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-2 bg-white rounded-lg p-2 sm:p-3 shadow-lg">
                                            {iconImage ? (
                                                <img 
                                                    src={`/assets/icons/sub-icons/${iconImage}`}
                                                    alt={nestedModule.title}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        console.error('Failed to load YTM icon:', iconImage);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-white/30 rounded"></div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Text Label */}
                                        <span className="relative z-10 font-bold text-sm sm:text-base text-center leading-tight drop-shadow-md">
                                            {translateModuleTitle(nestedModule.title)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render main YTM modules
    return (
        <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-[101]">
                <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0 relative">
                    {/* Left: Empty space for balance */}
                    <div className="flex-1"></div>
                    
                    {/* Center: Back Button, Title, and Home Button */}
                    <div className="flex items-center gap-3 sm:gap-4 justify-center flex-1">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
                            aria-label="Back"
                        >
                            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                            <span className="font-medium hidden sm:inline">{t('back')}</span>
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 px-2 sm:px-4">{t('ytm')}</h1>
                        <button
                            onClick={() => navigate('/')}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                    
                    {/* Right: Empty space for balance */}
                    <div className="flex-1"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                        {ytmModules.map((module, idx) => {
                            const iconImage = getYTMIconImage(module.title);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSubModuleClick(module)}
                                    className={`
                                        ${module.color} 
                                        text-white 
                                        p-6 sm:p-8 
                                        rounded-xl 
                                        shadow-lg 
                                        ${module.shadow}
                                        hover:shadow-2xl 
                                        transition-all 
                                        duration-300
                                        hover:scale-105 
                                        active:scale-95
                                        flex 
                                        flex-col 
                                        items-center 
                                        justify-center 
                                        gap-4
                                        min-h-[160px] 
                                        sm:min-h-[180px]
                                        relative
                                        overflow-hidden
                                        group
                                    `}
                                >
                                    {/* Subtle overlay for depth */}
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Icon Container */}
                                    <div className="relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-2 bg-white rounded-lg p-2 sm:p-3 shadow-lg">
                                        {iconImage ? (
                                            <img 
                                                src={`/assets/icons/sub-icons/${iconImage}`}
                                                alt={module.title}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    console.error('Failed to load YTM icon:', iconImage);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/20 rounded-lg flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/30 rounded"></div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Text Label */}
                                    <span className="relative z-10 font-bold text-sm sm:text-base text-center leading-tight drop-shadow-md">
                                        {translateModuleTitle(module.title)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YTM;

