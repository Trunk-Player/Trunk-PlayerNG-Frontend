import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "state/store";
import { handleTokenRefresh } from "state/slices/authenticationSlice";
import { retreiveCurrentUser } from "state/slices/userSlice";
import * as authentication from "lib/auth/authentication";
import * as appLib from "lib/app/appLib";

import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "react-loading-skeleton/dist/skeleton.css";
import { MainLayout } from "components/layouts";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = async (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login", "/register", "/development/set-baseurl"];
    const path = url.split("?")[0];
    const isLoggedIn = authentication.isLoggedIn();
    if (!isLoggedIn && !publicPaths.includes(path)) {
      console.log("Not Logged In and not public path", path);
      try {
        const refreshTokens = await authentication.refreshAuthToken();
        console.log("Refresh tokens", refreshTokens);
        if (!refreshTokens) {
          setAuthorized(false);
          router.push({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          store.dispatch(handleTokenRefresh(refreshTokens));
          store.dispatch(
            retreiveCurrentUser({ accessToken: refreshTokens.access_token })
          );
          authentication.refreshServerTokens(
            refreshTokens.access_token,
            refreshTokens.access_token_expiration,
            refreshTokens.CSRF_TOKEN
          );
          setAuthorized(true);
        }
      } catch (_ex) {
        setAuthorized(false);
        router.push({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      }
    } else {
      console.log("Path is good", path);
      setAuthorized(true);
    }
  };

  useEffect(() => {
    const path = router.asPath;

    const apiBaseUrl = appLib.getAPIBaseUrl();
    if (!apiBaseUrl && path.split("?")[0] !== "/development/set-baseurl") {
      // setAuthorized(false);
      router.push({
        pathname: "/development/set-baseurl",
      });
    } else {
      // run auth check on initial load
      authCheck(path);
    }

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  return (
    <Provider store={store}>
      <MainLayout>{authorized && <Component {...pageProps} />}</MainLayout>
    </Provider>
  );
}

export default App;
