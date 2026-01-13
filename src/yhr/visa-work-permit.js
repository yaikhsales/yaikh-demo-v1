import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, FileText, Calendar, Globe, User, CheckCircle, AlertCircle } from 'lucide-react';

const VisaWorkPermit = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        nationality: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        visaType: '',
        visaNumber: '',
        visaIssueDate: '',
        visaExpiryDate: '',
        workPermitNumber: '',
        workPermitIssueDate: '',
        workPermitExpiryDate: '',
        status: 'active',
        renewalRequired: false,
        renewalDate: '',
        documents: [],
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
            documents: prev.documents.includes(value)
                ? prev.documents.filter(item => item !== value)
                : [...prev.documents, value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Visa Work Permit form submitted:', formData);
    };

    const isExpiringSoon = (expiryDate) => {
        if (!expiryDate) return false;
        const expiry = new Date(expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
    };

    const isExpired = (expiryDate) => {
        if (!expiryDate) return false;
        const expiry = new Date(expiryDate);
        const today = new Date();
        return expiry < today;
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-red-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">Visa & Work Permit</h1>
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
                                <User className="text-red-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Department name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Globe size={14} />
                                        Nationality <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="e.g., Cambodian, Thai, Vietnamese"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Passport Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-red-600" size={24} />
                                Passport Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Passport Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={formData.passportNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Passport number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        name="passportIssueDate"
                                        value={formData.passportIssueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Expiry Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="passportExpiryDate"
                                            value={formData.passportExpiryDate}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                                isExpired(formData.passportExpiryDate) 
                                                    ? 'border-red-500 bg-red-50' 
                                                    : isExpiringSoon(formData.passportExpiryDate)
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {isExpired(formData.passportExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-red-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expired</span>
                                            </div>
                                        )}
                                        {isExpiringSoon(formData.passportExpiryDate) && !isExpired(formData.passportExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-yellow-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expiring Soon</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visa Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Globe className="text-red-600" size={24} />
                                Visa Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Visa Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="visaType"
                                        value={formData.visaType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select Visa Type</option>
                                        <option value="Business Visa">Business Visa</option>
                                        <option value="Work Visa">Work Visa</option>
                                        <option value="Tourist Visa">Tourist Visa</option>
                                        <option value="Diplomatic Visa">Diplomatic Visa</option>
                                        <option value="Student Visa">Student Visa</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Visa Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="visaNumber"
                                        value={formData.visaNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Visa number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        name="visaIssueDate"
                                        value={formData.visaIssueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Expiry Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="visaExpiryDate"
                                            value={formData.visaExpiryDate}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                                isExpired(formData.visaExpiryDate) 
                                                    ? 'border-red-500 bg-red-50' 
                                                    : isExpiringSoon(formData.visaExpiryDate)
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {isExpired(formData.visaExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-red-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expired</span>
                                            </div>
                                        )}
                                        {isExpiringSoon(formData.visaExpiryDate) && !isExpired(formData.visaExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-yellow-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expiring Soon</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Work Permit Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-red-600" size={24} />
                                Work Permit Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Work Permit Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="workPermitNumber"
                                        value={formData.workPermitNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Work permit number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        name="workPermitIssueDate"
                                        value={formData.workPermitIssueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Expiry Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="workPermitExpiryDate"
                                            value={formData.workPermitExpiryDate}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                                isExpired(formData.workPermitExpiryDate) 
                                                    ? 'border-red-500 bg-red-50' 
                                                    : isExpiringSoon(formData.workPermitExpiryDate)
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {isExpired(formData.workPermitExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-red-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expired</span>
                                            </div>
                                        )}
                                        {isExpiringSoon(formData.workPermitExpiryDate) && !isExpired(formData.workPermitExpiryDate) && (
                                            <div className="absolute right-2 top-2 flex items-center gap-1 text-yellow-600">
                                                <AlertCircle size={16} />
                                                <span className="text-xs font-semibold">Expiring Soon</span>
                                            </div>
                                        )}
                                    </div>
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="expired">Expired</option>
                                        <option value="renewed">Renewed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Renewal Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="text-red-600" size={24} />
                                Renewal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            name="renewalRequired"
                                            checked={formData.renewalRequired}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Renewal Required</span>
                                    </label>
                                </div>
                                {formData.renewalRequired && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                            <Calendar size={14} />
                                            Renewal Date
                                        </label>
                                        <input
                                            type="date"
                                            name="renewalDate"
                                            value={formData.renewalDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Documents Checklist */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-red-600" size={24} />
                                Documents Checklist
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Passport Copy',
                                    'Visa Copy',
                                    'Work Permit Copy',
                                    'Employment Contract',
                                    'Medical Certificate',
                                    'Police Clearance',
                                    'Educational Certificates',
                                    'Previous Work Permits'
                                ].map(doc => (
                                    <label key={doc} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.documents.includes(doc)}
                                            onChange={() => handleCheckboxChange(doc)}
                                            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-sm text-gray-700">{doc}</span>
                                    </label>
                                ))}
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Any additional notes about visa and work permit"
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
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Visa & Work Permit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VisaWorkPermit;

