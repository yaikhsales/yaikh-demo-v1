import React from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

// Background Component - Only displays bg.jpg
export const ThemeBackground = () => {
    const location = useLocation();

    // Show background on home page and dashboard
    if (location.pathname !== '/' && !location.pathname.startsWith('/dashboard')) {
        return null;
    }

    // Render bg.jpg background
    return createPortal(
        <div 
            id="background"
            className="fixed inset-0 overflow-hidden pointer-events-none" 
            style={{ 
                zIndex: -1, 
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
            {/* Background Image - bg.jpg */}
            <img
                src="/assets/background/bg.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{
                    zIndex: -1,
                    minHeight: '100vh',
                    width: '100vw',
                    height: '100vh',
                    opacity: 1,
                    display: 'block'
                }}
                onError={(e) => {
                    console.error('Failed to load background image:', '/assets/background/bg.jpg');
                    e.target.style.display = 'none';
                }}
                onLoad={() => {
                    console.log('Background image loaded successfully');
                }}
            />
        </div>,
        document.body
    );
};
