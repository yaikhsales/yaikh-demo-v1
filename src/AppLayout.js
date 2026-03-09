import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Search,
  Database,
  ChevronRight,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import Header from "./components/Header";
import SectionContainer from "./components/SectionContainer";
import { DASHBOARD_DATA } from "./data/module";
import YaiDataBot from "./chatbot/YaiDataBot";
import DragonAnimation from "./components/DragonAnimation";
import { ThemeBackground } from "./thems";

import GMChat from "./chatbot/GMChat";
import GeneralAIAgent from "./general-ag";

// A new layout component to hold the shared UI (Header, Background)
const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isGMChatOpen, setGMChatOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isYaiDataBotOpen, setYaiDataBotOpen] = useState(false);
  const [isGeneralAIAgentOpen, setGeneralAIAgentOpen] = useState(false);
  const [yaiVersion, setYaiVersion] = useState("yai1"); // 'yai1' or 'yai2'
  const [botModuleContext, setBotModuleContext] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLightOn, setIsLightOn] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [showDragon, setShowDragon] = useState(false);
  const [dragonMode, setDragonMode] = useState("initial");
  const yaiDataButtonRef = useRef(null);
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] =
    useState(false);

  const openBotForModule = (module) => {
    setBotModuleContext(module);
    setYaiDataBotOpen(true);
  };

  // Handle initial dragon animation on page load - DISABLED
  // useEffect(() => {
  //     if (location.pathname === '/' && !hasPlayedInitialAnimation) {
  //         // Wait a bit for page to load, then start dragon animation
  //         const timer = setTimeout(() => {
  //             setShowDragon(true);
  //             setDragonMode('initial');
  //             setHasPlayedInitialAnimation(true);
  //         }, 500);
  //         return () => clearTimeout(timer);
  //     }
  // }, [location.pathname, hasPlayedInitialAnimation]);

  // Handle left arrow key for back navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && !showDragon) {
        // If Yai Data Bot is open, close it directly (skip missile animation)
        if (isYaiDataBotOpen) {
          setYaiDataBotOpen(false);
        }
        // If on a module page (not home page), navigate back
        else if (location.pathname !== "/") {
          navigate(-1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isYaiDataBotOpen, showDragon, location.pathname, navigate]);

  const handleDragonComplete = () => {
    setShowDragon(false);
  };

  const handleDragonFireComplete = () => {
    // No longer needed - missile just stops and exits
  };

  const handleModuleClick = (module) => {
    if (module.demoType) {
      const { demoType, id, title } = module;
      if (id === "meeting" && title === "Meeting Room") {
        navigate("/dashboard/meeting-room");
      } else if (id === "car" && title === "My Car Booking") {
        navigate("/dashboard/car-booking");
      } else if (id === "system-analysis" && title === "System Analysis") {
        navigate("/dashboard/system-analysis");
      } else if (demoType === "IMAGE_VIEW")
        navigate(`/dashboard/image/${module.image}`);
      else if (demoType === "VIEW_SYSTEM_ANALYSIS")
        navigate(`/dashboard/${id}`);
      else if (demoType === "SUBMENU_YHR") {
        // Navigate directly to YHR component
        navigate("/dashboard/yhr");
      } else if (demoType === "SUBMENU_SALARY_BILL") {
        // Navigate directly to Salary Bill component
        navigate("/dashboard/salary-bill");
      } else if (demoType === "SUBMENU_WATER") {
        // Navigate directly to Water component
        navigate("/dashboard/water");
      } else if (demoType === "SUBMENU_CE") {
        // Navigate directly to CE component
        navigate("/dashboard/ce");
      } else if (demoType?.startsWith("SUBMENU")) {
        const cards =
          id === "digital-audit"
            ? [
              {
                title: "Audit Plan",
                icon: "Layout",
                color: "bg-indigo-500 text-white",
              },
              {
                title: "Compliance Certificate",
                icon: "FileCheck",
                color: "bg-emerald-500 text-white",
              },
              {
                title: "Digital Audit",
                icon: "MonitorPlay",
                color: "bg-blue-500 text-white",
              },
              {
                title: "Checklist 6s",
                icon: "CheckSquare",
                color: "bg-cyan-500 text-white",
              },
            ]
            : id === "pr-admin"
              ? [
                {
                  title: "Purchase Request",
                  icon: "FileText",
                  color: "bg-yellow-500 text-black",
                  action: "/dashboard/purchase-requisition-form",
                  isPurchaseRequest: true,
                },
                {
                  title: "Show Lists Request",
                  icon: "Layout",
                  color: "bg-sky-400 text-black",
                  image: "assets/icons/sub-icons/show-list-request.png",
                  isPurchaseRequest: true,
                },
                {
                  title: "Master List",
                  icon: "FileCheck",
                  color: "bg-blue-500 text-white",
                  image: "assets/icons/sub-icons/master-list.jpg",
                  isPurchaseRequest: true,
                },
                {
                  title: "Purchaser Workspace",
                  icon: "Briefcase",
                  color: "bg-green-500 text-white",
                  image: "assets/icons/sub-icons/purchaser-workspace.png",
                  isPurchaseRequest: true,
                },
                {
                  title: "My Confirm Received",
                  icon: "CheckCircle",
                  color: "bg-orange-500 text-white",
                  image: "assets/icons/sub-icons/my-confirm-recieved.png",
                  isPurchaseRequest: true,
                },
                {
                  title: "Documents Joiner",
                  icon: "Plus",
                  color: "bg-red-500 text-white",
                  image: "assets/icons/sub-icons/document-joiner.png",
                  isPurchaseRequest: true,
                },
              ]
              : demoType === "SUBMENU_PR"
                ? [
                  {
                    title: "Verify PR",
                    icon: "CheckCircle",
                    color: "bg-yellow-400 text-black",
                    image: "assets/icons/sub-icons/verify-image.png",
                    isAccountant: true,
                  },
                  {
                    title: "Approval PR",
                    icon: "FileCheck",
                    color: "bg-blue-500 text-white",
                    image: "assets/icons/sub-icons/approval_images.png",
                    isAccountant: true,
                  },
                  {
                    title: "Pay PR",
                    icon: "Banknote",
                    color: "bg-orange-500 text-white",
                    image: "assets/icons/sub-icons/pay-pr.png",
                    isAccountant: true,
                  },
                  {
                    title: "TB Monthly Yearly",
                    icon: "BarChart3",
                    color: "bg-blue-500 text-white",
                    image: "https://ym.yaikh.com/IMG/dashboard.png",
                    isAccountant: true,
                  },
                  {
                    title: "TOI",
                    icon: "Globe",
                    color: "bg-green-600 text-white",
                    image: "https://ym.yaikh.com/IMG/global-connection.png",
                    isAccountant: true,
                  },
                  {
                    title: "Factory Accounting",
                    icon: "Calculator",
                    color: "bg-purple-500 text-white",
                    image: "modules-image/factory-account.png",
                    isAccountant: true,
                  },
                  {
                    title: "TAX Reporting",
                    icon: "FileText",
                    color: "bg-purple-400 text-white",
                    image: "modules-image/tax-reporting.png",
                    isAccountant: true,
                  },
                ]
                : id === "gatepass"
                  ? [
                    {
                      title: "Gate Pass",
                      icon: "Ticket",
                      color: "bg-blue-500 text-white",
                      action: "/dashboard/gatepass",
                    },
                    {
                      title: "Gate In/Out Records",
                      icon: "BookOpen",
                      color: "bg-sky-500 text-white",
                    },
                    {
                      title: "Motorcycle Records",
                      icon: "Bike",
                      color: "bg-orange-500 text-white",
                    },
                    {
                      title: "Car Plate Records",
                      icon: "Car",
                      color: "bg-red-500 text-white",
                    },
                    {
                      title: "Truck Records",
                      icon: "Truck",
                      color: "bg-white text-blue-600",
                    },
                    {
                      title: "Walk In/Out",
                      icon: "Users",
                      color: "bg-teal-500 text-white",
                    },
                    {
                      title: "Visitor Record",
                      icon: "FileCheck",
                      color: "bg-indigo-500 text-white",
                      action: "/dashboard/gatepass/visitor",
                    },
                    {
                      title: "12K YM Tuk Tuk",
                      icon: "tuktuk",
                      color: "bg-lime-500 text-white",
                    },
                  ]
                  : demoType === "SUBMENU_ORG"
                    ? [
                      // Org Chart
                      {
                        title: "Master Organization Chart",
                        icon: "LayoutDashboard",
                        color: "bg-purple-500 text-white",
                        action: "/dashboard/org-chart-master",
                      },
                      {
                        title: "Custom Organization Chart",
                        icon: "Settings2",
                        color: "bg-indigo-500 text-white",
                        action: "/dashboard/org-chart-master",
                      },
                      {
                        title: "Leader/Worker Sections",
                        icon: "Users",
                        color: "bg-sky-500 text-white",
                        action: "/dashboard/org-chart-master",
                      },
                    ]
                    : id === "cctv"
                      ? [
                        {
                          title: "Face Scan Logs",
                          icon: "BookOpen",
                          color: "bg-sky-500 text-white",
                          action: "/dashboard/cctv/face-scan",
                        },
                        {
                          title: "My Face Scan",
                          icon: "Scan",
                          color: "bg-teal-500 text-white",
                          action: "/dashboard/cctv/my-face-scan",
                        },
                      ]
                      : demoType === "SUBMENU_ENERGY"
                        ? [
                          {
                            title: "Meters",
                            icon: "GaugeCircle",
                            color: "bg-orange-500 text-white",
                            action: "/dashboard/energy/meters",
                          },
                          {
                            title: "Solar Dashboard",
                            icon: "Sun",
                            color: "bg-yellow-500 text-white",
                            action: "/dashboard/energy/meters",
                          },
                          {
                            title: "Switch Board Ampere Load Monitoring",
                            icon: "Activity",
                            color: "bg-red-500 text-white",
                            action: "/dashboard/energy/switch-board",
                          },
                          {
                            title: "Energy Source",
                            icon: "Power",
                            color: "bg-green-500 text-white",
                            action: "/dashboard/energy/meters",
                          },
                        ]
                        : demoType === "SUBMENU_WASTE"
                          ? [
                            {
                              title: "Waste",
                              icon: "Trash2",
                              color: "bg-purple-500 text-white",
                              action: "/dashboard/waste/analytics",
                            },
                            {
                              title: "Boiler",
                              icon: "Flame",
                              color: "bg-orange-500 text-white",
                              action: "/dashboard/waste/boiler",
                            },
                          ]
                          : demoType === "SUBMENU_AIR"
                            ? [
                              {
                                title: "Temperature Humidity Sensor",
                                icon: "Thermometer",
                                color: "bg-red-500 text-white",
                                action: "/dashboard/air/temperature",
                              },
                              {
                                title: "Switch (Fan & Pump)",
                                icon: "ToggleRight",
                                color: "bg-white text-blue-600",
                              },
                              {
                                title: "Air Quality Detector",
                                icon: "Wind",
                                color: "bg-sky-500 text-white",
                                action: "/dashboard/air/quality",
                              },
                            ]
                            : demoType === "SUBMENU_WATER"
                              ? [
                                {
                                  title: "In",
                                  image: "assets/icons/sub-icons/water.jpg",
                                  color: "bg-sky-500 text-white",
                                  action: "/dashboard/water/in",
                                },
                                {
                                  title: "Out",
                                  image: "assets/icons/sub-icons/water.jpg",
                                  color: "bg-orange-500 text-white",
                                  action: "/dashboard/water/out",
                                },
                              ]
                              : demoType === "SUBMENU_TEMP_WORKER"
                                ? [
                                  {
                                    title: "Request Worker Form",
                                    icon: "FileText",
                                    color: "bg-blue-500 text-white",
                                    action:
                                      "/dashboard/temp-worker-request/form",
                                  },
                                  {
                                    title: "Request Worker List",
                                    icon: "Layout",
                                    color: "bg-green-500 text-white",
                                    action:
                                      "/dashboard/temp-worker-request/list",
                                  },
                                ]
                                : demoType === "SUBMENU_E_INVOICING"
                                  ? [
                                    {
                                      title: "Cambodia E Invoice",
                                      icon: "Banknote",
                                      color: "bg-emerald-500 text-white",
                                    },
                                    {
                                      title: "Supplier Management",
                                      icon: "Briefcase",
                                      color: "bg-sky-500 text-white",
                                    },
                                    {
                                      title: "IEWS",
                                      icon: "Layers",
                                      color: "bg-indigo-500 text-white",
                                    },
                                  ]
                                  : demoType === "SUBMENU_YQMS"
                                    ? {
                                      grouped: true,
                                      groups: [
                                        {
                                          label: "Pre Production",
                                          cards: [
                                            {
                                              title: "QC File",
                                              icon: "FileText",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qc-file.jpg",
                                              action: "/dashboard/yqms/qc-file",
                                            },
                                            {
                                              title: "Pre Production Meeting",
                                              icon: "Users",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/pre-production-meeting.jpg",
                                              action: "/dashboard/yqms/pre-production-meeting",
                                            },
                                          ],
                                        },
                                        {
                                          label: "Cut",
                                          cards: [
                                            {
                                              title: "Cutting Inspection",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/cutting-inspection.jpg",
                                            },
                                            {
                                              title: "QA Cutting",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qa-cutting.jpg",
                                            },
                                            {
                                              title: "First Output Cutting",
                                              icon: "Scissors",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/first-output-cutting.jpg",
                                            },
                                            {
                                              title: "Cutting Panel Inspection",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/cut-panel-inspection.jpg",
                                            },
                                            {
                                              title: "Printing Inspection",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/printing-inspection.jpg",
                                            },
                                            {
                                              title: "Embroidery Inspection",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/embroidery-inspection.jpg",
                                            },
                                          ],
                                        },
                                        {
                                          label: "First Output ",
                                          cards: [
                                            {
                                              title:
                                                "First Output Printing Embroidery",
                                              icon: "PenTool",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/first-output-printing-embroidery.jpg",
                                            },
                                            {
                                              title: "First Output Sewing",
                                              icon: "PenTool",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/first-output-sewing.jpg",
                                            },
                                            {
                                              title: "QA Printing Embroidery",
                                              icon: "Search",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qa-printing-embroidery.jpg",
                                            },
                                            {
                                              title: "QA 20pcs Audit",
                                              icon: "ClipboardCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qa-20pcs-audit.jpg",
                                            },
                                            {
                                              title: "Inline Audit Rolling",
                                              icon: "FileCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/inline-audit-rolling.jpg",
                                            },
                                            {
                                              title: "Offline Audit",
                                              icon: "FileCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/offline-audit.jpg",
                                            },
                                            {
                                              title: "QC End Line Checking",
                                              icon: "CheckCircle",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qc-end-line-checking.jpg",
                                            },
                                          ],
                                        },
                                        {
                                          label: "IQC",
                                          cards: [
                                            {
                                              title: "Internal Rolling QC",
                                              icon: "FileCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/internal-rolling-qc.jpg",
                                              galleryImages: [
                                                "assets/yqms/internal-rolling-qc/internal-qc-rolling.png",
                                              ],
                                            },
                                          ],
                                        },

                                        {
                                          label: "Sew",
                                          cards: [
                                            {
                                              title: "Garment Check Output",
                                              icon: "CheckCircle",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/garment-check-output.jpg",
                                            },
                                          ],
                                        },
                                        {
                                          label: "Pack",
                                          cards: [
                                            {
                                              title: "Finishing Inspection",
                                              icon: "ClipboardCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/finishing-inspection.jpg",
                                            },
                                            {
                                              title: "Ironing Inspection",
                                              icon: "Thermometer",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/ironing-inspection.jpg",
                                              galleryImages: [
                                                "assets/yqms/irroning-inspection/irroning.png",
                                              ],
                                            },
                                            {
                                              title: "Packing Inspection",
                                              icon: "PackageCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/fc/packing-inspection.jpg",
                                            },
                                          ],
                                        },
                                        {
                                          label: "Inspection",
                                          cards: [
                                            {
                                              title: "Fin Check",
                                              icon: "ClipboardCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/fincheck-icon.svg",
                                              action: "/dashboard/yqms/fin-check",
                                            },
                                            {
                                              title: "Pre Final Inspection",
                                              icon: "Eye",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/pre-final-inspection-icon.svg",
                                            },
                                            {
                                              title: "Final Inspection",
                                              icon: "Eye",
                                              color: "bg-white text-blue-600",
                                              image: "assets/yqms/final-inspection-icon.svg",
                                            },
                                            {
                                              title: "Buyer Final Inspection",
                                              icon: "Eye",
                                              color: "bg-white text-blue-600",
                                              image: "assets/yqms/buyer-final-inspection-icon.svg",
                                            },
                                            {
                                              title: "Supplier Evaluation",
                                              icon: "CheckSquare",
                                              color: "bg-white text-blue-600",
                                              image: "assets/yqms/supplier-evaluation-icon.svg",
                                            },
                                            {
                                              title: "Customer Complaint CAP",
                                              icon: "AlertTriangle",
                                              color: "bg-white text-blue-600",
                                              image: "assets/yqms/customer_complaint_cap_new.png",
                                            },
                                          ],
                                        },
                                        {
                                          label: "Final Production",
                                          cards: [
                                            {
                                              title:
                                                "QA Audit Finishing Packing",
                                              icon: "ClipboardCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/qa-audit-finishing-packing-icon.svg",
                                            },
                                            {
                                              title:
                                                "Humidity Aquaboy Checking",
                                              icon: "Droplets",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/aquaboy-icon.svg",
                                              galleryImages: [
                                                "assets/yqms/aquaboy/quaboy1.png",
                                                "assets/yqms/aquaboy/aquaboy2.png",
                                                "assets/yqms/aquaboy/aquaboy3.png",
                                              ],
                                            },
                                            {
                                              title:
                                                "First Output Finishing And Packing",
                                              icon: "PackageCheck",
                                              color:
                                                "bg-white text-blue-600",
                                              image:
                                                "assets/yqms/first-output-finishing-packing-icon.svg",
                                            },
                                          ],
                                        },
                                        {
                                          label: "Data",
                                          cards: [
                                            {
                                              title: "Dashboard",
                                              image:
                                                "assets/yqms/dashboard-icon.svg",
                                              color:
                                                "bg-white text-blue-600",
                                              action: "/dashboard/yqms/dashboard",
                                            },
                                            {
                                              title: "Report",
                                              image:
                                                "assets/yqms/report-icon.svg",
                                              color:
                                                "bg-white text-blue-600",
                                              action: "/dashboard/yqms/report",
                                            },
                                          ],
                                        },
                                      ],
                                    }
                                    : demoType === "SUBMENU_EGOV"
                                      ? [
                                        {
                                          title: "CCF",
                                          image:
                                            "https://www.ccfdg.gov.kh/wp-content/uploads/2020/12/logo-moc.png",
                                          url: "https://www.ccfdg.gov.kh/en/about-ccf/",
                                          color: "bg-yellow-400 text-black",
                                        },
                                        {
                                          title: "MISTI",
                                          image:
                                            "https://www.misti.gov.kh/assets/img/misti-logo.png",
                                          url: "https://www.misti.gov.kh/",
                                          color: "bg-green-500 text-white",
                                        },
                                        {
                                          title: "OWSO",
                                          image:
                                            "https://www.owso.gov.kh/wp-content/uploads/2019/07/logo.png",
                                          url: "https://www.owso.gov.kh/en/",
                                          color: "bg-orange-500 text-white",
                                        },
                                        {
                                          title: "E-Filing",
                                          image:
                                            "https://efiling.acar.gov.kh/media/logos/logo.png",
                                          url: "https://www.tax.gov.kh/km/e-service",
                                          color: "bg-blue-500 text-white",
                                        },
                                        {
                                          title: "NSSF",
                                          image:
                                            "https://account.nssf.gov.kh/images/nssf-logo.png",
                                          url: "https://account.nssf.gov.kh/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3DD151d7d4-3144-4548-3b2e-ae15e11ee463%26state%3DQ3c3SmJQYn4yWmNXdWVRSjJGN1ZJUkY1VXFfU0tfUUY1aGNZUkN4aUNlTFZB%26redirect_uri%3Dhttps%253A%252F%252Fenterprise.nssf.gov.kh%252Fauth%252Fcallback%26scope%3Dopenid%2520profile%2520offline_access%2520beneficiary_registration_api%2520registration_api%2520webadmin_api%2520enterprise%2520roles%2520IDCard%2520email%2520phone%26code_challenge%3Df_8vyoLahcIyyu24Rsd7TX2QCtPZHAMjTGNhFDHR9gw%26code_challenge_method%3DS256%26nonce%3DQ3c3SmJQYn4yWmNXdWVRSjJGN1ZJUkY1VXFfU0tfUUY1aGNZUkN4aUNlTFZB",
                                          color: "bg-purple-500 text-white",
                                        },
                                      ]
                                      : demoType === "SUBMENU_FC"
                                        ? {
                                          grouped: true,
                                          groups: [
                                            {
                                              label: "Receiving",
                                              cards: [
                                                {
                                                  title: "Fabric Receiving",
                                                  icon: "Package",
                                                  color:
                                                    "bg-blue-500/30 text-white",
                                                  image:
                                                    "assets/fc/fabric-receiving.jpg",
                                                },
                                                {
                                                  title:
                                                    "Accessories Receiving",
                                                  icon: "Package",
                                                  color:
                                                    "bg-cyan-500/30 text-white",
                                                  image:
                                                    "assets/fc/accessories-receiving.jpg",
                                                },
                                              ],
                                            },
                                            {
                                              label: "Testing",
                                              cards: [
                                                {
                                                  title: "Fabric Inspection",
                                                  icon: "Search",
                                                  color:
                                                    "bg-indigo-500/30 text-white",
                                                  image:
                                                    "assets/fc/fabric-inspection.jpg",
                                                },
                                                {
                                                  title: "Fabric Test",
                                                  icon: "FlaskConical",
                                                  color:
                                                    "bg-purple-500/30 text-white",
                                                  image:
                                                    "assets/fc/fabric-test.jpg",
                                                },
                                                {
                                                  title:
                                                    "Accessories Inspection",
                                                  icon: "Search",
                                                  color:
                                                    "bg-pink-500/30 text-white",
                                                  image:
                                                    "assets/fc/accessories-inspection.jpg",
                                                },
                                              ],
                                            },
                                            {
                                              label: "Instore",
                                              cards: [
                                                {
                                                  title:
                                                    "Warehouse Tracking Location",
                                                  icon: "MapPin",
                                                  color:
                                                    "bg-teal-500/30 text-white",
                                                  image:
                                                    "assets/fc/warehouse-tracking-location.jpg",
                                                },
                                              ],
                                            },
                                            {
                                              label: "Consumption",
                                              cards: [
                                                {
                                                  title: "Consumptions",
                                                  icon: "Calculator",
                                                  color:
                                                    "bg-green-500/30 text-white",
                                                  image:
                                                    "assets/fc/consumption.png",
                                                },
                                                {
                                                  title: "Calculator",
                                                  icon: "Calculator",
                                                  color:
                                                    "bg-emerald-500/30 text-white",
                                                  image:
                                                    "assets/fc/calculator.png",
                                                },
                                              ],
                                            },
                                            {
                                              label: "Issuing",
                                              cards: [
                                                {
                                                  title: "Fabric Issuing",
                                                  icon: "ArrowUpRight",
                                                  color:
                                                    "bg-amber-500/30 text-white",
                                                  image:
                                                    "assets/fc/fabric-issuing.jpg",
                                                },
                                                {
                                                  title:
                                                    "Accessories Issuing",
                                                  icon: "ArrowUpRight",
                                                  color:
                                                    "bg-orange-500/30 text-white",
                                                  image:
                                                    "assets/fc/accessories-issuing.jpg",
                                                },
                                                {
                                                  title: "Delivery Tracking",
                                                  icon: "Truck",
                                                  color:
                                                    "bg-yellow-500/30 text-white",
                                                  image:
                                                    "assets/fc/delivery-tracking.jpg",
                                                },
                                              ],
                                            },
                                            {
                                              label: "Return",
                                              cards: [
                                                {
                                                  title: "Return Fabric",
                                                  icon: "ArrowDownLeft",
                                                  color:
                                                    "bg-rose-500/30 text-white",
                                                  image:
                                                    "assets/fc/return-fabric.jpg",
                                                },
                                                {
                                                  title: "Return Accessories",
                                                  icon: "ArrowDownLeft",
                                                  color:
                                                    "bg-red-500/30 text-white",
                                                  image:
                                                    "assets/fc/return-accessories.jpg",
                                                },
                                                {
                                                  title: "Brand Protection",
                                                  icon: "Shield",
                                                  color:
                                                    "bg-violet-500/30 text-white",
                                                  image:
                                                    "assets/fc/brand-protection.jpg",
                                                },
                                              ],
                                            },
                                          ],
                                        }
                                        : demoType === "SUBMENU_DEPARTMENTS"
                                          ? [
                                            {
                                              title: "Online Training",
                                              icon: "MonitorPlay",
                                              color: "bg-blue-500 text-white",
                                            }, // Correct
                                            {
                                              title: "YAI",
                                              icon: "Building",
                                              color:
                                                "bg-white text-blue-600",
                                            }, // Correct
                                            {
                                              title: "CSR",
                                              icon: "Globe",
                                              color:
                                                "bg-green-500 text-white",
                                            }, // Correct
                                            {
                                              title: "IT",
                                              icon: "Cpu",
                                              color: "bg-sky-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Shipping",
                                              icon: "Truck",
                                              color:
                                                "bg-orange-500 text-white",
                                            }, // Changed to Truck for shipping
                                            {
                                              title: "PPC",
                                              icon: "ClipboardCheck",
                                              color:
                                                "bg-indigo-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Merchandising",
                                              icon: "Tag",
                                              color: "bg-pink-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Purchasing",
                                              icon: "ShoppingCart",
                                              color:
                                                "bg-yellow-500 text-white",
                                            }, // Correct
                                            {
                                              title: "General Affairs",
                                              icon: "Briefcase",
                                              color: "bg-gray-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Admin",
                                              icon: "UserCog",
                                              color:
                                                "bg-slate-600 text-white",
                                            }, // Correct
                                            {
                                              title: "HR",
                                              icon: "Users",
                                              color: "bg-blue-600 text-white",
                                            }, // Correct
                                            {
                                              title: "QA",
                                              icon: "CheckSquare",
                                              color: "bg-teal-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Financial",
                                              icon: "Banknote",
                                              color:
                                                "bg-emerald-500 text-white",
                                            }, // Correct
                                            {
                                              title: "CBSA",
                                              icon: "Shield",
                                              color: "bg-red-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Sample",
                                              icon: "Shirt",
                                              color:
                                                "bg-purple-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Technical",
                                              icon: "HardHat",
                                              color:
                                                "bg-orange-600 text-white",
                                            }, // Correct
                                            {
                                              title: "Raw Material Warehouse",
                                              icon: "Warehouse",
                                              color:
                                                "bg-stone-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Cutting",
                                              icon: "Scissors",
                                              color: "bg-rose-500 text-white",
                                            }, // Correct
                                            {
                                              title: "SCC",
                                              icon: "Layers",
                                              color: "bg-cyan-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Sewing",
                                              icon: "PenTool",
                                              color: "bg-lime-500 text-white",
                                            }, // Changed to PenTool to represent a needle
                                            {
                                              title: "QC",
                                              icon: "Search",
                                              color:
                                                "bg-amber-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Ironing",
                                              icon: "Feather",
                                              color: "bg-zinc-500 text-white",
                                            }, // Correct (No 'Iron' icon exists)
                                            {
                                              title: "Packing",
                                              icon: "PackageCheck",
                                              color: "bg-sky-600 text-white",
                                            }, // Correct
                                            {
                                              title: "Washing",
                                              icon: "WashingMachine",
                                              color: "bg-blue-400 text-white",
                                            }, // Correct
                                            {
                                              title: "TPM",
                                              icon: "Wrench",
                                              color: "bg-red-600 text-white",
                                            }, // Correct
                                            {
                                              title: "Warehouse",
                                              icon: "Package",
                                              color:
                                                "bg-neutral-500 text-white",
                                            }, // Changed to Package to differentiate from Raw Material Warehouse
                                            {
                                              title: "IE",
                                              icon: "BrainCircuit",
                                              color:
                                                "bg-fuchsia-500 text-white",
                                            }, // Correct
                                            {
                                              title: "QA (Fabric)",
                                              icon: "TestTube",
                                              color:
                                                "bg-violet-500 text-white",
                                            }, // Correct
                                            {
                                              title: "Production",
                                              icon: "Factory",
                                              color: "bg-gray-700 text-white",
                                            }, // Correct
                                          ]
                                          : null; // Return null for empty modules

        // If cards is null or empty, do nothing (don't navigate)
        if (!cards || cards.length === 0) {
          return;
        }

        navigate(`/dashboard/submenu/${id}`, { state: { title, cards } });
      } else if (demoType === "GRID_TRAINING") navigate("/dashboard/training");
      else if (demoType === "VIEW_TICKET_CUSTOM") navigate("/dashboard/ticket");
      else if (demoType === "DASH_WASTE") navigate("/dashboard/waste");
      else if (demoType === "TIMELINE_MEETING") navigate("/dashboard/meeting");
      else if (demoType?.startsWith("TABLE")) {
        if (id === "ticket") navigate("/dashboard/ticket");
        else navigate(`/dashboard/${id}`);
      } else if (demoType === "GRID_SHOP") navigate("/dashboard/y-shop");
    } else {
      // Handle modules without demoType - only navigate if explicitly handled
      if (module.title === "Bill Record") {
        navigate("/dashboard/bill-record");
      } else if (module.title === "YTM Shop") {
        navigate("/dashboard/ytm-shop");
      } else if (module.title === "YTM" || module.title === "YTPM") {
        navigate("/dashboard/ytm");
      } else if (module.title === "KANBAN" || module.id === "kanban") {
        navigate("/dashboard/traffic-light");
      } else if (module.galleryImages && module.galleryImages.length > 0) {
        // Navigate to image view with gallery support
        const encodedPath = encodeURIComponent(module.galleryImages[0]);
        navigate(`/dashboard/image/${encodedPath}`, {
          state: {
            gallery: module.galleryImages,
            title: module.title,
          },
        });
      } else if (module.title === "PWIP" || module.id === "pwip") {
        navigate("/dashboard/pwip");
      } else if (module.title === "Call Out" || module.id === "call-out") {
        navigate("/dashboard/call-out");
      } else if (module.id === "meeting" && module.title === "Meeting Room") {
        navigate("/dashboard/meeting-room");
      }
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen font-sans overflow-x-hidden theme-normal ${isLightOn ? "light-on" : ""} bg-transparent`}
      style={{ position: "relative", zIndex: 1, scrollBehavior: "smooth" }}
    >
      {/* Theme Background - Show on home page and dashboard, but not on full-screen forms */}
      {(location.pathname === "/" ||
        location.pathname.startsWith("/dashboard")) &&
        !location.pathname.includes("purchase-requisition-form") &&
        !location.pathname.includes("verify-pr") &&
        !location.pathname.includes("approval-pr") &&
        !location.pathname.includes("pay-pr") &&
        !location.pathname.includes("ticket") &&
        !location.pathname.includes("y-shop") &&
        !location.pathname.includes("ytm-shop") &&
        !location.pathname.includes("ytm") &&
        !location.pathname.includes("traffic-light") &&
        !location.pathname.includes("call-out") &&
        !location.pathname.includes("yhr") &&
        !location.pathname.includes("salary-bill") &&
        !location.pathname.includes("water") &&
        !location.pathname.includes("ce") && <ThemeBackground />}

      <style>{`
                * {
                    scroll-behavior: smooth;
                }
                html {
                    scroll-behavior: smooth;
                }
                .theme-christmas {
                    background: transparent;
                }
                .theme-normal {
                    background: transparent;
                }
            `}</style>
      {!location.pathname.includes("purchase-requisition-form") &&
        !location.pathname.includes("verify-pr") &&
        !location.pathname.includes("approval-pr") &&
        !location.pathname.includes("pay-pr") &&
        !location.pathname.includes("ticket") &&
        !location.pathname.includes("y-shop") &&
        !location.pathname.includes("ytm-shop") &&
        !location.pathname.includes("ytm") &&
        !location.pathname.includes("traffic-light") &&
        !location.pathname.includes("pwip") &&
        !location.pathname.includes("call-out") &&
        !location.pathname.includes("yhr") &&
        !location.pathname.includes("salary-bill") &&
        !location.pathname.includes("water") &&
        !location.pathname.includes("ce") && <Header />}

      {/* Light Bulb - Center Top */}
      {location.pathname === "/" && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[55] flex flex-col items-center">
          <style>{`
                        @keyframes lightGlow {
                            0%, 100% { 
                                box-shadow: 0 0 25px rgba(255, 255, 255, 0.7),
                                           0 0 50px rgba(255, 255, 255, 0.5),
                                           0 0 75px rgba(255, 255, 255, 0.3),
                                           0 0 100px rgba(255, 255, 255, 0.2);
                            }
                            50% { 
                                box-shadow: 0 0 35px rgba(255, 255, 255, 0.9),
                                           0 0 70px rgba(255, 255, 255, 0.7),
                                           0 0 100px rgba(255, 255, 255, 0.5),
                                           0 0 130px rgba(255, 255, 255, 0.3);
                            }
                        }
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-8px); }
                        }
                        @keyframes clickPulse {
                            0% { transform: scale(1); }
                            50% { transform: scale(0.9); }
                            100% { transform: scale(1); }
                        }
                        .light-bulb-on {
                            animation: lightGlow 2s ease-in-out infinite, float 3s ease-in-out infinite;
                            filter: brightness(1.3);
                        }
                        .light-bulb-off {
                            filter: brightness(0.4);
                            opacity: 0.6;
                        }
                        .light-bulb-container {
                            animation: float 3s ease-in-out infinite;
                        }
                        .click-animation {
                            animation: clickPulse 0.3s ease-in-out;
                        }
                    `}</style>

          {/* Light Bulb - Pointing Down */}
          <button
            onClick={() => {
              setIsPulling(true);
              setTimeout(() => {
                setIsLightOn((prev) => !prev);
                setIsPulling(false);
              }, 300);
            }}
            className={`relative transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95 ${isPulling ? "click-animation" : ""} ${isLightOn ? "light-bulb-on" : "light-bulb-off"} light-bulb-container`}
            aria-label="Toggle Light"
            title="Click to toggle light"
          >
            {/* Custom Light Bulb SVG - Pointing Down - Larger and More Visible */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-all duration-500 ${isLightOn ? "drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]" : "drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"}`}
              style={{ transform: "rotate(180deg)" }}
            >
              {/* Outer Glow Ring */}
              {isLightOn && (
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
              )}

              {/* Bulb Glass - More visible */}
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z"
                className={`transition-all duration-500 ${isLightOn ? "fill-white stroke-white stroke-2" : "fill-gray-300 stroke-gray-400 stroke-2"}`}
              />

              {/* Inner Glow when on */}
              {isLightOn && (
                <path
                  d="M12 4C9.24 4 7 6.24 7 9C7 10.65 7.93 12.1 9.25 12.97V15C9.25 15.28 9.47 15.5 9.75 15.5H14.25C14.53 15.5 14.75 15.28 14.75 15V12.97C16.07 12.1 17 10.65 17 9C17 6.24 14.76 4 12 4Z"
                  fill="rgba(255, 255, 255, 0.3)"
                />
              )}

              {/* Filament when on - More visible */}
              {isLightOn && (
                <>
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    fill="rgba(255, 255, 255, 0.95)"
                    className="animate-pulse"
                  />
                  <path
                    d="M10 10L14 10M12 8L12 12"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Base/Socket - More detailed */}
              <rect
                x="9"
                y="17"
                width="6"
                height="2.5"
                rx="1"
                className={`transition-all duration-500 ${isLightOn ? "fill-gray-200 stroke-gray-300 stroke-1" : "fill-gray-500 stroke-gray-600 stroke-1"}`}
              />
              <rect
                x="8"
                y="19.5"
                width="8"
                height="2"
                rx="1"
                className={`transition-all duration-500 ${isLightOn ? "fill-gray-100 stroke-gray-200 stroke-1" : "fill-gray-600 stroke-gray-700 stroke-1"}`}
              />

              {/* Screw threads on base */}
              <line
                x1="10"
                y1="18.5"
                x2="14"
                y2="18.5"
                className={`transition-all duration-500 ${isLightOn ? "stroke-gray-300" : "stroke-gray-600"}`}
                strokeWidth="0.5"
              />
              <line
                x1="10"
                y1="20.5"
                x2="14"
                y2="20.5"
                className={`transition-all duration-500 ${isLightOn ? "stroke-gray-200" : "stroke-gray-700"}`}
                strokeWidth="0.5"
              />
            </svg>

            {/* Light rays when on - Enhanced */}
            {isLightOn && (
              <>
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/40 rounded-full blur-3xl animate-pulse"></div>
                </div>
                {/* Additional light rays */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
                </div>
              </>
            )}
          </button>

          {/* Click hint */}
          {/* {!isLightOn && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-xs font-semibold whitespace-nowrap animate-pulse drop-shadow-lg">
                            Click to turn on
                        </div>
                    )} */}
        </div>
      )}

      {/* Chatbot Icon & Dropdown - Only show on home page - Prominent First View */}
      {location.pathname === "/" && (
        <div className="fixed top-20 left-6 z-[60] text-white animate-in fade-in slide-in-from-left duration-1000">
          <style>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-10px) rotate(5deg); }
                        }
                        @keyframes pulse-glow {
                            0%, 100% { 
                                box-shadow: 0 0 20px rgba(59, 130, 246, 0.5),
                                           0 0 40px rgba(139, 92, 246, 0.3),
                                           0 0 60px rgba(59, 130, 246, 0.2);
                            }
                            50% { 
                                box-shadow: 0 0 30px rgba(59, 130, 246, 0.8),
                                           0 0 60px rgba(139, 92, 246, 0.5),
                                           0 0 90px rgba(59, 130, 246, 0.3);
                            }
                        }
                        @keyframes rotate-ring {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes sparkle {
                            0%, 100% { opacity: 0; transform: scale(0); }
                            50% { opacity: 1; transform: scale(1); }
                        }
                        .bot-icon-container {
                            position: relative;
                            animation: float 3s ease-in-out infinite;
                        }
                        .bot-icon-glow {
                            animation: pulse-glow 2s ease-in-out infinite;
                        }
                        .rotating-ring {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 64px;
                            height: 64px;
                            border: 2px solid transparent;
                            border-top-color: rgba(59, 130, 246, 0.6);
                            border-right-color: rgba(139, 92, 246, 0.6);
                            border-radius: 50%;
                            animation: rotate-ring 3s linear infinite;
                        }
                        .rotating-ring-2 {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 72px;
                            height: 72px;
                            border: 2px solid transparent;
                            border-bottom-color: rgba(139, 92, 246, 0.4);
                            border-left-color: rgba(59, 130, 246, 0.4);
                            border-radius: 50%;
                            animation: rotate-ring 4s linear infinite reverse;
                        }
                        .sparkle {
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: white;
                            border-radius: 50%;
                            animation: sparkle 2s ease-in-out infinite;
                        }
                        .sparkle-1 { top: 10%; left: 20%; animation-delay: 0s; }
                        .sparkle-2 { top: 20%; right: 15%; animation-delay: 0.5s; }
                        .sparkle-3 { bottom: 15%; left: 25%; animation-delay: 1s; }
                        .sparkle-4 { bottom: 10%; right: 20%; animation-delay: 1.5s; }
                    `}</style>
          <div className="flex items-center gap-4">
            <div
              className={`relative ${isDropdownOpen ? "" : "bot-icon-container"}`}
            >
              {/* Rotating Rings - Only show when dropdown is closed */}
              {!isDropdownOpen && (
                <>
                  <div className="rotating-ring"></div>
                  <div className="rotating-ring-2"></div>

                  {/* Sparkles - Only show when dropdown is closed */}
                  <div className="sparkle sparkle-1"></div>
                  <div className="sparkle sparkle-2"></div>
                  <div className="sparkle sparkle-3"></div>
                  <div className="sparkle sparkle-4"></div>
                </>
              )}

              <button
                ref={yaiDataButtonRef}
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`relative rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-10 ${isDropdownOpen ? "" : "bot-icon-glow"}`}
                aria-label="Open AI Assistant"
              >
                <img
                  src="assets/modules-image/chatbot.png"
                  alt="AI Assistant"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50 relative z-10"
                />
                {/* Gradient Overlay - Only show when dropdown is closed */}
                {!isDropdownOpen && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-purple-500/20 mix-blend-screen pointer-events-none"></div>
                )}
              </button>
            </div>
            <div
              className={`text-white font-bold text-xl tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ${isDropdownOpen ? "" : "animate-pulse"}`}
            >
              Yai Data
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-72 bg-slate-800/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <ul className="p-2">
                <li
                  onClick={() => {
                    setYaiVersion("yai1");
                    setBotModuleContext(null);
                    setYaiDataBotOpen(true);
                    setDropdownOpen(false);
                  }}
                  className="relative flex items-center justify-between gap-4 px-4 py-3 rounded-md hover:bg-orange-500/10 cursor-pointer group transition-all border border-transparent hover:border-orange-500/30"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="assets/modules-image/yai1.png"
                      alt="Yai 1"
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange-400/50 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] flex-shrink-0"
                    />
                    <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent font-bold text-lg drop-shadow-[0_0_4px_rgba(251,146,60,0.4)] whitespace-nowrap">
                      Yai 1
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-orange-400/70 group-hover:text-orange-300 transition-colors flex-shrink-0"
                  />
                </li>
                <li
                  onClick={() => {
                    setYaiVersion("yai2");
                    setYaiDataBotOpen(true);
                    setDropdownOpen(false);
                  }}
                  className="relative flex items-center justify-between gap-4 px-4 py-3 rounded-md hover:bg-gray-500/10 cursor-pointer group transition-all border border-transparent hover:border-gray-500/30"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="assets/modules-image/yai2.png"
                      alt="Yai 2"
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-400/50 drop-shadow-[0_0_8px_rgba(156,163,175,0.6)] flex-shrink-0"
                    />
                    <span className="bg-gradient-to-r from-gray-400 via-slate-400 to-gray-500 bg-clip-text text-transparent font-bold text-lg drop-shadow-[0_0_4px_rgba(156,163,175,0.4)] whitespace-nowrap">
                      Yai 2
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-gray-400/70 group-hover:text-gray-300 transition-colors flex-shrink-0"
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Dragon Animation */}
      {showDragon && (
        <DragonAnimation
          mode={dragonMode}
          targetElement={
            dragonMode === "back" ? null : yaiDataButtonRef.current
          }
          onComplete={handleDragonComplete}
          onFireComplete={handleDragonFireComplete}
          onClose={
            dragonMode === "back" ? () => setYaiDataBotOpen(false) : undefined
          }
        />
      )}

      {isYaiDataBotOpen && (
        <YaiDataBot
          moduleContext={botModuleContext}
          version={yaiVersion}
          onVersionChange={setYaiVersion}
          onClose={() => setYaiDataBotOpen(false)}
        />
      )}
      {isGMChatOpen && <GMChat onClose={() => setGMChatOpen(false)} />}
      <main
        className={`flex-1 relative ${location.pathname === "/" ? "p-4 md:p-6" : "p-0"} overflow-x-auto`}
      >
        {/* === BACKGROUND LAYERS === */}
        {/* Background is now handled by ThemeBackground component in thems.js */}
        {/* Light Beam Effect when light is on - only for normal theme */}
        {isLightOn && (
          <div className="fixed inset-0 z-[1] pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-white/25 via-white/15 to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Conditionally render dashboard content or other views */}
        {location.pathname === "/" ? (
          <>
            <style>{`
                            @keyframes fadeInUp {
                                from {
                                    opacity: 0;
                                    transform: translateY(30px);
                                }
                                to {
                                    opacity: 1;
                                    transform: translateY(0);
                                }
                            }
                            @keyframes fadeInScale {
                                from {
                                    opacity: 0;
                                    transform: scale(0.95);
                                }
                                to {
                                    opacity: 1;
                                    transform: scale(1);
                                }
                            }
                            @keyframes shimmer {
                                0% { background-position: -1000px 0; }
                                100% { background-position: 1000px 0; }
                            }
                            .apple-fade-in {
                                animation: fadeInUp 0.8s ease-out forwards;
                            }
                            .apple-fade-in-delay {
                                animation: fadeInUp 0.8s ease-out forwards;
                                animation-delay: 0.2s;
                                opacity: 0;
                            }
                            .apple-fade-in-delay-2 {
                                animation: fadeInUp 0.8s ease-out forwards;
                                animation-delay: 0.4s;
                                opacity: 0;
                            }
                            .apple-card {
                                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            .apple-card:hover {
                                transform: translateY(-4px) scale(1.02);
                            }
                            .glass-effect {
                                background: rgba(255, 255, 255, 0.1);
                                backdrop-filter: blur(20px) saturate(180%);
                                -webkit-backdrop-filter: blur(20px) saturate(180%);
                                border: 1px solid rgba(255, 255, 255, 0.2);
                            }
                            .glass-effect-strong {
                                background: rgba(255, 255, 255, 0.15);
                                backdrop-filter: blur(30px) saturate(180%);
                                -webkit-backdrop-filter: blur(30px) saturate(180%);
                                border: 1px solid rgba(255, 255, 255, 0.3);
                            }
                            .theme-normal .glass-effect {
                                background: rgba(255, 255, 255, 0.25);
                                backdrop-filter: blur(20px) saturate(180%);
                                -webkit-backdrop-filter: blur(20px) saturate(180%);
                                border: 1px solid rgba(255, 255, 255, 0.4);
                            }
                            .theme-normal .glass-effect-strong {
                                background: rgba(255, 255, 255, 0.3);
                                backdrop-filter: blur(30px) saturate(180%);
                                -webkit-backdrop-filter: blur(30px) saturate(180%);
                                border: 1px solid rgba(255, 255, 255, 0.5);
                            }
                        `}</style>
            <div className="relative z-10 min-w-[1200px] max-w-[1800px] mx-auto flex flex-col gap-6">
              <div
                className={`w-full flex justify-end mb-4 ${isDropdownOpen ? "" : "apple-fade-in"}`}
              >
                <div
                  className={`flex items-center px-3 py-2 w-64 text-white transition-all duration-300 group light-effect ${isDropdownOpen ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-lg" : "glass-effect-strong rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105"} ${isLightOn ? "brightness-110 shadow-white/20" : ""}`}
                >
                  <Search
                    className={`w-4 h-4 mr-2 transition-colors ${isDropdownOpen ? "text-cyan-300" : "text-cyan-300 group-hover:text-cyan-200"} ${isLightOn ? "text-white brightness-150" : ""}`}
                  />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    className={`bg-transparent border-none outline-none w-full text-xs transition-colors ${isDropdownOpen ? "placeholder-cyan-100/50" : "placeholder-cyan-100/50 focus:placeholder-cyan-200/70"}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center items-start gap-6">
                <SectionContainer
                  section={DASHBOARD_DATA[0]}
                  onModuleClick={handleModuleClick}
                  onBotModuleClick={openBotForModule}
                  isDropdownOpen={isDropdownOpen}
                  isLightOn={isLightOn}
                />
                <SectionContainer
                  section={DASHBOARD_DATA[1]}
                  onModuleClick={handleModuleClick}
                  onGMChatClick={() => setGMChatOpen(true)}
                  onBotModuleClick={openBotForModule}
                  isDropdownOpen={isDropdownOpen}
                  isLightOn={isLightOn}
                />
                <SectionContainer
                  section={DASHBOARD_DATA[2]}
                  onModuleClick={handleModuleClick}
                  onBotModuleClick={openBotForModule}
                  isDropdownOpen={isDropdownOpen}
                  isLightOn={isLightOn}
                />
              </div>
            </div>

            {/* General AI Agent Button - Right Side Bottom */}
            {location.pathname === "/" && (
              <button
                onClick={() => setGeneralAIAgentOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="General AI Agent"
              >
                <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              </button>
            )}
          </>
        ) : (
          <Outlet />
        )}
      </main>

      {/* General AI Agent Modal */}
      {isGeneralAIAgentOpen && (
        <GeneralAIAgent onClose={() => setGeneralAIAgentOpen(false)} />
      )}
    </div>
  );
};

export default AppLayout;
