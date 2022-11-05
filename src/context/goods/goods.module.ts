import { Module } from '@nestjs/common';
import { MerchandisesModule } from './merchandises/merchandises.module';
import { CartModule } from './carts/carts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [MerchandisesModule, CartModule, TagsModule],
})
export class GoodsModule {}
