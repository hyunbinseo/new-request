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

## Arguments

- Not mutated. Defaults (e.g. `opts.from`) are applied to a copy.

## Errors

- Not thrown. Returned as an `Error` (e.g. `fetch` rejection, unparsable body).

## Testing

### Unit Tests

- Colocated as `<METHOD>/index.test.ts`, with `fetch` stubbed by `captureFetch`.
- Added only where the wrapper does its own work:
  - Building the URL from arguments (conditional query params, encoded path parameters).
  - Interpreting the response (`{ ok, body }` parsing, returning an `Error` instead of throwing).
- Not added for pass-through bodies or fixed methods, URLs, or headers.
- Shared helpers are tested once, not per endpoint.

### Integration Tests

- Added for every implemented endpoint when the vendor has a sandbox.
- Run against the sandbox with real credentials, listed in `.env.example`.
- Grouped into one lifecycle test when endpoints depend on each other.
