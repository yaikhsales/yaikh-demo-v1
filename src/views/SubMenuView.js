import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IconRenderer } from '../components/IconRenderer';

const SubMenuView = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { state } = useLocation();
    const { title = 'Submenu', cards = [] } = state || {};

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] animate-in fade-in zoom-in duration-300">
            <div className="w-full max-w-4xl mb-8 flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white hover:text-cyan-400 gap-2 font-bold bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm"
                >
                    <ArrowLeft /> Dashboard
                </button>
                <h2 className="text-3xl text-white font-bold ml-auto mr-auto uppercase tracking-wider drop-shadow-lg">
                    {title}
                </h2>
                <div className="w-32"></div>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
                {cards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() =>
                            card.action
                                ? navigate(card.action)
                                : card.image
                                ? navigate(`/image/${card.image}`)
                                : navigate(`/submenu/${moduleId}`)
                        }
                        className={`w-48 h-40 rounded-xl shadow-xl hover:scale-105 transition transform flex flex-col items-center justify-center gap-4 border-b-4 border-black/20 ${
                            card.color || 'bg-white text-slate-800'
                        }`}
                    >
                        <div className="bg-black/5 p-4 rounded-full">
                            <IconRenderer iconName={card.icon} size={40} />
                        </div>
                        <span className="font-bold text-lg text-center px-2 leading-tight">
                            {card.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubMenuView;

