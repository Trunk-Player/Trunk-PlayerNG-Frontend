import cookie from "cookie";
import { DateTime } from "luxon";
import type { NextApiRequest, NextApiResponse } from "next";

interface Req {
  body: {
    baseApiUrl: string;
  };
  method?: string;
}

interface APIDataResponse {
  message: string;
}

export default async function saveapibaseurl(
  req: NextApiRequest,
  res: NextApiResponse<APIDataResponse>
) {
  const {
    body: { baseApiUrl },
    method,
  }: Req = req;

  if (method && method.toLocaleLowerCase() === "post") {
    if (baseApiUrl) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("baseapiurl", String(baseApiUrl), {
          secure: req.url?.startsWith("https") || false,
          sameSite: "strict",
          expires: DateTime.now().plus({ weeks: 3 }).toJSDate(),
          path: "/",
        }),
      ]);

      res.status(200).json({ message: "Base API Url saved." });
    } else {
      res.status(400).json({
        message: "Missing baseApiUrl.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
