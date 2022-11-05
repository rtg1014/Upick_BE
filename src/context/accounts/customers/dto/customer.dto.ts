import { Gender, TakingExcerciseTimePerAWeek } from '@prisma/client';
export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInKakaoRequestDto {
  code: string;
  redirectUri: string;
}

export interface UpdateCustomerDto {
  name?: string;
  age?: number;
  gender?: Gender;
  isPregnant: boolean;
  isBreastFeed: boolean;
  tagIds?: number[];
  medicineNames?: string[];
  stroke?: boolean;
  heartDisease?: boolean;
  highBloodPressure?: boolean;
  diabetes?: boolean;
  etc?: boolean;
  takingExcerciseTimePerAWeek?: TakingExcerciseTimePerAWeek;
  memo?: string;
}
