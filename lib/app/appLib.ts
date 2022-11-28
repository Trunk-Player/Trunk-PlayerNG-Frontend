import { changeBaseApiUrl } from "utils/axios";

export const getAPIBaseUrl = (): string | null => {
  const envBaseApiUrl = process.env.NEXT_PUBLIC_BASEAPIURL;

  if (envBaseApiUrl) {
    return envBaseApiUrl;
  }

  try {
    const baseapiurl = localStorage.getItem("baseapiurl");

    if (baseapiurl && baseapiurl !== "" && baseapiurl.length > 0) {
      return decodeURIComponent(baseapiurl);
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

const apiRemoveRegex = /api\/v1/i;

export const getSocketIoBaseUrl = (): string | null => {
  const envBaseSocketUrl = process.env.NEXT_PUBLIC_BASESOCKETURL;
  const envBaseApiUrl = process.env.NEXT_PUBLIC_BASEAPIURL;

  if (envBaseSocketUrl) {
    return envBaseSocketUrl;
  }

  if (envBaseApiUrl) {
    return envBaseApiUrl.replace(apiRemoveRegex, "");
  }

  try {
    const baseapiurl = localStorage.getItem("baseapiurl");

    if (baseapiurl && baseapiurl !== "" && baseapiurl.length > 0) {
      return decodeURIComponent(baseapiurl).replace(apiRemoveRegex, "");
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const saveAPIBaseUrl = async (baseApiUrl: string) => {
  let checkedBaseApiUrl = baseApiUrl;

  if (checkedBaseApiUrl.endsWith("/")) {
    checkedBaseApiUrl = checkedBaseApiUrl.slice(0, -1);
  }

  localStorage.setItem("baseapiurl", checkedBaseApiUrl);

  changeBaseApiUrl(checkedBaseApiUrl);
};
