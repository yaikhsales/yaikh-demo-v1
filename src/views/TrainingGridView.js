import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BookOpen } from 'lucide-react';

const TrainingGridView = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-lg bg-slate-100">
                <ArrowLeft size={18} /> Back
            </button>
            <a
                href="/"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                title="Home"
            >
                <img 
                    src="/logo.jpg" 
                    alt="Home" 
                    className="w-full h-full object-cover"
                />
            </a>
            <h2 className="text-xl font-bold text-slate-800">Training Courses</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6 overflow-auto">
            {['Orientation', 'Safety', 'Compliance', 'Technical', 'Soft Skills', 'Leadership', 'IT Security', 'First Aid', 'Quality Control', 'Inventory', 'Customer Svc', 'Management'].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-20 h-20 bg-slate-50 border rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-300 transition-all">
                        <BookOpen size={32} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-xs font-bold text-center text-slate-600 group-hover:text-blue-600">
                        {item}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default TrainingGridView;

