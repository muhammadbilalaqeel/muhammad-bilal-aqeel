export class CreateNotificationDto {
  recipient: string;
  type: string;
  message: string;
  relatedComment?: string;
}