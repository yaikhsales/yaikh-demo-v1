import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, FileText, Eye, Download, XCircle,
  CheckCircle2, Clock, ChevronLeft, ChevronRight, MoreHorizontal, Video
} from 'lucide-react';
import ShippingFormModal from './ShippingFormModal';
import VideoViewer from '../components/VideoViewer';
import DocumentViewer from '../components/DocumentViewer';

const ShippingRequest = ({ onBack }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const CE_VIDEO_PATH = "/assets/short-video-training/ce.mp4";
  const CE_REPORT_PATH = "/assets/report-training/ce-shipping-request-audit.html";

  // Mock data matching the screenshot Image 1
  const [requests] = useState([
    {
      code: '241',
      gmStatus: 'Approved',
      gmDate: '2024-03-31 07:33:30',
      accStatus: 'Pending',
      requestedBy: 'Sin Khon',
      avatar: 'https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg',
      payFor: '1. General Supply',
      amount: '300.00 USD',
      total: '300.00 USD',
      date: '03-31-2024',
    },
    {
      code: '240',
      gmStatus: 'Approved',
      gmDate: '2024-03-31 07:28:15',
      accStatus: 'Pending',
      requestedBy: 'Sin Khon',
      avatar: 'https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg',
      payFor: '1. Forwarder Handling Charge',
      amount: '5,220.00 USD',
      total: '5,220.00 USD',
      date: '03-31-2024',
    },
    {
      code: '239',
      gmStatus: 'Approved',
      gmDate: '2024-03-31 07:23:45',
      accStatus: 'Approved',
      accDate: '2024-03-31 07:23:45',
      requestedBy: 'Sin Khon',
      avatar: 'https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg',
      payFor: '1. Leading Team',
      amount: '150.00 USD',
      total: '150.00 USD',
      date: '03-31-2024',
    },
    {
      code: '238',
      gmStatus: 'Approved',
      gmDate: '2024-03-31 07:20:00',
      accStatus: 'Approved',
      accDate: '2024-03-31 07:20:00',
      requestedBy: 'Sin Khon',
      avatar: 'https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg',
      payFor: '1. MOP (Ministry of Commerce)',
      amount: '1,050.00 USD',
      total: '1,050.00 USD',
      date: '03-31-2024',
    },
    {
      code: '237',
      gmStatus: 'Approved',
      gmDate: '2024-03-31 06:58:10',
      accStatus: 'Pending',
      requestedBy: 'Sin Khon',
      avatar: 'https://ym.yaikh.com/storage/profiles/66a364656d77aaa47d0a92a6/hoRySkN00IOaLwBCochzKmK3NVefo85uTVdCCoNi.jpg',
      payFor: '1. Forwarder Handling Charge',
      amount: '530.00 USD',
      total: '530.00 USD',
      date: '03-31-2024',
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Header bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-blue-600 font-bold text-xs"
          >
            BACK
          </button>
          <h1 className="text-blue-900 font-black text-lg tracking-tight border-b-2 border-blue-900 px-2 pb-0.5">
            Shipping Request
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={() => setSelectedVideo(CE_VIDEO_PATH)}
                className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-blue-600 border border-slate-200 bg-white"
                title="Video Training"
            >
                <Video size={18} />
            </button>
            <button
                onClick={() => setSelectedDocument(CE_REPORT_PATH)}
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-blue-600 border border-slate-200 bg-white"
                title="Executive Audit Report"
            >
                <FileText size={18} />
            </button>
            <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm transition-all active:scale-95"
            >
                <Plus size={18} />
                Add Request
            </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-[1200px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">Reject</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">GM</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">ACC</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">Requested</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">Pay</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-right">Amount</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-right">Total</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-center">File</th>
                <th className="px-4 py-3 text-xs font-black text-gray-600 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, idx) => (
                <tr key={item.code} className={`border-b hover:bg-gray-50/50 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-4 py-4 font-bold text-gray-800">{item.code}</td>
                  <td className="px-4 py-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-[10px] font-black uppercase transition-colors">
                      Reject
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black border-2 ${
                            item.gmStatus === 'Approved' ? 'bg-green-50 border-green-600 text-green-700' : 'bg-orange-50 border-orange-600 text-orange-700'
                        }`}>
                            {item.gmStatus}
                        </span>
                        <span className="text-[9px] text-gray-500 mt-1 font-bold">{item.gmDate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black border-2 ${
                        item.accStatus === 'Approved' ? 'bg-green-50 border-green-600 text-green-700' : 'bg-red-50 border-red-600 text-red-700'
                    }`}>
                        {item.accStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center gap-1">
                        <img src={item.avatar} alt={item.requestedBy} className="w-8 h-8 rounded border border-gray-200 object-cover" />
                        <span className="text-[10px] font-black uppercase text-gray-700">BY: {item.requestedBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-[200px]">
                    <span className="text-xs font-bold text-gray-700">{item.payFor}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-black text-gray-800">{item.amount}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-xs font-black text-blue-700">{item.total}</span>
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-gray-600">
                    {item.date}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-red-500 hover:text-red-600 transition-colors">
                        <FileText size={24} fill="currentColor" fillOpacity={0.1} />
                        <div className="text-[8px] font-black">PDF</div>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center gap-1">
                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded text-[10px] font-black transition-all">
                            Detail
                        </button>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-[10px] font-black transition-all">
                            View
                        </button>
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-[10px] font-black transition-all">
                            PDF
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination bar matching Image 1 */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-gray-500 font-bold">
                Showing 1 to 10 of 228 results
            </div>
            <div className="flex items-center gap-1">
                <button className="p-1 border rounded hover:bg-gray-100"><ChevronLeft size={14}/></button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, '...', 22, 23, 24].map((p, i) => (
                    <button key={i} className={`px-2 py-1 border rounded font-black ${p === 1 ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}>
                        {p}
                    </button>
                ))}
                <button className="p-1 border rounded hover:bg-gray-100"><Plus size={14}/></button>
                <button className="p-1 border rounded hover:bg-gray-100"><ChevronRight size={14}/></button>
            </div>
        </div>
      </div>

      {showAddModal && <ShippingFormModal onClose={() => setShowAddModal(false)} />}

      {selectedVideo && (
        <VideoViewer
          videoPath={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {selectedDocument && (
        <DocumentViewer
          documentPath={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default ShippingRequest;
