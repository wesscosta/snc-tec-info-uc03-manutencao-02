# Detetives da Manutenção — Supabase + GitHub Pages

## Como publicar

1. Crie um projeto no Supabase.
2. Vá em SQL Editor e execute o arquivo `supabase-schema.sql`.
3. Vá em Project Settings > API.
4. Copie:
   - Project URL
   - anon public key
5. Abra o arquivo `app.js` e substitua:
   - `COLE_AQUI_A_URL_DO_SUPABASE`
   - `COLE_AQUI_A_CHAVE_ANON_PUBLIC`
6. Envie os arquivos para um repositório no GitHub.
7. Ative o GitHub Pages em Settings > Pages.

## Observação importante

A correção é automática por palavras-chave. Para uma avaliação formal, o ideal é o professor revisar as respostas no Supabase, pois diagnóstico técnico em texto livre pode ter respostas corretas escritas de formas diferentes.

## Arquivos

- `index.html`: página principal.
- `style.css`: visual do site.
- `app.js`: lógica do jogo, casos, pontuação e integração Supabase.
- `supabase-schema.sql`: tabela, políticas e ranking.
