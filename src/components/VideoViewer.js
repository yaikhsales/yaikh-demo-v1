import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, AlertCircle } from "lucide-react";

const VideoViewer = ({ videoPath, onClose }) => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [videoPath]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoPath;
    link.download = videoPath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
      onClick={(e) => {
        // Close when clicking on backdrop (not on video)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        {/* Left: Empty space for balance */}
        <div className="flex-1"></div>

        {/* Center: Home Button and Back Button */}
        <div className="flex items-center gap-3 justify-center flex-1">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0 shadow-lg"
            title="Home"
          >
            <img
              src="/logo.jpg"
              alt="Home"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
            title="Download Video"
          >
            <Download size={18} />
            <span className="text-sm font-medium">Download</span>
          </button>
        </div>
      </div>

      {/* Video Container - Full Screen */}
      <div className="flex-1 flex items-center justify-center overflow-hidden mt-[72px] mb-[64px] px-4 md:px-8">
        {hasError ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md max-w-md w-full">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <AlertCircle size={40} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Video Not Found
              </h3>
              <p className="text-white/70 mb-2 leading-relaxed">
                We couldn't load the video from this specific path. It might
                have been moved or deleted.
              </p>
              <div className="bg-black/40 p-3 rounded-lg mt-4 inline-block">
                <p className="text-white/50 text-xs font-mono break-all text-left">
                  {videoPath}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
            <video
              src={videoPath}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain shadow-2xl rounded-xl bg-black border border-white/20"
              onError={() => setHasError(true)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-center">
          <p className="text-white/80 text-base font-semibold tracking-wide">
            Video Training Materials
          </p>
          <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
            Press ESC to close or click outside the video
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
