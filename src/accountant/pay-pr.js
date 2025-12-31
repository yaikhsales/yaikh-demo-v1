import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import RequestDetailModal from '../components/RequestDetailModal';
import InvoiceModal from '../components/InvoiceModal';

const PayPR = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('new');
    const [searchCode, setSearchCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    
    // Sample data - replace with actual data from API
    const sampleData = [
        {
            code: 1916,
            name: 'Roth Tongleng',
            department: 'Admin',
            productService: 'Electrical cable rep...',
            requestDate: '19-12-25',
            accPay: 'paid',
            accPayDate: '12/22/25 16:55',
            accPayBy: 'Mom Chheangna'
        },
        {
            code: 1915,
            name: 'Roth Tongleng',
            department: 'Admin',
            productService: 'Request for repair',
            requestDate: '19-12-25',
            accPay: 'paid',
            accPayDate: '12/22/25 16:58',
            accPayBy: 'Mom Chheangna'
        },
        {
            code: 1911,
            name: 'Yon Kanda',
            department: 'Admin',
            productService: 'Diesel on 18/12/2025',
            requestDate: '19-12-25',
            accPay: 'paid',
            accPayDate: '12/22/25 17:34',
            accPayBy: 'Mom Chheangna'
        },
        {
            code: 1906,
            name: 'Roth Tongleng',
            department: 'Admin',
            productService: 'Install the electric...',
            requestDate: '18-12-25',
            accPay: 'paid',
            accPayDate: '12/22/25 16:59',
            accPayBy: 'Mom Chheangna'
        }
    ];

    // Generate more sample data for pagination
    const generateMoreData = () => {
        const moreData = [];
        const names = ['Roth Tongleng', 'Yon Kanda', 'Mom Chheangna'];
        const payByNames = ['Mom Chheangna', 'Mom Chheanana'];
        const times = ['16:55', '16:58', '17:34', '16:59', '17:12', '17:45', '18:01', '18:23'];
        
        for (let i = 1905; i >= 1674; i--) {
            moreData.push({
                code: i,
                name: names[i % names.length],
                department: 'Admin',
                productService: `Product/Service ${i}`,
                requestDate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}-12-25`,
                accPay: 'paid',
                accPayDate: `12/22/25 ${times[i % times.length]}`,
                accPayBy: payByNames[i % payByNames.length]
            });
        }
        return [...sampleData, ...moreData];
    };

    const [data] = useState(generateMoreData());
    const totalItems = data.length;

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleReturn = (code) => {
        // Handle return action
        console.log('Return PR:', code);
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

    const handleReqDetails = (code) => {
        // Handle request details action
        console.log('View request details for PR:', code);
    };

    const filteredData = data.filter(item => 
        searchCode === '' || item.code.toString().includes(searchCode)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const startItem = filteredData.length > 0 ? startIndex + 1 : 0;
    const endItem = Math.min(endIndex, filteredData.length);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first pages
            for (let i = 1; i <= 10; i++) {
                pages.push(i);
            }
            pages.push('...');
            // Show last pages
            pages.push(24);
            pages.push(25);
        }

        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={18} />
                </button>
                {pages.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`px-3 py-1 border border-slate-300 rounded text-sm font-semibold ${
                            currentPage === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'hover:bg-slate-50'
                        } ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        );
    };

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
                <h2 className="text-xl font-bold text-slate-800 text-center">Pay Request Lists - Purchase Request</h2>
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
                        onChange={(e) => {
                            setSearchCode(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                    />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Search
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b flex gap-1 px-4 flex-shrink-0">
                <button
                    onClick={() => {
                        setActiveTab('new');
                        setCurrentPage(1);
                    }}
                    className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                        activeTab === 'new'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                    New Data
                </button>
                <button
                    onClick={() => {
                        setActiveTab('old');
                        setCurrentPage(1);
                    }}
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
                                <th className="px-4 py-3 border-b border-slate-200">ACC PAY</th>
                                <th className="px-4 py-3 border-b border-slate-200">INVOICE</th>
                                <th className="px-4 py-3 border-b border-slate-200">NAME</th>
                                <th className="px-4 py-3 border-b border-slate-200">DEPARTMENT</th>
                                <th className="px-4 py-3 border-b border-slate-200">PRODUCT/SERVICE</th>
                                <th className="px-4 py-3 border-b border-slate-200">REQUEST DATE</th>
                                <th className="px-4 py-3 border-b border-slate-200">ATTACH DOCUMENTS</th>
                                <th className="px-4 py-3 border-b border-slate-200">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-16 text-slate-500">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-slate-900">{item.code}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleReturn(item.code)}
                                                className="bg-slate-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-slate-600 transition-colors"
                                            >
                                                Return
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold inline-block w-fit">
                                                    Paid
                                                </span>
                                                <div className="text-xs text-slate-600">{item.accPayDate}</div>
                                                <div className="text-xs text-slate-600">by {item.accPayBy}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleDetails(item)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 justify-center"
                                                >
                                                    <Eye size={12} />
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleInvoice(item)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 justify-center"
                                                >
                                                    <Eye size={12} />
                                                    Invoice
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-slate-700 text-sm font-medium">{item.name}</span>
                                                    <span className="text-slate-500 text-xs">Admin</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">{item.department}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.productService}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.requestDate}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-xs text-slate-600">Request Form</div>
                                                <div className="flex items-center gap-2">
                                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors flex items-center gap-1">
                                                        <FileText size={12} />
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
                                                onClick={() => handleReqDetails(item.code)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                Req Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white border-t p-4 flex items-center justify-between flex-shrink-0">
                <div className="text-sm text-slate-600">
                    Showing {startItem} to {endItem} of {filteredData.length} results
                </div>
                {renderPagination()}
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

export default PayPR;

