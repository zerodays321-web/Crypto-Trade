# WXT - Guia de Setup

## 🚀 Quick Start

### 1. Pré-requisitos
- Docker & Docker Compose instalados
- Git

### 2. Clone e Configure
```bash
git clone https://github.com/zerodays321-web/crypto-trade.git
cd crypto-trade
```

### 3. Inicie os serviços
```bash
docker-compose up -d
```

### 4. Aguarde a inicialização
```bash
docker-compose logs -f
```

### 5. Acesse a aplicação

- **Frontend**: http://localhost:3000
- **API Node.js**: http://localhost:5000
- **API Java**: http://localhost:8080
- **Banco de Dados**: localhost:5432

## 📝 Credenciais Padrão

### Admin
```
Email: admin@wxt.com
Senha: admin123456
```

### Usuário Demo
```
Email: user@wxt.com
Senha: user123456
```

## 🔧 Variáveis de Ambiente

O arquivo `.env` é criado automaticamente no primeiro startup com valores padrão.

## 📚 Estrutura do Projeto

```
crypto-trade/
├── frontend/              # React App
├── backend-node/          # API Node.js
├── backend-java/          # Serviço Java
├── database/              # Scripts SQL
└── docker-compose.yml     # Orquestração
```

## 🆘 Troubleshooting

### Porta já em uso
```bash
docker-compose down
docker-compose up -d
```

### Resetar banco de dados
```bash
docker volume rm crypto-trade_postgres_data
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f [service-name]
```