import { Injectable, PipeTransform } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateMerchandiseDto } from './dto/merchandise.dto';

@Injectable()
export class TransformMerchandisesCreateMerchandiseRequestDtoPipe
  implements
    PipeTransform<
      Omit<CreateMerchandiseDto, 'imageToUpload'>,
      Prisma.MerchandiseCreateInput & {
        merchandiseIngredients: string[];
        merchandiseEffects: string[];
      }
    >
{
  transform(value: Omit<CreateMerchandiseDto, 'imageToUpload'>) {
    const {
      company,
      rating,
      name,
      certification,
      merchandiseHowToConsume,
      merchandiseEffects,
      merchandiseIngredients,
      merchandiseDescription,
    } = value;

    const _certification = certification === 'true' ? true : false;
    const _company: Prisma.CompanyCreateNestedOneWithoutMerchandiseInput = {
      create: { name: company },
    };
    const _merchandiseHowToConsume: Prisma.MerchandiseHowToConsumeCreateNestedOneWithoutMerchandiseInput =
      {
        create: { consumption: merchandiseHowToConsume },
      };
    const _merchandiseIngredients = JSON.parse(merchandiseIngredients); //[ '비타민C', '최적', '비타민B', '최소' ]
    const _merchandiseEffects = JSON.parse(merchandiseEffects); //[ '노화 & 항산화', '면역 기능' ]

    const transformedValue: Prisma.MerchandiseCreateInput = {
      name,
      certification: _certification,
      company: _company,
      rating: rating,
      merchandiseHowToConsume: _merchandiseHowToConsume,
      description: merchandiseDescription,
    };

    return {
      ...transformedValue,
      merchandiseIngredients: _merchandiseIngredients,
      merchandiseEffects: _merchandiseEffects,
    };
  }
}
