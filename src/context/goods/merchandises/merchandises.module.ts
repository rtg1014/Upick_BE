import { Module } from '@nestjs/common';
import { MerchandisesService } from './merchandises.service';
import { MerchandisesController } from './merchandises.controller';

@Module({
  controllers: [MerchandisesController],
  providers: [MerchandisesService]
})
export class MerchandisesModule {}
