## Module Paths

```plaintext
src/<category>/<vendor>/[<version>/][<endpoint>/]<METHOD>/index.ts

src/email/postmark/POST/index.ts              # no version in URL
src/sms/twilio/2010-04-01/POST/index.ts       # date version, copied as-is
src/message/bizgo/v1/send/omni/POST/index.ts  # multiple endpoints under v1
```

### `<version>`

- Copied from the request URL.
- Kept even if only one version exists.
- Omitted only when the URL has none.

### `<endpoint>`

- Copied from the request URL, and may span multiple segments (e.g. `send/omni`).
- Added only when multiple endpoints are implemented under that version.
- Path parameter values are dropped, but their literal segments are kept.

```plaintext
POST /v1/user/id/{id}/ban  →  v1/user/id/ban/POST
GET  /v1/user/id/{id}      →  v1/user/id/GET
```

## Arguments

- Not validated. Requests are sent as-is and rejected by the API.
- Not mutated. Defaults (e.g. `opts.from`) are applied to a copy.

## Errors

- Not thrown. Returned as an `Error` (e.g. `fetch` rejection, unparsable body).

## Testing

### Unit Tests

- Colocated as `<METHOD>/index.test.ts`, with `fetch` stubbed by `captureFetch`.
- Grouped with `describe`, named after the module path (e.g. `sms/nhn/v3.0/POST`) or the helper (e.g. `tryFetch`).
- Added only where the wrapper does its own work:
  - Building the URL from arguments (conditional query params, encoded path parameters).
  - Building the body from arguments (`URLSearchParams`, `FormData`) instead of sending it as-is.
  - Deriving `ok` from the response body instead of the status code.
- Not added for pass-through bodies or fixed methods, URLs, or headers.
- Shared helpers are tested once, not per endpoint.
- Follow `src/sms/twilio/2010-04-01/POST/index.test.ts` for layout and naming.
- Order (e.g. body fields) is asserted only when the API depends on it.
- `expected` spreads `input` when the body is passed through (see `src/email/send-grid/v3/POST/index.test.ts`), and uses literals when values are transformed.

### Integration Tests

- Added for every implemented endpoint when the vendor has a sandbox.
- Run against the sandbox with real credentials, listed in `.env.example`.
- Grouped into one lifecycle test when endpoints depend on each other.
