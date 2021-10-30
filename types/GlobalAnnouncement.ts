export interface GlobalAnnouncement {
  uuid: string;
  name: String;
  enabled: boolean;
  description: string;
}

export type GlobalAnnouncements = GlobalAnnouncement[];
