"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, ChevronsLeft, ChevronsRight, HeartPlus } from 'lucide-react';
import { useContextAPI } from '../../context/contextAPI';

const navItems = [
  { label: 'Map', href: '/', icon: <Map size={20} /> },
  { label: 'favorites', href: '/favorites', icon: <HeartPlus size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed,toggleSidebar } = useContextAPI();
  return (
    <aside className={`
      h-screen bg-white border-r  border-r-gray-200 py-3 px-2 flex flex-col gap-y-6
      transition-all duration-300 ease-in-out shadow-sm shadow-gray-200
      ${isCollapsed ? 'w-[60px]' : 'w-[200px]'}
    `}>
     <div className={`flex ${isCollapsed ? 'flex-col' : ''} justify-between items-center`}>
          <span className={`text-base font-medium ${isCollapsed && 'mt-2'}`}>Chemnitz Culture</span>
          <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors hover:cursor-pointer"
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
     </div> 
      <nav className="flex flex-col gap-y-2">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-3 py-1.5 px-3 rounded-lg transition-colors hover:cursor-pointer
              ${pathname === href ? 'bg-green-100 text-green-600' : 'text-gray-700 hover:bg-gray-100'}
              ${isCollapsed ? 'justify-center' : ''}
              group
            `}
          >
            <span className="min-w-[20px] flex justify-center hover:cursor-pointer">
              {icon}
            </span>
            {!isCollapsed && (
              <span className="hover:cursor-pointer">{label}</span>
            )}
            {isCollapsed && (
              <span className="
                absolute left-full ml-4 px-2 py-1 rounded-md
                bg-gray-800 text-white text-sm
                invisible opacity-0 group-hover:visible group-hover:opacity-100
                transition-opacity duration-200
              ">
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {isCollapsed && (
        <div className="mt-auto text-center">
          <span className="text-xs text-gray-500 rotate-90 inline-block origin-center whitespace-nowrap">
            Chemnitz
          </span>
        </div>
      )}
    </aside>
  );
}