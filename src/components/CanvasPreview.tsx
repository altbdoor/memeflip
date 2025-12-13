import { useEffect, useRef } from "react";

interface CanvasPreviewProps {
  isLoading: boolean;
  image: HTMLImageElement | undefined;
}

export function CanvasPreview({ image, ...props }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRotateRef = useRef(0);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
  }, [image]);

  const rotateCanvas = () => {
    if (!image) {
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const nextRotate = (baseRotateRef.current + 90) % 360;
    baseRotateRef.current = nextRotate;

    const isSwapped = nextRotate % 180 !== 0;
    canvas.width = isSwapped ? image.height : image.width;
    canvas.height = isSwapped ? image.width : image.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    switch (nextRotate) {
      case 90:
        ctx.translate(canvas.width, 0);
        ctx.rotate(Math.PI / 2);
        break;

      case 180:
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        break;

      case 270:
        ctx.translate(0, canvas.height);
        ctx.rotate((3 * Math.PI) / 2);
        break;
    }

    ctx.drawImage(image, 0, 0);
    ctx.restore();
  };

  return (
    <div className="position-relative">
      <div className="mb-2 text-end">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={rotateCanvas}
        >
          Rotate
        </button>
      </div>

      <div className="d-flex flex-column justify-content-center">
        {props.isLoading && <h5 className="text-center">Loading image...</h5>}

        <canvas
          ref={canvasRef}
          className="meme-img__canvas h-auto border border-primary"
        ></canvas>
      </div>
    </div>
  );
}
