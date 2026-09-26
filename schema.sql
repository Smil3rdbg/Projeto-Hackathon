-- Execute no banco PostgreSQL apontado por DATABASE_URL.
CREATE TABLE cadastro(
 id SERIAL PRIMARY KEY,
 nome VARCHAR(50) NOT NULL,
 email VARCHAR(50) NOT NULL UNIQUE,
 senha VARCHAR(255) NOT NULL,
 foto_url TEXT
);
CREATE TABLE area(
 id SERIAL PRIMARY KEY,
 nicho_area VARCHAR(50),
 tempo_area INT,
 id_cadastro INT NOT NULL REFERENCES cadastro(id) ON DELETE CASCADE
);
CREATE TABLE post(
 id SERIAL PRIMARY KEY,
 id_cadastro INT NOT NULL REFERENCES cadastro(id) ON DELETE CASCADE,
 id_area INT NOT NULL REFERENCES area(id) ON DELETE CASCADE,
 descricao VARCHAR(1228),
 imagem_url TEXT
);
CREATE TABLE IF NOT EXISTS curtida(
 id SERIAL PRIMARY KEY,
 id_cadastro INT NOT NULL REFERENCES cadastro(id) ON DELETE CASCADE,
 id_post INT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
 UNIQUE(id_cadastro,id_post)
);
CREATE TABLE comentario(
 id SERIAL PRIMARY KEY,
 id_cadastro INT NOT NULL REFERENCES cadastro(id) ON DELETE CASCADE,
 id_area INT NOT NULL REFERENCES area(id) ON DELETE CASCADE,
 id_post INT NOT NULL REFERENCES post(id) ON DELETE CASCADE,
 mensagem VARCHAR(1228)
);

-- Cria o usuário que o site usará
CREATE ROLE nexa_app LOGIN PASSWORD 'pxQ4VE@GRSY-fs2';

-- Permite conectar ao banco e acessar o esquema public
GRANT CONNECT ON DATABASE postgres TO nexa_app;
GRANT USAGE ON SCHEMA public TO nexa_app;

-- Permite consultar e alterar dados nas tabelas do site
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.cadastro, public.area, public.post, public.comentario, public.curtida
TO nexa_app;

-- Permite gerar os IDs automáticos
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nexa_app;

-- Impede criar tabelas novas
REVOKE CREATE ON SCHEMA public FROM nexa_app;

CREATE POLICY nexa_app_cadastro
ON public.cadastro FOR ALL TO nexa_app
USING (true) WITH CHECK (true);

CREATE POLICY nexa_app_area
ON public.area FOR ALL TO nexa_app
USING (true) WITH CHECK (true);

CREATE POLICY nexa_app_post
ON public.post FOR ALL TO nexa_app
USING (true) WITH CHECK (true);

CREATE POLICY nexa_app_comentario
ON public.comentario FOR ALL TO nexa_app
USING (true) WITH CHECK (true);

select * from cadastro, area, post, comentario
