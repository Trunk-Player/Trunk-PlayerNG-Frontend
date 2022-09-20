import useSWR, { SWRConfiguration } from "swr";
import fetcher from "@/utils/fetcher";

import type { ResponseSystemsList } from "@/types/api/responses/ResponseSystemsList";
import type { System } from "@/types/api/System";
import type { ParsedUrlQuery } from "@/types/ParsedUrlQuery";

export const useSystemsData = (
  config: SWRConfiguration | undefined = undefined
) => {
  return useSWR<ResponseSystemsList>("/radio/system/list", fetcher, config);
};

export const useSystemData = (
  UUID: ParsedUrlQuery,
  config: SWRConfiguration | undefined = undefined
) => {
  const { data, error, mutate } = useSWR<System>(
    typeof UUID === "string" ? `/radio/system/${UUID}` : undefined,
    fetcher,
    config
  );
  const onRefreshSystem = () => {
    mutate();
  };

  return { data, error, onRefreshSystem };
};
