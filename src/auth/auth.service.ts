import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2'; import { v4 as uuid } from 'uuid'; import { DatabaseService } from '../database/database.service';
@Injectable() export class AuthService {
 private tokens=new Map<string,number>(); constructor(private db:DatabaseService){}
 async login(dto:any){const u=(await this.db.query(`SELECT * FROM cadastro WHERE LOWER(email)=LOWER($1)`,[dto.email])).rows[0];if(!u||!(await argon2.verify(u.senha,dto.password)))throw new UnauthorizedException('E-mail ou senha inválidos.');const token=uuid();this.tokens.set(token,u.id);return {token,user:{id:u.id,nome:u.nome,email:u.email,foto_url:u.foto_url}}}
 async register(dto:any){const exists=(await this.db.query(`SELECT id FROM cadastro WHERE LOWER(email)=LOWER($1)`,[dto.email])).rows[0];if(exists)throw new ConflictException('Já existe uma conta com estes dados.');const hash=await argon2.hash(dto.password,{type:argon2.argon2id});const u=(await this.db.query(`INSERT INTO cadastro(nome,email,senha) VALUES($1,$2,$3) RETURNING id,nome,email,foto_url`,[dto.displayName||dto.username,dto.email,hash])).rows[0];const token=uuid();this.tokens.set(token,u.id);return {token,user:u};}
}
