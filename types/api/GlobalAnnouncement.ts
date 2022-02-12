export interface GlobalAnnouncement {
  UUID: string;
  name: string;
  enabled: boolean;
  description: string;
}

export type GlobalAnnouncements = GlobalAnnouncement[];
