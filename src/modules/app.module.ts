import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseService } from 'services/mongoose.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './server/.env'],
    }),
    OrderModule,
  ],
  providers: [MongooseService],
})
export class AppModule {}
