import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Eye, FileText, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ShowListRequest = ({ onBack }) => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState('All Request');
    const [filterByUser, setFilterByUser] = useState('All');
    const [searchCode, setSearchCode] = useState('');
    const [department, setDepartment] = useState('All');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [activeTab, setActiveTab] = useState('new');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Sample purchase request data
    const sampleRequests = [
        {
            code: 1038,
            name: 'Seth Tangtong',
            department: 'Admin',
            preparedBy: 'Parampah',
            requestDate: '10-12-20',
            returnStatus: 'pending',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1037,
            name: 'Jhanvi Das',
            department: 'Cooling',
            preparedBy: 'Buy by Prathana',
            requestDate: '10-12-20',
            returnStatus: 'pending',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1036,
            name: 'Saswati Das',
            department: 'GAR',
            preparedBy: 'New Purchase',
            requestDate: '10-12-20',
            returnStatus: 'approved',
            returnApprovedBy: 'Saswati Das',
            returnApprovedDate: '12/25/24',
            signOfDept: 'approved',
            signApprovedBy: 'Saswati Das',
            signApprovedDate: '12/25/24',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1035,
            name: 'Saswati Das',
            department: 'GAR',
            preparedBy: 'Pick up luggage at b...',
            requestDate: '10-12-20',
            returnStatus: 'approved',
            returnApprovedBy: 'Saswati Das',
            returnApprovedDate: '12/25/24',
            signOfDept: 'approved',
            signApprovedBy: 'Saswati Das',
            signApprovedDate: '12/25/24',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1034,
            name: 'Yan Kanda',
            department: 'DSU',
            preparedBy: 'Ghasel on 10/12/2016',
            requestDate: '10-12-20',
            returnStatus: 'pending',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1033,
            name: 'SUMAN GIRI',
            department: 'Admin',
            preparedBy: 'NGE Wenderwer Teul...',
            requestDate: '10-12-20',
            returnStatus: 'pending',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1032,
            name: 'Seth Tangtong',
            department: 'Admin',
            preparedBy: 'Parampah',
            requestDate: '10-12-20',
            returnStatus: 'approved',
            returnApprovedBy: 'NAGAPATI GANGADHAR',
            returnApprovedDate: '12/25/24',
            signOfDept: 'approved',
            signApprovedBy: 'NAGAPATI GANGADHAR',
            signApprovedDate: '12/25/24',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        },
        {
            code: 1031,
            name: 'Jhanvi Das',
            department: 'Cooling',
            preparedBy: 'Buy by Prathana',
            requestDate: '10-12-20',
            returnStatus: 'returned',
            returnMessage: 'buy 7kg paper, 10kg paper jam.',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: true
        },
        {
            code: 1030,
            name: 'Yan Kanda',
            department: 'DSU',
            preparedBy: 'Ghasel on 10/12/2016',
            requestDate: '10-12-20',
            returnStatus: 'pending',
            signOfDept: 'pending',
            instmentApprove: 'pending',
            purchase: 'pending',
            payment: 'pending',
            hasReturnMessage: false
        }
    ];

    // Generate more requests for pagination
    const generateMoreRequests = () => {
        const moreRequests = [];
        for (let i = 1029; i >= 665; i--) {
            moreRequests.push({
                code: i,
                name: 'Test User',
                department: 'Admin',
                preparedBy: 'Prepared by User',
                requestDate: '10-12-20',
                returnStatus: 'pending',
                signOfDept: 'pending',
                instmentApprove: 'pending',
                purchase: 'pending',
                payment: 'pending',
                hasReturnMessage: false
            });
        }
        return [...sampleRequests, ...moreRequests];
    };

    const [requests] = useState(generateMoreRequests());
    const totalRequests = requests.length;

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleFilter = () => {
        console.log('Filter:', { filterType, filterByUser, searchCode, department, fromDate, toDate });
    };

    const handleClear = () => {
        setFilterType('All Request');
        setFilterByUser('All');
        setSearchCode('');
        setDepartment('All');
        setFromDate('');
        setToDate('');
    };

    const handleReturn = (code) => {
        console.log('Return request:', code);
    };

    const handleViewReturnDetails = (code) => {
        console.log('View return details:', code);
    };

    const handleInvoice = (code) => {
        console.log('View invoice:', code);
    };

    const handleDetails = (code) => {
        console.log('View details:', code);
    };

    const handleViewDocument = (code) => {
        console.log('View document:', code);
    };

    const filteredRequests = requests.filter(req => {
        if (filterType !== 'All Request' && req.returnStatus !== filterType.toLowerCase()) return false;
        if (searchCode && !req.code.toString().includes(searchCode)) return false;
        if (department !== 'All' && req.department !== department) return false;
        if (fromDate && req.requestDate < fromDate) return false;
        if (toDate && req.requestDate > toDate) return false;
        return true;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    const startItem = filteredRequests.length > 0 ? startIndex + 1 : 0;
    const endItem = Math.min(endIndex, filteredRequests.length);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i);
            }
        }

        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={16} />
                </button>
                {pages.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border border-slate-300 rounded text-sm font-semibold ${
                            currentPage === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'hover:bg-slate-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-slate-100 p-3 border-b flex items-center justify-between flex-shrink-0 shadow-sm relative z-[201]">
                <div className="w-32"></div> {/* Left spacer */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleBack} 
                            className="p-2 hover:bg-slate-200 rounded transition-colors flex-shrink-0 text-slate-700 font-semibold text-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={18} className="inline mr-1" />
                            Back
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
                    </div>
                    <h1 className="text-lg font-bold text-slate-800">Purchase Request</h1>
                </div>
                <div className="w-32"></div> {/* Right spacer */}
            </div>

            {/* Filter Section */}
            {/* <div className="bg-white p-4 border-b flex flex-col gap-4 flex-shrink-0">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Filter:</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All Request">All Request</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Returned">Returned</option>
                            </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                            Master List
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                            Export
                        </button>
                    </div>

                    <div className="flex items-center gap-3 ml-auto flex-wrap">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Filter by User:</label>
                            <select
                                value={filterByUser}
                                onChange={(e) => setFilterByUser(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All</option>
                                <option value="User1">User1</option>
                                <option value="User2">User2</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Search by Code:</label>
                            <input
                                type="text"
                                placeholder="Search by Code"
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Department:</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All</option>
                                <option value="Admin">Admin</option>
                                <option value="Cooling">Cooling</option>
                                <option value="GAR">GAR</option>
                                <option value="DSU">DSU</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">From:</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">To:</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleFilter}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                        >
                            <Filter size={16} />
                            Filter
                        </button>
                        <button
                            onClick={handleClear}
                            className="bg-slate-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-colors text-sm flex items-center gap-2"
                        >
                            <X size={16} />
                            Clear
                        </button>
                    </div>
                </div>

                <div className="flex gap-1 border-b">
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
            </div> */}

            {/* Table */}
            {/* <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">CODE</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">RETURN</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">SIGN OF DEPT</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">INSTMENT APPROVE</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">PURCHASE</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">PAYMENT</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">NAME</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">DEPARTMENT</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">PREPARED BY</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">REQUEST DATE</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">ATTACH DOCUMENTS</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-16 text-slate-500">
                                        No requests found
                                    </td>
                                </tr>
                            ) : (
                                paginatedRequests.map((req, idx) => (
                                    <tr key={req.code} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-4 border border-slate-200 text-slate-700 text-center font-medium">{req.code}</td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            {req.returnStatus === 'returned' ? (
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-xs text-slate-600">Return message: {req.returnMessage}</div>
                                                    <button
                                                        onClick={() => handleViewReturnDetails(req.code)}
                                                        className="text-blue-600 hover:underline text-xs"
                                                    >
                                                        View Return Details
                                                    </button>
                                                </div>
                                            ) : req.returnStatus === 'approved' ? (
                                                <div className="flex flex-col gap-1">
                                                    <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                        Approved
                                                    </button>
                                                    <div className="text-xs text-slate-600">{req.returnApprovedBy} {req.returnApprovedDate}</div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleReturn(req.code)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors"
                                                >
                                                    Return
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            {req.signOfDept === 'approved' ? (
                                                <div className="flex flex-col gap-1">
                                                    <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                        Approved
                                                    </button>
                                                    <div className="text-xs text-slate-600">{req.signApprovedBy} {req.signApprovedDate}</div>
                                                </div>
                                            ) : (
                                                <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                    Pending
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            <div className="flex flex-col gap-2">
                                                <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                    Pending
                                                </button>
                                                <button
                                                    onClick={() => handleInvoice(req.code)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                                >
                                                    Invoice
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                Pending
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                Pending
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700">
                                                    {req.name.charAt(0)}
                                                </div>
                                                <span className="text-slate-700">{req.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.department}</td>
                                        <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.preparedBy}</td>
                                        <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.requestDate}</td>
                                        <td className="px-4 py-4 border border-slate-200">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-xs text-slate-600">Request Form</div>
                                                <div className="flex items-center gap-2">
                                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors flex items-center gap-1">
                                                        <FileText size={12} />
                                                        PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewDocument(req.code)}
                                                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                                                    >
                                                        <Eye size={12} />
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            <button
                                                onClick={() => handleDetails(req.code)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div> */}

            {/* Pagination Footer */}
            {/* <div className="bg-white border-t p-4 flex items-center justify-between flex-shrink-0">
                <div className="text-sm text-slate-600">
                    Showing {startItem} to {endItem} of {filteredRequests.length} results
                </div>
                {renderPagination()}
            </div> */}

            {/* Image Display */}
            <div className="flex-1 overflow-auto bg-white p-4 flex items-center justify-center">
                <img 
                    src="/assets/purchase/show-purchase.png" 
                    alt="Purchase Request List" 
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </div>
    );
};

export default ShowListRequest;

