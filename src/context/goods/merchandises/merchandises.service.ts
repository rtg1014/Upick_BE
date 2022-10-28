import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pharmacist, Prisma } from '@prisma/client';
import { ImagesService } from 'src/context/common/images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/merchandise.dto';

@Injectable()
export class MerchandisesService {
  constructor(
    private prismaService: PrismaService,
    private imagesService: ImagesService,
  ) {}

  async createMerchandise(
    merchandiseCreateWithoutImageInput: Prisma.MerchandiseCreateWithoutImageInput,
    imageToUpload: Express.Multer.File,
  ) {
    
    // merchandiseHowToConsume upsert
    const existingMerchandiseHowToConsume =
      await this.prismaService.merchandiseHowToConsume.findFirst({
        where: {
          consumption:
            merchandiseCreateWithoutImageInput.merchandiseHowToConsume.create
              .consumption,
        },
      });
    if (existingMerchandiseHowToConsume)
      merchandiseCreateWithoutImageInput.merchandiseHowToConsume = {
        connectOrCreate: {
          where: { id: existingMerchandiseHowToConsume.id },
          create: { consumption: existingMerchandiseHowToConsume.consumption },
        },
      };

    // company upsert
    const existingCompany = await this.prismaService.company.findFirst({
      where: {
        name: merchandiseCreateWithoutImageInput.company.create.name,
      },
    });
    if (existingCompany)
      merchandiseCreateWithoutImageInput.company = {
        connectOrCreate: {
          where: { id: existingCompany.id },
          create: { name: existingCompany.name },
        },
      };

    // create image
    const merchandiseImage = await this.imagesService.create(imageToUpload);

    // created merchandise
    const merchandise = await this.prismaService.merchandise.create({
      data: {
        ...merchandiseCreateWithoutImageInput,
        Image: { connect: { id: merchandiseImage.id } },
      },
    });

    return { result: merchandise, message: '상품 생성 완료' };
  }

  async createMerchandiseEffects(merchandiseId: number, effects: string[]) {
    const promises = [];

    for (const effect of effects) {
      const existingTag = await this.prismaService.tag.findFirst({
        where: { name: effect },
      });
      if (existingTag)
        promises.push(
          this.prismaService.tag.update({
            where: { id: existingTag.id },
            data: { MerchandiseEffect: { connect: { id: merchandiseId } } },
          }),
        );
      else
        promises.push(
          this.prismaService.tag.create({
            data: { name: effect },
            include: { MerchandiseEffect: { where: { id: merchandiseId } } },
          }),
        );
    }
    const merchandiseEffects = await Promise.all(promises);

    return {
      result: merchandiseEffects,
      message: `${merchandiseId}번 상품의 효능 생성 완료`,
    };
  }

  async createComment(
    merchandiseId: number,
    createComentDto: CreateCommentDto,
    Pharmacist: Pharmacist,
  ) {
    const { positive, negative, rating } = createComentDto;

    if (!positive || !negative || !rating)
      throw new InternalServerErrorException();

    const comment = await this.prismaService.comment.create({
      data: {
        merchandiseId,
        positive,
        negative,
        rating,
        pharmacistId: Pharmacist.id,
      },
    });

    return { result: comment, message: '댓글 작성 완료' };
  }
}
