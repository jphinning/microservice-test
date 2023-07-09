import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { OptimizeController } from 'src/modules/optimize/optimize.controller';
import { OptimizeProcessor } from 'src/modules/optimize/optimize.processor';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [OptimizeController],
  providers: [OptimizeProcessor],
  exports: [],
})
export class OptimizeModule {}
