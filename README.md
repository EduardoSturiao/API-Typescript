-> API-Typescript

API REST em Node.js + Express + TypeScript + MongoDB (Mongoose), com autenticação via JWT. Gerencia **clientes**, **usuários** e **vendas mensais**.

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
npm run dev        # inicia o servidor com watch ou nodemon (sua preferencia)
npm run typecheck  # checa erros de tipo sem rodar
```

Servidor sobe em `http://localhost:3000`.

-> Autenticação

Rotas protegidas exigem o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

O token é obtido via `POST /usuarios/login`.

-- Endpoints

-> Clientes (`/clientes`)

 GET | `/clientes` | - |
 POST | `/clientes` | `{ "nome": "string", "email": "string" }` |
 DELETE | `/clientes/:id` | - |

-> Usuários (`/usuarios`)

 GET | `/usuarios` | - |
 POST | `/usuarios` | `{ "nome": "string", "email": "string", "senha": "string" }` |
 POST | `/usuarios/login` | `{ "email": "string", "senha": "string" }` |

-> Vendas mensais (`/vendas`) (token necessario aqui)

 GET | `/vendas?mes=&pagina=&limite=&ordem=maior` | - | ✅ |
 POST | `/vendas` | `{ "cliente": "id_do_cliente", "mes": 1-12, "valorVendido": number }` | - |
 PUT | `/vendas/:id` | campos a atualizar | - |
 DELETE | `/vendas/:id` | - | - |

-> testes sugeridos

1. `GET /` — confirma que o servidor está no ar
2. `POST /clientes` — cria um cliente e guarda o `_id`
3. `POST /usuarios` — cadastra um usuário
4. `POST /usuarios/login` — pega o token JWT
5. `POST /vendas` — cria uma venda usando o `_id` do cliente
6. `GET /vendas` — com o token no header `Authorization`, confere paginação e `populate` do cliente
7. `PUT /vendas/:id` — atualiza a venda
8. `DELETE /clientes/:id` — deleta o cliente e confirma que suas vendas somem junto (cascade delete)

-> Stack

Express 5 · TypeScript 6 · Mongoose · JWT · bcrypt
