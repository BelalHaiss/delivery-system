import mongoose from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseService implements OnModuleInit {
  constructor(private config: ConfigService) {}
  async onModuleInit() {
    const dbUrl = this.config.get('LOCAL_DB') + this.config.get('DB_NAME');
    await mongoose.connect(dbUrl);
  }
}
