"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { X, MapPin, SplinePointer } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import FormInput from "../../components/common/input";
import Modal from "@/app/components/common/modal";
import { useContextAPI } from "@/app/_lib/context/contextAPI";
import { useLocation } from "@/app/_lib/hooks/useLocation";
import { signupUser } from "@/app/_lib/services/userService";
import {
  SignUpFormData,
  signUpFormValidate,
} from "@/app/_lib/validation/validation";

const defaultValues: SignUpFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  lat: 0,
  lng: 0,
  location: "",
};

export default function SignupForm() {
  const { isSignUp, setIsSignUp } = useContextAPI();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidate),
    defaultValues,
  });

  const { getCurrentLocation, fetchLocationName, isLoading,getLocationNameFromLatLng } = useLocation();

  const handleGetLocation = async () => {
    try {
      const { lat, lng } = await getCurrentLocation();
      const location = await fetchLocationName(lat, lng);
      console.log(" lat, lng ", lat, lng )
      setValue("lat", lat);
      setValue("lng", lng);
      setValue("location", location || "Location found but could not get name");
    } catch (err: any) {
      setValue("location", err.message || "Failed to get location");
    }
  };

  const {location,lat,lng} = watch();

  useEffect(() => {
   async function getAddress() {
      if(location && !lat && !lng) {
      const data = await getLocationNameFromLatLng(location)
      setValue("lat", data?.lat);
      setValue("lng", data?.lng);
    }
   }
   setTimeout(() => getAddress(),1000);
  }, [location])

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      setSuccessMsg("Account created successfully!");
      reset();
      setTimeout(() => {
        setIsSignUp(false);
      }, 2000);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Something went wrong");
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data,"data signup")
      mutate(data);
  };

  return (
    <>
      {isSignUp && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center p-3 mt-2">
            <Head>
              <title>SignUp</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto rounded-xl shadow-xl p-4 bg-white w-full max-w-xl">
              <div className="flex justify-end">
                <button
                  className="text-gray-500 cursor-pointer hover:bg-gray-200 rounded-sm p-1"
                  onClick={() => setIsSignUp(false)}
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Create New Account
                </h2>
                <p className="text-gray-500 mt-1">
                  Fill in your details to register
                </p>
              </div>

              {isError && (
                <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
              )}
              {isSuccess && (
                <p className="text-green-600 text-sm mb-2">{successMsg}</p>
              )}

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center gap-3">
                  <div className="w-[50%]">
                    <FormInput
                      type="text"
                      label="Name"
                      placeholder="Enter name"
                      {...register("name")}
                      error={errors.name?.message}
                      disabled={false}
                    />
                  </div>
                  <div className="w-[50%]">
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                      error={errors.email?.message}
                      disabled={false}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <div className="w-[50%]">
                    <FormInput
                      label="Password"
                      type="password"

                      placeholder="Create password"
                      {...register("password")}
                      error={errors.password?.message}
                      disabled={false}
                    />
                  </div>
                  <div className="w-[50%]">
                    <FormInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword?.message}
                      disabled={false}
                    />
                  </div>
                </div>

                <div className="w-[50%]">
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
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="px-4 py-2 borde cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-green-600  cursor-pointer rounded-lg text-white hover:bg-green-700"
                  >
                    {isPending ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
