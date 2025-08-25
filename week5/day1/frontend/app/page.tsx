"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import socket from "@/utils/socket";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  socketId: string;
}

interface Notification {
  message: string;
  comment: Comment;
  timestamp: Date;
}

interface CommentsHistoryResponse {
  comments: Comment[];
  total: number;
  timestamp: Date;
}

export default function Home() {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Connection handlers
    const handleConnect = () => {
      setIsConnected(true);
      console.log("Connected to server");
      // Request comments history after connection
      socket.emit("get_comments_history");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    };

    const handleConnectionEstablished = (data: any) => {
      console.log("Connection established:", data);
      toast.success("Connected to server");
    };

    // Comments handlers
    const handleCommentsHistory = (data: CommentsHistoryResponse | Comment[]) => {
      console.log("Received history:", data);
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments(data.comments || []);
      }
    };

    const handleNewComment = (newComment: Comment) => {
      setComments((prev) => [...prev, newComment]);
      console.log("New comment:", newComment);
    };

    const handleCommentPosted = (data: { success: true; comment: Comment }) => {
      console.log("Comment posted successfully:", data);
      setIsLoading(false);
      toast.success("Comment posted!");
    };

    const handleCommentError = (error: { success: false; message: string }) => {
      console.error("Comment error:", error);
      setIsLoading(false);
      toast.error(error.message || "Failed to post comment");
    };

    const handleNotification = (data: Notification) => {
      toast(data?.message, {
        description: `"${data?.comment.text}" - by ${data?.comment.user}`,
      });
    };

    const handleError = (error: any) => {
      console.error("Socket error:", error);
      toast.error("Connection error occurred");
    };

    // Socket connection events
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connection_established", handleConnectionEstablished);
    
    // Comments events
    socket.on("comments_history", handleCommentsHistory);
    socket.on("comment", handleNewComment);
    socket.on("comment_posted", handleCommentPosted);
    socket.on("comment_error", handleCommentError);
    socket.on("notification", handleNotification);
    socket.on("error", handleError);

    // Check if already connected
    if (socket.connected) {
      handleConnect();
    }

    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connection_established", handleConnectionEstablished);
      socket.off("comments_history", handleCommentsHistory);
      socket.off("comment", handleNewComment);
      socket.off("comment_posted", handleCommentPosted);
      socket.off("comment_error", handleCommentError);
      socket.off("notification", handleNotification);
      socket.off("error", handleError);
    };
  }, []);

  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Not connected to server");
      return;
    }

    const trimmedComment = comment.trim();
    
    if (trimmedComment === "") {
      toast.error("Comment is required");
      return;
    }
    if (trimmedComment.length <= 3) {
      toast.error("Comment should be at least 4 characters");
      return;
    }
    if (trimmedComment.length >= 100) {
      toast.error("Comment should be less than 100 characters");
      return;
    }

    setIsLoading(true);
    
    try {
    
      const newCmnt = {
        text: trimmedComment,
       
      };

      socket.emit("new_comment", newCmnt);
      setComment(""); // Clear input immediately
    } catch (error) {
      console.error("Error sending comment:", error);
      toast.error("Failed to send comment");
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: Date | string) => {
    try {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      return date.toLocaleString();
    } catch {
      return "Unknown time";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE]">
      <div className="max-w-[1440px] mx-auto flex justify-center py-10">
        <Card className="w-[480px] px-4">
          {/* Connection Status */}
          <div className="mb-2 flex justify-between items-center text-xs">
            <span className={`${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
            <span className="text-gray-500">
              {comments.length} comments
            </span>
          </div>

          {/* Post Section */}
          <div>
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                <AvatarImage src="/images/user.png" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold">Bilal</h3>
                <p className="text-sm text-gray-600">3 hours ago</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <p>Beautiful Mountain!</p>
              <div className="rounded-xl overflow-hidden">
                <img src="/images/mountain.png" alt="Beautiful mountain landscape" />
              </div>
            </div>
            <Separator className="my-2" />
          </div>

          {/* Comment Form */}
          <form onSubmit={sendComment} className="flex flex-col gap-2">
            <Textarea
              placeholder="Write a comment (4-99 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading || !isConnected}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {comment.length}/99 characters
              </span>
              <Button 
                type="submit" 
                disabled={isLoading || !isConnected || comment.trim().length === 0}
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>

          {/* Comments Section */}
          <Accordion type="single" collapsible className="w-full mt-4">
            {comments?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                {isConnected ? "No comments yet" : "Loading comments..."}
              </p>
            ) : (
              comments?.map((c) => (
                <AccordionItem key={c.id || c.text} value={c.id || c.text}>
                  <AccordionTrigger>
                    <div className="flex gap-2 items-center">
                      <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                        <AvatarImage src="/images/user.png" />
                        <AvatarFallback>
                          {c.user ? c.user.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <h2 className="text-gray-800 font-semibold">
                          {c.user || 'User'}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {c.timestamp ? formatTimestamp(c.timestamp) : 'Just now'}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-1">
                    <div className="pl-10">
                      {c.text}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}