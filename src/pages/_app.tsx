import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/ubuntu-mono";
import "@fontsource/inconsolata";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
