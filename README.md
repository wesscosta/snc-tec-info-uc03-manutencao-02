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

- GitHub Pages
- Netlify
- Vercel

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
