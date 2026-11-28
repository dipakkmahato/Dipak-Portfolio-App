import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiFileText,
  FiAlignLeft,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiCamera,
  FiSave,
  FiCheckCircle,
  FiShare2,
} from "react-icons/fi";

let defaultProfileData = {
  name: "",
  phone: "",
  whatsappNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  title: "",
  intro: "",
  description: "",
  github: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  youtube: "",
};

const fallbackAvatar =
  "https://tse4.mm.bing.net/th/id/OIP.RmTxQdp0yknT8necOZnM9AHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);

  const [profileData, setProfileData] = useState(defaultProfileData);
  const [previousUserData, setPreviousUserData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewPic, setPreviewPic] = useState(fallbackAvatar);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  // Update form state when the selected user changes.
  if (userData && userData !== previousUserData) {
    setPreviousUserData(userData);
    setProfileData({
      name: userData.name || "",
      phone: userData.phone || "",
      whatsappNumber: userData.whatsappNumber || "",
      address: userData.address || "",
      city: userData.city || "",
      state: userData.state || "",
      country: userData.country || "",
      title: userData.title || "",
      intro: userData.intro || "",
      description: userData.description || "",
      github: userData.github || "",
      linkedin: userData.linkedin || "",
      instagram: userData.instagram || "",
      facebook: userData.facebook || "",
      twitter: userData.twitter || "",
      youtube: userData.youtube || "",
    });

    setIsAvailable(Boolean(userData.isAvailable));

    if (userData.profilePic) {
      setPreviewPic(userData.profilePic);
    }
  }

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewPic && previewPic.startsWith("blob:")) {
        URL.revokeObjectURL(previewPic);
      }
    };
  }, [previewPic]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle availability checkbox
  const handleCheckboxChange = (event) => {
    setIsAvailable(event.target.checked);
  };

  // Handle profile image selection
  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (previewPic && previewPic.startsWith("blob:")) {
      URL.revokeObjectURL(previewPic);
    }

    const fileUrl = URL.createObjectURL(file);

    setProfilePic(file);
    setPreviewPic(fileUrl);
  };

  // Submit profile form
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!serverUrl) {
      toast.error("Server URL is missing. Check your .env file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      formData.append("isAvailable", String(isAvailable));

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success(
          response.data.message || "Profile updated successfully!"
        );
        //console.log("update profile:", response.data.user);
      } else {
        toast.error(response?.data?.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none";

  const labelClass =
    "mb-1.5 block text-xs font-medium tracking-wide text-slate-300 uppercase";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 text-slate-100">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur-md sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-medium text-indigo-300">
            <FiUser className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Portfolio Identity</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Profile Settings
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage your personal details, bio, availability, and social links.
          </p>
        </div>

        {/* Live Availability Badge */}
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
            isAvailable
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-slate-700 bg-slate-800/80 text-slate-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-emerald-400" : "bg-slate-500"
            }`}
          />
          <span>{isAvailable ? "Available for Work" : "Currently Unavailable"}</span>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Avatar & Availability Card */}
        <section className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 sm:p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Avatar + Upload */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <img
                  src={previewPic}
                  alt="Profile preview"
                 className="h-24 w-24 rounded-lg border-2 border-indigo-500/40 object-cover shadow-lg shadow-indigo-950/60 sm:h-28 sm:w-28"
                />
                <label
                  htmlFor="profile-pic-input"
                  title="Change profile photo"
                  className="absolute right-0 bottom-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-600 text-white shadow-md transition-transform hover:bg-indigo-500 active:scale-95"
                >
                  <FiCamera className="h-4 w-4" aria-hidden="true" />
                </label>
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="sr-only"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-base font-semibold text-white">
                  Profile Picture
                </h3>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Upload a clear square photo (JPG, PNG, or WebP).
                </p>
                <label
                  htmlFor="profile-pic-input"
                  className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-indigo-500/50 hover:bg-slate-800"
                >
                  <FiCamera className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                  <span>Choose Image</span>
                </label>
              </div>
            </div>

            {/* Availability Toggle Card */}
            <label
              htmlFor="is-available-checkbox"
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700 sm:w-auto sm:min-w-64"
            >
              <div className="flex items-start gap-3">
                <FiCheckCircle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isAvailable ? "text-emerald-400" : "text-slate-500"
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-sm font-medium text-white">
                    Open to Work
                  </span>
                  <span className="block text-xs text-slate-400">
                    Show availability status on portfolio
                  </span>
                </div>
              </div>

              <input
                id="is-available-checkbox"
                type="checkbox"
                checked={isAvailable}
                onChange={handleCheckboxChange}
                className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-600 bg-slate-900 text-indigo-600 focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-slate-950"
              />
            </label>
          </div>
        </section>

        {/* Personal & Location Information */}
        <section className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5 border-b border-slate-800 pb-3.5">
            <FiMapPin className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-white">
              Personal &amp; Location Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Name */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="profile-name" className={labelClass}>
                Full Name
              </label>
              <div className="relative">
                <FiUser
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={profileData.name}
                  placeholder="Full Name"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="profile-phone" className={labelClass}>
                Phone Number
              </label>
              <div className="relative">
                <FiPhone
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-phone"
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="profile-whatsapp" className={labelClass}>
                WhatsApp Number
              </label>
              <div className="relative">
                <FiMessageCircle
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-whatsapp"
                  type="text"
                  name="whatsappNumber"
                  value={profileData.whatsappNumber}
                  placeholder="WhatsApp Number"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="profile-address" className={labelClass}>
                Street Address
              </label>
              <div className="relative">
                <FiMapPin
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-address"
                  type="text"
                  name="address"
                  value={profileData.address}
                  placeholder="Street / Ward / Area"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="profile-city" className={labelClass}>
                City
              </label>
              <div className="relative">
                <FiMapPin
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-city"
                  type="text"
                  name="city"
                  value={profileData.city}
                  placeholder="City"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* State */}
            <div>
              <label htmlFor="profile-state" className={labelClass}>
                State / Province
              </label>
              <div className="relative">
                <FiGlobe
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-state"
                  type="text"
                  name="state"
                  value={profileData.state}
                  placeholder="State / Province"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="profile-country" className={labelClass}>
                Country
              </label>
              <div className="relative">
                <FiGlobe
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-country"
                  type="text"
                  name="country"
                  value={profileData.country}
                  placeholder="Country"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5 border-b border-slate-800 pb-3.5">
            <FiBriefcase className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-white">
              Professional Bio
            </h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title */}
              <div>
                <label htmlFor="profile-title" className={labelClass}>
                  Role / Headline
                </label>
                <div className="relative">
                  <FiBriefcase
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="profile-title"
                    type="text"
                    name="title"
                    value={profileData.title}
                    placeholder="e.g. Full-Stack Developer"
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Intro */}
              <div>
                <label htmlFor="profile-intro" className={labelClass}>
                  Short Intro
                </label>
                <div className="relative">
                  <FiFileText
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="profile-intro"
                    type="text"
                    name="intro"
                    value={profileData.intro}
                    placeholder="One-line hero summary"
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="profile-description" className={labelClass}>
                Detailed Description
              </label>
              <div className="relative">
                <FiAlignLeft
                  className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 text-slate-500"
                  aria-hidden="true"
                />
                <textarea
                  id="profile-description"
                  name="description"
                  rows={4}
                  value={profileData.description}
                  placeholder="Write a detailed bio about your experience, stack, and goals..."
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-950/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-lg shadow-black/20 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5 border-b border-slate-800 pb-3.5">
            <FiShare2 className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-white">
              Social &amp; Coding Profiles
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* GitHub */}
            <div>
              <label htmlFor="profile-github" className={labelClass}>
                GitHub
              </label>
              <div className="relative">
                <FiGithub
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-github"
                  type="text"
                  name="github"
                  value={profileData.github}
                  placeholder="https://github.com/username"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="profile-linkedin" className={labelClass}>
                LinkedIn
              </label>
              <div className="relative">
                <FiLinkedin
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-linkedin"
                  type="text"
                  name="linkedin"
                  value={profileData.linkedin}
                  placeholder="https://linkedin.com/in/username"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label htmlFor="profile-instagram" className={labelClass}>
                Instagram
              </label>
              <div className="relative">
                <FiInstagram
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-instagram"
                  type="text"
                  name="instagram"
                  value={profileData.instagram}
                  placeholder="https://instagram.com/username"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Facebook */}
            <div>
              <label htmlFor="profile-facebook" className={labelClass}>
                Facebook
              </label>
              <div className="relative">
                <FiFacebook
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-facebook"
                  type="text"
                  name="facebook"
                  value={profileData.facebook}
                  placeholder="https://facebook.com/username"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Twitter */}
            <div>
              <label htmlFor="profile-twitter" className={labelClass}>
                Twitter / X
              </label>
              <div className="relative">
                <FiTwitter
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-twitter"
                  type="text"
                  name="twitter"
                  value={profileData.twitter}
                  placeholder="https://x.com/username"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label htmlFor="profile-youtube" className={labelClass}>
                YouTube
              </label>
              <div className="relative">
                <FiYoutube
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="profile-youtube"
                  type="text"
                  name="youtube"
                  value={profileData.youtube}
                  placeholder="https://youtube.com/@channel"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Submit Action Bar */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition-all duration-150 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <FiSave className="h-4 w-4" aria-hidden="true" />
            <span>{loading ? "Updating..." : "Update Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;