import { Module } from '@nestjs/common';
import { MerchandisesService } from './merchandises.service';
import { MerchandisesController } from './merchandises.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MerchandisesController],
  providers: [MerchandisesService, PrismaService],
})
export class MerchandisesModule {}
