# SDD — Add .github/copilot-instructions.md

## Goal
Add a `.github/copilot-instructions.md` to `polymarket-strategies` so GitHub Copilot has project-specific context when reviewing PRs and generating code suggestions.

## Scope
- **In:** `.github/copilot-instructions.md` (new file, ~30 lines)
- **Out:** No changes to `index.html`, `README.md`, or `images/`

## Approach
Other repos in the same allowlist (`polymarket-bot-v0-ts`, `sdd-learn`, `trip-bangkok`) already have this file. Adding it to `polymarket-strategies` is a low-risk consistency improvement:
- No functional change, purely documentation/tooling metadata
- Follows the same pattern established in sibling repos

**Alternatives considered:**
- Skip entirely: Copilot reviews would lack project context — suboptimal
- Add to `README.md` instead: not machine-readable by Copilot in the same way

## Change List
| File | Change | Why |
|------|--------|-----|
| `.github/copilot-instructions.md` | New file | Give Copilot project context for reviews |

## Tests
Static markdown — no build pipeline. Validation:
- ✅ Valid UTF-8 Markdown
- ✅ No secrets or PII
- ✅ Content accurately reflects project structure (pure HTML static site, images/, README.md)
- ✅ Consistent with sibling repo pattern

**Test commands:** `ls .github/copilot-instructions.md && echo PASS` → **PASS**

## Rollback
`git revert <commit>` — zero risk, documentation-only file.

## Risk Notes
None. Documentation-only addition to a static site repo.
