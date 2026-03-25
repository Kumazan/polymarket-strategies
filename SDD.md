# SDD: Add .gitignore for polymarket-strategies (Static HTML/GitHub Pages)

## Goal
Add a `.gitignore` to prevent OS metadata, editor files, and any future build artifacts from polluting the repo.

## Scope

### In
- Add `.gitignore` with patterns for macOS, Linux, editor tools, and potential future Node/Python tooling

### Out
- No content changes to index.html, README.md, or images/

## Approach
The repo is a single-page static site (index.html + images). There is currently no `.gitignore`. Common issues without one: `.DS_Store` committed accidentally, editor workspace files showing in `git status`, future node_modules if tooling is added.

**Trade-offs:** None — only upside.

## Change List

| File | Change | Why |
|------|--------|-----|
| `.gitignore` | Create new file | Prevent OS/editor/build artifacts from being tracked |

## Tests
- `git check-ignore -v .DS_Store` — must match
- `git status` — must show only `.gitignore` as new file

### Results
✅ All checks passed — .DS_Store matched, git status clean

## Rollback
Delete `.gitignore`. No other changes.

## Risk Notes
- Zero risk. No tracked files affected.
