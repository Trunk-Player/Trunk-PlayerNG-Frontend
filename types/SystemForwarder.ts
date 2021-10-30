export interface SystemForwarder {
  uuid: string;
  name: string;
  feedKey: string;
  webhook: string;
}

export type SystemForwarders = SystemForwarder[];
