import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [volume, setVolume] = useState(1); // Volume control (0 to 1)
    const [videoMuted, setVideoMuted] = useState([false, false, false, false]); // Individual mute state for each video
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

    // Panel images (static preview images for each video)
    const panelImages = [
        '/assets/videos/ot-cost-preview.jpg', // Factory floor scene
        '/assets/videos/support-ticket-preview.jpg', // Account Department
        '/assets/videos/purchase-preview.jpg', // Planning Department
        '/assets/videos/production-preview.jpg' // Industrial/warehouse scene
    ];

    const enableAudioAndPlay = async () => {
        setAudioEnabled(true);
        // Enable audio on all videos
        videoRefs.forEach(ref => {
            if (ref.current) {
                ref.current.muted = false;
                ref.current.volume = volume;
            }
        });
        // If current video is paused, play it
        if (videoRefs[currentVideoIndex].current) {
            try {
                if (videoRefs[currentVideoIndex].current.paused) {
                    await videoRefs[currentVideoIndex].current.play();
                }
                setIsPlaying(true);
            } catch (error) {
                console.log('Play error:', error);
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        // Enable audio when user adjusts volume
        if (newVolume > 0 && !audioEnabled) {
            setAudioEnabled(true);
        }
        // Update volume on all videos (only if not individually muted)
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                ref.current.volume = newVolume;
                // Only mute if volume is 0 OR video is individually muted
                ref.current.muted = newVolume === 0 || videoMuted[index];
            }
        });
    };

    const toggleVideoMute = (index, e) => {
        e.stopPropagation(); // Prevent panel click
        const newMuted = [...videoMuted];
        newMuted[index] = !newMuted[index];
        setVideoMuted(newMuted);
        
        if (videoRefs[index].current) {
            videoRefs[index].current.muted = newMuted[index] || volume === 0;
        }
    };

    useEffect(() => {
        // Start playing the first video automatically when page loads (after a short delay)
        const playFirstVideo = async () => {
            if (videoRefs[0].current) {
                // Start muted to allow autoplay
                videoRefs[0].current.muted = true;
                videoRefs[0].current.volume = 0;
                try {
                    await videoRefs[0].current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log('Autoplay prevented:', error);
                }
            }
        };
        // Delay to ensure video elements are ready
        const timer = setTimeout(playFirstVideo, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Update muted state and volume when audioEnabled, volume, or videoMuted changes
    useEffect(() => {
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                // Mute if: volume is 0, audio not enabled, OR video is individually muted
                ref.current.muted = !audioEnabled || volume === 0 || videoMuted[index];
                ref.current.volume = audioEnabled ? volume : 0;
            }
        });
    }, [audioEnabled, volume, videoMuted]);

    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            // Move to next video
            const nextIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(nextIndex);
            setIsPlaying(false);
            
            // Enable audio automatically when video ends
            if (!audioEnabled) {
                setAudioEnabled(true);
            }
            
            // Small delay before starting next video
            setTimeout(async () => {
                if (videoRefs[nextIndex].current) {
                    // Unmute and set volume when moving to next video
                    videoRefs[nextIndex].current.muted = volume === 0 || videoMuted[nextIndex];
                    videoRefs[nextIndex].current.volume = volume > 0 ? volume : 0.5; // Default to 50% if volume is 0
                    if (volume === 0) {
                        setVolume(0.5); // Set volume to 50% if it was 0
                    }
                    try {
                        await videoRefs[nextIndex].current.play();
                        setIsPlaying(true);
                    } catch (error) {
                        console.log('Video play error:', error);
                        // Retry once
                        setTimeout(() => {
                            if (videoRefs[nextIndex].current) {
                                videoRefs[nextIndex].current.play().catch(console.error);
                            }
                        }, 500);
                    }
                }
            }, 500);
        } else {
            // All videos finished, navigate to dashboard
            handleContinue();
        }
    };

    // Update video when currentVideoIndex changes (when video ends and moves to next)
    useEffect(() => {
        // Stop all videos except the current one
        videoRefs.forEach((ref, idx) => {
            if (ref.current && idx !== currentVideoIndex) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });
        
        // Play current video when index changes (triggered by video end)
        if (videoRefs[currentVideoIndex].current) {
            const video = videoRefs[currentVideoIndex].current;
            const newVolume = volume > 0 ? volume : 0.5;
            video.muted = newVolume === 0 || videoMuted[currentVideoIndex];
            video.volume = newVolume;
            // Small delay before playing to ensure video is ready
            setTimeout(() => {
                if (videoRefs[currentVideoIndex].current) {
                    videoRefs[currentVideoIndex].current.play().then(() => {
                        setIsPlaying(true);
                    }).catch(console.error);
                }
            }, 300);
        }
    }, [currentVideoIndex]);

    const handleContinue = () => {
        // Mark welcome as completed, then navigate to root (which will show dashboard)
        sessionStorage.setItem('welcome-completed', 'true');
        navigate('/', { replace: true });
    };

    const handleSkip = () => {
        // Stop all videos
        videoRefs.forEach(ref => {
            if (ref.current) {
                ref.current.pause();
            }
        });
        // Navigate directly to dashboard
        handleContinue();
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center overflow-hidden p-6">
            {/* Skip Button */}
            <div className="absolute top-6 right-6 z-30">
                <button
                    onClick={handleSkip}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
                >
                    <span>Skip</span>
                    <span>⏭</span>
                </button>
            </div>

            {/* Welcome Header - Centered with effects */}
            {/* <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-2 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-yellow-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                        Welcome
                    </span>
                </h1>
                <p className="text-white/70 text-sm animate-fade-in-up-delay">Explore our comprehensive business management system</p>
            </div> */}

            {/* 4 Panel Grid Layout - Matching Image */}
            <div className="w-full max-w-[95vw] h-full grid grid-cols-2 grid-rows-2 gap-4 mt-20">


                {/* Panel 1 - Top Left: Production/Factory Floor */}
                {videos.map((video, index) => {
                    const isActive = index === currentVideoIndex;
                    const departmentInfo = [
                        { name: 'Production', icon: '🏭', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/30' },
                        { name: 'Account Department', icon: '📊', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400/30' },
                        { name: 'Planning Department', icon: '📅', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30' },
                        { name: 'Warehouse', icon: '📦', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-400/30' }
                    ];
                    
                    return (
                        <div
                            key={index}
                            className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                                isActive ? 'ring-4 ring-yellow-400 scale-105 z-20' : 'hover:scale-102'
                            }`}
                            style={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
                            }}
                        >
                            {/* Preview Image Background */}
                            <img
                                src={panelImages[index] || video}
                                alt={videoTitles[index]}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                                    isActive ? 'opacity-0' : 'opacity-100'
                                }`}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            
                            {/* Video - All videos visible, only active one plays */}
                            <video
                                ref={videoRefs[index]}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                                    isActive ? 'opacity-100 z-10' : 'opacity-30'
                                }`}
                                onEnded={handleVideoEnd}
                                onLoadedData={() => {
                                    // Only auto-play if this is the active video and previous video finished
                                    if (isActive && videoRefs[index].current && index === currentVideoIndex) {
                                        videoRefs[index].current.muted = !audioEnabled || volume === 0 || videoMuted[index];
                                        videoRefs[index].current.volume = audioEnabled ? volume : 0;
                                        // Don't auto-play on load, wait for video end handler
                                    }
                                }}
                                controls
                                muted={!audioEnabled || volume === 0 || videoMuted[index]}
                                autoPlay={false}
                                loop={false}
                                playsInline
                                preload="metadata"
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '100%',
                                    display: 'block'
                                }}
                            >
                                <source src={video} type="video/mp4" />
                            </video>



                            {/* Play Button Overlay - For non-active panels */}
                            {!isActive && (
                                <div 
                                    className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer z-20"
                                    onClick={() => {
                                        setCurrentVideoIndex(index);
                                        if (videoRefs[index].current) {
                                            videoRefs[index].current.muted = !audioEnabled || volume === 0 || videoMuted[index];
                                            videoRefs[index].current.volume = audioEnabled ? volume : 0;
                                            videoRefs[index].current.play().catch(console.error);
                                        }
                                    }}
                                >
                                    <div className="text-white text-6xl opacity-70 hover:opacity-100 transition-opacity">
                                        ▶
                                    </div>
                                </div>
                            )}

                            {/* Progress Indicator - Top Right Corner (small, minimal) */}
                            <div className="absolute top-2 right-2 z-20 flex gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                                {videos.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1 rounded-full transition-all duration-300 ${
                                            idx < currentVideoIndex
                                                ? 'bg-green-500 w-4'
                                                : idx === currentVideoIndex
                                                ? 'bg-yellow-400 w-5'
                                                : 'bg-white/30 w-2'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
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

                .animate-fade-in-up-delay {
                    animation: fade-in-up 1s ease-out 0.3s forwards;
                    opacity: 0;
                }

                /* Custom slider styling */
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgba(255, 215, 0, 1);
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgba(255, 215, 0, 1);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    );
};

export default WelcomePage;

