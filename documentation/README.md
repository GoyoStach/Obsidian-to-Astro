# Documentation

This folder contains project documentation organized into two categories:

## Structure

### `context/` - Session Tracking

Contains session files that track what was implemented during each Claude Code session.

**Purpose:** High-level business logic documentation
**Audience:** Product managers, stakeholders, future developers
**Content:** WHAT changed, not HOW

**Format:** `session-XXX.md` (incrementing numbers)

**Example:**

- `session-001.md` - Initial setup and documentation
- `session-002.md` - Homepage pagination feature
- `session-003.md` - Dark mode improvements

### `feature/` - Technical Documentation

Contains detailed technical documentation for core features.

**Purpose:** Technical implementation details
**Audience:** Developers working on the codebase
**Content:** Architecture, code, APIs, technical decisions

**Format:** `feature-name.md` (descriptive names)

**Example:**

- `pagination.md` - Homepage pagination implementation
- `dark-mode.md` - Theme switching system
- `content-collections.md` - Content management architecture

## Workflow

### Starting a New Session

1. Check latest session number in `context/`
2. Create new session file with incremented number
3. Document changes as you work (business focus)
4. For core features, create detailed technical docs in `feature/`

### Session File Guidelines

**DO:**

- Use clear, non-technical language
- Focus on business value and user impact
- Keep it concise (1-2 paragraphs per change)
- Organize by logical categories

**DON'T:**

- Include code snippets or technical implementation
- List every file changed
- Use developer jargon
- Make it overly detailed

### Feature Documentation Guidelines

**DO:**

- Include architecture diagrams (if applicable)
- Document all files modified/created
- Explain technical decisions
- Provide code examples
- List dependencies and configuration

**DON'T:**

- Duplicate business logic (that's in session files)
- Document trivial changes (minor bug fixes, typos)
- Skip context (explain WHY, not just WHAT)

## Templates

- `feature/TEMPLATE.md` - Template for feature documentation

## Examples

### Session Entry (Business Focus)

```markdown
### User Experience Improvements

- Added loading states to all interactive components
- Implemented error boundaries for better error handling
- Improved mobile navigation with gesture support
```

### Feature Documentation (Technical Focus)

```markdown
## Loading States Implementation

### Architecture

Loading states use React's Suspense API with:

- Skeleton components during data fetching
- Error boundaries for failure states
- Progressive enhancement for no-JS scenarios

### Files Modified

- `src/components/LoadingSpinner.tsx` - Reusable spinner component
- `src/layouts/BaseLayout.astro` - Added Suspense wrapper
```

## Maintenance

- Session files should be created for EVERY Claude Code session
- Feature docs should be created for CORE features only
- Update feature docs when features are significantly modified
- Mark deprecated features in their documentation
- Keep documentation in sync with code changes
