import Head from "next/head";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import fetcher from "utils/fetcher";
import PageContentContainer from "components/PageContentContainer";
import TalkgroupsList from "components/radio/TalkgroupsList";

import type { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";

const resultsLimit = 100; // Number of results to show
const pagesToShowLeft = 3; // Total pages numbers to show on the left of current page
const pagesToShowRight = 3; // Total pages numbers to show on the right of current page
const pagesToShow = pagesToShowLeft + 1 + pagesToShowRight; // Pages on the left, current page, pages on the right (does not count previous/next or first/last page numbers)

const TalkgroupsListPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWRImmutable<ResponseTalkgroupsList>(
    `/radio/talkgroup/list?offset=${
      pageIndex * resultsLimit
    }&ordering=decimal_id&limit=${resultsLimit}`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Talk Groups - Trunk-Player</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Talk Groups
            </h2>
            <TalkgroupsList
              scrollToTopOfPageOnChange={true}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              talkgroupsAPIData={data}
              talkgroupsAPIError={error}
              resultsLimit={resultsLimit}
              pagesToShow={pagesToShow}
              pagesToShowLeft={pagesToShowLeft}
              pagesToShowRight={pagesToShowRight}
            />
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default TalkgroupsListPage;
