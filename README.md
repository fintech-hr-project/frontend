# Fintech HR — Frontend

Small React + TypeScript frontend for managing employee/candidate records at a
fintech company's HR team. It talks to a Spring Boot backend over a REST API
built with Axios, and covers the day-to-day recruitment flow: an overview
dashboard, a searchable/filterable candidate list, a form to register new
candidates, and a details view per candidate.

## Features

- **Dashboard** — quick stats and a filtered snapshot of candidates.
- **Candidates** — full list with search (name, role, email), status and role
  filters, and pagination.
- **New candidate** — form to register a candidate, with client-side
  validation.
- **Candidate details** — single-record view by id.

## Tech stack

- React 19 + TypeScript
- Vite
- React Router
- Axios

## Backend contract

The frontend expects a Spring Boot backend exposing:

- `GET /employees`
- `GET /employees/{id}`
- `POST /employees`
- `PUT /employees/{id}`
- `PATCH /employees/{id}`
- `DELETE /employees/{id}`

Employee JSON shape:

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

Accepted `status` values: `IN_ANALYSIS`, `APPROVED`, `REJECTED`, `HIRED`.

## Running locally

1. Start the Spring Boot backend on port 8080.
2. Install dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm run dev
```

In development, Vite proxies `/api` to `http://localhost:8080`, avoiding
local CORS issues.

## Production

On Vercel or any other host, set:

```env
VITE_API_URL=https://YOUR-BACKEND-PUBLIC-URL
```

The deployed backend also needs to allow CORS for the frontend's domain.
