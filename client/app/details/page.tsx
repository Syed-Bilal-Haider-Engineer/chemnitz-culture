'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import {
  Phone,
  Wifi,
  Bike,
  Car,
  Video,
  User,
  Lock,
  Utensils,
  Drumstick,
  Bed,
  Key,
  Dumbbell,
  Table2,
  Tv,
  Wrench,
  ClipboardList,
  Book,
  Film,
  CircleDollarSign,
  HeartPulse,
  Beer,
  Trees,
  Sofa,
  Calendar,
  UserCog,
  ArrowUpDown,
  Users,
  Ticket,
} from 'lucide-react';
import Card from '../components/Card/Card';
import Footer from './../components/Footer';
export const myLoader = () => {
  return `https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng=`;
};

export default function Detail() {
  return (
    <>
      <Navbar />
      <div className="font-sans text-gray-800 w-full px-20">
        <div className="flex justify-between items-center gap-0.5 mt-3">
          <div className="w-[60%] h-[448px] relative border-4 border-green-100">
            <Image
              loader={myLoader}
              src="https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng="
              alt="Main Image"
              fill
              className="object-cover  rounded-t-2xl rounded-l-2xl"
              unoptimized
            />
          </div>
          <div className=" w-[40%] flex flex-col h-[448px] gap-1 mt-2">
            {[1, 2].map((item, index) => (
              <div key={index} className="relative h-[224px] w-full">
                <Image
                  loader={myLoader}
                  src="https://media.gettyimages.com/id/1409729992/de/foto/hektische-k%C3%B6che-die-in-einer-gesch%C3%A4ftigen-gro%C3%9Fk%C3%BCche-in-einem-restaurant-arbeiten.jpg?s=1024x1024&w=gi&k=20&c=CeE-qN_xgHmO0GnQePmBdo3gEvsHiUnXIHLdIiSvcng="
                  alt={`Room View ${index + 1}`}
                  fill
                  className="object-cover rounded-t-2xl rounded-r-2xl"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="p-6 flex justify-between items-center gap-2">
            <div className="mt-8">
              <h1 className="text-2xl font-bold text-gray-800">iQ Highbury</h1>
              <p className="text-gray-600">London · iQ Student Accommodation</p>
              <div className="mt-4">
                <p className="text-gray-700">Rooms from</p>
                <p className="text-xl font-semibold">
                  £320{' '}
                  <span className="text-sm font-normal">
                    per week, all bills included
                  </span>
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Remote viewings available
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>Road</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Features</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Wifi</span>
                </div>
                <div className="flex items-center">
                  <Bike className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Bike Storage</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Car Parking</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Surveillance Cameras</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Security Staff</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Communal Area</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Controlled Access Gate</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Vending Machine</span>
                </div>
                <div className="flex items-center">
                  <Drumstick className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Laundry</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">All Rooms En-suite</span>
                </div>
                <div className="flex items-center">
                  <Key className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Wheelchair Accessible</span>
                </div>

                <div className="flex items-center">
                  <CircleDollarSign className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Cash Point</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Gym</span>
                </div>
                <div className="flex items-center">
                  <Table2 className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Pool Table</span>
                </div>
                <div className="flex items-center">
                  <Tv className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Satellite/Table TV</span>
                </div>
                <div className="flex items-center">
                  <Wrench className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Maintenance Team</span>
                </div>
                <div className="flex items-center">
                  <ClipboardList className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Reception</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Parcel Service</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Library/Study Area</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Entertainment Area/Room</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Cinema Room</span>
                </div>

                <div className="flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Dinner Party Room</span>
                </div>
                <div className="flex items-center">
                  <HeartPulse className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Mental Health Support</span>
                </div>
                <div className="flex items-center">
                  <Beer className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Residents Bar</span>
                </div>
                <div className="flex items-center">
                  <Trees className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Residents Garden</span>
                </div>
                <div className="flex items-center">
                  <Sofa className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Lounge</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Residents' Events</span>
                </div>
                <div className="flex items-center">
                  <UserCog className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">On site Manager</span>
                </div>
                <div className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Elevator(s)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Residential Team</span>
                </div>
                <div className="flex items-center">
                  <Key className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Key Fob Access</span>
                </div>
              </div>
            </div>
            <div className='self-start'>
              <div className="mt-4">
                <p className="text-sm text-gray-600">iQ Highbury</p>
                <p className="text-sm text-gray-600">
                  Operated by: iQ Student Accommodation
                </p>
              </div>
              <button className="mt-6 w-full bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                Request Details
              </button>
              <div className="mt-6 flex items-center text-sm text-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                <span>Call now: 020 8... View Number</span>
              </div>
            </div>
          </div>
        </div>
         {/* Map */}
        <div className="mb-6 mt-6">
          <h2 className="text-xl font-bold mb-2">Location</h2>
          <div className="w-full h-70 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-gray-700">[Dummy Map Placeholder]</span>
          </div>
        </div>
        <Card/>
        <Footer/>
      </div>
    </>
  );
}
