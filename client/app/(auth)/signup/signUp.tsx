"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { X } from "lucide-react";
import Modal from "@/app/components/common/modal";
import { useContextAPI } from "@/app/_lib/context/contextAPI";
import { signupUser } from "@/app/_lib/services/userService";
import { SignUp } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function SignupForm() {
  const { isSignUp, setIsSignUp,setIsLogin } = useContextAPI();
  const [errorMsg, setErrorMsg] = useState("");
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn && userId) {
      handleClerkSignup();
    }
  }, [isSignedIn, userId]);

  const handleClerkSignup = async () => {
    try {
      const response = await fetch("/api/clerk/user");
      const clerkUser = await response.json();

      const userData = {
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        password: "clerk_user_" + userId,
        lat: 0,
        lng: 0,
        location: "Location not set",
        clerkId: userId,
      };

      await signupUser(userData as any);
    } catch (error: any) {
      setErrorMsg("Failed to sync with backend: " + error.message);
    }
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
            <div className="mx-auto rounded-xl shadow-xl p-6 bg-white w-full max-w-3xl">
              <div className="flex justify-end">
                <button
                  className="text-gray-500 cursor-pointer hover:bg-gray-200 rounded-sm p-1"
                  onClick={() => {
                      setIsLogin((prev: boolean) => !prev)
                      setIsSignUp((prev: boolean) => !prev)
                    }}
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
              {errorMsg && (
                <p className="text-red-600 text-sm mb-4 text-center">
                  {errorMsg}
                </p>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <SignUp
                  routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "text-lg font-semibold text-gray-800",
                      headerSubtitle: "text-gray-500 text-sm",
                      formButtonPrimary:
                        "bg-green-600 hover:bg-green-700 text-white",
                      footerActionLink:
                        "text-green-600 hover:text-green-700",
                      formFieldInput: "border border-gray-300 rounded-md",
                      formFieldLabel: "text-gray-700 font-medium",
                    },
                  }}
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm cursor-point">
                  Already have an account?{" "}
                  <button
                    className="text-green-600 hover:text-green-700 font-medium"
                    onClick={() => {
                      setIsLogin((prev: boolean) => !prev)
                      setIsSignUp((prev: boolean) => !prev)
                    }}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
