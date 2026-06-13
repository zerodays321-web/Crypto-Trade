# WXT Backend - Node.js API

🚀 API REST desenvolvida em Node.js com Express.js para gerenciamento de investimentos.

## ✨ Features

- ✅ Autenticação JWT
- ✅ CRUD de usuários
- ✅ Gerenciamento de transações
- ✅ Carteira de investimentos
- ✅ Preços de mercado
- ✅ Painel administrativo
- ✅ Validação de dados
- ✅ Tratamento de erros robusto

## 📦 Stack

- Node.js 18+
- Express.js
- PostgreSQL
- JWT
- Bcrypt

## 🏃 Como rodar

```bash
cd backend-node
npm install
cp .env.example .env
npm start
```

API: http://localhost:5000

## 📚 Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Renovar token

### Usuários
- `GET /api/users/me` - Perfil
- `GET /api/users/portfolio` - Carteira
- `PUT /api/users/profile` - Atualizar

### Transações
- `GET /api/transactions` - Histórico
- `POST /api/transactions/buy` - Comprar
- `POST /api/transactions/sell` - Vender

### Admin
- `GET /api/admin/users` - Usuários
- `GET /api/admin/dashboard` - Dashboard
- `POST /api/admin/assets` - Criar ativo
