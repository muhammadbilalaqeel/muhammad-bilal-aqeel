export interface Notification {
  _id: string;
  recipient: string; 
  commentId: string;
  postId: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}