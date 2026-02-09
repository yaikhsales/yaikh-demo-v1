import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UtensilsCrossed, Calendar, Users, DollarSign, FileText, CheckCircle, MessageCircle } from 'lucide-react';
import GeneralAIAgent from '../general-ag';
import { useTranslation } from '../translate/TranslationContext';

const Canteen = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [isBotOpen, setIsBotOpen] = useState(false);
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
                            <span className="font-medium">{t('back')}</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title={t('home')}
                        >
                            <img 
                                src="/logo.jpg" 
                                alt={t('home')} 
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <h1 className="text-lg font-bold">{t('canteenMealManagement')}</h1>
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
                                {t('employeeInformation')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('employeeId')} <span className="text-red-500">*</span>
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
                                        {t('employeeName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeName"
                                        value={formData.employeeName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder={t('enterFullName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('department')}
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder={t('departmentName')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Meal Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <UtensilsCrossed className="text-cyan-600" size={24} />
                                {t('mealDetails')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('mealDate')} <span className="text-red-500">*</span>
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
                                        {t('mealType')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="mealType"
                                        value={formData.mealType}
                                        onChange={handleMealTypeChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectMealType')}</option>
                                        <option value="breakfast">{t('breakfast')}</option>
                                        <option value="lunch">{t('lunch')}</option>
                                        <option value="dinner">{t('dinner')}</option>
                                    </select>
                                </div>
                                {formData.mealType && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('mealOption')} <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="mealOption"
                                                value={formData.mealOption}
                                                onChange={handleMealOptionChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                            >
                                                <option value="">{t('selectMeal')}</option>
                                                {mealOptions[formData.mealType]?.map((option, idx) => (
                                                    <option key={idx} value={option.name}>
                                                        {option.name} - ${option.price.toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('quantity')} <span className="text-red-500">*</span>
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
                                                {t('unitPrice')}
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
                                                {t('totalAmount')}
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
                                {t('dietaryRestrictionsPreferences')}
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
                                        <span className="text-sm text-gray-700">{t(restriction.toLowerCase().replace(/\s+/g, '')) || restriction}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Status */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-cyan-600" size={24} />
                                {t('paymentStatus')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('paymentMethod')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectPaymentMethod')}</option>
                                        <option value="Cash">{t('cash')}</option>
                                        <option value="Meal Card">{t('mealCard')}</option>
                                        <option value="Monthly Deduction">{t('monthlyDeduction')}</option>
                                        <option value="Company Subsidy">{t('companySubsidy')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('status')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    >
                                        <option value="pending">{t('pending')}</option>
                                        <option value="confirmed">{t('confirmed')}</option>
                                        <option value="prepared">{t('prepared')}</option>
                                        <option value="collected">{t('collected')}</option>
                                        <option value="cancelled">{t('cancelled')}</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <FileText size={14} />
                                        {t('specialRequests')}
                                    </label>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder={t('anySpecialRequests')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                {t('additionalNotes')}
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder={t('anyAdditionalNotesMeal')}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('placeOrder')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Bot Button - Bottom Right */}
            <button
                onClick={() => setIsBotOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Ask Canteen bot"
                title="Ask Canteen bot"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>
            
            {/* Bot Modal */}
            {isBotOpen && (
                <GeneralAIAgent 
                    onClose={() => setIsBotOpen(false)}
                    moduleContext="Canteen"
                />
            )}
        </div>
    );
};

export default Canteen;

