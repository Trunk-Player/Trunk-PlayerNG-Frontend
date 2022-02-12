export interface TransmissionFreq {
  UUID: string;
  time: string; // actual type is a date
  freq: number;
  pos: number;
  len: number;
  error_count: number;
  spike_count: number;
}

export type TransmissionFreqs = TransmissionFreq;
