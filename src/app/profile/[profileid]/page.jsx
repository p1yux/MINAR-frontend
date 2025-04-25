"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useProfile } from "@/providers/ProfileProvider";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";

// Format date for display (from YYYY-MM-DD to more readable format)
const formatDateForDisplay = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};

const ProfilePage = () => {
  const params = useParams();
  const profileId = params.profileid;
  const { data: profile, isLoading } = useProfile();
  const { updateProfile, isLoading: isUpdating } = useUpdateProfile(profileId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    is_newsletter_interested: false,
  });

  // Initialize form data when profile is loaded
  React.useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        date_of_birth: profile.date_of_birth || "",
        is_newsletter_interested: profile.is_newsletter_interested || false,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateProfileData = () => {
    const profileSchema = z.object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email format"),
      phone_number: z.string().optional().nullable(),
      date_of_birth: z.string().optional().nullable(),
      is_newsletter_interested: z.boolean(),
    });

    try {
      profileSchema.parse(formData);
      return true;
    } catch (error) {
      error.errors.forEach((err) => {
        toast.error(err.message);
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileData()) return;

    // Prepare data for API - exclude email as it's not updateable
    const updateData = { ...formData };
    delete updateData.email;
    
    // Date validation - ensure it's in YYYY-MM-DD format
    if (updateData.date_of_birth) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(updateData.date_of_birth)) {
        try {
          // Try to convert to proper format
          const date = new Date(updateData.date_of_birth);
          if (!isNaN(date.getTime())) {
            updateData.date_of_birth = date.toISOString().split('T')[0];
          } else {
            toast.error("Invalid date format. Please use YYYY-MM-DD format.");
            return;
          }
        } catch (e) {
          toast.error("Invalid date format. Please use YYYY-MM-DD format.");
          return;
        }
      }
    }
    
    updateProfile(updateData, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-center text-red-500">Profile not found or you&apos;re not authorized to view this profile</p>
        </div>
      </div>
    );
  }

  // Check if the user is allowed to edit this profile
  const isCurrentUserProfile = profile.id.toString() === profileId;

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gray-100">
            <div className="absolute bottom-0 left-6 transform translate-y-1/2">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                {profile.first_name ? (
                  <span className="text-3xl font-bold text-gray-700">
                    {profile.first_name.charAt(0)}
                    {profile.last_name?.charAt(0)}
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-gray-700">
                    {profile.email.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            {isCurrentUserProfile && (
              <div className="absolute bottom-4 right-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  disabled={isUpdating}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile.first_name
                ? `${profile.first_name} ${profile.last_name}`
                : profile.email.split("@")[0]}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{profile.email}</p>

            <div className="mt-8">
              {isEditing && isCurrentUserProfile ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-100"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_newsletter_interested"
                        name="is_newsletter_interested"
                        checked={formData.is_newsletter_interested}
                        onChange={handleChange}
                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor="is_newsletter_interested" className="ml-2 block text-sm text-gray-700">
                        Subscribe to newsletter
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                      <p className="mt-1">{profile.first_name || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                      <p className="mt-1">{profile.last_name || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1">{profile.email}</p>
                      <p className="text-xs text-green-500 mt-1">
                        {profile.email_verified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1">{profile.phone_number || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                      <p className="mt-1">{formatDateForDisplay(profile.date_of_birth)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Age</h3>
                      <p className="mt-1">{profile.age || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Newsletter</h3>
                      <p className="mt-1">
                        {profile.is_newsletter_interested ? "Subscribed" : "Not subscribed"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
