import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Lock, Search, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const YTMShop = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('requests'); // 'requests' or 'products'
    const [searchQuery, setSearchQuery] = useState('');
    const [department, setDepartment] = useState('Office');
    const [supplierName, setSupplierName] = useState('All');
    const [subCategory, setSubCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalProducts = 192;

    const products = [
        {
            id: 1,
            name: 'Gloves (iron)',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=300&fit=crop',
            supplier: 'Yi New Sewing Machine Co.,ltd (益新)',
            category: 'office',
            price: 28.00,
            stock: 8,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 2,
            name: 'Battery 27a/12v',
            image: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=300&h=300&fit=crop',
            supplier: 'dongxin',
            category: 'office',
            price: 1.00,
            stock: 17,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 3,
            name: 'Office desk 120cm x 60cm x 75cm',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
            supplier: 'WU YA X',
            category: '-',
            price: 95.00,
            stock: 0,
            stockUnit: '',
            inStock: false
        },
        {
            id: 4,
            name: 'Key black big 63mm',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
            supplier: 'taobao',
            category: 'office',
            price: 1.00,
            stock: 10,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 5,
            name: 'Spray',
            image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
            supplier: 'taobao',
            category: 'office',
            price: 1.00,
            stock: 11,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 6,
            name: 'Printer Paper for DT&FC APP',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=300&fit=crop',
            supplier: 'Taobao',
            category: '-',
            price: 11.50,
            stock: 80,
            stockUnit: 'BOX',
            inStock: true
        },
        {
            id: 7,
            name: 'Cabinet office',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
            supplier: 'N/A',
            category: '-',
            price: 0.00,
            stock: 2,
            stockUnit: 'SET',
            inStock: true
        },
        {
            id: 8,
            name: 'Wood office 1400x1000x25',
            image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=300&fit=crop',
            supplier: 'N/A',
            category: '-',
            price: 0.00,
            stock: 10,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 9,
            name: 'Wood office curved',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
            supplier: 'N/A',
            category: '-',
            price: 0.00,
            stock: 16,
            stockUnit: 'PCS',
            inStock: true
        },
        {
            id: 10,
            name: 'Money counting machine',
            image: 'https://images.unsplash.com/photo-1605244863941-3a1499b2f0a4?w=300&h=300&fit=crop',
            supplier: 'N/A',
            category: '-',
            price: 0.00,
            stock: 1,
            stockUnit: 'PCS',
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
                <button 
                    onClick={handleBack} 
                    className="p-2 hover:bg-slate-100 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold px-3 py-1 text-sm"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} className="inline" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 underline">Y Shop</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Tabs */}
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
                    </div>

                    {/* Requests View */}
                    {activeView === 'requests' && (
                        <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-slate-600 font-semibold">Request Management</div>
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
                                    <thead className="bg-slate-100 border-b border-slate-300">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">PHOTO</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">DEPARTMENT</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">SUBJECT</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">QUANTITY</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">UNIT</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">REQUESTOR</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">REQUEST DATE</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="8" className="px-4 py-16 text-center text-slate-500">
                                                No requests found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Products View */}
                    {activeView === 'products' && (
                        <div className="space-y-6">
                            {/* Search and Filters */}
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                                <div className="mb-4">
                                    <div className="relative">
                                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search Product..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Department</label>
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Office">Office</option>
                                            <option value="All">All</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Supplier Name</label>
                                        <select
                                            value={supplierName}
                                            onChange={(e) => setSupplierName(e.target.value)}
                                            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="All">All</option>
                                            <option value="Yi New Sewing Machine Co.,ltd (益新)">Yi New Sewing Machine Co.,ltd (益新)</option>
                                            <option value="dongxin">dongxin</option>
                                            <option value="taobao">taobao</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-700 font-semibold mb-1">Sub Category</label>
                                        <select
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="All">All</option>
                                            <option value="office">office</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 items-end">
                                        <button
                                            onClick={handleFilter}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Filter
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                        >
                                            Show Non Sellable
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="aspect-square bg-slate-100 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-slate-800 mb-2 text-sm line-clamp-2">{product.name}</h3>
                                            <div className="text-xs text-slate-600 mb-1">
                                                <div className="font-semibold">Supplier Name:</div>
                                                <div className="truncate">{product.supplier}</div>
                                            </div>
                                            <div className="text-xs text-slate-600 mb-2">
                                                <span className="font-semibold">Category:</span> {product.category}
                                            </div>
                                            <div className="text-lg font-bold text-blue-600 mb-2">
                                                {product.price.toFixed(2)} USD
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
                </div>
            </div>
        </div>
    );
};

export default YTMShop;

