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
          { id: 'pr-module', title: 'Purchase Request', icon: FileText, status: 'active', color: 'text-green-600', demoType: 'SUBMENU_PR' },
          { title: 'E-Invoicing', icon: Receipt, status: 'active', logo: true, color: 'text-green-500' },
        ]
      },
      {
        id: 'hr',
        title: 'HR',
        modules: [
          { id: 'yhr', title: 'YHR', icon: Users, status: 'active', color: 'text-blue-500', demoType: 'SUBMENU_YHR' },
          { title: 'Salary Bill', icon: Calculator, status: 'coming-soon' },
          { id: 'org', title: 'Org Chart', icon: Layout, status: 'active', demoType: 'SUBMENU_ORG' },
          { id: 'training', title: 'Training', icon: Briefcase, status: 'active', demoType: 'SUBMENU_DEPARTMENTS' },
          { title: 'Temp Work Request', icon: UserCog, status: 'active' }, // New Module
          { title: 'Speak Up', icon: Mic, status: 'active', logo: true },
        ]
      },
      {
        id: 'admin',
        title: 'Admin',
        modules: [
          { id: 'ticket', title: 'Support Ticket', icon: Ticket, status: 'active', demoType: 'VIEW_TICKET_CUSTOM' },
          { id: 'pr-admin', title: 'Purchase Request', icon: FileText, status: 'active', demoType: 'SUBMENU_PR_ADMIN' }, // Note: duplicate name, different column
          { id: 'shop', title: 'Y Shop', icon: ShoppingBag, status: 'active', sub: 'Stationery', demoType: 'GRID_SHOP' },
          { title: 'Bill Verify', icon: Receipt, status: 'active' }, // New Module
          { id: 'gatepass', title: 'Gate Pass', icon: User, status: 'active', demoType: 'SUBMENU_VISITOR' },
          { id: 'meeting', title: 'Meeting Room', icon: Users, status: 'active', demoType: 'TIMELINE_MEETING' },
          { id: 'car', title: 'My Car Booking', icon: Truck, status: 'active', demoType: 'TABLE_CAR' },
          { title: 'Fire Alarm', icon: AlertTriangle, status: 'coming-soon' },
          { title: 'CCTV', icon: Video, status: 'active', highlight: true },
        ]
      },
      {
        id: 'csr',
        title: 'CSR',
        modules: [
          { id: 'digital-audit', title: 'Digital Audit', icon: CheckSquare, status: 'active', demoType: 'SUBMENU_DIGITAL_AUDIT' },
          { id: 'energy', title: 'Energy', icon: Zap, status: 'active', demoType: 'SUBMENU_ENERGY' },
          { id: 'air', title: 'Air', icon: Wind, status: 'active', demoType: 'GRID_SENSORS' },
          { title: 'Water', icon: Droplet, status: 'active' },
          { id: 'waste', title: 'Waste', icon: Trash2, status: 'active', demoType: 'DASH_WASTE' },
          { title: 'Chemical', icon: FlaskConical, status: 'coming-soon' }, // New Module
        ]
      },
      {
        id: 'egov',
        title: 'E-GOV',
        modules: [
          { title: 'E-GOVERNMENT', icon: Globe, status: 'coming-soon' },
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
                { id: 'system-analysis', title: 'System Analysis', icon: MonitorPlay, status: 'active', demoType: 'VIEW_SYSTEM_ANALYSIS' } // New Module
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
          { title: 'YQMS', icon: ClipboardCheck, status: 'active', logo: true }, // New Module
          { title: 'FC', icon: Factory, status: 'coming-soon' },
        ]
      },
      {
        id: 'prod',
        title: 'Production',
        modules: [
          { title: 'Traffic Light', icon: AlertTriangle, status: 'active', highlight: true },
          { title: 'YTM', icon: Factory, status: 'active' },
          { title: 'CE', icon: Box, status: 'active', highlight: true },
          { title: 'YTM Shop', icon: Settings, status: 'active' },
        ]
      },
      {
        id: 'dtsync',
        title: 'DT Sync',
        modules: [
          { title: 'DT Sync', icon: Layers, status: 'coming-soon' },
          { title: 'Master Plan', icon: FileText, status: 'coming-soon' },
          { title: 'Line Plan', icon: Layout, status: 'coming-soon' },
          { title: 'PPM', icon: FileText, status: 'coming-soon' },
          { title: 'TNA', icon: Clock, status: 'coming-soon' },
        ]
      },
      {
        id: 'prepro',
        title: 'PRE PRO',
        modules: [
          { title: 'TEC PACK', icon: Box, status: 'coming-soon' },
          { title: 'PPS', icon: FileText, status: 'coming-soon' },
          { title: 'Sample', icon: Tag, status: 'coming-soon' },
        ]
      },
      {
        id: 'prodmat',
        title: 'Production Materials',
        modules: [
          { title: 'Material Purchase', icon: ShoppingCart, status: 'coming-soon' },
        ]
      }
    ]
  }
];