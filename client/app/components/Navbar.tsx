'use client';
import React from 'react'
import {Home, Map, Users} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
function Navbar() {
  const pathname = usePathname();
  
    const navItems = [
      { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} className="hover:cursor-pointer" /> },
      { label: 'Map View', href: '/dashboard/map', icon: <Map size={20} className="hover:cursor-pointer"/> },
      { label: 'Users', href: '/dashboard/users', icon: <Users size={20} className="hover:cursor-pointer" /> },
    ];

  return (
    <nav className="flex flex-col gap-y-4 gap-x-2">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 py-2 rounded-lg transition-colors ${
              pathname === href ? 'bg-blue-100 text-green-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {icon} {label}
          </Link>
        ))}
      </nav>
  )
}

export default Navbar