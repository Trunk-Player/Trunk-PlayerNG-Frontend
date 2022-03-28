import Axios from "utils/axios";

const fetcher = (url: string) => Axios.get(url).then((res) => res.data);

export default fetcher;
