"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Send, Edit3 } from 'lucide-react';
import { api } from '@/service/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSocket } from '../hooks/useSocket';
import { AxiosError } from 'axios';
import withAuth from './../../utility/WithAuth';
interface ErrorResponse {
  message: string;
  code?: number;
}

interface PostFormData {
  title: string;
  content: string;
}

function AddPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<PostFormData>({
    mode: 'onChange'
  });
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const socket = useSocket(token);
  const watchedTitle = watch('title', '');
  const watchedContent = watch('content', '');
  const router = useRouter()
  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
       const res = await api.post('/post/create',data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
      
      console.log('Post data:', res.data);
      setSubmitSuccess(true);
      socket?.emit('post_added',res.data.title)
      reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      router.push('/')
    } catch (error) {
      console.error('Error creating post:', error);
       const axiosError = error as AxiosError<ErrorResponse>;
    toast.error(axiosError.response?.data?.message || "Create Post Failed");
    console.error(axiosError);

    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated background for success */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        
        <div className="relative z-10 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-green-600 font-semibold text-lg">Post Created Successfully!</p>
          <p className="text-gray-500 mt-2">Your post has been published</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-10">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200 to-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <Card className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 group">
          <CardContent className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-20"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Edit3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Create New Post
              </h1>
              <p className="text-gray-500">Share your thoughts with the world</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title
                </label>
                <div className="relative">
                  <input
                    {...register('title', {
                      required: 'Title is required',
                      minLength: {
                        value: 5,
                        message: 'Title must be at least 5 characters long'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Title must not exceed 50 characters'
                      }
                    })}
                    type="text"
                    placeholder="Enter your post title..."
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm
                      ${errors.title 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                      }
                      hover:border-violet-300 focus:outline-none`}
                  />
                  <div className="absolute top-3 right-3 text-xs text-gray-400">
                    {watchedTitle.length}/50
                  </div>
                </div>
                {errors.title && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.title.message}
                  </div>
                )}
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Content
                </label>
                <div className="relative">
                  <textarea
                    {...register('content', {
                      required: 'Content is required',
                      minLength: {
                        value: 10,
                        message: 'Content must be at least 10 characters long'
                      },
                      maxLength: {
                        value: 150,
                        message: 'Content must not exceed 150 characters'
                      }
                    })}
                    placeholder="What's on your mind?"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none
                      ${errors.content 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                      }
                      hover:border-violet-300 focus:outline-none`}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {watchedContent.length}/150
                  </div>
                </div>
                {errors.content && (
                  <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.content.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl
                    hover:from-violet-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Post...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Create Post
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}


export default withAuth(AddPostPage)