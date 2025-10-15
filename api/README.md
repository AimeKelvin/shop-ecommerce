# Ecom Display Backend

## Setup
1. copy `.env.example` ➜ `.env` and fill values.
2. `npm install`
3. `npm run seed` to insert demo product(s).
4. `npm run dev` (development) or `npm start` for production.

## Notes
- Auth: JWT via Authorization: Bearer <token>
- Swagger UI: http://localhost:4000/api/docs
- WhatsApp "buy" flow: front-end should construct a WhatsApp URL using WHATSAPP_NUMBER environment variable. Example:
  `https://wa.me/<number>?text=I%20want%20to%20buy%20%3Cproduct_name%3E%20-%20ID:%20%3Cproduct_id%3E`
