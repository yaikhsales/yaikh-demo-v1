import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import RequestDetailModal from '../components/RequestDetailModal';
import InvoiceModal from '../components/InvoiceModal';
import ImageViewer from '../components/ImageViewer';
import PdfViewer from '../components/PdfViewer';
import { useTranslation } from '../translate/TranslationContext';

const ApprovalPR = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [activeTab, setActiveTab] = useState('new');
    const [searchCode, setSearchCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [selectedPdfPath, setSelectedPdfPath] = useState('');
    
    // Sample data - replace with actual data from API
    const sampleData = [
        {
            code: 1978,
            name: 'Yo Ka',
            department: 'Admin',
            productService: 'Diesel on 27/12/2025',
            requestDate: '29-12-25',
            accApprove: 'approved',
            accApproveDate: '12/30/25',
            accApprovePay: 'approved',
            accApprovePayDate: '12/30/25',
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_0000803120231103125217.jpeg'
        },
        {
            code: 1977,
            name: 'U Chheng',
            department: 'Admin',
            productService: 'New Purchase',
            requestDate: '29-12-25',
            accApprove: 'approved',
            accApproveDate: '12/30/25',
            accApprovePay: 'approved',
            accApprovePayDate: '12/31/25',
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_0000437020211222075243.jpeg'
        },
        {
            code: 1973,
            name: 'Ro Tong',
            department: 'Admin',
            productService: 'For repair Battery',
            requestDate: '28-12-25',
            accApprove: 'approved',
            accApproveDate: '12/30/25',
            accApprovePay: 'approved',
            accApprovePayDate: '12/30/25',
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_00008943_20250313153947.jpeg'
        }
    ];

    const [data] = useState(sampleData);
    const totalItems = data.length;

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

    const handleReqDetails = (code) => {
        // Handle request details action
        console.log('View request details for PR:', code);
    };

    const handleViewDetail = () => {
        setSelectedImagePath('/assets/accountant/approval-pr/detail.jpg');
        setShowImageViewer(true);
    };

    const handleViewInvoice = () => {
        setSelectedImagePath('/assets/accountant/approval-pr/invoice.jpg');
        setShowImageViewer(true);
    };

    const handleViewPdf = () => {
        setSelectedPdfPath('/assets/accountant/approval-pr/view-pdf.pdf');
        setShowPdfViewer(true);
    };

    const handleViewRequestForm = () => {
        setSelectedImagePath('/assets/accountant/approval-pr/request-form.jpg');
        setShowImageViewer(true);
    };

    const handleViewDocumentClick = () => {
        setSelectedImagePath('/assets/accountant/approval-pr/detail.jpg');
        setShowImageViewer(true);
    };

    const handleReqDetailsAction = () => {
        setSelectedImagePath('/assets/accountant/approval-pr/request-detail.jpg');
        setShowImageViewer(true);
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
                        <ArrowLeft size={18} /> {t('back')}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                        title={t('home')}
                    >
                        <img 
                            src="/logo.jpg" 
                            alt={t('home')} 
                            className="w-full h-full object-cover"
                        />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>{t('accountant')}</span>
                        <span className="text-slate-400">/</span>
                        <span className="font-semibold text-slate-800">{t('purchaseRequest')}</span>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800 text-center">{t('approvalRequestLists')} - {t('purchaseRequest')}</h2>
            </div>

            {/* Search Bar */}
            {/* <div className="bg-white p-4 border-b flex items-center gap-3 flex-shrink-0">
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
            </div> */}

            {/* Tabs */}
            {/* <div className="bg-white border-b flex gap-1 px-4 flex-shrink-0">
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
            </div> */}

            {/* Table */}
            <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-xs sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 border-b border-slate-200">{t('code')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('return')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('accApprove')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('accApprovePay')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('invoice')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('nameHeader')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('departmentHeader')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('productService')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('requestDate')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('attachDocuments')}</th>
                                <th className="px-4 py-3 border-b border-slate-200">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="text-center py-16 text-slate-500">
                                        {t('noData')}
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-slate-900">{item.code}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleReject(item.code)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                {t('reject')}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                {t('approved')}
                                            </button>
                                            <div className="text-xs text-slate-600 mt-1">{item.accApproveDate}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                {t('approved')} & {t('paid')}
                                            </button>
                                            <div className="text-xs text-slate-600 mt-1">{item.accApprovePayDate}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={handleViewDetail}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 justify-center"
                                                >
                                                    <Eye size={12} />
                                                    {t('details')}
                                                </button>
                                                <button
                                                    onClick={handleViewInvoice}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 justify-center"
                                                >
                                                    <FileText size={12} />
                                                    {t('invoice')}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-12 h-16 object-cover border border-slate-200"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '';
                                                            e.target.style.display = 'none';
                                                            const fallback = e.target.nextElementSibling;
                                                            if (fallback) fallback.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div 
                                                    className={`w-12 h-16 bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700 border border-slate-200 ${item.image ? 'hidden' : ''}`}
                                                >
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="text-slate-700 text-xs text-center">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">{item.department}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.productService}</td>
                                        <td className="px-4 py-4 text-slate-700">{item.requestDate}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={handleViewRequestForm}
                                                    className="text-xs text-slate-600 hover:text-slate-800 transition-colors text-left"
                                                >
                                                    Request Form
                                                </button>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={handleViewPdf}
                                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors flex items-center gap-1"
                                                    >
                                                        <FileText size={12} />
                                                        PDF
                                                    </button>
                                                    <button
                                                        onClick={handleViewPdf}
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
                                                onClick={handleReqDetailsAction}
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
            {/* <div className="bg-white border-t p-4 flex items-center justify-between flex-shrink-0">
                <div className="text-sm text-slate-600">
                    Showing {startItem} to {endItem} of {filteredData.length} results
                </div>
                {renderPagination()}
            </div> */}


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

            {/* Image Viewer */}
            {showImageViewer && (
                <ImageViewer
                    imagePath={selectedImagePath}
                    onClose={() => {
                        setShowImageViewer(false);
                        setSelectedImagePath('');
                    }}
                />
            )}

            {/* PDF Viewer */}
            {showPdfViewer && selectedPdfPath && (
                <PdfViewer
                    pdfPath={selectedPdfPath}
                    onClose={() => {
                        setShowPdfViewer(false);
                        setSelectedPdfPath('');
                    }}
                />
            )}
        </div>
    );
};

export default ApprovalPR;

