import { APIClient } from "./Http";
export interface NotificationProps {
  id: string; // Unique identifier for the notification
  user_id: number; // ID of the user who owns the notification
  title: string; // Title of the notification
  message: string; // Message content of the notification
  is_read: boolean; // Read status (true if the notification is read)
  date: string;
  target_id: string;
  type?: string // Timestamp when the notification was created
}

export const NotificationApiClient = new APIClient<Notification>(
  "/notification"
);

export const markAsReadApiClient = new APIClient<Notification>(
  "/notifications"
);
