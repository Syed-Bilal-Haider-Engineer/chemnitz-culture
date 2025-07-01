"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { X, MapPin, SplinePointer } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import FormInput from "../../components/common/input";
import Modal from "@/app/components/common/modal";
import { useContextAPI } from "@/app/_lib/context/contextAPI";
import { useLocation } from "@/app/_lib/hooks/useLocation";
import { getUserProfile, updateProfile } from "@/app/_lib/services/userService";
import {
  ProfileFormData,
  ProfileFormValidate,
} from "@/app/_lib/validation/validation";

const defaultValues: ProfileFormData = {
  name: "",
  email: "",
  lat: 0,
  lng: 0,
  location: "",
};

export default function Profile() {
  const { isProfile, setIsProfile, token } = useContextAPI();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormValidate),
    defaultValues,
  });

  const { data, isLoading: getIsLoading,refetch, isError: getIsError, error } = useQuery({
    queryKey: ["user", token],
    queryFn: getUserProfile,
    enabled: !!token, 
  });

  const { getCurrentLocation, fetchLocationName, isLoading, getLocationNameFromLatLng } = useLocation();
  const { location, lat, lng } = watch();

  useEffect(() => {
    if (data) {
      setValue("name", data?.user?.name || "");
      setValue("email", data?.user?.email || "");
      setValue("lat", data?.user?.lat || 0);
      setValue("lng", data?.user?.lng || 0);
      setValue("location", data?.user?.location || "");
    }
  }, [data, setValue]);

  useEffect(() => {
    async function getAddress() {
      if (location && !lat && !lng) {
        const data = await getLocationNameFromLatLng(location);
        setValue("lat", data?.lat);
        setValue("lng", data?.lng);
      }
    }
    getAddress();
  }, [location, lat, lng, setValue]);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setSuccessMsg("Updated your profile successfully!");
      refetch();
      setTimeout(() => {
        reset();
        setIsProfile(false);
      }, 2000);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Something went wrong");
    },
  });

  const handleGetLocation = async () => {
    try {
      const { lat, lng } = await getCurrentLocation();
      if( lat && lng) {
      const location = await fetchLocationName(lat, lng);
      setValue("lat", lat);
      setValue("lng", lng);
      setValue("location", location || "Location found but could not get name");
      }
    
    } catch (err: any) {
      setValue("location", err.message || "Failed to get location");
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    mutate({...data,token});
  };

  return (
    <>
      {isProfile && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center p-3 mt-2">
            <Head>
              <title>Edit Profile</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto rounded-xl shadow-xl p-4 bg-white w-full max-w-xl">
              <div className="flex justify-end">
                <button
                  className="text-gray-500 cursor-pointer hover:bg-gray-200 rounded-sm p-1"
                  onClick={() => setIsProfile(false)}
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              {getIsLoading ? (
                <p className="text-center text-gray-600 text-sm mt-6">Loading...</p>
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Edit</h2>
                    <p className="text-gray-500 mt-1">Fill in your details to update profile</p>
                  </div>

                  {isError && (
                    <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
                  )}
                  {isSuccess && (
                    <p className="text-green-600 text-sm mb-2">{successMsg}</p>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                      type="text"
                      label="Name"
                      placeholder="Enter name"
                      {...register("name")}
                      error={errors.name?.message}
                      disabled={false}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                      error={errors.email?.message}
                      disabled={true}
                    />
                    <FormInput
                      type="text"
                      label="Location"
                      placeholder="Your location"
                      {...register("location")}
                      error={errors.location?.message}
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
                      disabled={false}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsProfile(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="px-4 py-2 bg-green-600 rounded-lg text-white cursor-pointer hover:bg-green-700"
                      >
                        {isPending ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
