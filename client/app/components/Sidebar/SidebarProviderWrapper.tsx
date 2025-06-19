'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/app/context/SidebarContext';


export default function SidebarProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const showSidebar = !['/login', '/signup','/details'].includes(path);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar />}
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
    </SidebarProvider>
  );
}
