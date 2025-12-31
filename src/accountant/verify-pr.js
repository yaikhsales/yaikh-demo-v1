import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Eye, X } from 'lucide-react';
import RequestDetailModal from '../components/RequestDetailModal';
import InvoiceModal from '../components/InvoiceModal';

const VerifyPR = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('new');
    const [searchCode, setSearchCode] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    
    // Sample data - replace with actual data from API
    const sampleData = [
        {
            code: 1929,
            name: 'ZHANG BIN',
            department: 'Cutting',
            productService: 'Regular Purchase',
            requestDate: '22-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/22/25',
            accCheck: 'pending'
        },
        {
            code: 1927,
            name: 'LIU MINGYU',
            department: 'TPM',
            productService: '新辉/针车零件/螺丝+..',
            requestDate: '21-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/22/25',
            accCheck: 'pending'
        },
        {
            code: 1925,
            name: 'Roth Tongleng',
            department: 'Admin',
            productService: 'For repair0.',
            requestDate: '21-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/22/25',
            accCheck: 'pending'
        },
        {
            code: 1923,
            name: 'ZHANG BIN',
            department: 'Cutting',
            productService: 'Regular Purchase',
            requestDate: '20-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/22/25',
            accCheck: 'pending'
        }
    ];

    const [data] = useState(sampleData);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleReject = (code) => {
        // Handle reject action
        console.log('Reject PR:', code);
    };

    const handleDetails = (item) => {
        setSelectedRequest(item);
        setShowDetailModal(true);
    };

    const handleInvoice = (item) => {
        setSelectedRequest(item);
        setShowInvoiceModal(true);
    };

    const handleViewDocument = (code) => {
        // Handle view document action
        console.log('View document for PR:', code);
    };

    const filteredData = data.filter(item => 
        searchCode === '' || item.code.toString().includes(searchCode)
    );

    return (
        <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 z-10">
            {/* Header with Breadcrumb and Back Button */}
            <div className="bg-slate-100 p-4 border-b flex flex-col gap-3 flex-shrink-0 shadow-sm">
                <div className="flex items-center justify-center gap-4">
                    <button 
                        onClick={handleBack} 
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-lg transition-colors bg-slate-100"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                        title="Home"
                    >
                        <img 
                            src="/logo.jpg" 
                            alt="Home" 
                            className="w-full h-full object-cover"
                        />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>Accountant</span>
                        <span className="text-slate-400">/</span>
                        <span className="font-semibold text-slate-800">Purchase Request</span>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800 text-center">Check Request Lists - Purchase Request</h2>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 border-b flex items-center gap-3 flex-shrink-0">
                <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by Code..."
                        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                    />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Search
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b flex gap-1 px-4 flex-shrink-0">
                <button
                    onClick={() => setActiveTab('new')}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                        activeTab === 'new'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                    New Data
                </button>
                <button
                    onClick={() => setActiveTab('old')}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                        activeTab === 'old'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Old Data
                </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-xs sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 border-b border-slate-200">CODE</th>
                                <th className="px-4 py-3 border-b border-slate-200">RETURN</th>
                                <th className="px-4 py-3 border-b border-slate-200">APPROVE STATUS</th>
                                <th className="px-4 py-3 border-b border-slate-200">DETAILS</th>
                                <th className="px-4 py-3 border-b border-slate-200">INVOICE</th>
                                <th className="px-4 py-3 border-b border-slate-200">ACC CHECK</th>
                                <th className="px-4 py-3 border-b border-slate-200">GM</th>
                                <th className="px-4 py-3 border-b border-slate-200">NAME</th>
                                <th className="px-4 py-3 border-b border-slate-200">DEPARTMENT</th>
                                <th className="px-4 py-3 border-b border-slate-200">PRODUCT/SERVICE</th>
                                <th className="px-4 py-3 border-b border-slate-200">REQUEST DATE</th>
                                <th className="px-4 py-3 border-b border-slate-200">ATTACH DOCUMENTS</th>
                                <th className="px-4 py-3 border-b border-slate-200">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={13} className="text-center py-16 text-slate-500">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-slate-900">{item.code}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleReject(item.code)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs text-slate-600">Head:</span>
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            item.headStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs text-slate-600">GM:</span>
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            item.gmStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs text-slate-600">Purchaser:</span>
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            item.purchaserStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleDetails(item)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                                            >
                                                <Eye size={12} />
                                                Details
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleInvoice(item)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                                            >
                                                <Eye size={12} />
                                                Invoice
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                Pending
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                Approved
                                            </button>
                                            <div className="text-xs text-slate-600 mt-1">{item.gmDate}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="text-slate-700">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">{item.department}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.productService}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.requestDate}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-xs text-slate-600">Request Form</div>
                                                <div className="flex items-center gap-2">
                                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                        PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewDocument(item.code)}
                                                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                                                    >
                                                        <Eye size={12} />
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleDetails(item)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                                            >
                                                <Eye size={12} />
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <RequestDetailModal 
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                requestData={selectedRequest}
            />
            <InvoiceModal 
                isOpen={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                requestData={selectedRequest}
            />
        </div>
    );
};

export default VerifyPR;

