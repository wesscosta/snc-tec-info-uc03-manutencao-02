<<<<<<< HEAD
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
=======
# 🎮 Jogo de Diagnóstico de Manutenção de Computadores

Sistema web desenvolvido para apoiar atividades práticas da Unidade Curricular **Planejar e Executar a Manutenção de Computadores**.

O objetivo da aplicação é estimular o raciocínio lógico dos alunos por meio de desafios de diagnóstico de falhas em computadores, utilizando um sistema de pontuação e ranking em tempo real.

---

# Objetivos

- Desenvolver o raciocínio técnico para diagnóstico de falhas.
- Estimular a formulação de hipóteses antes da troca de componentes.
- Tornar a aula mais dinâmica através da gamificação.
- Permitir o acompanhamento do desempenho dos alunos por meio de um ranking global.

---

# Funcionalidades

- Cadastro do aluno
- Seleção de casos de diagnóstico
- Sistema de pistas (1ª, 2ª e 3ª)
- Registro das respostas
- Cálculo automático da pontuação
- Ranking global
- Armazenamento das respostas no Supabase
- Interface responsiva
- Hospedagem via GitHub Pages

---

# Tecnologias

- HTML5
- CSS3
- JavaScript
- Supabase
- PostgreSQL
- GitHub Pages

---

# Estrutura do Projeto

```
/
│
├── index.html
├── style.css
├── app.js
├── supabase-schema.sql
└── README.md
```

---

# Configuração

## 1. Criar um projeto no Supabase

https://supabase.com

---

## 2. Executar o script SQL

Abra:

```
SQL Editor
```

Execute o arquivo

```
supabase-schema.sql
```

---

## 3. Obter as credenciais

No painel do Supabase:

```
Settings
    API Keys
```

Copie:

- Project URL
- anon public key

---

## 4. Configurar o projeto

No arquivo `app.js` altere:

```javascript
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";

const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLIC";
```

---

## 5. Publicar

O projeto pode ser publicado em qualquer hospedagem estática, como:
>>>>>>> 0024867c05f6dab4cf016046274fc13faa0ff5f5

- GitHub Pages
- Netlify
- Vercel

<<<<<<< HEAD
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
=======
---

# Banco de Dados

Tabela principal

```
respostas_jogo
```

View utilizada pelo ranking

```
ranking_global
```

---

# Fluxo da aplicação

Aluno

↓

Escolhe o caso

↓

Analisa as pistas

↓

Responde

↓

Resposta salva no Supabase

↓

Pontuação calculada

↓

Ranking atualizado

---

# Sistema de Pontuação

| Situação | Pontos |
|----------|--------|
| Acertou na primeira pista | 10 |
| Acertou na segunda pista | 9 |
| Acertou na terceira pista | 8 |
| Outro aluno respondeu | 5 |

---

# Finalidade

Esta aplicação foi desenvolvida exclusivamente para fins educacionais, apoiando atividades de gamificação em aulas de manutenção de computadores.

O foco principal é proporcionar uma experiência simples, rápida e de fácil implantação em ambientes de ensino.

---

# Considerações sobre Segurança

Este projeto **não foi desenvolvido com foco em segurança da informação**, escalabilidade ou uso em ambientes de produção.

Algumas simplificações foram adotadas propositalmente para facilitar o aprendizado e a implantação durante as aulas, entre elas:

- utilização da chave **anon** do Supabase no frontend;
- regras de acesso (RLS) simplificadas;
- ausência de autenticação de usuários;
- inexistência de mecanismos para impedir fraude de pontuação;
- ausência de validação robusta das entradas;
- inexistência de proteção contra automação (bots), spam ou requisições maliciosas.

Portanto, **não é recomendado utilizar este projeto em produção ou em ambientes públicos sem a implementação de mecanismos adicionais de segurança**, como:

- autenticação de usuários;
- políticas RLS restritivas;
- validação no backend;
- funções Edge Functions ou API intermediária;
- limitação de requisições (Rate Limiting);
- auditoria e registro de eventos;
- criptografia de dados sensíveis, quando aplicável.

---

# Possíveis Evoluções

- Login dos alunos
- Login do professor
- Painel administrativo
- Cadastro dinâmico de casos
- Upload de imagens
- Cronômetro por questão
- Ranking por turma
- Ranking semanal
- Ranking geral
- Relatórios em PDF
- Exportação para Excel
- Dashboard de desempenho
- Histórico individual do aluno
- Controle de tempo de resposta
- Integração com Microsoft Teams
- Integração com Google Classroom

---

# Licença

Este projeto possui finalidade exclusivamente educacional e pode ser utilizado como base para estudos, adaptações e atividades em sala de aula.
>>>>>>> 0024867c05f6dab4cf016046274fc13faa0ff5f5
