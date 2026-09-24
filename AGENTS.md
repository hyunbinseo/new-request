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
