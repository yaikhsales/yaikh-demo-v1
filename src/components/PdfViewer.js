import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const PdfViewer = ({ pdfPath, onClose }) => {
    const [scale, setScale] = useState(1);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
    const handleReset = () => setScale(1);
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === '+' || e.key === '=') handleZoomIn();
        if (e.key === '-') handleZoomOut();
        if (e.key === 'r' || e.key === 'R') handleReset();
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div 
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-300"
            onClick={(e) => {
                // Close when clicking on backdrop (not on PDF)
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                >
                    <X size={18} />
                    <span className="text-sm font-medium">Close</span>
                </button>
                
                <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Zoom Out (-)"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-lg backdrop-blur-sm border border-white/10">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        disabled={scale >= 2}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Zoom In (+)"
                    >
                        <ZoomIn size={18} />
                    </button>
                    
                    {/* Reset */}
                    {(scale !== 1) && (
                        <button
                            onClick={handleReset}
                            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all backdrop-blur-sm border border-white/10"
                            title="Reset"
                        >
                            Reset
                        </button>
                    )}
                    
                    {/* Download */}
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
                        title="Download PDF"
                    >
                        <Download size={18} />
                        <span className="text-sm font-medium">Download</span>
                    </button>
                </div>
            </div>

            {/* PDF Container */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto mt-16">
                <div
                    className="relative transition-transform duration-300 ease-out"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'center center',
                    }}
                >
                    <iframe
                        src={`${pdfPath}#toolbar=0`}
                        className="w-[90vw] h-[90vh] rounded-lg shadow-2xl border-0"
                        title="PDF Viewer"
                        style={{
                            maxWidth: '1200px',
                            maxHeight: '800px',
                        }}
                    />
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-center">
                    <p className="text-white/70 text-sm font-medium">Vendor Information</p>
                    <p className="text-white/50 text-xs mt-1">Press ESC to close • Use +/- to zoom • Press R to reset</p>
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;

