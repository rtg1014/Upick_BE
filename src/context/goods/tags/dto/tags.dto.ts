import { Gender } from '@prisma/client';

export interface UpdatePostingFilterDto {
  considerIds: number[];
  ageRangeIds: number[];
  ingredientIds: number[];
  gender: Gender;
}
