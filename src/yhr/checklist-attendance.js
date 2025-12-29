import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, HelpCircle } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ChecklistAttendance = ({ onBack }) => {
    const navigate = useNavigate();
    const [sectionName, setSectionName] = useState('All Sc');
    const [fromDate, setFromDate] = useState('2025-12-01');
    const [toDate, setToDate] = useState('2025-12-23');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Generate dates from 1 to 23 December 2025
    const generateDates = () => {
        const dates = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let day = 1; day <= 23; day++) {
            const date = new Date(2025, 11, day); // Month is 0-indexed, so 11 = December
            dates.push({
                day: String(day).padStart(2, '0'),
                dayOfWeek: daysOfWeek[date.getDay()],
                fullDate: date
            });
        }
        return dates;
    };

    const dates = generateDates();

    // Sample employee data
    const sampleEmployees = [
        { id: 'YM7654', name: 'GAMINI', sex: 'Male', position: 'CSR Manager', startDate: '28/05/2024', photo: null },
        { id: 'YM3854', name: 'TYM001', sex: '', position: 'Compliance Worker', startDate: '10/07/2024', photo: null },
        { id: 'YM6472', name: 'LAI YINGWAI', sex: 'Female', position: 'IT', startDate: '15/07/2024', photo: null },
        { id: 'YM0109', name: 'WEI SHUYING', sex: 'Female', position: 'Supervisor Digital Development', startDate: '17/07/2024', photo: null },
        { id: 'YM1234', name: 'JOHN DOE', sex: 'Male', position: 'HR Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM5678', name: 'JANE SMITH', sex: 'Female', position: 'Admin Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM9012', name: 'MIKE JOHNSON', sex: 'Male', position: 'Administration Clerk', startDate: '26/07/2024', photo: null },
        { id: 'YM3456', name: 'SARAH WILLIAMS', sex: 'Female', position: 'General Affairs Manager', startDate: '26/07/2024', photo: null },
        { id: 'YM7890', name: 'DAVID BROWN', sex: 'Male', position: 'Purchasing Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM2345', name: 'EMILY DAVIS', sex: 'Female', position: 'Compliance Worker', startDate: '26/07/2024', photo: null },
        { id: 'YM6789', name: 'CHRIS WILSON', sex: 'Male', position: 'IT', startDate: '26/07/2024', photo: null },
        { id: 'YM0123', name: 'LISA ANDERSON', sex: 'Female', position: 'CSR Manager', startDate: '26/07/2024', photo: null },
        { id: 'YM4567', name: 'ROBERT TAYLOR', sex: 'Male', position: 'HR Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM8901', name: 'AMANDA MARTINEZ', sex: 'Female', position: 'Admin Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM2346', name: 'JAMES THOMPSON', sex: 'Male', position: 'Administration Clerk', startDate: '26/07/2024', photo: null },
        { id: 'YM5679', name: 'JENNIFER WHITE', sex: 'Female', position: 'General Affairs Manager', startDate: '26/07/2024', photo: null },
        { id: 'YM9013', name: 'MICHAEL HARRIS', sex: 'Male', position: 'Purchasing Supervisor', startDate: '26/07/2024', photo: null },
        { id: 'YM3457', name: 'MELISSA CLARK', sex: 'Female', position: 'Compliance Worker', startDate: '26/07/2024', photo: null },
        { id: 'YM7891', name: 'DANIEL LEWIS', sex: 'Male', position: 'IT', startDate: '26/07/2024', photo: null },
        { id: 'YM2347', name: 'NICOLE WALKER', sex: 'Female', position: 'CSR Manager', startDate: '26/07/2024', photo: null }
    ];

    // Generate attendance data for each employee
    const generateAttendanceData = (employeeId) => {
        const attendance = {};
        dates.forEach((date, idx) => {
            // YM7654 has orange question marks on specific days (05, 08, 11, 14, 17, 20, 23)
            if (employeeId === 'YM7654' && [4, 7, 10, 13, 16, 19, 22].includes(idx)) {
                attendance[date.day] = 'absent'; // Orange question mark
            }
            // YM6472 has green checkmark on day 09
            else if (employeeId === 'YM6472' && idx === 8) {
                attendance[date.day] = 'special'; // Green checkmark
            }
            // YM0109 has green checkmarks on days 09 and 10
            else if (employeeId === 'YM0109' && [8, 9].includes(idx)) {
                attendance[date.day] = 'special'; // Green checkmark
            }
            // Last few employees (15-20) have no attendance marks
            else if (sampleEmployees.indexOf(sampleEmployees.find(e => e.id === employeeId)) >= 14) {
                attendance[date.day] = null;
            }
            // Default: blue checkmark (present)
            else {
                attendance[date.day] = 'present'; // Blue checkmark
            }
        });
        return attendance;
    };

    // Generate more employees for pagination
    const generateMoreEmployees = () => {
        const moreEmployees = [];
        const names = ['ALICE', 'BOB', 'CHARLIE', 'DIANA', 'EDWARD', 'FIONA', 'GEORGE', 'HANNAH', 'IVAN', 'JULIA'];
        const positions = ['Compliance Worker', 'CSR Manager', 'IT', 'Supervisor Digital Development', 'HR Supervisor', 'Admin Supervisor', 'Administration Clerk', 'General Affairs Manager', 'Purchasing Supervisor'];
        const sexes = ['Male', 'Female', ''];
        
        for (let i = 21; i <= 9604; i++) {
            moreEmployees.push({
                id: `YM${String(i).padStart(4, '0')}`,
                name: names[i % names.length] + ' ' + String.fromCharCode(65 + (i % 26)),
                sex: sexes[i % sexes.length],
                position: positions[i % positions.length],
                startDate: '26/07/2024',
                photo: null
            });
        }
        return [...sampleEmployees, ...moreEmployees];
    };

    const [employees] = useState(generateMoreEmployees());
    const totalEmployees = employees.length;

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleFilter = () => {
        // Handle filter action
        console.log('Filter:', { sectionName, fromDate, toDate });
    };

    const handleShowAttendance = () => {
        // Handle show attendance action
        console.log('Show Attendance:', { sectionName, fromDate, toDate });
    };

    // Pagination logic
    const totalPages = Math.ceil(totalEmployees / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    const startItem = totalEmployees > 0 ? startIndex + 1 : 0;
    const endItem = Math.min(endIndex, totalEmployees);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= 2; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(479);
            pages.push(480);
        }

        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &lt;&lt; Previous
                </button>
                {pages.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`px-3 py-1 border border-slate-300 rounded text-sm font-semibold ${
                            currentPage === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'hover:bg-slate-50'
                        } ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next &gt;&gt;
                </button>
            </div>
        );
    };

    const getAttendanceIcon = (status) => {
        if (status === 'present') {
            return (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" />
                </div>
            );
        } else if (status === 'absent') {
            return (
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <HelpCircle size={12} className="text-white" />
                </div>
            );
        } else if (status === 'special') {
            return (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" />
                </div>
            );
        }
        return null;
    };

    const formatDateForInput = (dateString) => {
        // Convert DD/MM/YYYY to YYYY-MM-DD
        const parts = dateString.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const formatDateForDisplay = (dateString) => {
        // Convert YYYY-MM-DD to DD/MM/YYYY
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b-2 border-slate-300 flex items-center gap-4 flex-shrink-0 shadow-md relative z-[201]">
                <button 
                    onClick={handleBack} 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0 bg-slate-100"
                    aria-label="Go back"
                >
                    <ArrowLeft size={18} className="text-slate-700" /> Back
                </button>
                <div className="flex-1 text-center min-w-0">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">TEXLINK TECHNOLOGIES CO., LTD.</h1>
                    <p className="text-sm md:text-base text-slate-600 mt-1">បញ្ជីស្រង់វត្តមានប្រចាំថ្ងៃតាមស្តេខទម្រង់មុខ</p>
                </div>
                <div className="w-10 flex-shrink-0"></div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-slate-50 p-4 border-b flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Section Name:</label>
                    <select
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All Sc">All Sc</option>
                        <option value="Section 1">Section 1</option>
                        <option value="Section 2">Section 2</option>
                        <option value="Section 3">Section 3</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">From:</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">To:</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                    Filter
                </button>
                <button
                    onClick={handleShowAttendance}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                >
                    Show Attendance
                </button>
            </div>

            {/* Main Content - Split Table */}
            <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                {/* Employee Info Columns */}
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-0 bg-slate-50 z-20">NO</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-12 bg-slate-50 z-20">ID</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-24 bg-slate-50 z-20">Photo</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-36 bg-slate-50 z-20 min-w-[150px]">Name</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-48 bg-slate-50 z-20 min-w-[80px]">Sex</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-60 bg-slate-50 z-20 min-w-[200px]">Position</th>
                                <th className="px-3 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-left sticky left-72 bg-slate-50 z-20 min-w-[120px]">Start Date</th>
                                
                                {/* Date Columns */}
                                {dates.map((date, idx) => (
                                    <th key={idx} className="px-2 py-2 border border-slate-200 text-slate-600 font-bold text-xs text-center min-w-[50px]">
                                        <div className="flex flex-col">
                                            <span>{date.day}</span>
                                            <span className="text-xs font-normal text-slate-500">{date.dayOfWeek}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEmployees.map((employee, empIdx) => {
                                const attendance = generateAttendanceData(employee.id);
                                const rowNumber = startIndex + empIdx + 1;
                                
                                return (
                                    <tr key={employee.id} className="hover:bg-blue-50 transition-colors">
                                        {/* Employee Info */}
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 text-center sticky left-0 bg-white z-10">{rowNumber}</td>
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-12 bg-white z-10">{employee.id}</td>
                                        <td className="px-3 py-3 border border-slate-200 sticky left-24 bg-white z-10">
                                            <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700">
                                                {employee.name.charAt(0)}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-36 bg-white z-10">{employee.name}</td>
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-48 bg-white z-10">{employee.sex}</td>
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-60 bg-white z-10">{employee.position}</td>
                                        <td className="px-3 py-3 border border-slate-200 text-slate-700 sticky left-72 bg-white z-10">{employee.startDate}</td>
                                        
                                        {/* Attendance Grid */}
                                        {dates.map((date, dateIdx) => (
                                            <td key={dateIdx} className="px-2 py-3 border border-slate-200 text-center">
                                                {getAttendanceIcon(attendance[date.day])}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white border-t p-4 flex items-center justify-end gap-4 flex-shrink-0">
                <div className="text-sm text-slate-600">
                    Showing {startItem} to {endItem} of {totalEmployees} results
                </div>
                {renderPagination()}
            </div>
        </div>
    );
};

export default ChecklistAttendance;

