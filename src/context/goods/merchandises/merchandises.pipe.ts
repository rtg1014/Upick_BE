import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateMerchandiseDto } from './dto/merchandise.dto';

@Injectable()
export class TransformMerchandisesCreateMerchandiseRequestDtoPipe
  implements
    PipeTransform<
      Omit<CreateMerchandiseDto, 'imageToUpload'>,
      Prisma.MerchandiseCreateInput
    >
{
  transform(value: Omit<CreateMerchandiseDto, 'imageToUpload'>) {
    const { company, rating, name, certification, merchandiseHowToConsume } =
      value;

    const _rating = +rating;
    const _certification = certification === 'true' ? true : false;
    const _company: Prisma.CompanyCreateNestedOneWithoutMerchandiseInput = {
      create: { name: company },
    };
    const _merchandiseHowToConsume: Prisma.MerchandiseHowToConsumeCreateNestedOneWithoutMerchandiseInput =
      {
        create: { consumption: merchandiseHowToConsume },
      };

    const transformedValue: Prisma.MerchandiseCreateInput = {
      name,
      certification: _certification,
      company: _company,
      rating: _rating,
      merchandiseHowToConsume: _merchandiseHowToConsume,
    };
    console.log(transformedValue);
    // marchandise Effect 중복 생성 로직 변경 필요
    return transformedValue;
  }
}
