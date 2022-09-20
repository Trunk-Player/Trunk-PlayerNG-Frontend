import { useMemo, useState } from "react";
import fetcher from "@/utils/fetcher";
import useSWRImmutable from "swr/immutable";
import { tgListResultsLimit as resultsLimit } from "@/config/systemDetailsPageConsts";

import type { ResponseTalkgroupsList } from "@/types/api/responses/ResponseTalkgroupsList";

export interface TalkgroupsDataHookConfig {
  systemUUID?: string;
  initialTgListPageIndex?: number;
}

export const useTalkgroupsData = (
  initialPageIndex = 0,
  uuid: string | undefined
) => {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  const talkgroupListUrl = useMemo(
    () =>
      `/radio/talkgroup/list?${
        pageIndex && resultsLimit ? `offset=${pageIndex * resultsLimit}&` : ""
      }ordering=decimal_id&limit=${resultsLimit}${
        uuid ? `&system__UUID=${uuid}` : ""
      }`,
    [pageIndex, uuid]
  );

  const { data, mutate, error } = useSWRImmutable<ResponseTalkgroupsList>(
    talkgroupListUrl,
    fetcher
  );

  const onPageIndexChange = (index: number) => {
    setPageIndex(index);
  };

  return {
    data,
    mutate,
    error,
    pageIndex,
    onPageIndexChange,
  };
};
