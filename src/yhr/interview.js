import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, User, Users, FileText, CheckCircle } from 'lucide-react';

const Interview = ({ onBack }) => {
    const navigate = useNavigate();
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
                        <h1 className="text-lg font-bold">Interview Arrangement</h1>
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
                                Interview Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Candidate Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="candidateName"
                                        value={formData.candidateName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter candidate name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Position Applied <span className="text-red-500">*</span>
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
                                        Interview Date <span className="text-red-500">*</span>
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
                                        Interview Time <span className="text-red-500">*</span>
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
                                        Interview Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="interviewType"
                                        value={formData.interviewType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Phone Screening">Phone Screening</option>
                                        <option value="Video Interview">Video Interview</option>
                                        <option value="In-Person">In-Person</option>
                                        <option value="Panel Interview">Panel Interview</option>
                                        <option value="Technical Interview">Technical Interview</option>
                                        <option value="Final Interview">Final Interview</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Location/Venue
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Meeting room or video link"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <User size={14} />
                                        Primary Interviewer <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="interviewer"
                                        value={formData.interviewer}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Interviewer name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Users size={14} />
                                        Additional Interviewers
                                    </label>
                                    <input
                                        type="text"
                                        name="interviewers"
                                        value={formData.interviewers}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Comma separated names"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Evaluation Scores */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-600" size={24} />
                                Interview Evaluation
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Technical Skills (1-10)
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
                                        Communication Skills (1-10)
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
                                        Cultural Fit (1-10)
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
                                        Overall Rating
                                    </label>
                                    <select
                                        name="overallRating"
                                        value={formData.overallRating}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Rating</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Below Average">Below Average</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="rescheduled">Rescheduled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Recommendation
                                    </label>
                                    <select
                                        name="recommendation"
                                        value={formData.recommendation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Recommendation</option>
                                        <option value="Strong Hire">Strong Hire</option>
                                        <option value="Hire">Hire</option>
                                        <option value="Maybe">Maybe</option>
                                        <option value="No Hire">No Hire</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Strengths
                                    </label>
                                    <textarea
                                        name="strengths"
                                        value={formData.strengths}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="List candidate strengths"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Areas for Improvement
                                    </label>
                                    <textarea
                                        name="weaknesses"
                                        value={formData.weaknesses}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="List areas for improvement"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <FileText size={14} />
                                        Interview Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Detailed interview notes and observations"
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
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Interview
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Interview;

