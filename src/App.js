import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import { ThemeProvider } from './thems';

// Import all view components
import TrainingGridView from './views/TrainingGridView';
import SensorGridView from './views/SensorGridView';
import WasteDashboardView from './views/WasteDashboardView';
import TimelineView from './views/TimelineView';
import SubMenuView from './views/SubMenuView';
import TableView from './views/TableView';
import SupportTicketView from './views/SupportTicketView';
import OrgChartView from './views/OrgChartView';
import MeterDeviceListView from './views/MeterDeviceListView';
import SystemAnalysisView from './views/SystemAnalysisView';
import ShopGridView from './views/ShopGridView';
import ImageView from './views/ImageView';
import VerifyPR from './accountant/verify-pr';
import ApprovalPR from './accountant/approval-pr';
import PayPR from './accountant/pay-pr';
import ChecklistAttendance from './yhr/checklist-attendance';
import MyAttendance from './yhr/my-attendance';
import ComplianceCertificate from './digital-audit/compliance-certificate';
import AuditPlan from './digital-audit/audit-plan';
import ShowListRequest from './purchase-request/show-list-request';
import MasterList from './purchase-request/master-list';
import MyConfirmReceived from './purchase-request/my-confirm-received';
import PurchaseRequisitionForm from './purchase-request/purchase-requisition-form';
import Meters from './energy/meters';
import SwitchBoard from './energy/switch-board';
import Temperature from './air/temperature';
import Air from './air/air';
import RequestWorkerForm from './temp-worker-request/request-worker-form';
import RequestWorkerList from './temp-worker-request/request-worker-list';
import BillRecord from './bill-record/bill-record';
import WaterIn from './water/in';
import WaterOut from './water/out';
import GatePass from './gatepass/gatepass';
import Visitor from './gatepass/visitor';
import Waste from './waste/waste';
import Boiler from './waste/boiler';
import MeetingRoom from './meeting-room/meeting-room';
import CarBooking from './car-booking/car-booking';
import FaceScan from './cctv/face-scan';
import MyFaceScan from './cctv/my-face-scan';
import SystemAnalyze from './system-analyze/system-analyze';
import YTMShop from './ytm-shop/ytm-shop';
import YShop from './y-shop/y-shop';
import Training from './training/training';
import WelcomePage from './welcome-page';
import HappyNewYear from './happy-new-year';

export default function App() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

    return (
        <ThemeProvider>
            <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/happy-new-year" element={<HappyNewYear />} />
            <Route path="/" element={<AppLayout />} />
            <Route path="/dashboard" element={<AppLayout />}>
                <Route index element={<div />} />
                <Route path="training" element={<TrainingGridView onBack={handleBack} />} />
                <Route path="sensors" element={<SensorGridView onBack={handleBack} />} />
                <Route path="waste/analytics" element={<Waste onBack={handleBack} />} />
                <Route path="waste/boiler" element={<Boiler onBack={handleBack} />} />
                <Route path="shop" element={<YTMShop onBack={handleBack} />} />
                <Route path="y-shop" element={<YShop onBack={handleBack} />} />
                <Route
                    path="meeting"
                    element={<TimelineView onBack={handleBack} onAdd={() => {}} />}
                />
                <Route
                    path="meeting-room"
                    element={<MeetingRoom onBack={handleBack} />}
                />
                <Route
                    path="car-booking"
                    element={<CarBooking onBack={handleBack} />}
                />
                <Route
                    path="cctv/face-scan"
                    element={<FaceScan onBack={handleBack} />}
                />
                <Route
                    path="cctv/my-face-scan"
                    element={<MyFaceScan onBack={handleBack} />}
                />
                <Route path="ticket" element={<SupportTicketView onBack={handleBack} />} />
                <Route path="submenu/:moduleId" element={<SubMenuView />} />
                <Route path="image/*" element={<ImageView onBack={handleBack} />} />
                <Route path="verify-pr" element={<VerifyPR onBack={handleBack} />} />
                <Route path="approval-pr" element={<ApprovalPR onBack={handleBack} />} />
                <Route path="pay-pr" element={<PayPR onBack={handleBack} />} />
                <Route path="checklist-attendance" element={<ChecklistAttendance onBack={handleBack} />} />
                <Route path="my-attendance" element={<MyAttendance onBack={handleBack} />} />
                <Route path="compliance-certificate" element={<ComplianceCertificate onBack={handleBack} />} />
                <Route path="audit-plan" element={<AuditPlan onBack={handleBack} />} />
                <Route path="purchase-requisition-form" element={<PurchaseRequisitionForm onBack={handleBack} />} />
                <Route path="show-list-request" element={<ShowListRequest onBack={handleBack} />} />
                <Route path="master-list" element={<MasterList onBack={handleBack} />} />
                <Route path="my-confirm-received" element={<MyConfirmReceived onBack={handleBack} />} />
                <Route path="org-chart-master" element={<OrgChartView onBack={handleBack} />} />
                <Route
                    path="energy/meters"
                    element={<Meters onBack={handleBack} />}
                />
                <Route
                    path="energy/switch-board"
                    element={<SwitchBoard onBack={handleBack} />}
                />
                <Route
                    path="air/temperature"
                    element={<Temperature onBack={handleBack} />}
                />
                <Route
                    path="air/quality"
                    element={<Air onBack={handleBack} />}
                />
                <Route
                    path="temp-worker-request/form"
                    element={<RequestWorkerForm onBack={handleBack} />}
                />
                <Route
                    path="temp-worker-request/list"
                    element={<RequestWorkerList onBack={handleBack} />}
                />
                <Route
                    path="bill-record"
                    element={<BillRecord onBack={handleBack} />}
                />
                <Route
                    path="water/in"
                    element={<WaterIn onBack={handleBack} />}
                />
                <Route
                    path="water/out"
                    element={<WaterOut onBack={handleBack} />}
                />
                <Route
                    path="gatepass"
                    element={<GatePass onBack={handleBack} />}
                />
                <Route
                    path="gatepass/visitor"
                    element={<Visitor onBack={handleBack} />}
                />
                <Route
                    path="system-analysis"
                    element={<SystemAnalyze onBack={handleBack} />}
                />
                <Route path="waste" element={<WasteDashboardView onBack={handleBack} />} />
                <Route path="training/:department" element={<Training onBack={handleBack} />} />
                <Route path=":moduleId" element={<TableView onBack={handleBack} />} />
            </Route>
        </Routes>
        </ThemeProvider>
    );
}
