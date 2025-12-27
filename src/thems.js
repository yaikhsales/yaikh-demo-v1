import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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

    const [dragonEnabled, setDragonEnabled] = useState(() => {
        // Load dragon state from localStorage or default to falsechrstmas.jpg
        const savedDragon = localStorage.getItem('app-dragon-enabled');
        return savedDragon === 'true';
    });

    // Store default background configuration on first load
    useEffect(() => {
        // Store default background configuration if not already stored
        if (!localStorage.getItem('default-background-stored')) {
            // Store the default background configuration
            const defaultBgConfig = {
                gradient: 'from-slate-900 via-[#0f172a] to-slate-900',
                backgroundColor: 'rgb(15, 23, 42)', // slate-900
                imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
                hasBackgroundLayers: true
            };
            localStorage.setItem('default-background-config', JSON.stringify(defaultBgConfig));
            localStorage.setItem('default-background-stored', 'true');
        }
    }, []);

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('app-theme', theme);
        // Apply theme class to body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
        
        // Apply background based on theme
        if (theme === 'christmas') {
            // Christmas theme - transparent background to show GIF
            document.body.style.backgroundColor = 'transparent';
            document.documentElement.style.backgroundColor = 'transparent';
        } else {
            // Normal theme - restore default background (slate-900)
            const defaultBgConfig = localStorage.getItem('default-background-config');
            if (defaultBgConfig) {
                const config = JSON.parse(defaultBgConfig);
                document.body.style.backgroundColor = config.backgroundColor;
                document.documentElement.style.backgroundColor = config.backgroundColor;
            } else {
                // Fallback to slate-900
                document.body.style.backgroundColor = 'rgb(15, 23, 42)';
                document.documentElement.style.backgroundColor = 'rgb(15, 23, 42)';
            }
        }
    }, [theme]);

    useEffect(() => {
        // Save dragon state to localStorage whenever it changes
        localStorage.setItem('app-dragon-enabled', dragonEnabled.toString());
    }, [dragonEnabled]);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    const toggleDragon = () => {
        setDragonEnabled(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, dragonEnabled, toggleDragon }}>
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

// Mouse Following Dragon Component - Segmented Body Version (Like TikTok Video)
export const MouseDragon = () => {
    const { dragonEnabled } = useTheme();
    const [segments, setSegments] = useState([]);
    const [fireParticles, setFireParticles] = useState([]);
    const dragonRef = useRef(null);
    const animationFrameRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const segmentPositions = useRef([]);
    const particleIdRef = useRef(0);
    
    // Number of body segments (head + body segments)
    const SEGMENT_COUNT = 15;

    useEffect(() => {
        if (!dragonEnabled) {
            setSegments([]);
            setFireParticles([]);
            segmentPositions.current = [];
            return;
        }

        // Initialize segment positions
        if (segmentPositions.current.length === 0) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            for (let i = 0; i < SEGMENT_COUNT; i++) {
                segmentPositions.current.push({
                    x: centerX,
                    y: centerY,
                    rotation: 0
                });
            }
            mousePos.current = { x: centerX, y: centerY };
        }

        const handleMouseMove = (e) => {
            mousePos.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const animate = () => {
            if (!dragonEnabled) return;

            // Update head (first segment) to follow mouse
            const head = segmentPositions.current[0];
            const dx = mousePos.current.x - head.x;
            const dy = mousePos.current.y - head.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0.1) {
                // Head follows mouse with smooth easing
                const easing = 0.15;
                head.x += dx * easing;
                head.y += dy * easing;
                
                // Calculate rotation for head
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                head.rotation = angle + 90;

                // Each subsequent segment follows the previous one
                for (let i = 1; i < SEGMENT_COUNT; i++) {
                    const current = segmentPositions.current[i];
                    const previous = segmentPositions.current[i - 1];
                    
                    const segDx = previous.x - current.x;
                    const segDy = previous.y - current.y;
                    const segDistance = Math.sqrt(segDx * segDx + segDy * segDy);
                    
                    // Distance between segments (gets smaller towards tail)
                    const segmentDistance = 35 - (i * 1.5);
                    
                    if (segDistance > segmentDistance) {
                        // Move current segment towards previous
                        const easingFactor = 0.2 + (i * 0.02); // More lag for tail segments
                        current.x += segDx * easingFactor;
                        current.y += segDy * easingFactor;
                    }
                    
                    // Calculate rotation for this segment
                    const segAngle = Math.atan2(segDy, segDx) * (180 / Math.PI);
                    current.rotation = segAngle + 90;
                }

                // Generate fire particles from head when moving fast
                if (distance > 5) {
                    const headAngle = head.rotation - 90;
                    const rad = headAngle * Math.PI / 180;
                    const fireX = head.x - Math.cos(rad) * 25;
                    const fireY = head.y - Math.sin(rad) * 25;
                    
                    for (let i = 0; i < 2; i++) {
                        setFireParticles(prev => [...prev, {
                            id: particleIdRef.current++,
                            x: fireX + (Math.random() - 0.5) * 10,
                            y: fireY + (Math.random() - 0.5) * 10,
                            vx: -Math.cos(rad) * 3 + (Math.random() - 0.5) * 2,
                            vy: -Math.sin(rad) * 3 + (Math.random() - 0.5) * 2,
                            life: 1,
                            size: Math.random() * 8 + 6,
                            color: ['#ff6b00', '#ff8c00', '#ffd700', '#ff4500', '#ff0000'][Math.floor(Math.random() * 5)]
                        }].slice(-80));
                    }
                }

                // Update segments state
                setSegments([...segmentPositions.current]);
            }

            // Update fire particles
            setFireParticles(prev => prev.map(p => ({
                ...p,
                x: p.x + p.vx,
                y: p.y + p.vy,
                life: p.life - 0.015,
                vy: p.vy + 0.08, // Gravity
                size: p.size * 0.97,
                vx: p.vx * 0.98 // Air resistance
            })).filter(p => p.life > 0 && p.size > 1));

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [dragonEnabled]);

    if (!dragonEnabled || segments.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ overflow: 'hidden' }}>
            {/* Enhanced Fire Particles */}
            {fireParticles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `radial-gradient(circle, 
                            ${particle.color} 0%,
                            rgba(255,140,0,0.8) 30%,
                            rgba(255,215,0,0.6) 50%,
                            rgba(255,255,255,0.4) 70%,
                            transparent 100%)`,
                        transform: 'translate(-50%, -50%)',
                        opacity: particle.life,
                        filter: 'blur(1.5px)',
                        pointerEvents: 'none',
                        borderRadius: '50%',
                        boxShadow: `
                            0 0 ${particle.size * 4}px ${particle.color},
                            0 0 ${particle.size * 2}px rgba(255,255,255,0.6),
                            inset 0 0 ${particle.size * 0.5}px rgba(255,255,255,0.8)
                        `
                    }}
                />
            ))}

            {/* Dragon Segments - Body Trail */}
            {segments.map((segment, index) => {
                const isHead = index === 0;
                const segmentSize = isHead ? 50 : Math.max(35 - (index * 2), 12);
                const segmentOpacity = 1 - (index * 0.06);
                const segmentScale = 1 - (index * 0.05);

                return (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            left: `${segment.x}px`,
                            top: `${segment.y}px`,
                            transform: `translate(-50%, -50%) rotate(${segment.rotation}deg) scale(${segmentScale})`,
                            pointerEvents: 'none',
                            userSelect: 'none',
                            willChange: 'transform',
                            opacity: segmentOpacity,
                            zIndex: SEGMENT_COUNT - index,
                            filter: isHead 
                                ? 'drop-shadow(0 0 25px rgba(255,215,0,1)) drop-shadow(0 0 50px rgba(255,140,0,0.8)) drop-shadow(0 0 75px rgba(255,69,0,0.5))'
                                : `drop-shadow(0 0 ${12 - index * 0.5}px rgba(255,215,0,${0.7 - index * 0.04})) drop-shadow(0 0 ${8 - index * 0.3}px rgba(255,140,0,${0.5 - index * 0.03}))`
                        }}
                    >
                        {isHead ? (
                            // Real Dragon Head - Using Dragon Emoji with Enhanced Styling
                            <div 
                                className="relative"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    animation: 'dragonHeadFloat 1.2s ease-in-out infinite',
                                    transform: 'scale(1.3)'
                                }}
                            >
                                {/* Dragon Emoji - Large and Clear */}
                                <div
                                    style={{
                                        fontSize: '70px',
                                        lineHeight: '1',
                                        filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.9)) drop-shadow(0 0 35px rgba(255,140,0,0.7)) drop-shadow(0 0 50px rgba(255,69,0,0.5))',
                                        transform: 'rotate(-5deg)',
                                        display: 'inline-block'
                                    }}
                                >
                                    🐉
                                </div>
                                
                                {/* Fire Breath Effect */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: '45%',
                                        top: '75%',
                                        width: '50px',
                                        height: '35px',
                                        background: `radial-gradient(ellipse, 
                                            rgba(255,0,0,0.95) 0%,
                                            rgba(255,69,0,0.9) 20%,
                                            rgba(255,140,0,0.85) 40%,
                                            rgba(255,215,0,0.7) 60%,
                                            transparent 100%)`,
                                        filter: 'blur(3px)',
                                        animation: 'fireBreath 0.3s ease-in-out infinite alternate',
                                        pointerEvents: 'none',
                                        borderRadius: '50%',
                                        transform: 'translate(-50%, -50%) rotate(-10deg)',
                                        boxShadow: '0 0 25px rgba(255,69,0,0.9), 0 0 50px rgba(255,140,0,0.7), 0 0 75px rgba(255,215,0,0.5)'
                                    }}
                                />
                                
                                {/* Magical Sparkles Around Head */}
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute text-yellow-300"
                                        style={{
                                            fontSize: '14px',
                                            left: `${30 + i * 20}%`,
                                            top: `${20 + (i % 2) * 30}%`,
                                            animation: `sparkle ${1 + i * 0.2}s ease-in-out infinite`,
                                            animationDelay: `${i * 0.2}s`,
                                            opacity: 0.8,
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        ✨
                                    </div>
                                ))}
                            </div>
                        ) : index === SEGMENT_COUNT - 1 ? (
                            // Dragon Tail Tip
                            <div className="relative" style={{ width: `${segmentSize * 1.5}px`, height: `${segmentSize * 1.2}px` }}>
                                <div
                                    style={{
                                        fontSize: `${segmentSize * 0.8}px`,
                                        lineHeight: '1',
                                        filter: `drop-shadow(0 0 ${segmentSize * 0.3}px rgba(255,215,0,${segmentOpacity * 0.8}))`,
                                        opacity: segmentOpacity,
                                        transform: 'rotate(45deg)'
                                    }}
                                >
                                    🐉
                                </div>
                            </div>
                        ) : (
                            // Dragon Body Segments - Using Dragon Emoji Pattern
                            <div 
                                className="relative" 
                                style={{ 
                                    width: `${segmentSize * 1.1}px`, 
                                    height: `${segmentSize * 1.1}px`,
                                    opacity: segmentOpacity
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: `${segmentSize * 0.9}px`,
                                        lineHeight: '1',
                                        filter: `drop-shadow(0 0 ${segmentSize * 0.2}px rgba(255,215,0,${segmentOpacity * 0.6}))`,
                                        transform: 'scale(0.7)',
                                        display: 'inline-block'
                                    }}
                                >
                                    🐉
                                </div>
                                
                                {/* Connecting Glow */}
                                <div
                                    className="absolute rounded-full"
                                    style={{
                                        width: `${segmentSize * 0.8}px`,
                                        height: `${segmentSize * 0.8}px`,
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: `radial-gradient(circle, 
                                            rgba(255,215,0,${segmentOpacity * 0.4}) 0%,
                                            rgba(255,140,0,${segmentOpacity * 0.2}) 50%,
                                            transparent 100%)`,
                                        filter: 'blur(3px)',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Connecting Lines Between Segments (Optional - creates smoother body) */}
            {segments.length > 1 && segments.map((segment, index) => {
                if (index === 0) return null;
                const prevSegment = segments[index - 1];
                const dx = segment.x - prevSegment.x;
                const dy = segment.y - prevSegment.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const opacity = 0.3 - (index * 0.02);

                return (
                    <div
                        key={`line-${index}`}
                        className="absolute"
                        style={{
                            left: `${prevSegment.x}px`,
                            top: `${prevSegment.y}px`,
                            width: `${distance}px`,
                            height: `${Math.max(8 - index * 0.4, 2)}px`,
                            background: `linear-gradient(90deg, 
                                rgba(255,215,0,${opacity}) 0%,
                                rgba(255,140,0,${opacity * 0.7}) 50%,
                                rgba(255,69,0,${opacity * 0.4}) 100%)`,
                            transform: `translate(0, -50%) rotate(${angle}deg)`,
                            transformOrigin: '0 50%',
                            pointerEvents: 'none',
                            filter: 'blur(1px)',
                            opacity: opacity
                        }}
                    />
                );
            })}

            <style>{`
                @keyframes dragonHeadFloat {
                    0%, 100% {
                        transform: translateY(0px) scale(1.1) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-5px) scale(1.12) rotate(-2deg);
                    }
                    50% {
                        transform: translateY(-8px) scale(1.15) rotate(0deg);
                    }
                    75% {
                        transform: translateY(-5px) scale(1.12) rotate(2deg);
                    }
                }
                @keyframes fireBreath {
                    0% {
                        transform: translate(-50%, -50%) scaleX(0.7) scaleY(0.9);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scaleX(1.1) scaleY(1.0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scaleX(1.3) scaleY(1.1);
                        opacity: 0.9;
                    }
                }
                @keyframes scaleShine {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.2);
                    }
                }
            `}</style>
        </div>
    );
};

// Theme Background Component
export const ThemeBackground = () => {
    const { theme } = useTheme();
    const location = useLocation();

    // Debug: Log theme and location
    useEffect(() => {
        console.log('ThemeBackground - Theme:', theme, 'Location:', location.pathname);
    }, [theme, location.pathname]);

    // Show theme background on home page and dashboard
    if (location.pathname !== '/' && !location.pathname.startsWith('/dashboard')) {
        return null;
    }

    if (theme === 'christmas') {
        return createPortal(
            <div 
                id="christmas-theme-background"
                className="fixed inset-0 overflow-hidden pointer-events-none" 
                style={{ 
                    zIndex: 0, 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    width: '100vw', 
                    height: '100vh',
                    backgroundColor: 'transparent'
                }}
            >
                {/* Christmas Background Image */}
                <img
                    src="/assets/background/christmas.jpg"
                    alt="Christmas Background"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{
                        zIndex: 0,
                        minHeight: '100vh',
                        width: '100vw',
                        height: '100vh'
                    }}
                />

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
            </div>,
            document.body
        );
    }

    // Normal theme - render circuit/network background
    return createPortal(
        <div 
            id="normal-theme-background"
            className="fixed inset-0 overflow-hidden pointer-events-none" 
            style={{ 
                zIndex: 0, 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                width: '100vw', 
                height: '100vh'
            }}
        >
            {/* Normal Theme Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0f172a] to-slate-900 transition-all duration-500"></div>
            <img
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen transition-all duration-500 opacity-20"
                alt="Circuit Background"
            />
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-cyan-500/10 animate-pulse transition-all duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>,
        document.body
    );
};

// Theme Switcher Component - Separate floating button
export const ThemeSwitcher = () => {
    const { theme, changeTheme, dragonEnabled, toggleDragon } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'normal', name: 'Normal', icon: '🌐' },
        { id: 'christmas', name: 'Christmas', icon: '🎄' }
    ];

    return (
        <>
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
                            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-[101] min-w-[200px] py-2">
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
                                
                                {/* Dragon Toggle Separator */}
                                <div className="border-t border-gray-200 my-2"></div>
                                
                                {/* Dragon Toggle */}
                                <button
                                    onClick={() => {
                                        toggleDragon();
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                                        dragonEnabled ? 'bg-yellow-50 text-yellow-600' : 'text-gray-700'
                                    }`}
                                >
                                    <span className="text-xl">🐉</span>
                                    <span className="font-medium">Dragon Animation</span>
                                    {dragonEnabled && (
                                        <span className="ml-auto text-yellow-600">✓</span>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {/* Mouse Dragon Component */}
            <MouseDragon />
        </>
    );
};

export default ThemeContext;

