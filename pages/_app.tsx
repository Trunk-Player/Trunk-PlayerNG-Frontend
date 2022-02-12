// import SampleCurrentUser from "components/sampledata/SampleCurrentUser";
import * as authentication from "lib/auth/authentication";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { setAuthenticationToken } from "state/slices/userSlice";
import store from "state/store";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = async (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login", "/register"];
    const path = url.split("?")[0];
    const isLoggedIn = await authentication.isLoggedIn();
    if (!isLoggedIn && !publicPaths.includes(path)) {
      console.log("Not Logged In and not public path", path);
      const refreshResults = await authentication.refreshAuthToken();

      console.log("Refresh results", refreshResults);

      if (!refreshResults.isSuccessful || !refreshResults.authToken) {
        setAuthorized(false);
        router.push({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        store.dispatch(setAuthenticationToken(refreshResults.authToken));
        setAuthorized(true);
      }
    } else {
      console.log("Path is good", path);
      setAuthorized(true);
    }
  };

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

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
  }, []);

  return (
    <Provider store={store}>
      {/* <SampleCurrentUser> */}
      {authorized && <Component {...pageProps} />}
      {/* </SampleCurrentUser> */}
    </Provider>
  );
}

export default App;
