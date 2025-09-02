// notification.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from './notification.service';
import { createCommentDto } from 'src/comment/dto/create-comment.dto';
import { Comment } from 'src/comment/comment.schema';
import { Body } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>(); // userId -> socketId

  constructor(private jwtService: JwtService, private notificationService: NotificationService) {}

    // 🔹 Event: New Comment
  @SubscribeMessage('newComment')
  handleNewComment(client: Socket, payload: any) {
  
    client.broadcast.emit('commentAdded', {
      message: 'A new comment arrived!',
      data: payload,
    });

   
    client.emit('commentSuccess', {
      message: 'Comment submitted successfully',
      data: payload,
    });
  }

   @SubscribeMessage('like_post')
  async handleLikeOnPost(
    @MessageBody() data : {comment : string},
    @ConnectedSocket() client : Socket
  ){
    const newComment  = data.comment;
    client.broadcast.emit('comment',newComment)
    client.emit('comment_posted', { 
        success: true, 
        comment: newComment 
      });
  }

   @SubscribeMessage('like_comment')
  async handleLikeOnComment(
    @MessageBody() data : {comment : string},
    @ConnectedSocket() client : Socket
  ){
    const newComment  = data.comment;
    client.broadcast.emit('comment',newComment)
    client.emit('comment_posted', { 
        success: true, 
        comment: newComment 
      });
  }

   @SubscribeMessage('reply_comment')
  async handlereplyComment(
    @MessageBody() data : {comment : string},
    @ConnectedSocket() client : Socket
  ){
    const newComment  = data.comment;
    client.broadcast.emit('comment',newComment)
    client.emit('comment_posted', { 
        success: true, 
        comment: newComment 
      });
  }
  @SubscribeMessage('post_added')
  async handlePostAdded(
    @MessageBody() data : {title:string},
    @ConnectedSocket() client:Socket
  ){
    client.broadcast.emit('post',data);
  }

  async handleConnection(client: Socket) {
  try {
    let token: string | undefined;

    if (client.handshake.query?.token) token = client.handshake.query.token as string;
    else if (client.handshake.headers?.authorization) token = (client.handshake.headers.authorization as string).split(" ")[1];

    if (!token) return client.disconnect();

    const payload: any = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    console.log(payload)
    console.log('✅ User connected:', payload.sub, 'SocketID:', client.id);

    this.onlineUsers.set(payload.sub, client.id); // make sure it's a string

    console.log('🔹 Online users map:', this.onlineUsers);

    const notifications = await this.notificationService.getUnreadNotifications(payload.userId);
    client.emit('offlineNotifications', notifications);
  } catch (err) {
    client.disconnect();
  }
}


  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) this.onlineUsers.delete(userId);
    }
  }
notifyUser(userId: string, message: string,id ?: string) {
  console.log('hello')
    const socketId = this.onlineUsers.get(userId);
    console.log(socketId)
    if (socketId) {
      this.server.to(socketId).emit('notification', { message });
    }
  }
  sendNotification(userId: string, notification: any) {
    const socketId = this.onlineUsers.get(userId);
    if (socketId) this.server.to(socketId).emit('newNotification', notification);
  }
}
