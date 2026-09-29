## Bizgo Docs

Types follow <https://developers.bizgo.io>.

- Last verified against the docs on 2026-09-29. If they diverge, update these notes and the date.
- [`llms-full.txt`](https://developers.bizgo.io/llms-full.txt) can lag the web docs (see [#18](https://github.com/hyunbinseo/new-request/issues/18)). Ask the user before comparing the two.

### Web Docs

- The web page is large (~4 MB) and server-rendered. Save the raw HTML (e.g. `curl`) and query it. Don't use Chrome DevTools.
- The English web page (`/en/...`) matches `llms-full.txt` wording, so field descriptions can be diffed directly.
- The web page's example JSON is minimal. Don't rely on it for field coverage.
- The web page's field tables are flat rows, and the copied text loses nesting.
  - `p[data-spec-name]` in each row holds the full path (e.g. `messageFlow[].sms.from`).
  - Depth is also the count of `span.w-px` guide lines in the row (0 for top-level).
