import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, User, Users, FileText, CheckCircle, MessageCircle } from 'lucide-react';
import GeneralAIAgent from '../general-ag';
import { useTranslation } from '../translate/TranslationContext';

const Interview = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [formData, setFormData] = useState({
        candidateName: '',
        position: '',
        interviewDate: '',
        interviewTime: '',
        interviewType: '',
        interviewer: '',
        interviewers: [],
        location: '',
        status: 'scheduled',
        technicalScore: '',
        communicationScore: '',
        culturalFitScore: '',
        overallRating: '',
        strengths: '',
        weaknesses: '',
        recommendation: '',
        notes: ''
    });
    const [isBotOpen, setIsBotOpen] = useState(false);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Interview form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-green-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">{t('interviewArrangement')}</h1>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                        {/* Interview Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="text-green-600" size={24} />
                                {t('interviewDetails')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('candidateName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="candidateName"
                                        value={formData.candidateName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('enterCandidateName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('positionApplied')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="e.g., Software Developer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('interviewDate')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="interviewDate"
                                        value={formData.interviewDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Clock size={14} />
                                        {t('interviewTime')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="interviewTime"
                                        value={formData.interviewTime}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('interviewType')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="interviewType"
                                        value={formData.interviewType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectType')}</option>
                                        <option value="Phone Screening">{t('phoneScreening')}</option>
                                        <option value="Video Interview">{t('videoInterview')}</option>
                                        <option value="In-Person">{t('inPerson')}</option>
                                        <option value="Panel Interview">{t('panelInterview')}</option>
                                        <option value="Technical Interview">{t('technicalInterview')}</option>
                                        <option value="Final Interview">{t('finalInterview')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('locationVenue')}
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('meetingRoomOrVideoLink')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <User size={14} />
                                        {t('primaryInterviewer')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="interviewer"
                                        value={formData.interviewer}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('interviewerName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Users size={14} />
                                        {t('additionalInterviewers')}
                                    </label>
                                    <input
                                        type="text"
                                        name="interviewers"
                                        value={formData.interviewers}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('commaSeparatedNames')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Evaluation Scores */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={24} />
                                {t('interviewEvaluation')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('technicalSkills')}
                                    </label>
                                    <input
                                        type="number"
                                        name="technicalScore"
                                        value={formData.technicalScore}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('communicationSkills')}
                                    </label>
                                    <input
                                        type="number"
                                        name="communicationScore"
                                        value={formData.communicationScore}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('culturalFit')}
                                    </label>
                                    <input
                                        type="number"
                                        name="culturalFitScore"
                                        value={formData.culturalFitScore}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('overallRating')}
                                    </label>
                                    <select
                                        name="overallRating"
                                        value={formData.overallRating}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectRating')}</option>
                                        <option value="Excellent">{t('excellent')}</option>
                                        <option value="Good">{t('good')}</option>
                                        <option value="Average">{t('average')}</option>
                                        <option value="Below Average">{t('belowAverage')}</option>
                                        <option value="Poor">{t('poor')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('status')}
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="scheduled">{t('scheduled')}</option>
                                        <option value="completed">{t('completed')}</option>
                                        <option value="cancelled">{t('cancelled')}</option>
                                        <option value="rescheduled">{t('rescheduled')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('recommendation')}
                                    </label>
                                    <select
                                        name="recommendation"
                                        value={formData.recommendation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectRecommendation')}</option>
                                        <option value="Strong Hire">{t('strongHire')}</option>
                                        <option value="Hire">{t('hire')}</option>
                                        <option value="Maybe">{t('maybe')}</option>
                                        <option value="No Hire">{t('doNotHire')}</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('strengths')}
                                    </label>
                                    <textarea
                                        name="strengths"
                                        value={formData.strengths}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('listCandidateStrengths')}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('areasForImprovement')}
                                    </label>
                                    <textarea
                                        name="weaknesses"
                                        value={formData.weaknesses}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('listAreasForImprovement')}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <FileText size={14} />
                                        {t('interviewNotes')}
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder={t('detailedInterviewNotes')}
                                    />
                                </div>
                            </div>
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
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('saveInterview')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Bot Button - Bottom Right */}
            <button
                onClick={() => setIsBotOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Ask Interview bot"
                title="Ask Interview bot"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>
            
            {/* Bot Modal */}
            {isBotOpen && (
                <GeneralAIAgent 
                    onClose={() => setIsBotOpen(false)}
                    moduleContext="Interview"
                />
            )}
        </div>
    );
};

export default Interview;

