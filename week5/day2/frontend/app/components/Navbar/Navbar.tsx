"use client";


import { useState, useEffect } from "react";
import { Menu, X, User, Home, PlusCircle,  LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  followers: string[]; // assuming they are user IDs
  following: string[]; // assuming they are user IDs
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { currentUser, isAuthenticated,setCurrentUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    router.push("/auth/login");
  };
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
// const [currentUser, setCurrentUser] = useState<User | null>(null);





  const navigationItems = currentUser !== null ? [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Create', href: '/addpost', icon: PlusCircle },
    { name: 'Profile', href: '/profile', icon: User },
  ] : [];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/90 border-b border-white/60 shadow-2xl' 
          : 'backdrop-blur-sm bg-white/70 border-b border-white/40'
      }`}>
        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>
        
        {/* Floating gradient orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push('/')}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg sm:text-xl">✨</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  SocialHub
                </h1>
                <p className="text-xs text-gray-500">Connect & Share</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navigationItems?.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className="group relative px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                    <div className="relative flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-violet-600 group-hover:text-purple-600 transition-colors duration-300" />
                      <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Section - Search, Notifications, User */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Search Button */}
              {/* <button className="group relative p-2 sm:p-3 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Search className="relative w-5 h-5 text-violet-600 group-hover:text-purple-600 transition-colors duration-300" />
              </button> */}

              {/* Notifications */}
              {/* <button className="group relative p-2 sm:p-3 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Bell className="relative w-5 h-5 text-violet-600 group-hover:text-purple-600 transition-colors duration-300" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">{notifications}</span>
                  </div>
                )}
              </button> */}

              {/* User Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg">
                      {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                      {currentUser?.username || 'User'}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 backdrop-blur-xl bg-white/95 border border-white/60 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-300 group/item"
                    >
                      <User className="w-4 h-4 text-violet-600 group-hover/item:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-purple-600">Profile</span>
                    </button>
                    <div className="h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 group/item"
                    >
                      <LogOut className="w-4 h-4 text-red-500 group-hover/item:text-red-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden group relative p-2 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isOpen ? (
                  <X className="relative w-6 h-6 text-violet-600" />
                ) : (
                  <Menu className="relative w-6 h-6 text-violet-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="backdrop-blur-xl bg-white/95 border-t border-white/40">
            <div className="px-4 py-6 space-y-2">
              {navigationItems?.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className="w-full group flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-violet-600 group-hover:text-purple-600 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.name === 'Home' && 'View all posts'}
                        {item.name === 'Create' && 'Share your thoughts'}
                        {item.name === 'Profile' && 'Your account'}
                      </p>
                    </div>
                  </button>
                );
              })}
              
              {/* Mobile Logout */}
              <div className="pt-4 border-t border-gradient-to-r from-transparent via-violet-200 to-transparent">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full group flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-600 group-hover:text-red-700 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                      Logout
                    </p>
                    <p className="text-xs text-gray-500">Sign out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
}