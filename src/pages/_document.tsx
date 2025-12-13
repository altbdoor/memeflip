import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <div className="container pt-3 pb-5">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
