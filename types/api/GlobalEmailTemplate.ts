export interface GlobalEmailTemplate {
  UUID: string;
  name: string;
  type: "welcome" | "alert";
  enabled: boolean;
  HTML: string;
}
export type GlobalEmailTemplates = GlobalEmailTemplate[];
