import { Module } from '@nestjs/common'; import { NexaController } from './nexa.controller'; import { NexaService } from './nexa.service';
@Module({controllers:[NexaController],providers:[NexaService]}) export class NexaModule{}
