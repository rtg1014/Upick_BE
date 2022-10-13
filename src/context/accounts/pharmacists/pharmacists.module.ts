import { Module } from '@nestjs/common';
import { PharmacistsService } from './pharmacists.service';
import { PharmacistsController } from './pharmacists.controller';

@Module({
  controllers: [PharmacistsController],
  providers: [PharmacistsService]
})
export class PharmacistsModule {}
