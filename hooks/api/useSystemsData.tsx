import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import type { ResponseSystemsList } from "@/types/api/responses/ResponseSystemsList";

export const useSystemsData = () => {
  return useSWR<ResponseSystemsList>("/radio/system/list", fetcher);
};
