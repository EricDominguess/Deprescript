# Deprescript Backend

Backend API para o sistema Deprescript desenvolvido com Node.js, Express, TypeScript e MongoDB.

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (v6 ou superior) ou MongoDB Atlas
- npm ou yarn

## 🚀 Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure o arquivo `.env`:**
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="mongodb://localhost:27017/deprescript"
# Ou para MongoDB Atlas:
# DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/deprescript"
JWT_SECRET="seu-secret-key-super-seguro-aqui"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV=development
```

3. **Execute as migrações do Prisma:**
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. **Execute o seed para criar usuários de teste:**
```bash
npm run prisma:seed
```

Isso criará:
- **Paciente de teste:** `paciente@teste.com` / senha: `123456`
- **Médico de teste:** `medico@teste.com` / senha: `123456`

## 🏃 Executando o projeto

**Modo desenvolvimento:**
```bash
npm run dev
```

**Modo produção:**
```bash
npm run build
npm start
```

## 📡 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/signup` - Cadastro de novo usuário
- `POST /api/auth/forgot-password` - Redefinir senha

### Health Check

- `GET /health` - Verifica se a API está funcionando

## 🗄️ Banco de Dados

O projeto utiliza Prisma ORM para gerenciar o banco de dados. Para visualizar os dados:

```bash
npm run prisma:studio
```

## 📁 Estrutura do Projeto

```
Backend/
├── src/
│   ├── config/          # Configurações (banco, env)
│   ├── controllers/     # Lógica de negócio
│   ├── middleware/      # Middlewares (auth, error)
│   ├── routes/          # Rotas da API
│   ├── utils/           # Utilitários (validação, criptografia)
│   └── server.ts        # Servidor principal
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
└── package.json
```

## 🔐 Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação via JWT
- Validação de dados com Zod
- Middleware de autenticação para rotas protegidas

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrações do banco
- `npm run prisma:seed` - Cria usuários de teste no banco
- `npm run prisma:studio` - Abre o Prisma Studio
- `npm run lint` - Executa o linter

