import { CanvasPreview } from "@/components/CanvasPreview";
import { fonts } from "@/components/fonts";
import { LoadImage } from "@/components/LoadImage";
import { TextFields } from "@/components/TextFields";
import { FontProvider } from "@/contexts/FontContext";
import { TextFieldsProvider } from "@/contexts/TextFieldsContext";
import type { LocalFont } from "@zumer/snapdom";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useState } from "react";

type StaticPropsReturn = GetStaticProps<{ fonts: LocalFont[] }>;

export const getStaticProps = (async () => {
  const woffRegex = /url\(\.\/files\/(.+?\.woff2?)\)/;

  const fixedFonts = await Promise.all(
    fonts.map(async (font) => {
      const cssContent = await fetch(font.css).then((res) => res.text());
      const woffFileMatch = cssContent.match(woffRegex);

      if (woffFileMatch && woffFileMatch.length > 1) {
        return {
          family: font.name,
          src: `https://cdn.jsdelivr.net/npm/@fontsource/${font.name.toLowerCase()}@5.2.7/files/${woffFileMatch[1]}`,
        };
      }

      return { family: font.name, src: "" };
    }),
  );

  return { props: { fonts: fixedFonts } };
}) satisfies StaticPropsReturn;

export default function Home({
  fonts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [baseImg, setBaseImg] = useState<HTMLImageElement>();

  const setBaseImgFromUrl = (url: string) => {
    setIsLoading(true);

    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setBaseImg(img);
        setIsLoading(false);
        resolve();
      };
      img.onerror = () => {
        alert("Unable to load image");
        setIsLoading(false);
        reject();
      };
      img.src = url;
    });
  };

  return (
    <FontProvider fonts={fonts}>
      <TextFieldsProvider>
        <Head>
          <title>memeflip</title>
        </Head>

        <div className="row">
          <div className="col-md-6">
            <CanvasPreview isLoading={isLoading} image={baseImg} />
          </div>
          <div className="col-md-6">
            <div className="mb-2 fw-bold">Upload image</div>
            <LoadImage onUrlReady={setBaseImgFromUrl} />
            <hr />
            <TextFields />
          </div>
        </div>
      </TextFieldsProvider>
    </FontProvider>
  );
}
