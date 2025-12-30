import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Lock, Search, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const YTMShop = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('requests'); // 'requests', 'products', or 'stock-report'
    const [searchQuery, setSearchQuery] = useState('');
    const [department, setDepartment] = useState('Office');
    const [supplierName, setSupplierName] = useState('All');
    const [subCategory, setSubCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalProducts = 196;

    // Sample requests data
    const requests = [
        {
            id: 1,
            photo: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=100&h=100&fit=crop',
            department: 'HR',
            subject: 'Office Supplies',
            quantity: 10,
            unit: 'PCS',
            requestor: 'John Doe',
            requestDate: '2025-12-20'
        },
        {
            id: 2,
            photo: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=100&h=100&fit=crop',
            department: 'IT',
            subject: 'Computer Accessories',
            quantity: 5,
            unit: 'SET',
            requestor: 'Jane Smith',
            requestDate: '2025-12-21'
        },
        {
            id: 3,
            photo: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=100&h=100&fit=crop',
            department: 'Admin',
            subject: 'Cleaning Supplies',
            quantity: 20,
            unit: 'PCS',
            requestor: 'Mike Johnson',
            requestDate: '2025-12-22'
        }
    ];

    const products = [
        {
            id: 1,
            name: 'A4 Paper Ream (500 sheets)',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop&q=90',
            supplier: 'Office Supplies Co.',
            category: 'office',
            price: 5.50,
            stock: 25,
            stockUnit: 'REAM',
            inStock: true
        },
        {
            id: 2,
            name: 'Ballpoint Pen (Blue)',
            image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=500&h=500&fit=crop&q=90',
            supplier: 'Stationery Pro',
            category: 'office',
            price: 0.50,
            stock: 150,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 3,
            name: 'Stapler Heavy Duty',
            image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=500&fit=crop&q=90',
            supplier: 'Office Equipment Ltd',
            category: 'office',
            price: 8.00,
            stock: 12,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 4,
            name: 'Scissors Office',
            image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop&q=90',
            supplier: 'Taobao',
            category: 'office',
            price: 3.50,
            stock: 20,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 5,
            name: 'Printer Paper A4 (500 sheets)',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop&q=90',
            supplier: 'Paper Supply Inc',
            category: 'office',
            price: 6.00,
            stock: 45,
            stockUnit: 'REAM',
            inStock: true
        },
        {
            id: 6,
            name: 'Notebook A4 (100 pages)',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop&q=90',
            supplier: 'Stationery World',
            category: 'office',
            price: 2.50,
            stock: 30,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 7,
            name: 'File Folder A4',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=90',
            supplier: 'Office Organizers',
            category: 'office',
            price: 1.20,
            stock: 80,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 8,
            name: 'Transparent Tape 18mm',
            image: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=500&h=500&fit=crop&q=90',
            supplier: 'Office Supplies Co.',
            category: 'office',
            price: 1.50,
            stock: 35,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 9,
            name: 'Permanent Marker (Black)',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop&q=90',
            supplier: 'Writing Tools Ltd',
            category: 'office',
            price: 0.80,
            stock: 60,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 10,
            name: 'Office Desk 120cm x 60cm',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&q=90',
            supplier: 'Furniture Plus',
            category: 'office',
            price: 95.00,
            stock: 3,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 11,
            name: 'Machine Oil 500ml',
            image: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=500&h=500&fit=crop&q=90',
            supplier: 'Industrial Supply',
            category: 'machine',
            price: 12.00,
            stock: 15,
            stockUnit: 'BOTTLE',
            inStock: true
        },
        {
            id: 12,
            name: 'Safety Gloves (Industrial)',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop&q=90',
            supplier: 'Yi New Sewing Machine Co.,ltd (益新)',
            category: 'machine',
            price: 3.50,
            stock: 50,
            stockUnit: 'PAIR',
            inStock: true
        },
        {
            id: 13,
            name: 'Battery 12V 27A',
            image: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=500&h=500&fit=crop&q=90',
            supplier: 'Power Solutions',
            category: 'machine',
            price: 8.50,
            stock: 20,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 14,
            name: 'Screwdriver Set (6 pieces)',
            image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop&q=90',
            supplier: 'Tool Master',
            category: 'machine',
            price: 15.00,
            stock: 8,
            stockUnit: 'SET',
            inStock: true
        },
        {
            id: 15,
            name: 'Wrench Set (10 pieces)',
            image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop&q=90',
            supplier: 'Tool Master',
            category: 'machine',
            price: 22.00,
            stock: 5,
            stockUnit: 'SET',
            inStock: true
        }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleAddNewRequest = () => {
        console.log('Add new request');
    };

    const handleFilter = () => {
        console.log('Filter products:', { searchQuery, department, supplierName, subCategory });
    };

    const handleReset = () => {
        setSearchQuery('');
        setDepartment('Office');
        setSupplierName('All');
        setSubCategory('All');
    };

    const handleOrderNow = (productId) => {
        console.log('Order product:', productId);
    };

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalProducts);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 5) {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 4) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 9; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleBack} 
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold text-sm"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={16} /> Back
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
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Y Shop</h1>
                <div className="w-12"></div> {/* Spacer for centering */}
            </div>

            {/* Main Content */}
            <div className={`flex-1 overflow-auto ${activeView === 'stock-report' ? 'p-0' : 'p-6'}`}>
                <div className={activeView === 'stock-report' ? 'w-full' : 'max-w-7xl mx-auto'}>
                    {/* Tabs */}
                    {activeView !== 'stock-report' && (
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveView('requests')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                activeView === 'requests'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300'
                            }`}
                        >
                            My Requests
                        </button>
                        <button
                            onClick={() => setActiveView('products')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                activeView === 'products'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300'
                            }`}
                        >
                            Product Catalog
                        </button>
                        <button
                            onClick={() => setActiveView('stock-report')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                activeView === 'stock-report'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300'
                            }`}
                        >
                            Stock Report
                        </button>
                    </div>
                    )}

                    {/* Requests View */}
                    {activeView === 'requests' && (
                        <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-6">
                            <div className="flex items-center justify-end mb-4">
                                <button
                                    onClick={handleAddNewRequest}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Lock size={16} />
                                    Add New Request
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">PHOTO</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">DEPARTMENT</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">SUBJECT</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">QUANTITY</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">UNIT</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">REQUESTOR</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">REQUEST DATE</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {requests.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="px-4 py-16 text-center text-slate-500">
                                                    No requests found
                                                </td>
                                            </tr>
                                        ) : (
                                            requests.map((request) => (
                                                <tr key={request.id} className="hover:bg-slate-50">
                                                    <td className="px-6 py-4">
                                                        <img 
                                                            src={request.photo} 
                                                            alt={request.subject}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.department}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.subject}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.unit}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.requestor}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700">{request.requestDate}</td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Products View */}
                    {activeView === 'products' && (
                        <div className="space-y-6">
                            {/* Search and Filters */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                                <div className="flex flex-wrap items-end gap-4">
                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Department</label>
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            <option value="Office">Office</option>
                                            <option value="All">All</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Supplier Name</label>
                                        <select
                                            value={supplierName}
                                            onChange={(e) => setSupplierName(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            <option value="All">All</option>
                                            <option value="Yi New Sewing Machine Co.,ltd (益新)">Yi New Sewing Machine Co.,ltd (益新)</option>
                                            <option value="dongxin">dongxin</option>
                                            <option value="taobao">taobao</option>
                                        </select>
                                    </div>
                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Sub Category</label>
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            <option value="All">All</option>
                                            <option value="office">office</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleFilter}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Filter
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm"
                                        >
                                            Show Non Sellable
                                        </button>
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search Product..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="aspect-square bg-slate-100 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-slate-800 mb-2 text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                                            <div className="text-xs text-slate-600 mb-1">
                                                <span className="font-semibold">Supplier Name: </span>
                                                <span className="truncate block">{product.supplier}</span>
                                            </div>
                                            <div className="text-xs text-slate-600 mb-2">
                                                <span className="font-semibold">Category: </span>
                                                <span>{product.category || '-'}</span>
                                            </div>
                                            <div className="text-base font-bold text-blue-600 mb-2">
                                                {product.price.toFixed(2)} {product.currency || (product.price >= 1 ? 'USD' : 'KHR')}
                                            </div>
                                            <div className={`text-xs font-semibold mb-3 ${
                                                product.inStock ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {product.inStock 
                                                    ? `In Stock: ${product.stock} ${product.stockUnit}`
                                                    : 'Out of Stock'
                                                }
                                            </div>
                                            <button
                                                onClick={() => handleOrderNow(product.id)}
                                                disabled={!product.inStock}
                                                className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
                                                    product.inStock
                                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                                }`}
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-3 flex items-center justify-between">
                                <div className="text-sm text-slate-600">
                                    Showing {startIndex} to {endIndex} of {totalProducts} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    {getPageNumbers().map((page, index) => (
                                        <React.Fragment key={index}>
                                            {page === '...' ? (
                                                <span className="px-2 text-slate-600">...</span>
                                            ) : (
                                                <button
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-lg font-semibold text-sm ${
                                                        currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stock Report View */}
                    {activeView === 'stock-report' && (
                        <div className="fixed inset-0 bg-white z-[300] overflow-auto" style={{ top: '73px', left: 0, right: 0, bottom: 0 }}>
                            <div className="w-full min-h-full flex items-start justify-center p-4">
                                <img
                                    src="/y-shop/stock-detail.png"
                                    alt="Stock Detail Report"
                                    className="w-auto h-auto"
                                    style={{ 
                                        maxWidth: '100%',
                                        height: 'auto',
                                        imageRendering: 'high-quality',
                                        imageRendering: '-webkit-optimize-contrast',
                                        imageRendering: 'crisp-edges',
                                        display: 'block'
                                    }}
                                    onLoad={(e) => {
                                        // Force high DPI rendering and prevent blur
                                        e.target.style.imageRendering = 'high-quality';
                                        e.target.style.imageRendering = '-webkit-optimize-contrast';
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YTMShop;

