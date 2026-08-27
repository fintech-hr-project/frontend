# PicPay People — Frontend

Frontend em React + TypeScript + Axios integrado ao backend Spring Boot do projeto.

## Backend suportado nesta versão

Contrato conferido com o `backend.zip` atual:

- `GET /employees`
- `GET /employees/{id}`
- `POST /employees`

Modelo JSON:

```json
{
  "id": 1,
  "name": "Ana Souza",
  "email": "ana@email.com",
  "phone": "11999999999",
  "role": "Software Engineer",
  "department": "Technology",
  "salary": 7500.00,
  "city": "São Paulo",
  "status": "IN_ANALYSIS"
}
```

Status aceitos: `IN_ANALYSIS`, `APPROVED`, `REJECTED`, `HIRED`.

> PUT, PATCH e DELETE ainda não estão expostos pelo backend recebido. Por isso, esta versão do frontend não dispara essas operações.

## Rodar localmente

1. Suba o backend Spring Boot na porta 8080.
2. Instale as dependências:

```bash
npm install
```

3. Rode o frontend:

```bash
npm run dev
```

No desenvolvimento, o Vite usa proxy `/api` -> `http://localhost:8080`, evitando problema de CORS local.

## Produção

Na Vercel ou outro host, configure:

```env
VITE_API_URL=https://URL-PUBLICA-DO-BACKEND
```

O backend publicado também precisará permitir CORS para o domínio do frontend.
