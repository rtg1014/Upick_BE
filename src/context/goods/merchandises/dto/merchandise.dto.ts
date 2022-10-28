export interface CreateMerchandiseDto {
  company: string;
  rating: string;
  name: string;
  certification: string;
  imageToUpload: Express.Multer.File[];
  merchandiseHowToConsume: string;
}

export interface CreateCommentDto {
  positive: string;
  negative: string;
  rating: number;
}