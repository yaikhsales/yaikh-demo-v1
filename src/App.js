import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';

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

export default function App() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<div />} />
                <Route path="training" element={<TrainingGridView onBack={handleBack} />} />
                <Route path="sensors" element={<SensorGridView onBack={handleBack} />} />
                <Route path="waste" element={<WasteDashboardView onBack={handleBack} />} />
                <Route path="shop" element={<ShopGridView onBack={handleBack} />} />
                <Route
                    path="meeting"
                    element={<TimelineView onBack={handleBack} onAdd={() => {}} />}
                />
                <Route path="ticket" element={<SupportTicketView onBack={handleBack} />} />
                <Route path="submenu/:moduleId" element={<SubMenuView />} />
                <Route path="image/*" element={<ImageView onBack={handleBack} />} />
                <Route path="org-chart-master" element={<OrgChartView onBack={handleBack} />} />
                <Route
                    path="energy/meters"
                    element={<MeterDeviceListView onBack={handleBack} />}
                />
                <Route
                    path="system-analysis"
                    element={<SystemAnalysisView onBack={handleBack} />}
                />
                <Route path=":moduleId" element={<TableView onBack={handleBack} />} />
            </Route>
        </Routes>
    );
}
