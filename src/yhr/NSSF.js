import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Shield, Calendar, DollarSign, FileText, User, Building, CheckCircle, MessageCircle } from 'lucide-react';
import GeneralAIAgent from '../general-ag';
import { useTranslation } from '../translate/TranslationContext';

const NSSF = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        nssfMemberNumber: '',
        registrationDate: '',
        status: 'active',
        contributionPeriod: '',
        salaryBase: '',
        employeeContribution: '',
        employerContribution: '',
        totalContribution: '',
        contributionRate: '',
        paymentStatus: 'current',
        lastPaymentDate: '',
        nextPaymentDate: '',
        benefits: {
            medical: {
                eligible: false,
                coverageStartDate: '',
                coverageEndDate: '',
                dependents: []
            },
            retirement: {
                eligible: false,
                accountBalance: '',
                projectedRetirementDate: '',
                monthlyBenefit: ''
            },
            disability: {
                eligible: false,
                coverageAmount: '',
                startDate: ''
            },
            death: {
                eligible: false,
                beneficiary: '',
                coverageAmount: ''
            }
        },
        paymentHistory: [],
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
        const [parent, child, grandchild] = name.split('.');
        
        if (grandchild) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: {
                        ...prev[parent][child],
                        [grandchild]: type === 'checkbox' ? checked : value
                    }
                }
            }));
        } else if (child) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleCheckboxChange = (category, value) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.includes(value)
                ? prev.documents.filter(item => item !== value)
                : [...prev.documents, value]
        }));
    };

    React.useEffect(() => {
        // Calculate contributions
        const salaryBase = parseFloat(formData.salaryBase) || 0;
        const contributionRate = parseFloat(formData.contributionRate) || 0;
        
        if (salaryBase > 0 && contributionRate > 0) {
            const totalContribution = (salaryBase * contributionRate / 100);
            const employeeContribution = totalContribution / 2; // Typically 50/50 split
            const employerContribution = totalContribution / 2;
            
            setFormData(prev => ({
                ...prev,
                totalContribution: totalContribution.toFixed(2),
                employeeContribution: employeeContribution.toFixed(2),
                employerContribution: employerContribution.toFixed(2)
            }));
        }
    }, [formData.salaryBase, formData.contributionRate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('NSSF form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-white to-teal-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-teal-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">{t('nssfManagement')}</h1>
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
                                <User className="text-teal-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder={t('jobTitle')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* NSSF Registration */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="text-teal-600" size={24} />
                                {t('nssfRegistration')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('nssfMemberNumber')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nssfMemberNumber"
                                        value={formData.nssfMemberNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="NSSF-XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('registrationDate')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="registrationDate"
                                        value={formData.registrationDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="active">{t('active')}</option>
                                        <option value="suspended">{t('suspended')}</option>
                                        <option value="terminated">{t('terminated')}</option>
                                        <option value="pending">{t('pending')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('contributionPeriod')}
                                    </label>
                                    <select
                                        name="contributionPeriod"
                                        value={formData.contributionPeriod}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectPeriod')}</option>
                                        <option value="Monthly">{t('monthly')}</option>
                                        <option value="Quarterly">{t('quarterly')}</option>
                                        <option value="Annually">{t('annually')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contribution Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-teal-600" size={24} />
                                {t('contributionDetails')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('salaryBase')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryBase"
                                        value={formData.salaryBase}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('contributionRatePercent')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="contributionRate"
                                        value={formData.contributionRate}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('employeeContribution')}
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeContribution"
                                        value={formData.employeeContribution}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('employerContribution')}
                                    </label>
                                    <input
                                        type="text"
                                        name="employerContribution"
                                        value={formData.employerContribution}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('totalContribution')}
                                    </label>
                                    <input
                                        type="text"
                                        name="totalContribution"
                                        value={formData.totalContribution}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('paymentStatus')}
                                    </label>
                                    <select
                                        name="paymentStatus"
                                        value={formData.paymentStatus}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="current">{t('current')}</option>
                                        <option value="overdue">{t('overdue')}</option>
                                        <option value="paid">{t('paid')}</option>
                                        <option value="pending">{t('pending')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('lastPaymentDate')}
                                    </label>
                                    <input
                                        type="date"
                                        name="lastPaymentDate"
                                        value={formData.lastPaymentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('nextPaymentDate')}
                                    </label>
                                    <input
                                        type="date"
                                        name="nextPaymentDate"
                                        value={formData.nextPaymentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Medical Benefits */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="text-teal-600" size={24} />
                                {t('medicalBenefits')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            name="benefits.medical.eligible"
                                            checked={formData.benefits.medical.eligible}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">{t('eligibleForMedicalBenefits')}</span>
                                    </label>
                                </div>
                                {formData.benefits.medical.eligible && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('coverageStartDate')}
                                            </label>
                                            <input
                                                type="date"
                                                name="benefits.medical.coverageStartDate"
                                                value={formData.benefits.medical.coverageStartDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('coverageEndDate')}
                                            </label>
                                            <input
                                                type="date"
                                                name="benefits.medical.coverageEndDate"
                                                value={formData.benefits.medical.coverageEndDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Retirement Benefits */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Building className="text-teal-600" size={24} />
                                {t('retirementBenefits')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            name="benefits.retirement.eligible"
                                            checked={formData.benefits.retirement.eligible}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">{t('eligibleForRetirementBenefits')}</span>
                                    </label>
                                </div>
                                {formData.benefits.retirement.eligible && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {t('accountBalance')}
                                            </label>
                                            <input
                                                type="number"
                                                name="benefits.retirement.accountBalance"
                                                value={formData.benefits.retirement.accountBalance}
                                                onChange={handleChange}
                                                step="0.01"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <Calendar size={14} />
                                                {t('projectedRetirementDate')}
                                            </label>
                                            <input
                                                type="date"
                                                name="benefits.retirement.projectedRetirementDate"
                                                value={formData.benefits.retirement.projectedRetirementDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {t('estimatedMonthlyBenefit')}
                                            </label>
                                            <input
                                                type="number"
                                                name="benefits.retirement.monthlyBenefit"
                                                value={formData.benefits.retirement.monthlyBenefit}
                                                onChange={handleChange}
                                                step="0.01"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Disability Benefits */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-teal-600" size={24} />
                                {t('disabilityBenefits')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            name="benefits.disability.eligible"
                                            checked={formData.benefits.disability.eligible}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">{t('eligibleForDisability')}</span>
                                    </label>
                                </div>
                                {formData.benefits.disability.eligible && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {t('coverageAmount')}
                                            </label>
                                            <input
                                                type="number"
                                                name="benefits.disability.coverageAmount"
                                                value={formData.benefits.disability.coverageAmount}
                                                onChange={handleChange}
                                                step="0.01"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder={t('coverageAmountPlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <Calendar size={14} />
                                                {t('startDate')}
                                            </label>
                                            <input
                                                type="date"
                                                name="benefits.disability.startDate"
                                                value={formData.benefits.disability.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Death Benefits */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="text-teal-600" size={24} />
                                {t('deathBenefits')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            name="benefits.death.eligible"
                                            checked={formData.benefits.death.eligible}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">{t('eligibleForDeath')}</span>
                                    </label>
                                </div>
                                {formData.benefits.death.eligible && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('beneficiary')}
                                            </label>
                                            <input
                                                type="text"
                                                name="benefits.death.beneficiary"
                                                value={formData.benefits.death.beneficiary}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder={t('beneficiaryNamePlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {t('coverageAmount')}
                                            </label>
                                            <input
                                                type="number"
                                                name="benefits.death.coverageAmount"
                                                value={formData.benefits.death.coverageAmount}
                                                onChange={handleChange}
                                                step="0.01"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                placeholder={t('coverageAmountPlaceholder')}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Documents Checklist */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-teal-600" size={24} />
                                {t('nssfDocumentsChecklist')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'NSSF Registration Form',
                                    'ID Card Copy',
                                    'Employment Contract',
                                    'Salary Certificate',
                                    'Bank Account Details',
                                    'Medical Certificate',
                                    'Beneficiary Form',
                                    'Previous NSSF Records'
                                ].map(doc => (
                                    <label key={doc} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.documents.includes(doc)}
                                            onChange={() => handleCheckboxChange('documents', doc)}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                        />
                                        <span className="text-sm text-gray-700">{t(doc.toLowerCase().replace(/[\/\s]+/g, '')) || doc}</span>
                                    </label>
                                ))}
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder={t('anyAdditionalNotesNssfRegistration')}
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
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('saveNssfInformation')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Bot Button - Bottom Right */}
            <button
                onClick={() => setIsBotOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Ask NSSF bot"
                title="Ask NSSF bot"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>
            
            {/* Bot Modal */}
            {isBotOpen && (
                <GeneralAIAgent 
                    onClose={() => setIsBotOpen(false)}
                    moduleContext="NSSF"
                />
            )}
        </div>
    );
};

export default NSSF;

