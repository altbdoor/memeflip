import { snapdom } from "@zumer/snapdom";
import { useRef } from "react";
import { useFonts } from "@/contexts/FontContext";
import { useTextFields } from "@/contexts/TextFieldsContext";
import { Rnd } from "react-rnd";

interface CanvasPreviewProps {
  isLoading: boolean;
  image: HTMLImageElement | undefined;
}

export function CanvasPreview({ image, ...props }: CanvasPreviewProps) {
  const canvasContainer = useRef<HTMLDivElement>(null);

  const rotateCanvas = () => {
    alert("WIP");
  };

  const fonts = useFonts();
  const { fields, updateField } = useTextFields();

  const testRender = async () => {
    if (!canvasContainer.current) {
      return;
    }

    canvasContainer.current.classList.add("meme--rendering");

    // readjust to existing width
    const dpr = window.devicePixelRatio || 1;
    const fixedWidth = image?.width ? image.width / dpr : undefined;

    const snapImg = await snapdom.toCanvas(canvasContainer.current, {
      dpr,
      width: fixedWidth,
      embedFonts: true,
      localFonts: fonts,
    });

    const blob = await new Promise<Blob | null>((resolve) => {
      snapImg.toBlob(resolve, "image/jpeg", 0.95);
    });

    canvasContainer.current.classList.remove("meme--rendering");

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
      <div className="mb-2 d-flex align-items-center">
        {props.isLoading && <b>Loading image...</b>}

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm ms-auto"
          onClick={rotateCanvas}
        >
          Rotate
        </button>
      </div>

      <div className="d-flex flex-column justify-content-center shadow">
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

          {fields.map((field) => (
            <Rnd
              key={field.id}
              size={{ width: field.width, height: field.height }}
              position={{ x: field.x, y: field.y }}
              onDragStop={(e, d) => {
                updateField(field.id, { x: d.x, y: d.y });
              }}
              bounds="parent"
              enableResizing={false}
            >
              <div
                className="meme__text"
                style={{
                  fontFamily: "Anton",
                  fontSize: 64,
                  color: field.textColor,
                  WebkitTextStroke: `10px ${field.outlineColor}`,
                  paintOrder: "stroke fill",
                }}
              >
                {field.text}
              </div>
            </Rnd>
          ))}
        </div>
      </div>

      <button type="button" onClick={testRender}>
        render
      </button>
    </div>
  );
}
