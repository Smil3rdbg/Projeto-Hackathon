# Publicar na Vercel

1. Envie o conteúdo desta pasta para a raiz do repositório (package.json e vercel.json na raiz).
2. Na Vercel, escolha Framework Preset: Other e Root Directory: a pasta que contém package.json. Deixe Output Directory em branco.
3. Configure a variável de ambiente `DATABASE_URL` com uma conexão PostgreSQL acessível pela Vercel. Configure `DB_SSL=true` se seu provedor exigir SSL.
4. Execute o deploy. A página fica em `/` e a API em `/api/v1`. Verifique `/api/v1/health`.
5. Aplique `schema.sql` no banco antes de cadastrar usuários. Use um banco persistente, pois a Vercel executa a API em funções serverless.

O build usa `tsc` para evitar o erro `fsPath` do Nest CLI durante o deploy. A função em `api/index.ts` inicializa o NestJS. O cadastro e o login exigem um PostgreSQL configurado; este ZIP não cria banco automaticamente.
