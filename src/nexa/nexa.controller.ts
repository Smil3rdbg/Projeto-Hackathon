import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NexaService } from './nexa.service';
@Controller()
export class NexaController {
  constructor(private readonly service:NexaService) {}
  @Get('feed') feed(@Query('area') area?:string){ return this.service.feed(area); }
  @Get('areas') areas(){ return this.service.areas(); }
  @Get('perfil/:id') profile(@Param('id') id:string){ return this.service.profile(+id); }
  @Post('areas') createArea(@Body() b:{nicho_area:string;tempo_area:number;id_cadastro:number}){ return this.service.createArea(b); }
  @Post('posts') createPost(@Body() b:{id_cadastro:number;id_area:number;descricao:string;imagem_url?:string}){ return this.service.createPost(b); }
  @Post('posts/:id/comentarios') comment(@Param('id') id:string,@Body() b:{id_cadastro:number;id_area:number;mensagem:string}){ return this.service.comment(+id,b); }
}
