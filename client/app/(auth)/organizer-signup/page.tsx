"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/common/modal";
import FormInput from "../../components/common/input";
import { organizerSignup } from "../../_lib/services/organizerService";
import { useContextAPI } from "../../_lib/context/contextAPI";
import { X, Building2, Mail, Lock, User, Hash } from "lucide-react";

export default function OrganizerSignupPage() {
  const router = useRouter();
  const { setTokenState } = useContextAPI();
  const [isOpen, setIsOpen] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    taxId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organizationName: formData.organizationName,
        taxId: formData.taxId || undefined,
      };

      const result = await organizerSignup(signupData);
      setSuccessMsg("Registration successful!");
      localStorage.setItem("organizerToken", result.token);
      setTokenState(result.token);
      
      setTimeout(() => {
        setIsOpen(false);
        router.push("/organizer/dashboard");
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center p-2 bg-black bg-opacity-50">
            <div className="mx-auto rounded-xl shadow-xl p-6 bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-green-600" />
                  <h1 className="text-xl font-semibold text-gray-800">
                    Organizer Registration
                  </h1>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:bg-gray-200 p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <p className="text-red-600 text-sm mb-4 text-center bg-red-50 p-2 rounded">
                  {errorMsg}
                </p>
              )}
              {successMsg && (
                <p className="text-green-600 text-sm mb-4 text-center bg-green-50 p-2 rounded">
                  {successMsg}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  type="text"
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />

                <FormInput
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  icon={<Mail className="w-4 h-4 text-gray-400" />}
                />

                <FormInput
                  type="text"
                  label="Organization Name"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  required
                  icon={<Building2 className="w-4 h-4 text-gray-400" />}
                />

                <FormInput
                  type="text"
                  label="Tax ID (Optional)"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="Enter tax ID (optional)"
                  icon={<Hash className="w-4 h-4 text-gray-400" />}
                />

                <FormInput
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password (min 6 characters)"
                  required
                />

                <FormInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Already have an organizer account?{" "}
                  <button
                    className="text-green-600 hover:text-green-700 font-medium"
                    onClick={() => router.push("/organizer-login")}
                  >
                    Login here
                  </button>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  className="text-gray-500 hover:text-gray-700 text-sm"
                  onClick={() => router.push("/")}
                >
                  Back to main site
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
} 