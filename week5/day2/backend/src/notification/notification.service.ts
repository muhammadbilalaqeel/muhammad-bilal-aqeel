import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  async createNotification(recipientId: string, commentId: string, message: string) {
    const notification = new this.notificationModel({ recipient: recipientId, comment: commentId, message });
    return await notification.save();
  }

  async getUnreadNotifications(userId: string) {
    return this.notificationModel.find({ recipient: userId, read: false }).lean();
  }

  async markAsRead(notificationId: string) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }
}
