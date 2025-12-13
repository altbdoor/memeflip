import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const basePath = process.env.PAGES_BASE_PATH ?? "";

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
