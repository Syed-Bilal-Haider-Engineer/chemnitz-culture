'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, ChevronsLeft, ChevronsRight, HeartPlus } from 'lucide-react';
import { useContextAPI } from '../../../_lib/context/contextAPI';
import '../../../_lib/styles/sidebar.css'
export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, token } = useContextAPI();
 console.log("sidebar token=>",token)
  const navItems = [
    { label: 'Map', href: '/', icon: <Map size={20} /> },
    ...(token ? [{ label: 'Favorites', href: '/favorites', icon: <HeartPlus size={20} /> }] : []),
  ];

  return (
    <aside className={`
      h-screen bg-white border-r border-gray-200 py-3 px-2 flex flex-col gap-y-6
      transition-all duration-300 ease-in-out shadow-sm shadow-gray-200 
      ${isCollapsed ? 'w-[60px]' : ' w-[60px] md:w-[200px]'}
    `}>
      <div className={`flex ${isCollapsed ? 'flex-col' : ' flex-col md:flex-row'} justify-between items-center`}>
        <span className={`text-2xl font-bold ml-2 ${isCollapsed && 'mt-2'}`}>KultLink</span>
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
              <span className=" menu md:block text-sm  hover:cursor-pointer transition-opacity duration-200">{label}</span>
            )}
          </Link>
        ))}
      </nav>

      {isCollapsed && (
        <div className="mt-auto text-center">
          <span className="text-xs text-gray-500 rotate-90 inline-block origin-center whitespace-nowrap">
            KultLink
          </span>
        </div>
      )}
    </aside>
  );
}
