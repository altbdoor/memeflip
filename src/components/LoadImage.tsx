import type { ImgflipMemes } from "@/types";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

interface LoadImageProps {
  onUrlReady: (url: string) => Promise<void>;
}

type TopMemes = ImgflipMemes["data"]["memes"][number];
interface TopMemesWithPreview extends TopMemes {
  previewUrl: string;
}

export function LoadImage(props: LoadImageProps) {
  const [topMemes, setTopMemes] = useState<TopMemesWithPreview[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const imageUrl = String(fd.get("imageUrl") ?? "");
    props.onUrlReady(imageUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formRef.current?.reset();

      const url = URL.createObjectURL(file);
      props.onUrlReady(url).finally(() => {
        URL.revokeObjectURL(url);
      });
    }
  };

  useEffect(() => {
    const getTopMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");

        if (res.ok) {
          const data = (await res.json()) as ImgflipMemes;

          if (data.success && data.data.memes.length > 0) {
            setTopMemes(
              data.data.memes.map((meme) => ({
                ...meme,
                previewUrl: meme.url
                  .replace(".com/", ".com/2/")
                  .replace(".png", ".jpg"),
              })),
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTopMemes();
  }, []);

  const handleClickTopMeme = (url: string) => (evt: MouseEvent) => {
    evt.preventDefault();
    props.onUrlReady(url);
  };

  return (
    <>
      {topMemes.length > 0 && (
        <div className="mb-2 overflow-x-auto">
          <div className="d-flex flex-row gap-2 flex-nowrap">
            {topMemes.map((meme) => (
              <a key={meme.id} href="#" onClick={handleClickTopMeme(meme.url)}>
                <Image
                  src={meme.previewUrl}
                  alt={meme.id}
                  width={50}
                  height={50}
                />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-lg-6">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="input-group mb-3 mb-lg-0">
              <input
                type="text"
                name="imageUrl"
                className="form-control"
                placeholder="https://example.com/image.jpg"
                required
              />

              <button className="btn btn-outline-primary" type="submit">
                Load
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-6">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
}
