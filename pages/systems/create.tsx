import Head from "next/head";
import { useWizardSteps } from "@/hooks/components/useWizardSteps";
import { useCreateSystemData } from "@/hooks/pages/useCreateSystemData";
import { getWizardItemState } from "@/utils/components/wizardHeaderUtils";

import PageContentContainer from "@/components/PageContentContainer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BasicCard from "@/components/cards";
import WizardHeadingSteps from "@/components/wizards/WizardHeadingSteps";
import Button from "@/components/controls/Button";
import Textbox from "@/components/controls/Textbox";

import type { BreadCrumbItems } from "@/types/components/BreadCrumbItem";
import type { WizardHeaderItems } from "@/types/components/WizardHeaderItem";

const CreateSystemPage = () => {
  const { systemName, changeSystemName } = useCreateSystemData();
  const { currentStep, nextStep, previousStep, canGoNext, canGoPrevious } =
    useWizardSteps({
      maxSteps: 3,
      startingStep: 1,
    });

  const crumbs: BreadCrumbItems = [
    { name: "Systems", href: "/systems", current: false },
    { name: "Create New System", current: true },
  ];

  const headerItems: WizardHeaderItems = [
    {
      name: "Name",
      state: getWizardItemState(1, currentStep),
    },
    {
      name: "Details",
      state: getWizardItemState(2, currentStep),
    },
    {
      name: "Talk Groups (Optional)",
      state: getWizardItemState(3, currentStep),
    },
  ];

  return (
    <>
      <Head>
        <title>Create New System - Trunk-Player</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Breadcrumbs items={crumbs} />
            </div>
            {/* Change Below */}
            <BasicCard className="py-1">
              <WizardHeadingSteps
                items={headerItems}
                className="flex justify-center items-center"
              />
              {currentStep === 1 && (
                <>
                  <div className="mt-10 flex justify-center items-center text-2xl font-medium">
                    What do you want to call this system?
                  </div>
                  <div className="mt-5 flex justify-center items-center">
                    <Textbox
                      className="w-96"
                      placeholder="System Name"
                      value={systemName}
                      onChange={(e) => {
                        changeSystemName(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
              <div className="flex justify-around mt-10">
                <Button
                  enabled={canGoPrevious}
                  onClick={previousStep}
                >
                  Previous
                </Button>
                {canGoNext ? (
                  <Button onClick={nextStep}>Next</Button>
                ) : (
                  <Button>Finish</Button>
                )}
              </div>
              {/* <div className="mt-8 px-6 md:hidden block">
                  <div className="dropdown-one w-full rounded outline-none bg-gray-100 border border-gray-200 relative mt-2">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        showDropDownMenu_from_layout_wizard8(event.target);
                      }}
                      className="dropbtn-one relative px-5 py-[12px] flex items-center justify-between w-full"
                    >
                      <span
                        className="pr-4 text-gray-600 text-sm font-bold"
                        id="drop-down-content-setter_from_layout_wizard8"
                      >
                        Personal Information
                      </span>
                      <svg
                        width={12}
                        height={8}
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.06216 1.9393L5.43028 7.0368C5.50069 7.11892 5.58803 7.18484 5.68631 7.23003C5.78459 7.27522 5.89148 7.29862 5.99966 7.29862C6.10783 7.29862 6.21472 7.27522 6.313 7.23003C6.41128 7.18484 6.49862 7.11892 6.56903 7.0368L10.9372 1.9393C11.354 1.45273 11.0084 0.701172 10.3678 0.701172H1.63028C0.989656 0.701172 0.644031 1.45273 1.06216 1.9393Z"
                          fill="#1F2937"
                        />
                      </svg>
                    </button>
                    <div
                      className="hidden rounded w-full px-3 py-2 absolute top-16 right-0 bg-white shadow-lg"
                      id="drop-down-div_from_layout_wizard8"
                    >
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          text(event.target);
                        }}
                        className="hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 p-3 hover:font-bold hover:cursor-default"
                      >
                        <a
                          href="javascript:void(0)"
                          className="cursor-default"
                        >
                          <p className="text-sm leading-none">
                            Account Settings
                          </p>
                        </a>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          text(event.target);
                        }}
                        className="hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 p-3 hover:font-bold"
                      >
                        <a
                          href="javascript:void(0)"
                          className="cursor-default"
                        >
                          <p className="text-sm leading-none">
                            Business Information
                          </p>
                        </a>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          text(event.target);
                        }}
                        className="hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 p-3 hover:font-bold"
                      >
                        <a
                          href="javascript:void(0)"
                          className="cursor-default"
                        >
                          <p className="text-sm leading-none">
                            Billing Details
                          </p>
                        </a>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          text(event.target);
                        }}
                        className="hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 p-3 hover:font-bold"
                      >
                        <a
                          href="javascript:void(0)"
                          className="cursor-default"
                        >
                          <p className="text-sm leading-none">Finished</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/*  */}
              {/* <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-between lg:px-14 md:px-6 px-4 mt-16 w-full">
                <div className="text">
                  <div className="w-full lg:mt-0 mt-6">
                    <p className="text-base text-gray-800">Portfolio Link</p>
                    <input
                      type="text"
                      name
                      id
                      placeholder="Enter behance, dribbble etc portfolio link"
                      className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none border border-gray-300 lg:min-w-[540px] w-full py-3 px-3 rounded mt-4"
                    />
                  </div>
                  <div className>
                    <div className="mt-10">
                      <p className="text-base text-gray-800">Name</p>
                      <input
                        type="text"
                        name
                        id
                        placeholder="Enter your name"
                        className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none border border-gray-300 lg:min-w-[540px] w-full py-3 px-3 rounded mt-4"
                      />
                    </div>
                  </div>
                  <div className="lg:flex md:flex block gap-8 lg:mt-10 md:mt-6 mt-4">
                    <div className="w-full">
                      <p className="text-base text-gray-800">Date of birth</p>
                      <div className="flex justify-between border-gray-300 lg:min-w-[250px] w-full py-3 px-3 rounded mt-4 border cursor-pointer">
                        <input
                          type="date"
                          name
                          id
                          placeholder="Select date"
                          className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none w-full cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="lg:mt-0 md:mt-0 mt-4 w-full">
                      <p className="text-base text-gray-800">Place of birth</p>
                      <input
                        type="text"
                        name
                        id
                        placeholder="Enter birth place"
                        className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none border border-gray-300 lg:min-w-[250px] w-full py-3 px-3 rounded mt-4"
                      />
                    </div>
                  </div>
                  <div className="lg:flex md:flex block gap-8 md:mt-4 mt-6">
                    <div className="w-full">
                      <p className="text-base text-gray-800">Address</p>
                      <input
                        type="text"
                        name
                        id
                        placeholder="Enter your postal address"
                        className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none border border-gray-300 lg:min-w-[250px] w-full py-3 px-3 rounded mt-4"
                      />
                    </div>
                    <div className="lg:mt-0 md:mt-0 mt-4 w-full">
                      <p className="text-base text-gray-800">Zip code</p>
                      <input
                        type="text"
                        name
                        id
                        placeholder="Enter zip code"
                        className="placeholder:text-sm placeholdertext-gray-500 focus:outline-none border border-gray-300 lg:min-w-[250px] w-full py-3 px-3 rounded mt-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 lg:max-w-[240px] w-full pb-4 py-8 lg:h-[276px]">
                  <svg
                    className="ml-4"
                    width={64}
                    height={64}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={32}
                      cy={32}
                      r={31}
                      fill="white"
                      stroke="#E5E7EB"
                      strokeWidth={2}
                    />
                    <path
                      d="M36.7901 20.0362C35.5739 18.7231 33.8751 18 32.0001 18C30.1151 18 28.4107 18.7187 27.2001 20.0237C25.9764 21.3431 25.3801 23.1363 25.5201 25.0725C25.7976 28.8925 28.7045 32 32.0001 32C35.2957 32 38.1976 28.8931 38.4795 25.0737C38.6214 23.155 38.0214 21.3656 36.7901 20.0362Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M43.0001 46H21.0001C20.7122 46.0037 20.427 45.9433 20.1653 45.8229C19.9037 45.7026 19.6722 45.5254 19.4876 45.3044C19.0814 44.8187 18.9176 44.1556 19.0389 43.485C19.5664 40.5588 21.2126 38.1006 23.8001 36.375C26.0989 34.8431 29.0107 34 32.0001 34C34.9895 34 37.9014 34.8437 40.2001 36.375C42.7876 38.1 44.4339 40.5581 44.9614 43.4844C45.0826 44.155 44.9189 44.8181 44.5126 45.3037C44.3281 45.5249 44.0966 45.7022 43.835 45.8226C43.5733 45.9431 43.2881 46.0037 43.0001 46Z"
                      fill="#E5E7EB"
                    />
                  </svg>
                  <div className="flex gap-4 mt-6 items-center px-3">
                    <svg
                      className="flex-shrink-0"
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.72604 3.29001C3.17815 2.17541 4.3106 1.12109 6 1.12109C7.81762 1.12109 9.36673 2.35779 9.70638 4.3591C10.186 4.43088 10.6881 4.61455 11.1015 4.92168C11.6154 5.30341 12 5.88506 12 6.66172C12 7.41476 11.683 8.01384 11.1668 8.41542C10.6608 8.80906 9.98743 8.99609 9.28125 8.99609H7.5C7.29289 8.99609 7.125 8.8282 7.125 8.62109C7.125 8.41399 7.29289 8.24609 7.5 8.24609H9.28125C9.86413 8.24609 10.3626 8.09083 10.7063 7.82347C11.0397 7.56405 11.25 7.18345 11.25 6.66172C11.25 6.16361 11.0135 5.79054 10.6543 5.52375C10.2859 5.25009 9.79763 5.09874 9.35645 5.07688C9.17172 5.06773 9.02126 4.92527 9.00203 4.74132C8.8131 2.93361 7.51384 1.87109 6 1.87109C4.57051 1.87109 3.65655 2.81413 3.35709 3.74809C3.3113 3.89092 3.18479 3.99273 3.03547 4.00691C1.74323 4.12968 0.75 4.92523 0.75 6.12734C0.75 7.33585 1.79426 8.24609 3.1875 8.24609H4.5C4.70711 8.24609 4.875 8.41399 4.875 8.62109C4.875 8.8282 4.70711 8.99609 4.5 8.99609H3.1875C1.48699 8.99609 0 7.84946 0 6.12734C0 4.48954 1.29668 3.51105 2.72604 3.29001Z"
                        fill="#6B7280"
                      />
                      <path
                        d="M6.26517 4.23093L7.76517 5.73093C7.91161 5.87738 7.91161 6.11481 7.76517 6.26126C7.61872 6.40771 7.38128 6.40771 7.23483 6.26126L6.375 5.40142V10.5059C6.375 10.713 6.20711 10.8809 6 10.8809C5.79289 10.8809 5.625 10.713 5.625 10.5059V5.40142L4.76516 6.26126C4.61872 6.40771 4.38128 6.40771 4.23484 6.26126C4.08839 6.11481 4.08839 5.87738 4.23484 5.73093L5.73484 4.23093C5.88128 4.08448 6.11872 4.08448 6.26517 4.23093Z"
                        fill="#6B7280"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Upload Image</p>
                  </div>
                  <div className="flex gap-4 mt-6 items-center px-3">
                    <svg
                      className="flex-shrink-0"
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.7962 6.00098L9.02276 3.77441C9.12844 3.66893 9.18787 3.52578 9.18801 3.37647C9.18814 3.22716 9.12895 3.08391 9.02347 2.97824C8.91798 2.87257 8.77484 2.81313 8.62553 2.813C8.47621 2.81287 8.33297 2.87205 8.22729 2.97754L6.00073 5.2041L3.77417 2.97754C3.6685 2.87187 3.52517 2.8125 3.37573 2.8125C3.22629 2.8125 3.08297 2.87187 2.97729 2.97754C2.87162 3.08321 2.81226 3.22653 2.81226 3.37598C2.81226 3.52542 2.87162 3.66874 2.97729 3.77441L5.20386 6.00098L2.97729 8.22754C2.87162 8.33321 2.81226 8.47653 2.81226 8.62598C2.81226 8.77542 2.87162 8.91874 2.97729 9.02441C3.08297 9.13009 3.22629 9.18945 3.37573 9.18945C3.52517 9.18945 3.6685 9.13009 3.77417 9.02441L6.00073 6.79785L8.22729 9.02441C8.33297 9.13009 8.47629 9.18945 8.62573 9.18945C8.77517 9.18945 8.9185 9.13009 9.02417 9.02441C9.12984 8.91874 9.18921 8.77542 9.18921 8.62598C9.18921 8.47653 9.12984 8.33321 9.02417 8.22754L6.7962 6.00098Z"
                        fill="#6B7280"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Remove Image</p>
                  </div>
                  <div className="flex gap-4 6 px-3 mt-4">
                    <svg
                      className="flex-shrink-0"
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.125 5.8125C1.125 3.22391 3.22391 1.125 5.8125 1.125C8.40109 1.125 10.5 3.22391 10.5 5.8125C10.5 8.40109 8.40109 10.5 5.8125 10.5C3.22391 10.5 1.125 8.40109 1.125 5.8125ZM5.8125 1.875C3.63812 1.875 1.875 3.63812 1.875 5.8125C1.875 7.98688 3.63812 9.75 5.8125 9.75C7.98688 9.75 9.75 7.98688 9.75 5.8125C9.75 3.63812 7.98688 1.875 5.8125 1.875ZM4.78125 5.15625C4.78125 4.94914 4.94914 4.78125 5.15625 4.78125H5.90625C6.11336 4.78125 6.28125 4.94914 6.28125 5.15625V7.59375H6.9375C7.14461 7.59375 7.3125 7.76164 7.3125 7.96875C7.3125 8.17586 7.14461 8.34375 6.9375 8.34375H4.875C4.66789 8.34375 4.5 8.17586 4.5 7.96875C4.5 7.76164 4.66789 7.59375 4.875 7.59375H5.53125V5.53125H5.15625C4.94914 5.53125 4.78125 5.36336 4.78125 5.15625Z"
                        fill="#6B7280"
                      />
                      <path
                        d="M5.8125 3.04688C5.69198 3.04688 5.57416 3.08261 5.47395 3.14957C5.37374 3.21653 5.29563 3.3117 5.24951 3.42305C5.20339 3.5344 5.19132 3.65693 5.21483 3.77513C5.23835 3.89334 5.29638 4.00192 5.38161 4.08714C5.46683 4.17237 5.57541 4.2304 5.69362 4.25392C5.81182 4.27743 5.93435 4.26536 6.0457 4.21924C6.15705 4.17312 6.25222 4.09501 6.31918 3.9948C6.38614 3.89459 6.42188 3.77677 6.42188 3.65625C6.42188 3.49463 6.35767 3.33964 6.24339 3.22536C6.12911 3.11108 5.97412 3.04688 5.8125 3.04688Z"
                        fill="#6B7280"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      Acceptable image format is JPG, JPEG &amp; PNG. (Size upto
                      5MB)
                    </p>
                  </div>
                </div>
              </div> */}
              {/* <div className="lg:px-14 md:px-6 px-4 mt-10">
                <p className="text-base leading-none text-gray-800">Gender</p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex gap-3 items-center">
                    <input
                      type="radio"
                      name="radio"
                      className="w-4 h-4 accent-indigo-700 cursor-pointer"
                    />
                    <p className="text-sm leading-none text-gray-600">Male</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="radio"
                      name="radio"
                      className="w-4 h-4 accent-indigo-700 cursor-pointer"
                    />
                    <p className="text-sm leading-none text-gray-600">Female</p>
                  </div>
                </div>
              </div> */}
              {/* <div className="flex justify-end px-4">
                <div className="bg-indigo-700 lg:max-w-[143px] w-full py-3 px-2 rounded md:mt-12 mt-9 hover:bg-indigo-600 transition duration-300 ease-in-out cursor-pointer">
                  <div className="flex gap-2 items-center justify-center">
                    <button className="text-white">Next Step</button>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.21967 2.96967C4.92678 3.26256 4.92678 3.73744 5.21967 4.03033L9.18934 8L5.21967 11.9697C4.92678 12.2626 4.92678 12.7374 5.21967 13.0303C5.51256 13.3232 5.98744 13.3232 6.28033 13.0303L10.7803 8.53033C11.0732 8.23744 11.0732 7.76256 10.7803 7.46967L6.28033 2.96967C5.98744 2.67678 5.51256 2.67678 5.21967 2.96967Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}
            </BasicCard>
            {/* Change Above */}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default CreateSystemPage;
