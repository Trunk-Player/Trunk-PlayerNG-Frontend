export interface APIBaseResults<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T;
}
