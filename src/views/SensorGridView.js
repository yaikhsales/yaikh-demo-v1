import React from 'react';
import { ArrowLeft, Wind, Thermometer, Droplets } from 'lucide-react';

const SensorGridView = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-800">Air Quality Sensors</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
                <div key={s} className="border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <Wind size={24} />
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                            Online
                        </span>
                    </div>
                    <h3 className="font-bold text-lg mb-4">Sensor Node #{s}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Thermometer className="mx-auto text-red-400 mb-1" size={20} />
                            <div className="text-xl font-bold">24°C</div>
                            <div className="text-xs text-gray-500">Temp</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Droplets className="mx-auto text-blue-400 mb-1" size={20} />
                            <div className="text-xl font-bold">60%</div>
                            <div className="text-xs text-gray-500">Humidity</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SensorGridView;

