import { useRef, type FormEvent } from "react";

interface LoadImageProps {
  onUrlReady: (url: string) => Promise<void>;
}

export function LoadImage(props: LoadImageProps) {
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

  return (
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
  );
}
