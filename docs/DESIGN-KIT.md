# Lion Elite Design Kit for Claude Code

Unzip this into the root of your website repo (e.g. `LionEliteBeauty`), commit, and Claude Code picks it all up automatically.

What's inside:
- `.claude/skills/design-taste/` — your reference library + quality bar (taste)
- `.claude/skills/emil-design-eng/` + 19 more Emil Kowalski skills — animation, interaction, polish (MIT)
- `.claude/skills/impeccable/` — Paul Bakaus' Impeccable v4.11: `/impeccable shape`, `polish`, `audit`, `critique`, `typeset`… (Apache 2.0)
- `.mcp.json` — Figma MCP + Playwright MCP
- `scripts/visual-qa.mjs` — screenshot + check loop at 375/768/1440px

Setup (one time, in the repo):
```bash
npm i -D playwright && npx playwright install chromium
claude            # then run /mcp and sign in to Figma when prompted
```

Use it:
```
Use design-taste and impeccable to redesign the shapewear landing page.
Pull the layout from <figma link>. Then run scripts/visual-qa.mjs on localhost
and keep fixing until every screenshot passes the bar.
```

To install globally instead (all projects): copy `.claude/skills/*` into `~/.claude/skills/`.
