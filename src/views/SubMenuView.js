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
        'TB Monthly Yearly': 'dashboard.png',
        'TOI': 'global-connection.png',
        'Factory Accounting': 'factory-account.png',
        'TAX Reporting': 'tax-reporting.png',
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
        'KANBAN': 'traffic-light.png',
        'Traffic Light': 'traffic-light.png', // Keep for backward compatibility
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
        'Purchase Request': 'purchase-request.png',
        'Show List Request': 'show-list-request.png',
        'Show Lists': 'show-list-request.png',
        'Master': 'master-list.jpg',
        'Purchaser': 'purchaser-workspace.png',
        'Workspace': 'purchaser-workspace.png',
        'Temperature Sensor': 'temperature-humidity-sensor.jpg',
        'Humidity Sensor': 'temperature-humidity-sensor.jpg',
        'Air Quality Detector': 'air.png',
        'Air Quality': 'air.png', // Fallback
        'Traffic': 'traffic-light.png',
        // FC module sub-modules
        'Fabric Receiving': 'fabric-receiving.jpg',
        'Fabric Inspection': 'fabric-inspection.jpg',
        'Fabric Test': 'fabric-test.jpg',
        'Fabric Issuing': 'fabric-issuing.jpg',
        'Accessories Receiving': 'accessories-receiving.jpg',
        'Accessories Inspection': 'accessories-inspection.jpg',
        'Accessories Issuing': 'accessories-issuing.jpg',
        'Warehouse Tracking ': 'warehouse-tracking-location.jpg',
        'Delivery Tracking': 'delivery-tracking.jpg',
        // YQMS module sub-modules
        'Pre Production Meeting': 'pre-production-meeting.jpg',
        'Material Quality': 'material-quality.jpg',
        'Supplier Evaluation': 'supplier-evaluation.jpg',
        'Test And Pilot': 'test-and-pilot.jpg',
        'First Output Cutting': 'first-output-cutting.jpg',
        'First Output Printing Embroidery': 'first-output-printing-embroidery.jpg',
        'First Output Sewing': 'first-output-sewing.jpg',
        'First Output Finishing And Packing': 'first-output-finishing-and-packing.jpg',
        'QA Cutting': 'qa-cutting.jpg',
        'QA Printing Embroidery': 'qa-printing-embroidery.jpg',
        'QA 20pcs Audit': 'qa-20pcs-audit.jpg',
        'QA Audit Finishing Packing': 'qa-audit-finishing-packing.jpg',
        'Inline Audit Rolling': 'inline-audit-rolling.jpg',
        'Offline Audit': 'offline-audit.jpg',
        'QC End Line Checking': 'qc-end-line-checking.jpg',
        'QC File': 'qc-file.jpg',
        'Pre Final Inspection': 'pre-final-inspection.jpg',
        'Final Inspection': 'final-inspection.jpg',
        'Buyer Final Inspection': 'buyer-final-inspection.jpg',
        'Humidity Aquaboy Checking': 'humidity-acraboy-checking.jpg',
        'Customer Complain Cap': 'customer-complain-cap.jpg'
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
        // Check if it's an FC sub-module image (jpg files in fc folder)
        const fcSubModules = ['fabric-receiving.jpg', 'fabric-inspection.jpg', 'fabric-test.jpg', 
                             'fabric-issuing.jpg', 'accessories-receiving.jpg', 'accessories-inspection.jpg', 
                             'accessories-issuing.jpg', 'warehouse-tracking-location.jpg', 'delivery-tracking.jpg'];
        if (fcSubModules.includes(imageName)) {
            return `assets/fc/${imageName}`;
        }
        
        // Check if it's a YQMS sub-module image (jpg files in yqms folder)
        const yqmsSubModules = [
            'pre-production-meeting.jpg', 'material-quality.jpg', 'supplier-evaluation.jpg',
            'test-and-pilot.jpg', 'first-output-cutting.jpg', 'first-output-printing-embroidery.jpg',
            'first-output-sewing.jpg', 'first-output-finishing-and-packing.jpg', 'qa-cutting.jpg',
            'qa-printing-embroidery.jpg', 'qa-20pcs-audit.jpg', 'qa-audit-finishing-packing.jpg',
            'inline-audit-rolling.jpg', 'offline-audit.jpg', 'qc-end-line-checking.jpg',
            'qc-file.jpg', 'pre-final-inspection.jpg', 'final-inspection.jpg',
            'buyer-final-inspection.jpg', 'humidity-acraboy-checking.jpg', 'customer-complain-cap.jpg'
        ];
        if (yqmsSubModules.includes(imageName)) {
            return `assets/yqms/${imageName}`;
        }
        
        return `assets/icons/sub-icons/${imageName}`;
    }
    return null;
};

// Render card component (extracted for reuse)
const renderCard = (card, idx, navigate, moduleId, isTrainingModule, isCompact = false, theme = 'normal', isAccountant = false, isPurchaseRequest = false) => {
    const subIconImage = getSubIconImage(card.title);
    // For E-Government, use the image URL directly from card.image (external URL)
    // If card.image is provided and starts with modules-image or is an external URL, use it directly
    // Otherwise, use subIconImage or card.image
    const imageToUse = card.url ? card.image : (
        (card.image && (card.image.startsWith('modules-image/') || card.image.startsWith('assets/icons/sub-icons/') || card.image.startsWith('http://') || card.image.startsWith('https://'))) 
            ? card.image 
            : (subIconImage || card.image)
    );
    const isFCModule = imageToUse && imageToUse.includes('assets/fc/');
    const isYQMSModule = imageToUse && imageToUse.includes('assets/yqms/');
    const isEGovModule = card.url !== undefined; // E-Government modules have url property
    const isNonClickableModule = isFCModule || isYQMSModule;
    
    // Determine text color for E-Government modules and Purchase Request modules
    let textColorClass = '';
    if (card.color) {
        if (card.color.includes('text-black')) {
            textColorClass = 'text-black';
        } else if (card.color.includes('text-white')) {
            textColorClass = 'text-white';
        } else if (isEGovModule) {
            textColorClass = 'text-white';
        }
    }
    
    // For FC and YQMS modules, use div instead of button since they're not clickable
    const CardComponent = isNonClickableModule ? 'div' : 'button';
    
    // Compact sizing for grouped layout - all boxes same size
    // E-Government modules get much larger size for better visibility
    // Accountant and Purchase Request modules get bigger size with colorful style
    const isColorfulCard = isAccountant || isPurchaseRequest;
    const isYQMSOrFC = isYQMSModule || isFCModule;
    
    // Check if text is long for YQMS/FC modules - adjust font size based on length
    const titleLength = card.title ? card.title.length : 0;
    const isLongText = isYQMSOrFC && titleLength > 20;
    const isVeryLongText = isYQMSOrFC && titleLength > 30;
    
    const cardSize = isColorfulCard
        ? 'w-full h-56' // Bigger cards for Accountant and Purchase Request (224px height)
        : (isEGovModule 
            ? 'w-64 h-56' // Card size similar to the sample (256px × 224px)
            : (isCompact 
                ? (isNonClickableModule ? (isYQMSOrFC ? 'w-[112px] h-[120px]' : 'w-[110px] h-[110px]') : 'w-[100px] h-[100px]')
                : (isNonClickableModule ? 'w-56 h-52' : 'w-48 h-40')));
    const iconSize = isColorfulCard
        ? 'w-32 h-32' // Bigger icons for Accountant and Purchase Request (128px × 128px)
        : (isEGovModule 
            ? 'w-40 h-40' // Large logo for clarity (160px × 160px)
            : (isCompact 
                ? (isNonClickableModule ? (isYQMSOrFC ? 'w-[72px] h-[72px]' : 'w-20 h-20') : 'w-16 h-16')
                : (isNonClickableModule ? 'w-28 h-28' : 'w-16 h-16')));
    const textSize = isColorfulCard
        ? 'text-lg font-bold' // Bigger text for Accountant and Purchase Request
        : (isEGovModule 
            ? 'text-xl font-bold' // Bold text for clarity
            : ((isYQMSModule || isFCModule) 
                ? (isVeryLongText ? 'text-[9px] font-bold' : (isLongText ? 'text-[10px] font-bold' : 'text-xs font-bold')) 
                : (isCompact ? 'text-[9px] leading-tight' : (isNonClickableModule ? 'text-base' : 'text-lg'))));
    const gapSize = isColorfulCard ? 'gap-4' : (isEGovModule ? 'gap-2' : (isCompact ? (isYQMSOrFC ? 'gap-1.5' : 'gap-0.5') : 'gap-3'));
    
    return (
        <CardComponent
            key={idx}
            onClick={isNonClickableModule ? undefined : () => {
                // Handle E-Government sub-modules - open URL in new tab
                if (card.url) {
                    window.open(card.url, '_blank', 'noopener,noreferrer');
                    return;
                }
                
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
                } else if (card.title === 'Cambodia E Invoice') {
                    // Open Cambodia E Invoice login page in new tab
                    window.open('https://einvoice.ggmt.sg/login', '_blank', 'noopener,noreferrer');
                } else if (card.title === 'Supplier Management') {
                    // Show Supplier Management image
                    const encodedPath = encodeURIComponent('assets/e-invoice/supplier-management.jpg');
                    navigate(`/dashboard/image/${encodedPath}`);
                } else if (card.title === 'IEWS') {
                    // Show IEWS image
                    const encodedPath = encodeURIComponent('assets/e-invoice/IEWS.jpg');
                    navigate(`/dashboard/image/${encodedPath}`);
                } else if (isFCModule || isYQMSModule) {
                    // FC and YQMS sub-modules: display icons only, no navigation
                    return;
                } else if (card.image) {
                    // Encode the image path to handle slashes correctly
                    const encodedPath = encodeURIComponent(card.image);
                    navigate(`/dashboard/image/${encodedPath}`);
                } else {
                    navigate(`/dashboard/submenu/${moduleId}`);
                }
            }}
            className={`${cardSize} ${isColorfulCard ? 'rounded-xl' : (isEGovModule ? 'rounded-2xl' : 'rounded-lg')} shadow-xl flex flex-col items-center ${isYQMSOrFC && isCompact ? 'justify-start' : 'justify-center'} ${gapSize} ${
                isColorfulCard
                    ? 'border-0'
                    : (isEGovModule 
                        ? '' 
                        : 'border-2 border-black/20')
            } ${
                isNonClickableModule ? 'cursor-default' : (isEGovModule ? 'cursor-pointer' : 'cursor-pointer')
            } ${card.color ? card.color : (isColorfulCard ? 'bg-white' : (isEGovModule ? 'bg-white text-slate-800' : theme === 'normal' ? 'bg-white/90 text-slate-800 border-white/30' : 'bg-white text-slate-800'))} ${isColorfulCard ? 'p-6' : (isCompact ? (isYQMSOrFC ? 'p-2' : 'p-1') : (isEGovModule ? 'p-6' : 'p-4'))} ${isYQMSOrFC ? 'overflow-hidden' : ''}`}
        >
            <div className={isEGovModule
                ? 'p-4 rounded-xl relative flex-shrink-0'
                : (isNonClickableModule
                    ? (isCompact ? (isYQMSOrFC ? 'flex-shrink-0' : 'p-0 rounded-lg relative') : theme === 'normal' ? 'p-3 rounded-lg relative bg-white/20 backdrop-blur-sm' : 'p-3 rounded-lg relative bg-white/10 backdrop-blur-sm')
                    : (isCompact ? 'p-0 rounded-lg relative' : 'p-2 rounded-lg relative')
                )
            }>
                {(() => {
                    const shouldUseOriginalIcon = false;
                    const finalImageToUse = shouldUseOriginalIcon ? null : imageToUse;
                    
                    if (finalImageToUse) {
                        return (
                            <>
                                            <img
                                                src={finalImageToUse.startsWith('http://') || finalImageToUse.startsWith('https://') 
                                                    ? finalImageToUse 
                                                    : `/${finalImageToUse}`}
                                                alt={card.title}
                                                className={`${iconSize} object-contain`}
                                                style={isEGovModule ? {
                                                    backgroundColor: 'transparent',
                                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                                                    borderRadius: '8px',
                                                    maxWidth: '100%',
                                                    maxHeight: '100%'
                                                } : (isNonClickableModule ? {
                                                    backgroundColor: 'transparent',
                                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                                                    borderRadius: '8px'
                                                } : (card.image ? {
                                                    backgroundColor: 'transparent',
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                                                    borderRadius: '8px'
                                                } : {
                                                    mixBlendMode: 'multiply',
                                                    backgroundColor: 'transparent',
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                                }))}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const fallback = e.target.parentElement.querySelector('.icon-fallback');
                                                    if (fallback) fallback.style.display = 'block';
                                                }}
                                            />
                                            <div className="icon-fallback hidden">
                                                <IconRenderer iconName={card.icon} size={isColorfulCard ? 128 : (isCompact ? (isNonClickableModule ? 64 : 48) : (isNonClickableModule ? 112 : 64))} />
                                            </div>
                            </>
                        );
                    }
                    return <IconRenderer iconName={card.icon} size={isColorfulCard ? 128 : (isCompact ? 48 : 64)} />;
                })()}
            </div>
            <span className={`font-bold text-center px-1 ${isYQMSOrFC && isCompact ? 'leading-[1.1]' : 'leading-tight'} ${textSize} break-words w-full flex-shrink-0 ${textColorClass || (card.color && card.color.includes('text-white') ? 'text-white' : card.color && card.color.includes('text-black') ? 'text-black' : 'text-slate-800')}`} style={{ wordWrap: 'break-word', overflowWrap: 'break-word', display: 'block', maxHeight: isYQMSOrFC && isCompact ? '36px' : 'none', overflow: 'hidden' }}>
                {card.title}
            </span>
        </CardComponent>
    );
};

const SubMenuView = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { state } = useLocation();
    const { title = 'Submenu', cards = [], isGrouped = false } = state || {};
    const theme = 'normal'; // Default theme
    
    // Determine if cards is grouped structure
    const isGroupedStructure = isGrouped || (cards && cards.grouped === true);
    
    // Check if this is a Training module (SUBMENU_DEPARTMENTS)
    // Training module has demoType === 'SUBMENU_DEPARTMENTS' and contains department cards
    let flatCards = [];
    if (isGroupedStructure && cards && cards.groups) {
        // Extract all cards from groups
        flatCards = Array.isArray(cards.groups) 
            ? cards.groups.flatMap(group => Array.isArray(group.cards) ? group.cards : [])
            : [];
    } else {
        // Regular array of cards
        flatCards = Array.isArray(cards) ? cards : [];
    }
    
    const isTrainingModule = flatCards.some(card => 
        card && card.title && ['YAI', 'CSR', 'IT', 'Shipping', 'PPC', 'Merchandising', 'Purchasing', 'General Affairs', 
         'Admin', 'HR', 'QA', 'Financial', 'CBSA', 'Sample', 'Technical', 'Raw Material Warehouse',
         'Cutting', 'SCC', 'Sewing', 'QC', 'Ironing', 'Packing', 'Washing', 'TPM', 'Warehouse',
         'IE', 'QA (Fabric)', 'Production', 'Online Training'].includes(card.title)
    );

    // Check if this is E-Government module
    const isEGovView = Array.isArray(cards) && cards.length > 0 && cards.some(card => card.url !== undefined);
    
    // Check if this is Accountant module (has isAccountant flag)
    const isAccountantView = Array.isArray(cards) && cards.length > 0 && cards.some(card => card.isAccountant === true);
    
    // Check if this is Purchase Request module (has isPurchaseRequest flag)
    const isPurchaseRequestView = Array.isArray(cards) && cards.length > 0 && cards.some(card => card.isPurchaseRequest === true);
    
    return (
        <div className={`flex flex-col items-center justify-center h-full min-h-[500px] animate-in fade-in zoom-in duration-300 ${isEGovView ? 'relative z-10' : ''}`}>
            <div className={`w-full max-w-4xl ${isGroupedStructure ? 'mb-4' : 'mb-8'} flex flex-col items-center gap-4`}>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className={`flex items-center text-white hover:text-cyan-400 gap-2 font-bold ${theme === 'normal' ? 'bg-slate-800/70' : 'bg-slate-800/50'} ${isGroupedStructure ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'} rounded-lg backdrop-blur-sm transition-colors`}
                    >
                        <ArrowLeft size={isGroupedStructure ? 16 : 20} /> Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                        title="Home"
                    >
                        <img 
                            src="/logo.jpg" 
                            alt="Home" 
                            className="w-full h-full object-cover"
                        />
                    </button>
                </div>
                <h2 className={`text-white font-bold uppercase tracking-wider drop-shadow-lg ${isGroupedStructure ? 'text-xl' : 'text-3xl'}`}>
                    {title}
                </h2>
            </div>
            {isGroupedStructure ? (
                // Grouped layout (for YQMS and FC) - Column layout (very compact, no big spaces)
                <div className="w-full max-w-[99vw] px-0.5">
                    <div className="flex gap-0 justify-center items-start">
                        {(cards.groups || []).map((group, groupIdx) => {
                            // Determine if First Output (sub-modules in 2 columns) - only for YQMS
                            const isFirstOutput = group.label === 'First Output ' || group.label === 'First Output';
                            // Calculate column width - First Output takes 2x width for 2-column grid, others take equal width
                            const columnWidth = isFirstOutput 
                                ? 'w-[calc(20%)] min-w-[260px]' 
                                : 'w-[calc(16.66%)] min-w-[130px]';
                            
                            return (
                                <div key={groupIdx} className={`${columnWidth} flex flex-col`}>
                                    {/* Big Label - Always visible at top with rounded pill shape */}
                                    <div className="text-center mb-0.5">
                                        <h3 className={`text-xs font-bold text-white uppercase tracking-tight drop-shadow-lg whitespace-nowrap ${theme === 'normal' ? 'bg-slate-700/80' : 'bg-slate-700/60'} backdrop-blur-sm px-3 py-1 rounded-full border border-slate-500/50 inline-block`}>
                                            {group.label}
                                        </h3>
                                    </div>
                                    {/* Cards - 2 columns for First Output, 1 column for others - Minimal spacing */}
                                    <div className={isFirstOutput 
                                        ? 'grid grid-cols-2 gap-0.5 justify-items-center' 
                                        : 'flex flex-col gap-0.5 items-center'
                                    }>
                                        {group.cards.map((card, idx) => {
                                            return renderCard(card, idx, navigate, moduleId, isTrainingModule, true, theme);
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : isAccountantView ? (
                // Accountant special layout: 3 cards top row, then 3 columns with TAX Reporting under TB Monthly Yearly
                <div className="w-full max-w-6xl px-4">
                    <div className="grid grid-cols-3 gap-6 justify-items-center">
                        {/* Top row: First 3 cards (Verify PR, Approval PR, Pay PR) */}
                        {cards.slice(0, 3).map((card, idx) => (
                            <div key={idx} className="w-full max-w-[280px]">
                                {renderCard(card, idx, navigate, moduleId, isTrainingModule, false, theme, true)}
                            </div>
                        ))}
                        
                        {/* Second row, Column 1: TB Monthly Yearly with TAX Reporting below */}
                        <div className="w-full max-w-[280px] flex flex-col gap-6">
                            {cards[3] && (
                                <div className="w-full">
                                    {renderCard(cards[3], 3, navigate, moduleId, isTrainingModule, false, theme, true)}
                                </div>
                            )}
                            {cards[6] && (
                                <div className="w-full">
                                    {renderCard(cards[6], 6, navigate, moduleId, isTrainingModule, false, theme, true)}

                                </div>
                            )}
                        </div>
                        
                        {/* Second row, Column 2: TOI */}
                        {cards[4] && (
                            <div className="w-full max-w-[280px]">
                                {renderCard(cards[4], 4, navigate, moduleId, isTrainingModule, false, theme, true)}
                            </div>
                        )}
                        
                        {/* Second row, Column 3: Factory Accounting */}
                        {cards[5] && (
                            <div className="w-full max-w-[280px]">
                                {renderCard(cards[5], 5, navigate, moduleId, isTrainingModule, false, theme, true)}
                            </div>
                        )}
                    </div>
                </div>
            ) : isPurchaseRequestView ? (
                // Purchase Request special layout: 2x3 grid (2 rows, 3 columns)
                <div className="w-full max-w-6xl px-4">
                    <div className="grid grid-cols-3 gap-6 justify-items-center">
                        {/* Top row: First 3 cards */}
                        {cards.slice(0, 3).map((card, idx) => (
                            <div key={idx} className="w-full max-w-[280px]">
                                {renderCard(card, idx, navigate, moduleId, isTrainingModule, false, theme, false, true)}
                            </div>
                        ))}
                        
                        {/* Bottom row: Last 3 cards */}
                        {cards.slice(3, 6).map((card, idx) => (
                            <div key={idx + 3} className="w-full max-w-[280px]">
                                {renderCard(card, idx + 3, navigate, moduleId, isTrainingModule, false, theme, false, true)}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Regular flat layout
                <div className="flex gap-8 flex-wrap justify-center">
                    {cards.map((card, idx) => renderCard(card, idx, navigate, moduleId, isTrainingModule, false, theme))}
                </div>
            )}
        </div>
    );
};

export default SubMenuView;


