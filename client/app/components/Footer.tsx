import React from 'react';
import { Newspaper, Info, Phone, Mail, Briefcase, CircleDollarSign,Facebook,Instagram,Twitter,
LogIn, HelpCircle, FileText, Shield, Cookie, Heart } from 'lucide-react';
import Image from 'next/image';
export const myLoader = () => {
  return `https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng=`;
};
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg">Information</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Newspaper size={16} className="text-gray-600" />
                <span>News</span>
              </li>
              <li className="flex items-center space-x-2">
                <Info size={16} className="text-gray-600" />
                <span>About</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-600" />
                <span>Contact us</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-600" />
                <span>Press/media enquiries</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Working With Us */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg">Working With Us</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CircleDollarSign size={16} className="text-gray-600" />
                <span>Advertise with us</span>
              </li>
              <li className="flex items-center space-x-2">
                <Briefcase size={16} className="text-gray-600" />
                <span>Create an advertiser account</span>
              </li>
              <li className="flex items-center space-x-2">
                <LogIn size={16} className="text-gray-600" />
                <span>Advertiser log in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart size={16} className="text-gray-600" />
                <span>Partner with us</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Find us at */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg">Find us at</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Instagram  size={16} className="text-gray-600" />
                <span>Instagram</span>
              </li>
              <li className="flex items-center space-x-2">
                <Facebook size={16} className="text-gray-600" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter size={16} className="text-gray-600" />
                <span>Twitter</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart size={16} className="text-gray-600" />
                <span>LinkedIn</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
             
              <h3 className="font-bold text-lg">Help</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <HelpCircle size={16} className="text-gray-600" />
                <span>Help</span>
              </li>
              <li className="flex items-center space-x-2">
                <FileText size={16} className="text-gray-600" />
                <span>Terms of use</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield size={16} className="text-gray-600" />
                <span>Privacy policy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Cookie size={16} className="text-gray-600" />
                <span>Cookie policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;