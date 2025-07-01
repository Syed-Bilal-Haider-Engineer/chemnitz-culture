'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile: boolean;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setTokenState: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const contextAPI = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
  isLogin: false,
  setIsLogin: () => {},
  isSignUp: false,
  setIsSignUp: () => {},
  isProfile: false,
  setIsProfile: () => {},
  token: '',
  setTokenState: () => {},
  logout: () => {},
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [token, setTokenState] = useState('');
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setTokenState(storedToken);
  }, []);

  const logout = () => {
    setTokenState('');
    localStorage.removeItem('token');
    setIsLogin(false);
    setIsSignUp(false);
    setIsProfile(false);
  };

  return (
    <contextAPI.Provider value={{
      isCollapsed,
      toggleSidebar,
      isLogin,
      setIsLogin,
      isSignUp,
      setIsSignUp,
      isProfile,
      setIsProfile,
      token,
      setTokenState,
      logout
    }}>
      {children}
    </contextAPI.Provider>
  );
}

export const useContextAPI = () => useContext(contextAPI);
