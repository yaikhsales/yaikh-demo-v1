import React from 'react';
import { X, Image } from 'lucide-react';

const SupportTicketForm = ({ onClose, onSubmit }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-auto max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
                {/* Header */}
                <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Create New Support Ticket</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Subject */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-bold text-gray-600 block mb-2" htmlFor="subject">Subject</label>
                            <input type="text" id="subject" className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Printer is not working" />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="text-sm font-bold text-gray-600 block mb-2" htmlFor="type">Ticket Type</label>
                            <select id="type" className="w-full border rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>IT Support</option>
                                <option>Maintenance</option>
                                <option>HR Request</option>
                                <option>General Inquiry</option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="text-sm font-bold text-gray-600 block mb-2" htmlFor="image">Attach Image</label>
                            <div className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:bg-slate-50">
                                <Image className="mx-auto text-slate-400 mb-2" />
                                <span className="text-sm text-slate-500">Click to upload</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-bold text-gray-600 block mb-2" htmlFor="details">Details</label>
                            <textarea id="details" rows="5" className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Please provide a detailed description of the issue..."></textarea>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 border-t flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 transition">Cancel</button>
                    <button onClick={onSubmit} className="px-6 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md">Submit Ticket</button>
                </div>
            </div>
        </div>
    );
};

export default SupportTicketForm;