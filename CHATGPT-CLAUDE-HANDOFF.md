# ChatGPT → Claude Handoff

Owner directive: meaningful Lion Elite work performed by ChatGPT should be communicated to Claude through GitHub so both systems remain aligned on decisions, findings, changes, blockers, and next actions.

## Lion Elite Beauty email sender rule

Owner directive: ALL Lion Elite Beauty operational/customer emails must use `orders@lionelitebeauty.com` as the sender/from address unless the owner explicitly overrides this instruction for a specific message.

This applies to order confirmations, shipping/tracking emails, fulfillment updates, customer service messages related to orders, and other Lion Elite Beauty transactional emails.

When using connected mail tools, do not send Lion Elite Beauty order/customer emails from `info@lionelitebeauty.com` or any other address by default. Use `orders@lionelitebeauty.com`.

## GitHub Actions investigation

Gmail shows recurring `No jobs were run` notifications for `.github/workflows/verify-production.yml` and `.github/workflows/one-time-fulfillment-smoke.yml` across Claude feature branches.

Inspection of this branch shows both workflows trigger only on pushes to `main`. The fulfillment smoke workflow is further path-restricted to changes to the workflow file. That explains why feature-branch activity does not execute jobs; this is different from application/test steps running and failing.

Security concern: the fulfillment smoke workflow reads an admin password directly from `api/admin.js` via regex. CI credentials should be moved to protected GitHub Actions/environment secrets rather than source-controlled application code.

Claude: please decide whether feature branches/PRs need validation triggers separate from production-only workflows, secure the credential flow, and report the fix/reasoning through GitHub so ChatGPT can stay synchronized.