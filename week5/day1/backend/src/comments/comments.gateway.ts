import { 
  ConnectedSocket, 
  MessageBody, 
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage, 
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { Logger } from '@nestjs/common';

interface CreateCommentDto {
  text: string;
  user?: string;
}

export interface Comment {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  socketId: string;
}

export interface Notification {
  message: string;
  comment: Comment;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: '/', 
})
export class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(CommentsGateway.name);
  private comments: Comment[] = [];
  private connectedClients = new Map<string, { socketId: string; userId?: string }>();

  // Handle new comment submission
  @SubscribeMessage('new_comment')
  async handleNewComment(
    @MessageBody() data: CreateCommentDto, 
    @ConnectedSocket() client: Socket
  ) {
    try {
      this.logger.log(`Comment received from client ${client.id}:`, data);
      if (!data || typeof data.text !== 'string') {
        throw new Error('Invalid comment data');
      }

      const trimmedText = data.text.trim();
      
      if (trimmedText.length < 4) {
        throw new Error('Comment must be at least 4 characters long');
      }
      
      if (trimmedText.length > 99) {
        throw new Error('Comment must be less than 100 characters long');
      }

      const newComment: Comment = {
        id: this.generateId(),
        text: trimmedText,
        user: data.user || `User-${client.id.slice(0, 6)}`,
        timestamp: new Date(),
        socketId: client.id,
      };

      // Store the comment
      this.comments.push(newComment);
      this.logger.log(`Total comments: ${this.comments.length}`);

      // Emit the new comment to all clients
      this.server.emit('comment', newComment);

      // Send notification to all OTHER clients (not the sender)
      const notification: Notification = {
        message: 'New comment posted',
        comment: newComment,
        timestamp: new Date(),
      };

      client.broadcast.emit('notification', notification);

      // Acknowledge successful submission to sender
      client.emit('comment_posted', { 
        success: true, 
        comment: newComment 
      });

    } catch (error) {
      this.logger.error(`Error handling comment from ${client.id}:`, error);
      
      client.emit('comment_error', {
        success: false,
        message: error.message || 'Failed to post comment',
        timestamp: new Date(),
      });
      
      throw new WsException('Failed to process comment');
    }
  }

  // Handle request for comments history
  @SubscribeMessage('get_comments_history')
  handleGetCommentsHistory(@ConnectedSocket() client: Socket) {
    try {
      this.logger.log(`Comments history requested by client ${client.id}`);
      
      // Send history only to the requesting client
      client.emit('comments_history', {
        comments: this.comments,
        total: this.comments.length,
        timestamp: new Date(),
      });
      
    } catch (error) {
      this.logger.error(`Error sending comments history to ${client.id}:`, error);
      
      client.emit('comments_history_error', {
        success: false,
        message: 'Failed to load comments history',
        timestamp: new Date(),
      });
    }
  }

  // Handle client connection
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    // Store client info
    this.connectedClients.set(client.id, {
      socketId: client.id,
    });

    // Send welcome message to the specific client
    client.emit('connection_established', {
      message: 'Successfully connected to comments server',
      clientId: client.id,
      timestamp: new Date(),
    });

    // Log current connection count
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
  }

  // Handle client disconnection
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Remove client from tracking
    this.connectedClients.delete(client.id);
    
    // Log current connection count
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
  }

  // Utility method to generate unique IDs
  private generateId(): string {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Optional: Method to get comments count (for health checks)
  @SubscribeMessage('get_stats')
  handleGetStats(@ConnectedSocket() client: Socket) {
    const stats = {
      totalComments: this.comments.length,
      connectedClients: this.connectedClients.size,
      timestamp: new Date(),
    };
    
    client.emit('stats', stats);
    this.logger.log(`Stats requested by ${client.id}:`, stats);
  }

  @SubscribeMessage('clear_comments')
  handleClearComments(@ConnectedSocket() client: Socket) {

    const previousCount = this.comments.length;
    this.comments = [];
    
    this.server.emit('comments_cleared', {
      message: `All comments cleared (${previousCount} comments removed)`,
      timestamp: new Date(),
    });
    
    this.logger.log(`Comments cleared by ${client.id}. Removed ${previousCount} comments`);
  }
}