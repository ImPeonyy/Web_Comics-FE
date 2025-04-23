import { createContext, useState } from 'react';

export const AuthFormContext = createContext();

export const AuthFormProvider = ({ children }) => {
    const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

    return (
        <AuthFormContext.Provider value={{ isAuthFormOpen, setIsAuthFormOpen }}>
            {children}
        </AuthFormContext.Provider>
    );
};
