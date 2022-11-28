export interface SocketTransmissionParent {
  uuid: string[];
  type: "talkgroup" | "scanlist" | "scanner";
}

export type SocketTransmissionParents = SocketTransmissionParent[];

export interface SocketTransmission {
  uuid: string;
  parents: SocketTransmissionParents;
}
