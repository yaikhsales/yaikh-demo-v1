import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Minimize,
} from "lucide-react";
import { useTranslation } from "../translate/TranslationContext";

const PWIP = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Zoom and Pan States
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const images = [
    { src: "/assets/pwip/pwip1.jpg", alt: "PWIP Image 1" },
    { src: "/assets/pwip/pwip2.jpg", alt: "PWIP Image 2" },
    { src: "/assets/pwip/pwip3.jpg", alt: "PWIP Image 3" },
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetZoom();
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
    resetZoom();
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  // Panning Logic
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      setScale((prev) => {
        const newScale = Math.min(Math.max(prev + delta, 1), 4);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
        return newScale;
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col overflow-hidden z-[100] select-none"
      onWheel={handleWheel}
    >
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 z-[110] bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        <button
          onClick={handleBack}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20 shadow-lg group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-semibold">{t("back")}</span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-1 mr-4">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <div className="flex items-center px-2 text-white text-xs font-mono min-w-[50px] justify-center">
              {Math.round(scale * 100)}%
            </div>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={resetZoom}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-colors border-l border-white/10 ml-1"
              title="Reset Zoom"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all hover:scale-110 shadow-xl"
          >
            <img
              src="/logo.jpg"
              alt="Home"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Viewer Area */}
      <div
        ref={containerRef}
        className={`relative flex-1 flex items-center justify-center bg-black overflow-hidden ${scale > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Manual Navigation Arrows - Hidden when zoomed in significantly to prevent accidental clicks */}
        {scale === 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 z-[105] p-4 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 z-[105] p-4 rounded-full bg-black/40 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* The Image */}
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            ref={imageRef}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain pointer-events-none"
            draggable="false"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1920x1080?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Zoom Hint */}
        {scale === 1 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-widest uppercase animate-pulse pointer-events-none">
            Use buttons or Ctrl + Scroll to Zoom • Drag to Pan
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 to-transparent z-[109] pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div className="animate-in slide-in-from-bottom duration-500">
            <span className="text-blue-500 font-bold tracking-widest text-[10px] uppercase mb-1 block">
              Yaikh Production WIP
            </span>
            <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
              {images[currentIndex].alt}
            </h2>
          </div>

          {/* Slide Dots */}
          <div className="flex gap-2 mb-2 pointer-events-auto">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetZoom();
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="text-white/30 text-xs font-mono">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWIP;
