"use client";
import React from "react";
import { useContextAPI } from "../context/contextAPI";
import LoginPage from "../(auth)/login/login";
import SignupForm from "../(auth)/signup/signUp";
import ProfileUpdate from "../(auth)/profile/profile";

function common() {
  const { isLogin, isSignUp, isProfile } = useContextAPI();
  return (
    <>
      {isLogin && <LoginPage />}
      {isSignUp && <SignupForm />}
      {isProfile && <ProfileUpdate />}
    </>
  );
}

export default common;
