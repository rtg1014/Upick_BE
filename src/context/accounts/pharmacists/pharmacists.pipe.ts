import { Injectable, PipeTransform } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PharmacistSignUpDto } from './dto/pharmacist.dto';

@Injectable()
export class TransformPharmacistsCreatePharmacistSignUpDtoPipe
  implements
    PipeTransform<
      Omit<PharmacistSignUpDto, 'imageToUpload'>,
      Prisma.PharmacistCreateInput
    >
{
  transform(value: Omit<PharmacistSignUpDto, 'imageToUpload'>) {
    const {
      email,
      password,
      pharmacyAddress,
      pharmacyName,
      userName,
      counselingEndTime,
      counselingStartTime,
      pharmacistSignUpSecret,
    } = value;

    const transformedValue = {
      email,
      password,
      pharmacyAddress,
      pharmacyName,
      userName,
      counselingEndTime,
      counselingStartTime,
      pharmacistSignUpSecret,
    };

    return transformedValue;
  }
}
