import {
    CheckCircle, FileCheck, Banknote, Users, Mail, Layout, UserCog, FileText,
    BarChart2, Settings, CheckSquare, MonitorPlay, Layers, Briefcase, Plus,
    BookOpen, Truck, Building, Package, Scissors, Warehouse, Cpu, HardHat,
    Hand, Shirt, Feather, PackageCheck, WashingMachine, Wrench, BrainCircuit,
    TestTube, LayoutDashboard, Settings2, GaugeCircle, Sun, Activity, Power,
    Car, Bike, Bus, Rocket, BarChartBig, UsersRound, Download, Flame, Fan,
    ToggleRight, ArrowDownToLine, ArrowUpFromLine, X, Image as ImageIcon
} from 'lucide-react';

const iconMap = {
    CheckCircle,
    FileCheck,
    Banknote,
    Users,
    Mail,
    Layout,
    UserCog,
    FileText,
    BarChart2,
    Settings,
    CheckSquare,
    MonitorPlay,
    Layers,
    Briefcase,
    Plus,
    BookOpen,
    Truck,
    Building,
    Package,
    Scissors,
    Warehouse,
    Cpu,
    HardHat,
    Hand,
    Shirt,
    Feather,
    PackageCheck,
    WashingMachine,
    Wrench,
    BrainCircuit,
    TestTube,
    LayoutDashboard,
    Settings2,
    GaugeCircle,
    Sun,
    Activity,
    Power,
    Car,
    Bike,
    Bus,
    Rocket,
    BarChartBig,
    UsersRound,
    Download,
    Flame,
    Fan,
    ToggleRight,
    ArrowDownToLine,
    ArrowUpFromLine,
    X,
};

export const IconRenderer = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <ImageIcon {...props} />;
    return <IconComponent {...props} />;
};

