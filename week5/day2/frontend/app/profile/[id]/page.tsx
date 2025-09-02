"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { api } from "@/service/api";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";
import withAuth from './../../../utility/WithAuth';

interface Profile {
  _id: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  createdAt: string;
}
interface ErrorResponse {
  message: string;
  code?: number;
}


function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleToggleFollow = async ()=>{
    try {
      const res = await api.post('/auth/toggle-follow')
    } catch (error) {
      
    }
  }
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("userData");
        const currentUser = storedUser ? JSON.parse(storedUser) : null;
        if(currentUser?.username === params.id){
            router.push('/profile')
        }
        const res = await api.get(`/auth/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.data;
        setProfile(data);
        const currentUserId = localStorage.getItem("userId");
        if (data?.followers && Array.isArray(data.followers)) {
          if (currentUserId && data.followers.includes(currentUserId)) {
            setIsFollowing(true);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [params.id,router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
        {/* Animated background for loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-violet-500" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-violet-200 animate-pulse"></div>
          </div>
          <p className="text-violet-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
        {/* Animated background for error */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        
        <div className="relative z-10 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">😔</span>
          </div>
          <p className="text-red-500 font-semibold text-lg">No profile found</p>
          <p className="text-gray-500 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  console.log(profile)
  
  return (
   
      <div className="min-h-screen relative overflow-hidden py-10">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200 to-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <Card className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 group">
          <CardContent className="flex flex-col items-center space-y-6">
            {/* Profile Header */}
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                User Profile
              </h1>
              <p className="text-gray-500">Connect and explore</p>
            </div>

            {/* Avatar with enhanced styling */}
            <div className="relative group/avatar">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-20 group-hover/avatar:opacity-40 transition-opacity duration-300"></div>
              <Avatar className="relative w-32 h-32 border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                <AvatarImage src={profile.profilePicture || undefined} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                  {profile?.username ? profile.username[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full animate-pulse"></div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 hover:text-violet-600 transition-colors duration-300">
                {profile.username}
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full border border-violet-200">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <p className="text-violet-600 font-medium">{profile.email}</p>
              </div>
            </div>

            <Separator className="w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent opacity-50" />

            {/* Bio Section */}
            <div className="w-full text-center space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">About</h3>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
                <p className="text-gray-700 leading-relaxed">
                  {profile.bio || "✨ No bio added yet."}
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <button
              className={`relative overflow-hidden px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                isFollowing
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {isFollowing ? "Following" : "Follow"}
              </span>
            </button>

            {/* Stats Section */}
            <div className="flex gap-8 mt-8">
              <div className="text-center group/stat cursor-pointer">
                <div className="bg-gradient-to-br from-violet-500 to-purple-500 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <p className="text-2xl font-bold">{profile.followers?.length || 0}</p>
                  <p className="text-violet-100 text-sm font-medium">Followers</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="text-center group/stat cursor-pointer">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <p className="text-2xl font-bold">{profile.following?.length || 0}</p>
                  <p className="text-purple-100 text-sm font-medium">Following</p>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </CardContent>
        </Card>
      </div>
    </div>
   
  );
}


export default withAuth(ProfilePage)