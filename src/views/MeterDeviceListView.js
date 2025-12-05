import React from 'react';
import { ArrowLeft } from 'lucide-react';

const MeterDeviceListView = ({ onBack }) => {
    const meterData = [
        { id: 'MTR-001', location: 'Factory A, Floor 1', status: 'Online', lastReading: '2025-12-01 07:30', energy: '1205.75 kWh' },
        { id: 'MTR-002', location: 'Factory A, Floor 2', status: 'Online', lastReading: '2025-12-01 07:30', energy: '1543.21 kWh' },
        { id: 'MTR-003', location: 'Factory B, Main Hall', status: 'Offline', lastReading: '2025-11-30 18:00', energy: '987.50 kWh' },
        { id: 'MTR-004', location: 'Admin Building', status: 'Online', lastReading: '2025-12-01 07:31', energy: '450.10 kWh' },
    ];

    const columns = ['Device ID', 'Location', 'Status', 'Last Reading', 'Energy Usage'];

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-500 m-4">
            <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-slate-800">Meter's Device List</h2>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="px-6 py-3">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {meterData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50">
                                {Object.values(row).map((val, vIdx) => (
                                    <td key={vIdx} className="px-6 py-4 font-medium text-gray-800">
                                        {val === 'Online' ? (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                                                Online
                                            </span>
                                        ) : val === 'Offline' ? (
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                                                Offline
                                            </span>
                                        ) : (
                                            val
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeterDeviceListView;

