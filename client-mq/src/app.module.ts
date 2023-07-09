import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bullmq';
import { OptimizeModule } from './modules/optimize/optimize.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GREETING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'books_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OptimizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
