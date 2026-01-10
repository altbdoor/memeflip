import { fonts } from "@/components/fonts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {fonts.map((font) => (
          <link
            key={font.name}
            rel="stylesheet"
            href={`https://cdn.jsdelivr.net/npm/@fontsource/${font.name.toLowerCase()}@5.2.7/latin-400.css`}
          />
        ))}
      </Head>
      <body>
        <div className="container pt-3 pb-5">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
