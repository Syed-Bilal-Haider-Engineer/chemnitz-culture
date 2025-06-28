'use client';
import Sidebar from './Sidebar';
import Header from '../Header';
import  Provider from '../../../_lib/context/contextAPI';
import Common from '../../common/common';

export default function SidebarProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Provider>
      <div className="flex min-h-screen">
        {/* {showSidebar && <Sidebar />} */}
         {<Sidebar />}
        <main className="flex-1 bg-gray-100">
           <Header/>
          {children}
          <Common/>
          </main>
      </div>
    </Provider>
  );
}
