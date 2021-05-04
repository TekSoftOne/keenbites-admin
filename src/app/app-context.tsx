import { createContext, useContext } from 'react';

export interface AppContextData {
    currentPage: string;
    updateCurrentPage: (currentPage: string) => void;
}

export const defaultAppData = {
    currentPage: 'settings',
};

export const AppContext = createContext<AppContextData | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContext');
    }

    return context;
};
