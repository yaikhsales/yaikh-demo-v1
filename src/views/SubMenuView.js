import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IconRenderer } from '../components/IconRenderer';

// Mapping function to match card titles to sub-icon image filenames
const getSubIconImage = (title) => {
    // Normalize title for matching (lowercase, remove special chars)
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedTitle = normalize(title);
    
    const titleToImageMap = {
        // Exact matches
        'Checklist 6s': 'checklist-6s.png',
        'Checklist Attendant': 'checklist-attendant.jpg',
        'My Attendant': 'my-attendant.jpg',
        'Compliance Certificate': 'compliance-certificate.png',
        'Audit Plan': 'audit-plan.png',
        'Show Lists Request': 'show-list-request.png',
        'Master List': 'master-list.jpg',
        'Purchaser Workspace': 'purchaser-workspace.png',
        'My Confirm Received': 'my-confirm-recieved.png', // Note: filename has typo "recieved"
        'Documents Joiner': 'document-joiner.png',
        'Document Joiner': 'document-joiner.png', // Alternative spelling
        'Verify PR': 'verify-image.png',
        'Approval PR': 'approval_images.png',
        'Pay PR': 'pay-pr.png',
        'Temperature Humidity Sensor': 'temperature-humidity-sensor.jpg',
        'Switch (Fan & Pump)': 'switch.webp',
        'Switch Fan & Pump': 'switch.webp',
        'Switch': 'switch.webp',
        'Digital Audit': 'digital-audit.png',
        'Meters': 'meters.jpg',
        'Meter': 'meters.jpg',
        'Water': 'water.jpg',
        'YQMS': 'YQMS.png',
        'YTM': 'ytm.png',
        'Traffic Light': 'traffic-light.png',
        'Waste': 'waste.png',
        'Boiler': 'Boiler.png',
        // CCTV module
        'Face Scan Logs': 'face-scan.png',
        'My Face Scan': 'my-face.png',
        // Gate Pass module
        'Gate Pass': 'gate_pass.avif',
        'Gate In/Out Records': 'gate-in-out.png',
        'Visitor Record': 'visitor-record.png',
        'Walk In/Out': 'walkinout.png',
        'Truck Records': 'truck.png',
        // Temp Work Request module
        'Request Worker Form': 'request_worker_form.png',
        'Request Worker List': 'request_worker_list.png',
        // E-Invoicing module
        'Cambodia E Invoice': 'e-invoive.png', // Note: filename has typo "invoive"
        'Supplier Management': 'supplier.png',
        'IEWS': 'IEWS.png',
        // Training module (Departments)
        'Online Training': 'online-training.png',
        'YAI': 'yai.png',
        'CSR': 'csr.png',
        'IT': 'it.png',
        'Shipping': 'shipping.png',
        'PPC': 'ppc_(production_planning_control)_department.png',
        'Merchandising': 'merchandising.png',
        'Purchasing': 'purchasing.png',
        'General Affairs': 'general_affairs.png',
        'Admin': 'admin.png',
        'HR': 'hr.png',
        'QA': 'qa.png',
        'Financial': 'financial.png',
        'CBSA': 'cbsa.png',
        'Sample': 'sample.png',
        'Technical': 'technical.png',
        'Raw Material Warehouse': 'raw_material_warehouse.png',
        'Cutting': 'cutting.png',
        'SCC': 'scc_(supply_chain_center)_department.png',
        'Sewing': 'sewing.png',
        'QC': 'qc_(quality_control)_department.png',
        'Ironing': 'ironing.png',
        'Packing': 'packing.png',
        'Washing': 'washing.png',
        'TPM': 'tpm_(total_product_maintenance)_department.png',
        'Warehouse': 'warehouse.png',
        'IE': 'ie.png',
        'QA (Fabric)': 'qa_(fabric).png',
        'Production': 'production.png',
        'In': 'water.jpg', // Using water icon for In
        'Out': 'water.jpg', // Using water icon for Out
        // Additional mappings for variations
        'Show List Request': 'show-list-request.png',
        'Show Lists': 'show-list-request.png',
        'Master': 'master-list.jpg',
        'Purchaser': 'purchaser-workspace.png',
        'Workspace': 'purchaser-workspace.png',
        'Temperature Sensor': 'temperature-humidity-sensor.jpg',
        'Humidity Sensor': 'temperature-humidity-sensor.jpg',
        'Air Quality Detector': 'air.png',
        'Air Quality': 'air.png', // Fallback
        'Traffic': 'traffic-light.png'
    };
    
    // First try exact match
    let imageName = titleToImageMap[title];
    
    // If no exact match, try normalized matching
    if (!imageName) {
        for (const [key, value] of Object.entries(titleToImageMap)) {
            if (normalize(key) === normalizedTitle) {
                imageName = value;
                break;
            }
        }
    }
    
    // If still no match, try partial matching
    if (!imageName) {
        for (const [key, value] of Object.entries(titleToImageMap)) {
            const normalizedKey = normalize(key);
            if (normalizedTitle.includes(normalizedKey) || normalizedKey.includes(normalizedTitle)) {
                imageName = value;
                break;
            }
        }
    }
    
    if (imageName) {
        return `assets/icons/sub-icons/${imageName}`;
    }
    return null;
};

const SubMenuView = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { state } = useLocation();
    const { title = 'Submenu', cards = [] } = state || {};
    
    // Check if this is a Training module (SUBMENU_DEPARTMENTS)
    // Training module has demoType === 'SUBMENU_DEPARTMENTS' and contains department cards
    const isTrainingModule = cards.some(card => 
        ['YAI', 'CSR', 'IT', 'Shipping', 'PPC', 'Merchandising', 'Purchasing', 'General Affairs', 
         'Admin', 'HR', 'QA', 'Financial', 'CBSA', 'Sample', 'Technical', 'Raw Material Warehouse',
         'Cutting', 'SCC', 'Sewing', 'QC', 'Ironing', 'Packing', 'Washing', 'TPM', 'Warehouse',
         'IE', 'QA (Fabric)', 'Production', 'Online Training'].includes(card.title)
    );

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] animate-in fade-in zoom-in duration-300">
            <div className="w-full max-w-4xl mb-8 flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white hover:text-cyan-400 gap-2 font-bold bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm"
                >
                    <ArrowLeft /> Dashboard
                </button>
                <h2 className="text-3xl text-white font-bold ml-auto mr-auto uppercase tracking-wider drop-shadow-lg">
                    {title}
                </h2>
                <div className="w-32"></div>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
                {cards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            // Handle Training sub-modules (except Online Training)
                            if (isTrainingModule && card.title !== 'Online Training') {
                                navigate(`/dashboard/training/${encodeURIComponent(card.title)}`, { state: { departmentName: card.title } });
                                return;
                            }
                            
                            if (card.action) {
                                navigate(card.action);
                                return;
                            } else if (card.title === 'Verify PR') {
                                navigate('/dashboard/verify-pr');
                            } else if (card.title === 'Approval PR') {
                                navigate('/dashboard/approval-pr');
                            } else if (card.title === 'Pay PR') {
                                navigate('/dashboard/pay-pr');
                            } else if (card.title === 'Checklist Attendant') {
                                navigate('/dashboard/checklist-attendance');
                            } else if (card.title === 'My Attendant') {
                                navigate('/dashboard/my-attendance');
                            } else if (card.title === 'Compliance Certificate') {
                                navigate('/dashboard/compliance-certificate');
                            } else if (card.title === 'Audit Plan') {
                                navigate('/dashboard/audit-plan');
                            } else if (card.title === 'Show Lists Request') {
                                navigate('/dashboard/show-list-request');
                            } else if (card.title === 'Master List') {
                                navigate('/dashboard/master-list');
                            } else if (card.title === 'My Confirm Received') {
                                navigate('/dashboard/my-confirm-received');
                            } else if (card.title === 'Temperature Humidity Sensor') {
                                navigate('/dashboard/air/temperature');
                            } else if (card.title === 'Air Quality Detector') {
                                navigate('/dashboard/air/quality');
                            } else if (card.title === 'Request Worker Form') {
                                navigate('/dashboard/temp-worker-request/form');
                            } else if (card.title === 'Request Worker List') {
                                navigate('/dashboard/temp-worker-request/list');
                            } else if (card.title === 'In') {
                                navigate('/dashboard/water/in');
                            } else if (card.title === 'Out') {
                                navigate('/dashboard/water/out');
                            } else if (card.title === 'Gate Pass') {
                                navigate('/dashboard/gatepass');
                            } else if (card.title === 'Visitor Record') {
                                navigate('/dashboard/gatepass/visitor');
                            } else if (card.title === 'Waste') {
                                navigate('/dashboard/waste/analytics');
                            } else if (card.title === 'Boiler') {
                                navigate('/dashboard/waste/boiler');
                            } else if (card.title === 'Face Scan Logs') {
                                navigate('/dashboard/cctv/face-scan');
                            } else if (card.title === 'My Face Scan') {
                                navigate('/dashboard/cctv/my-face-scan');
                            } else if (card.image) {
                                navigate(`/dashboard/image/${card.image}`);
                            } else {
                                navigate(`/dashboard/submenu/${moduleId}`);
                            }
                        }}
                        className={`w-48 h-40 rounded-xl shadow-xl hover:scale-105 transition transform flex flex-col items-center justify-center gap-4 border-b-4 border-black/20 ${
                            card.color || 'bg-white text-slate-800'
                        }`}
                    >
                        <div className="p-4 rounded-full relative" style={{ backgroundColor: 'transparent' }}>
                            {(() => {
                                // All modules now use sub-icons when available
                                // No modules are excluded from sub-icon mapping
                                const shouldUseOriginalIcon = false;
                                
                                // Priority: 1. sub-icon image (from mapping - check first), 2. card.image (explicit), 3. IconRenderer
                                // But skip sub-icon mapping for modules that should keep original icons
                                const subIconImage = shouldUseOriginalIcon ? null : getSubIconImage(card.title);
                                const imageToUse = subIconImage || card.image;
                                
                                if (imageToUse) {
                                    return (
                                        <>
                                            <img
                                                src={`/${imageToUse}`}
                                                alt={card.title}
                                                className="w-16 h-16 object-contain"
                                                style={{
                                                    mixBlendMode: 'multiply',
                                                    backgroundColor: 'transparent',
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                                }}
                                                onError={(e) => {
                                                    // Fallback to icon if image fails to load
                                                    e.target.style.display = 'none';
                                                    const fallback = e.target.parentElement.querySelector('.icon-fallback');
                                                    if (fallback) fallback.style.display = 'block';
                                                }}
                                            />
                                            <div className="icon-fallback hidden">
                                                <IconRenderer iconName={card.icon} size={64} />
                                            </div>
                                        </>
                                    );
                                }
                                return <IconRenderer iconName={card.icon} size={64} />;
                            })()}
                        </div>
                        <span className="font-bold text-lg text-center px-2 leading-tight">
                            {card.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubMenuView;

