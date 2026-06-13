# CryptoTrade - Plataforma de Investimento

Uma plataforma completa de investimento com suporte a ações, criptomoedas, fundos de investimento e painel administrativo.

## 🚀 Stack Tecnológico

- **Frontend**: React + TypeScript
- **Backend API**: Node.js + Express
- **Backend Processamento**: Java + Spring Boot
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Containerização**: Docker

## 📁 Estrutura do Projeto

```
crypto-trade/
├── frontend/                 # Aplicação React
│   ├── src/
│   ├── public/
│   └── package.json
├── backend-node/            # API REST Node.js
│   ├── src/
│   ├── routes/
│   └── package.json
├── backend-java/            # Serviço Java
│   ├── src/
│   └── pom.xml
├── database/                # Scripts SQL
│   └── migrations/
├── docker-compose.yml       # Orquestração dos serviços
└── docs/                    # Documentação
```

## ✨ Funcionalidades Principais

### Usuário
- ✅ Autenticação e cadastro
- ✅ Compra/Venda de ações
- ✅ Compra/Venda de criptomoedas
- ✅ Investimento em fundos
- ✅ Carteira de investimentos
- ✅ Histórico de transações
- ✅ Dashboard personalizado

### Administrador
- ✅ Gerenciar usuários
- ✅ Gerenciar ativos (ações, criptos, fundos)
- ✅ Relatórios de transações
- ✅ Monitoramento de sistema
- ✅ Configurações de comissões
- ✅ Auditoria de operações

## 🏃 Quick Start

### Pré-requisitos
- Docker e Docker Compose
- Node.js 16+
- Java 11+
- PostgreSQL 13+

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/zerodays321-web/crypto-trade.git
cd crypto-trade

# Inicie os serviços com Docker Compose
docker-compose up -d

# Frontend
cd frontend
npm install
npm start

# Backend Node
cd backend-node
npm install
npm start

# Backend Java
cd backend-java
mvn spring-boot:run
```

## 📚 Documentação
Veja `/docs` para documentação detalhada, guias de API e configuração.

## 📝 Licença
MIT
