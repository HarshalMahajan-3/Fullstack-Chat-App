import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore'

const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)
  const { theme } = useThemeStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='min-h-screen pt-19'>
      <div className="max-w-[650px] mx-auto p-4 py-1">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className='text-2xl font-semibold'>
              {(authUser?.fullName?.split(" ")[0] ?? "profile") + "'s Profile"}
            </h1>
          </div>

          {/* avatar section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="profile"
                className='size-32 rounded-full object-cover border overflow-hidden'
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className={`w-5 h-5 ${theme === "luxury" ? "text-black" : "text-white"}`} />
                <input type='file' id='avatar-upload' className='hidden' accept='image/*' onChange={handleImageUpload} disabled={isUpdatingProfile} />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading..." : ""}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className='w-4 h-4 ml-1' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg'>{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className='w-4 h-4 ml-1' />
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg'>{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-4 bg-base-300 rounded-xl p-4">
            <h2 className='text-lg font-medium mb-4 text-zinc-400'>Account Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Joined Since</span>
                <span className='text-[0.85rem]'>
                  {authUser?.createdAt
                    ? new Date(authUser.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    : "Loading..."}
                </span>

              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className='text-green-400'>• Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
