export interface PharmacistSignUpDto {
  imageToUpload: Express.Multer.File[];
  email: string;
  password: string;
  userName: string;
  pharmacyName: string;
  pharmacyAddress: string;
  counselingStartTime?: string;
  counselingEndTime?: string;
  pharmacistSignUpSecret: string;
}

export interface SignInDto {
  email: string;
  password: string;
}
