import { Gender, TakingExcerciseTimePerAWeek } from '@prisma/client';
export interface SignInDto {
  email: string;
  password: string;
}
export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// export interface SignInKakaoRequestDto {
//   code: string;
//   redirectUri: string;
// }

export interface UpdateCustomerDto {
  name?: string;
  age?: number;
  gender?: Gender;
  isPregnant: boolean;
  isBreastFeed: boolean;
  considerIds?: number[];
  medicineNames?: string[];
  stroke?: boolean;
  heartDisease?: boolean;
  highBloodPressure?: boolean;
  diabetes?: boolean;
  etc?: boolean;
  takingExcerciseTimePerAWeek?: TakingExcerciseTimePerAWeek;
  memo?: string;
}
