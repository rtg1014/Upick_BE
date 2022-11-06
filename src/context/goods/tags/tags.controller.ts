import { Post, Controller, Put, Get, Body } from '@nestjs/common';
import { Customer as TCustomer } from '@prisma/client';
import { ROLE } from 'src/constant/account.constant';
import { Customer } from 'src/decorators/customer.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdatePostingFilterDto } from './dto/tags.dto';
import { TagsService } from './tags.service';

@Controller('goods/tags')
export class TagsController {
  constructor(private readonly tagsServie: TagsService) {}

  @Post('seed')
  @Roles(ROLE.PHARMACIST)
  makeSeed() {
    return this.tagsServie.makeSeed();
  }

  @Get()
  getAllTags() {
    return this.tagsServie.getAllTags();
  }

  @Get('posting-filter')
  @Roles(ROLE.CUSTOMER)
  getCustomerPostingFilter(@Customer() customer: TCustomer) {
    return this.tagsServie.getCustomerPostingFilter(customer);
  }

  @Put('posting-filter')
  @Roles(ROLE.CUSTOMER)
  updateCustomerPostingFilter(
    @Customer() customer: TCustomer,
    @Body() updatePostingFilterDto: UpdatePostingFilterDto,
  ) {
    return this.tagsServie.updateCustomerPostingFilter(
      customer,
      updatePostingFilterDto,
    );
  }
}
