import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage or default to 'normal'
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme || 'normal';
    });

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('app-theme', theme);
        // Apply theme class to body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// Theme Background Component
export const ThemeBackground = () => {
    const { theme } = useTheme();
    const location = useLocation();

    // Only show theme background on home page
    if (location.pathname !== '/') {
        return null;
    }

    if (theme === 'christmas') {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Christmas Tree Video Background - Adobe Stock Video */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-900 to-red-950">
                    {/* Base Red Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-red-800 to-red-900"></div>
                    
                    {/* Main Christmas Tree Video Background */}
                    <div className="absolute inset-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            style={{
                                objectFit: 'cover',
                                filter: 'brightness(0.95) contrast(1.1) saturate(1.2)',
                                opacity: 0.9
                            }}
                            onError={(e) => {
                                // Fallback to GIF if video fails
                                const fallbackDiv = document.createElement('div');
                                fallbackDiv.className = 'absolute inset-0';
                                fallbackDiv.style.backgroundImage = 'url("https://media.giphy.com/media/l0MYC0LajSpo8Yju8/giphy.gif")';
                                fallbackDiv.style.backgroundSize = 'cover';
                                fallbackDiv.style.backgroundPosition = 'center';
                                e.target.parentElement.appendChild(fallbackDiv);
                                e.target.style.display = 'none';
                            }}
                        >
                            {/* 
                                INSTRUCTIONS FOR ADOBE STOCK VIDEO:
                                1. Purchase and download the video from Adobe Stock:
                                   https://stock.adobe.com/video/animated-christmas-tree-design-on-red-background-with-snow/1571710898
                                2. Rename the downloaded video file to: christmas-tree-background.mp4
                                3. Place it in: public/assets/videos/christmas-tree-background.mp4
                                4. The video will automatically play as the Christmas theme background
                            */}
                            {/* Primary: Adobe Stock Christmas Tree Video */}
                            <source src="/assets/videos/christmas-tree-background.mp4" type="video/mp4" />
                            {/* Fallback video sources */}
                            <source src="/videos/christmas-tree-background.mp4" type="video/mp4" />
                            <source src="/assets/christmas-tree-background.mp4" type="video/mp4" />
                            {/* Fallback message */}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-950/30"></div>
                    
                    {/* Snowflakes Overlay */}
                    <div className="absolute inset-0">
                        {[...Array(60)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-white text-xl opacity-70"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `snowfall ${5 + Math.random() * 5}s linear infinite`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    fontSize: `${10 + Math.random() * 10}px`
                                }}
                            >
                                ❄
                            </div>
                        ))}
                    </div>

                    {/* Twinkling Stars */}
                    <div className="absolute inset-0">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-white rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 50}%`,
                                    width: `${1 + Math.random() * 2}px`,
                                    height: `${1 + Math.random() * 2}px`,
                                    animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    boxShadow: `0 0 ${2 + Math.random() * 3}px white`
                                }}
                            />
                        ))}
                    </div>

                    {/* Christmas Lights Effect */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: '8px',
                                    height: '8px',
                                    background: ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 5)],
                                    animation: `christmasLight ${1 + Math.random() * 2}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 5)]}`
                                }}
                            />
                        ))}
                    </div>

                    <style>{`
                        @keyframes snowfall {
                            0% {
                                transform: translateY(-100vh) rotate(0deg);
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(100vh) rotate(360deg);
                                opacity: 0;
                            }
                        }
                        @keyframes twinkle {
                            0%, 100% { 
                                opacity: 0.3; 
                                transform: scale(1); 
                            }
                            50% { 
                                opacity: 1; 
                                transform: scale(1.5); 
                            }
                        }
                        @keyframes christmasLight {
                            0%, 100% { 
                                opacity: 0.5; 
                                transform: scale(1); 
                            }
                            50% { 
                                opacity: 1; 
                                transform: scale(1.3); 
                            }
                        }
                        @keyframes santaFloat {
                            0%, 100% {
                                transform: translateX(0) translateY(0) scale(1);
                            }
                            25% {
                                transform: translateX(5%) translateY(-3%) scale(1.05);
                            }
                            50% {
                                transform: translateX(0) translateY(-5%) scale(1.1);
                            }
                            75% {
                                transform: translateX(-5%) translateY(-3%) scale(1.05);
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // Normal theme - no special background
    return null;
};

// Theme Switcher Component - Separate floating button
export const ThemeSwitcher = () => {
    const { theme, changeTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'normal', name: 'Normal', icon: '🌐' },
        { id: 'christmas', name: 'Christmas', icon: '🎄' }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <div className="relative">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Change Theme"
                    title="Change Theme"
                >
                    {theme === 'christmas' ? '🎄' : '🌐'}
                </button>

                {/* Theme Dropdown Menu */}
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-[99]" 
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-[101] min-w-[180px] py-2">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                                Select Theme
                            </div>
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        changeTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                                        theme === t.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                                >
                                    <span className="text-xl">{t.icon}</span>
                                    <span className="font-medium">{t.name}</span>
                                    {theme === t.id && (
                                        <span className="ml-auto text-blue-600">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ThemeContext;

