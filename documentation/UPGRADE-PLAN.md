# Astro 5 Upgrade Plan

**Current Version:** Astro 3.6.5  
**Target Version:** Astro 5.17.2  
**Date:** 2026-02-12

## Overview

Major version upgrade spanning 2 major releases (v3 → v4 → v5). This requires careful planning and incremental testing.

## Current Package Versions

| Package           | Current | Latest  | Breaking                  |
| ----------------- | ------- | ------- | ------------------------- |
| astro             | 3.6.5   | 5.17.2  | ⚠️ YES (2 major versions) |
| @astrojs/react    | 3.0.3   | 4.4.2   | ⚠️ YES                    |
| @astrojs/rss      | 3.0.0   | 4.0.15  | ⚠️ YES                    |
| @astrojs/sitemap  | 3.2.1   | 3.7.0   | ✅ Minor                  |
| @astrojs/tailwind | 5.1.2   | 6.0.2   | ⚠️ YES                    |
| react             | 18.2.0  | 19.2.4  | ⚠️ YES (React 19)         |
| react-dom         | 18.2.0  | 19.2.4  | ⚠️ YES (React 19)         |
| @headlessui/react | 1.7.17  | 2.2.9   | ⚠️ YES                    |
| framer-motion     | 10.16.4 | 12.34.0 | ⚠️ YES                    |
| tailwindcss       | 3.3.3   | 4.1.18  | ⚠️ YES (Tailwind 4)       |
| eslint            | 8.51.0  | 10.0.0  | ⚠️ YES                    |

## Upgrade Strategy

### Phase 1: Pre-Upgrade Preparation ✅

1. ✅ Create session-002 documentation
2. ✅ Document current state
3. ✅ Identify breaking changes
4. 🔄 Fix existing TypeScript errors
5. 🔄 Create git branch for upgrade

### Phase 2: TypeScript Fixes (Quick Wins)

Fix current TypeScript errors before upgrade:

- `src/utils/motion.ts` - Add type annotations
- `src/components/DropdownMenuItem.tsx` - Fix type imports
- `src/pages/[...slug].astro` - Add null checks

### Phase 3: Astro Core Upgrade (v3 → v4)

**Goal:** Upgrade to Astro 4.x (intermediate step)

**Changes Required:**

- Content Collections API changes (if any)
- Image optimization changes
- View Transitions updates
- Middleware changes

**Steps:**

1. Upgrade astro to `^4.0.0`
2. Upgrade @astrojs/react to `^3.0.0` (compatible with Astro 4)
3. Run TypeScript check
4. Fix breaking changes
5. Test key features (dev mode only)

### Phase 4: Astro 5 Upgrade

**Goal:** Upgrade to Astro 5.17.2

**Breaking Changes (Astro 5):**

- Content Collections schema changes
- Updated `astro:content` imports
- View Transitions improvements
- Middleware API changes
- Build output changes

**Steps:**

1. Upgrade astro to `^5.17.2`
2. Upgrade @astrojs/react to `^4.4.2`
3. Upgrade @astrojs/rss to `^4.0.15`
4. Upgrade @astrojs/tailwind to `^6.0.2`
5. Review and apply breaking changes
6. Run TypeScript check
7. Test all features

### Phase 5: React Ecosystem Update

**Decision Point:** Keep React 18 or upgrade to React 19?

**Option A: Keep React 18 (SAFER)**

- Stay on React 18.3.x
- Less breaking changes
- Better ecosystem compatibility
- Recommended for initial upgrade

**Option B: Upgrade to React 19 (FUTURE)**

- Breaking changes in React 19
- Some libraries may not be compatible yet
- Defer to later session

**Steps (if React 18):**

1. Upgrade react to `^18.3.1`
2. Upgrade react-dom to `^18.3.1`
3. Upgrade @types/react to `^18.3.28`
4. Upgrade @headlessui/react to `^1.7.19` (compatible with React 18)
5. Upgrade framer-motion to `^10.18.0` (compatible with React 18)

### Phase 6: Supporting Dependencies

**Non-breaking updates:**

1. clsx `2.1.0` → `2.1.1`
2. prettier `3.0.3` → `3.8.1`
3. prettier-plugin-astro `0.12.0` → `0.14.1`
4. eslint-plugin-astro `0.29.1` → `1.5.0`
5. sharp `0.32.6` → `0.34.5`
6. react-icons `4.11.0` → `4.12.0`

**Breaking updates (defer):**

- ESLint 8 → 10 (major changes)
- Tailwind 3 → 4 (complete rewrite)

### Phase 7: Testing & Verification

1. TypeScript compilation check
2. Verify all pages render
3. Check Content Collections
4. Test image optimization
5. Verify View Transitions
6. Check dark mode toggle
7. Test responsive design

## Recommended Execution Order

### Step 1: Fix TypeScript Errors First

- Clean slate before upgrade
- Easier to identify upgrade-related issues

### Step 2: Incremental Astro Upgrade

```bash
# Upgrade to Astro 4 first
npm install astro@^4.0.0 @astrojs/react@^3.6.0

# Then Astro 5
npm install astro@^5.17.2 @astrojs/react@^4.4.2 @astrojs/rss@^4.0.15 @astrojs/tailwind@^6.0.2
```

### Step 3: Safe Dependency Updates

```bash
# React 18 ecosystem (safer)
npm install react@^18.3.1 react-dom@^18.3.1 @types/react@^18.3.28

# Update compatible dependencies
npm install @headlessui/react@^1.7.19 framer-motion@^10.18.0

# Update tooling
npm install prettier@^3.8.1 prettier-plugin-astro@^0.14.1 eslint-plugin-astro@^1.5.0

# Update utilities
npm install clsx@^2.1.1 sharp@^0.34.5 react-icons@^4.12.0
```

### Step 4: Defer Major Breaking Changes

**Do NOT upgrade in this session:**

- Tailwind 3 → 4 (complete API rewrite)
- ESLint 8 → 10 (major config changes)
- React 18 → 19 (ecosystem not ready)

These should be separate sessions with dedicated planning.

## Risk Assessment

### Low Risk ✅

- clsx, prettier, sharp, react-icons
- Minor version updates
- Minimal breaking changes

### Medium Risk ⚠️

- Astro 3 → 4 → 5
- @astrojs/\* integrations
- Framer Motion
- Headless UI

### High Risk 🔴

- React 19 upgrade (defer)
- Tailwind 4 upgrade (defer)
- ESLint 10 upgrade (defer)

## Breaking Changes to Watch

### Astro 4 → 5

1. **Content Collections:**
   - Schema definitions may change
   - Image handling in frontmatter

2. **View Transitions:**
   - API improvements
   - Migration guide available

3. **Image Optimization:**
   - Sharp integration changes
   - New `astro:assets` features

4. **Middleware:**
   - New middleware API
   - Context changes

### React Integrations

- @astrojs/react may require component updates
- Hydration directives may change

## Rollback Plan

If upgrade fails:

1. Restore package.json from git
2. Run `npm install`
3. Document issues in session-002.md
4. Plan alternative approach

## Success Criteria

✅ TypeScript compilation succeeds (no errors)  
✅ All 10 blog posts render correctly  
✅ Image optimization works  
✅ Dark mode toggle functions  
✅ Category pages work  
✅ View transitions smooth  
✅ No console errors in dev mode  
✅ Build completes successfully (final check only)

## Timeline Estimate

- Phase 1: Preparation (✅ Complete)
- Phase 2: TypeScript fixes (30 min)
- Phase 3: Astro 4 upgrade (15 min)
- Phase 4: Astro 5 upgrade (30 min)
- Phase 5: React ecosystem (15 min)
- Phase 6: Supporting deps (15 min)
- Phase 7: Testing (30 min)

**Total:** ~2.5 hours of active work

## Next Steps

1. Get user approval for upgrade plan
2. Create git branch: `upgrade/astro-5`
3. Fix TypeScript errors
4. Begin incremental upgrade
5. Test thoroughly
6. Document results in session-002.md
