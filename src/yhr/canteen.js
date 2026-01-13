import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UtensilsCrossed, Calendar, Users, DollarSign, FileText, CheckCircle } from 'lucide-react';

const Canteen = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        mealDate: '',
        mealType: '',
        mealOption: '',
        quantity: 1,
        price: '',
        paymentMethod: '',
        status: 'pending',
        specialRequests: '',
        dietaryRestrictions: [],
        notes: ''
    });

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCheckboxChange = (value) => {
        setFormData(prev => ({
            ...prev,
            dietaryRestrictions: prev.dietaryRestrictions.includes(value)
                ? prev.dietaryRestrictions.filter(item => item !== value)
                : [...prev.dietaryRestrictions, value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Canteen form submitted:', formData);
    };

    const mealOptions = {
        breakfast: [
            { name: 'Khmer Noodle Soup', price: 2.50 },
            { name: 'Fried Rice', price: 2.00 },
            { name: 'Pork Porridge', price: 2.50 },
            { name: 'Bread & Coffee', price: 1.50 },
            { name: 'Fried Noodles', price: 2.00 }
        ],
        lunch: [
            { name: 'Rice with Pork Curry', price: 3.50 },
            { name: 'Rice with Chicken Curry', price: 3.50 },
            { name: 'Rice with Fish Amok', price: 3.00 },
            { name: 'Rice with Beef Lok Lak', price: 4.00 },
            { name: 'Fried Rice with Seafood', price: 3.50 },
            { name: 'Vegetarian Meal', price: 2.50 }
        ],
        dinner: [
            { name: 'Rice with Pork Curry', price: 3.50 },
            { name: 'Rice with Chicken Curry', price: 3.50 },
            { name: 'Rice with Fish Amok', price: 3.00 },
            { name: 'Rice with Beef Lok Lak', price: 4.00 },
            { name: 'Fried Rice with Seafood', price: 3.50 },
            { name: 'Vegetarian Meal', price: 2.50 }
        ]
    };

    const handleMealTypeChange = (e) => {
        const mealType = e.target.value;
        setFormData(prev => ({
            ...prev,
            mealType: mealType,
            mealOption: '',
            price: ''
        }));
    };

    const handleMealOptionChange = (e) => {
        const selectedOption = e.target.value;
        const option = mealOptions[formData.mealType]?.find(opt => opt.name === selectedOption);
        setFormData(prev => ({
            ...prev,
            mealOption: selectedOption,
            price: option ? option.price.toFixed(2) : ''
        }));
    };

    const totalAmount = (parseFloat(formData.price) || 0) * parseInt(formData.quantity) || 0;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-cyan-700 rounded transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-medium">Back</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <h1 className="text-lg font-bold">Canteen Meal Management</h1>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                        {/* Employee Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Users className="text-cyan-600" size={24} />
                                Employee Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Employee ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="EMP-XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Employee Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeName"
                                        value={formData.employeeName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Department name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Meal Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <UtensilsCrossed className="text-cyan-600" size={24} />
                                Meal Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Meal Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="mealDate"
                                        value={formData.mealDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Meal Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="mealType"
                                        value={formData.mealType}
                                        onChange={handleMealTypeChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="">Select Meal Type</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                    </select>
                                </div>
                                {formData.mealType && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Meal Option <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="mealOption"
                                                value={formData.mealOption}
                                                onChange={handleMealOptionChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                            >
                                                <option value="">Select Meal</option>
                                                {mealOptions[formData.mealType]?.map((option, idx) => (
                                                    <option key={idx} value={option.name}>
                                                        {option.name} - ${option.price.toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Quantity <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                placeholder="1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                Unit Price
                                            </label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                readOnly
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                Total Amount
                                            </label>
                                            <input
                                                type="text"
                                                value={`$${totalAmount.toFixed(2)}`}
                                                readOnly
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Dietary Restrictions */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-cyan-600" size={24} />
                                Dietary Restrictions & Preferences
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Vegetarian',
                                    'Vegan',
                                    'Halal',
                                    'No Pork',
                                    'No Beef',
                                    'No Seafood',
                                    'Gluten Free',
                                    'Low Salt',
                                    'No Spicy',
                                    'Diabetic Friendly'
                                ].map(restriction => (
                                    <label key={restriction} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.dietaryRestrictions.includes(restriction)}
                                            onChange={() => handleCheckboxChange(restriction)}
                                            className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                        />
                                        <span className="text-sm text-gray-700">{restriction}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Status */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-cyan-600" size={24} />
                                Payment & Status
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Payment Method <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Meal Card">Meal Card</option>
                                        <option value="Monthly Deduction">Monthly Deduction</option>
                                        <option value="Company Subsidy">Company Subsidy</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="prepared">Prepared</option>
                                        <option value="collected">Collected</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <FileText size={14} />
                                        Special Requests
                                    </label>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Any special requests or instructions for the meal"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Additional Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Any additional notes about the meal order"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Canteen;

