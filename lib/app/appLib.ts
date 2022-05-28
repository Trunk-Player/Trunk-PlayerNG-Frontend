import { serverAxios, changeBaseApiUrl } from "utils/axios";

export const getAPIBaseUrl = (): string | null => {
  const envBaseApiUrl = process.env.NEXT_PUBLIC_BASEAPIURL;

  if (envBaseApiUrl) {
    return envBaseApiUrl;
  }

  try {
    const baseapiurl = document.cookie.replace(
      /(?:(?:^|.*;\s*)baseapiurl\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (baseapiurl && baseapiurl !== "" && baseapiurl.length > 0) {
      return decodeURIComponent(baseapiurl);
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const saveAPIBaseUrl = async (baseApiUrl: string): Promise<void> => {
  let checkedBaseApiUrl = baseApiUrl;

  if (checkedBaseApiUrl.endsWith("/")) {
    checkedBaseApiUrl = checkedBaseApiUrl.slice(0, -1);
  }

  const response = await serverAxios.post<void>("/development/saveapibaseurl", {
    baseApiUrl: checkedBaseApiUrl,
  });

  if (response.status !== 200) {
    throw Error("The frontend server was unable to save the base API url.");
  }

  changeBaseApiUrl(checkedBaseApiUrl);

  return response.data;
};

export const setServerAPIBaseUrl = (req: any) => {
  const envBaseApiUrl = process.env.NEXT_PUBLIC_BASEAPIURL;

  if (envBaseApiUrl) {
    changeBaseApiUrl(envBaseApiUrl);
    return;
  } else {
    const baseUrlCookie = req.cookies["baseapiurl"];
    if (baseUrlCookie) {
      changeBaseApiUrl(decodeURIComponent(baseUrlCookie));
    }
    return;
  }
};
