"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOrganizerProfile } from "../../_lib/services/organizerService";
import { useContextAPI } from "../../_lib/context/contextAPI";
import { Building2, Calendar, MapPin, User, LogOut, Plus } from "lucide-react";

export default function OrganizerDashboard() {
  const router = useRouter();
  const { token } = useContextAPI();
  const [organizer, setOrganizer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/organizer-login");
  //     return;
  //   }

  //   fetchOrganizerProfile();
  // }, [token]);

  const fetchOrganizerProfile = async () => {
    try {
      const result = await getOrganizerProfile(token);
      setOrganizer(result.organizer);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      router.push("/organizer-login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("organizerToken");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Organizer Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {organizer?.name}!
              </h2>
              <p className="text-gray-600">
                Manage your events and organization details
              </p>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Organization Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{organizer?.organizationName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">{organizer?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{organizer?.email}</p>
                </div>
              </div>
              {organizer?.taxId && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Tax ID</p>
                    <p className="font-medium">{organizer?.taxId}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verification Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  organizer?.isVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {organizer?.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">
                  {new Date(organizer?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition duration-200">
              <Plus className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Create Event</p>
                <p className="text-sm text-gray-600">Add a new event</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition duration-200">
              <Calendar className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">My Events</p>
                <p className="text-sm text-gray-600">View all events</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition duration-200">
              <User className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-600">Update information</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 