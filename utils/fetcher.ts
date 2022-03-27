import Axios from "utils/axios";

const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
export const fetcherResults = (url: string) =>
  Axios.get(url).then((res) => res.data.results);

export default fetcher;
