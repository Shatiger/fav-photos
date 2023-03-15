export interface Image {
  id: number;
  url: string;
}

export interface ImageList {
  shift: number;
  totalItems: number;
  list: Image[];
  isLastPage: boolean;
}

export interface ImageListRequest {
  shift: number;
}
