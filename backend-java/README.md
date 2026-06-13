# WXT Backend - Java/Spring Boot

☕ Serviço backend desenvolvido em Java com Spring Boot para processamento de transações e análises.

## ✨ Features

- ✅ Processamento de transações
- ✅ Análise de mercado
- ✅ Geração de relatórios
- ✅ Cache de preços
- ✅ Performance otimizada
- ✅ Integração com banco de dados

## 📦 Stack

- Java 11+
- Spring Boot 2.7
- PostgreSQL
- JPA/Hibernate

## 🏃 Como rodar

```bash
cd backend-java
mvn clean install
mvn spring-boot:run
```

API: http://localhost:8080

## 📚 Endpoints

### Market
- `GET /api/market/prices` - Preços
- `GET /api/market/analysis/{symbol}` - Análise
- `GET /api/market/history/{symbol}` - Histórico

### Reports
- `GET /api/reports/transactions` - Transações
- `GET /api/reports/portfolio` - Carteira
- `GET /api/reports/performance` - Performance

### Health
- `GET /api/health` - Status
