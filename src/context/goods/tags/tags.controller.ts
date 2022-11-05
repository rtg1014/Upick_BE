import { Post, Controller } from '@nestjs/common';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { TagsService } from './tags.service';

@Controller('goods/tags')
export class TagsController {
  constructor(private readonly tagsServie: TagsService) {}

  @Post('seed')
  @Roles(ROLE.PHARMACIST)
  makeSeed() {
    return this.tagsServie.makeSeed();
  }
}
