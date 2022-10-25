import { Body, Controller, Post } from '@nestjs/common';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateMerchandiseDto } from './dto/merchandise.dto';
import { MerchandisesService } from './merchandises.service';

@Controller('merchandises')
export class MerchandisesController {
  constructor(private readonly merchandisesService: MerchandisesService) {}

  @Post()
  @Roles(ROLE.PHARMACIST)
  createMerchandise(@Body() createMerchandiseDto: CreateMerchandiseDto) {
    return;
    //  this.merchandisesService.createMerchandise(createMerchandiseDto);
  }
}
