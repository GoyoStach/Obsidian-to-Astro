# Session Workflow - Quick Reference

This guide explains the documentation workflow for each Claude Code session.

## At the Start of Every Session

### 1. Check Latest Session Number

```bash
ls documentation/context/
# Look for highest number (e.g., session-003.md)
```

### 2. Create New Session File

```bash
# If latest is session-003.md, create session-004.md
```

**Filename:** `documentation/context/session-XXX.md`  
**Template:**

```markdown
# Session XXX - Brief Title

**Date:** YYYY-MM-DD  
**Focus:** Main area of work

## Changes Implemented

### Category 1

- Change description (business logic only)

### Category 2

- Feature added or modified

## Business Value

What value these changes bring.

## Next Steps

Future work suggestions (optional).
```

## During the Session

### For Regular Changes

Update session file with:

- WHAT changed (not HOW)
- Business value and user impact
- Clear, non-technical language
- Organized by logical categories

### For Core Features

Create feature documentation:

1. **Create file:** `documentation/feature/feature-name.md`
2. **Use template:** Copy from `TEMPLATE.md`
3. **Include:**
   - Architecture overview
   - Files modified/created
   - Code examples
   - Configuration changes
   - Usage examples
4. **Link from session:** Reference feature doc in session file

## Deciding: Session vs Feature Documentation

### Session File (Always)

- Quick summary of all changes
- Business-focused language
- High-level overview
- For stakeholders/PMs

### Feature File (When Needed)

Create feature docs for:

- New core functionality
- Complex features with multiple components
- Features that need detailed technical explanation
- Features other developers will extend

**Don't create feature docs for:**

- Minor bug fixes
- Small UI tweaks
- Configuration changes
- Content updates

## Examples

### Session File Entry

```markdown
## Changes Implemented

### Content Management

- Added support for draft posts (not visible until published)
- Implemented scheduled publishing with date-based visibility

### User Interface

- Redesigned homepage with featured posts section
- Added social sharing buttons to blog posts
```

**Notice:** Business logic, user-facing changes, no code or technical details.

### Feature Documentation

````markdown
# Draft Posts Feature

**Created:** 2026-02-15  
**Session:** session-005  
**Status:** Active

## Overview

Allows authors to mark posts as drafts, preventing them from appearing
on the site until explicitly published.

## Implementation Details

### Schema Changes

Added `draft` field to blogPost collection schema:

```typescript
draft: z.boolean().optional().default(false)
```
````

### Files Modified

- `src/content/config.ts` - Added draft field to schema
- `src/pages/index.astro` - Filter out draft posts
- `src/pages/[...slug].astro` - Show 404 for draft posts in production

````

**Notice:** Technical details, code snippets, file changes, implementation.

## Checklist for End of Session

- [ ] Session file created with incremented number
- [ ] All changes documented in session file
- [ ] Core features have dedicated feature documentation
- [ ] Feature docs linked in session file
- [ ] Business value clearly explained
- [ ] Next steps identified (optional)

## Tips

### Writing Session Files
- **Think like a PM:** What would a non-technical stakeholder need to know?
- **Focus on value:** Why does this change matter?
- **Be concise:** 1-2 paragraphs per change is enough
- **Use categories:** Group related changes together

### Writing Feature Docs
- **Think like a developer:** What would someone extending this feature need?
- **Be thorough:** Include all relevant technical details
- **Provide context:** Explain WHY decisions were made
- **Include examples:** Show how to use the feature

### Common Mistakes to Avoid
- ❌ Putting code in session files
- ❌ Creating feature docs for trivial changes
- ❌ Forgetting to create session file at all
- ❌ Making session files too technical
- ❌ Skipping "why" in feature documentation
- ❌ Not linking feature docs from session files

## Version Control

Both session and feature documentation should be committed to git:

```bash
git add documentation/
git commit -m "docs: add session-XXX documentation"
git push
````

This ensures the project history is well-documented and searchable.
