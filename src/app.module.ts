import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { NexaModule } from './nexa/nexa.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';
@Module({imports:[ConfigModule.forRoot({isGlobal:true,envFilePath:'.env'}),DatabaseModule,AuthModule,NexaModule],controllers:[HealthController]}) export class AppModule{}
