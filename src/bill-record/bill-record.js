import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronDown, Image as ImageIcon, Upload } from 'lucide-react';

const BillRecord = ({ onBack }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bills, setBills] = useState([]); // Empty for now
    const [formData, setFormData] = useState({
        department: '',
        topic: '',
        category: '',
        description: '',
        amount: '0.00',
        currency: '',
        image: null
    });

    const departments = [
        'Admin',
        'HR',
        'Production',
        'Quality Assurance',
        'Cutting',
        'Sewing',
        'Pressing',
        'Packaging',
        'Accounting',
        'IT'
    ];

    const categories = [
        'Office Supplies',
        'Equipment',
        'Maintenance',
        'Utilities',
        'Transportation',
        'Food & Beverage',
        'Other'
    ];

    const currencies = [
        'USD',
        'KHR',
        'THB',
        'EUR'
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            department: '',
            topic: '',
            category: '',
            description: '',
            amount: '0.00',
            currency: '',
            image: null
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add bill to list
        const newBill = {
            id: bills.length + 1,
            name: formData.topic || 'Untitled',
            department: formData.department,
            topic: formData.topic,
            category: formData.category,
            amount: `${formData.amount} ${formData.currency}`,
            image: formData.image ? URL.createObjectURL(formData.image) : null,
            date: new Date().toLocaleDateString()
        };
        setBills([...bills, newBill]);
        handleCloseModal();
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
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Bill Record</h1>
                <div className="w-16"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="w-full h-full">
                    {/* White Card */}
                    <div className="bg-white h-full p-6">
                        {/* Add Bill Record Button */}
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleOpenModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 border border-black"
                            >
                                <Plus size={16} />
                                Add Bill Record
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">Nº</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Name</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Department</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Topic</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Category</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Amount</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">Image</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Date</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="text-center py-16 text-slate-500">
                                                No bill records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        bills.map((bill, idx) => (
                                            <tr key={bill.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700 text-center">{bill.id}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.name}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.department}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.topic}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.category}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.amount}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-center">
                                                    {bill.image ? (
                                                        <img src={bill.image} alt="Bill" className="w-12 h-12 object-cover rounded" />
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{bill.date}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-center">
                                                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
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
                </div>
            </div>

            {/* Add Bill Record Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] animate-in fade-in duration-300">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-bold text-slate-800">+ Add Bill Record</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Department */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Department
                                </label>
                                <div className="relative">
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Topic */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Topic
                                </label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter topic"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Amount ($)
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                    <div className="relative w-40">
                                        <select
                                            name="currency"
                                            value={formData.currency}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                        >
                                            <option value="">Select currency</option>
                                            {currencies.map((curr) => (
                                                <option key={curr} value={curr}>
                                                    {curr}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Upload Image */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Upload Image
                                </label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center justify-center"
                                    >
                                        {formData.image ? (
                                            <div className="space-y-2">
                                                <img
                                                    src={URL.createObjectURL(formData.image)}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                                                />
                                                <p className="text-sm text-slate-600">{formData.image.name}</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mx-auto">
                                                    <ImageIcon size={32} className="text-slate-400" />
                                                </div>
                                                <p className="text-sm text-slate-600">Click to upload image</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillRecord;

