export interface CreateMerchandiseDto {
  companyId: number;
  name: string;
  certification: boolean;
  imageUrl: string;
  merchandiseEffects: string[];
}
