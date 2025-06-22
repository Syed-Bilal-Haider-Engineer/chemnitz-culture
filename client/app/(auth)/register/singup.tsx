"use client"
import React from 'react';
import FormInput from '../input'
import { X, MapPin, Eye, EyeOff, SplinePointer } from 'lucide-react';
import { useLocation } from '@/app/Hooks/useLocation';
import Modal from '@/app/common/modal';
import { useContextAPI } from '@/app/context/contextAPI';
import Head from 'next/head';
export default function SignupForm() {
    const {isSignUp, setIsSignUp} = useContextAPI()
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const { 
    locationName, 
    isLoading, 
    error, 
    fetchLocationName, 
    getCurrentLocation 
  } = useLocation();

  const handleGetLocation = async () => {
    try {
      const { lat, lng } = await getCurrentLocation();
      const name = await fetchLocationName(lat, lng);
      setFormData(prev => ({
        ...prev,
        location: name || 'Location found but could not get name'
      }));
    } catch (err:any) {
      setFormData(prev => ({
        ...prev,
        location: err.message || 'Failed to get location'
      }));
    }
  };

  return (
    <>
      {isSignUp && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center m-auto p-3 mt-2">
            <Head>
              <title>Chemnitz Culture Places | Signup</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className=" mx-auto rounded-xl shadow-xl p-4">
              <div className="w-full flex items-center justify-center bg-red-500">
                <div className="w-full bg-black max-w-lg">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                   <div className='flex justify-end'>
                        <button
                        className="text-gray-500 hover:bg-gray-200 cursor-pointer
                         rounded-sm p-1 hover:text-gray-200 transition"
                        onClick={() => setIsSignUp(false)}
                        aria-label="Close Modal"
                      >
                        <X className="w-5 h-5 text-black" />
                      </button>
                    </div>
                   <div className="mb-6">
         <h2 className="text-2xl font-bold text-gray-800">Create New Account</h2>
      <p className="text-gray-500 mt-1">Fill in your details to register</p>
   </div>
        
        <form className="space-y-4">
          <div className='flex justify-between gap-2 items-center width-full'>
             <FormInput
                name="username"
                label="Username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
            />
          
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div  className='flex justify-between gap-2 items-center'>
        <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          </div>
        
              <FormInput
      name="location"
      label="Location"
      placeholder="Your location"
      value={isLoading ? "Detecting location..." : formData.location}
      onChange={handleChange}
      icon={
        isLoading ? (
          <SplinePointer className="w-5 h-5 text-gray-500" />
        ) : (
          <MapPin 
            className="w-5 h-5 text-gray-500 cursor-pointer" 
            onClick={handleGetLocation} 
          />
        )
      }
      disabled={isLoading}
    />
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bordern cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 cursor-pointer rounded-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>
        </form> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
