import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronDown } from 'lucide-react';

const MyAttendance = ({ onBack }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('2025-12-01');
    const [toDate, setToDate] = useState('2025-12-23');
    const [attendanceData, setAttendanceData] = useState({});

    // Generate dates from 1 to 23 December 2025
    const generateDates = () => {
        const dates = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let day = 1; day <= 23; day++) {
            const date = new Date(2025, 11, day); // Month is 0-indexed, so 11 = December
            dates.push({
                day: String(day).padStart(2, '0'),
                dayOfWeek: daysOfWeek[date.getDay()],
                fullDate: date,
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            });
        }
        return dates;
    };

    const dates = generateDates();

    // Attendance codes legend
    const attendanceCodes = [
        { code: 'W', label: 'មកធ្វើការ', description: 'Come to work' },
        { code: 'P', label: 'ឈប់មានច្បាប់', description: 'Leave with permission' },
        { code: 'A', label: 'ឈប់អត់ច្បាប់', description: 'Absent without permission' },
        { code: 'SL', label: 'ច្បាប់ឈើ ឬពិនិត្យផ្ទៃពោះ', description: 'Sick leave or maternity check-up' },
        { code: 'SP', label: 'ច្បាប់ពិសេស', description: 'Special leave' },
        { code: 'AL', label: 'ច្បាប់បំណាច់ឆ្នាំ', description: 'Annual leave' },
        { code: 'AB', label: 'លាឈប់', description: 'Resigned' },
        { code: 'SS', label: 'ច្បាប់ព្យួរ', description: 'Suspended leave' },
        { code: 'ML', label: 'ច្បាប់សម្រាល', description: 'Maternity leave' },
        { code: 'OT', label: 'ថែមម៉ោង', description: 'Overtime' },
        { code: 'PH', label: 'ធ្វើការថ្ងៃឈប់សម្រាក', description: 'Work on holiday' }
    ];

    // Sample employee data
    const sampleEmployees = [
        { id: 'YMTESTUSER', name: 'Testuser', sex: '', position: '', startDate: '14/07/2025', photo: null },
        { id: 'TS00000005', name: 'Testuser1', sex: 'Male', position: '', startDate: '19/11/2025', photo: null }
    ];

    // Generate more sample employees
    const generateMoreEmployees = () => {
        const moreEmployees = [];
        for (let i = 3; i <= 100; i++) {
            moreEmployees.push({
                id: `TS${String(i).padStart(8, '0')}`,
                name: `Testuser${i}`,
                sex: i % 2 === 0 ? 'Male' : 'Female',
                position: '',
                startDate: '19/11/2025',
                photo: null
            });
        }
        return [...sampleEmployees, ...moreEmployees];
    };

    const [employees] = useState(generateMoreEmployees());

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleSearch = () => {
        // Handle search action
        console.log('Search:', searchTerm);
    };

    const handleFilter = () => {
        // Handle filter action
        console.log('Filter:', { fromDate, toDate });
    };

    const handleAttendanceChange = (employeeId, date, timeSlot, value) => {
        const key = `${employeeId}_${date}_${timeSlot}`;
        setAttendanceData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getAttendanceValue = (employeeId, date, timeSlot) => {
        const key = `${employeeId}_${date}_${timeSlot}`;
        return attendanceData[key] || '';
    };

    const filteredEmployees = employees.filter(emp => 
        searchTerm === '' || 
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDateForDisplay = (dateString) => {
        // Convert YYYY-MM-DD to DD/MM/YYYY
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b-2 border-slate-300 flex items-center gap-4 flex-shrink-0 shadow-md relative z-[201]">
                <div className="w-32"></div> {/* Left spacer */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleBack} 
                            className="p-2 hover:bg-slate-200 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold px-4 py-2"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={18} className="inline mr-2" />
                            Back
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl md:text-2xl font-bold text-blue-900 leading-tight">TEXLINK TECHNOLOGIES CO., LTD.</h1>
                        <p className="text-sm md:text-base text-slate-600 mt-1">បញ្ជីស្រង់វត្តមានប្រចាំថ្ងៃ</p>
                    </div>
                </div>
                <div className="w-32"></div> {/* Right spacer */}
            </div>

            {/* Attendance Legend */}
            <div className="bg-white p-4 border-b flex flex-wrap gap-4 flex-shrink-0 text-sm">
                {attendanceCodes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">({item.code})</span>
                        <span className="text-slate-600">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Search and Filter Section */}
            <div className="bg-slate-50 p-4 border-b flex items-center gap-4 flex-wrap flex-shrink-0">
                <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                    <div className="flex-1 flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-4 py-2">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or Name..."
                            className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                        Search
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">From</label>
                    <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="bg-transparent outline-none text-slate-700 text-sm"
                        />
                    </div>
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">to</label>
                    <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2">
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="bg-transparent outline-none text-slate-700 text-sm"
                        />
                    </div>
                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                {/* Employee Info Columns */}
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-center sticky left-0 bg-slate-50 z-20">NO</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-12 bg-slate-50 z-20 min-w-[120px]">ID</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-36 bg-slate-50 z-20 min-w-[60px]">Photo</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-48 bg-slate-50 z-20 min-w-[150px]">Name</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-60 bg-slate-50 z-20 min-w-[80px]">Sex</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-72 bg-slate-50 z-20 min-w-[150px]">Position</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-84 bg-slate-50 z-20 min-w-[120px]">Start Date</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-center sticky left-96 bg-slate-50 z-20 min-w-[80px]">Time</th>
                                
                                {/* Date Columns */}
                                {dates.map((date, idx) => (
                                    <th key={idx} className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-center min-w-[80px]">
                                        <div className="flex flex-col">
                                            <span className={date.isWeekend ? 'text-red-600' : ''}>{date.day}</span>
                                            <span className={`text-xs font-normal ${date.isWeekend ? 'text-red-600' : 'text-slate-500'}`}>{date.dayOfWeek}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, empIdx) => {
                                const timeSlots = ['M', 'E', 'OT'];
                                
                                return timeSlots.map((timeSlot, timeIdx) => (
                                    <tr key={`${employee.id}_${timeSlot}`} className="hover:bg-blue-50 transition-colors">
                                        {/* Employee Info - Only show for first row (M) */}
                                        {timeIdx === 0 && (
                                            <>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 text-center sticky left-0 bg-white z-10 align-top">
                                                    {empIdx + 1}
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-12 bg-white z-10 align-top">
                                                    {employee.id}
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 sticky left-36 bg-white z-10 align-top">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                                                        {employee.name.charAt(0)}
                                                    </div>
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-48 bg-white z-10 align-top">
                                                    {employee.name}
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-60 bg-white z-10 align-top">
                                                    {employee.sex}
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-72 bg-white z-10 align-top">
                                                    {employee.position}
                                                </td>
                                                <td rowSpan={3} className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-84 bg-white z-10 align-top">
                                                    {employee.startDate}
                                                </td>
                                            </>
                                        )}
                                        
                                        {/* Time Slot */}
                                        <td className="px-3 py-2 border border-slate-200 text-slate-700 text-center sticky left-96 bg-white z-10 font-semibold">
                                            {timeSlot}
                                        </td>
                                        
                                        {/* Attendance Dropdowns */}
                                        {dates.map((date, dateIdx) => (
                                            <td key={dateIdx} className="px-2 py-2 border border-slate-200 text-center">
                                                <select
                                                    value={getAttendanceValue(employee.id, date.day, timeSlot)}
                                                    onChange={(e) => handleAttendanceChange(employee.id, date.day, timeSlot, e.target.value)}
                                                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">-</option>
                                                    {attendanceCodes.map((code, codeIdx) => (
                                                        <option key={codeIdx} value={code.code}>
                                                            {code.code}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        ))}
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAttendance;

