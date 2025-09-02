import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './notifications.gateway';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private notificationsGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = new this.notificationModel(createNotificationDto);
    const savedNotification = await notification.save();

    // Send real-time notification
    this.notificationsGateway.sendNotificationToUser(
      createNotificationDto.recipient,
      savedNotification,
    );

    return savedNotification;
  }

  async notifyAllUsers(data: { type: string; message: string; relatedComment?: string }) {
    const users = await this.usersService.findAll();
    
    // Create notifications for all users
    const notifications = await Promise.all(
      users.map(user =>
        this.notificationModel.create({
          recipient: user._id,
          type: data.type,
          message: data.message,
          relatedComment: data.relatedComment,
        }),
      ),
    );

    // Send real-time notification to all connected users
    this.notificationsGateway.sendNotificationToAll({
      type: data.type,
      message: data.message,
      relatedComment: data.relatedComment,
    });

    return notifications;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ recipient: userId })
      .populate('relatedComment')
      .sort({ createdAt: -1 })
      .exec();
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.notificationModel.findByIdAndUpdate(notificationId, { read: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationModel.updateMany(
      { recipient: userId, read: false },
      { read: true },
    );
  }
}