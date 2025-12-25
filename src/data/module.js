import {
  Users, Calculator, Layout, Briefcase, Ticket, FileText, ShoppingBag,
  User, CheckSquare, Zap, Wind, Droplet, Globe, Mic, Trash2,
  Truck, AlertTriangle, Video, Factory, Box, Settings, Layers,
  Clock, Tag, ShoppingCart, UserCog, Receipt, FlaskConical, MonitorPlay,
  ClipboardCheck
} from 'lucide-react';

export const DASHBOARD_DATA = [
  {
    id: 'admin-section',
    title: 'Administration',
    color: 'bg-slate-800/80',
    groups: [
      {
        id: 'assessment',
        title: 'Accountant', // New Column from image
        modules: [
          // Added 'id' to identify this specific module for the click action
          { id: 'pr-module', title: 'Purchase Request', image: 'assets/icons/purchase-request.png', status: 'active', color: 'text-green-600', demoType: 'SUBMENU_PR' },
          { id: 'e-invoicing', title: 'E-Invoicing', image: 'assets/icons/e-invoicing.png', status: 'active', color: 'text-green-500', demoType: 'SUBMENU_E_INVOICING' },
        ]
      },
      {
        id: 'hr',
        title: 'HR',
        modules: [
          { id: 'yhr', title: 'YHR', image: 'assets/icons/yhr.png', status: 'active', color: 'text-blue-500', demoType: 'SUBMENU_YHR' },
          { title: 'Salary Bill', image: 'assets/icons/salary-bill.png', status: 'active' },
          { id: 'org', title: 'Org Chart', image: 'assets/icons/org-chart.png', status: 'active', demoType: 'SUBMENU_ORG' },
          { id: 'training', title: 'Training', image: 'assets/icons/training.png', status: 'active', demoType: 'SUBMENU_DEPARTMENTS' }, // Corrected ID
          { id: 'temp-work-request', title: 'Temp Work Request', image: 'assets/icons/temp-work-request.png', status: 'active', demoType: 'SUBMENU_TEMP_WORKER' }, // New Module
          { title: 'Speak Up', image: 'assets/icons/speak-up.png', status: 'active' },
        ]
      },
      {
        id: 'admin',
        title: 'Admin',
        modules: [
          { id: 'ticket', title: 'Support Ticket', image: 'assets/icons/support-ticket.png', status: 'active', demoType: 'VIEW_TICKET_CUSTOM' },
          { id: 'pr-admin', title: 'Purchase Request', image: 'assets/icons/purchase-request.png', status: 'active', demoType: 'SUBMENU_PR_ADMIN' },
          { id: 'shop', title: 'Y Shop', image: 'assets/icons/y-shop.png', status: 'active', sub: 'Stationery', demoType: 'GRID_SHOP' },
          { title: 'Bill Record', image: 'assets/icons/bill-verify.png', status: 'active' }, // New Module
          { id: 'gatepass', title: 'Gate Pass', image: 'assets/icons/gatepass.png', status: 'active', demoType: 'SUBMENU_VISITOR' },
          { id: 'meeting', title: 'Meeting Room', image: 'assets/icons/meeting-room.png', status: 'active', demoType: 'IMAGE_VIEW' },
          { id: 'car', title: 'My Car Booking', image: 'assets/icons/my-car-booking.png', status: 'active', demoType: 'IMAGE_VIEW' },
          { title: 'Fire Alarm', image: 'assets/icons/fire-alarm.png', status: 'active' },
          { id: 'cctv', title: 'CCTV', image: 'assets/icons/cctv.png', status: 'active', highlight: true, demoType: 'SUBMENU_CCTV' },
        ]
      },
      {
        id: 'csr',
        title: 'CSR',
        modules: [
          { id: 'digital-audit', title: 'Digital Audit', image: 'assets/icons/digital-audit.png', status: 'active', demoType: 'SUBMENU_DIGITAL_AUDIT' },
          { id: 'energy', title: 'Energy', image: 'assets/icons/energy.png', status: 'active', demoType: 'SUBMENU_ENERGY' },
          { id: 'air', title: 'Air', image: 'assets/icons/air.png', status: 'active', demoType: 'SUBMENU_AIR' },
          { id: 'water', title: 'Water', image: 'assets/icons/water.png', status: 'active', demoType: 'SUBMENU_WATER' },
          { id: 'waste', title: 'Waste', image: 'assets/icons/waste.png', status: 'active', demoType: 'SUBMENU_WASTE' },
          { title: 'Chemical', image: 'assets/icons/chemical.png', status: 'active' }, // New Module
        ]
      },
      {
        id: 'egov',
        title: 'E-GOV',
        modules: [
          { title: 'E-GOVERNMENT', image: 'assets/icons/e-government.png', status: 'active' },
        ]
      }
    ]
  },
  {
    id: 'management-section',
    title: 'Management Dashboard',
    isCentral: true,
    color: 'bg-slate-800/80',
    groups: [
        {
            id: 'mgmt-main',
            title: '', // No sub-label needed for this single column
            modules: [
                { id: 'system-analysis', title: 'System Analysis', image: 'assets/icons/system-analysis.png', status: 'active', demoType: 'IMAGE_VIEW' } // New Module
            ]
        }
    ]
  },
  {
    id: 'ops-section',
    title: 'Operations',
    color: 'bg-slate-800/80',
    groups: [
      {
        id: 'qa',
        title: 'QA',
        modules: [
          { title: 'YQMS', image: 'assets/icons/yqms.png', status: 'active' }, // New Module
          { title: 'FC', image: 'assets/icons/fc.png', status: 'active' },
        ]
      },
      {
        id: 'prod',
        title: 'Production',
        modules: [
          { title: 'Traffic Light', image: 'assets/icons/traffic-light.png', status: 'active', highlight: true },
          { title: 'YTM', image: 'assets/icons/ytm.png', status: 'active' },
          { title: 'CE', image: 'assets/icons/ce.png', status: 'active', highlight: true },
          { title: 'YTM Shop', image: 'assets/icons/ytm-shop.png', status: 'active' },
        ]
      },
      {
        id: 'dtsync',
        title: 'DT Sync',
        modules: [
          { title: 'DT Sync', image: 'assets/icons/dt-sync.png', status: 'active' },
          { title: 'Master Plan', image: 'assets/icons/master-plan.png', status: 'active' },
          { title: 'Line Plan', image: 'assets/icons/line-plan.png', status: 'active' },
          { title: 'PPM', image: 'assets/icons/ppm.png', status: 'active' },
          { title: 'TNA', image: 'assets/icons/tna.png', status: 'active' },
        ]
      },
      {
        id: 'prepro',
        title: 'PRE PRO',
        modules: [
          { title: 'TEC PACK', image: 'assets/icons/tec-pack.png', status: 'active' },
          { title: 'PPS', image: 'assets/icons/pps.png', status: 'active' },
          { title: 'Sample', image: 'assets/icons/sample-garment.png', status: 'active' },
        ]
      },
      {
        id: 'prodmat',
        title: 'Production Materials',
        modules: [
          { title: 'Material Purchase', image: 'assets/icons/material-purchase.png', status: 'active' },
        ]
      }
    ]
  }
];