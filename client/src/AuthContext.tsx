import React from 'react';
import { useState, ReactNode } from 'react';


interface AuthContextValue {
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};