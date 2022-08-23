import useSWR, { SWRConfiguration } from "swr";
import fetcher from "@/utils/fetcher";

import type { ResponseSystemsList } from "@/types/api/responses/ResponseSystemsList";

export const useSystemsData = (
  config: SWRConfiguration | undefined = undefined
) => {
  return useSWR<ResponseSystemsList>("/radio/system/list", fetcher, config);
};
