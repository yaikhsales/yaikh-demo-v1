import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [stage, setStage] = useState(0); // 0: Solar Systems, 1: Welcome animation
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Stage 0: Show "Solar Systems running" for 6 seconds
        const timer1 = setTimeout(() => {
            setStage(1);
            setShowWelcome(true);
        }, 6000);

        // Stage 1: Show welcome animation, then auto-navigate to dashboard after 3 more seconds
        const timer2 = setTimeout(() => {
            handleContinue();
        }, 9000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContinue = () => {
        // Mark welcome as completed, then navigate to root (which will show dashboard)
        sessionStorage.setItem('welcome-completed', 'true');
        navigate('/', { replace: true });
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
            {/* Animated Background Stars */}
            <div className="absolute inset-0">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            opacity: Math.random() * 0.8 + 0.2,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 2 + 1}s`
                        }}
                    />
                ))}
            </div>

            {/* Solar Systems Running Animation */}
            {stage === 0 && (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    {/* Title */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                        <h1 className="text-4xl font-bold text-white">SOLAR SYSTEM</h1>
                    </div>

                    {/* Solar System Animation */}
                    <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
                        {/* Sun - Center */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full shadow-2xl shadow-yellow-500/50 animate-pulse relative">
                                <div className="absolute inset-0 bg-gradient-radial from-yellow-200/50 to-transparent rounded-full"></div>
                                {/* Sun surface details */}
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-600/50 rounded-full"></div>
                                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-red-500/50 rounded-full"></div>
                                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400/50 rounded-full"></div>
                            </div>
                            {/* Sun glow */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
                        </div>

                        {/* Planet 1 - Mercury */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-1">
                                <div className="planet planet-1">
                                    <div className="w-5 h-5 bg-gray-500 rounded-full shadow-lg relative">
                                        <div className="absolute inset-0 bg-gray-600/50 rounded-full" style={{ clipPath: 'polygon(0% 0%, 30% 20%, 60% 10%, 100% 30%, 70% 50%, 40% 70%, 10% 80%, 0% 100%)' }}></div>
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Mercury</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 2 - Venus */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-2">
                                <div className="planet planet-2">
                                    <div className="w-6 h-6 bg-gradient-to-br from-orange-300 via-yellow-200 to-orange-400 rounded-full shadow-lg"></div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Venus</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 3 - Earth */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-3">
                                <div className="planet planet-3">
                                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 via-green-500 to-blue-600 rounded-full shadow-lg relative">
                                        <div className="absolute inset-0 bg-green-600/40 rounded-full" style={{ clipPath: 'polygon(20% 30%, 50% 25%, 70% 40%, 60% 60%, 40% 70%, 25% 55%)' }}></div>
                                        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Earth</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 4 - Mars */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-4">
                                <div className="planet planet-4">
                                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 rounded-full shadow-lg"></div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Mars</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 5 - Jupiter */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-5">
                                <div className="planet planet-5">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500 rounded-full shadow-lg relative">
                                        <div className="absolute top-1/5 left-0 right-0 h-2 bg-orange-600/60 rounded-full"></div>
                                        <div className="absolute top-2/5 left-0 right-0 h-1.5 bg-yellow-400/50 rounded-full"></div>
                                        <div className="absolute top-1/2 left-0 right-0 h-2 bg-orange-600/60 rounded-full"></div>
                                        <div className="absolute top-3/5 left-0 right-0 h-1.5 bg-yellow-400/50 rounded-full"></div>
                                        <div className="absolute top-4/5 left-0 right-0 h-2 bg-orange-600/60 rounded-full"></div>
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Jupiter</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 6 - Saturn */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-6">
                                <div className="planet planet-6">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300 rounded-full shadow-lg"></div>
                                        {/* Saturn Rings */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-1.5 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent rounded-full"></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-22 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent rounded-full"></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent rounded-full"></div>
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Saturn</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 7 - Uranus */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-7">
                                <div className="planet planet-7">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-300 via-blue-300 to-cyan-400 rounded-full shadow-lg"></div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Uranus</div>
                                </div>
                            </div>
                        </div>

                        {/* Planet 8 - Neptune */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="orbit orbit-8">
                                <div className="planet planet-8">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-full shadow-lg"></div>
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">Neptune</div>
                                </div>
                            </div>
                        </div>

                        {/* Asteroids in orbits */}
                        {[...Array(30)].map((_, i) => (
                            <div key={`asteroid-${i}`} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className={`orbit asteroid-orbit-${Math.floor(i / 5) + 1}`}>
                                    <div className={`planet asteroid-${i}`}>
                                        <div className="w-1 h-1 bg-cyan-300 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Planet Legend at Bottom */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-4 items-center">
                            {[
                                { name: 'Mercury', color: 'bg-gray-500', size: 'w-6 h-6' },
                                { name: 'Venus', color: 'bg-orange-300', size: 'w-7 h-7' },
                                { name: 'Earth', color: 'bg-blue-500', size: 'w-7 h-7' },
                                { name: 'Mars', color: 'bg-red-500', size: 'w-6 h-6' },
                                { name: 'Jupiter', color: 'bg-orange-400', size: 'w-10 h-10' },
                                { name: 'Saturn', color: 'bg-yellow-200', size: 'w-9 h-9' },
                                { name: 'Uranus', color: 'bg-cyan-300', size: 'w-8 h-8' },
                                { name: 'Neptune', color: 'bg-blue-600', size: 'w-8 h-8' }
                            ].map((planet, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1">
                                    <div className={`${planet.size} ${planet.color} rounded-full shadow-lg relative`}>
                                        {planet.name === 'Saturn' && (
                                            <>
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent rounded-full"></div>
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent rounded-full"></div>
                                            </>
                                        )}
                                        {planet.name === 'Jupiter' && (
                                            <>
                                                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-orange-600/60 rounded-full"></div>
                                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-600/60 rounded-full"></div>
                                                <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-orange-600/60 rounded-full"></div>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-white text-xs font-semibold">{planet.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Running Text */}
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="text-2xl text-yellow-300 animate-bounce">
                            Running...
                        </div>
                    </div>
                </div>
            )}

            {/* Welcome Animation */}
            {showWelcome && (
                <div className={`relative z-10 text-center transition-all duration-1000 ${showWelcome ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    <div className="mb-8">
                        <h1 className="text-7xl font-extrabold mb-4 animate-fade-in-up">
                            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                                Welcome
                            </span>
                        </h1>
                        <h2 className="text-5xl font-bold text-white mb-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            to Our
                        </h2>
                        <h2 className="text-6xl font-extrabold animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Website
                            </span>
                        </h2>
                    </div>
                    
                    {/* Sparkle Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-yellow-300 text-2xl animate-sparkle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${Math.random() * 1 + 0.5}s`
                                }}
                            >
                                ✨
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Custom Animations CSS */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes sparkle {
                    0%, 100% {
                        opacity: 0;
                        transform: scale(0) rotate(0deg);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1) rotate(180deg);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-sparkle {
                    animation: sparkle 2s ease-in-out infinite;
                }

                /* Solar System Orbit Animations */
                .orbit {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .orbit-1 {
                    width: 140px;
                    height: 100px;
                    animation: orbit-rotate 3s linear infinite;
                }

                .orbit-2 {
                    width: 180px;
                    height: 130px;
                    animation: orbit-rotate 4s linear infinite;
                }

                .orbit-3 {
                    width: 220px;
                    height: 160px;
                    animation: orbit-rotate 5s linear infinite;
                }

                .orbit-4 {
                    width: 260px;
                    height: 190px;
                    animation: orbit-rotate 6s linear infinite;
                }

                .orbit-5 {
                    width: 320px;
                    height: 240px;
                    animation: orbit-rotate 8s linear infinite;
                }

                .orbit-6 {
                    width: 380px;
                    height: 280px;
                    animation: orbit-rotate 10s linear infinite;
                }

                .orbit-7 {
                    width: 440px;
                    height: 320px;
                    animation: orbit-rotate 12s linear infinite;
                }

                .orbit-8 {
                    width: 500px;
                    height: 360px;
                    animation: orbit-rotate 14s linear infinite;
                }

                /* Asteroid orbits */
                .asteroid-orbit-1 {
                    width: 150px;
                    height: 110px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .asteroid-orbit-2 {
                    width: 200px;
                    height: 150px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .asteroid-orbit-3 {
                    width: 300px;
                    height: 220px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .asteroid-orbit-4 {
                    width: 400px;
                    height: 300px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .asteroid-orbit-5 {
                    width: 480px;
                    height: 350px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .asteroid-orbit-6 {
                    width: 520px;
                    height: 380px;
                    border: none;
                    border-top: 1px dashed rgba(173, 216, 230, 0.3);
                }

                .planet {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                @keyframes orbit-rotate {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                .planet-1 {
                    animation: planet-rotate 3s linear infinite reverse;
                }

                .planet-2 {
                    animation: planet-rotate 4s linear infinite reverse;
                }

                .planet-3 {
                    animation: planet-rotate 5s linear infinite reverse;
                }

                .planet-4 {
                    animation: planet-rotate 6s linear infinite reverse;
                }

                .planet-5 {
                    animation: planet-rotate 8s linear infinite reverse;
                }

                .planet-6 {
                    animation: planet-rotate 10s linear infinite reverse;
                }

                .planet-7 {
                    animation: planet-rotate 12s linear infinite reverse;
                }

                .planet-8 {
                    animation: planet-rotate 14s linear infinite reverse;
                }

                @keyframes planet-rotate {
                    from {
                        transform: translateX(-50%) rotate(0deg);
                    }
                    to {
                        transform: translateX(-50%) rotate(360deg);
                    }
                }

                /* Asteroid animations */
                ${[...Array(30)].map((_, i) => {
                    const orbitNum = Math.floor(i / 5) + 1;
                    const delay = (i % 5) * 0.5;
                    const duration = 3 + orbitNum * 2;
                    return `
                        .asteroid-${i} {
                            animation: planet-rotate ${duration}s linear infinite ${delay}s reverse;
                        }
                    `;
                }).join('')}
            `}</style>
        </div>
    );
};

export default WelcomePage;

