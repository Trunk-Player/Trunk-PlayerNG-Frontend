import SampleCurrentUser from "components/sampledata/SampleCurrentUser";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "state/store";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SampleCurrentUser>
        <Component {...pageProps} />
      </SampleCurrentUser>
    </Provider>
  );
}

export default MyApp;
