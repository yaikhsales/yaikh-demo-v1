import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Mapping function to match module titles to sub-icon image filenames
const getYHRIconImage = (title) => {
    const titleToImageMap = {
        'Recruitment': 'recruitment.png',
        'Arrange Interview': 'arrange-interview.jpg',
        'Onboarding': 'onboarding.png',
        'Attendant': 'attendant.png',
        'Benefit Profile': 'benifit-profile.png', // Note: filename has typo "benifit"
        'Payroll': 'payroll.png',
        'NSSF': 'NSSF.jpg',
        'Visa and Work Permit': 'visa-work-permit.png',
        'FWCMS': 'FWCMS.png',
        'Food Canteen': 'food-canteen.png'
    };
    
    return titleToImageMap[title] || null;
};

const YHR = ({ onBack }) => {
    const navigate = useNavigate();
    const [showAttendantSubMenu, setShowAttendantSubMenu] = useState(false);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleAttendantClick = () => {
        setShowAttendantSubMenu(true);
    };

    const handleAttendantSubModule = (module) => {
        if (module === 'Checklist Attendant') {
            navigate('/dashboard/checklist-attendance');
        } else if (module === 'My Attendant') {
            navigate('/dashboard/my-attendance');
        }
    };

    const yhrModules = [
        { 
            title: 'Recruitment', 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            shadow: 'shadow-blue-200',
            hasWhiteBg: true // Icon has white background
        },
        { 
            title: 'Arrange Interview', 
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            shadow: 'shadow-green-200',
            hasWhiteBg: true // Icon has white background
        },
        { 
            title: 'Onboarding', 
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            shadow: 'shadow-purple-200'
        },
        { 
            title: 'Attendant', 
            color: 'bg-gradient-to-br from-orange-500 to-orange-600',
            shadow: 'shadow-orange-200',
            hasSubMenu: true 
        },
        { 
            title: 'Benefit Profile', 
            color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
            shadow: 'shadow-indigo-200'
        },
        { 
            title: 'Payroll', 
            color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
            shadow: 'shadow-yellow-200'
        },
        { 
            title: 'NSSF', 
            color: 'bg-gradient-to-br from-teal-500 to-teal-600',
            shadow: 'shadow-teal-200',
            hasWhiteBg: true // Icon has white background
        },
        { 
            title: 'Visa and Work Permit', 
            color: 'bg-gradient-to-br from-red-500 to-red-600',
            shadow: 'shadow-red-200'
        },
        { 
            title: 'FWCMS', 
            color: 'bg-gradient-to-br from-pink-500 to-pink-600',
            shadow: 'shadow-pink-200'
        },
        { 
            title: 'Food Canteen', 
            color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
            shadow: 'shadow-cyan-200'
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
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 px-2 sm:px-4">YHR</h1>
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
                {!showAttendantSubMenu ? (
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                            {yhrModules.map((module, idx) => {
                                const iconImage = getYHRIconImage(module.title);
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (module.hasSubMenu) {
                                                handleAttendantClick();
                                            } else {
                                                // Handle other modules - placeholder for now
                                                console.log(`${module.title} clicked`);
                                            }
                                        }}
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
                                        <div className={`relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-2 ${module.hasWhiteBg ? 'bg-white rounded-lg p-2 sm:p-3 shadow-lg' : ''}`}>
                                            {iconImage ? (
                                                <img 
                                                    src={`/assets/icons/sub-icons/${iconImage}`}
                                                    alt={module.title}
                                                    className={`w-full h-full object-contain ${module.hasWhiteBg ? '' : 'drop-shadow-2xl'}`}
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
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <button
                                onClick={() => setShowAttendantSubMenu(false)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                            >
                                <ArrowLeft size={20} />
                                <span>Back to YHR Modules</span>
                            </button>
                            <h2 className="text-xl font-bold text-gray-800">Attendant</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleAttendantSubModule('Checklist Attendant')}
                                className="bg-gradient-to-br from-sky-400 to-sky-500 text-white p-10 rounded-xl shadow-lg shadow-sky-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-5 min-h-[200px] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                                    <img 
                                        src="/assets/icons/sub-icons/checklist-attendant.jpg"
                                        alt="Checklist Attendant"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <span className="relative z-10 font-bold text-lg sm:text-xl drop-shadow-md">Checklist Attendant</span>
                            </button>
                            <button
                                onClick={() => handleAttendantSubModule('My Attendant')}
                                className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-10 rounded-xl shadow-lg shadow-teal-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-5 min-h-[200px] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                                    <img 
                                        src="/assets/icons/sub-icons/my-attendant.jpg"
                                        alt="My Attendant"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <span className="relative z-10 font-bold text-lg sm:text-xl drop-shadow-md">My Attendant</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YHR;

