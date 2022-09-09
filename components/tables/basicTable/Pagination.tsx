import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import GoToPageModal from "./GoToPageModal";
import Page from "./Page";

interface PaginationProps {
  currentPage: number;
  count: number;
  limit: number;
  pagesToShow: number;
  pagesToShowLeft: number;
  pagesToShowRight: number;
  // eslint-disable-next-line no-unused-vars
  onGoToPage: (page: number) => void;
  onScrollToTopOfTable: () => void;
}

const Pagination = ({
  currentPage,
  count,
  limit,
  pagesToShow,
  pagesToShowLeft,
  pagesToShowRight,
  onGoToPage,
  onScrollToTopOfTable,
}: PaginationProps) => {
  const [goToPageModalOpen, setGoToPageModalOpen] = useState(false);
  const totalPages =
    (count / limit) % limit === 0 ? count / limit : Math.ceil(count / limit);

  const goToPage = (page: number) => {
    onGoToPage(page);
    onScrollToTopOfTable();
  };

  const closeGoToPageModal = () => setGoToPageModalOpen(false);
  const openGoToPageModal = () => setGoToPageModalOpen(true);

  const Separator = () => (
    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
      ...
    </span>
  );

  const PageInformation = () => (
    <div>
      <p className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-medium">{currentPage * limit - limit + 1}</span>{" "}
        to{" "}
        <span className="font-medium">
          {currentPage === totalPages ? count : currentPage * limit}
        </span>{" "}
        of <span className="font-medium">{count}</span> results (
        <button
          className="font-medium underline"
          onClick={() => {
            openGoToPageModal();
          }}
        >
          Go to page
        </button>
        )
      </p>
    </div>
  );

  return (
    <>
      <GoToPageModal
        currentPage={currentPage}
        maxPages={totalPages}
        isOpen={goToPageModalOpen}
        onClose={closeGoToPageModal}
        onGoToPage={goToPage}
      />
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden items-center">
          {currentPage > 1 ? (
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => goToPage(currentPage - 1)}
            >
              Previous
            </button>
          ) : (
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-gray-100 text-gray-300 cursor-default">
              Previous
            </span>
          )}
          <PageInformation />
          {currentPage < totalPages ? (
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          ) : (
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-gray-100 text-gray-300 cursor-default">
              Next
            </span>
          )}
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <PageInformation />
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {currentPage > 1 ? (
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-200 cursor-default">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              )}
              {totalPages > pagesToShow &&
                currentPage > pagesToShowLeft + 1 && (
                  <>
                    <Page
                      pageNumber={1}
                      active={currentPage === 1}
                      onGoToPage={goToPage}
                    />
                    {currentPage > pagesToShowLeft + 2 && <Separator />}
                  </>
                )}
              {totalPages <= pagesToShow &&
                [...Array(totalPages)].map((_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    active={currentPage === i + 1}
                    onGoToPage={goToPage}
                  />
                ))}
              {totalPages > pagesToShow &&
                currentPage <= pagesToShowLeft + 1 && (
                  <>
                    {[...Array(pagesToShow)].map((_, i) => (
                      <Page
                        key={i + 1}
                        pageNumber={i + 1}
                        active={currentPage === i + 1}
                        onGoToPage={goToPage}
                      />
                    ))}
                  </>
                )}
              {totalPages > pagesToShow &&
                currentPage > pagesToShowLeft + 1 && (
                  <>
                    {[...Array(pagesToShowLeft)].map((_, i) => {
                      const iCorrected = i + 1;

                      return (
                        <Page
                          key={(currentPage - i - 2 - currentPage) * -1}
                          title={iCorrected}
                          pageNumber={currentPage + i - pagesToShowLeft}
                          active={
                            currentPage ===
                            (currentPage - i - 2 - currentPage) * -1
                          }
                          onGoToPage={goToPage}
                        />
                      );
                    })}
                    <Page
                      pageNumber={currentPage}
                      active={true}
                      onGoToPage={goToPage}
                    />
                  </>
                )}
              {totalPages > pagesToShow &&
                !(currentPage <= pagesToShowLeft + 1) &&
                currentPage < totalPages - pagesToShowRight && (
                  <>
                    {[...Array(pagesToShowRight)].map((_, i) => (
                      <Page
                        key={currentPage + i + 1}
                        pageNumber={currentPage + i + 1}
                        active={currentPage === currentPage + i + 1}
                        onGoToPage={goToPage}
                      />
                    ))}
                  </>
                )}
              {totalPages > pagesToShow &&
                currentPage < totalPages &&
                currentPage > totalPages - pagesToShowRight - 1 && (
                  <>
                    {[...Array(totalPages - currentPage)].map((_, i) => (
                      <Page
                        key={currentPage + i + 1}
                        pageNumber={currentPage + i + 1}
                        active={currentPage === currentPage + i + 1}
                        onGoToPage={goToPage}
                      />
                    ))}
                  </>
                )}
              {totalPages > pagesToShow &&
                currentPage < totalPages - pagesToShowRight && (
                  <>
                    {currentPage < totalPages - pagesToShowRight - 1 && (
                      <Separator />
                    )}
                    <Page
                      pageNumber={totalPages}
                      active={false}
                      onGoToPage={goToPage}
                    />
                  </>
                )}
              {currentPage < totalPages ? (
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-200 cursor-default">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
