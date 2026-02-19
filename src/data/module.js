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
        id: "assessment",
        title: "Accountant", // New Column from image
        modules: [
          // Added 'id' to identify this specific module for the click action
          {
            id: "pr-module",
            title: "Accountant",
            image: "assets/modules-image/new-icons-modules/accountant.png?v=1",
            status: "active",
            color: "text-green-600",
            demoType: "SUBMENU_PR",
          },
          {
            id: "e-invoicing",
            title: "E-Invoicing",
            image: "assets/modules-image/new-icons-modules/E-Invoicing.png?v=1",
            status: "active",
            color: "text-green-500",
            demoType: "SUBMENU_E_INVOICING",
          },
        ],
      },
      {
        id: "hr",
        title: "ADMIN",
        modules: [
          {
            id: "pr-admin",
            title: "Purchase Request",
            image:
              "assets/modules-image/new-icons-modules/Purchase-Request.png?v=1",
            status: "active",
            demoType: "SUBMENU_PR_ADMIN",
          },
          {
            id: "shop",
            title: "Y Shop",
            image: "assets/modules-image/new-icons-modules/Y-Shop.png?v=1",
            status: "active",
            sub: "Stationery",
            demoType: "GRID_SHOP",
          },
          {
            id: "ticket",
            title: "Support Ticket",
            image:
              "assets/modules-image/new-icons-modules/Support-Ticket.png?v=1",
            status: "active",
            demoType: "VIEW_TICKET_CUSTOM",
          },
          {
            title: "Bill Record",
            image: "assets/modules-image/new-icons-modules/Bill-Record.png?v=1",
            status: "active",
          }, // New Module
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
            image:
              "assets/modules-image/new-icons-modules/Meeting-Room.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          },
          {
            id: "car",
            title: "My Car Booking",
            image:
              "assets/modules-image/new-icons-modules/My-Car-Booking.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          },
          {
            title: "Fire Alarm",
            image: "assets/modules-image/new-icons-modules/Fire-Alarm.png?v=1",
            status: "active",
          },
          {
            id: "cctv",
            title: "CCTV",
            image: "assets/modules-image/new-icons-modules/cctv1.png?v=1",
            status: "active",
            highlight: true,
            demoType: "SUBMENU_CCTV",
          },
        ],
      },
      {
        id: "admin",
        title: "HR",
        modules: [
          {
            id: "yhr",
            title: "YHR",
            image: "assets/modules-image/new-icons-modules/YHR.png?v=1",
            status: "active",
            color: "text-blue-500",
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
            id: "training",
            title: "Training",
            image: "assets/modules-image/new-icons-modules/Training.png?v=1",
            status: "active",
            demoType: "SUBMENU_DEPARTMENTS",
          }, // Corrected ID
          {
            id: "temp-work-request",
            title: "Temp Work Request",
            image:
              "assets/modules-image/new-icons-modules/Temp-Worker-Request.png?v=1",
            status: "active",
            demoType: "SUBMENU_TEMP_WORKER",
          }, // New Module
          {
            title: "Speak Up",
            image: "assets/modules-image/new-icons-modules/Speak-Up.png?v=1",
            status: "active",
          },
        ],
      },
      {
        id: "csr",
        title: "CSR",
        modules: [
          {
            id: "digital-audit",
            title: "Digital Audit",
            image:
              "assets/modules-image/new-icons-modules/Digital-Auditt.png?v=1",
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
            title: "Chemical",
            image: "assets/modules-image/new-icons-modules/Chemical.png?v=1",
            status: "active",
          }, // New Module
        ],
      },
      {
        id: "egov",
        title: "E-GOV",
        modules: [
          {
            id: "e-government",
            title: "E-GOVERNMENT",
            image:
              "assets/modules-image/new-icons-modules/E-Government.png?v=1",
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
        title: "", // No sub-label needed for this single column
        modules: [
          {
            id: "system-analysis",
            title: "System Analysis",
            image:
              "assets/modules-image/new-icons-modules/System-Analysis.png?v=1",
            status: "active",
            demoType: "IMAGE_VIEW",
          }, // New Module
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
        id: "qa",
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
        id: "internal-logistics",
        title: "Internal Logistics",
        modules: [
          {
            id: "fc",
            title: "FC",
            image: "assets/modules-image/new-icons-modules/FC.png?v=1",
            status: "active",
            demoType: "SUBMENU_FC",
          },
          {
            id: "pwip",
            title: "PWIP",
            image: "assets/modules-image/new-icons-modules/PWIP.png?v=1",
            status: "active",
            highlight: true,
            galleryImages: [
              "assets/pwip/pwip1.jpg",
              "assets/pwip/pwip2.jpg",
              "assets/pwip/pwip3.jpg",
            ],
          },
          {
            id: "kanban",
            title: "KANBAN",
            image: "assets/modules-image/new-icons-modules/KANBAN.png?v=1",
            status: "active",
            highlight: true,
          },
        ],
      },
      {
        id: "prod",
        title: "Production",
        modules: [
          {
            id: "ce",
            title: "CE",
            image: "assets/modules-image/new-icons-modules/CE.png?v=1",
            status: "active",
            highlight: true,
            demoType: "SUBMENU_CE",
          },
          {
            title: "YTPM",
            image: "assets/modules-image/new-icons-modules/ytm.png?v=1",
            status: "active",
          },
          {
            title: "YTM Shop",
            image: "assets/modules-image/new-icons-modules/ytm-shop.png?v=1",
            status: "active",
          },
        ],
      },
      {
        id: "dtsync",
        title: "",
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
            title: "PPM",
            image: "assets/icons/ppm.png?v=1",
            status: "coming-soon",
          },
          // { title: 'TNA', image: 'assets/icons/tna.png', status: 'coming-soon' },
        ],
      },
      {
        id: "prepro",
        title: "",
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
            title: "Sample",
            image: "assets/icons/sample-garment.png?v=1",
            status: "coming-soon",
          },
          { title: "", image: "", status: "coming-soon" },
        ],
      },
      {
        id: "prodmat",
        title: "",
        modules: [
          {
            title: "Material Purchase",
            image: "assets/icons/material-purchase.png?v=1",
            status: "coming-soon",
          },
          { title: "", image: "", status: "coming-soon" },
          { title: "", image: "", status: "coming-soon" },
          { title: "", image: "", status: "coming-soon" },
        ],
      },
    ],
  },
];
