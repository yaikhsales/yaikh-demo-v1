import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Download } from 'lucide-react';

const ShowListRequest = ({ onBack }) => {
    const navigate = useNavigate();
    // Removed unused filter states - keeping for potential future use

    // Sample purchase request data matching the original platform
    const sampleRequests = [
        {
            code: 2022,
            name: 'Uth Chantha',
            profileImage: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_00009468_20251124124718.jpeg',
            department: 'Warehouse',
            productService: '平板充电柜',
            requestDate: '07-01-26',
            buyerType: 'Buy by Purchaser',
            headOfDept: {
                status: 'pending'
            },
            gmReqApprove: {
                status: 'pending'
            },
            gmPaymentApprove: {
                status: 'pending'
            },
            purchaser: {
                status: 'pending'
            },
            payment: {
                status: 'pending'
            },
            hasReturnMessage: false
        },
        {
            code: 2021,
            name: 'LIN HUI',
            profileImage: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_0000839320240807152708.jpeg',
            department: 'IT',
            productService: 'Regular Purchase',
            requestDate: '07-01-26',
            buyerType: 'Buy by Purchaser',
            headOfDept: {
                status: 'approved',
                approvedBy: 'LIN HUI',
                approvedDate: '01/07/26'
            },
            gmReqApprove: {
                status: 'approved',
                approvedBy: 'CHAN WINGHONG',
                approvedDate: '01/07/26'
            },
            gmPaymentApprove: {
                status: 'pending'
            },
            purchaser: {
                status: 'pending'
            },
            payment: {
                status: 'pending'
            },
            hasReturnMessage: false
        }
    ];

    // Using sampleRequests directly in the render

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
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

    const handlePDF = (code) => {
        console.log('Download PDF:', code);
        // In a real app, this would trigger a PDF download
        alert(`Downloading PDF for request ${code}`);
    };

    const handleViewForm = (code) => {
        console.log('View form:', code);
        alert(`Viewing form for request ${code}`);
    };

    const handleDetail = (code) => {
        console.log('View detail:', code);
        alert(`Viewing detail for request ${code}`);
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

            {/* Table Display */}
            <div className="flex-1 overflow-auto bg-white p-4">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full text-sm border-collapse bg-white">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">CODE</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">RETURN</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">HEAD OF DEPT</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">GM(REQ-APPROVE)</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">GM(PAYMENT-APPROVE)</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">PURCHASER</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">PAYMENT</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-left">NAME</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-left">DEPARTMENT</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-left">PRODUCT/SERVICE</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-left">REQUEST DATE</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">ATTACH DOCUMENTS</th>
                                <th className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-[10px] text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleRequests.map((req, idx) => (
                                <tr key={req.code} className="hover:bg-slate-50 transition-colors">
                                    {/* CODE */}
                                    <td className="px-2 py-2 border border-slate-200 text-slate-700 text-center font-medium text-xs">{req.code}</td>
                                    
                                    {/* RETURN */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <button
                                            onClick={() => handleReturn(req.code)}
                                            className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-red-600 transition-colors min-w-[60px]"
                                        >
                                            Return
                                        </button>
                                    </td>
                                    
                                    {/* HEAD OF DEPT */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        {req.headOfDept.status === 'approved' ? (
                                            <div className="flex flex-col gap-1 items-center">
                                                <button className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-green-600 transition-colors min-w-[60px]">
                                                    Approved
                                                </button>
                                                <div className="text-[10px] text-slate-600 leading-tight">{req.headOfDept.approvedBy} {req.headOfDept.approvedDate}</div>
                                            </div>
                                        ) : (
                                            <button className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-red-600 transition-colors min-w-[60px]">
                                                Pending
                                            </button>
                                        )}
                                    </td>
                                    
                                    {/* GM(REQ-APPROVE) */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        {req.gmReqApprove.status === 'approved' ? (
                                            <div className="flex flex-col gap-1 items-center">
                                                <button className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-green-600 transition-colors min-w-[60px]">
                                                    Approved
                                                </button>
                                                <div className="text-[10px] text-slate-600 leading-tight">{req.gmReqApprove.approvedBy} {req.gmReqApprove.approvedDate}</div>
                                                <button
                                                    onClick={() => handleDetail(req.code)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-full text-[10px] font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 min-w-[55px]"
                                                >
                                                    <Eye size={10} />
                                                    Detail
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1 items-center">
                                                <button className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-red-600 transition-colors min-w-[60px]">
                                                    Pending
                                                </button>
                                                <button
                                                    onClick={() => handleDetail(req.code)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-full text-[10px] font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 min-w-[55px]"
                                                >
                                                    <Eye size={10} />
                                                    Detail
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    
                                    {/* GM(PAYMENT-APPROVE) */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <button className="bg-slate-400 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-slate-500 transition-colors min-w-[60px]">
                                            Pending
                                        </button>
                                    </td>
                                    
                                    {/* PURCHASER */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <button className="bg-slate-400 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-slate-500 transition-colors min-w-[60px]">
                                            Pending
                                        </button>
                                    </td>
                                    
                                    {/* PAYMENT */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-red-600 transition-colors min-w-[60px]">
                                            Pending
                                        </button>
                                    </td>
                                    
                                    {/* NAME */}
                                    <td className="px-2 py-2 border border-slate-200">
                                        <div className="flex flex-col items-center gap-1">
                                            {req.profileImage ? (
                                                <img 
                                                    src={req.profileImage} 
                                                    alt={req.name}
                                                    className="w-10 h-10 rounded object-cover border border-slate-200"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '';
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded bg-slate-300 flex items-center justify-center text-[10px] font-semibold text-slate-700">
                                                    {req.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="text-slate-700 font-medium text-[10px] text-center">{req.name}</span>
                                        </div>
                                    </td>
                                    
                                    {/* DEPARTMENT */}
                                    <td className="px-2 py-2 border border-slate-200 text-slate-700 text-[10px]">{req.department}</td>
                                    
                                    {/* PRODUCT/SERVICE */}
                                    <td className="px-2 py-2 border border-slate-200 text-slate-700 text-[10px]">{req.productService}</td>
                                    
                                    {/* REQUEST DATE */}
                                    <td className="px-2 py-2 border border-slate-200 text-slate-700 text-[10px]">
                                        <div>{req.requestDate}</div>
                                        <div className="text-slate-500 mt-0.5">{req.buyerType}</div>
                                    </td>
                                    
                                    {/* ATTACH DOCUMENTS */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <div className="text-[10px] text-slate-600 font-semibold">Request Form</div>
                                            <div className="flex flex-col gap-1 items-center">
                                                <button
                                                    onClick={() => handlePDF(req.code)}
                                                    className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1 min-w-[50px]"
                                                >
                                                    <Download size={10} />
                                                    PDF
                                                </button>
                                                <button
                                                    onClick={() => handleViewForm(req.code)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 min-w-[50px]"
                                                >
                                                    <Eye size={10} />
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* ACTIONS */}
                                    <td className="px-2 py-2 border border-slate-200 text-center">
                                        <button
                                            onClick={() => handleDetails(req.code)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-semibold hover:bg-blue-600 transition-colors min-w-[60px]"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowListRequest;

