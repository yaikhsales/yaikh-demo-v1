import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const videos = [
        '/assets/videos/ot-cost.mp4',
        '/assets/videos/Support-Ticket-System.mp4',
        '/assets/videos/Yai-Purhcase.mp4',
        '/assets/videos/Production.mp4'
    ];

    const videoTitles = [
        'OT Cost',
        'Support Ticket System',
        'Yai Purchase',
        'Production'
    ];

    useEffect(() => {
        // Start playing the first video
        if (videoRefs[0].current) {
            videoRefs[0].current.play();
            setIsPlaying(true);
        }
    }, []);

    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            // Move to next video
            const nextIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(nextIndex);
            setIsPlaying(false);
            
            // Small delay before starting next video
            setTimeout(() => {
                if (videoRefs[nextIndex].current) {
                    videoRefs[nextIndex].current.play();
                    setIsPlaying(true);
                }
            }, 500);
        } else {
            // All videos finished, navigate to dashboard
            handleContinue();
        }
    };

    const handleContinue = () => {
        // Mark welcome as completed, then navigate to root (which will show dashboard)
        sessionStorage.setItem('welcome-completed', 'true');
        navigate('/', { replace: true });
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center overflow-hidden p-6">
            {/* Welcome Text */}
            <div className="mb-6 z-20">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-2 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                        Welcome
                    </span>
                </h1>
            </div>

            {/* 4 Column Video Grid */}
            <div className="w-full max-w-[95vw] grid grid-cols-4 gap-6 relative z-10">
                {videos.map((video, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                        {/* Video Container - Bigger with proper aspect ratio */}
                        <div
                            className={`relative w-full rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                                index === currentVideoIndex
                                    ? 'scale-105 z-20'
                                    : index < currentVideoIndex
                                    ? 'opacity-70 scale-95'
                                    : 'opacity-40 scale-90'
                            }`}
                            style={{
                                boxShadow: index === currentVideoIndex 
                                    ? '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4), 0 0 90px rgba(255, 215, 0, 0.2)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                                animation: index === currentVideoIndex ? 'magic-glow 2s ease-in-out infinite' : 'none',
                                aspectRatio: '16/9',
                                minHeight: '450px',
                                background: 'linear-gradient(135deg, #1e1b4b 0%, #7e22ce 50%, #ec4899 100%)'
                            }}
                        >
                            {/* Video - Using object-contain to show all content without cropping */}
                            <video
                                ref={videoRefs[index]}
                                className={`w-full h-full object-contain transition-opacity duration-1000 ${
                                    index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                onEnded={handleVideoEnd}
                                playsInline
                                loop={false}
                                autoPlay={index === currentVideoIndex}
                                style={{
                                    display: 'block'
                                }}
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        </div>

                        {/* Video Title - Outside Video */}
                        <div className="mt-4 w-full text-center z-10">
                            <h3 className={`text-xl md:text-2xl font-bold transition-all duration-500 ${
                                index === currentVideoIndex
                                    ? 'text-yellow-300 scale-110'
                                    : index < currentVideoIndex
                                    ? 'text-green-400'
                                    : 'text-gray-400'
                            }`}>
                                {videoTitles[index]}
                            </h3>
                        </div>

                        {/* Status Indicator - Outside Video */}
                        <div className="mt-2 z-10">
                            {index === currentVideoIndex && (
                                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                                    ▶ Playing
                                </div>
                            )}
                            {index < currentVideoIndex && (
                                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    ✓ Completed
                                </div>
                            )}
                            {index > currentVideoIndex && (
                                <div className="bg-gray-600 text-gray-300 px-4 py-2 rounded-full text-sm font-bold">
                                    ⏸ Pending
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Bar - Below Videos */}
            <div className="mt-6 w-full max-w-[95vw] z-20">
                <div className="flex gap-3 justify-center items-center">
                    {videos.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-4 rounded-full transition-all duration-500 ${
                                idx < currentVideoIndex
                                    ? 'bg-green-500 w-20'
                                    : idx === currentVideoIndex
                                    ? 'bg-yellow-400 w-24 animate-pulse'
                                    : 'bg-gray-600 w-6'
                            }`}
                        />
                    ))}
                </div>
                <div className="text-center mt-3 text-white/70 text-sm">
                    Video {currentVideoIndex + 1} of {videos.length}
                </div>
            </div>



            {/* Custom Animations */}
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

                @keyframes magic-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                                    0 0 40px rgba(255, 215, 0, 0.3),
                                    0 0 60px rgba(255, 215, 0, 0.2);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(255, 215, 0, 0.8),
                                    0 0 60px rgba(255, 215, 0, 0.5),
                                    0 0 90px rgba(255, 215, 0, 0.3);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-sparkle {
                    animation: sparkle 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default WelcomePage;

