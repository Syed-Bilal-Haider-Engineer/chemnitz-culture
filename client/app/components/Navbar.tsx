'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Users, UserCircle2, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { myLoader } from '../details/page';

function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
    { label: 'Map View', href: '/dashboard/map', icon: <Map size={20} /> },
    { label: 'Users', href: '/dashboard/users', icon: <Users size={20} /> },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-green-100 shadow-sm">
      <Link href="/" className="text-lg font-bold text-green-600 flex items-center gap-2">
        <Image
        loader={myLoader}
          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" 
          alt="Logo"
          width={32}
          height={32}
        />
        <span>Chemnitz Culture</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
              pathname === href
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-green-600 focus:outline-none"
        >
          <UserCircle2 size={28} />
          <ChevronDown size={18} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
              onClick={() => setDropdownOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
              onClick={() => setDropdownOpen(false)}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
