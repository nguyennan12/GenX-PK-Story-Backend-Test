# Backend Developer (Node.js) Test — GenX PK Story

Express + TypeScript REST API skeleton exposing two endpoints:

- `POST /schedule/generate` — class schedule / end date generation
- `POST /invoice/calc` — tuition invoice calculation (subtotal, discount, refund, total)

## Tech stack

| Layer         | Choice                          |
| ------------- | -------------------------------- |
| Runtime       | Node.js (>= 20)                 |
| Language      | TypeScript (strict)             |
| Framework     | Express 5                       |
| Validation    | Zod                              |
| Testing       | Vitest + Supertest              |
| Dev runner    | tsx (watch mode)                |
| Lint / Format | ESLint (flat config) + Prettier |

## Getting started

```bash
npm install
cp .env.example .env   # optional, defaults to PORT=3000
npm run dev
```

## Scripts

| Command               | Description                       |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start dev server with hot reload   |
| `npm run build`        | Compile `src/` → `dist/`           |
| `npm start`            | Run the compiled build             |
| `npm test`             | Run tests once                     |
| `npm run test:watch`   | Run tests in watch mode            |
| `npm run typecheck`    | Type-check without emitting        |
| `npm run lint`         | Lint the codebase                  |
| `npm run format`       | Format with Prettier               |

## Project structure

```text
src/
├── app.ts             # Express app factory (no listen — testable)
├── server.ts          # Entry point: reads PORT, starts HTTP server
├── controllers/       # HTTP layer
├── services/          # Business logic
├── validators/        # Zod schemas
├── routes/            # Route definitions
├── middlewares/       # validate.middleware.ts, error.middleware.ts
└── types/             # Shared types

tests/    # Vitest test suites
docs/     # ERD / API list
```



## Environments

| Environment | Base URL                   |
| ----------- | --------------------------- |
| Local       | `http://localhost:3000`     |
| Production  | `https://pks.static4j.app`  |



## API

### `POST /schedule/generate`

**Local**

```bash
curl -X POST http://localhost:3000/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2026-01-01",
    "totalClasses": 16,
    "classWeekdays": [1, 3],
    "holidays": ["2026-04-30", "2026-05-01"],
    "holidayRanges": [["2026-01-26", "2026-02-05"]]
  }'
```

**Production**

```bash
curl -X POST https://pks.static4j.app/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2026-01-01",
    "totalClasses": 16,
    "classWeekdays": [1, 3],
    "holidays": ["2026-04-30", "2026-05-01"],
    "holidayRanges": [["2026-01-26", "2026-02-05"]]
  }'
```

**Response**

```json
{
  "endDate": "2026-03-19",
  "fullSchedule": ["2026-01-01", "..."]
}
```

### `POST /invoice/calc`

**Local**

```bash
curl -X POST http://localhost:3000/invoice/calc \
  -H "Content-Type: application/json" \
  -d '{
    "courseType": "MONTHLY",
    "basePrice": 1500000,
    "months": 2,
    "promoCode": "SAVE10",
    "canceledClasses": 1,
    "refundPerClass": 40000
  }'
```

**Production**

```bash
curl -X POST https://pks.static4j.app/invoice/calc \
  -H "Content-Type: application/json" \
  -d '{
    "courseType": "MONTHLY",
    "basePrice": 1500000,
    "months": 2,
    "promoCode": "SAVE10",
    "canceledClasses": 1,
    "refundPerClass": 40000
  }'
```

**Response**

```json
{
  "subtotal": 3000000,
  "discount": 300000,
  "refund": 40000,
  "total": 2660000
}
```

### Error format

**400 — validation error**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [{ "field": "months", "reason": "must be between 1 and 3" }]
  }
}
```

**500 — unexpected error** (no stack trace ever leaked to the client)

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error"
  }
}
```

**404** — unmatched routes, `code: "NOT_FOUND"`.

## Date & timezone conventions

| Rule               | Value                            |
| ------------------- | --------------------------------- |
| Date format         | `YYYY-MM-DD`                      |
| Timezone            | `Asia/Ho_Chi_Minh`                |
| Weekday convention  | `0 = Monday ... 6 = Sunday`       |
| `holidayRanges`     | inclusive on both start and end   |

Shared helpers: `src/utils/date.utils.ts` (`isValidDateString`, `toProjectWeekday`).