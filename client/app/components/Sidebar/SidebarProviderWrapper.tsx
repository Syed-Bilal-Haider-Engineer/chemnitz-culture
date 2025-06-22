'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from '../Header';
import  Provider from '../../context/contextAPI';

export default function SidebarProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  // const showSidebar = !['/login', '/signup','/details'].includes(path);

  return (
    <Provider>
      <div className="flex min-h-screen">
        {/* {showSidebar && <Sidebar />} */}
         {<Sidebar />}
        <main className="flex-1 bg-gray-100">
           <Header/>
          {children}
          </main>
      </div>
    </Provider>
  );
}
