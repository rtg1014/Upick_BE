import { Controller } from '@nestjs/common';
import { MerchandisesService } from './merchandises.service';

@Controller('merchandises')
export class MerchandisesController {
  constructor(private readonly merchandisesService: MerchandisesService) {}
}
