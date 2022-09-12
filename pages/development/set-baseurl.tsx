/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LogoImage from "components/layouts/mainLayout/sidebar/LogoImage";
import classNames from "utils/classNames";
import * as appLib from "lib/app/appLib";

interface FormData {
  baseapiurl: string;
}

const SetBaseURLPage = () => {
  const router = useRouter();
  const baseApiUrlRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { ref: regBaseAPIUrlRef, ...regBaseAPIUrlRest } = register(
    "baseapiurl",
    {
      required: { value: true, message: "Base API Url is required" },
      value: process.env.NEXT_PUBLIC_RECOMMENDEDBASEAPIURL ?? "https://",
    }
  );

  const onSubmit = handleSubmit(async ({ baseapiurl }) => {
    try {
      appLib.saveAPIBaseUrl(baseapiurl);
      router.push("/login?returnUrl=/");
    } catch (ex: any) {
      alert(
        `An error occurred while trying to set the base api url. Error: ${ex.message}`
      );
    }
  });

  useEffect(() => {
    const htmlTag = document.querySelector("html");
    htmlTag?.classList.remove("bg-gray-100");
    htmlTag?.classList.add("bg-gray-50");
    baseApiUrlRef?.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>Development: Set API Base Url - Trunk-Player</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <LogoImage className="mx-auto h-48 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Set API Base Url
            </h2>
            <p className="mt-2 text-center text-gray-500">
              The base url wasn't set when Trunk-Player was built.
              <br />
              Please provide one before continuing.
            </p>
          </div>
          <div className="mt-8">
            <form
              className="space-y-6"
              onSubmit={onSubmit}
            >
              <div>
                <label
                  htmlFor="baseapiurl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Base API Url
                </label>
                <div className="mt-1">
                  <input
                    {...regBaseAPIUrlRest}
                    name="baseapiurl"
                    type="url"
                    className={classNames(
                      "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm",
                      errors.baseapiurl ? "border-red-600" : ""
                    )}
                    ref={(e) => {
                      regBaseAPIUrlRef(e);
                      baseApiUrlRef.current = e;
                    }}
                    tabIndex={1}
                    // value="test@test.com"
                  />
                  {errors.baseapiurl && (
                    <p className="text-red-600">{errors.baseapiurl.message}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  tabIndex={4}
                >
                  Set Base Url
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetBaseURLPage;
