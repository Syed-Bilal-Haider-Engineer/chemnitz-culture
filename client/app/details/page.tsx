'use client'
import React from 'react';
import Image from 'next/image';

export default function AccommodationDetail() {
  const myLoader = () => {
    return `https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng=`;
  };
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Image Section */}
      <div className="grid grid-cols-2 gap-2 p-4">
        <Image
          loader={myLoader}
          src="https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng="
          alt="Room Overview"
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(() => {
            return (
              <Image
                loader={myLoader}
                src="https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng="
                alt="Room Overview"
                width={600}
                height={400}
                className="rounded-xl object-cover"
              />
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">The Valentine</h1>
        <p className="text-lg text-gray-600 mb-2">Operated by Dummy Students</p>
        <p className="text-xl font-semibold mb-4 text-green-700">
          Rooms from £194 per week
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded p-2 text-sm">
              Dummy Feature {i + 1}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p>
            This is a sample description for The Valentine. Located near
            amenities and transport hubs, it offers comfort and convenience for
            students looking to stay in London.
          </p>
        </div>

        {/* Rooms */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Rooms at The Valentine</h2>
          <div className="space-y-2">
            {[
              '2-Bed Apartment',
              '6-Bed En Suite',
              '7-Bed En Suite',
              '8-Bed En Suite',
            ].map((room, idx) => (
              <div
                key={idx}
                className="flex justify-between p-2 border rounded"
              >
                <span>{room}</span>
                <span className="text-green-700 font-semibold">
                  £194.00 per week
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Location</h2>
          <div className="w-full h-64 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-gray-700">[Dummy Map Placeholder]</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-10 rounded-t-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Information</h3>
              <ul>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Working With Us</h3>
              <ul>
                <li>Advertise</li>
                <li>Media</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Follow Us</h3>
              <ul>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Help</h3>
              <ul>
                <li>FAQs</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
