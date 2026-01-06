import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Eye, X } from 'lucide-react';
import RequestDetailModal from '../components/RequestDetailModal';
import InvoiceModal from '../components/InvoiceModal';
import ImageViewer from '../components/ImageViewer';
import PdfViewer from '../components/PdfViewer';

const VerifyPR = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('new');
    const [searchCode, setSearchCode] = useState('');
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
            code: 1974,
            name: 'Ro Ton',
            department: 'Admin',
            productService: 'For install new GD I...',
            requestDate: '29-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/30/25',
            accCheck: 'pending',
            accCheckDate: null,
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_00008943_20250313153947.jpeg'
        },
        {
            code: 1958,
            name: 'Yo Ka',
            department: 'Admin',
            productService: 'driver go to Sihanou...',
            requestDate: '25-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/27/25',
            accCheck: 'checked',
            accCheckDate: '12/27/25',
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_0000803120231103125217.jpeg'
        },
        {
            code: 1948,
            name: 'Tou Srey',
            department: 'QA',
            productService: 'New Purchase',
            requestDate: '24-12-25',
            headStatus: 'approved',
            gmStatus: 'approved',
            purchaserStatus: 'pending',
            gmDate: '12/30/25',
            accCheck: 'pending',
            accCheckDate: null,
            image: 'https://ym.kottrahr.com/Uploads/Images/Employee/H01_0000674020220209073009.jpeg'
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

    const handleViewDetail = () => {
        setSelectedImagePath('/assets/accountant/verify-pr/detail.jpg');
        setShowImageViewer(true);
    };

    const handleViewDetailAction = () => {
        setSelectedImagePath('/assets/accountant/verify-pr/detail-action.jpg');
        setShowImageViewer(true);
    };

    const handleViewInvoice = () => {
        setSelectedImagePath('/assets/accountant/verify-pr/invoice.jpg');
        setShowImageViewer(true);
    };

    const handleViewPdf = () => {
        setSelectedPdfPath('/assets/accountant/verify-pr/view-pdf.pdf');
        setShowPdfViewer(true);
    };

    const handleViewRequestForm = () => {
        setSelectedImagePath('/assets/accountant/verify-pr/detail.jpg');
        setShowImageViewer(true);
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
            {/* <div className="bg-white p-4 border-b flex items-center gap-3 flex-shrink-0">
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
            </div> */}

            {/* Tabs */}
            {/* <div className="bg-white border-b flex gap-1 px-4 flex-shrink-0">
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
            </div> */}

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
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={13} className="text-center py-16 text-slate-500">
                                        No data found
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
                                                onClick={handleViewDetail}
                                                className="bg-white text-blue-600 border-2 border-blue-600 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-50 transition-colors flex items-center gap-1"
                                            >
                                                <Eye size={12} />
                                                Details
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={handleViewInvoice}
                                                className="bg-white text-blue-600 border-2 border-blue-600 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-50 transition-colors flex items-center gap-1"
                                            >
                                                <Eye size={12} />
                                                Invoice
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            {item.accCheck === 'checked' ? (
                                                <>
                                                    <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                        Checked
                                                    </button>
                                                    <div className="text-xs text-slate-600 mt-1">{item.accCheckDate}</div>
                                                </>
                                            ) : (
                                                <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors">
                                                    Pending
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 transition-colors">
                                                Approved
                                            </button>
                                            <div className="text-xs text-slate-600 mt-1">{item.gmDate}</div>
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
                                                        onClick={handleViewDetailAction}
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
                                                onClick={handleViewDetailAction}
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
            {showPdfViewer && (
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

export default VerifyPR;

