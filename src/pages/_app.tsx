import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/ubuntu-mono";
import "@fontsource/inconsolata";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
