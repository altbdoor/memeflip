import { CanvasPreview } from "@/components/CanvasPreview";
import { LoadImage } from "@/components/LoadImage";
import { TextFields } from "@/components/TextFields";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
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
    <>
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
          <TextFields />
          <hr />
        </div>
      </div>
    </>
  );
}
