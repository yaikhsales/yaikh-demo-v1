import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, Mail, Calendar, MessageCircle,
    Bell, ChevronDown, QrCode, FileText, DollarSign,
    ShoppingCart, Ticket, Globe, Video, Info, Menu, X, Image
} from 'lucide-react';
import PdfViewer from './PdfViewer';
import ImageViewer from './ImageViewer';
import BookViewer from './BookViewer';
import AboutUs from './AboutUs';
import { useWindowSize, useIsMobile } from '../device-responsive/responsive';

const Header = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = useIsMobile();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [showPictureViewer, setShowPictureViewer] = useState(false);
  const [showBookViewer, setShowBookViewer] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('AT');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <>
      <header className="bg-white shadow-md px-2 sm:px-4 py-1 flex justify-between items-center sticky top-0 z-50 h-14 sm:h-16">
        {/* Left Section */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 h-full flex-shrink-0">
          <div 
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
              <img src="/logo.jpg" alt="Logo" className="h-8 sm:h-10" />
          </div>
          <div className="h-6 sm:h-8 w-[1px] bg-gray-300 hidden sm:block"></div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 p-0.5 sm:p-1 rounded transition">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
               <img src="https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg" alt="User" className="w-full h-full object-cover"/>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-1">
                 <h2 className="text-xs sm:text-sm font-bold text-gray-800">Sin Khon</h2>
                 <ChevronDown size={12} className="text-gray-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500">ID: YM7584</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 ml-1 sm:ml-2">
             <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-gray-600 hidden xs:block" />
             <div className="relative cursor-pointer hover:text-blue-600 text-gray-700">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full font-bold">24</span>
             </div>
             <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer hover:text-blue-600 hidden sm:block" />
          </div>
        </div>
        
        {/* Center: Mobile Menu Button */}
        {isMobile && (
          <div className="flex-1 flex justify-center items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}
        
        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 text-gray-500 flex-shrink-0">
            {/* Video, About Us, Vendor, Price, and Pictures Icons */}
            {!isMobile && (
              <>
                <button
                  onClick={() => navigate('/welcome')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Video"
                >
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setShowAboutUs(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="About Us"
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setShowPdfViewer(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Vendor"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setShowImageViewer(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Price"
                >
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setShowBookViewer(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Pictures"
                >
                  <Image className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-600" strokeWidth={1.5} />
                </button>
              </>
            )}
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-blue-600 hidden md:block" />
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-blue-600 hidden md:block" />
            <div className="relative hidden lg:block">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-blue-600" />
                {/* Three dots inside chat bubble - using absolute positioning */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-0.5 pointer-events-none">
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                </div>
            </div>
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-blue-600 hidden lg:block" />
            <Ticket className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-blue-600 hidden lg:block" />
            
            {/* Country Selector */}
            <div className="relative">
                <div 
                    className="flex items-center gap-0.5 sm:gap-1 cursor-pointer hover:bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded"
                    onClick={() => {
                        setShowCountryDropdown(!showCountryDropdown);
                        setShowLanguageDropdown(false);
                    }}
                >
                    <span className="text-red-600 font-bold text-sm sm:text-base md:text-lg underline decoration-2 decoration-red-600 underline-offset-2 sm:underline-offset-4">{selectedCountry}</span>
                    <ChevronDown size={12} className="text-gray-400 hidden sm:block" />
                </div>
                {showCountryDropdown && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowCountryDropdown(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[100px] sm:min-w-[120px] py-1">
                            {['AT', 'US', 'UK', 'DE', 'FR'].map((country) => (
                                <button
                                    key={country}
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setShowCountryDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 text-xs sm:text-sm ${
                                        selectedCountry === country ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                                    }`}
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            {/* Language Selector */}
            <div className="relative hidden sm:block">
                <div 
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded"
                    onClick={() => {
                        setShowLanguageDropdown(!showLanguageDropdown);
                        setShowCountryDropdown(false);
                    }}
                >
                    <img 
                        src="https://flagcdn.com/w20/gb.png" 
                        alt="English" 
                        className="w-3 h-2.5 sm:w-4 sm:h-3 object-cover rounded"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 hidden md:inline">{selectedLanguage}</span>
                    <ChevronDown size={12} className="text-gray-400" />
                </div>
                {showLanguageDropdown && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowLanguageDropdown(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[120px] sm:min-w-[150px] py-1">
                            {[
                                { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
                                { code: 'km', name: 'ខ្មែរ', flag: 'https://flagcdn.com/w20/kh.png' },
                                { code: 'zh', name: '中文', flag: 'https://flagcdn.com/w20/cn.png' },
                                
                            ].map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLanguage(lang.name);
                                        setShowLanguageDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 text-xs sm:text-sm flex items-center gap-2 ${
                                        selectedLanguage === lang.name ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                                    }`}
                                >
                                    <img 
                                        src={lang.flag} 
                                        alt={lang.name} 
                                        className="w-3 h-2.5 sm:w-4 sm:h-3 object-cover rounded"
                                    />
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            <div className="hidden 2xl:flex gap-2 ml-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 cursor-pointer hover:opacity-80 transition" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 cursor-pointer hover:opacity-80 transition" />
            </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute right-0 top-14 w-64 bg-white shadow-xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 space-y-2">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h3 className="font-bold text-gray-800">Menu</h3>
                <button onClick={() => setShowMobileMenu(false)} className="p-1 rounded hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => { navigate('/welcome'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium"
                >
                  <Video size={18} />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => { setShowAboutUs(true); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all font-medium"
                >
                  <Info size={18} />
                  <span>About Us</span>
                </button>
                <button
                  onClick={() => { setShowPdfViewer(true); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium"
                >
                  <FileText size={18} />
                  <span>Vendor</span>
                </button>
                <button
                  onClick={() => { setShowImageViewer(true); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium"
                >
                  <DollarSign size={18} />
                  <span>Price</span>
                </button>
                <button
                  onClick={() => { setShowBookViewer(true); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all font-medium"
                >
                  <Image size={18} />
                  <span>Pictures</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">Quick Actions</h4>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <Home size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Home</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <Mail size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Mail</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <Calendar size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Calendar</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <MessageCircle size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Chat</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <ShoppingCart size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Cart</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition">
                  <Ticket size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Tickets</span>
                </button>
              </div>

              {/* Language Selector for Mobile */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Language</h4>
                <div className="space-y-1">
                  {[
                    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
                    { code: 'km', name: 'ខ្មែរ', flag: 'https://flagcdn.com/w20/kh.png' },
                    { code: 'zh', name: '中文', flag: 'https://flagcdn.com/w20/cn.png' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        selectedLanguage === lang.name ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-4 h-3 object-cover rounded" />
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
  {/* PDF Viewer Modal */}
  {showPdfViewer && (
    <PdfViewer 
      pdfPath="/assets/vendor/vendor.pdf" 
      onClose={() => setShowPdfViewer(false)} 
    />
  )}
  
  {/* Image Viewer Modal */}
  {showImageViewer && (
    <ImageViewer 
      imagePath="/assets/vendor/price.png" 
      onClose={() => setShowImageViewer(false)} 
    />
  )}
  
  {/* Book Viewer Modal */}
  {showBookViewer && (
    <BookViewer 
      onClose={() => setShowBookViewer(false)} 
    />
  )}
  
  {/* About Us Modal */}
  {showAboutUs && (
    <AboutUs 
      onClose={() => setShowAboutUs(false)} 
    />
  )}
  </>
  );
};

export default Header;