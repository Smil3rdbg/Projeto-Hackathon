# Nexa

Interface redesenhada e backend NestJS conectado ao PostgreSQL do projeto.

## Páginas incluídas
- Landing page
- Entrar / criar conta
- Feed
- Explorar áreas
- Criar publicação
- Perfil e experiências

## Banco PostgreSQL
1. Rode `database.sql` no PostgreSQL.
2. Copie `.env.example` para `.env` e configure `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`.
3. Rode `npm install` e `npm run start:dev`.
4. Sirva a pasta `frontend` (por exemplo com Live Server). A API esperada é `http://localhost:3000/api/v1`.

### Ajustes necessários no SQL original
`senha VARCHAR(15)` não comporta uma senha armazenada de forma segura. O projeto usa Argon2, portanto `database.sql` usa `VARCHAR(255)`. Também foram adicionados `foto_url` em `cadastro` e `imagem_url` em `post`. Esses campos guardam **somente a URL** do arquivo em nuvem; a imagem não é armazenada no PostgreSQL.

## Fotos na nuvem
Use Cloudinary, Supabase Storage ou Amazon S3. O fluxo correto é:
1. o navegador envia a foto ao serviço de storage;
2. o serviço retorna uma URL HTTPS;
3. o frontend envia essa URL à API;
4. PostgreSQL salva apenas `foto_url` / `imagem_url`.

Na tela “Nova publicação” já existe o campo de URL da imagem e o feed/perfil já renderizam `imagem_url`. Para produção, substitua esse campo por um uploader do provedor escolhido.

## Acessibilidade
A interface inclui preferências persistentes no navegador: modo escuro, ajuste de tamanho do texto, alto contraste, redução de animações e modo de texto mais legível. Também há navegação por teclado com foco visível, link "Pular para o conteúdo principal", rótulos ARIA no painel e respeito à preferência `prefers-reduced-motion` do sistema.
