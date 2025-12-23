import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer } from 'lucide-react';

const Temperature = ({ onBack }) => {
    const navigate = useNavigate();

    // Sample device data
    const devices = [
        { id: 1, name: 'Fabric Inspection', deviceId: 'a8fbe8708a8a49709c9b', price: '฿ 800.00' },
        { id: 2, name: 'Fabric WHD', deviceId: 'b9fce9819b9b59819d0c', price: '฿ 800.00' },
        { id: 3, name: 'QA room', deviceId: 'c0gdf0920c0c60920e1d', price: '฿ 800.00' },
        { id: 4, name: 'Cutting', deviceId: 'd1hef1a31d1d71a31f2e', price: '฿ 800.00' },
        { id: 5, name: 'Assembling Room', deviceId: 'e2ifg2b42e2e82b42g3f', price: '฿ 800.00' },
        { id: 6, name: 'Supervisor room', deviceId: 'f3jgh3c53f3f93c53h4g', price: '฿ 800.00' },
        { id: 7, name: 'Fabric folding', deviceId: 'a4khi4d64a4a04d64i5h', price: '฿ 800.00' },
        { id: 8, name: 'Fabric WHD', deviceId: 'b5lij5e75b5b15e75j6i', price: '฿ 800.00' },
        { id: 9, name: 'Deliverally Room', deviceId: 'c6mjk6f86c6c26f86k7j', price: '฿ 800.00' },
        { id: 10, name: 'Packing', deviceId: 'd7nkl7g97d7d37g97l8k', price: '฿ 800.00' },
        { id: 11, name: 'Sewing C', deviceId: 'e8olm8h08e8e48h08m9l', price: '฿ 800.00' },
        { id: 12, name: 'Winding Dept', deviceId: 'f9pmn9i19f9f59i19n0m', price: '฿ 800.00' },
        { id: 13, name: 'Assembling Room', deviceId: 'a0qno0j20a0a60j20o1n', price: '฿ 800.00' },
        { id: 14, name: 'Fabric Releasing', deviceId: 'b1rop1k31b1b71k31p2o', price: '฿ 800.00' },
        { id: 15, name: 'UGGIR Sewing B', deviceId: 'c2spq2l42c2c82l42q3p', price: '฿ 800.00' },
        { id: 16, name: 'RCC', deviceId: 'd3tqr3m53d3d93m53r4q', price: '฿ 800.00' },
        { id: 17, name: 'Sewing A', deviceId: 'e4urs4n64e4e04n64s5r', price: '฿ 800.00' },
        { id: 18, name: 'Finish Goods WHD', deviceId: 'f5vst5o75f5f15o75t6s', price: '฿ 800.00' },
        { id: 19, name: 'Example', deviceId: 'a6wtu6p86a6a26p86u7t', price: '฿ 800.00' },
        { id: 20, name: 'Office', deviceId: 'b7xuv7q97b7b37q97v8u', price: '฿ 800.00' },
        { id: 21, name: 'Carton Keeping Area', deviceId: 'c8yvw8r08c8c48r08w9v', price: '฿ 800.00' },
        { id: 22, name: 'Finishing', deviceId: 'd9zxw9s19d9d59s19x0w', price: '฿ 800.00' }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleDeviceClick = (deviceId) => {
        console.log('View device details:', deviceId);
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-slate-600 p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <button 
                    onClick={handleBack} 
                    className="p-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0 bg-slate-700 text-white font-semibold px-3 py-1 text-sm"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} className="inline" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center">Temperature and Humidity Sensor's Device List</h1>
                <div className="w-16"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {/* White Content Card */}
                    <div className="bg-white rounded-lg border border-slate-300 p-6">
                        {/* Device Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {devices.map((device) => (
                                <div
                                    key={device.id}
                                    onClick={() => handleDeviceClick(device.deviceId)}
                                    className="bg-white border border-slate-300 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    {/* Device Icon */}
                                    <div className="w-full h-24 bg-slate-800 rounded-lg flex items-center justify-center mb-3">
                                        <div className="grid grid-cols-4 gap-1 p-2">
                                            {Array.from({ length: 16 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-2 h-2 bg-white rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Device Name */}
                                    <h3 className="font-bold text-slate-800 mb-2 text-center min-h-[40px] flex items-center justify-center">
                                        {device.name}
                                    </h3>

                                    {/* Device ID */}
                                    <div className="text-xs text-slate-500 font-mono mb-3 text-center">
                                        {device.deviceId}
                                    </div>

                                    {/* Price/Status */}
                                    <div className="text-center">
                                        <span className="text-green-600 font-semibold text-sm">
                                            {device.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temperature;

