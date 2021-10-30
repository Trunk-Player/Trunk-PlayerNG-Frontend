export interface GlobalEmailTemplate {
  uuid: string;
  name: string;
  type: "welcome" | "alert";
  enabled: boolean;
  html: string;
}

export type GlobalEmailTemplates = GlobalEmailTemplate[];
