import React, { useState } from 'react';
import { ArrowLeft, Plus, Ticket as TicketIcon } from 'lucide-react';
import SupportTicketForm from '../support-tickets/form';

const SupportTicketView = ({ onBack }) => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const columns = ['REF', 'Type', 'Subject', 'Image', 'Details', 'Created Date', 'Plan Date', 'Finish Date', 'Status'];

    const handleRowClick = (request) => {
        setSelectedRequest(request);
        setShowForm(true);
    };

    return (
        <>
            <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 relative z-10">
                <div className="bg-slate-100 p-4 border-b flex justify-between items-center flex-shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={onBack} 
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800">Support Ticket</h2>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedRequest(null);
                            setShowForm(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        aria-label="Add new support request"
                    >
                        <Plus size={16} /> Add Request
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-6">
                    <div className="overflow-x-auto h-full">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                <tr>
                                    {columns.map((col, i) => (
                                        <th key={i} className="px-6 py-3">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center py-32">
                                            <div className="flex flex-col items-center justify-center">
                                                <TicketIcon size={64} className="text-slate-300 mb-6" />
                                                <h3 className="text-2xl font-bold text-slate-700 mb-2">
                                                    Looks like you have no requests yet!
                                                </h3>
                                                <p className="text-slate-500 text-lg">
                                                    Need help? Submit a ticket, and we'll be happy to assist you.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((request, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => handleRowClick(request)}
                                            className="hover:bg-blue-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">{request.ref || `#${idx + 1}`}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.type}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.subject}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.image ? 'Yes' : 'No'}</td>
                                            <td className="px-6 py-4 text-gray-700 truncate max-w-xs">{request.details}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.createdDate}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.planDate}</td>
                                            <td className="px-6 py-4 text-gray-700">{request.finishDate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {request.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showForm && (
                <SupportTicketForm
                    onClose={() => {
                        setShowForm(false);
                        setSelectedRequest(null);
                    }}
                    onSubmit={(formData) => {
                        // Add new request or update existing
                        if (selectedRequest) {
                            // Update existing request
                            setRequests(prev => prev.map(req => 
                                req.id === selectedRequest.id ? { ...req, ...formData } : req
                            ));
                        } else {
                            // Add new request
                            const newRequest = {
                                id: Date.now(),
                                ref: `REF-${Date.now().toString().slice(-6)}`,
                                ...formData,
                                createdDate: new Date().toLocaleDateString(),
                                status: 'Pending'
                            };
                            setRequests(prev => [newRequest, ...prev]);
                        }
                        setShowForm(false);
                        setSelectedRequest(null);
                    }}
                    initialData={selectedRequest}
                />
            )}
        </>
    );
};

export default SupportTicketView;

