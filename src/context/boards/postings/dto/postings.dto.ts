import { Gender } from '@prisma/client';

export interface CreatePostingDto {
  title: string;
  content: string;
  merchandiseIds: number[];
  ingredientIds: number[];
  ageIds: number[];
  considerIds: number[];
  gender?: Gender;
}

export enum OrderBy {
  likes = 'like',
  latest = 'latest',
}
