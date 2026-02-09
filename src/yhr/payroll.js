import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, DollarSign, Calculator, FileText, Calendar, Receipt, MessageCircle } from 'lucide-react';
import GeneralAIAgent from '../general-ag';
import { useTranslation } from '../translate/TranslationContext';

const Payroll = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        payPeriod: '',
        payDate: '',
        basicSalary: '',
        allowances: {
            transportation: '',
            meal: '',
            housing: '',
            other: ''
        },
        overtime: {
            hours: '',
            rate: '',
            amount: ''
        },
        deductions: {
            tax: '',
            socialSecurity: '',
            healthInsurance: '',
            other: ''
        },
        bonuses: {
            performance: '',
            attendance: '',
            other: ''
        },
        netPay: '',
        paymentMethod: '',
        bankAccount: '',
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
        const { name, value } = e.target;
        const [parent, child] = name.split('.');
        
        if (child) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    React.useEffect(() => {
        const basic = parseFloat(formData.basicSalary) || 0;
        const totalAllowances = 
            (parseFloat(formData.allowances.transportation) || 0) +
            (parseFloat(formData.allowances.meal) || 0) +
            (parseFloat(formData.allowances.housing) || 0) +
            (parseFloat(formData.allowances.other) || 0);
        const overtimeAmount = parseFloat(formData.overtime.amount) || 0;
        const totalBonuses = 
            (parseFloat(formData.bonuses.performance) || 0) +
            (parseFloat(formData.bonuses.attendance) || 0) +
            (parseFloat(formData.bonuses.other) || 0);
        const totalDeductions = 
            (parseFloat(formData.deductions.tax) || 0) +
            (parseFloat(formData.deductions.socialSecurity) || 0) +
            (parseFloat(formData.deductions.healthInsurance) || 0) +
            (parseFloat(formData.deductions.other) || 0);
        
        const netPay = basic + totalAllowances + overtimeAmount + totalBonuses - totalDeductions;
        setFormData(prev => ({ ...prev, netPay: netPay.toFixed(2) }));
    }, [
        formData.basicSalary,
        formData.allowances.transportation,
        formData.allowances.meal,
        formData.allowances.housing,
        formData.allowances.other,
        formData.overtime.amount,
        formData.bonuses.performance,
        formData.bonuses.attendance,
        formData.bonuses.other,
        formData.deductions.tax,
        formData.deductions.socialSecurity,
        formData.deductions.healthInsurance,
        formData.deductions.other
    ]);

    const handleOvertimeChange = (e) => {
        const { name, value } = e.target;
        const [parent, child] = name.split('.');
        
        setFormData(prev => {
            const updated = {
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            };
            
            if (child === 'hours' || child === 'rate') {
                const hours = parseFloat(child === 'hours' ? value : prev.overtime.hours) || 0;
                const rate = parseFloat(child === 'rate' ? value : prev.overtime.rate) || 0;
                updated.overtime.amount = (hours * rate).toFixed(2);
            }
            
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payroll form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-yellow-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">{t('payrollManagement')}</h1>
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
                                <FileText className="text-yellow-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder={t('departmentName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('position')}
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder={t('jobTitle')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('payPeriod')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="payPeriod"
                                        value={formData.payPeriod}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectPeriod')}</option>
                                        <option value="Monthly">{t('monthly')}</option>
                                        <option value="Bi-weekly">{t('biWeekly')}</option>
                                        <option value="Weekly">{t('weekly')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('payDate')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="payDate"
                                        value={formData.payDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-yellow-600" size={24} />
                                {t('earnings')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('basicSalary')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="basicSalary"
                                        value={formData.basicSalary}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('transportationAllowance')}
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.transportation"
                                        value={formData.allowances.transportation}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('mealAllowance')}
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.meal"
                                        value={formData.allowances.meal}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('housingAllowance')}
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.housing"
                                        value={formData.allowances.housing}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('otherAllowance')}
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.other"
                                        value={formData.allowances.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Overtime */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="text-yellow-600" size={24} />
                                {t('overtime')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('overtimeHours')}
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.hours"
                                        value={formData.overtime.hours}
                                        onChange={handleOvertimeChange}
                                        step="0.5"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('overtimeRate')} ({t('perHour')})
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.rate"
                                        value={formData.overtime.rate}
                                        onChange={handleOvertimeChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('overtimeAmount')}
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.amount"
                                        value={formData.overtime.amount}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bonuses */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Receipt className="text-yellow-600" size={24} />
                                {t('bonuses')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('performanceBonus')}
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.performance"
                                        value={formData.bonuses.performance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('attendanceBonus')}
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.attendance"
                                        value={formData.bonuses.attendance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('otherBonus')}
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.other"
                                        value={formData.bonuses.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="text-red-600" size={24} />
                                {t('deductions')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('tax')}
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.tax"
                                        value={formData.deductions.tax}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('socialSecurity')}
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.socialSecurity"
                                        value={formData.deductions.socialSecurity}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('healthInsurance')}
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.healthInsurance"
                                        value={formData.deductions.healthInsurance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('otherDeduction')}
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.other"
                                        value={formData.deductions.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Net Pay & Payment */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-green-600" size={24} />
                                {t('netPayPaymentDetails')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('netPay')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="netPay"
                                        value={formData.netPay}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('paymentMethod')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectPaymentMethod')}</option>
                                        <option value="Bank Transfer">{t('bankTransfer')}</option>
                                        <option value="Cash">{t('cash')}</option>
                                        <option value="Check">{t('check')}</option>
                                        <option value="Mobile Payment">{t('mobilePayment')}</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('bankAccountNumber')}
                                    </label>
                                    <input
                                        type="text"
                                        name="bankAccount"
                                        value={formData.bankAccount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder={t('bankAccountNumberPlaceholder')}
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder={t('anyAdditionalNotesPayroll')}
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
                                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('processPayroll')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Bot Button - Bottom Right */}
            <button
                onClick={() => setIsBotOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Ask Payroll bot"
                title="Ask Payroll bot"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>
            
            {/* Bot Modal */}
            {isBotOpen && (
                <GeneralAIAgent 
                    onClose={() => setIsBotOpen(false)}
                    moduleContext="Payroll"
                />
            )}
        </div>
    );
};

export default Payroll;

