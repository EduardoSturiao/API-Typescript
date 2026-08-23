-> API-Typescript

API REST em Node.js + Express + TypeScript + MongoDB (Mongoose). Gerencia **clientes**, **usuários** e **vendas mensais**, com uma interface web simples já integrada (`client/`).

-> Requisitos

- Node.js (versão com suporte nativo a TypeScript)
- MongoDB rodando (local ou Atlas)

-> Instalação

```bash
npm install
```

Cria um arquivo `.env` na raiz com:

```
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=um_segredo_qualquer
```

-> Rodando

```bash
npm run dev        # inicia o servidor com watch
npm run typecheck  # checa erros de tipo sem rodar
```

Servidor sobe em `http://localhost:3000`. Esse mesmo endereço já serve a interface — não é preciso abrir os arquivos de `client/` separadamente.

-> Testando pela interface

Já tem uma versão publicada, sem precisar instalar nada:

**https://api-typescript-coral.vercel.app/**

Ou, rodando localmente (`npm run dev`), acesse `http://localhost:3000`.

Em qualquer um dos dois, faça login com o usuário de teste fixo da tela:

```
Usuário: admin
Senha:   123
```

No painel, crie/liste/exclua clientes, usuários e vendas — cada ação já chama a API real e reflete direto no MongoDB.

Esse login é só uma trava de tela (fica no `client/script.js`, não existe rota de autenticação na API ainda) — ele não protege as rotas da API. Por isso, a versão publicada usa um banco MongoDB separado, só de demonstração (`bancoCRUDteste`), diferente do banco usado em desenvolvimento local: fique à vontade pra testar sem risco de mexer em dados reais.

As chamadas feitas pelo painel usam exatamente os endpoints abaixo.

-- Endpoints

-> Clientes (`/clientes`)

 GET | `/clientes` | - |
 POST | `/clientes` | `{ "nome": "string", "email": "string" }` |
 DELETE | `/clientes/:id` | - |

-> Usuários (`/usuarios`)

 GET | `/usuarios` | - |
 POST | `/usuarios` | `{ "nome": "string", "email": "string", "senha": "string" }` |

-> Vendas mensais (`/vendas`)

 GET | `/vendas` | - |
 POST | `/vendas` | `{ "cliente": "id_do_cliente", "mes": 1-12, "valorVendido": number }` |
 DELETE | `/vendas/:id` | - |

-> Deploy

O projeto já tem `vercel.json` configurado: a API sobe como serverless function e o `client/` é servido como estático, tudo na mesma URL. Basta configurar `MONGO_URI` e `JWT_SECRET` nas Environment Variables do projeto no Vercel antes do deploy.

-> Stack

Express 5 · TypeScript 6 · Mongoose · bcrypt
