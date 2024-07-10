import React, { createContext } from 'react';
import AppLayout from '../layouts/AppLayout';

const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
    return (
        <LayoutContext.Provider>
            <AppLayout>
                {children}
            </AppLayout>
        </LayoutContext.Provider>
    );
};