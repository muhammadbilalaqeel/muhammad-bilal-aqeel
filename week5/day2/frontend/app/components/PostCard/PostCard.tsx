"use client"
import { Post } from "@/app/posts/page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { api } from "@/service/api";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa6";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/hooks/useSocket";
import { toast } from "sonner";
import TipTapEditor from "../Editor/TipTapEditor";
import TipTapContentDisplay from "../Editor/TipTapContentDisplay";
import { AxiosError } from "axios";

type PostCardProps = {
  post: Post
}
interface Comment {
  _id: string;
  author: { username: string; _id: string };
  comment: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  parentComment: string | null;
  postId: string;
  replies: Comment[];
}

export interface PostComment {
  comment: string
}

export default function PostCard({ post }: PostCardProps) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [open, setOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [postData, setPostData] = useState<Post>(post); 

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const socket = useSocket(token);
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comment/all/${post._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostLikes = async (id: string) => {
    try {
      const res = await api.post(`/post/${id}/toggle-like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setPostData(res.data); 
    } catch (error) {
      console.error(error);
    }
  };

const {  handleSubmit, reset, control } = useForm<PostComment>();
const { handleSubmit: handleReplySubmit, reset: resetReply, control: replyControl } = useForm<PostComment>();

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
  if (!socket) return;

  socket.on("newComment", () => {
    toast.info('New Comment Arrived');
    fetchComments();
  });

  socket.on('commentSuccess',(data)=>{
    toast.success(data.message)
    console.log(data)
  })

  socket.on('newNotification',(notificaion)=>{
    console.log(notificaion)
  })

       // Real-time notifications
     socket.on("notification", (notification) => {
       toast.info(notification.message, { id: notification._id || notification.message });
       fetchComments()
     });

  // socket.on("replyComment", (data) => {
  //   console.log("📩 new reply:", data);
  //   fetchComments();
  // });

  // socket.on("likeComment", (data) => {
  //   console.log("👍 like update:", data);
  //   fetchComments();
  // });

  return () => {
    socket.off("newComment");
    // socket.off("replyComment");
    // socket.off("likeComment");
    socket.off('notification')
  };
}, [socket]);
interface ErrorResponse {
  message: string;
  code?: number;
}

  const onSubmit: SubmitHandler<PostComment> = async (data) => {
    setLoading(true);
    try {
      await api.post(`/comment`, { postId: post._id, comment: data.comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setLoading(false);
      reset();
      socket?.emit("newComment", {comment : data.comment})
      setOpen(false);
      fetchComments();
    }catch (error) {
        console.error('Error creating post:', error);
         const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Create Post Failed");
      console.error(axiosError);
        setLoading(false)
      }
  };

  const onReplySubmit = async (comment: Comment, data: PostComment) => {
    const {_id} = comment;
    // const {_id : authorId} = author
    setLoading(true);
    try {
      await api.post(`/comment/${_id}/replies`, { comment: data.comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setLoading(false);
      resetReply();
      socket?.emit('reply_comment')
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
            console.error('Error creating post:', error);
             const axiosError = error as AxiosError<ErrorResponse>;
          toast.error(axiosError.response?.data?.message || "Create Post Failed");
          console.error(axiosError);
            setLoading(false)
          }
  };

  const handleLike = async (commentId: string) => {
    try {
      await api.post(`/comment/${commentId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      fetchComments();
    } catch (error) {
        console.error('Error creating post:', error);
         const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Create Post Failed");
      console.error(axiosError);
        setLoading(false)
      }
  };
    const userData = localStorage.getItem('userData');
    const currentUser = userData ? JSON.parse(userData) : null
  const route = useRouter()

  const handleLink = ()=>{

     if(currentUser.username === post.author.username){
        route.push('/profile')
     }
     else{
        route.push(`/profile/${post.author.username}`)
     }
  }

  return (
    <div className="relative group">
      {/* Decorative background elements */}
      <div className="absolute -inset-2 bg-gradient-to-r from-violet-300 to-purple-300 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      
      <Card className="relative backdrop-blur-sm bg-white/90 border border-white/60 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>
        
        <CardHeader className="relative">
          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
            {postData.title}
          </CardTitle>
          <CardDescription 
            onClick={handleLink}
            className="cursor-pointer text-gray-600 hover:text-violet-500 transition-colors duration-300 font-medium inline-flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            @{postData?.author?.username}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <div className="bg-gradient-to-r from-violet-50/50 to-purple-50/50 rounded-2xl p-4 sm:p-6 border border-violet-100/50">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {postData.content}
            </p>
          </div>
        </CardContent>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <CardFooter className="flex flex-wrap gap-4 sm:gap-7 justify-center sm:justify-start bg-gradient-to-r from-violet-50/30 to-purple-50/30">
            {/* Like Section */}
            <div className="group/like cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-violet-200/50 hover:border-violet-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-300 hover:scale-105">
                <CiHeart 
                  className="text-xl sm:text-2xl text-violet-500 hover:text-red-500 transition-colors duration-300" 
                  onClick={() => handlePostLikes(postData._id)} 
                />
                <p className="font-semibold text-violet-600 text-sm sm:text-base">
                  {postData.likes.length}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <DropdownMenuTrigger asChild>
              <div className="group/comment cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-purple-200/50 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105">
                  <FaCommentDots className="text-xl sm:text-2xl text-purple-500 group-hover/comment:text-indigo-500 transition-colors duration-300" />
                  <p className="font-semibold text-purple-600 text-sm sm:text-base">
                    {comments.length}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>

            {/* Comments Dropdown */}
            <DropdownMenuContent className="w-[280px] sm:w-[400px] md:w-[450px] lg:w-[500px] ml-2 sm:ml-10 p-3 sm:p-5 backdrop-blur-xl bg-white/95 border border-white/60 rounded-3xl shadow-2xl">
              {/* Comment Input */}
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="relative group/form"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-300 to-purple-300 rounded-3xl blur opacity-30 group-focus-within/form:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-3xl border border-violet-200/50 focus-within:border-violet-400 transition-all duration-300">
                  <div className="flex flex-col gap-1 w-full">
                    <Controller
  name="comment"
  control={control} 
  rules={{ required: "Comment is required" }}
  render={({ field, fieldState }) => (
    <>
      <TipTapEditor
        value={field.value}
        onChange={field.onChange}
        placeholder="Share your thoughts..."
        className="bg-gray-50 rounded-2xl p-3 border border-violet-200/50 min-h-[80px]"
      />
      {fieldState.error && (
        <p className="text-red-500 text-xs">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                  >
                    <IoMdSend className="text-lg sm:text-xl" />
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {comments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((comment) => (
                    <div key={comment._id} className="relative group/comment-item">
                      <div className="bg-gradient-to-r from-violet-50/50 to-purple-50/50 rounded-2xl p-3 sm:p-4 border border-violet-100/50 hover:border-violet-200 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                            <p className="font-semibold text-violet-600 text-sm sm:text-base">
                              {comment.author.username}
                            </p>
                          </div>
                          {/* Comment Like */}
                          <button
                            onClick={() => handleLike(comment._id)}
                            className="flex items-center gap-1 text-gray-600 hover:text-red-500 px-2 py-1 rounded-full hover:bg-red-50 transition-all duration-300"
                          >
                            <CiHeart className="text-lg" />
                            <span className="text-xs sm:text-sm font-medium">
                              {comment.likes.length}
                            </span>
                          </button>
                        </div>
                       <TipTapContentDisplay content={comment.comment} className="text-gray-700 text-sm sm:text-base leading-relaxed" />


                        {/* Replies Section */}
                        <Accordion type="single" collapsible className="mt-3">
                          <AccordionItem value="reply" className="border-none">
                            <AccordionTrigger 
                              onClick={() => setReplyingTo(comment._id)}
                              className="hover:no-underline py-2 px-3 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 text-sm"
                            >
                              <span className="flex items-center gap-2">
                                💬 Reply ({comment.replies.length})
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-3">
                              {replyingTo === comment._id && (
                                <form
                                  onSubmit={handleReplySubmit((data) => onReplySubmit(comment, data))}
                                  className="relative group/reply mb-3"
                                >
                                  <div className="flex gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-2 rounded-2xl border border-indigo-200/50">
                                    <div className="flex flex-col gap-1 w-full">
 <Controller
  name="comment"
  control={replyControl}  
  rules={{ required: "Reply is required" }}
  render={({ field, fieldState }) => (
    <>
      <TipTapEditor
        value={field.value}
        onChange={field.onChange}
        placeholder="Write a reply..."
        className="bg-indigo-50 rounded-2xl p-2 border border-indigo-200/50 min-h-[60px]"
      />
      {fieldState.error && (
        <p className="text-red-500 text-xs">{fieldState.error.message}</p>
      )}
    </>
  )}
/>

                                    </div>
                                    <button 
                                      type="submit" 
                                      disabled={loading}
                                      className="p-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                                    >
                                      <IoMdSend className="text-sm" />
                                    </button>
                                  </div>
                                </form>
                              )}

                              {/* Replies List */}
                              {comment.replies.length > 0 && (
                                <div className="pl-4 border-l-2 border-gradient-to-b from-violet-300 to-purple-300 ml-2 space-y-2">
                                  {comment.replies
                                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                    .map((reply) => (
                                      <div key={reply._id} className="bg-white/80 rounded-xl p-3 border border-violet-100/50">
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                          <p className="font-semibold text-purple-600 text-sm">
                                            {reply.author.username}
                                          </p>
                                        </div>
                                        <TipTapContentDisplay content={reply.comment} className="text-gray-700 text-sm sm:text-base leading-relaxed" />

                                      </div>
                                    ))}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  ))}
              </div>
            </DropdownMenuContent>
          </CardFooter>
        </DropdownMenu>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-violet-200/30 to-transparent rounded-tl-3xl"></div>
      </Card>
    </div>
  );
}