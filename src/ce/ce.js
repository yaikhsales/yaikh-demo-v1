import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Mapping function to match module titles to sub-icon image filenames
const getCEIconImage = (title) => {
    const titleToImageMap = {
        'ST Standard Time': 'standard-time-analysis.png',
        'Product development': 'product-development-analysis.png',
        'Garment Analysis': 'garment-analysis.png',
        'Cut,Sew,Pack Productivity': 'cut-sew-pack-worker-capacity.png',
        'Machine allocation': 'machine-allocation.png',
        'Skill inventory': 'skill-inventory.png',
        'Team Performance': 'individual-team-production-record.png',
        'Learning Curve': 'Learning-curve.png',
        'Downtimes': 'downtimes.png',
        'Cost centers ,Direct/Indirect Cost': 'center-direct-indirect-cost.png',
        'CPM': 'cpm.png',
        'Style Costing': 'style-costing.png'
    };
    
    return titleToImageMap[title] || null;
};

const CE = ({ onBack }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleSubModuleClick = (module) => {
        console.log('CE Sub-module clicked:', module);
        // Add navigation logic here if needed
    };

    const ceModules = [
        { 
            title: 'ST Standard Time', 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            shadow: 'shadow-blue-200'
        },
        { 
            title: 'Product development', 
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            shadow: 'shadow-green-200'
        },
        { 
            title: 'Garment Analysis', 
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            shadow: 'shadow-purple-200'
        },
        { 
            title: 'Cut,Sew,Pack Productivity', 
            color: 'bg-gradient-to-br from-orange-500 to-orange-600',
            shadow: 'shadow-orange-200'
        },
        { 
            title: 'Machine allocation', 
            color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
            shadow: 'shadow-indigo-200'
        },
        { 
            title: 'Skill inventory', 
            color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
            shadow: 'shadow-yellow-200'
        },
        { 
            title: 'Team Performance', 
            color: 'bg-gradient-to-br from-teal-500 to-teal-600',
            shadow: 'shadow-teal-200'
        },
        { 
            title: 'Learning Curve', 
            color: 'bg-gradient-to-br from-pink-500 to-pink-600',
            shadow: 'shadow-pink-200'
        },
        { 
            title: 'Downtimes', 
            color: 'bg-gradient-to-br from-red-500 to-red-600',
            shadow: 'shadow-red-200'
        },
        { 
            title: 'Cost centers ,Direct/Indirect Cost', 
            color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
            shadow: 'shadow-cyan-200'
        },
        { 
            title: 'CPM', 
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            shadow: 'shadow-emerald-200'
        },
        { 
            title: 'Style Costing', 
            color: 'bg-gradient-to-br from-violet-500 to-violet-600',
            shadow: 'shadow-violet-200'
        }
    ];

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
                            <span className="font-medium hidden sm:inline">Back</span>
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 px-2 sm:px-4">CE</h1>
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
                        {ceModules.map((module, idx) => {
                            const iconImage = getCEIconImage(module.title);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSubModuleClick(module.title)}
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
                                                    console.error('Failed to load CE icon:', iconImage);
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
                                        {module.title}
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

export default CE;

