import { useMemo } from "react";
import fetcher from "@/utils/fetcher";
import useSWRImmutable from "swr/immutable";

import type { ResponseTalkgroupsList } from "@/types/api/responses/ResponseTalkgroupsList";

export interface TalkgroupsDataHookConfig {
  pageIndex?: number;
  resultsLimit?: number;
  systemUUID?: string;
}

export const useTalkgroupsData = ({
  pageIndex,
  resultsLimit,
  systemUUID,
}: TalkgroupsDataHookConfig) => {
  const talkgroupListUrl = useMemo(
    () =>
      `/radio/talkgroup/list?${
        pageIndex && resultsLimit ? `offset=${pageIndex * resultsLimit}&` : ""
      }ordering=decimal_id&limit=${resultsLimit}${
        systemUUID ? `&system__UUID=${systemUUID}` : ""
      }`,
    [pageIndex, systemUUID, resultsLimit]
  );
  const { data, mutate, error } = useSWRImmutable<ResponseTalkgroupsList>(
    talkgroupListUrl,
    fetcher
  );

  return {
    data,
    mutate,
    error,
  };
};
