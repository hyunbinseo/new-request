## Bizgo Docs

Types follow <https://developers.bizgo.io>.

- `check:upstream` crawls the web docs and [`llms-full.txt`](https://developers.bizgo.io/llms-full.txt), reports where they differ (see [#18](https://github.com/hyunbinseo/new-request/issues/18)), and updates the snapshot (`cli/bizgo/docs.tsv`).
- `check` fails when the types differ from the snapshot, in either direction.
- Descriptions and allowed values aren't in the snapshot. Read them in `llms-full.txt` files.
