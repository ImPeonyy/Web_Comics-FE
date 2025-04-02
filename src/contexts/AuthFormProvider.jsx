import { Children, createContext, useState } from 'react';

export const AuthFormContext = createContext();

export const AuthFormProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AuthFormContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </AuthFormContext.Provider>
    );
};
