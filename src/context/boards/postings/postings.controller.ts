import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { PostingsService } from './postings.service';
import { Posting, CreatePostingDto } from './dto/postings.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';
import { Pharmacist } from 'src/decorators/pharmacist.decorator';
import {
  Pharmacist as TPharmacist,
  Customer as TCustomer,
} from '@prisma/client';
import { Customer } from 'src/decorators/customer.decorator';

@Controller('posting')
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Post('')
  @Roles(ROLE.PHARMACIST)
  createPosting(
    @Body() createPostingDto: CreatePostingDto,
    @Pharmacist() pharmacist: TPharmacist,
  ) {
    return this.postingsService.createPosting(createPostingDto, pharmacist);
  }

  @Get(':id')
  getPosting(@Param('id', ParseIntPipe) id: number) {
    return this.postingsService.getPosting(id);
  }

  @Get('')
  getPostings() {
    return this.postingsService.getPostings();
  }

  @Patch(':id')
  @Roles(ROLE.PHARMACIST)
  updatePosting(
    @Param('id', ParseIntPipe) id: number,
    @Body() posting: Posting,
    @Pharmacist() pharmacist: TPharmacist,
  ) {
    return this.postingsService.updatePosting(id, posting, pharmacist);
  }

  @Put(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @Customer() customer: TCustomer,
  ) {
    return this.postingsService.toggleLike(id, customer);
  }
}
