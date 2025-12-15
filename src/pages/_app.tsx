import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

let basePath = process.env.PAGES_BASE_PATH ?? "";
if (basePath.endsWith("/")) {
  basePath = basePath.slice(0, -1);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={basePath + "/favicon.ico"} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
