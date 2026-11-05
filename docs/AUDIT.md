# Project Sprout audit and cloud deployment checklist

Status: alpha.38 source changes committed. **Cloud AI is NOT deployed or verified.**

## Existing protections
- Mobile WebGPU inference blocked after repeated browser crashes.
- AI action validation restricted to current indoor/outdoor context; rejected actions use scripted fallback.
- Stale AI responses ignored after disable/re-enable.
- Save export/import already exists in Options; a periodic local backup is now retained under `project-sprout-v2-backup`.
- Node smoke tests run before GitHub Pages deployment.

## Cloudflare Worker setup (manual, requires account ownership)
1. Deploy `backend/worker.js` to Cloudflare Workers, not GitHub Pages.
2. Set `OPENAI_API_KEY` as an encrypted Worker secret; never commit it.
3. Set `ALLOWED_ORIGIN=https://deanio988.github.io` and configure a Cloudflare `RATE_LIMITER` binding with a conservative per-IP limit. The Worker fails closed without this binding.
4. Set a hard API project spending budget, monitor usage, and configure Worker-side quotas. Origin checks and IP limits are **not user authentication**. Add Turnstile or an authenticated session before allowing unrestricted public traffic.
5. Set the Worker URL in the game's Cloud only mode and opt in to AI. Test on a separate device before inviting other players.
6. Confirm CORS, invalid requests, rate-limit responses, timeout handling, and a model decision both indoors and outdoors.

## Known remaining gaps
- Worker lacks identity-backed authentication, persistent usage quotas, and a deployed URL. Do not describe it as production-secure.
- Cloud responses may be stale when the pet changes location during inference; action application rejects them and falls back.
- Chat remains a scripted keyword responder; it is not yet connected to the model.
- Outdoor tree collision and furniture collision are not complete; visual alignment requires device testing.
- Automated tests are source smoke checks, not full gameplay integration tests.

## Regression checklist
- Export a save, refresh, import it, and confirm progress.
- Verify movement, sleeping, weather and chat on Android with AI disabled.
- Confirm Local only on Android produces a safe error without attempting model download.
- Confirm an invalid AI action cannot leave the creature permanently stationary.
- Verify the visible version matches the HTML title and latest deployment.
