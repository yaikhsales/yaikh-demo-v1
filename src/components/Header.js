import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, Mail, Calendar, MessageCircle,
    Bell, ChevronDown, QrCode, FileText, DollarSign,
    ShoppingCart, Ticket, Globe, Video, Info
} from 'lucide-react';
import PdfViewer from './PdfViewer';
import ImageViewer from './ImageViewer';
import AboutUs from './AboutUs';

const Header = () => {
  const navigate = useNavigate();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('AT');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <>
      <header className="bg-white shadow-md px-4 py-1 flex justify-between items-center sticky top-0 z-50 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4 h-full">
          <div className="flex-shrink-0 cursor-pointer">
              <img src="/logo.jpg" alt="Logo" className="h-10" />
          </div>
          <div className="h-8 w-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded transition">
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
               <img src="https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg" alt="User" className="w-full h-full object-cover"/>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-1">
                 <h2 className="text-sm font-bold text-gray-800">Sin Khon</h2>
                 <ChevronDown size={14} className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">ID: YM7584</p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-2">
             <QrCode className="w-6 h-6 text-black cursor-pointer hover:text-gray-600" />
             <div className="relative cursor-pointer hover:text-blue-600 text-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">24</span>
             </div>
             <Bell className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
          </div>
        </div>
        
        {/* Center: Video, About Us, Vendor, and Price Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <button
            onClick={() => navigate('/welcome')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Video size={18} />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button
            onClick={() => setShowAboutUs(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Info size={18} />
            <span className="hidden sm:inline">About Us</span>
          </button>
          <button
            onClick={() => setShowPdfViewer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Vendor</span>
          </button>
          <button
            onClick={() => setShowImageViewer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <DollarSign size={18} />
            <span className="hidden sm:inline">Price</span>
          </button>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-3 text-gray-500">
            <Home className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Calendar className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <div className="relative">
                <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                {/* Three dots inside chat bubble - using absolute positioning */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-0.5 pointer-events-none">
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                </div>
            </div>
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Ticket className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            
            {/* Country Selector */}
            <div className="relative">
                <div 
                    className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => {
                        setShowCountryDropdown(!showCountryDropdown);
                        setShowLanguageDropdown(false);
                    }}
                >
                    <span className="text-red-600 font-bold text-lg underline decoration-2 decoration-red-600 underline-offset-4">{selectedCountry}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>
                {showCountryDropdown && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowCountryDropdown(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[120px] py-1">
                            {['AT', 'US', 'UK', 'DE', 'FR'].map((country) => (
                                <button
                                    key={country}
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setShowCountryDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
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
            <div className="relative">
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => {
                        setShowLanguageDropdown(!showLanguageDropdown);
                        setShowCountryDropdown(false);
                    }}
                >
                    <img 
                        src="https://flagcdn.com/w20/gb.png" 
                        alt="English" 
                        className="w-4 h-3 object-cover rounded"
                    />
                    <span className="text-sm text-gray-700">{selectedLanguage}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>
                {showLanguageDropdown && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowLanguageDropdown(false)}
                        />
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[150px] py-1">
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
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2 ${
                                        selectedLanguage === lang.name ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                                    }`}
                                >
                                    <img 
                                        src={lang.flag} 
                                        alt={lang.name} 
                                        className="w-4 h-3 object-cover rounded"
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