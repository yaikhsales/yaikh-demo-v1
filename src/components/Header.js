import React from 'react';
import {
    Home, Mail, Calendar,
    Bell, ChevronDown, QrCode
} from 'lucide-react';

const Header = () => (
  <header className="bg-white shadow-md px-4 py-1 flex justify-between items-center sticky top-0 z-50 h-16">
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
    
    <div className="flex items-center gap-3 text-gray-500">
        <Home className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        <Mail className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        <Calendar className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
            <span className="text-red-600 font-bold text-lg underline decoration-2 decoration-red-600 underline-offset-4">AT</span>
            <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="hidden 2xl:flex gap-2 ml-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 cursor-pointer hover:opacity-80 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 cursor-pointer hover:opacity-80 transition" />
        </div>
    </div>
  </header>
);

export default Header;