import { ScanList } from "./ScanList";

export interface GlobalScanList {
  uuid: string;
  scanList: ScanList;
  name: string;
  enabled: boolean;
}

export type GlobalScanLists = GlobalScanList[];
