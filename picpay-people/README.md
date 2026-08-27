# PicPay People — Frontend React + TypeScript

Frontend do desafio de Desenvolvimento: sistema interno de RH para gestão de candidatos.

## Tecnologias
- Vite
- React
- TypeScript
- React Router
- Axios
- Lucide React

## Como executar
```bash
npm install
npm run dev
```

## Variável de ambiente
O arquivo `.env` aponta por padrão para:
```env
VITE_API_URL=http://localhost:8080
```

## API esperada
- `GET /funcionarios`
- `GET /funcionarios/{id}`
- `POST /funcionarios`
- `PUT /funcionarios/{id}`
- `PATCH /funcionarios/{id}`
- `DELETE /funcionarios/{id}`

## Regra da tela de edição
Existe apenas uma tela de edição para o usuário.
- Se apenas `cargo`, `status` e/ou `salario` forem alterados, o frontend usa PATCH.
- Se qualquer outro campo também for alterado, o frontend envia a atualização completa via PUT.

## Estrutura
- `src/components/`: componentes reutilizáveis
- `src/pages/`: páginas
- `src/services/`: comunicação HTTP com Axios
- `src/types/`: interfaces e tipos TypeScript
- `src/utils/`: validações e regras auxiliares
- `src/router/`: rotas React Router

## Observação sobre CORS
O Spring Boot deverá permitir requisições vindas do endereço do Vite (normalmente `http://localhost:5173`).
