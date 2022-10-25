import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMerchandiseDto } from './dto/merchandise.dto';

@Injectable()
export class MerchandisesService {
  constructor(private prismaService: PrismaService) {}

  //   async createMerchandise(createMerchandiseDto: CreateMerchandiseDto) {
  //     const { name, companyId, certification, imageUrl, merchandiseEffects } =
  //       createMerchandiseDto;

  //     const createTagsArg = merchandiseEffects.map((effect) => {
  //       return { name: effect };
  //     });
  //     await this.prismaService.tag.createMany({ data: createTagsArg });

  //     const merchandise = await this.prismaService.merchandise.create({
  //       data: {
  //         name,
  //         companyId,
  //         certification,
  //         MerchandiseEffect: { createMany: { data: [{}] } },
  //       },
  //     });
  //   }
}
