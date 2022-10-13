import { Module } from '@nestjs/common';
import { MerchandisesModule } from './merchandises/merchandises.module';

@Module({
  imports: [MerchandisesModule],
})
export class GoodsModule {}
