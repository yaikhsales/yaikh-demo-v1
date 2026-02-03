import React, { createContext, useContext, useState } from 'react';
import engTranslations from './eng';
import khTranslations from './kh';
import chTranslations from './ch';

const TranslationContext = createContext();

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};

export const TranslationProvider = ({ children }) => {
    // Language codes: 'en' for English, 'km' for Khmer, 'zh' for Chinese
    // Map to translation files: 'en' -> eng, 'km' -> kh, 'zh' -> ch
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('app-language') || 'en';
        return savedLanguage;
    });

    const translations = {
        'en': engTranslations,
        'km': khTranslations,
        'zh': chTranslations
    };

    const currentTranslations = translations[language] || engTranslations;

    const t = (key) => {
        return currentTranslations[key] || key;
    };

    const changeLanguage = (langCode) => {
        setLanguage(langCode);
        localStorage.setItem('app-language', langCode);
    };

    // Get language name based on code
    const getLanguageName = (code) => {
        const names = {
            'en': 'English',
            'km': 'ខ្មែរ',
            'zh': '中文'
        };
        return names[code] || 'English';
    };

    // Helper function to translate module titles
    // Maps common module titles to translation keys
    const translateModuleTitle = (title) => {
        if (!title) return '';
        
        // Map of title to translation key
        const titleMap = {
            'Administration': 'administration',
            'Management Dashboard': 'managementDashboard',
            'Operations': 'operations',
            'Accountant': 'accountant',
            'ADMIN': 'admin',
            'HR': 'hr',
            'CSR': 'csr',
            'E-GOV': 'egov',
            'QA': 'qa',
            'Internal Logistics': 'internalLogistics',
            'Production': 'production',
            'E-Invoicing': 'eInvoicing',
            'Purchase Request': 'purchaseRequest',
            'Y Shop': 'yShop',
            'Support Ticket': 'supportTicket',
            'Bill Record': 'billRecord',
            'Gate Pass': 'gatePass',
            'Meeting Room': 'meetingRoom',
            'My Car Booking': 'myCarBooking',
            'Fire Alarm': 'fireAlarm',
            'CCTV': 'cctv',
            'YHR': 'yhr',
            'Salary Bill': 'salaryBill',
            'Org Chart': 'orgChart',
            'Training': 'training',
            'Temp Work Request': 'tempWorkRequest',
            'Speak Up': 'speakUp',
            'Digital Audit': 'digitalAudit',
            'Energy': 'energy',
            'Air': 'air',
            'Water': 'water',
            'Waste': 'waste',
            'Chemical': 'chemical',
            'E-GOVERNMENT': 'eGovernment',
            'System Analysis': 'systemAnalysis',
            'YQMS': 'yqms',
            'Call Out': 'callOut',
            'FC': 'fc',
            'PWIP': 'pwip',
            'KANBAN': 'kanban',
            'CE': 'ce',
            'YTPM': 'ytpm',
            'YTM Shop': 'ytmShop',
            'DT Sync': 'dtSync',
            'Master Plan': 'masterPlan',
            'Line Plan': 'linePlan',
            'PPM': 'ppm',
            'TEC PACK': 'tecPack',
            'PPS': 'pps',
            'Sample': 'sample',
            'Material Purchase': 'materialPurchase',
            'Download': 'downloadData',
            'Checklist Attendant': 'checklistAttendant',
            'My Attendant': 'myAttendant',
            'FWCMS Portal': 'fwcmsPortal',
            'Ministry of Labour': 'ministryOfLabour'
        };

        const translationKey = titleMap[title];
        if (translationKey) {
            return t(translationKey);
        }
        
        // If no mapping found, try to find a direct key match (camelCase)
        const camelCaseKey = title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
        const firstLower = camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1);
        if (currentTranslations[firstLower]) {
            return t(firstLower);
        }
        
        // Return original title if no translation found
        return title;
    };

    const value = {
        language,
        translations: currentTranslations,
        t,
        changeLanguage,
        getLanguageName,
        translateModuleTitle
    };

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationContext;

