# UC03 Arena Técnica v3

Plataforma gamificada para a UC03: Planejar e Executar a Manutenção de Computadores.

## O que mudou na v3

- Interface redesenhada em estilo plataforma, com sidebar compacta.
- Dashboard inicial com XP, ranking, modo da turma e trilha de aprendizagem.
- Modo História para respostas individuais.
- Modo Arena exclusivo do professor.
- Configuração global de modo da turma.
- Bloqueio dos módulos do aluno quando a Arena está ativa.
- Consultoria de Hardware retomada com estrutura mais próxima da versão original.
- Anatomia da Placa-mãe com imagem e ficha técnica.
- Ranking, conquistas e missões.

## Configuração

No arquivo `app.js`, altere:

```js
const SUPABASE_URL='COLE_AQUI_A_URL_DO_SUPABASE';
const SUPABASE_ANON_KEY='COLE_AQUI_A_ANON_KEY_DO_SUPABASE';
```

Depois execute `supabase-schema.sql` no SQL Editor do Supabase.

## PIN do professor

O PIN padrão está em `app.js`:

```js
const TEACHER_PIN='1234';
```

## Aviso importante de segurança

Esta aplicação é educacional e não foi criada com foco em segurança de produção. O PIN do professor fica no frontend, a chave anon do Supabase fica visível e as políticas RLS foram simplificadas para facilitar a implantação em sala.

Para produção, implemente:

- Supabase Auth;
- perfis professor/aluno;
- RLS restritiva;
- Edge Functions para avaliações e configuração global;
- rate limiting;
- auditoria de alterações.

## Hospedagem

Pode ser publicado no GitHub Pages, Netlify ou Vercel como site estático.
