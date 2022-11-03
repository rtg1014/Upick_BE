import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Get,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Pharmacist as TPharmacist,
  Customer as TCustomer,
  Prisma,
} from '@prisma/client';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { TransformMerchandisesCreateMerchandiseRequestDtoPipe } from './merchandises.pipe';
import { MerchandisesService } from './merchandises.service';
import {
  Comment,
  PatchCommentDto,
  CreateMerchandiseFromCrawlerDto,
  GetMerchandisesByLikesFilteringAgeDto,
} from './dto/merchandise.dto';
import { Pharmacist } from 'src/decorators/pharmacist.decorator';
import { Customer } from 'src/decorators/customer.decorator';

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

  @Post('test')
  @Roles(ROLE.PHARMACIST)
  createMerchandiseFromCrawler(
    @Body() createMerchandiseFromCrawlerDto: CreateMerchandiseFromCrawlerDto,
  ) {
    return this.merchandisesService.createMerchandiseFromCrawler(
      createMerchandiseFromCrawlerDto,
    );
  }

  @Post('/:merchandiseId/comments')
  @Roles(ROLE.PHARMACIST)
  createComment(
    @Body() createCommentDto: Comment,
    @Pharmacist() pharmacist: TPharmacist,
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
  ) {
    return this.merchandisesService.createComment(
      merchandiseId,
      createCommentDto,
      pharmacist,
    );
  }

  // @Get('/:merchandiseId/comments')
  // getComments(@Param('merchandiseId', ParseIntPipe) merchandiseId: number) {
  //   return this.merchandisesService.getComments(merchandiseId);
  // }

  @Patch('/:merchandiseId/comments/:commentId')
  @Roles(ROLE.PHARMACIST)
  patchComment(
    @Body() patchCommentDto: PatchCommentDto,
    @Pharmacist() pharmacist: TPharmacist,
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.merchandisesService.patchComment(
      merchandiseId,
      commentId,
      patchCommentDto,
      pharmacist,
    );
  }

  @Delete('/:merchandiseId/comments/:commentId')
  @Roles(ROLE.PHARMACIST)
  deleteComment(
    @Pharmacist() pharmacist: TPharmacist,
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.merchandisesService.deleteComment(
      merchandiseId,
      commentId,
      pharmacist,
    );
  }

  @Put('/:merchandiseId/like')
  @Roles(ROLE.CUSTOMER)
  toggleLike(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Customer() customer: TCustomer,
  ) {
    return this.merchandisesService.toggleLike(merchandiseId, customer);
  }

  @Get('')
  rankinggetMerchandisesByLikesFilteringAgeByAge(
    @Body()
    getMerchandisesByLikesFilteringAgeDto: GetMerchandisesByLikesFilteringAgeDto,
  ) {
    return this.merchandisesService.getMerchandisesByLikesFilteringAge(
      getMerchandisesByLikesFilteringAgeDto,
    );
  }

  @Get('search/:keyword')
  @Roles(ROLE.CUSTOMER)
  searchMerchandise(@Param('keyword') keyword: string) {
    return this.merchandisesService.searchMerchandise(keyword);
  }

  @Get('/:merchandiseId')
  getMerchandise(@Param('merchandiseId', ParseIntPipe) merchandiseId: number) {
    return this.merchandisesService.getMerchandise(merchandiseId);
  }
}
