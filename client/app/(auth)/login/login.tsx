"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Modal from "../../components/common/modal";
import { useContextAPI } from "@/app/_lib/context/contextAPI";
import { useAuth, SignIn } from "@clerk/nextjs";
import { loginUser } from "@/app/_lib/services/userService";
import { X, Shield } from "lucide-react";

export default function LoginPage() {
  const { isLogin, setIsLogin, setTokenState,setIsSignUp } = useContextAPI();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn && userId) {
      handleClerkLogin();
    }
  }, [isSignedIn, userId]);

  const handleClerkLogin = async () => {
    try {
      const response = await fetch("/api/clerk/user");
      const clerkUser = await response.json();

      if (!response.ok) throw new Error(clerkUser.error || "Unauthorized");

      const loginData = {
        email: clerkUser.emailAddresses[0].emailAddress,
        password: "clerk_user_" + userId,
      };

      const result = await loginUser(loginData);
      setSuccessMsg("Login successful!");
      localStorage.setItem("token", result.token);
      setTokenState(result.token);
      setTimeout(() => setIsLogin(false), 2000);
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMsg("Login failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <>
      {isLogin && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center p-2">
            <Head>
              <title>Chemnitz Culture Places | Login</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto rounded-xl shadow-xl p-6 bg-white w-full max-w-3xl">
              <div className="flex justify-end">
                <button
                  onClick={() =>  {setIsLogin((prev: boolean) => !prev)
                      setIsSignUp((prev: boolean) => !prev)}}
                  className="text-gray-500 hover:bg-gray-200 p-1 rounded"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
              {errorMsg && (
                <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-green-600 text-sm mb-4 text-center">{successMsg}</p>
              )}

              <div className="bg-gray-50 rounded-lg p-6">
                <SignIn
                 routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "text-lg font-semibold text-gray-800",
                      headerSubtitle: "text-gray-500 text-sm",
                      formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
                      footerActionLink: "text-green-600 hover:text-green-700",
                      formFieldInput: "border border-gray-300 rounded-md",
                      formFieldLabel: "text-gray-700 font-medium",
                    },
                  }}
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm cursor-point">
                  Don't have an account?{" "}
                  <button
                    className="text-green-600 hover:text-green-700 font-medium"
                    onClick={() =>  {setIsLogin((prev: boolean) => !prev)
                                          setIsSignUp((prev: boolean) => !prev)}}
                  >
                    Sign up here
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
