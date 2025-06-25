"use client";
import { useState } from "react";
import Head from "next/head";
import Modal from "../../common/modal";
import { useContextAPI } from "@/app/context/contextAPI";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/services/userService";
import FormInput from "../../common/input";
import { LoginFormData, LoginFormValidate } from "@/app/validation/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};
export default function LoginPage() {
  const { isLogin, setIsLogin,setTokenState } = useContextAPI();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormValidate),
    defaultValues,
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setSuccessMsg("Login successfully!");
      console.log("data==>", data);
      reset();
      localStorage.setItem("token",data.token)
      setTokenState(data.token)
      setTimeout(() => {
        setIsLogin(false);
      }, 2000);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Something went wrong");
    },
  });

  const onSubmit = (data: LoginFormData) => {
   mutate(data);
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
            <div className="mx-auto rounded-xl shadow-xl p-4 bg-white w-full max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-gray-500 hover:bg-gray-200 p-1 rounded hover:cursor-pointer"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">Login</h2>
              <p className="text-gray-600 mb-4">
                Enter your credentials to log in.
              </p>

              {isError && (
                <p className="text-red-600 text-sm mb-2">{errorMsg}</p>
              )}
              {isSuccess && (
                <p className="text-green-600 text-sm mb-2">{successMsg}</p>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4 w-full">
                  <FormInput
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    error={errors.email?.message}
                    disabled={false}
                  />
                </div>

                <div className="mb-4">
                  <FormInput
                    label="Password"
                    type="password"
                    placeholder="Create password"
                    {...register("password")}
                    error={errors.password?.message}
                    disabled={false}
                  />
                </div>
            <div>
                  <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-green-600 mt-2 hover:bg-green-700 hover:cursor-pointer text-white py-2 px-4 rounded-lg transition"
                >
                  {isPending ? "Logging in..." : "Login"}
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
