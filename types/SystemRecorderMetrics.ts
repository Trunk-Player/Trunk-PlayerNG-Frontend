import { Calls } from "./Call";
import { SystemReceiveRates } from "./SystemReceiveRate";
import { SystemRecorder } from "./SystemRecorder";

export interface SystemRecorderMetrics {
  uuid: string;
  systemRecorder: SystemRecorder;
  rates: SystemReceiveRates;
  calls: Calls;
}
