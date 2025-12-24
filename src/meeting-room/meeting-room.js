import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Calendar, Video, Clock, Filter, ChevronUp, ChevronDown, Search, Building, User, Users, Briefcase, Hash, Link2, Check } from 'lucide-react';

const MeetingRoom = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('my-history');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        employeeId: 'TS00000005',
        name: 'Testuser1',
        department: 'CSR',
        meetingType: '',
        mentionPerson: '',
        meetingDate: '2025-12-23',
        startHour: '12',
        startMinute: '55',
        endHour: '13',
        endMinute: '55',
        meetingLink: '',
        selectedRoom: null
    });

    const meetingTypes = [
        'Team Meeting',
        'Client Presentation',
        'Training Session',
        'Interview',
        'Project Review',
        'Other'
    ];

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const meetingRooms = [
        { id: 1, name: 'Conference Room 01', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
        { id: 2, name: 'Conference Room 02', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400' },
        { id: 3, name: 'Conference Room 03', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400' },
        { id: 4, name: 'Conference Room 04', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400' },
        { id: 5, name: 'Conference Room 05', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' }
    ];

    // Sample meeting bookings data
    const meetings = [
        {
            id: 1,
            meetingInfo: 'Team Standup Meeting',
            organizer: { name: 'John Doe', department: 'IT', employeeId: 'TS00000001' },
            schedule: { date: '2025-12-24', startTime: '09:00 AM', endTime: '09:30 AM' },
            status: 'ongoing',
            participants: 8,
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            room: 'Conference Room 01',
            meetingType: 'Team Meeting'
        },
        {
            id: 2,
            meetingInfo: 'Client Presentation - Q4 Review',
            organizer: { name: 'Sarah Smith', department: 'Sales', employeeId: 'TS00000002' },
            schedule: { date: '2025-12-24', startTime: '02:00 PM', endTime: '03:30 PM' },
            status: 'upcoming',
            participants: 12,
            meetingLink: 'https://zoom.us/j/123456789',
            room: 'Conference Room 02',
            meetingType: 'Client Presentation'
        },
        {
            id: 3,
            meetingInfo: 'Training Session - New System',
            organizer: { name: 'Mike Johnson', department: 'HR', employeeId: 'TS00000003' },
            schedule: { date: '2025-12-25', startTime: '10:00 AM', endTime: '12:00 PM' },
            status: 'upcoming',
            participants: 25,
            meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
            room: 'Conference Room 03',
            meetingType: 'Training Session'
        },
        {
            id: 4,
            meetingInfo: 'Project Review Meeting',
            organizer: { name: 'Emily Chen', department: 'Production', employeeId: 'TS00000004' },
            schedule: { date: '2025-12-23', startTime: '11:00 AM', endTime: '12:00 PM' },
            status: 'completed',
            participants: 6,
            meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
            room: 'Conference Room 01',
            meetingType: 'Project Review'
        }
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsModalOpen(false);
    };

    const handleAddMeetingLink = () => {
        const link = prompt('Enter meeting link:');
        if (link) {
            setFormData({ ...formData, meetingLink: link });
        }
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
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Meeting Room Booking</h1>
                <button
                    onClick={handleOpenModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={16} />
                    New Booking
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('my-history')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                activeTab === 'my-history' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-blue-100 text-blue-700'
                            }`}
                        >
                            My History
                        </button>
                        <button
                            onClick={() => setActiveTab('all-booking')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                activeTab === 'all-booking' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-blue-100 text-blue-700'
                            }`}
                        >
                            All Booking
                        </button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Total Meetings</div>
                                <div className="text-2xl font-bold text-slate-800">0</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Video className="text-green-600" size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Ongoing</div>
                                <div className="text-2xl font-bold text-slate-800">0</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Upcoming</div>
                                <div className="text-2xl font-bold text-slate-800">0</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Calendar className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Today</div>
                                <div className="text-2xl font-bold text-slate-800">0</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-slate-200 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <Filter className="text-slate-600" size={20} />
                            <span className="text-slate-700 font-semibold">Filter by status:</span>
                            <div className="flex gap-2">
                                {['all', 'ongoing', 'upcoming', 'today'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                            filterStatus === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-200 text-slate-700'
                                        }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="text-slate-600 text-sm">
                            Showing {meetings.length} meetings
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">MEETING INFO</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ORGANIZER</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">SCHEDULE</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">STATUS</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">PARTICIPANTS</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">MEETING LINK</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                                            <div className="flex items-center gap-2">
                                                ACTIONS
                                                <div className="flex flex-col">
                                                    <ChevronUp size={12} className="text-slate-400" />
                                                    <ChevronDown size={12} className="text-slate-400" />
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meetings.map((meeting) => (
                                        <tr key={meeting.id} className="border-b border-slate-200 hover:bg-slate-50">
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-slate-800">{meeting.meetingInfo}</div>
                                                <div className="text-xs text-slate-600 mt-1">{meeting.room}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-semibold text-slate-800">{meeting.organizer.name}</div>
                                                <div className="text-xs text-slate-600">{meeting.organizer.department} • {meeting.organizer.employeeId}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm text-slate-800">{meeting.schedule.date}</div>
                                                <div className="text-xs text-slate-600">{meeting.schedule.startTime} - {meeting.schedule.endTime}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    meeting.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                                                    meeting.status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <Users size={16} className="text-slate-600" />
                                                    <span className="text-sm text-slate-800">{meeting.participants}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                                    <Link2 size={14} />
                                                    Join
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                            <div className="flex items-center gap-2">
                                <Users size={20} className="text-slate-600" />
                                <h2 className="text-xl font-bold text-slate-800">Meeting Room Booking Form</h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Employee Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Briefcase size={16} />
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.employeeId}
                                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <User size={16} />
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Building size={16} />
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Meeting Type */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Users size={16} />
                                    Meeting Type
                                </label>
                                <select
                                    value={formData.meetingType}
                                    onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">--Select meeting type--</option>
                                    {meetingTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mention Person */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <User size={16} />
                                    Mention Person (Optional)
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.mentionPerson}
                                        onChange={(e) => setFormData({ ...formData, mentionPerson: e.target.value })}
                                        placeholder="Search by Employee Name or"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Calendar size={16} />
                                        Meeting Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                        <input
                                            type="date"
                                            value={formData.meetingDate}
                                            onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
                                            className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Clock size={16} />
                                        Start Time*
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.startHour}
                                            onChange={(e) => setFormData({ ...formData, startHour: e.target.value })}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {hours.map((hour) => (
                                                <option key={hour} value={hour}>{hour}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.startMinute}
                                            onChange={(e) => setFormData({ ...formData, startMinute: e.target.value })}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {minutes.map((minute) => (
                                                <option key={minute} value={minute}>{minute}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Clock size={16} />
                                        End Time*
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.endHour}
                                            onChange={(e) => setFormData({ ...formData, endHour: e.target.value })}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {hours.map((hour) => (
                                                <option key={hour} value={hour}>{hour}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.endMinute}
                                            onChange={(e) => setFormData({ ...formData, endMinute: e.target.value })}
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {minutes.map((minute) => (
                                                <option key={minute} value={minute}>{minute}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Meeting Link */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Link2 size={16} />
                                    Meeting Link (Optional)
                                </label>
                                {formData.meetingLink ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={formData.meetingLink}
                                            readOnly
                                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, meetingLink: '' })}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleAddMeetingLink}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Meeting Link
                                    </button>
                                )}
                            </div>

                            {/* Select Meeting Room */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                                    <Building size={16} />
                                    Select Meeting Room
                                </label>
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {meetingRooms.map((room) => (
                                        <div
                                            key={room.id}
                                            onClick={() => setFormData({ ...formData, selectedRoom: room.id })}
                                            className={`flex-shrink-0 w-48 cursor-pointer transition-all ${
                                                formData.selectedRoom === room.id
                                                    ? 'ring-4 ring-blue-500 rounded-lg'
                                                    : ''
                                            }`}
                                        >
                                            <div className="bg-slate-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={room.image}
                                                    alt={room.name}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="p-3 bg-white">
                                                    <div className="flex items-center gap-2">
                                                        <Building size={16} className="text-slate-600" />
                                                        <span className="text-sm font-semibold text-slate-800">{room.name}</span>
                                                    </div>
                                                    {formData.selectedRoom === room.id && (
                                                        <div className="mt-2 flex items-center gap-1 text-blue-600">
                                                            <Check size={16} />
                                                            <span className="text-xs">Selected</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Check size={16} />
                                    Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingRoom;

