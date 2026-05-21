import {
  Users,
  Calculator,
  Layout,
  Briefcase,
  Ticket,
  FileText,
  ShoppingBag,
  User,
  CheckSquare,
  Zap,
  Wind,
  Droplet,
  Globe,
  Mic,
  Trash2,
  Truck,
  AlertTriangle,
  Video,
  Factory,
  Box,
  Settings,
  Layers,
  Clock,
  Tag,
  ShoppingCart,
  UserCog,
  Receipt,
  FlaskConical,
  MonitorPlay,
  ClipboardCheck,
} from "lucide-react";

export const DASHBOARD_DATA = [
  {
    id: "admin-section",
    title: "Administration",
    color: "bg-slate-800/80",
    groups: [
      {
        id: "accountant-col",
        title: "Accountant",
        modules: [
          {
            id: "accountant-module",
            title: "Accountant",
            image: "assets/modules-image/new-icons-modules/accountant.png?v=1",
            status: "active",
            demoType: "SUBMENU_PR",
          },
          {
            id: "e-invoicing",
            title: "E-Invoicing",
            image: "assets/modules-image/new-icons-modules/E-Invoicing.png?v=1",
            status: "active",
            demoType: "SUBMENU_E_INVOICING",
          },
        ],
      },
      {
        id: "hr-col",
        title: "HR",
        modules: [
          {
            id: "yhr",
            title: "YHR",
            image: "assets/modules-image/new-icons-modules/YHR.png?v=1",
            status: "active",
            demoType: "SUBMENU_YHR",
          },
          {
            id: "org",
            title: "Org Chart",
            image: "assets/modules-image/new-icons-modules/Org-Chart.png?v=1",
            status: "active",
            demoType: "SUBMENU_ORG",
          },
          {
            id: "salary-bill",
            title: "Salary Bill",
            image: "assets/modules-image/new-icons-modules/Salary-Bill.png?v=1",
            status: "active",
            demoType: "SUBMENU_SALARY_BILL",
          },
          {
            id: "training",
            title: "Training",
            image: "assets/modules-image/new-icons-modules/Training.png?v=1",
            status: "active",
            demoType: "SUBMENU_DEPARTMENTS",
          },
          {
            id: "temp-work-request",
            title: "Temporary Worker Request",
            image: "assets/modules-image/new-icons-modules/Temp-Worker-Request.png?v=1",
            status: "active",
            demoType: "SUBMENU_TEMP_WORKER",
          },
          {
            id: "speak-up",
            title: "Speak Up",
            image: "assets/modules-image/new-icons-modules/Speak-Up.png?v=1",
            status: "active",
          },
        ],
      },
      {
        id: "admin-col",
        title: "Admin",
        modules: [
          {
            id: "ticket",
            title: "Support Ticket",
            image: "assets/modules-image/new-icons-modules/Support-Ticket.png?v=1",
            status: "active",
            demoType: "VIEW_TICKET_CUSTOM",
          },
          {
            id: "pr-admin",
            title: "Purchase Request",
            image: "assets/modules-image/new-icons-modules/Purchase-Request.png?v=1",
            status: "active",
            demoType: "SUBMENU_PR_ADMIN",
          },
          {
            id: "shop",
            title: "Y Shop",
            image: "assets/modules-image/new-icons-modules/Y-Shop.png?v=1",
            status: "active",
            demoType: "GRID_SHOP",
          },
          {
            id: "money-claim",
            title: "Money Claim",
            image: "assets/modules-image/new-icons-modules/Money-Claim.png?v=1", // Adding Money Claim
            status: "active",
          },
          {
            id: "gatepass",
            title: "Gate Pass",
            image: "assets/modules-image/new-icons-modules/Gatepass.png?v=1",
            status: "active",
            demoType: "SUBMENU_VISITOR",
          },
          {
            id: "meeting",
            title: "Meeting Room",
            image: "assets/modules-image/new-icons-modules/Meeting-Room.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          },
          {
            id: "car",
            title: "My Car Booking",
            image: "assets/modules-image/new-icons-modules/My-Car-Booking.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          },
          {
            id: "fire-alarm",
            title: "Fire Alarm",
            image: "assets/modules-image/new-icons-modules/Fire-Alarm.png?v=1",
            status: "active",
          },
          {
            id: "cctv",
            title: "CCTV",
            image: "assets/modules-image/new-icons-modules/cctv1.png?v=1",
            status: "active",
            demoType: "SUBMENU_CCTV",
          },
        ],
      },
      {
        id: "csr-col",
        title: "CSR",
        modules: [
          {
            id: "digital-audit",
            title: "Digital Audit",
            image: "assets/modules-image/new-icons-modules/Digital-Auditt.png?v=1",
            status: "active",
            demoType: "SUBMENU_DIGITAL_AUDIT",
          },
          {
            id: "energy",
            title: "Energy",
            image: "assets/modules-image/new-icons-modules/Energy.png?v=1",
            status: "active",
            demoType: "SUBMENU_ENERGY",
          },
          {
            id: "air",
            title: "Air",
            image: "assets/modules-image/new-icons-modules/Air.png?v=1",
            status: "active",
            demoType: "SUBMENU_AIR",
          },
          {
            id: "water",
            title: "Water",
            image: "assets/modules-image/new-icons-modules/Water.png?v=1",
            status: "active",
            demoType: "SUBMENU_WATER",
          },
          {
            id: "waste",
            title: "Waste",
            image: "assets/modules-image/new-icons-modules/Waste.png?v=1",
            status: "active",
            demoType: "SUBMENU_WASTE",
          },
          {
            id: "chemical",
            title: "Chemical",
            image: "assets/modules-image/new-icons-modules/Chemical.png?v=1",
            status: "active",
          },
        ],
      },
      {
        id: "shipping-col",
        title: "Shipping",
        modules: [
          {
            id: "shipping",
            title: "Shipping",
            image: "assets/modules-image/new-icons-modules/Shipping.png?v=1",
            status: "active",
            demoType: "SHIPPING_REQUEST",
          },
        ],
      },
      {
        id: "egov-col",
        title: "E-GOV",
        modules: [
          {
            id: "e-government",
            title: "E-GOVERNMENT",
            image: "assets/modules-image/new-icons-modules/E-Government.png?v=1",
            status: "active",
            demoType: "SUBMENU_EGOV",
          },
        ],
      },
    ],
  },
  {
    id: "management-section",
    title: "Management Dashboard",
    isCentral: true,
    color: "bg-slate-800/80",
    groups: [
      {
        id: "mgmt-main",
        title: "Noticeable",
        modules: [
          {
            id: "system-analysis",
            title: "System Analysis",
            image: "assets/modules-image/new-icons-modules/System-Analysis.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          },
        ],
      },
    ],
  },
  {
    id: "ops-section",
    title: "Operations",
    color: "bg-slate-800/80",
    groups: [
      {
        id: "qa-col",
        title: "QA",
        modules: [
          {
            id: "yqms",
            title: "YQMS",
            image: "assets/modules-image/new-icons-modules/YQMS.png?v=1",
            status: "active",
            demoType: "SUBMENU_YQMS",
          },
          {
            id: "call-out",
            title: "Call Out",
            image: "assets/modules-image/new-icons-modules/Call-Out.png?v=1",
            status: "active",
            highlight: true,
          },
        ],
      },
      {
        id: "prod-col",
        title: "Production",
        modules: [
          {
            id: "fc",
            title: "FC",
            image: "assets/modules-image/new-icons-modules/FC.png?v=1",
            status: "active",
            demoType: "SUBMENU_FC",
          },
          {
            id: "production-status",
            title: "Production Status",
            image: "assets/modules-image/new-icons-modules/Production-Status.png?v=1", // Adding Production Status
            status: "active",
          },
          {
            id: "ytm",
            title: "YTM",
            image: "assets/modules-image/new-icons-modules/ytm.png?v=1",
            status: "active",
          },
          {
            id: "ce",
            title: "CE",
            image: "assets/modules-image/new-icons-modules/CE.png?v=1",
            status: "active",
            demoType: "SUBMENU_CE",
          },
          {
            id: "ytm-shop",
            title: "YTM Shop",
            image: "assets/modules-image/new-icons-modules/ytm-shop.png?v=1",
            status: "active",
          },
          {
            id: "ypm",
            title: "YPM",
            image: "assets/modules-image/new-icons-modules/ypm.png?v=1", // Adding YPM
            status: "active",
          },
          {
            id: "pwip",
            title: "PWIP",
            image: "assets/modules-image/new-icons-modules/PWIP.png?v=1",
            status: "active",
          },
        ],
      },
      {
        id: "dtsync-col",
        title: "DT Sync",
        modules: [
          {
            title: "DT Sync",
            image: "assets/icons/dt-sync.png?v=1",
            status: "coming-soon",
          },
          {
            title: "Master Plan",
            image: "assets/icons/master-plan.png?v=1",
            status: "coming-soon",
          },
          {
            title: "Line Plan",
            image: "assets/icons/line-plan.png?v=1",
            status: "coming-soon",
          },
          {
            title: "TNA",
            image: "assets/icons/tna.png?v=1", // Adding TNA
            status: "coming-soon",
          },
        ],
      },
      {
        id: "prepro-col",
        title: "PRE PRO",
        modules: [
          {
            title: "TEC PACK",
            image: "assets/icons/tec-pack.png?v=1",
            status: "coming-soon",
          },
          {
            title: "PPS",
            image: "assets/icons/pps.png?v=1",
            status: "coming-soon",
          },
          {
            title: "PPM",
            image: "assets/icons/ppm.png?v=1",
            status: "coming-soon",
          },
          {
            title: "Sample",
            image: "assets/icons/sample-garment.png?v=1",
            status: "coming-soon",
          },
        ],
      },
      {
        id: "prodmat-col",
        title: "Production Materials",
        modules: [
          {
            title: "Material Purchase",
            image: "assets/icons/material-purchase.png?v=1",
            status: "coming-soon",
          },
          {
            title: "SC",
            image: "assets/icons/sc.png?v=1", // Adding SC
            status: "coming-soon",
          },
        ],
      },
    ],
  },
];
