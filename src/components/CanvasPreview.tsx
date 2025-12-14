import { snapdom } from "@zumer/snapdom";
import { useRef } from "react";

interface CanvasPreviewProps {
  isLoading: boolean;
  image: HTMLImageElement | undefined;
}

export function CanvasPreview({ image, ...props }: CanvasPreviewProps) {
  const canvasContainer = useRef<HTMLDivElement>(null);

  const rotateCanvas = () => {
    alert("WIP");
  };

  const testRender = async () => {
    if (!canvasContainer.current) {
      return;
    }

    // readjust to existing width
    const dpr = window.devicePixelRatio || 1;
    const fixedWidth = image?.width ? image.width / dpr : undefined;

    const snapImg = await snapdom.toCanvas(canvasContainer.current, {
      dpr,
      width: fixedWidth,
    });

    const blob = await new Promise<Blob | null>((resolve) => {
      snapImg.toBlob(resolve, "image/jpeg", 0.95);
    });

    if (!blob) {
      alert("Unable to render");
      return;
    }

    const url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-2 text-end">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={rotateCanvas}
        >
          Rotate
        </button>
      </div>

      <div className="d-flex flex-column justify-content-center shadow">
        {props.isLoading && <h5 className="text-center">Loading image...</h5>}

        <div
          className="position-relative overflow-hidden"
          ref={canvasContainer}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image?.src}
            alt="base image"
            className="d-block w-100 h-auto"
          />

          <div
            contentEditable
            style={{
              position: "absolute",
              top: 20,
              left: 200,
              fontSize: 32,
              textShadow: "0 0 3px #000",
              resize: "both",
            }}
          >
            asd
          </div>
        </div>
      </div>

      <button type="button" onClick={testRender}>
        render
      </button>
    </div>
  );
}
