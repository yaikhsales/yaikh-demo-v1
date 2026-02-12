import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  X,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ImageView = ({ onBack }) => {
  const params = useParams();
  const location = useLocation();
  const imagePathFromUrl = params["*"];

  // Gallery state from location state
  const { gallery = [], title: galleryTitle = "" } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image path - ensure it starts with / and doesn't duplicate assets/
  const normalizeImagePath = (path) => {
    if (!path) return "";

    try {
      // Decode URL-encoded characters (handles %2F for slashes, etc.)
      let decoded = decodeURIComponent(path);

      // Remove leading slash if present
      let normalized = decoded.startsWith("/") ? decoded.slice(1) : decoded;

      // Remove 'assets/' if it's duplicated (e.g., 'assets/assets/...')
      normalized = normalized.replace(/^assets\/assets\//, "assets/");

      // If path doesn't start with 'assets/', add it
      if (!normalized.startsWith("assets/")) {
        normalized = `assets/${normalized}`;
      }

      // Ensure it starts with / for absolute path
      const finalPath = `/${normalized}`;

      return finalPath;
    } catch (e) {
      // If decoding fails, try using the path as-is
      console.error("Error decoding image path:", path, e);
      let normalized = path.startsWith("/") ? path.slice(1) : path;
      if (!normalized.startsWith("assets/")) {
        normalized = `assets/${normalized}`;
      }
      return `/${normalized}`;
    }
  };

  // Determine current image path
  const currentImagePath =
    gallery.length > 0 ? gallery[currentIndex] : imagePathFromUrl;
  const imageUrl = normalizeImagePath(currentImagePath);
  const altText =
    galleryTitle ||
    (currentImagePath
      ? currentImagePath.split("/").pop().split(".")[0]
      : "Displayed image");

  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset zoom and rotation when current image changes
    setScale(1);
    setRotation(0);
    setIsLoading(true);
    setHasError(false);
  }, [currentImagePath]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const handleNext = () => {
    if (gallery.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrev = () => {
    if (gallery.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") onBack();
    if (e.key === "+" || e.key === "=") handleZoomIn();
    if (e.key === "-") handleZoomOut();
    if (e.key === "r" || e.key === "R") handleRotate();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[300] bg-white flex flex-col animate-in fade-in duration-300"
      onKeyDown={handleKeyPress}
    >
      {/* Premium Dashboard Header */}
      <div className="bg-white p-3 border-b flex items-center justify-between flex-shrink-0 shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors font-bold text-sm shadow-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight capitalize">
            {altText.replace(/-/g, " ")}
            {gallery.length > 1 && (
              <span className="ml-3 text-slate-400 font-medium text-sm">
                [{currentIndex + 1} / {gallery.length}]
              </span>
            )}
          </h1>
        </div>

        {/* Header Controls Area */}
        <div className="flex items-center gap-3">
          {/* Zoom / Rotate Controls Group */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600 disabled:opacity-30"
              title="Zoom Out (-)"
            >
              <ZoomOut size={18} />
            </button>

            <div className="px-3 text-xs font-black text-slate-600 min-w-[60px] text-center italic">
              {Math.round(scale * 100)}%
            </div>

            <button
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600 disabled:opacity-30"
              title="Zoom In (+)"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <div className="h-8 w-[1px] bg-slate-200"></div>

          <button
            onClick={handleRotate}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-lg transition-all border border-transparent hover:border-slate-200"
            title="Rotate (R)"
          >
            <RefreshCw size={20} />
          </button>

          <button
            onClick={onBack}
            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all border border-transparent hover:border-red-100"
            title="Close (ESC)"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Content Area - Dashboard Display */}
      <div className="flex-1 overflow-auto bg-slate-50 flex items-start justify-center relative p-6">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Loading Dashboard...
              </span>
            </div>
          </div>
        )}

        {/* Gallery Navigation - Sleek Overlay Buttons */}
        {gallery.length > 1 && (
          <>
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[310]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110 active:scale-95">
                  <ChevronLeft size={36} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  Previous
                </span>
              </button>
            </div>

            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[310]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110 active:scale-95">
                  <ChevronRight size={36} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  Next
                </span>
              </button>
            </div>
          </>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center gap-6 text-center max-w-xl self-center p-12 bg-white rounded-3xl shadow-2xl border border-slate-100">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
              <X size={48} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">
                Dashboard Content Unavailable
              </h3>
              <p className="text-slate-500 mb-6 font-medium leading-relaxed">
                The requested dashboard resource could not be loaded. This might
                be due to a missing asset or a synchronization issue.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left mb-6">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  Path Target:
                </p>
                <p className="text-slate-600 text-sm font-mono break-all">
                  {imageUrl}
                </p>
              </div>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-200"
              >
                Return to Modules
              </button>
            </div>
          </div>
        ) : (
          <div
            className="inline-block relative transition-transform duration-300 ease-out py-10"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transformOrigin: "center top",
            }}
          >
            <div className="bg-white p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden">
              <img
                src={imageUrl}
                alt={altText}
                onLoad={() => {
                  setIsLoading(false);
                  setHasError(false);
                }}
                onError={(e) => {
                  setIsLoading(false);
                  setHasError(true);
                  console.error("Image load error:", {
                    imageUrl,
                    currentImagePath,
                    src: e.target.src,
                  });
                }}
                className="max-w-[92vw] h-auto object-contain select-none align-bottom"
                draggable={false}
              />
            </div>

            {/* Micro-indicators for rotation/scaling help */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">
              <span>Rotation: {rotation}°</span>
              <span>Scale: {Math.round(scale * 100)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Premium Help Bar */}
      <div className="bg-white border-t px-8 py-2 flex items-center justify-center text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase">
        YAIKH Professional Dashboard Environment • ESC to close • +/- to zoom •
        Left/Right to browse
      </div>
    </div>
  );
};

export default ImageView;
