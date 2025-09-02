"use client";

import { useEffect, useState } from "react";
import { api } from "@/service/api"; 
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PostCard from "../components/PostCard/PostCard";
import { toast } from "sonner";
import { AxiosError } from "axios";
import withAuth from './../../utility/WithAuth';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
    email: string;
    _id:string
  };
  likes: string[];
}
interface ErrorResponse {
  message: string;
  code?: number;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/post",{headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }});
        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch posts");
        }
      } catch (error) {
        console.error('Error creating post:', error);
         const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Create Post Failed");
      console.error(axiosError);
        setLoading(false)
      }finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex justify-center items-center">
        {/* Animated background for loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
          <div className="relative">
            {/* Enhanced loading spinner */}
            <div className="w-16 h-16 border-4 border-violet-200 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-4 w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-violet-600 font-semibold text-lg">Loading Posts</p>
            <p className="text-gray-500 text-sm">Fetching the latest content...</p>
          </div>
          {/* Animated dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden flex justify-center items-center">
        {/* Animated background for error */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        
        <div className="relative z-10 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl text-center max-w-md mx-4">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-red-600 font-bold text-xl mb-2">Oops! Something went wrong</h2>
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen relative overflow-hidden py-6 sm:py-10">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200 to-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-300 to-purple-300 rounded-3xl blur opacity-30"></div>
              <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent px-8 py-4">
                ✨ Community Posts
              </h1>
            </div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Discover amazing content from our vibrant community. Share your thoughts, connect with others, and explore diverse perspectives.
            </p>
            
            {/* Stats or decorative elements */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-violet-200 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span className="text-violet-600 font-medium text-sm">{posts.length} Posts</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-purple-200 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-600 font-medium text-sm">Live Feed</span>
              </div>
            </div>
          </div>

          {/* Posts Grid/List */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                <p className="text-gray-500">Be the first to share something amazing with the community!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {posts.map((post, index) => (
                <div 
                  key={post._id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}

          {/* Floating Action Elements */}
          <div className="fixed bottom-8 right-8 hidden lg:block">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <button className="relative w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <span className="text-2xl">↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-200/20 to-transparent rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-bl-full"></div>
      </div>
  );
}



export default withAuth(Posts)