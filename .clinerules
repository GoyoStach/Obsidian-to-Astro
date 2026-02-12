# Obsidian-to-Astro Blog - Project Context

## Project Overview

**Name:** GoyoStach Blog  
**Purpose:** Personal blog that bridges Obsidian note-taking with web publishing  
**Live Site:** https://blog.goyostash.com/  
**Owner:** Guillaume Excoffier (© 2021)

This is a content-focused static blog built with Astro 3.0 that publishes personal notes written in Obsidian using the Zettelkasten method. The project emphasizes performance, simplicity, and an excellent developer experience.

## Architecture

### Framework & Rendering
- **Framework:** Astro 3.2.3
- **Rendering Strategy:** SSG (Static Site Generation) - 100% pre-rendered at build time
- **No Server Runtime:** Pure static site, perfect for CDN deployment
- **Islands Architecture:** Minimal JavaScript, React components hydrated only where needed

### Tech Stack
- **Core:** Astro 3.2.3, React 18.2.0, TypeScript
- **Styling:** Tailwind CSS 3.3.3 with custom "Expresso" theme
- **Animation:** Framer Motion 10.16.4
- **Icons:** React Icons 4.11.0
- **UI Components:** Headless UI 1.7.17 (accessible, unstyled components)
- **Image Optimization:** Sharp (automatic WebP conversion)
- **Markdown Processing:** rehype-add-classes (automatic Tailwind class injection)

### Astro Integrations
- `@astrojs/react` - React component support with selective hydration
- `@astrojs/tailwind` - Tailwind CSS integration
- `@astrojs/sitemap` - Automatic sitemap.xml generation
- `@astrojs/rss` - RSS feed support

### Key Astro 3.0 Features Used
1. **Content Collections** - Type-safe content management with Zod validation
2. **Image Optimization** - Automatic image processing in `src/` directory
3. **View Transitions** - Smooth page transitions using CSS View Transition API

## Project Structure

```
Obsidian-to-Astro/
├── public/                      # Static assets (favicons, docs images)
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── BaseHead.astro      # SEO & meta tags
│   │   ├── Body.astro          # Body wrapper with theme support
│   │   ├── Breadcrumb.astro    # Navigation breadcrumb
│   │   ├── DropdownMenu.tsx    # React: Category dropdown (mobile)
│   │   ├── Footer.astro        # Site footer
│   │   ├── Header.astro        # Site header with navigation
│   │   ├── Masthead.astro      # Hero section component
│   │   ├── MyContent.astro     # Content container wrapper
│   │   └── ThemeToggleButton.tsx # React: Dark/light theme toggle
│   ├── content/                 # Content collections (Astro 3.0)
│   │   ├── config.ts           # Zod schemas for content validation
│   │   ├── blogPost/           # Blog posts (Git submodule)
│   │   └── phraseData/         # JSON data (life advice - currently unused)
│   ├── Images/                  # Image assets (Git submodule)
│   ├── layouts/
│   │   └── CategoryPosts.astro # Layout for category filter pages
│   ├── pages/                   # Route definitions
│   │   ├── index.astro         # Homepage (all posts)
│   │   ├── [...slug].astro     # Dynamic blog post pages
│   │   └── categories/[id].astro # Dynamic category pages
│   ├── styles/
│   │   └── global.css          # Global styles and font imports
│   ├── utils/
│   │   └── motion.ts           # Framer Motion animation variants
│   ├── config.ts               # Site configuration (title, description, URL)
│   └── env.d.ts                # TypeScript environment types
├── astro.config.mjs            # Astro configuration
├── tailwind.config.cjs         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .eslintrc.yml               # ESLint configuration
├── .prettierrc                 # Prettier code formatting
└── .gitmodules                 # Git submodules configuration
```

## Content Management

### Content Collections Schema
The project uses Astro's Content Collections API for type-safe content:

**blogPost Collection** (`src/content/blogPost/`)
- Type: 'content' (markdown/MDX files)
- Schema (Zod validation):
  - `title`: string (required)
  - `description`: string (required)
  - `date`: string (optional)
  - `tags`: string[] (required)
  - `heroImage`: image type (required)
- Managed as Git submodule from separate repository

**phraseData Collection** (`src/content/phraseData/`)
- Type: 'data' (JSON files)
- Contains life advice quotes (currently not displayed on site)

### Git Submodules Architecture
Content is separated into dedicated repositories:
- **Blog Posts:** `https://github.com/GoyoStach/Obsidian-Posts.git` → `src/content/blogPost/`
- **Images:** `https://github.com/GoyoStach/Obsidian-Images.git` → `src/Images/`

**Rationale:**
- Separates content from application code
- Allows Obsidian vault to be version controlled independently
- Cleaner repository organization

## Routing

### Static Routes
- `/` - Homepage (displays all posts except those tagged 'FR')

### Dynamic Routes
1. **Blog Posts:** `[...slug].astro`
   - Catch-all route for individual blog posts
   - Path: `/{post-slug}`
   - Features: Hero image, table of contents, scroll-to-top button

2. **Category Pages:** `categories/[id].astro`
   - Path: `/categories/{tag-name}`
   - Shows all posts filtered by tag/category

### Route Generation
All routes are generated at build time using `getStaticPaths()`:
```typescript
// Get all blog posts from content collection
const posts = await getCollection('blogPost')

// Extract unique tags for category pages
const uniqueTags = [...new Set(posts.flatMap(p => p.data.tags))]
```

## Design System

### Color Palette - "Expresso" Theme
```javascript
expresso: {
  100: '#DCD7C9', // Light background
  200: '#DEA057', // Accent color (links, highlights)
  300: '#A27B5C', // Secondary accent
  400: '#3F4E4F', // Dark text
  500: '#2C3639', // Dark background
}
```

### Typography
- **Headings:** Silkscreen (decorative, retro pixel font)
- **Body Text:** Oswald (clean, modern)
- **UI Elements:** M PLUS Rounded 1c (friendly, rounded)

### Dark Mode
- Strategy: Class-based (`class` strategy in Tailwind)
- Toggle component persists preference in localStorage
- Detects system preference on first visit

## Key Features

### 1. Obsidian Integration
- Content authored in Obsidian with Zettelkasten method
- Custom frontmatter template for metadata
- Images organized in matching folder structure
- Manual sync workflow (copy to submodules, git push)

### 2. Performance Optimizations
- Static generation (no server runtime)
- Automatic image optimization with Sharp
- Minimal JavaScript (islands architecture)
- CSS purging via Tailwind

### 3. SEO & Social
- Comprehensive meta tags (BaseHead component)
- Open Graph tags for social sharing
- Twitter Card support
- Automatic sitemap generation

### 4. User Experience
- Responsive design (mobile-first)
- Dark/light mode toggle
- View Transitions for smooth page navigation
- Auto-generated table of contents on posts
- Category-based filtering
- Breadcrumb navigation

### 5. Developer Experience
- Type-safe content with Zod schemas
- TypeScript throughout
- ESLint + Prettier for code quality
- Hot module reload in development
- Clear component organization

## Build & Deployment

### Commands
```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run preview # Preview production build
```

### Deployment
- **Platform:** VPS with Coolify
- **Pipeline:** Automated deployment on git push
- **Process:** Git push → Coolify builds → Deploys to https://blog.goyostash.com/

### Submodule Management
To initialize submodules after cloning:
```bash
git submodule update --init --recursive
```

To update submodules with latest content:
```bash
git submodule update --remote
```

## Current State

### Working Features
- Complete application architecture
- All components and pages functional
- Build and deployment pipeline
- Responsive design
- Dark mode
- View transitions
- Image optimization
- SEO optimization

### Known Limitations
- Content sync is manual (no automation scripts present)
- Submodules may be empty in fresh clones
- Phrase data collection exists but is unused in UI
- French posts ('FR' tag) filtered out on homepage

## Session Documentation Workflow

### CRITICAL: Session Tracking
**At the start of EVERY new Claude Code session, you MUST:**

1. **Check for existing session files** in `documentation/context/`
2. **Identify the latest session number** (e.g., session-003.md)
3. **Create a NEW session file** with incremented number (e.g., session-004.md)
4. **Document ALL changes** made during the session in this file

### Session File Format
Location: `documentation/context/session-XXX.md`

**Structure:**
```markdown
# Session XXX - Brief Title

**Date:** YYYY-MM-DD  
**Focus:** Main area of work

## Changes Implemented

### Category 1
- Change description (business logic, not technical details)
- Another change

### Category 2
- Feature added or modified

## Business Value

What value these changes bring to the project.

## Next Steps

Suggestions for future work (optional).
```

**IMPORTANT:**
- Keep session files **concise and business-focused**
- NO technical implementation details
- Focus on WHAT changed, not HOW
- Use clear, non-technical language
- Think: "What would a product manager need to know?"

### Feature Documentation

When implementing a **core feature** (not minor changes):

1. **Create feature documentation** in `documentation/feature/`
2. **Use descriptive filename**: `feature-name.md`
3. **Follow TEMPLATE.md structure** in that folder
4. **Include technical details** here (architecture, code, APIs)
5. **Reference in session file** with link

**Feature docs are technical. Session docs are business-focused.**

### Examples

**Session File (Business Focus):**
```markdown
## Changes Implemented

### Content Display
- Added pagination to homepage to limit posts per page
- Implemented "Load More" button for better UX

### Navigation
- Created breadcrumb navigation for better user orientation
```

**Feature File (Technical Focus):**
```markdown
## Architecture

Pagination uses Astro's built-in pagination API with:
- 10 posts per page
- Dynamic route generation
- Client-side state management for "Load More"

### Implementation Details

**Files Modified:**
- `src/pages/index.astro` - Added pagination logic
- `src/components/LoadMore.tsx` - React component for loading
```

## Important Context for AI Assistants

### CRITICAL DEVELOPMENT RULES:

**Development Mode:**
1. ⚠️ **ALWAYS USE DEV MODE** - Never run `npm run build` (uses too many tokens)
2. ⚠️ **ASK BEFORE STARTING DEV SERVER** - Always request permission before running `npm run dev`
3. ⚠️ **Stop dev server after verification** - Use timeout or Ctrl+C, don't leave it running

**Git Operations:**
1. 🚨 **ALWAYS ASK BEFORE COMMITTING** - Never run `git commit` without explicit user permission
2. 🚨 **ALWAYS ASK BEFORE PUSHING** - Never run `git push` without explicit user permission
3. ⚠️ **Stage files first** - Show user what will be committed (`git status`)
4. ⚠️ **Present commit message** - Let user review before committing

**Testing:**
- Use `npm run dev` for development testing only (with permission)
- For quick checks, read files and use TypeScript checking instead
- Build process should only be run in CI/CD pipeline

### When Working on This Project:
1. **Always create/update session file** at start of new session
2. **Never modify git submodules directly** - they're managed separately
3. **Respect the Obsidian content structure** - frontmatter format is critical
4. **Use Content Collections API** - never import markdown files directly
5. **Maintain type safety** - use Zod schemas for content validation
6. **Follow Tailwind conventions** - use custom Expresso colors
7. **Test dark mode** - ensure all changes work in both themes
8. **Keep JavaScript minimal** - only hydrate components when necessary
9. **Image paths must use `../../Images/` prefix** - required for Obsidian compatibility
10. **Document core features** in `documentation/feature/` with technical details
11. **Update session file** as you implement changes during the session

### Site Configuration
Located in `src/config.ts`:
- `SITE_TITLE`: 'GoyoStach'
- `SITE_DESCRIPTION`: 'An insight into my secondary brain !'
- `MY_SITE`: 'https://blog.goyostash.com/'

### Astro Configuration
Located in `astro.config.mjs`:
- Site URL: 'https://blog.goyostash.com'
- Markdown: Custom rehype plugin auto-adds Tailwind classes
- Integrations: sitemap, react, tailwind
