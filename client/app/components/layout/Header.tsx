'use client';
import { BellIcon, UserCircle, LogOut, UserPlus, Building2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContextAPI } from '../../_lib/context/contextAPI';

const Header = () => {

  const {setIsLogin,setIsSignUp,setIsProfile, setTokenState,token} = useContextAPI()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router:any = useRouter();

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Mock authentication state - replace with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
      setTokenState('')
    }
    router.push(window.location.href);
    router.refresh();
  };

  const handleSignIn = () => {
    // Add your sign in logic here
    setIsLoggedIn(true);
    setIsDropdownOpen(false);
    setIsLogin((prev: boolean) => !prev)
  };

  const handleSetIsSignUp = () => {
    setIsDropdownOpen(false);
    setIsSignUp((prev: boolean) => !prev)
  }

  const handleSetIsProfile = () => {
    setIsDropdownOpen(false);
    setIsProfile((prev: boolean) => !prev)
  }

  const handleOrganizerLogin = () => {
    setIsDropdownOpen(false);
    router.push("/organizer-login");
  }

  const handleOrganizerSignup = () => {
    setIsDropdownOpen(false);
    router.push("/organizer-signup");
  }
  return (
    <header className="flex items-center justify-between w-full px-4 py-1 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="font-bold text-lg">Map</h1>
        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Profile menu"
            aria-expanded={isDropdownOpen}
          >
            <UserCircle className="w-5 h-5 text-gray-600" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48  cursor-pointer  bg-white rounded-md shadow-lg py-1 z-50">
              {token ? (
                <>
                  <button
                    onClick={handleSetIsProfile}
                    className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center  px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                  <button
                     onClick={handleSetIsSignUp}
                    className="flex items-center px-4 py-2  cursor-pointer  text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign up
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleOrganizerLogin}
                    className="flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Organizer Login
                  </button>
                  <button
                    onClick={handleOrganizerSignup}
                    className="flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Organizer Signup
                  </button>
                </>
              )}
            </div>
          )}
        </div>
    </header>
  );
};

export default Header;