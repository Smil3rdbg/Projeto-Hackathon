import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class NexaService {
 constructor(private db:DatabaseService){}
 async areas(){ return (await this.db.query(`SELECT a.*, c.nome FROM area a JOIN cadastro c ON c.id=a.id_cadastro ORDER BY a.id DESC`)).rows; }
 async feed(area?:string){
   const params:any[]=[]; let where=''; if(area){params.push(area);where='WHERE LOWER(a.nicho_area)=LOWER($1)'}
   return (await this.db.query(`SELECT p.id,p.descricao,p.imagem_url,p.id_cadastro,p.id_area,c.nome,c.foto_url,a.nicho_area,
     COALESCE(json_agg(json_build_object('id',cm.id,'mensagem',cm.mensagem,'nome',cc.nome)) FILTER (WHERE cm.id IS NOT NULL),'[]') comentarios
     FROM post p JOIN cadastro c ON c.id=p.id_cadastro JOIN area a ON a.id=p.id_area
     LEFT JOIN comentario cm ON cm.id_post=p.id LEFT JOIN cadastro cc ON cc.id=cm.id_cadastro ${where}
     GROUP BY p.id,c.id,a.id ORDER BY p.id DESC`,params)).rows;
 }
 async profile(id:number){ const user=(await this.db.query(`SELECT id,nome,email,foto_url FROM cadastro WHERE id=$1`,[id])).rows[0]; const areas=(await this.db.query(`SELECT * FROM area WHERE id_cadastro=$1 ORDER BY id DESC`,[id])).rows; const posts=(await this.db.query(`SELECT p.*,a.nicho_area FROM post p JOIN area a ON a.id=p.id_area WHERE p.id_cadastro=$1 ORDER BY p.id DESC`,[id])).rows; return {user,areas,posts}; }
 async createArea(b:any){ return (await this.db.query(`INSERT INTO area(nicho_area,tempo_area,id_cadastro) VALUES($1,$2,$3) RETURNING *`,[b.nicho_area,b.tempo_area,b.id_cadastro])).rows[0]; }
 async createPost(b:any){ return (await this.db.query(`INSERT INTO post(id_cadastro,id_area,descricao,imagem_url) VALUES($1,$2,$3,$4) RETURNING *`,[b.id_cadastro,b.id_area,b.descricao,b.imagem_url||null])).rows[0]; }
 async comment(postId:number,b:any){ return (await this.db.query(`INSERT INTO comentario(id_cadastro,id_area,id_post,mensagem) VALUES($1,$2,$3,$4) RETURNING *`,[b.id_cadastro,b.id_area,postId,b.mensagem])).rows[0]; }
}
