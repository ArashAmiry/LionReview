import React, { useEffect } from 'react';
import { useState, ReactNode } from 'react';


interface AuthContextValue {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
    const authContext = React.useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error('useAuthContext must be inside a AuthProvider');
    }
    return authContext;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

        return storedIsLoggedIn === 'true' ? true : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};