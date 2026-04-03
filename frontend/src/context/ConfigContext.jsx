import React, { createContext, useContext } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const config = {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
        env: import.meta.env.MODE || 'development',
        appName: 'OMS PRO'
    };

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
