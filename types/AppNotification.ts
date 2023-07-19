export type AppNotificationType =
  | "Error"
  | "Warning"
  | "Informational"
  | "Success"
  | "Debug";

export interface AppNotification {
  uniqueId: string;
  title: string;
  titleBold?: boolean;
  description?: string;
  extraInformation?: string;
  notificationType: AppNotificationType;
  dismissable?: boolean;
  dismissAfterSecs?: number;
  hasBorder?: boolean;
  hasIcon?: boolean;
}

export type AppNotifications = AppNotification[];
