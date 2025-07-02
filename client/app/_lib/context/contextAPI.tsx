'use client';
import { SidebarContextType } from '@/app/type/type';
import { createContext, useContext, useEffect, useState } from 'react';
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
