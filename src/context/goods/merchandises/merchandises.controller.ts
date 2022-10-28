import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pharmacist as TPharmacist, Prisma } from '@prisma/client';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { TransformMerchandisesCreateMerchandiseRequestDtoPipe } from './merchandises.pipe';
import { MerchandisesService } from './merchandises.service';
import { CreateCommentDto } from './dto/merchandise.dto';
import { Pharmacist } from 'src/decorators/pharmacist.decorator';

@Controller('goods/merchandises')
export class MerchandisesController {
  constructor(private readonly merchandisesService: MerchandisesService) {}

  @Post()
  @Roles(ROLE.PHARMACIST)
  @UseInterceptors(FileInterceptor('imageToUpload'))
  createMerchandise(
    @UploadedFile()
    imageToUpload: Express.Multer.File,
    @Body(new TransformMerchandisesCreateMerchandiseRequestDtoPipe())
    merchandiseCreateInput: Prisma.MerchandiseCreateInput,
  ) {
    return this.merchandisesService.createMerchandise(
      merchandiseCreateInput,
      imageToUpload,
    );
  }

  @Post('/:merchandiseId/effects')
  @Roles(ROLE.PHARMACIST)
  createMerchandiseEffects(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Body('effects') effects: string[],
  ) {
    return this.merchandisesService.createMerchandiseEffects(
      merchandiseId,
      effects,
    );
  }

  @Post('/:merchandiseId/comment')
  @Roles(ROLE.PHARMACIST)
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Pharmacist() pharmacist: TPharmacist,
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
  ) {
    return this.merchandisesService.createComment(
      merchandiseId,
      createCommentDto,
      pharmacist,
    );
  }
}
