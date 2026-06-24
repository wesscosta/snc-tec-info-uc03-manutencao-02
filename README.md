# Detetives da Manutenção — Jogo das 3 Pistas

Aplicação web educacional para gamificar o diagnóstico de falhas em computadores. O aluno analisa pistas progressivas, registra diagnóstico provável, possíveis causas e forma de verificação. As respostas são salvas no Supabase e o ranking global é atualizado a partir da pontuação acumulada.

## Finalidade

Este projeto foi criado para uso em sala de aula, especialmente em atividades de manutenção de computadores. O foco é desenvolver raciocínio técnico, levantamento de hipóteses e justificativa de diagnóstico.

## Funcionalidades

- 50 casos técnicos de diagnóstico.
- Sistema de 3 pistas.
- Pontuação por pista utilizada.
- Repescagem valendo 5 pontos.
- Resposta com diagnóstico, causas e verificação.
- Ranking global via Supabase.
- Identificação do aluno salva no `localStorage`.
- Opção para continuar com o mesmo aluno ou trocar usuário.
- Modo local básico caso o Supabase ainda não esteja configurado.

## Pontuação

| Situação | Pontuação |
|---|---:|
| Resposta na 1ª pista | 10 pontos |
| Resposta na 2ª pista | 9 pontos |
| Resposta na 3ª pista | 8 pontos |
| Repescagem | 5 pontos |
| Resposta parcial | metade da pontuação |
| Resposta fora das palavras-chave | 0 ponto, com possibilidade de revisão manual pelo professor |

## Estrutura

```text
/
├── index.html
├── style.css
├── app.js
├── supabase-schema.sql
└── README.md
```

## Configuração do Supabase

1. Crie um projeto no Supabase.
2. Acesse **SQL Editor**.
3. Execute o conteúdo de `supabase-schema.sql`.
4. Acesse **Settings > API Keys**.
5. Copie:
   - Project URL
   - anon public key
6. Abra `app.js` e substitua:

```javascript
const SUPABASE_URL = "COLE_AQUI_A_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "COLE_AQUI_A_CHAVE_ANON_PUBLIC";
```

por:

```javascript
const SUPABASE_URL = "https://seu-projeto.supabase.co";
const SUPABASE_ANON_KEY = "sua-chave-anon-public";
```

Use somente a chave `anon public`. Não coloque a chave `service_role` no frontend.

## Publicação

O projeto pode ser hospedado em serviços estáticos, como:

- GitHub Pages
- Netlify
- Vercel

Para GitHub Pages, envie os arquivos para o repositório e ative em **Settings > Pages**.

## Uso do localStorage

A identificação do aluno ou dupla é salva no navegador usando `localStorage`. Isso evita que o aluno precise digitar nome e turma a cada resposta.

O aluno verá uma tela com:

- continuar com o usuário salvo;
- trocar usuário.

A troca de usuário remove apenas os dados locais daquele navegador. As respostas já enviadas ao Supabase permanecem no banco.

## Observação sobre correção automática

A validação automática utiliza palavras-chave. Isso torna a dinâmica mais rápida em sala, mas não substitui a avaliação do professor.

Em diagnóstico técnico, uma resposta correta pode ser escrita de várias formas. Portanto, para fins avaliativos formais, recomenda-se revisar as respostas no Supabase.

## Considerações sobre segurança

Esta aplicação não foi desenvolvida com foco em segurança da informação, controle antifraude ou ambiente de produção.

Algumas simplificações foram adotadas para facilitar o uso didático:

- não há login com autenticação real;
- a chave `anon public` fica no frontend;
- as políticas RLS são permissivas;
- o nome do aluno é salvo no navegador;
- não há proteção robusta contra envio duplicado, manipulação de dados, automação ou fraude;
- a pontuação pode ser influenciada pelo conteúdo digitado pelo aluno.

Para uso real em produção, seria necessário implementar autenticação, políticas RLS restritivas, validação em backend, controle de permissões, limitação de requisições e painel administrativo seguro.

## Licença

Projeto com finalidade educacional. Pode ser adaptado para atividades de ensino, desde que observadas as limitações de segurança descritas acima.
