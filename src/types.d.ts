export interface ImgflipMemes {
  success: boolean;
  data: {
    memes: ImgflipMemesEntity[];
  };
}

interface ImgflipMemesEntity {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}
