import { Controller } from '@nestjs/common';
import { PharmacistsService } from './pharmacists.service';

@Controller('pharmacists')
export class PharmacistsController {
  constructor(private readonly pharmacistsService: PharmacistsService) {}
}
