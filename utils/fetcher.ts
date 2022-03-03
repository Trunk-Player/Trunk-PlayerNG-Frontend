import { getAccessToken } from "lib/auth/authentication";
import Axios from "utils/axios";

const fetcher = (url: string) =>
  Axios.get(url, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  }).then((res) => res.data);

export default fetcher;
