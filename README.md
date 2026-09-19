# AstraX FINAL

A production-oriented Next.js foundation for AstraX.

## Run
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Put your own OpenAI key in `OPENAI_API_KEY`.
4. Optional: configure Google OAuth with `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `AUTH_SECRET`.
5. `npm install`
6. `npm run dev`

Open http://localhost:3000.

## Included
- Holographic responsive AstraX UI
- Real OpenAI Responses API streaming
- Abort-safe stream endpoint architecture
- Local chat persistence in browser
- Usage endpoint with 1000-request / 10-minute application policy
- Auth.js Google provider wiring
- PWA manifest foundation
- Environment-variable API key handling

## Important production notes
The quota shown here is intentionally a small reference implementation. Its counter is process-local; for real multi-user production quota, replace it with Redis/Postgres and key it by authenticated user/account. Add a database adapter for persistent chats, secure file parsing, object storage, web-search provider, image/voice provider, CSRF/input validation, logging, and a real admin authorization layer before public deployment.

The OpenAI key must remain server-side. Never put it in browser code or commit `.env.local`.
