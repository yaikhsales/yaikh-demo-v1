import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../translate/TranslationContext';

const PhoneViewer = ({ onClose }) => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Define phone image categories
    const phoneCategories = [
        {
            id: 'home-page',
            name: 'Home Page',
            nameKey: 'homePage',
            images: ['home-page1.jpg', 'home-page2.jpg']
        },
        {
            id: 'gatepass',
            name: 'Gate Pass',
            nameKey: 'gatePass',
            images: ['gatepass.jpg', 'gatepass1.jpg', 'gatepass2.jpg', 'gatepass3.jpg', 'gatepass4.jpg']
        },
        {
            id: 'car-booking',
            name: 'Car Booking',
            nameKey: 'myCarBooking',
            images: ['car-booking1.jpg', 'car-booking2.jpg', 'car-booking3.jpg', 'car-booking4.jpg']
        },
        {
            id: 'purchase-request',
            name: 'Purchase Request',
            nameKey: 'purchaseRequest',
            images: ['purchase-request1.jpg', 'purchase-request2.jpg', 'purchase-request3.jpg']
        },
        {
            id: 'training',
            name: 'Training',
            nameKey: 'training',
            images: ['training1.jpg', 'training2.jpg', 'training3.jpg']
        },
        {
            id: 'waste',
            name: 'Waste',
            nameKey: 'waste',
            images: ['waste1.jpg', 'waste2.jpg']
        },
        {
            id: 'ytm',
            name: 'YTM',
            nameKey: 'ytm',
            images: ['ytm1.jpg', 'ytm2.jpg', 'ytm3.jpg', 'ytm4.jpg']
        },
        {
            id: 'ym-shop',
            name: 'YM Shop',
            nameKey: 'yShop',
            images: ['ym-shop1.jpg', 'ym-shop2.jpg']
        },
        {
            id: 'ym-tickets',
            name: 'YM Tickets',
            nameKey: 'supportTicket',
            images: ['ym-tickets1.jpg', 'ym-tickets2.jpg']
        },
        {
            id: 'web',
            name: 'Web',
            nameKey: 'web',
            images: ['web.jpg']
        }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentImageIndex(0);
    };

    const handleBackToCategories = useCallback(() => {
        setSelectedCategory(null);
        setCurrentImageIndex(0);
    }, []);

    const handleNextImage = useCallback(() => {
        if (selectedCategory && currentImageIndex < selectedCategory.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    }, [selectedCategory, currentImageIndex]);

    const handlePrevImage = useCallback(() => {
        if (selectedCategory && currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    }, [selectedCategory, currentImageIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                if (selectedCategory) {
                    handleBackToCategories();
                } else {
                    onClose();
                }
            } else if (selectedCategory) {
                if (e.key === 'ArrowLeft') {
                    handlePrevImage();
                } else if (e.key === 'ArrowRight') {
                    handleNextImage();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedCategory, handleNextImage, handlePrevImage, handleBackToCategories, onClose]);

    const getImagePath = (imageName) => {
        return `/assets/phone/${imageName}`;
    };

    // If no category selected, show category selection
    if (!selectedCategory) {
        return (
            <div 
                className="fixed inset-0 z-[300] bg-black/20 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-3 justify-center flex-1">
                        <h2 className="text-xl font-bold text-gray-800 bg-white/90 px-4 py-2 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm">{t('phoneScreenshots') || 'Phone Screenshots'}</h2>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-lg transition-all shadow-lg border border-gray-200 backdrop-blur-sm"
                            aria-label={t('close')}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Module Buttons Form - No Background */}
                <div className="flex-1 overflow-auto mt-16 mb-8 p-6 bg-transparent">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {phoneCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    className="group relative bg-transparent hover:bg-transparent border-0 rounded-xl p-3 transition-all hover:scale-105 flex flex-col items-center gap-3 text-center"
                                >
                                    {/* Phone Preview - Bigger */}
                                    <div className="relative w-32 h-64 sm:w-40 sm:h-80 md:w-48 md:h-96 bg-black rounded-2xl p-2 flex-shrink-0 shadow-2xl border-4 border-gray-800">
                                        <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                                            <img
                                                src={getImagePath(category.images[0])}
                                                alt={t(category.nameKey) || category.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        {/* Small Notch */}
                                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-b-lg"></div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <span className="text-white text-sm sm:text-base md:text-lg font-bold group-hover:text-blue-300 transition-colors drop-shadow-2xl bg-black/70 px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 shadow-xl">
                                            {t(category.nameKey) || category.name}
                                        </span>
                                        <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-xl bg-black/60 px-3 py-1 rounded-md backdrop-blur-md border border-white/10 shadow-lg">
                                            {category.images.length} {t('images') || 'images'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show phone frame with images
    const currentImage = selectedCategory.images[currentImageIndex];
    const hasMultipleImages = selectedCategory.images.length > 1;

    return (
        <div 
            className="fixed inset-0 z-[300] bg-black/20 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleBackToCategories();
            }}
        >
            {/* Phone Frame Display */}
            <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-6 bg-transparent">
                {/* Header with Back, Title, and Close - Positioned at top */}
                <div className="relative w-full max-w-[414px] flex items-center justify-between mb-4 px-4">
                    <button
                        onClick={handleBackToCategories}
                        className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-lg transition-all shadow-lg border border-gray-200 backdrop-blur-sm z-30"
                    >
                        <ChevronLeft size={18} />
                        <span className="text-sm font-medium">{t('back')}</span>
                    </button>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 bg-white/90 px-4 py-2 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm whitespace-nowrap">
                        {t(selectedCategory.nameKey) || selectedCategory.name}
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-lg transition-all shadow-lg border border-gray-200 backdrop-blur-sm z-30"
                        aria-label={t('close')}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Phone Frame Container */}
                <div className="relative flex items-center gap-4 max-w-full">
                    {/* Previous Button - Always visible when multiple images */}
                    {hasMultipleImages && (
                        <button
                            onClick={handlePrevImage}
                            disabled={currentImageIndex === 0}
                            className={`flex-shrink-0 p-4 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-all border-2 border-gray-300 hover:border-blue-500 z-20 shadow-xl backdrop-blur-sm ${
                                currentImageIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 hover:shadow-2xl'
                            }`}
                            aria-label={t('previous')}
                        >
                            <ChevronLeft size={32} strokeWidth={2.5} />
                        </button>
                    )}

                    {/* Phone Frame Container */}
                    <div className="relative">
                        {/* Phone Frame */}
                        <div className="relative w-[300px] sm:w-[375px] md:w-[414px] bg-black rounded-[3rem] px-3 pt-0 pb-3 shadow-2xl border-8 border-gray-900 transition-all duration-300 flex-shrink-0">
                            {/* Screen - Scrollable to show all content, extends to top */}
                            <div 
                                className="w-full h-[600px] sm:h-[750px] md:h-[828px] bg-white rounded-[2.5rem] overflow-y-auto overflow-x-hidden relative shadow-inner"
                                style={{ 
                                    scrollbarWidth: 'thin', 
                                    scrollbarColor: '#cbd5e1 transparent', 
                                    marginTop: 0, 
                                    paddingTop: 0,
                                    borderTopLeftRadius: '1.5rem',
                                    borderTopRightRadius: '1.5rem'
                                }}
                                onTouchStart={(e) => {
                                    const touch = e.touches[0];
                                    e.currentTarget.dataset.touchStartX = touch.clientX;
                                    e.currentTarget.dataset.touchStartY = touch.clientY;
                                }}
                                onTouchEnd={(e) => {
                                    const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX || '0');
                                    const touchStartY = parseFloat(e.currentTarget.dataset.touchStartY || '0');
                                    const touchEndX = e.changedTouches[0].clientX;
                                    const touchEndY = e.changedTouches[0].clientY;
                                    const diffX = touchStartX - touchEndX;
                                    const diffY = touchStartY - touchEndY;
                                    
                                    // Only trigger navigation if horizontal swipe is greater than vertical
                                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                                        if (diffX > 0 && currentImageIndex < selectedCategory.images.length - 1) {
                                            handleNextImage();
                                        } else if (diffX < 0 && currentImageIndex > 0) {
                                            handlePrevImage();
                                        }
                                    }
                                }}
                            >
                                <div className="w-full min-h-full bg-white" style={{ padding: 0, margin: 0 }}>
                                    <img
                                        src={getImagePath(currentImage)}
                                        alt={`${selectedCategory.name} - ${currentImageIndex + 1}`}
                                        className="w-full h-auto select-none"
                                        style={{ 
                                            display: 'block', 
                                            maxWidth: '100%',
                                            width: '100%',
                                            margin: 0,
                                            padding: 0,
                                            verticalAlign: 'top'
                                        }}
                                        draggable={false}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500">Image not found</div>';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
                        </div>

                        {/* Image Counter Badge */}
                        {hasMultipleImages && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold border-2 border-gray-300 shadow-xl backdrop-blur-sm">
                                {currentImageIndex + 1} / {selectedCategory.images.length}
                            </div>
                        )}
                    </div>

                    {/* Next Button - Always visible when multiple images */}
                    {hasMultipleImages && (
                        <button
                            onClick={handleNextImage}
                            disabled={currentImageIndex === selectedCategory.images.length - 1}
                            className={`flex-shrink-0 p-4 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-all border-2 border-gray-300 hover:border-blue-500 z-20 shadow-xl backdrop-blur-sm ${
                                currentImageIndex === selectedCategory.images.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 hover:shadow-2xl'
                            }`}
                            aria-label={t('next')}
                        >
                            <ChevronRight size={32} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default PhoneViewer;

