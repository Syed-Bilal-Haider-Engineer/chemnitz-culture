'use client';
import { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isLogin: boolean;
setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
isSignUp:boolean;
setIsSignUp:React.Dispatch<React.SetStateAction<boolean>>;
 isProfile:boolean;
 isSetProfile:React.Dispatch<React.SetStateAction<boolean>>;
}

const contextAPI = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
  isLogin: false,
  setIsLogin: () => {},
  isSignUp:false,
  setIsSignUp: () => {},
  isProfile: false,
  isSetProfile: () => {}
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
 const [isSignUp, setIsSignUp] = useState(false);
 const [isProfile, isSetProfile] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
 
  return (
    <contextAPI.Provider value={{ isCollapsed, toggleSidebar, isLogin, setIsLogin,isSignUp, setIsSignUp,isProfile, isSetProfile }}>
      {children}
    </contextAPI.Provider>
  );
}

export const useContextAPI = () => useContext(contextAPI);
