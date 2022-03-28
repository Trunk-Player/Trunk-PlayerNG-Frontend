import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

interface Req {
  body: {
    accessToken: string;
    csrfToken: string;
    accessTokenExpiration: string;
  };
  method?: string;
}

interface APIDataResponse {
  message: string;
}

export default async function savetoken(
  req: NextApiRequest,
  res: NextApiResponse<APIDataResponse>
) {
  const {
    body: { accessToken, accessTokenExpiration, csrfToken },
    method,
  }: Req = req;

  if (method && method.toLocaleLowerCase() === "post") {
    if (accessToken && csrfToken && accessTokenExpiration) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("accesstoken", String(accessToken), {
          httpOnly: true,
          secure: req.url?.startsWith("https") || false,
          sameSite: "strict",
          expires: new Date(accessTokenExpiration),
          path: "/",
        }),
        cookie.serialize("csrftoken", String(csrfToken), {
          httpOnly: true,
          secure: req.url?.startsWith("https") || false,
          sameSite: "strict",
          expires: new Date(accessTokenExpiration),
          path: "/",
        }),
      ]);

      res.status(200).json({ message: "Tokens saved." });
    } else {
      res.status(400).json({
        message: "Missing access or csrf token or access token expiration.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
